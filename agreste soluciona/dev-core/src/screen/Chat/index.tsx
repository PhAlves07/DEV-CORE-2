// React permite criar componentes e usar recursos como hooks.
import React, { useEffect, useRef, useState } from 'react';
// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// AsyncStorage guarda dados simples no aparelho, como o usuario logado.
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Safe Area evita que conteudo fique escondido por notch, status bar ou bordas do aparelho.
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Biblioteca de icones usada para melhorar a comunicacao visual dos botoes e cards.
import { ArrowLeft, Send } from 'lucide-react-native';

// Servico HTTP centralizado usado para conversar com o backend.
import api from '../../services/api';
// Tipos e recursos de navegacao entre telas do aplicativo.
import { RootStackParamList } from '../../navigation/AppRoutes';
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

// Type cria um apelido tipado para parametros, rotas ou estados do TypeScript.
type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;


interface Conversation {
  id: number;
  serviceRequestId: number;
}


interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  content: string;
  createdAt: string;
}


interface LoggedUser {
  id: number;
  name: string;
}


export default function ChatScreen({
  navigation,
  route,
}: ChatProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const { serviceRequestId } = route.params;

 
  const [user, setUser] = useState<LoggedUser | null>(null);
 
  const [conversation, setConversation] = useState<Conversation | null>(null);
 
  const [messages, setMessages] = useState<Message[]>([]);
 
  const [content, setContent] = useState('');
 
  const [loading, setLoading] = useState(true);
 
  const [sending, setSending] = useState(false);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    loadInitialData();
  }, [serviceRequestId]);

  // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
  useEffect(() => {
    if (!conversation) {
      return;
    }

    const interval = setInterval(() => {
      loadMessages(conversation.id, false);
    }, 3000);

    return () => clearInterval(interval);
  }, [conversation]);

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadInitialData = async () => {
    try {
      setLoading(true);

      const storedUser = await AsyncStorage.getItem('@user');

      if (!storedUser) {
        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
        navigation.navigate('Login');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      
      const conversationResponse = await api.get<Conversation>(
        `/conversations/${serviceRequestId}`
      );

      setConversation(conversationResponse.data);
      await loadMessages(conversationResponse.data.id, true);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel abrir o chat.'
      );

      // Retorna para a tela anterior na pilha de navegacao.
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const loadMessages = async (
    conversationId: number,
    scrollToEnd: boolean
  ) => {
    try {
      
      const response = await api.get<Message[]>(
        `/messages/${conversationId}`
      );

      setMessages(response.data);

      if (scrollToEnd) {
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
  const sendMessage = async () => {
    if (!conversation || !user || content.trim().length === 0) {
      return;
    }

    try {
      setSending(true);

      
      await api.post('/messages', {
        conversationId: conversation.id,
        senderId: user.id,
        content,
      });

      setContent('');
      await loadMessages(conversation.id, true);
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        error.response?.data || 'Nao foi possivel enviar a mensagem.'
      );
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          // Retorna para a tela anterior na pilha de navegacao.
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#111" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Chat</Text>
          <Text style={styles.subtitle}>Converse sobre o servico</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F28C38" />
          <Text style={styles.loadingText}>Abrindo conversa...</Text>
        </View>
      ) : (
        <>
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message) => {
              const mine = message.senderId === user?.id;

              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    mine ? styles.myMessageRow : styles.otherMessageRow,
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      mine ? styles.myMessage : styles.otherMessage,
                    ]}
                  >
                    {!mine && (
                      <Text style={styles.senderName}>
                        {message.senderName}
                      </Text>
                    )}

                    <Text
                      style={[
                        styles.messageText,
                        mine && styles.myMessageText,
                      ]}
                    >
                      {message.content}
                    </Text>

                    <Text
                      style={[
                        styles.messageTime,
                        mine && styles.myMessageTime,
                      ]}
                    >
                      {formatTime(message.createdAt)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem"
              value={content}
              onChangeText={setContent}
              multiline
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                sending && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={sending}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Send size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}
