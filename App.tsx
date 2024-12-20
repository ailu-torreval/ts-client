import { Appearance, LogBox, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./store/AuthContext";
import { Role } from "./entities/User";
import { getProfile, setToken } from "./store/userSlice";
import LoginNavigation from "./navigation/LoginNavigation";
import { NativeBaseProvider } from 'native-base';
import { extendTheme } from "native-base";
import theme from "./theme";

// const theme = extendTheme({
//   colors: {
//     green: {
//       200: "#408E6E",
//       500: "#45A47D",

//     },
//     yellow: {
//       500: "#FFB443"
//     },
//     // Add new color
//     primary: {
//       200: "#408E6E",
//       500: "#45A47D",
//     },
//     secondary: {
//       200: "#FFB443",
//       500: "#F39200",
//     },
//     // Redefining only one shade, rest of the color will remain same.
//     amber: {
//       400: '#d97706',
//     },
//   }
// });



const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  main: undefined;
  login: undefined;
  signup: undefined;
  landing: undefined;
  home: undefined;
  merchant: undefined;
  product: undefined;
  basket: undefined;
  checkout: undefined;
  proccessing: undefined;
  profile: undefined;
  mainNav: undefined;
  homescreen: undefined;
  tables: undefined;
  products: undefined;
  // adminHome:undefined;
  // adminProfile: undefined;
  // services: undefined;
};

export default function App() {
  return (
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <AppContent />
        </NativeBaseProvider>
      </Provider>
  );
}

function AppContent() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    async function readFromSecureStore() {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        await dispatch(setToken(token));
        await dispatch(getProfile(token));
      }
    //  await SecureStore.deleteItemAsync("token");
    }
    console.log(user);
    readFromSecureStore();
  }, []);

  useEffect(() => {
    if (user) {
      user.role === Role.Merchant_admin && setIsAdmin(true);
      console.log(user);
      setIsLogged(true);
      //setIsAdmin(true);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, isAdmin, setIsAdmin }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogged && user !== null ? (
            isAdmin ? (
              <Stack.Group>
                <Stack.Screen name="AdminNav" component={AdminNavigation} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="mainNav" component={MainNavigation} />
              </Stack.Group>
            )
          ) : (
            <Stack.Group>
              <Stack.Screen name="LoginNav" component={LoginNavigation} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


