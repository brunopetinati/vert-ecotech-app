import { View, StyleSheet, Animated } from 'react-native';
import { Text } from '@rneui/themed'
import { useEffect, useState } from 'react'

const Toast = ({ message, duration = 3000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, duration);
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.toast}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    zIndex: 1,
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 10,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Toast;