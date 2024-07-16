import { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, setDoc } from "firebase/firestore";

import { Content, Header, Wrapper } from "../components/layout";
import Statec from "../components/controls/Statec";
import StateModal from "../components/modals/StateModal";
import Colors from '../constants/Colors';

import { auth, db } from "../firebase-config";

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({
    key: "",
    name: "",
    code: "",
    image: "",
    status: false,
  });
  const [data, setData] = useState([]);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const subscriber = onSnapshot(
      query(collection(db, "states"), orderBy("name")),
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
  }, []);

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

  const toggleModal = () => {
    setVisible(!visible);
  };

  let Product;
  const addToCart = (item) => {
    Product = item;
    Product['qty'] = 1;
    Product['TotalProductPrice'] = Product.code * Product.qty;

    const cartRef = collection(db, 'Cart ' + userUid); // Reference to the collection
    const docRef = doc(cartRef, item.key); // Reference to the document in the collection

    // Add the item to the cart
    setDoc(docRef, Product)
      .then(() => {
        console.log('Successfully added item to cart');
      })
      .catch((error) => {
        console.error('Error adding item to cart: ', error);
      });
  };

  return (
    <Wrapper backgroundColor={Colors.ghostWhite}>
      <StateModal
        selected={selected}
        setSelected={setSelected}
        visible={visible}
        onClose={toggleModal}
      />
      <Header title="Gourmet Wheel Comprador" showCart={true} />
      <Content>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <Statec item={item} addToCart={addToCart} />
          )}
          keyExtractor={(item) => item.key}
        />
      </Content>
    </Wrapper>
  );
}
