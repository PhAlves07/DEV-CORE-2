// React permite criar componentes e usar recursos como hooks.
import React, { useEffect, useState } from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
  Check,
  ClipboardList,
  Star,
  User,
  Users,
  X,
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
type AdminDashboardProps = NativeStackScreenProps<
  RootStackParamList,
  'AdminDashboard'
>;

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type Tab = 'providers' | 'users' | 'requests' | 'reviews';


interface AdminProvider {
  id: number;
  name: string;
  profession: string;
  city: string;
  approved: boolean;
}


interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}


interface AdminRequest {
  id: number;
  clientName: string;
  providerName: string;
  status: string;
}


interface AdminReview {
  id: number;
  clientName: string;
  providerName: string;
  rating: number;
  comment: string;
}


interface LoggedUser {
  id: number;
  admin?: boolean;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'providers', label: 'Prestadores' },
  { id: 'users', label: 'Usuarios' },
  { id: 'requests', label: 'Solicitacoes' },
  { id: 'reviews', label: 'Avaliacoes' },
];


export default function AdminDashboardScreen({
  navigation,
}: AdminDashboardProps) {
  const insets = useSafeAreaInsets();

 
  const [activeTab, setActiveTab] = useState<Tab>('providers');
 
  const [providers, setProviders] = useState<AdminProvider[]>([]);
 
  const [users, setUsers] = useState<AdminUser[]>([]);
 
  const [requests, setRequests] = useState<AdminRequest[]>([]);
 
  const [reviews, setReviews] = useState<AdminReview[]>([]);
 
  const [loading, setLoading] = useState(true);
 
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
 
  const [actionLoadingType, setActionLoadingType] = useState<
    'approve' | 'reject' | null
  >(null);
 
  const [adminUserId, setAdminUserId] = useState<number | null>(null);
 
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    loadData();
  }, []);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadData = async (showAlert = true) => {
    try {
      if (showAlert) {
        setLoading(true);
        setFeedback(null);
      }

      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        setFeedback({
          type: 'error',
          message: 'Faca login com um usuario administrador.',
        });
        setLoading(false);
        // Retorna para a tela anterior na pilha de navegacao.
        setTimeout(() => navigation.goBack(), 1200);
        return;
      }

      const user: LoggedUser = JSON.parse(storedUser);

      if (!user.admin) {
        setFeedback({
          type: 'error',
          message: 'Seu usuario nao tem permissao para acessar o painel admin.',
        });
        setLoading(false);
        // Retorna para a tela anterior na pilha de navegacao.
        setTimeout(() => navigation.goBack(), 1200);
        return;
      }

      setAdminUserId(user.id);

      const config = {
        headers: {
          'X-User-Id': String(user.id),
        },
      };

      const [
        providersResponse,
        usersResponse,
        requestsResponse,
        reviewsResponse,
      ] = await Promise.all([
        
        api.get<AdminProvider[]>('/admin/providers', config),
        
        api.get<AdminUser[]>('/admin/users', config),
        
        api.get<AdminRequest[]>('/admin/service-requests', config),
        
        api.get<AdminReview[]>('/admin/reviews', config),
      ]);

      setProviders(providersResponse.data);
      setUsers(usersResponse.data);
      setRequests(requestsResponse.data);
      setReviews(reviewsResponse.data);
    } catch (error: any) {
      if (showAlert) {
        setFeedback({
          type: 'error',
          message: getApiErrorMessage(
            error,
            'Nao foi possivel carregar o painel admin.'
          ),
        });
      }
    } finally {
      if (showAlert) {
        setLoading(false);
      }
    }
  };

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const handleProviderAction = async (
    providerId: number,
    action: 'approve' | 'reject'
  ) => {
    try {
      if (!adminUserId) {
        setFeedback({
          type: 'error',
          message: 'Usuario administrador nao identificado.',
        });
        return;
      }

      setActionLoadingId(providerId);
      setActionLoadingType(action);
      setFeedback(null);

      
      await api.put(`/providers/${providerId}/${action}`, null, {
        headers: {
          'X-User-Id': String(adminUserId),
        },
      });

      setProviders((currentProviders) =>
        currentProviders.map((provider) =>
          provider.id === providerId
            ? { ...provider, approved: action === 'approve' }
            : provider
        )
      );

      loadData(false);
      setFeedback({
        type: 'success',
        message:
          action === 'approve'
            ? 'Prestador aprovado com sucesso.'
            : 'Prestador reprovado com sucesso.',
      });
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'Nao foi possivel atualizar o prestador.'
        ),
      });
    } finally {
      setActionLoadingId(null);
      setActionLoadingType(null);
    }
  };

  const renderProviders = () => (
    providers.map((provider) => (
      <View key={provider.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Users size={22} color="#F28C38" />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>{provider.name}</Text>
            <Text style={styles.cardSubtitle}>
              {provider.profession} - {provider.city}
            </Text>
          </View>
        </View>

        <Text style={styles.statusText}>
          {provider.approved ? 'Aprovado' : 'Pendente'}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.approveButton,
              actionLoadingId === provider.id &&
                actionLoadingType === 'approve' &&
                styles.buttonDisabled,
            ]}
            onPress={() => handleProviderAction(provider.id, 'approve')}
            disabled={actionLoadingId === provider.id}
          >
            {actionLoadingId === provider.id &&
            actionLoadingType === 'approve' ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Check size={18} color="#FFF" />
                <Text style={styles.actionText}>Aprovar</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.rejectButton,
              actionLoadingId === provider.id &&
                actionLoadingType === 'reject' &&
                styles.buttonDisabled,
            ]}
            onPress={() => handleProviderAction(provider.id, 'reject')}
            disabled={actionLoadingId === provider.id}
          >
            {actionLoadingId === provider.id &&
            actionLoadingType === 'reject' ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <X size={18} color="#FFF" />
                <Text style={styles.actionText}>Reprovar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    ))
  );

  const renderUsers = () => (
    users.map((item) => (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <User size={22} color="#F28C38" />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.email}</Text>
            <Text style={styles.cardSubtitle}>{item.phone}</Text>
          </View>
        </View>
      </View>
    ))
  );

  const renderRequests = () => (
    requests.map((item) => (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <ClipboardList size={22} color="#F28C38" />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>{item.clientName}</Text>
            <Text style={styles.cardSubtitle}>
              Prestador: {item.providerName}
            </Text>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    ))
  );

  const renderReviews = () => (
    reviews.map((item) => (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
            <Star size={22} color="#F28C38" />
          </View>

          <View style={styles.cardHeaderText}>
            <Text style={styles.cardTitle}>
              {item.rating} estrelas
            </Text>
            <Text style={styles.cardSubtitle}>
              {item.clientName} para {item.providerName}
            </Text>
            <Text style={styles.comment}>
              {item.comment || 'Sem comentario.'}
            </Text>
          </View>
        </View>
      </View>
    ))
  );

  const renderContent = () => {
    if (activeTab === 'providers') {
      return renderProviders();
    }

    if (activeTab === 'users') {
      return renderUsers();
    }

    if (activeTab === 'requests') {
      return renderRequests();
    }

    return renderReviews();
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
          <Text style={styles.title}>Administrativo</Text>
          <Text style={styles.subtitle}>Gerencie dados do MVP</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F28C38" />
          <Text style={styles.loadingText}>Carregando painel...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {feedback && (
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
            />
          )}

          {renderContent()}
        </ScrollView>
      )}
    </View>
  );
}
