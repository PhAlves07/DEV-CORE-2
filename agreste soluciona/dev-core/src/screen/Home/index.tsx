// Import traz dependencias usadas por este arquivo.
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
/* IMPORTAR ICONES */
// Biblioteca de icones usada para melhorar a comunicacao visual dos botoes e cards.
import { Feather, Ionicons } from '@expo/vector-icons';
/* IMPORTAR CSS */
// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';
/* IMPORTAR CARROSSEL */
// Import traz dependencias usadas por este arquivo.
import ServiceCard from '../../components/ServiceCard';
/* IMPORTAR ASYNC */
// AsyncStorage guarda dados simples no aparelho, como o usuario logado.
import AsyncStorage from '@react-native-async-storage/async-storage';
// React permite criar componentes e usar recursos como hooks.
import { useEffect } from 'react';
/* IMPORTAR USESTATE */
// React permite criar componentes e usar recursos como hooks.
import { useState } from 'react';
/* IMPORTAR ICONES LUCIDE */
// Import traz dependencias usadas por este arquivo.
import {
    Zap,
    Wrench,
    Paintbrush,
    Key,
    Hammer,
    Ellipsis,
} from 'lucide-react-native';


export default function HomeScreen({ navigation }: any) {

   
    const [user, setUser] = useState<any>(null);
   
    const [userName, setUserName] = useState('');
   
    const [menuVisible, setMenuVisible] = useState(false);
   
    const [searchText, setSearchText] = useState('');

   
    const [userData, setUserData] = useState<any>(null);


    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const handleProfile = async () => {

        const user = await AsyncStorage.getItem('@user');

        if (user) {
            // Abre outra tela do aplicativo, podendo enviar parametros para ela.
            navigation.navigate('Profile', {
                user: JSON.parse(user),
            });
        }
    };



    // Hook executado para carregar dados ou reagir a mudancas de parametros/estado.
    useEffect(() => {
        loadUser();

        const unsubscribe = navigation.addListener('focus', loadUser);

        return unsubscribe;
    }, [navigation]);

    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const loadUser = async () => {

        const userData = await AsyncStorage.getItem('@user');



        if (userData) {

            const user = JSON.parse(userData);

            setUser(user);
            setUserName(user.name);

        }

    };
    // Funcao assincrona usada para buscar/salvar dados ou executar uma acao do usuario.
    const handleLogout = async () => {

        await AsyncStorage.removeItem('@user');

        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
        navigation.navigate('Login' as never);

    };

    const handleSearchProviders = () => {
        const search = searchText.trim();

        // Abre outra tela do aplicativo, podendo enviar parametros para ela.
        navigation.navigate('ProvidersFeed', {
            search: search || undefined,
        });
    };

    const categories = [
        {
            id: 1,
            name: 'Eletricista',
            icon: Zap,
        },
        {
            id: 2,
            name: 'Encanador',
            icon: Wrench,
        },
        {
            id: 3,
            name: 'Pintor',
            icon: Paintbrush,
        },
        {
            id: 4,
            name: 'Chaveiro',
            icon: Key,
        },
        {
            id: 5,
            name: 'Pedreiro',
            icon: Hammer,
        },
        {
            id: 6,
            name: 'Outros',
            icon: Ellipsis,
        },
    ];

    const isAdmin = Boolean(user?.admin);

    return (

        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo} />

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={handleProfile}
                    >
                        <Feather
                            name="user"
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setMenuVisible(true)}
                    >
                        <Feather
                            name="menu"
                            size={32}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.greeting}>

                {
                    userName
                        ? `Olá, ${userName} 👋`
                        : 'Olá 👋'
                }

            </Text>

            {/* TEXTO */}
            <Text style={styles.description}>
                Encontre profissionais e contrate serviços por tudo que precisar
            </Text>

            {/* PESQUISA */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="No que você está procurando?"
                    style={styles.input}
                    value={searchText}
                    onChangeText={setSearchText}
                    returnKeyType="search"
                    onSubmitEditing={handleSearchProviders}
                />

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearchProviders}
                >
                    <Ionicons
                        name="search"
                        size={20}
                        color="#777"
                    />
                </TouchableOpacity>
            </View>

            {/* BOTÃO */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSearchProviders}
            >
                <Text style={styles.buttonText}>
                    Pesquisar
                </Text>
            </TouchableOpacity>

            {/* TÍTULO */}
            <Text style={styles.sectionTitle}>
                Top Serviços requisitados
            </Text>
            <View style={styles.categoriesContainer}>
                {categories.map((item) => {
                    const Icon = item.icon;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => {
                                // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                                navigation.navigate('ProvidersFeed', {
                                    profession: item.name === 'Outros'
                                        ? undefined
                                        : item.name,
                                });
                            }}
                        >
                            <Icon size={38} color="#F28C38" />

                            <Text style={styles.cardText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent={true}
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.menuContainer}>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setMenuVisible(false)}
                        >

                            <Feather
                                name="x"
                                size={28}
                                color="#000"
                            />

                        </TouchableOpacity>

                        <Text style={styles.menuTitle}>
                            Menu
                        </Text>

                        {
                            user ? (

                                <>

                                    {isAdmin && (
                                        <TouchableOpacity
                                            style={styles.menuItem}
                                            onPress={() => {
                                                setMenuVisible(false);
                                                // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                                                navigation.navigate('AdminDashboard' as never);
                                            }}
                                        >

                                            <Feather
                                                name="settings"
                                                size={22}
                                                color="#000"
                                            />

                                            <Text style={styles.menuText}>
                                                Admin
                                            </Text>

                                        </TouchableOpacity>
                                    )}

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={handleLogout}
                                    >

                                        <Feather
                                            name="log-out"
                                            size={22}
                                            color="red"
                                        />

                                        <Text style={styles.logoutText}>
                                            Logout
                                        </Text>

                                    </TouchableOpacity>

                                </>

                            ) : (

                                <>

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setMenuVisible(false);
                                            // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                                            navigation.navigate('Login' as never);
                                        }}
                                    >

                                        <Feather
                                            name="log-in"
                                            size={22}
                                            color="#000"
                                        />

                                        <Text style={styles.menuText}>
                                            Entrar
                                        </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setMenuVisible(false);
                                            // Abre outra tela do aplicativo, podendo enviar parametros para ela.
                                            navigation.navigate('Register' as never);
                                        }}
                                    >

                                        <Feather
                                            name="user-plus"
                                            size={22}
                                            color="#000"
                                        />

                                        <Text style={styles.menuText}>
                                            Cadastrar
                                        </Text>

                                    </TouchableOpacity>

                                </>

                            )
                        }

                    </View>

                </View>

            </Modal>
        </ScrollView>

    );
}
