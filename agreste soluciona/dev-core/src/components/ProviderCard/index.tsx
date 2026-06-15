// React permite criar componentes e usar recursos como hooks.
import React from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// Import traz dependencias usadas por este arquivo.
import {
  User,
  Briefcase,
  Clock3,
  MapPin,
} from 'lucide-react-native';

// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

// Tipos e recursos de navegacao entre telas do aplicativo.
import { useNavigation } from '@react-navigation/native';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';


interface ProviderCardProps {
  provider: {
    id: number;
    name: string;
    profession: string;
    city: string;
    experienceYears: number;
    availability: string;
    rating: number;
    reviewsCount: number;
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

      <View style={styles.ratingRow}>
        <Text style={styles.stars}>
          ★★★★★
        </Text>

        <Text style={styles.ratingText}>
          {provider.rating.toFixed(1)} ({provider.reviewsCount} avaliacoes)
        </Text>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          // Abre outra tela do aplicativo, podendo enviar parametros para ela.
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
