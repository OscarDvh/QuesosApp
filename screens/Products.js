import { useState, useEffect } from "react";
import { FlatList, ScrollView, Alert, StyleSheet, Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import StateModal from "../components/modals/StateModal";

import { Content, Header, Wrapper } from "../components/layout";
import StateCart from "../components/controls/StateCart"
import Colors from '../constants/Colors';
import Button from "../components/controls/Button";

import { auth, db } from "../firebase-config";

export default function Products({ navigation }) {
  const [cartEmpty, setCartEmpty] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({
    key: "",
    name: "",
    code: "",
    status: false,
  });
  const [data, setData] = useState([]);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid); // Store user UID in state
      } else {
        navigation.navigate("Login");
      }
    });
    return subscriber;
  }, [auth]);

  useEffect(() => {
    const subscriber = onSnapshot(
      query(collection(db, 'Cart ' + userUid), orderBy("name")),
      (querySnapshot) => {
        const states = [];
        querySnapshot.forEach((doc) => {
          states.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setData(states);
        setCartEmpty(states.length === 0);
      }
    );
    return subscriber;
  }, [userUid]);

  //deletes item from cart
  const deleteState = async key => {
    try {
      // Creamos primero la referencia al documento que vamos a eliminar
      const stateRef = doc(db, 'Cart ' + userUid, key);
      // Eliminamos nuestro documento
      await deleteDoc(stateRef);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  //updates quantity and price 
  const increaseProduct =async (item)=>{
    try{
      item.qty += 1;
      item.TotalProductPrice = item.qty * item.code;

      const cartRef = collection(db, 'Cart ' + userUid);
      const docRef = doc(cartRef, item.key);
      await updateDoc(docRef, {
        qty: item.qty,
        TotalProductPrice: item.TotalProductPrice
    })
    console.log('Product updated')
      
    }catch(error){
      console.log("Error updating product: ",error)
    }

  }

  const decreaseProduct= async (item)=>{
    if(item.qty > 1){
      item.qty= item.qty-1
      item.TotalProductPrice= item.qty * item.code
      const cartRef = collection(db, 'Cart ' + userUid);
      const docRef = doc(cartRef, item.key);
      await updateDoc(docRef, {
        qty: item.qty,
        TotalProductPrice: item.TotalProductPrice
      })
      console.log('Product updated')
    }else{
      console.log('not able to modify since quantity is less than 1')
    }
  }




  const toggleModal = () => {
    setVisible(!visible);
  };

  const goToCheckout = () =>{
    if (!cartEmpty) {
      navigation.navigate("Checkout");
    } else {
      Alert.alert("Carrito Vacío", "Agrega al menos un producto antes de ir al checkout.");
    }
  }


  /*esto estaba haciendo algo raro si pasa algo raro de nuevo va a abajo del wrapper 
  <StateModal
        selected={selected}
        setSelected={setSelected}
        visible={visible}
        onClose={toggleModal}
      /> */

  return (
    <Wrapper backgroundColor={Colors.ghostWhite}>

      <Header title="Carrito" showCart={true} showLogOut={false}/>
      <Content>
        <ScrollView horizontal={true} style={{ width: '100%' }} /*contentContainerStyle={styles.centerTextContainer}*/>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <StateCart item={item} onDelete={deleteState} increaseProduct={increaseProduct} decreaseProduct={decreaseProduct}/>
            )}
            keyExtractor={(item) => item.key}
          />
        </ScrollView>
        <Button label={"Pagar"} type="white" onPress={goToCheckout} />
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
  centerText:{
    fontSize:20,
    fontWeight: 'bold',
  }
})