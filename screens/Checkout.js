    import { Alert } from "react-native";
    import { getAuth } from "firebase/auth";
    import { useState, useEffect } from "react";
    import { getFirestore,deleteDoc , collection, query, orderBy, onSnapshot, doc, setDoc, QuerySnapshot, getDocs } from "firebase/firestore";
    import Colors from '../constants/Colors';
    import { View, Text, StyleSheet} from "react-native";
    import { onAuthStateChanged } from "firebase/auth";
    import { FontAwesome5 } from '@expo/vector-icons';
    import { Foundation } from '@expo/vector-icons';

    import Button from "../components/controls/Button";
    import FormItem from "../components/controls/FormItem";
    import { Content, Header, Wrapper } from "../components/layout";


    import {db, app, auth } from "../firebase-config";
    import { TouchableOpacity } from "react-native-gesture-handler";

    export default function Checkout({navigation}){
        const [data, setData] = useState([]);
        const [userUid, setUserUid] = useState(null);
        const [totalQty, setTotalQty] = useState(0);
        const [totalPrice, setTotalPrice] = useState(0);

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
                
            }
            );
            return subscriber;
        }, [userUid]);


        useEffect(() => {
            const totals = onSnapshot(
            query(collection(db, 'Cart ' + userUid)),
            (querySnapshot) => {
                let totalQty =0;
                let totalPrice=0;
                querySnapshot.forEach((doc) => {
                    totalPrice += doc.data().TotalProductPrice
                    totalQty +=doc.data().qty
                
                });
                setTotalPrice(totalPrice)
                setTotalQty(totalQty)         
            }
            );
            return totals;
        }, [userUid]);

        /*const deleteCart = () =>{
            const deleteAll = onSnapshot(
                query(collection(db, 'Cart ' + userUid)),
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        deleteDoc(doc.ref)               
                    });
                    setTotalPrice(totalPrice)
                    setTotalQty(totalQty)         
                }
                );
                return deleteAll;
        }*/
    // Función para borrar todos los productos del carrito
const deleteAllCart = async () => {
    try {
      const cartRef = collection(db, 'Cart ' + userUid);
      
      const snapshot = await getDocs(cartRef);
        snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      console.log("Todos los productos fueron eliminados del carrito.");
      navigation.navigate('FinalScreen');

    } catch (error) {
      console.error("Error al intentar eliminar productos:", error);
      Alert.alert("Error", error.message);
    }
  };
  
        



        return(
            <Wrapper backgroundColor={Colors.ghostWhite}>
                <Header showBack={true} showCart={true} showLogOut={false}/>
                <Content>
                    <Text style={styles.centerText} >
                        Productos totales: {totalQty}
                        <Foundation name="pricetag-multiple" size={24} color="black" />
                    </Text>
                    <Text style={styles.centerText}>
                        Precio total: {totalPrice}
                        <FontAwesome5 name="coins" size={24} color="black"/>
                    </Text>

                    <Button label={'Finalizar Compra'} type="white" onPress={deleteAllCart} />

                </Content>
            </Wrapper>
        )

    }

    const styles = StyleSheet.create({
        centerTextContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
        centerText:{
        fontSize:20,
        padding:50,
        fontWeight: 'bold',
        },
    })