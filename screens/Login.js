import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Colors from '../constants/Colors';

import { Content, Header, Wrapper, Title } from "../components/layout";
import Button from "../components/controls/Button";
import FormItem from "../components/controls/FormItem";

import { auth } from "../firebase-config";
import { loginWithEmailPass } from "../services/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; 


export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);


  const login = async () => {
    if (user && pass) {
      setLoading(true);
      try {
        await loginWithEmailPass(user, pass);
        const currentUser = auth.currentUser;
        const uid = currentUser.uid;
        const userRef = doc(db, 'users', uid); // Utilizamos la instancia de Firestore db directamente
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          //Log para checar los roles
          //console.log('Información del usuario:', userDoc.data());
          //console.log('user uid:', uid)
          const rol = userDoc.data().user_rol
          if (rol == "comprador"){
            navigation.navigate("Dashboardc");
            //Log para checar los roles
            //console.log('comprador')
          }
          else{
            navigation.navigate("Dashboard");
            //Log para checar los roles
            //console.log('vendedor');
          }

        } else {
          console.log('El usuario no tiene información en Firestore.');
        }
        setUser("");
        setPass("");
        setLoading(false);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setLoading(false);
      }
    }
  };
  

  const onChangeUser = (value) => {
    setUser(value);
  };

  const onChangePass = (value) => {
    setPass(value);
  };


  return (
    <Wrapper backgroundColor={Colors.ghostWhite} >
      <Header showBack={true} showCart={false} showLogOut={false}/>
      <Content>
        <Title title="Log in" />
        <FormItem
          value={user}
          label="Email"
          keyboardType="email-address"
          onChange={onChangeUser}
        ></FormItem>
        <FormItem
          value={pass}
          secure={true}
          label="Contraseña"
          onChange={onChangePass}
        ></FormItem>
        <Button label="ACCEDER" onPress={login} isLoading={loading} />
      </Content>
    </Wrapper>
  );

  
}