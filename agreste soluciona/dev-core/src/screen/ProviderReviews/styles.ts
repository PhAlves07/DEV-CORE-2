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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#666',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  emptyContainer: {
    alignItems: 'center',
    borderRadius: 18,
    padding: 28,
    marginTop: 20,
    backgroundColor: '#FFF4EA',
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },

  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  card: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    backgroundColor: '#FFF',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  starsRow: {
    flexDirection: 'row',
    marginTop: 5,
  },

  comment: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
});

export default styles;
