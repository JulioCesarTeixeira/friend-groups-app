import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
// NavigationContainer is a navigation container where we can load the routes of our application.

export function Routes() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AppRoutes />
    </NavigationContainer>
  );
}
