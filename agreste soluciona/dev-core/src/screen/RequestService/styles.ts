// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
    marginBottom: 24,
    elevation: 3,
  },

  providerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  providerTextContainer: {
    flex: 1,
  },

  providerLabel: {
    fontSize: 13,
    color: '#777',
  },

  providerName: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111',
  },

  textAreaContainer: {
    minHeight: 140,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 20,
    elevation: 2,
  },

  textArea: {
    flex: 1,
    minHeight: 110,
    marginLeft: 10,
    fontSize: 15,
    color: '#111',
  },

  button: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F28C38',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
