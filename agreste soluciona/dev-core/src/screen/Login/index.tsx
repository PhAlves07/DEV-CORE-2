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
import { Feather, Ionicons } from '@expo/vector-icons';
/* IMPORTAR USESTATE */
import { useState } from 'react';
/* IMPORTAR CSS */
import styles from './styles';
/* IMPORTAR CARREGAMENTO */
import { ActivityIndicator, } from 'react-native';
/* IMPORTAR NAVEGAÇÃO ROTAS */
import { useNavigation } from '@react-navigation/native';
/* IMPORTAR API */
import api from '../../services/api';
/* IMPORTAR ASYNC */
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        try {

            const response = await api.post(
                '/users/login',
                {
                    email,
                    password,
                }
            );

            console.log(response.data);

            await AsyncStorage.setItem(
                '@user',
                JSON.stringify(response.data)

            );
            Alert.alert(
                'Sucesso',
                'Login realizado'
            );

            navigation.navigate('Home' as never);

        } catch (error: any) {

            console.log(error);
        

            Alert.alert(
                'Erro',
                error.response?.data || 'Erro no login'
            );

        }

    };
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home' as never)}
                        style={[
                             styles.buttonBack
                        ]}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>
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
                    {/* BOTÃO CADASTRO */}
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