// React permite criar componentes e usar recursos como hooks.
import React, { useEffect, useState } from 'react';
// Import traz dependencias usadas por este arquivo.
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
// AsyncStorage guarda dados simples no aparelho, como o usuario logado.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import traz dependencias usadas por este arquivo.
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    FileText,
    BadgeCheck,
    Clock3,
    IdCard,
    Calendar,
} from 'lucide-react-native';
// Expo Image Picker permite selecionar imagens do dispositivo.
import * as ImagePicker from 'expo-image-picker';

// Servico HTTP centralizado usado para conversar com o backend.
import api, { getApiErrorMessage } from '../../services/api';
// Import traz dependencias usadas por este arquivo.
import FeedbackMessage, {
    FeedbackType,
} from '../../components/FeedbackMessage';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';


interface LoggedUser {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
}


export default function ProviderScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();

   
    const [profession, setProfession] = useState('');
   
    const [city, setCity] = useState('');
   
    const [document, setDocument] = useState('');
   
    const [experienceYears, setExperienceYears] = useState('');
   
    const [availability, setAvailability] = useState('');
   
    const [hasCertificate, setHasCertificate] = useState('');
   
    const [certificateImage, setCertificateImage] = useState('');
   
    const [description, setDescription] = useState('');
   
    const [loading, setLoading] = useState(false);
   
    const [checkingProvider, setCheckingProvider] = useState(true);
   
    const [feedback, setFeedback] = useState<{
        type: FeedbackType;
        message: string;
    } | null>(null);

    // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
    useEffect(() => {
        checkExistingProvider();

        const unsubscribe = navigation.addListener(
            'focus',
            checkExistingProvider
        );

        return unsubscribe;
    }, [navigation]);

    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const checkExistingProvider = async () => {
        try {
            setCheckingProvider(true);

            const storedUser = await AsyncStorage.getItem('@user');

            if (!storedUser) {
                return;
            }

            const user: LoggedUser = JSON.parse(storedUser);
            
            const response = await api.get(`/providers/user/${user.id}`);

            if (response.data?.id) {
                navigation.replace('ProviderDashboard', {
                    providerId: response.data.id,
                });
            }
        } catch {
            // Usuario ainda nao possui cadastro de prestador.
        } finally {
            setCheckingProvider(false);
        }
    };

    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const handleRegisterProvider = async () => {
        if (
            !profession.trim() ||
            !city.trim() ||
            !document.trim() ||
            !experienceYears.trim() ||
            !availability.trim() ||
            !hasCertificate.trim() ||
            !description.trim()
        ) {
            setFeedback({
                type: 'error',
                message: 'Preencha todas as informacoes.',
            });

            return;
        }

        const parsedExperienceYears = Number(experienceYears);

        if (
            Number.isNaN(parsedExperienceYears) ||
            parsedExperienceYears < 0
        ) {
            setFeedback({
                type: 'error',
                message: 'Informe os anos de experiencia usando apenas numeros.',
            });

            return;
        }

        try {
            setLoading(true);
            setFeedback(null);

            const storedUser = await AsyncStorage.getItem('@user');

            if (!storedUser) {
                setFeedback({
                    type: 'info',
                    message: 'Faca login para cadastrar seus servicos.',
                });

                // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                navigation.navigate('Login');
                return;
            }

            const user: LoggedUser = JSON.parse(storedUser);
            const hasCertificateValue =
                hasCertificate.trim().toLowerCase() === 'sim';

            const existingProvider = await api
                .get(`/providers/user/${user.id}`)
                .then((response) => response.data)
                .catch(() => null);

            if (existingProvider?.id) {
                setFeedback({
                    type: 'info',
                    message: 'Voce ja possui cadastro de prestador.',
                });

                navigation.replace('ProviderDashboard', {
                    providerId: existingProvider.id,
                });
                return;
            }

            
            await api.post('/providers', {
                profession: profession.trim(),
                cpfCnpj: document.trim(),
                city: city.trim(),
                experienceYears: parsedExperienceYears,
                availability: availability.trim(),
                hasCertificate: hasCertificateValue,
                certificateImage: hasCertificateValue
                    ? certificateImage
                    : '',
                description: description.trim(),
                user: {
                    id: user.id,
                },
            });

            setFeedback({
                type: 'success',
                message: 'Cadastro enviado. Aguarde a aprovacao do administrador.',
            });
            // Retorna para a tela anterior na pilha de navegacao.
            setTimeout(() => navigation.goBack(), 1200);
        } catch (error: any) {
            setFeedback({
                type: 'error',
                message: getApiErrorMessage(
                    error,
                    'Nao foi possivel cadastrar o prestador.'
                ),
            });
        } finally {
            setLoading(false);
        }
    };

    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const pickCertificateImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setCertificateImage(result.assets[0].uri);
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            {checkingProvider ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#F28C38" size="large" />

                    <Text style={styles.loadingText}>
                        Verificando cadastro...
                    </Text>
                </View>
            ) : (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backButton}
                                // Retorna para a tela anterior na pilha de navegacao.
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeft size={24} color="#000" />
                            </TouchableOpacity>

                            <View style={styles.topContent}>
                                <View style={styles.iconContainer}>
                                    <Briefcase size={42} color="#FFF" />
                                </View>

                                <Text style={styles.title}>
                                    Area do Prestador
                                </Text>

                                <Text style={styles.subtitle}>
                                    Cadastre seus servicos e encontre novos clientes
                                </Text>
                            </View>
                        </View>

                        <View style={styles.formContainer}>
                            {feedback && (
                                <FeedbackMessage
                                    type={feedback.type}
                                    message={feedback.message}
                                />
                            )}

                            <Text style={styles.label}>
                                Profissao
                            </Text>

                            <View style={styles.inputContainer}>
                                <Briefcase size={20} color="#999" />

                                <TextInput
                                    placeholder="Ex: Eletricista"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={profession}
                                    onChangeText={setProfession}
                                />
                            </View>

                            <Text style={styles.label}>
                                Cidade
                            </Text>

                            <View style={styles.inputContainer}>
                                <MapPin size={20} color="#999" />

                                <TextInput
                                    placeholder="Sua cidade"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>

                            <Text style={styles.label}>
                                CPF ou CNPJ
                            </Text>

                            <View style={styles.inputContainer}>
                                <IdCard size={20} color="#999" />

                                <TextInput
                                    placeholder="Digite seu CPF ou CNPJ"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={document}
                                    onChangeText={setDocument}
                                />
                            </View>

                            <Text style={styles.label}>
                                Anos de experiencia
                            </Text>

                            <View style={styles.inputContainer}>
                                <Calendar size={20} color="#999" />

                                <TextInput
                                    placeholder="Ex: 3"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={experienceYears}
                                    onChangeText={setExperienceYears}
                                />
                            </View>

                            <Text style={styles.label}>
                                Disponibilidade
                            </Text>

                            <View style={styles.inputContainer}>
                                <Clock3 size={20} color="#999" />

                                <TextInput
                                    placeholder="Ex: Manha e tarde"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={availability}
                                    onChangeText={setAvailability}
                                />
                            </View>

                            <Text style={styles.label}>
                                Possui certificacao?
                            </Text>

                            <View style={styles.inputContainer}>
                                <BadgeCheck size={20} color="#999" />

                                <TextInput
                                    placeholder="Sim ou Nao"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={hasCertificate}
                                    onChangeText={setHasCertificate}
                                />
                            </View>

                            {hasCertificate.toLowerCase() === 'sim' && (
                                <>
                                    <TouchableOpacity
                                        style={styles.uploadButton}
                                        onPress={pickCertificateImage}
                                    >
                                        <Text style={styles.uploadButtonText}>
                                            Selecionar imagem do certificado
                                        </Text>
                                    </TouchableOpacity>

                                    {certificateImage !== '' && (
                                        <Image
                                            source={{ uri: certificateImage }}
                                            style={styles.certificateImage}
                                        />
                                    )}
                                </>
                            )}

                            <Text style={styles.label}>
                                Descricao dos servicos
                            </Text>

                            <View style={styles.textAreaContainer}>
                                <FileText size={20} color="#999" />

                                <TextInput
                                    placeholder="Fale sobre seus servicos e experiencia..."
                                    placeholderTextColor="#999"
                                    style={styles.textArea}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    loading && styles.buttonDisabled,
                                ]}
                                onPress={handleRegisterProvider}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        Enviar Cadastro
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            )}
        </View>
    );
}
