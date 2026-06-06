import React from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ArrowLeft,
} from 'lucide-react-native';

import ProviderCard from '../../components/ProviderCard';

import styles from './styles';

export default function ProvidersFeed({ navigation }: any) {

  const insets = useSafeAreaInsets();

  const providers = [
    {
      id: 1,
      name: 'Pedro Silva',
      profession: 'Eletricista',
      experience: '8 anos',
      rating: 4.8,
      reviews: 23,
    },
    {
      id: 2,
      name: 'João Santos',
      profession: 'Encanador',
      experience: '5 anos',
      rating: 4.6,
      reviews: 18,
    },
    {
      id: 3,
      name: 'Carlos Henrique',
      profession: 'Marceneiro',
      experience: '10 anos',
      rating: 4.9,
      reviews: 41,
    },
    {
      id: 4,
      name: 'José Roberto',
      profession: 'Pintor',
      experience: '7 anos',
      rating: 4.7,
      reviews: 12,
    },
  ];

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
      />

    </View>
  );
}