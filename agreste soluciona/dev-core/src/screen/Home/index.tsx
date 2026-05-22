import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
/* IMPORTAR NAVEGACAO */
import { useNavigation } from '@react-navigation/native';
/* IMPORTAR ICONES */
import { Feather, Ionicons } from '@expo/vector-icons';
/* IMPORTAR CSS */
import styles from './styles';
/* IMPORTAR CARROSSEL */
import ServiceCard from '../../components/ServiceCard';
/* IMPORTAR ASYNC */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
/* IMPORTAR USESTATE */
import { useState } from 'react';
/* IMPORTAR ICONES LUCIDE */
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

    const [userData, setUserData] = useState<any>(null);


    const handleProfile = async () => {

        const user = await AsyncStorage.getItem('@user');

        if (user) {
            navigation.navigate('Profile', {
                user: JSON.parse(user),
            });
        }
    };



    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {

        const userData = await AsyncStorage.getItem('@user');



        if (userData) {

            const user = JSON.parse(userData);

            setUser(user);
            setUserName(user.name);

        }

    };
    const handleLogout = async () => {

        await AsyncStorage.removeItem('@user');

        navigation.navigate('Login' as never);

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
            name: 'Marceneiro',
            icon: Hammer,
        },
        {
            id: 6,
            name: 'Outros',
            icon: Ellipsis,
        },
    ];
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
                    style={styles.input} />

                <Ionicons
                    name="search"
                    size={20}
                    color="#777" />
            </View>

            {/* BOTÃO */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Contratar
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
                        <TouchableOpacity key={item.id} style={styles.card}>
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

                            ) : (

                                <>

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setMenuVisible(false);
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