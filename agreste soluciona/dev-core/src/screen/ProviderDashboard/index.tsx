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
// Tipos e recursos de navegacao entre telas do aplicativo.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Import traz dependencias usadas por este arquivo.
import {
  ArrowLeft,
  Check,
  ClipboardList,
  FileText,
  MapPin,
  MessageCircle,
  User,
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
type ProviderDashboardProps = NativeStackScreenProps<
  RootStackParamList,
  'ProviderDashboard'
>;

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';


interface ProviderRequest {
  id: number;
  clientName: string;
  description: string;
  address: string;
  status: RequestStatus;
  createdAt: string;
}

const statusLabels: Record<RequestStatus, string> = {
  PENDING: 'Pendente',
  ACCEPTED: 'Aceita',
  REJECTED: 'Recusada',
  COMPLETED: 'Concluida',
};


export default function ProviderDashboardScreen({
  navigation,
  route,
}: ProviderDashboardProps) {
  const insets = useSafeAreaInsets();
  const { providerId } = route.params;

 
  const [requests, setRequests] = useState<ProviderRequest[]>([]);
 
  const [loading, setLoading] = useState(true);
 
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
 
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    loadRequests();
  }, [providerId]);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadRequests = async (showAlert = true) => {
    try {
      if (showAlert) {
        setLoading(true);
        setFeedback(null);
      }

      
      const response = await api.get<ProviderRequest[]>(
        `/service-requests/provider/${providerId}`
      );

      setRequests(response.data);
    } catch (error: any) {
      if (showAlert) {
        setFeedback({
          type: 'error',
          message: getApiErrorMessage(
            error,
            'Nao foi possivel carregar as solicitacoes.'
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
  const handleAccept = async (requestId: number) => {
    try {
      setActionLoadingId(requestId);
      setFeedback(null);

      
      await api.put(`/service-requests/${requestId}/accept`);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: 'ACCEPTED' }
            : request
        )
      );

      loadRequests(false);
      setFeedback({
        type: 'success',
        message: 'Solicitacao aceita. O cliente ja pode falar com voce pelo chat.',
      });
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'Nao foi possivel aceitar a solicitacao.'
        ),
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const handleReject = async (requestId: number) => {
    try {
      setActionLoadingId(requestId);
      setFeedback(null);

      
      await api.put(`/service-requests/${requestId}/reject`);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: 'REJECTED' }
            : request
        )
      );

      loadRequests(false);
      setFeedback({
        type: 'success',
        message: 'Solicitacao recusada com sucesso.',
      });
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'Nao foi possivel recusar a solicitacao.'
        ),
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const handleComplete = async (requestId: number) => {
    try {
      setActionLoadingId(requestId);
      setFeedback(null);

      
      await api.put(`/service-requests/${requestId}/complete`);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: 'COMPLETED' }
            : request
        )
      );

      loadRequests(false);
      setFeedback({
        type: 'success',
        message: 'Servico marcado como concluido.',
      });
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message: getApiErrorMessage(error, 'Nao foi possivel concluir o servico.'),
      });
    } finally {
      setActionLoadingId(null);
    }
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
            Solicitacoes Recebidas
          </Text>

          <Text style={styles.subtitle}>
            Gerencie os pedidos dos clientes
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F28C38" />

          <Text style={styles.loadingText}>
            Carregando solicitacoes...
          </Text>
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

          {requests.length === 0 ? (
            <View style={styles.emptyContainer}>
              <ClipboardList size={44} color="#F28C38" />

              <Text style={styles.emptyTitle}>
                Nenhuma solicitacao recebida
              </Text>

              <Text style={styles.emptyText}>
                Novos pedidos dos clientes aparecerao aqui.
              </Text>
            </View>
          ) : (
            requests.map((request) => (
              <View
                key={request.id}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconBox}>
                    <User size={22} color="#F28C38" />
                  </View>

                  <View style={styles.cardHeaderText}>
                    <Text style={styles.clientName}>
                      {request.clientName}
                    </Text>

                    <View
                      style={[
                        styles.statusBadge,
                        styles[`status${request.status}`],
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          styles[`statusText${request.status}`],
                        ]}
                      >
                        {statusLabels[request.status]}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <FileText size={18} color="#666" />

                  <Text style={styles.infoText}>
                    {request.description}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <MapPin size={18} color="#666" />

                  <Text style={styles.infoText}>
                    {request.address}
                  </Text>
                </View>

                {request.status === 'PENDING' && (
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.acceptButton,
                        actionLoadingId === request.id &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() => handleAccept(request.id)}
                      disabled={actionLoadingId === request.id}
                    >
                      <Check size={18} color="#FFF" />

                      <Text style={styles.actionButtonText}>
                        Aceitar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        styles.rejectButton,
                        actionLoadingId === request.id &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() => handleReject(request.id)}
                      disabled={actionLoadingId === request.id}
                    >
                      <X size={18} color="#FFF" />

                      <Text style={styles.actionButtonText}>
                        Recusar
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {request.status === 'ACCEPTED' && (
                  <View style={styles.acceptedActions}>
                    <TouchableOpacity
                      style={styles.chatButton}
                      onPress={() =>
                        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                        navigation.navigate('Chat', {
                          serviceRequestId: request.id,
                        })
                      }
                    >
                      <MessageCircle size={18} color="#FFF" />

                      <Text style={styles.actionButtonText}>
                        Chat
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.completeButton,
                        actionLoadingId === request.id &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() => handleComplete(request.id)}
                      disabled={actionLoadingId === request.id}
                    >
                      <Check size={18} color="#FFF" />

                      <Text style={styles.actionButtonText}>
                        Concluir
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
