import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Phone,
    FileText,
    DollarSign,
    BadgeCheck,
    Clock3,
    IdCard,
} from 'lucide-react-native';

import styles from './styles';

import * as ImagePicker from 'expo-image-picker';

export default function ProviderScreen({ navigation }: any) {

    // STATES DOS INPUTS
    const [profession, setProfession] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [document, setDocument] = useState('');
    const [availability, setAvailability] = useState('');
    const [certificate, setCertificate] = useState('');
    const [hasCertificate, setHasCertificate] = useState('');
    const [certificateImage, setCertificateImage] = useState('');

    // FUNÇÃO DO BOTÃO
    const handleRegisterProvider = () => {

        // VALIDAÇÃO DOS CAMPOS
        if (
            !profession ||
            !city ||
            !phone ||
            !price ||
            !description
        ) {
            Alert.alert(
                'Campos obrigatórios',
                'Preencha todas as informações.'
            );

            return;
        }

        // ALERTA DE SUCESSO
        Alert.alert(
            'Cadastro enviado',
            'Cadastro concluído, aguarde ser aprovado.'
        );

        // VOLTA PARA TELA ANTERIOR
        navigation.goBack();
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

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* HEADER */}
                        <View style={styles.header}>

                            {/* BOTÃO VOLTAR */}
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeft size={24} color="#000" />
                            </TouchableOpacity>

                            {/* CONTEÚDO SUPERIOR */}
                            <View style={styles.topContent}>

                                {/* ÍCONE */}
                                <View style={styles.iconContainer}>
                                    <Briefcase size={42} color="#FFF" />
                                </View>

                                {/* TÍTULO */}
                                <Text style={styles.title}>
                                    Área do Prestador
                                </Text>

                                {/* SUBTÍTULO */}
                                <Text style={styles.subtitle}>
                                    Cadastre seus serviços e encontre novos clientes
                                </Text>

                            </View>
                        </View>

                        {/* FORMULÁRIO */}
                        <View style={styles.formContainer}>

                            {/* PROFISSÃO */}
                            <Text style={styles.label}>
                                Profissão
                            </Text>

                            <View style={styles.inputContainer}>
                                <Briefcase size={20} color="#999" />

                                <TextInput
                                    placeholder="Ex: Eletricista"
                                    style={styles.input}
                                    value={profession}
                                    onChangeText={setProfession}
                                />
                            </View>

                            {/* CIDADE */}
                            <Text style={styles.label}>
                                Cidade
                            </Text>

                            <View style={styles.inputContainer}>
                                <MapPin size={20} color="#999" />

                                <TextInput
                                    placeholder="Sua cidade"
                                    style={styles.input}
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>

                            {/* TELEFONE */}
                            <Text style={styles.label}>
                                Telefone
                            </Text>

                            <View style={styles.inputContainer}>
                                <Phone size={20} color="#999" />

                                <TextInput
                                    placeholder="(81) 99999-9999"
                                    style={styles.input}
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>
                            {/* CPF */}
                            <Text style={styles.label}>
                                CPF ou CNPJ
                            </Text>

                            <View style={styles.inputContainer}>
                                <IdCard size={20} color="#999" />

                                <TextInput
                                    placeholder="Digite seu CPF ou CNPJ"
                                    style={styles.input}
                                    value={document}
                                    onChangeText={setDocument}
                                />
                            </View>

                            {/* VALOR MÉDIO */}
                            <Text style={styles.label}>
                                Valor médio
                            </Text>

                            <View style={styles.inputContainer}>
                                <DollarSign size={20} color="#999" />

                                <TextInput
                                    placeholder="R$ 100"
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={price}
                                    onChangeText={setPrice}
                                />
                            </View>

                            {/* HORARIOS */}
                            <Text style={styles.label}>
                                Disponibilidade
                            </Text>

                            <View style={styles.inputContainer}>
                                <Clock3 size={20} color="#999" />

                                <TextInput
                                    placeholder="Ex: Manhã e tarde"
                                    style={styles.input}
                                    value={availability}
                                    onChangeText={setAvailability}
                                />
                            </View>

                            {/* CERTIFICADOS */}
                            <Text style={styles.label}>
                                Possui certificação?
                            </Text>

                            <View style={styles.inputContainer}>
                                <BadgeCheck size={20} color="#999" />

                                <TextInput
                                    placeholder="Sim ou Não"
                                    style={styles.input}
                                    value={hasCertificate}
                                    onChangeText={setHasCertificate}
                                />
                            </View>
                            {
                                hasCertificate.toLowerCase() === 'sim' && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.uploadButton}
                                            onPress={pickCertificateImage}
                                        >
                                            <Text style={styles.uploadButtonText}>
                                                Selecionar imagem do certificado
                                            </Text>
                                        </TouchableOpacity>

                                        {
                                            certificateImage !== '' && (
                                                <Image
                                                    source={{ uri: certificateImage }}
                                                    style={styles.certificateImage}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }

                            {/* DESCRIÇÃO */}
                            <Text style={styles.label}>
                                Descrição dos serviços
                            </Text>

                            <View style={styles.textAreaContainer}>
                                <FileText size={20} color="#999" />

                                <TextInput
                                    placeholder="Fale sobre seus serviços e experiência..."
                                    style={styles.textArea}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            {/* BOTÃO */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleRegisterProvider}
                            >
                                <Text style={styles.buttonText}>
                                    Enviar Cadastro
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

    </SafeAreaView >
        
    );
}