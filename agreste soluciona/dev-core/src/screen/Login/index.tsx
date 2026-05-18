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
/* IMPORTAR NAVEGAÇÃO ROTAS */
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser } from '../../services/api';


export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleLogin() {

        let valid = true;


        setEmailError('');

        setPasswordError('');



        /* VALIDAR EMAIL */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
            valid = false;
        }


        /* VALIDAR SENHA */

        if (password.length < 6) {
            setPasswordError(
                'Senha deve ter no mínimo 6 caracteres'
            );

            valid = false;
        }

        /* SUCESSO */
        if (valid) {

            setLoading(true);

            try {

                const user = await loginUser({
                    email,
                    password,
                });

                await AsyncStorage.setItem(
                    '@agreste:user',
                    JSON.stringify(user)
                );

                Alert.alert(
                    'Sucesso',
                    'Login feito com sucesso!'
                );

                navigation.navigate('Home' as never);

            } catch (error) {

                Alert.alert(
                    'Erro',
                    error instanceof Error
                        ? error.message
                        : 'Não foi possível fazer login'
                );

            } finally {

                setLoading(false);

            }
        }
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
                        Login
                    </Text>

                    <Text style={styles.subtitle}>
                        Faça o Login para continuar
                    </Text>


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


                    {/* BOTÃO LOGIN */}
                    <TouchableOpacity

                        onPress={handleLogin}

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
                                    Entrar
                                </Text>

                            )
                        }
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>

                        <Text style={styles.registerText}>
                            Não tem conta?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Register' as never)
                            }
                        >
                            <Text style={styles.registerLink}>
                                Cadastre-se
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}
