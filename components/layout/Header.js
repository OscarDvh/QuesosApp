import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Logo } from './Logo';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

import { logoutAuth } from '../../services/firebase';

export function Header({
  title,
  showBack = false,
  showLogOut = true,
  showCart = true,
}) {
  const navigation = useNavigation();

  const goToCart = () =>{
    navigation.navigate("Products");
  }

  const goToBack = () => {
    navigation.goBack();
  };

  const showDrawer = () => {
    navigation.openDrawer();
  };

  const logout = async () => {
    await logoutAuth();
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={goToBack}>
          <Ionicons name="arrow-back-outline" size={40} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={showDrawer}>
          <Ionicons name="menu" size={40} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        
        <Logo width={120} />
      </View>
      {showCart ? (
        <TouchableOpacity onPress={goToCart}>
          <Entypo name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
      ) : (<View></View>)}
      {showLogOut ? (
        <TouchableOpacity onPress={logout}>
          <Entypo name="log-out" size={30} color="black" />
        </TouchableOpacity>
      ) : (<View></View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logo: {
    height: 100,
    width: 100,
  },
  logoContainer: {
    paddingLeft: 30,
    alignItems: 'center'
  },
  title: {
    backgroundColor: Colors.white,
    borderColor: Colors.platinum,
    borderRadius: 20,
    borderWidth: 1,
    color: Colors.jet,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
    paddingHorizontal: 10,
  },
});