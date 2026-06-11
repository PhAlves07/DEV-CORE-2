import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ClipboardList,
} from 'lucide-react-native';

import api from '../../services/api';
import { RootStackParamList } from '../../navigation/AppRoutes';
import styles from './styles';

type MyRequestsProps = NativeStackScreenProps<
  RootStackParamList,
  'MyRequests'
>;

type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';

interface LoggedUser {
  id: number;
}

interface ClientRequest {
  id: number;
  providerName: string;
  profession: string;
  status: RequestStatus;
  createdAt: string;
}

const statusLabels: Record<RequestStatus, string> = {
  PENDING: 'Pendente',
  ACCEPTED: 'Aceita',
  REJECTED: 'Recusada',
  COMPLETED: 'Concluida',
};

export default function MyRequestsScreen({
  navigation,
}: MyRequestsProps) {
  const insets = useSafeAreaInsets();

  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        Alert.alert(
          'Login necessario',
          'Faca login para ver suas solicitacoes.'
        );

        navigation.navigate('Login');
        return;
      }

      const user: LoggedUser = JSON.parse(storedUser);

      const response = await api.get<ClientRequest[]>(
        `/service-requests/client/${user.id}`
      );

      setRequests(response.data);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel carregar suas solicitacoes.'
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            Minhas Solicitacoes
          </Text>

          <Text style={styles.subtitle}>
            Acompanhe seus pedidos de servico
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
                Nenhuma solicitacao encontrada
              </Text>

              <Text style={styles.emptyText}>
                Suas solicitacoes de servico aparecerao aqui.
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
                    <Briefcase size={22} color="#F28C38" />
                  </View>

                  <View style={styles.cardHeaderText}>
                    <Text style={styles.providerName}>
                      {request.providerName}
                    </Text>

                    <Text style={styles.profession}>
                      {request.profession}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Calendar size={18} color="#666" />

                  <Text style={styles.dateText}>
                    {formatDate(request.createdAt)}
                  </Text>
                </View>

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
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
