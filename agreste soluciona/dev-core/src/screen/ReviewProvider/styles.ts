// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: '#666',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  providerBox: {
    alignItems: 'center',
    paddingVertical: 22,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  providerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },

  ratingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },

  starButton: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },

  commentInput: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#FFF',
  },

  submitButton: {
    marginTop: 20,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F28C38',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  submitButtonDisabled: {
    opacity: 0.7,
  },

  submitButtonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
