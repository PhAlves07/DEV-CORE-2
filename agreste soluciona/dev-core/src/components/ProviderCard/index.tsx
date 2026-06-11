import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  User,
  Briefcase,
  Clock3,
  MapPin,
} from 'lucide-react-native';

import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppRoutes';

interface ProviderCardProps {
  provider: {
    id: number;
    name: string;
    profession: string;
    city: string;
    experienceYears: number;
    availability: string;
  };
}

export default function ProviderCard({
  provider,
}: ProviderCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <User size={26} color="#F28C38" />

        <Text style={styles.name}>
          {provider.name}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Briefcase size={18} color="#666" />

        <Text style={styles.infoText}>
          {provider.profession}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MapPin size={18} color="#666" />

        <Text style={styles.infoText}>
          {provider.city}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Clock3 size={18} color="#666" />

        <Text style={styles.infoText}>
          {provider.experienceYears} anos de experiência
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.availability}>
          Disponibilidade: {provider.availability}
        </Text>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          navigation.navigate('ProviderDetails', {
            providerId: provider.id,
          });
        }}
      >
        <Text style={styles.buttonText}>
          Contratar Serviço
        </Text>

      </TouchableOpacity>

    </View>
  );
}
