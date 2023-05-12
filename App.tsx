import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import Groups from "@screens/Groups";

export default function App() {
  // Load fonts from Google Fonts API and wait until they are loaded before rendering the app
  // fontsLoaded is a boolean that indicates if the fonts are loaded or not
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Groups /> : <ActivityIndicator style={{ flex: 1 }} />}
    </ThemeProvider>
  );
}
