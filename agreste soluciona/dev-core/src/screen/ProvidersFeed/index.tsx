// React permite criar componentes e usar recursos como hooks.
import React from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import traz dependencias usadas por este arquivo.
import {
  ArrowLeft,
  Search,
} from 'lucide-react-native';

// Import traz dependencias usadas por este arquivo.
import ProviderCard from '../../components/ProviderCard';

// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

// Tipos e recursos de navegacao entre telas do aplicativo.
import { RouteProp } from '@react-navigation/native';
// React permite criar componentes e usar recursos como hooks.
import { useEffect, useState } from 'react';
// Servico HTTP centralizado usado para conversar com o backend.
import api from '../../services/api';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';


interface Provider {
  id: number;
  name: string;
  profession: string;
  city: string;
  experienceYears: number;
  availability: string;
  rating: number;
  reviewsCount: number;
}

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type ProvidersFeedRouteProp = RouteProp<RootStackParamList, 'ProvidersFeed'>;


interface ProvidersFeedProps {
  navigation: any;
  route: ProvidersFeedRouteProp;
}


export default function ProvidersFeed({
  navigation,
  route,
}: ProvidersFeedProps) {
  const insets = useSafeAreaInsets();
  const initialSearch = route.params?.search || '';
  const selectedProfession = route.params?.profession || '';

 
  const [providers, setProviders] = useState<Provider[]>([]);
 
  const [loading, setLoading] = useState(true);
 
  const [name, setName] = useState(initialSearch);
 
  const [profession, setProfession] = useState(selectedProfession);
 
  const [city, setCity] = useState('');

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    setName(initialSearch);
  }, [initialSearch]);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    setProfession(selectedProfession);
  }, [selectedProfession]);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProviders();
    }, 350);

    return () => clearTimeout(timeout);
  }, [name, profession, city]);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadProviders = async () => {
    try {
      setLoading(true);

      
      const response = await api.get(
        '/providers/search',
        {
          params: {
            name: name || undefined,
            profession: profession || undefined,
            city: city || undefined,
          },
        }
      );

      setProviders(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading && providers.length === 0) {
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
          // Retorna para a tela anterior na pilha de navegacao.
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
            {profession
              ? `Categoria: ${profession}`
              : 'Encontre profissionais qualificados'}
          </Text>

        </View>

      </View>

      <View style={styles.filters}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar por nome"
            style={styles.filterInput}
            value={name}
            onChangeText={setName}
          />

          <Search size={19} color="#777" />
        </View>

        <TextInput
          placeholder="Profissao"
          style={styles.filterInputBox}
          value={profession}
          onChangeText={setProfession}
        />

        <TextInput
          placeholder="Cidade"
          style={styles.filterInputBox}
          value={city}
          onChangeText={setCity}
        />
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
