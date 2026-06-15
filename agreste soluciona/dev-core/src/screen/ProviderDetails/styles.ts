// React Native fornece componentes visuais e APIs nativas usadas na tela.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#666',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#F5F5F5',
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
    paddingBottom: 110,
  },

  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    elevation: 3,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  providerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },

  providerProfession: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  certificateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#EAF6EC',
  },

  certificateBadgeText: {
    marginLeft: 7,
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 13,
    color: '#777',
  },

  infoValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  certificateStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  descriptionCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },

  reviewsCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    elevation: 3,
  },

  ratingSummary: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  reviewsCount: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },

  secondaryButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F28C38',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  secondaryButtonText: {
    marginLeft: 7,
    color: '#F28C38',
    fontSize: 15,
    fontWeight: '700',
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },

  button: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F28C38',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
