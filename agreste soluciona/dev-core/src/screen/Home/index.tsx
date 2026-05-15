import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

import ServiceCard from '../../components/ServiceCard';

export default function HomeScreen() {
    const navigation = useNavigation();
    return (

        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo} />

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login' as never)}
                    >
                        <Ionicons
                            name="person"
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <Ionicons
                        name="menu"
                        size={28}
                        color="#000" />
                </View>
            </View>

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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsContainer}
            >
                <ServiceCard

                    image={require('../../assets/services/1.png')} />

                <ServiceCard

                    image={require('../../assets/services/2.png')} />

                <ServiceCard

                    image={require('../../assets/services/3.png')} />

                <ServiceCard

                    image={require('../../assets/services/4.png')} />
                <ServiceCard

                    image={require('../../assets/services/5.png')} />
            </ScrollView>
        </ScrollView>

    );
}