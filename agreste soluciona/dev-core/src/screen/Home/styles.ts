// React Native fornece componentes visuais e APIs nativas usadas na tela.
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

  /* TITULO */
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    marginBottom: 25,
  },

  /* TEXTO */

  description: {
    marginTop: 50,

    fontSize: 16,
    lineHeight: 24,

    color: '#444',

    width: '90%',
  },

  /* PESQUISA */

  searchContainer: {
    marginTop: 15,

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

  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 35,
    marginBottom: 20,

    fontSize: 22,
    fontWeight: '700',

    color: '#111',
  },

  /* ICONES */
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  card: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 15,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  cardText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },


   /* MENU HAMBURGUER */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  menuContainer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },

  closeButton: {
    alignSelf: 'flex-end',
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  menuText: {
    fontSize: 18,
    marginLeft: 12,
  },

  logoutText: {
    fontSize: 18,
    marginLeft: 12,
    color: 'red',
  },
});


export default styles;
