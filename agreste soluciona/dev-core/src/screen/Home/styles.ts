import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  /* HEADER */

  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  logo: {
    width: 50,
    height: 50,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  /* TEXTO */

  description: {
    marginTop: 70,

    fontSize: 16,
    lineHeight: 24,

    color: '#444',

    width: '90%',
  },

  /* PESQUISA */

  searchContainer: {
    marginTop: 24,

    width: '100%',
    height: 52,

    backgroundColor: '#FFFFFF',

    borderRadius: 30,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  /* BOTÃO */

  button: {
    marginTop: 20,

    alignSelf: 'center',

    width: 140,
    height: 42,

    backgroundColor: '#F58634',

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  /* TÍTULO */

  sectionTitle: {
    marginTop: 80,
    marginBottom: 20,

    fontSize: 22,
    fontWeight: '700',

    color: '#111',
  },

  /* CARDS */

  cardsContainer: {
    paddingBottom: 30,
  },

  serviceCard: {
    width: 140,
    height: 200,

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    marginRight: 14,

    overflow: 'hidden',

    elevation: 3,
  },

  serviceImage: {
    width: '100%',
    height: 120,
  },

  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',

    color: '#222',

    padding: 10,
  },
});

export default styles;