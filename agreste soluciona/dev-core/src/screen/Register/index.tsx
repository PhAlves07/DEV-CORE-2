import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Platform,
    Image,
} from 'react-native';

/* IMPORTAR ICONES */
import { Ionicons } from '@expo/vector-icons';
/* IMPORTAR USESTATE */
import { useState } from 'react';
/* IMPORTAR CSS */
import styles from './styles';
/* IMPORTAR CARREGAMENTO */
import { ActivityIndicator, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { registerUser } from '../../services/api';


export default function RegisterScreen() {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRegister() {

        let valid = true;

        setNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');



        /* VALIDAR NOME */

        if (name.trim().length < 3) {
            setNameError('Nome muito curto');
            valid = false;
        }

        /* VALIDAR EMAIL */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
            valid = false;
        }

        /* VALIDAR TELEFONE */
        const phoneNumbers =
            phone.replace(/\D/g, '');

        if (phoneNumbers.length < 11) {
            setPhoneError('Telefone inválido');
            valid = false;
        }

        /* VALIDAR SENHA */

        if (password.length < 6) {
            setPasswordError(
                'Senha deve ter no mínimo 6 caracteres'
            );

            valid = false;
        }

        /* CONFIRMAR SENHA */

        if (password !== confirmPassword) {
            setConfirmPasswordError(
                'As senhas não coincidem'
            );

            valid = false;
        }

        /* SUCESSO */
        if (valid) {

            setLoading(true);

            try {

                const user = await registerUser({
                    name,
                    email,
                    phone,
                    password,
                });

                await AsyncStorage.setItem(
                    '@agreste:user',
                    JSON.stringify(user)
                );

                Alert.alert(
                    'Sucesso',
                    'Conta criada com sucesso!'
                );

                navigation.navigate('Home' as never);

            } catch (error) {

                Alert.alert(
                    'Erro',
                    error instanceof Error
                        ? error.message
                        : 'Não foi possível cadastrar'
                );

            } finally {

                setLoading(false);

            }
        }
    }
    function formatPhone(value: string) {

        /* REMOVE TUDO QUE NÃO FOR NÚMERO */

        const numbers = value.replace(/\D/g, '');

        /* LIMITA A 11 DÍGITOS */

        const limited = numbers.slice(0, 11);

        /* FORMATAR */

        if (limited.length <= 2) {
            return limited;
        }

        if (limited.length <= 7) {
            return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
        }

        return `(${limited.slice(0, 2)}) ${limited.slice(
            2,
            7
        )}-${limited.slice(7)}`;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >

                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >

                    <View>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo} />
                    </View>
                    {/* TÍTULO */}
                    <Text style={styles.title}>
                        Criar Conta
                    </Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para continuar
                    </Text>

                    {/* INPUT NOME */}
                    <TextInput
                        placeholder="Nome completo"
                        placeholderTextColor="#999"
                        style={styles.input}

                        value={name}
                        onChangeText={setName}
                    />
                    {
                        nameError ? (
                            <Text style={styles.errorText}>
                                {nameError}
                            </Text>
                        ) : null
                    }

                    {/* INPUT EMAIL */}
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}

                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? (
                        <Text style={styles.errorText}>
                            {emailError}
                        </Text>
                    ) : null}

                    {/* INPUT TELEFONE */}
                    <TextInput
                        placeholder="Telefone"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        style={styles.input}

                        value={phone}
                        onChangeText={(text) =>
                            setPhone(formatPhone(text))
                        }
                    />
                    {phoneError ? (
                        <Text style={styles.errorText}>
                            {phoneError}
                        </Text>
                    ) : null}

                    {/* INPUT SENHA */}
                    <View style={styles.passwordContainer}>

                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor="#999"

                            secureTextEntry={!showPassword}

                            style={styles.passwordInput}

                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? 'eye-off'
                                        : 'eye'
                                }

                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>

                    </View>
                    {passwordError ? (
                        <Text style={styles.errorText}>
                            {passwordError}
                        </Text>
                    ) : null}

                    {/* INPUT CONFIRMAR SENHA */}
                    <View style={styles.passwordConfirmContainer}>

                        <TextInput
                            placeholder="Confirmar Senha"
                            placeholderTextColor="#999"

                            secureTextEntry={!showConfirmPassword}

                            style={styles.passwordConfirmInput}

                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons
                                name={
                                    showConfirmPassword
                                        ? 'eye-off'
                                        : 'eye'
                                }

                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>

                    </View>
                    {confirmPasswordError ? (
                        <Text style={styles.errorText}>
                            {confirmPasswordError}
                        </Text>
                    ) : null}

                    {/* BOTÃO */}
                    <TouchableOpacity
                        
                        onPress={handleRegister}

                        disabled={loading}

                        style={[
                            styles.button,

                            loading && {
                                opacity: 0.7,
                            },
                        ]}
                    >
                        {
                            loading ? (

                                <ActivityIndicator
                                    color="#FFF"
                                />

                            ) : (

                                <Text style={styles.buttonText}>
                                    Criar conta
                                </Text>

                            )
                        }
                    </TouchableOpacity>
                </ScrollView>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}
