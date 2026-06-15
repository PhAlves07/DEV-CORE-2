// React permite criar componentes e usar recursos como hooks.
import React, { useState } from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
  Send,
  Star,
  User,
} from 'lucide-react-native';

// Servico HTTP centralizado usado para conversar com o backend.
import api, { getApiErrorMessage } from '../../services/api';
// Import traz dependencias usadas por este arquivo.
import FeedbackMessage, {
  FeedbackType,
} from '../../components/FeedbackMessage';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type ReviewProviderProps = NativeStackScreenProps<
  RootStackParamList,
  'ReviewProvider'
>;


interface LoggedUser {
  id: number;
}


export default function ReviewProviderScreen({
  navigation,
  route,
}: ReviewProviderProps) {
  const insets = useSafeAreaInsets();
  const { serviceRequestId, providerId, providerName } = route.params;

 
  const [rating, setRating] = useState(5);
 
  const [comment, setComment] = useState('');
 
  const [loading, setLoading] = useState(false);
 
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setFeedback(null);

      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        setFeedback({
          type: 'info',
          message: 'Faca login para enviar a avaliacao.',
        });
        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
        navigation.navigate('Login');
        return;
      }

      const user: LoggedUser = JSON.parse(storedUser);

      
      await api.post('/reviews', {
        serviceRequestId,
        clientId: user.id,
        providerId,
        rating,
        comment,
      });

      setFeedback({
        type: 'success',
        message: 'Avaliacao enviada com sucesso.',
      });
      // Retorna para a tela anterior na pilha de navegacao.
      setTimeout(() => navigation.goBack(), 1200);
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'Nao foi possivel enviar a avaliacao.'
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
            Avaliar Prestador
          </Text>

          <Text style={styles.subtitle}>
            Conte como foi o servico
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {feedback && (
          <FeedbackMessage
            type={feedback.type}
            message={feedback.message}
          />
        )}

        <View style={styles.providerBox}>
          <View style={styles.avatar}>
            <User size={36} color="#F28C38" />
          </View>

          <Text style={styles.providerName}>
            {providerName}
          </Text>
        </View>

        <View style={styles.ratingBox}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={styles.starButton}
              onPress={() => setRating(star)}
            >
              <Star
                size={36}
                color="#F28C38"
                fill={star <= rating ? '#F28C38' : 'transparent'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Comentario opcional"
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            loading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Send size={18} color="#FFF" />

              <Text style={styles.submitButtonText}>
                Enviar Avaliacao
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
