import { StyleSheet } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const styles = StyleSheet.create({
    logo: {
        width: 140,
        height: 140,

        resizeMode: 'contain',

        alignSelf: 'center',

        marginBottom: 30,
    },
    errorText: {
        color: '#E53935',

        marginTop: -10,
        marginBottom: 12,

        marginLeft: 4,

        fontSize: 13,
    },

    /* CONTAINER PRINCIPAL */

    container: {
        flexGrow: 1,

        backgroundColor: '#F2F2F2',

        paddingHorizontal: 24,
        paddingTop: 70,
        paddingBottom: 40,
    },

    /* TÍTULO */

    title: {
        fontSize: 34,
        fontWeight: 'bold',

        color: '#111',

        marginBottom: 8,
    },

    /* SUBTÍTULO */

    subtitle: {
        fontSize: 16,

        color: '#666',

        marginBottom: 40,
    },

    /* INPUTS */

    input: {
        width: '100%',
        height: 56,

        backgroundColor: '#FFFFFF',

        borderRadius: 14,

        paddingHorizontal: 18,

        fontSize: 15,
        color: '#222',

        marginBottom: 18,

        elevation: 2,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.05,
        shadowRadius: 4,
    },

    /* BOTÃO Login */

    button: {
        width: '100%',
        height: 56,

        backgroundColor: '#F58634',

        borderRadius: 14,

        justifyContent: 'center',
        alignItems: 'center',

        marginTop: 10,

        elevation: 2,
    },

     /* BOTÃO CADASTRO */

    registerContainer: {

        flexDirection: 'row',

        justifyContent: 'center',

        alignItems: 'center',

        marginTop: 28,
    },

    registerText: {

        fontSize: 15,

        color: '#666',
    },

    registerLink: {

        fontSize: 15,

        fontWeight: '700',

        color: '#F58634',

        marginLeft: 5,
    },

    /* TEXTO BOTÃO LOGIN */

    buttonText: {
        color: '#FFFFFF',

        fontSize: 16,
        fontWeight: 'bold',
    },
    passwordContainer: {

        width: '100%',

        height: 56,

        backgroundColor: '#FFF',

        borderRadius: 14,

        paddingHorizontal: 18,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        marginBottom: 18,

        elevation: 2,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.05,

        shadowRadius: 4,
    },

    passwordInput: {
        flex: 1,

        fontSize: 15,

        color: '#222',
    },
    passwordConfirmContainer: {

        width: '100%',

        height: 56,

        backgroundColor: '#FFF',

        borderRadius: 14,

        paddingHorizontal: 18,

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        marginBottom: 18,

        elevation: 2,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.05,

        shadowRadius: 4,
    },

    passwordConfirmInput: {
        flex: 1,

        fontSize: 15,

        color: '#222',
    },

});

export default styles;