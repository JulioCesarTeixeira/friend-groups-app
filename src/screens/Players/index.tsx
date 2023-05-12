import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

export function Players() {
  return (
    <Container>
      <SafeAreaView />
      <Header showBackButton />

      <Highlight
        title="Group name"
        subtitle="Add people and divide them into teams"
      />
    </Container>
  );
}
