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
    fontSize: 23,
    fontWeight: '700',
    color: '#111',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: '#666',
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 8,
  },

  tabButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    elevation: 1,
  },

  activeTabButton: {
    backgroundColor: '#F28C38',
  },

  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444',
    textAlign: 'center',
  },

  activeTabText: {
    color: '#FFF',
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

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 19,
    color: '#555',
  },

  statusText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#F28C38',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  actionButton: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  approveButton: {
    backgroundColor: '#2E7D32',
  },

  rejectButton: {
    backgroundColor: '#C62828',
  },

  actionText: {
    marginLeft: 6,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  comment: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});

export default styles;
