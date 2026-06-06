import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  User,
  Star,
  Briefcase,
  Clock3,
} from 'lucide-react-native';

import styles from './styles';

interface ProviderCardProps {
  provider: {
    name: string;
    profession: string;
    experience: string;
    rating: number;
    reviews: number;
  };
}

export default function ProviderCard({
  provider,
}: ProviderCardProps) {
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
        <Clock3 size={18} color="#666" />

        <Text style={styles.infoText}>
          {provider.experience}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Star size={18} color="#F2B705" />

        <Text style={styles.infoText}>
          {provider.rating} ({provider.reviews} avaliações)
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Contratar Serviço
        </Text>
      </TouchableOpacity>

    </View>
  );
}