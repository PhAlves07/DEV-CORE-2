// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
  },

  successContainer: {
    backgroundColor: '#EAF6EC',
    borderColor: '#BFE3C4',
  },

  errorContainer: {
    backgroundColor: '#FDECEC',
    borderColor: '#F4B8B8',
  },

  infoContainer: {
    backgroundColor: '#EAF2FF',
    borderColor: '#BBD3F7',
  },

  successText: {
    color: '#2E7D32',
  },

  errorText: {
    color: '#C62828',
  },

  infoText: {
    color: '#1565C0',
  },
});

export default styles;
