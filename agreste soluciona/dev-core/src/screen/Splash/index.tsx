import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';



import React, {
  useEffect,
  useRef,
} from 'react';

export default function SplashScreen() {
  const navigation = useNavigation();

  const translateY = useRef(
    new Animated.Value(120)
  ).current;

  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const screenTranslateY = useRef(
    new Animated.Value(0)
  ).current;

  const handlePress = () => {

    Animated.timing(screenTranslateY, {
      toValue: -900,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {

      navigation.navigate('Home' as never);

    });
  };

  useEffect(() => {

    Animated.parallel([

      Animated.timing(translateY, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);
  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {
            translateY: screenTranslateY,
          },
        ],
      }}
    >

      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={handlePress}
      >

        <Animated.View
          style={{
            alignItems: 'center',
            opacity,

            transform: [
              {
                translateY,
              },
            ],
          }}
        >

          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

        </Animated.View>
        <Animated.Text
          style={[
            styles.swipeText,
            {
              opacity,
            },
          ]}
        >
          Toque para continuar
        </Animated.Text>

      </TouchableOpacity>
    </Animated.View>
  );
}