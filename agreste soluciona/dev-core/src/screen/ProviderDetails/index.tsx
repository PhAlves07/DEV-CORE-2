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
  BadgeCheck,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  MessageSquareText,
  Star,
  User,
  XCircle,
} from 'lucide-react-native';

// Servico HTTP centralizado usado para conversar com o backend.
import api from '../../services/api';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type ProviderDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'ProviderDetails'
>;


interface ProviderDetails {
  id: number;
  name: string;
  profession: string;
  city: string;
  availability: string;
  experienceYears: number;
  description: string;
  hasCertificate?: boolean;
  rating: number;
  reviewsCount: number;
}


export default function ProviderDetailsScreen({
  navigation,
  route,
}: ProviderDetailsProps) {
  const insets = useSafeAreaInsets();
  const { providerId } = route.params;

 
  const [provider, setProvider] = useState<ProviderDetails | null>(null);
 
  const [loading, setLoading] = useState(true);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    loadProviderDetails();
  }, [providerId]);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadProviderDetails = async () => {
    try {
      
      const response = await api.get<ProviderDetails>(
        `/providers/${providerId}`
      );

      setProvider(response.data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Nao foi possivel carregar os detalhes do prestador.'
      );

      // Retorna para a tela anterior na pilha de navegacao.
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleRequestService = () => {
    if (!provider) {
      return;
    }

    // Abre outra tela do aplicativo, podendo enviar parametros para ela.
    navigation.navigate('RequestService', {
      providerId: provider.id,
      providerName: provider.name,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F28C38" />

        <Text style={styles.loadingText}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  if (!provider) {
    return null;
  }

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
            Detalhes
          </Text>

          <Text style={styles.subtitle}>
            Informacoes do prestador
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={44} color="#F28C38" />
          </View>

          <Text style={styles.providerName}>
            {provider.name}
          </Text>

          <Text style={styles.providerProfession}>
            {provider.profession}
          </Text>

          {provider.hasCertificate ? (
            <View style={styles.certificateBadge}>
              <CheckCircle2 size={18} color="#2E7D32" />

              <Text style={styles.certificateBadgeText}>
                Prestador certificado
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Briefcase size={20} color="#F28C38" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                Profissao
              </Text>

              <Text style={styles.infoValue}>
                {provider.profession}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MapPin size={20} color="#F28C38" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                Cidade
              </Text>

              <Text style={styles.infoValue}>
                {provider.city}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Clock3 size={20} color="#F28C38" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                Disponibilidade
              </Text>

              <Text style={styles.infoValue}>
                {provider.availability}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Calendar size={20} color="#F28C38" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                Experiencia
              </Text>

              <Text style={styles.infoValue}>
                {provider.experienceYears} anos de experiencia
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <BadgeCheck size={20} color="#F28C38" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>
                Possui certificacao
              </Text>

              <View style={styles.certificateStatus}>
                {provider.hasCertificate ? (
                  <CheckCircle2 size={18} color="#2E7D32" />
                ) : (
                  <XCircle size={18} color="#999" />
                )}

                <Text style={styles.infoValue}>
                  {provider.hasCertificate ? 'Sim' : 'Nao'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <View style={styles.descriptionHeader}>
            <FileText size={22} color="#F28C38" />

            <Text style={styles.sectionTitle}>
              Descricao
            </Text>
          </View>

          <Text style={styles.description}>
            {provider.description || 'Nenhuma descricao informada.'}
          </Text>
        </View>

        <View style={styles.reviewsCard}>
          <View style={styles.descriptionHeader}>
            <Star size={22} color="#F28C38" />

            <Text style={styles.sectionTitle}>
              Avaliacoes
            </Text>
          </View>

          <Text style={styles.ratingSummary}>
            Nota media: {provider.rating.toFixed(1)}
          </Text>

          <Text style={styles.reviewsCount}>
            {provider.reviewsCount} avaliacoes recebidas
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              // Abre outra tela do aplicativo, podendo enviar parametros para ela.
              navigation.navigate('ProviderReviews', {
                providerId: provider.id,
                providerName: provider.name,
              })
            }
          >
            <MessageSquareText size={18} color="#F28C38" />

            <Text style={styles.secondaryButtonText}>
              Ver Avaliacoes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRequestService}
        >
          <Text style={styles.buttonText}>
            Solicitar Servico
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
