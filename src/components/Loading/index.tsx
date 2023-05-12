import React from "react";
import { Container, LoadIndicator } from "./styles";
import { ActivityIndicator } from "react-native";

export const Loading = () => {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  );
};
