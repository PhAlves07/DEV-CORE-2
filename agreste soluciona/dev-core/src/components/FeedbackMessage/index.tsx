// React permite criar componentes e usar recursos como hooks.
import React from 'react';
// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { Text, View } from 'react-native';
// Biblioteca de icones usada para melhorar a comunicacao visual dos botoes e cards.
import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';

// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';

export type FeedbackType = 'success' | 'error' | 'info';


interface FeedbackMessageProps {
  message: string;
  type?: FeedbackType;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle2,
    color: '#2E7D32',
    containerStyle: styles.successContainer,
    textStyle: styles.successText,
  },
  error: {
    icon: AlertCircle,
    color: '#C62828',
    containerStyle: styles.errorContainer,
    textStyle: styles.errorText,
  },
  info: {
    icon: Info,
    color: '#1565C0',
    containerStyle: styles.infoContainer,
    textStyle: styles.infoText,
  },
};


export default function FeedbackMessage({
  message,
  type = 'info',
}: FeedbackMessageProps) {
  if (!message) {
    return null;
  }

  const config = feedbackConfig[type];
  const Icon = config.icon;

  return (
    <View style={[styles.container, config.containerStyle]}>
      <Icon size={20} color={config.color} />

      <Text style={[styles.text, config.textStyle]}>
        {message}
      </Text>
    </View>
  );
}
