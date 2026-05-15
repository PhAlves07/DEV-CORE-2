import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

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