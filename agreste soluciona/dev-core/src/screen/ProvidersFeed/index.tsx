import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowLeft,
} from 'lucide-react-native';

import ProviderCard from '../../components/ProviderCard';

import styles from './styles';

import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Provider {
  id: number;
  name: string;
  profession: string;
  city: string;
  experienceYears: number;
  availability: string;
}

export default function ProvidersFeed({ navigation }: any) {


  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {

      const response = await api.get(
        '/providers/approved'
      );
      console.log(
        'Prestadores recebidos:',
        response.data
      );

      setProviders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const insets = useSafeAreaInsets();


  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#F28C38"
        />

        <Text
          style={{
            marginTop: 10,
          }}
        >
          Carregando prestadores...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft
            size={24}
            color="#111"
          />
        </TouchableOpacity>

        <View>

          <Text style={styles.title}>
            Prestadores
          </Text>

          <Text style={styles.subtitle}>
            Encontre profissionais qualificados
          </Text>

        </View>

      </View>

      {/* LISTA */}

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProviderCard provider={item} />
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 50,
            }}
          >
            <Text>
              Nenhum prestador disponível.
            </Text>
          </View>
        }
      />

    </View>
  );
}