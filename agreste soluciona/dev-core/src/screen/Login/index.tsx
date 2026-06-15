// Import traz dependencias usadas por este arquivo.
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Image,
} from 'react-native';

/* IMPORTAR ICONES */
// Biblioteca de icones usada para melhorar a comunicacao visual dos botoes e cards.
import { Feather, Ionicons } from '@expo/vector-icons';
/* IMPORTAR USESTATE */
// React permite criar componentes e usar recursos como hooks.
import { useState } from 'react';
/* IMPORTAR CSS */
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';
/* IMPORTAR CARREGAMENTO */
// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { ActivityIndicator, } from 'react-native';
/* IMPORTAR NAVEGAÇÃO ROTAS */
// Tipos e recursos de navegacao entre telas do aplicativo.
import { useNavigation } from '@react-navigation/native';
/* IMPORTAR API */
// Servico HTTP centralizado usado para conversar com o backend.
import api, { getApiErrorMessage } from '../../services/api';
// Import traz dependencias usadas por este arquivo.
import FeedbackMessage, {
    FeedbackType,
} from '../../components/FeedbackMessage';
/* IMPORTAR ASYNC */
// AsyncStorage guarda dados simples no aparelho, como o usuario logado.
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen() {
    const navigation = useNavigation();

   
    const [email, setEmail] = useState('');
   
    const [password, setPassword] = useState('');
   
    const [emailError, setEmailError] = useState('');
   
    const [passwordError, setPasswordError] = useState('');
   
    const [showPassword, setShowPassword] = useState(false);
   
    const [loading, setLoading] = useState(false);
   
    const [feedback, setFeedback] = useState<{
        type: FeedbackType;
        message: string;
    } | null>(null);

    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');
        setFeedback(null);

        if (!email.trim()) {
            setEmailError('Informe seu e-mail.');
            return;
        }

        if (!password.trim()) {
            setPasswordError('Informe sua senha.');
            return;
        }

        try {
            setLoading(true);

            
            const response = await api.post(
                '/users/login',
                {
                    email,
                    password,
                }
            );

            await AsyncStorage.setItem(
                '@user',
                JSON.stringify(response.data)

            );
            setFeedback({
                type: 'success',
                message: 'Login realizado com sucesso.',
            });

            // Abre outra tela do aplicativo, podendo enviar parametros para ela.
            setTimeout(() => navigation.navigate('Home' as never), 600);

        } catch (error: any) {
            setFeedback({
                type: 'error',
                message: getApiErrorMessage(error, 'Erro no login'),
            });
        } finally {
            setLoading(false);
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
                        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
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


                    {feedback && (
                        <FeedbackMessage
                            type={feedback.type}
                            message={feedback.message}
                        />
                    )}

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
                                // Abre outra tela do aplicativo, podendo enviar parametros para ela.
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
