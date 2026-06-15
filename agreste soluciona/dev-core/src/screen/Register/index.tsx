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
import { Ionicons } from '@expo/vector-icons';
/* IMPORTAR USESTATE */
// React permite criar componentes e usar recursos como hooks.
import { useState } from 'react';
/* IMPORTAR CSS */
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';
/* IMPORTAR CARREGAMENTO */
// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { ActivityIndicator, } from 'react-native';
/* IMPORTAR API */
// Servico HTTP centralizado usado para conversar com o backend.
import api, { getApiErrorMessage } from '../../services/api';
// Import traz dependencias usadas por este arquivo.
import FeedbackMessage, {
    FeedbackType,
} from '../../components/FeedbackMessage';
/* IMPORTAR NAVEGAÇÃO ROTAS */
// Tipos e recursos de navegacao entre telas do aplicativo.
import { useNavigation } from '@react-navigation/native';



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
   
    const [loading, setLoading] = useState(false);
   
    const [feedback, setFeedback] = useState<{
        type: FeedbackType;
        message: string;
    } | null>(null);


   
    const [showPassword, setShowPassword] = useState(false);
   
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const handleRegister = async () => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setFeedback(null);

        if (!name.trim()) {
            setNameError('Informe seu nome.');
            return;
        }

        if (!email.trim()) {
            setEmailError('Informe seu e-mail.');
            return;
        }

        if (!phone.trim()) {
            setPhoneError('Informe seu telefone.');
            return;
        }

        if (!password.trim()) {
            setPasswordError('Informe sua senha.');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('As senhas nao conferem.');
            return;
        }

        try {
            setLoading(true);

            
            await api.post(
                '/users/register',
                {
                    name,
                    email,
                    phone,
                    password,
                }
            );

            setFeedback({
                type: 'success',
                message: 'Conta criada com sucesso. Voce ja pode fazer login.',
            });

        } catch (error: any) {
            setFeedback({
                type: 'error',
                message: getApiErrorMessage(error, 'Erro ao cadastrar'),
            });
        } finally {
            setLoading(false);
        }

    };
    
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
                        Criar Conta
                    </Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para continuar
                    </Text>

                    {feedback && (
                        <FeedbackMessage
                            type={feedback.type}
                            message={feedback.message}
                        />
                    )}

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

                        {loading ? (
                            <ActivityIndicator
                                color="#FFF"
                            />
                        ) : (
                                <Text style={styles.buttonText}>
                                    Criar conta
                                </Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}
