import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    scroll: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    header: {
        marginTop: 10,
    },

    backButton: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
    },

    topContent: {
        alignItems: 'center',
        marginTop: 25,
    },

    iconContainer: {
        width: 90,
        height: 90,
        borderRadius: 30,
        backgroundColor: '#F28C38',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        marginTop: 18,
    },

    subtitle: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        width: '80%',
    },

    formContainer: {
        marginTop: 35,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        marginTop: 18,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 18,
        paddingHorizontal: 15,
        height: 60,

        elevation: 2,
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: '#333',
    },

    textAreaContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingTop: 18,
        minHeight: 150,

        elevation: 2,
    },

    textArea: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: '#333',
    },

    button: {
        height: 60,
        backgroundColor: '#F28C38',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '700',
    },
    uploadButton: {
        height: 55,
        backgroundColor: '#F28C38',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    uploadButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },

    certificateImage: {
        width: '100%',
        height: 200,
        borderRadius: 18,
        marginTop: 15,
    },
});

export default styles;