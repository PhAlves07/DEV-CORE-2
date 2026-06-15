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

  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  messageRow: {
    width: '100%',
    marginBottom: 10,
  },

  myMessageRow: {
    alignItems: 'flex-end',
  },

  otherMessageRow: {
    alignItems: 'flex-start',
  },

  messageBubble: {
    maxWidth: '82%',
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 10,
    elevation: 1,
  },

  myMessage: {
    backgroundColor: '#F28C38',
    borderBottomRightRadius: 4,
  },

  otherMessage: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
  },

  senderName: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#F28C38',
  },

  messageText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#222',
  },

  myMessageText: {
    color: '#FFF',
  },

  messageTime: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontSize: 11,
    color: '#777',
  },

  myMessageTime: {
    color: '#FFF3E8',
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    gap: 10,
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#222',
  },

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#F28C38',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.7,
  },
});

export default styles;
