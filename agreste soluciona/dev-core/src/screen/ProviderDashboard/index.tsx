import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Check,
  ClipboardList,
  FileText,
  MapPin,
  User,
  X,
} from 'lucide-react-native';

import api from '../../services/api';
import { RootStackParamList } from '../../navigation/AppRoutes';
import styles from './styles';

type ProviderDashboardProps = NativeStackScreenProps<
  RootStackParamList,
  'ProviderDashboard'
>;

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

  useEffect(() => {
    loadRequests();
  }, [providerId]);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const response = await api.get<ProviderRequest[]>(
        `/service-requests/provider/${providerId}`
      );

      setRequests(response.data);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel carregar as solicitacoes.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      setActionLoadingId(requestId);

      await api.put(`/service-requests/${requestId}/accept`);

      await loadRequests();
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel aceitar a solicitacao.'
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      setActionLoadingId(requestId);

      await api.put(`/service-requests/${requestId}/reject`);

      await loadRequests();
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel recusar a solicitacao.'
      );
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
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
