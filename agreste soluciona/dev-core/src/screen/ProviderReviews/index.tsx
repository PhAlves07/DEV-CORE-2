// React permite criar componentes e usar recursos como hooks.
import React, { useEffect, useState } from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import traz dependencias usadas por este arquivo.
import {
  ArrowLeft,
  MessageSquareText,
  Star,
  User,
} from 'lucide-react-native';

// Servico HTTP centralizado usado para conversar com o backend.
import api from '../../services/api';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type ProviderReviewsProps = NativeStackScreenProps<
  RootStackParamList,
  'ProviderReviews'
>;


interface ProviderReview {
  rating: number;
  comment: string;
  clientName: string;
}


export default function ProviderReviewsScreen({
  navigation,
  route,
}: ProviderReviewsProps) {
  const insets = useSafeAreaInsets();
  const { providerId, providerName } = route.params;

 
  const [reviews, setReviews] = useState<ProviderReview[]>([]);
 
  const [loading, setLoading] = useState(true);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    loadReviews();
  }, [providerId]);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadReviews = async () => {
    try {
      setLoading(true);

      
      const response = await api.get<ProviderReview[]>(
        `/providers/${providerId}/reviews`
      );

      setReviews(response.data);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel carregar as avaliacoes.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        color="#F28C38"
        fill={index < rating ? '#F28C38' : 'transparent'}
      />
    ));
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
            Avaliacoes
          </Text>

          <Text style={styles.subtitle}>
            {providerName}
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F28C38" />

          <Text style={styles.loadingText}>
            Carregando avaliacoes...
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {reviews.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MessageSquareText size={44} color="#F28C38" />

              <Text style={styles.emptyTitle}>
                Nenhuma avaliacao ainda
              </Text>

              <Text style={styles.emptyText}>
                As avaliacoes dos clientes aparecerao aqui.
              </Text>
            </View>
          ) : (
            reviews.map((review, index) => (
              <View
                key={`${review.clientName}-${index}`}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <User size={20} color="#F28C38" />
                  </View>

                  <View style={styles.cardHeaderText}>
                    <Text style={styles.clientName}>
                      {review.clientName}
                    </Text>

                    <View style={styles.starsRow}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                </View>

                <Text style={styles.comment}>
                  {review.comment || 'Cliente nao deixou comentario.'}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
