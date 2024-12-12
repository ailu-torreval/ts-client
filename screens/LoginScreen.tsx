import React from "react";
import { Alert, View, StyleSheet, Image, SafeAreaView, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { AuthContext } from "../store/AuthContext";
import { LoginUserDto } from "../entities/LoginUserDto";
import { login } from "../store/userSlice";
import { Input, Button, Icon, VStack, useTheme } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
const logo = require("../assets/logo.png");


const LoginScreen: React.FC = () => {
  const theme = useTheme();

  const { setIsLogged, setIsAdmin } = React.useContext(AuthContext);

  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  // const error = useSelector((state: userState) => state.user?.error);
  const error = useSelector((state: any) => state.user?.error);
  const user = useSelector((state: any) => state?.user);

  React.useEffect(() => {
    if (error && email !== "" && password !== "") {
      setEmail("");
      setPassword("");
      Alert.alert("Error", "Invalid credentials, try again.");
      console.log("error effect", error);
    }
  }, [error]);

  async function handleLogin() {
    // Handle login logic here
    console.log(email, password);
    const loginData: LoginUserDto = {
      email: email,
      password: password,
    };
    await dispatch(login(loginData));
    if (!error) {
      // Update the login state in the App component
      
      setIsLogged(true);
      if(user.role === 'admin') {
        setIsAdmin(true)
      }
    }
    // navigation.navigate("main-navigation")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logo}
        style={{ width: '50%', alignSelf: 'center' }}
        resizeMode="contain"
      />
      <VStack space={4} mt={4}>
        <Input
          variant="underlined"
          size="xl"
          placeholder="Add email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          keyboardType="email-address"
          InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
        />
        <Input
          variant="underlined"
          size="xl"
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
          autoCapitalize="none"
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
            </Pressable>
          } />
        <Button color={theme.colors.primary[500]} onPress={handleLogin} isDisabled={!email || !password}>
          Login
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  labelStyle: {
    fontWeight: "bold",
    color: '#000',
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default LoginScreen;
