import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import * as ImagePicker from 'expo-image-picker';

import api from '../../services/api';
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
            Alert.alert(
                'Campos obrigatorios',
                'Preencha todas as informacoes.'
            );

            return;
        }

        const parsedExperienceYears = Number(experienceYears);

        if (
            Number.isNaN(parsedExperienceYears) ||
            parsedExperienceYears < 0
        ) {
            Alert.alert(
                'Experiencia invalida',
                'Informe os anos de experiencia usando apenas numeros.'
            );

            return;
        }

        try {
            setLoading(true);

            const storedUser = await AsyncStorage.getItem('@user');

            if (!storedUser) {
                Alert.alert(
                    'Login necessario',
                    'Faca login para cadastrar seus servicos.'
                );

                navigation.navigate('Login');
                return;
            }

            const user: LoggedUser = JSON.parse(storedUser);
            const hasCertificateValue =
                hasCertificate.trim().toLowerCase() === 'sim';

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

            Alert.alert(
                'Cadastro enviado',
                'Cadastro concluido, aguarde ser aprovado.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error: any) {
            console.log(error);

            Alert.alert(
                'Erro',
                error.response?.data?.message ||
                error.response?.data ||
                'Nao foi possivel cadastrar o prestador.'
            );
        } finally {
            setLoading(false);
        }
    };

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
        </View>
    );
}
