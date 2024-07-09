import { View, Image, Dimensions, StyleSheet } from 'react-native';
import newLogo from '../../assets/GourmetwheelCL.png'; 


const windowWidth = Dimensions.get('window').width;

export function Logo({ width }) {
  const size = width || windowWidth * 0.6;

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: size,
          width: size,
        }}
        source={newLogo} // Use the newLogo directly
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});
