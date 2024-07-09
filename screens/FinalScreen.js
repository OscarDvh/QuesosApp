import React from "react";
import { useState, useEffect } from "react";
import { FlatList, ScrollView, Alert, StyleSheet, Text, Image } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import StateModal from "../components/modals/StateModal";
import Button from "../components/controls/Button";

import { Content, Header, Wrapper } from "../components/layout";


import Colors from '../constants/Colors';



export default function FinalScreen({ navigation }) {

  const goToHome =() =>{
    navigation.navigate('Homec')
  }

  return (
    <Wrapper backgroundColor={Colors.ghostWhite}>
      <Header title="Carrito" showCart={true}/>
      <Content>
        <Text style={styles.Text}>DATOS PARA PAGO</Text>
        <Text style={styles.Text2}>Recuerda que tu pago se procesara en 48 horas</Text>
        <Image source={require('../assets/oxxo.png')} style={styles.image} />
        <Text style={styles.Text2}>Muestra este codigo en cajas</Text>
        <Image source={require('../assets/barcode.png')} style={styles.image} />
        <Text style={styles.Text}>GRACIAS POR LA COMPRA!</Text>
        <Button label={'Volver al Incio'} type="white" onPress={goToHome}/>
      </Content> 
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  centerTextContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text:{
    fontSize:20,
    fontWeight: 'bold',
    marginBottom:20,
  },
  Text2:{
    fontSize: 15,
    textAlign: "center",  
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
