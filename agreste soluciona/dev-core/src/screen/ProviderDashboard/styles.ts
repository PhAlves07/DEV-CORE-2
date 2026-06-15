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
    fontSize: 22,
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
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 28,
    marginTop: 20,
    elevation: 2,
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
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardHeaderText: {
    flex: 1,
  },

  clientName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  infoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },

  statusPENDING: {
    backgroundColor: '#FFF5D6',
  },

  statusACCEPTED: {
    backgroundColor: '#EAF6EC',
  },

  statusREJECTED: {
    backgroundColor: '#FDECEC',
  },

  statusCOMPLETED: {
    backgroundColor: '#EAF2FF',
  },

  statusTextPENDING: {
    color: '#A66A00',
  },

  statusTextACCEPTED: {
    color: '#2E7D32',
  },

  statusTextREJECTED: {
    color: '#C62828',
  },

  statusTextCOMPLETED: {
    color: '#1565C0',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },

  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  acceptButton: {
    backgroundColor: '#2E7D32',
  },

  rejectButton: {
    backgroundColor: '#C62828',
  },

  completeButton: {
    flex: 1,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F28C38',
    marginTop: 8,
  },

  acceptedActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },

  chatButton: {
    flex: 1,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#111',
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  actionButtonText: {
    marginLeft: 6,
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default styles;
