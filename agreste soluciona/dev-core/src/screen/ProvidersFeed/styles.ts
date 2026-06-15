// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
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

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  filters: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 10,
  },

  searchBox: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  filterInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  filterInputBox: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',
    elevation: 2,
  },
});

export default styles;
