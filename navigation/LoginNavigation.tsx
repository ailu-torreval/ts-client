import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import { Button } from "@rneui/base";

const logo = require("../assets/logo.png");

type Props = NativeStackScreenProps<RootStackParamList, "main">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainScreen: React.FC<Props> = ({ navigation }) => {
  console.log("MAINI");
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: "50%", alignSelf: "center", marginBottom: 20 }}
        resizeMode="contain"
      />
      <Button
        size="lg"
        onPress={() => navigation.navigate("login")}>Login</Button>
      <Button
        size="lg"
        type="clear"
        onPress={() => navigation.navigate("signup")}>Signup</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
});

const LoginNavigation: React.FC = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{ headerShown: false, headerBackVisible: false }}
        />
        <Stack.Screen name="login" options={{ headerTitle: "", headerBackVisible: false }}>
          {(props) => <LoginScreen />}
        </Stack.Screen>
        <Stack.Screen name="signup" options={{ headerTitle: "", headerBackVisible: false }}>
          {(props) => <SignupScreen />}
        </Stack.Screen>
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default LoginNavigation;
