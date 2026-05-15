import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
  },

  swipeText: {
    position: 'absolute',
    bottom: 60,
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
});

export default styles;