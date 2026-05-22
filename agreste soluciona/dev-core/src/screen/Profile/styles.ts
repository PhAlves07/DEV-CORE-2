import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },

  backButton: {
    marginTop: 10,
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  userName: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 18,
    color: '#111',
  },

  userSubtitle: {
    fontSize: 15,
    color: '#777',
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 22,
    marginTop: 35,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111',
  },

  infoRow: {
    marginBottom: 18,
  },

  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#444',
  },

  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginTop: 25,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  providerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  providerIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#F28C38',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  providerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  providerSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
    width: 180,
  },
});
export default styles;