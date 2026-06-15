// React permite criar componentes e usar recursos como hooks.
import React, { useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
// AsyncStorage guarda dados simples no aparelho, como o usuario logado.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import traz dependencias usadas por este arquivo.
import {
  ArrowLeft,
  Briefcase,
  FileText,
  MapPin,
  Send,
} from 'lucide-react-native';

// Servico HTTP centralizado usado para conversar com o backend.
import api, { getApiErrorMessage } from '../../services/api';
// Import traz dependencias usadas por este arquivo.
import FeedbackMessage, {
  FeedbackType,
} from '../../components/FeedbackMessage';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type RequestServiceProps = NativeStackScreenProps<
  RootStackParamList,
  'RequestService'
>;


interface LoggedUser {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
}


export default function RequestServiceScreen({
  navigation,
  route,
}: RequestServiceProps) {
  const insets = useSafeAreaInsets();
  const { providerId, providerName } = route.params;

 
  const [description, setDescription] = useState('');
 
  const [address, setAddress] = useState('');
 
  const [loading, setLoading] = useState(false);
 
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const handleSubmit = async () => {
    if (!description.trim() || !address.trim()) {
      setFeedback({
        type: 'error',
        message: 'Informe a descricao do problema e o endereco.',
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
          message: 'Faca login para solicitar um servico.',
        });

        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
        navigation.navigate('Login');
        return;
      }

      const user: LoggedUser = JSON.parse(storedUser);

      
      await api.post('/service-requests', {
        clientId: user.id,
        providerId,
        description: description.trim(),
        address: address.trim(),
      });

      setFeedback({
        type: 'success',
        message: 'Solicitacao enviada. Aguarde o retorno do prestador.',
      });
      // Retorna para a tela anterior na pilha de navegacao.
      setTimeout(() => navigation.goBack(), 1200);
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'Nao foi possivel enviar a solicitacao.'
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              // Retorna para a tela anterior na pilha de navegacao.
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color="#111" />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>
                Solicitar Servico
              </Text>

              <Text style={styles.subtitle}>
                Envie os detalhes para o prestador
              </Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            {feedback && (
              <FeedbackMessage
                type={feedback.type}
                message={feedback.message}
              />
            )}

            <View style={styles.providerCard}>
              <View style={styles.providerIcon}>
                <Briefcase size={26} color="#F28C38" />
              </View>

              <View style={styles.providerTextContainer}>
                <Text style={styles.providerLabel}>
                  Prestador selecionado
                </Text>

                <Text style={styles.providerName}>
                  {providerName}
                </Text>
              </View>
            </View>

            <Text style={styles.label}>
              Descricao do problema
            </Text>

            <View style={styles.textAreaContainer}>
              <FileText size={20} color="#999" />

              <TextInput
                placeholder="Ex: Troca de chuveiro"
                placeholderTextColor="#999"
                style={styles.textArea}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <Text style={styles.label}>
              Endereco
            </Text>

            <View style={styles.inputContainer}>
              <MapPin size={20} color="#999" />

              <TextInput
                placeholder="Rua, numero, bairro"
                placeholderTextColor="#999"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Send size={20} color="#FFF" />

                  <Text style={styles.buttonText}>
                    Enviar Solicitacao
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
