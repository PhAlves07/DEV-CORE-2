// Import traz dependencias usadas por este arquivo.
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

// Arquivo de estilos que separa a aparencia da logica da tela.
import styles from './styles';


interface Props {
  image: any;
}


export default function ServiceCard({
  image,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
    >
      <Image
        source={image}
        style={styles.image}
      />

    </TouchableOpacity>
  );
}