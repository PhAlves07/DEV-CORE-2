import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {
  ArrowLeft,
  UserCircle2,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
} from 'lucide-react-native';
/* IMPORTAR CSS */
import styles from './styles';


export default function ProfileScreen({ navigation, route }: any) {
  // Dados vindos do login

    console.log(route.params);

    const user = route.params?.user;

  return (
    <SafeAreaView style={styles.container}>
      {/* BOTÃO VOLTAR */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      {/* TOPO PERFIL */}
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

      {/* CARD INFORMAÇÕES */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Informações do Perfil
        </Text>

        {/* EMAIL */}
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Mail size={20} color="#F28C38" />
            <Text style={styles.infoText}>
              {user?.email}
            </Text>
          </View>
        </View>

        {/* TELEFONE */}
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Phone size={20} color="#F28C38" />
            <Text style={styles.infoText}>
              {user?.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* CARD PRESTADOR */}
      <TouchableOpacity style={styles.providerCard}
      onPress={() => navigation.navigate("Provider")}
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
              Cadastre seus serviços na plataforma
            </Text>
          </View>
        </View>

        <ChevronRight size={24} color="#999" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}