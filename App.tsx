import React from "react";

import { SafeAreaView, StatusBar } from "react-native";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import Groups from "@screens/Groups";
import { Loading } from "@components/Loading";

export default function App() {
  // Load fonts from Google Fonts API and wait until they are loaded before rendering the app
  // fontsLoaded is a boolean that indicates if the fonts are loaded or not
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={"transparent"}
      />
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}
