import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Briefcase,
  FileText,
  MapPin,
  Send,
} from 'lucide-react-native';

import api from '../../services/api';
import styles from './styles';
import { RootStackParamList } from '../../navigation/AppRoutes';

type RequestServiceProps = NativeStackScreenProps<
  RootStackParamList,
  'RequestService'
>;

interface LoggedUser {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
}

export default function RequestServiceScreen({
  navigation,
  route,
}: RequestServiceProps) {
  const insets = useSafeAreaInsets();
  const { providerId, providerName } = route.params;

  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim() || !address.trim()) {
      Alert.alert(
        'Campos obrigatorios',
        'Informe a descricao do problema e o endereco.'
      );

      return;
    }

    try {
      setLoading(true);

      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        Alert.alert(
          'Login necessario',
          'Faca login para solicitar um servico.'
        );

        navigation.navigate('Login');
        return;
      }

      const user: LoggedUser = JSON.parse(storedUser);

      await api.post('/service-requests', {
        clientId: user.id,
        providerId,
        description: description.trim(),
        address: address.trim(),
      });

      Alert.alert(
        'Sucesso',
        'Solicitacao enviada com sucesso. Aguarde o retorno do prestador.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel enviar a solicitacao.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                Solicitar Servico
              </Text>

              <Text style={styles.subtitle}>
                Envie os detalhes para o prestador
              </Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            <View style={styles.providerCard}>
              <View style={styles.providerIcon}>
                <Briefcase size={26} color="#F28C38" />
              </View>

              <View style={styles.providerTextContainer}>
                <Text style={styles.providerLabel}>
                  Prestador selecionado
                </Text>

                <Text style={styles.providerName}>
                  {providerName}
                </Text>
              </View>
            </View>

            <Text style={styles.label}>
              Descricao do problema
            </Text>

            <View style={styles.textAreaContainer}>
              <FileText size={20} color="#999" />

              <TextInput
                placeholder="Ex: Troca de chuveiro"
                placeholderTextColor="#999"
                style={styles.textArea}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <Text style={styles.label}>
              Endereco
            </Text>

            <View style={styles.inputContainer}>
              <MapPin size={20} color="#999" />

              <TextInput
                placeholder="Rua, numero, bairro"
                placeholderTextColor="#999"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Send size={20} color="#FFF" />

                  <Text style={styles.buttonText}>
                    Enviar Solicitacao
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
