import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  UserCircle2,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
} from 'lucide-react-native';

import api from '../../services/api';
import styles from './styles';

interface LoggedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ProviderDetails {
  id: number;
}

export default function ProfileScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState<LoggedUser | null>(
    route.params?.user || null
  );

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    if (user) {
      return;
    }

    const storedUser = await AsyncStorage.getItem('@user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const handleMyRequests = () => {
    navigation.navigate('MyRequests');
  };

  const handleProviderDashboard = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        Alert.alert(
          'Login necessario',
          'Faca login para acessar o painel do prestador.'
        );

        navigation.navigate('Login');
        return;
      }

      const loggedUser: LoggedUser = JSON.parse(storedUser);

      const response = await api.get<ProviderDetails>(
        `/providers/user/${loggedUser.id}`
      );

      navigation.navigate('ProviderDashboard', {
        providerId: response.data.id,
      });
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Painel indisponivel',
        'Voce ainda nao possui um cadastro de prestador aprovado ou cadastrado.'
      );
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <UserCircle2 size={90} color="#F28C38" />
          </View>

          <Text style={styles.userName}>
            {user?.name}
          </Text>

          <Text style={styles.userSubtitle}>
            Cliente Agreste Soluciona
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Informacoes do Perfil
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Mail size={20} color="#F28C38" />

              <Text style={styles.infoText}>
                {user?.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Phone size={20} color="#F28C38" />

              <Text style={styles.infoText}>
                {user?.phone}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.providerCard}
          onPress={handleMyRequests}
        >
          <View style={styles.providerLeft}>
            <View style={styles.providerIcon}>
              <ClipboardList size={28} color="#fff" />
            </View>

            <View>
              <Text style={styles.providerTitle}>
                Minhas Solicitacoes
              </Text>

              <Text style={styles.providerSubtitle}>
                Acompanhe os servicos que voce pediu
              </Text>
            </View>
          </View>

          <ChevronRight size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.providerCard}
          onPress={handleProviderDashboard}
        >
          <View style={styles.providerLeft}>
            <View style={styles.providerIcon}>
              <LayoutDashboard size={28} color="#fff" />
            </View>

            <View>
              <Text style={styles.providerTitle}>
                Painel do Prestador
              </Text>

              <Text style={styles.providerSubtitle}>
                Visualize e responda pedidos recebidos
              </Text>
            </View>
          </View>

          <ChevronRight size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.providerCard}
          onPress={() => navigation.navigate('Provider')}
        >
          <View style={styles.providerLeft}>
            <View style={styles.providerIcon}>
              <Briefcase size={28} color="#fff" />
            </View>

            <View>
              <Text style={styles.providerTitle}>
                Tornar-se Prestador
              </Text>

              <Text style={styles.providerSubtitle}>
                Cadastre seus servicos na plataforma
              </Text>
            </View>
          </View>

          <ChevronRight size={24} color="#999" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
