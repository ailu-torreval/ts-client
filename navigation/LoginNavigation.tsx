import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image } from "react-native";
import LoginScreen from "../screens/LoginScreen";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
const logo = require("../assets/logo.png");

type Props = NativeStackScreenProps<RootStackParamList, "main">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainScreen: React.FC<Props> = ({ navigation }) => {
  console.log("MAINI");
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: "50%", alignSelf: "center" }}
        resizeMode="contain"
      />
      <Button
        title="Login"
        size="lg"
        onPress={() => navigation.navigate("login")}
      />
      <Button
        title="Signup"
        type="clear"
        size="lg"
        onPress={() => navigation.navigate("signup")}
      />
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
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen
        name="main"
        component={MainScreen}
        options={{ headerShown: false, headerBackTitleVisible: false  }}
      />
      <Stack.Screen name="login" options={{ headerTitle: "" , headerBackTitleVisible: false }}>
        {(props) => <LoginScreen />}
      </Stack.Screen>
      <Stack.Screen name="signup" options={{ headerTitle: "", headerBackTitleVisible: false  }}>
        {(props) => <SignupScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default LoginNavigation;
