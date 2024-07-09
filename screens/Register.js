import { useState } from "react";
import { Content, Wrapper, Title, Logo } from "../components/layout";
import Dropdown from "../components/controls/Dropdown";
import FormItem from "../components/controls/FormItem";
import Button from "../components/controls/Button";
import { registerEmailPass } from "../services/firebase";
import Colors from '../constants/Colors';

export default function Register({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    full_name: "",
    password: "",
    rol: "",
  });
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const rolOptions = [
    { label: "Comprador", value: "comprador" },
    { label: "Vendedor", value: "vendedor" },
  ];

  const registerUser = async () => {
    setLoading(true);
    const result = await registerEmailPass(user);
    if (result) {
      setUser({
        email: "",
        full_name: "",
        password: "",
        rol: "",
      });
      setLoading(false);
      navigation.navigate("Login");
    } else {
      setLoading(false);
    }
  };

  console.log('the role from register is', user.rol);

  return (
    <Wrapper backgroundColor={Colors.ghostWhite}>
      <Content>
        <Logo />
        <Title title="Registrar nueva cuenta" />
        <FormItem
          value={user.email}
          label="Correo electrónico"
          keyboardType="email-address"
          onChange={(value) =>
            setUser((prev) => ({ ...prev, email: value.trim() }))
          }
        />
        <FormItem
          value={user.full_name}
          label="Nombre completo"
          onChange={(value) =>
            setUser((prev) => ({ ...prev, full_name: value }))
          }
        />
        <FormItem
          secure={true}
          label="Contraseña"
          value={user.password}
          onChange={(value) =>
            setUser((prev) => ({ ...prev, password: value.trim() }))
          }
        />
        <Dropdown
          label="Rol (Comprador/Vendedor)"
          options={rolOptions}
          selectedValue={user.rol}
          onValueChange={(value) =>
            setUser((prev) => ({ ...prev, rol: value }))
          }
        />
        <Button onPress={registerUser} label={"REGISTRARME"} isLoading={loading} />
      </Content>
    </Wrapper>
  );
}
