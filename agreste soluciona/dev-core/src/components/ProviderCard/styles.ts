import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginTop:30,
    width:"50%",
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,

    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    color: '#111',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 8,
    color: '#555',
    fontSize: 15,
  },

  button: {
    marginTop: 12,
    height: 50,
    backgroundColor: '#F28C38',
    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default styles;