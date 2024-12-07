import { Appearance, LogBox, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Colors, ThemeProvider, createTheme, useTheme } from "@rneui/themed";
import { AppDispatch, RootState, store } from "./store/store";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./store/AuthContext";
import { Role } from "./entities/User";
import { getProfile, setToken } from "./store/userSlice";
import LoginNavigation from "./navigation/LoginNavigation";

const Stack = createNativeStackNavigator();
type FontStyle = 'normal' | 'italic' | 'oblique';

const theme = createTheme({
  darkColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
    background: "#121212",
  },
  lightColors: {
    primary: "#0DCC70",
    secondary: "#0CEF78",
    success: "#0DCC70",
    warning: "#FFA726",
  },
  mode: "dark",
});

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
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>

      </Provider>
  );
}

function AppContent() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  const { theme } = useTheme();
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


