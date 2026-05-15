import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 250,
    backgroundColor: '#FFFFFF',

    borderRadius: 18,
    marginTop: 10,
    marginRight: 16,

    overflow: 'hidden',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  content: {
    width: 100,
    height: 10,
    padding: 12,
  },

});

export default styles;