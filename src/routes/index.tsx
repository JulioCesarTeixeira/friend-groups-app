import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
// NavigationContainer is a navigation container where we can load the routes of our application.

export function Routes() {
  const {
    COLORS: { GRAY_600 },
  } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: GRAY_600 }}>
      <NavigationContainer theme={DarkTheme}>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
