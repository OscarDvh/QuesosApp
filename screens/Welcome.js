import { Content, Wrapper, Title, Logo } from '../components/layout';
import Button from '../components/controls/Button';
import Colors from '../constants/Colors';

export default function Welcome({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('Login');
  }

  const goToRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <Wrapper backgroundColor={Colors.ghostWhite}>
      <Content>
        <Logo type="white" />
        <Title color={Colors.white} title="Bienvenid@ a APP Demo" />
        <Button onPress={goToLogin} label={"Login"} type="white" />
        <Button onPress={goToRegister} label={"Registrarme"} type="white" />
      </Content>
    </Wrapper>
  );
};