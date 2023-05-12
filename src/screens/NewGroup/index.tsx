import React from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { SafeAreaView } from "react-native";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { TextInput } from "@components/FormComponents/TextInput";

export function NewGroup() {
  return (
    <Container>
      <SafeAreaView />
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="New group"
          subtitle="Create a new group to add new people"
        />

        <TextInput placeholder="Group name" />

        <Button title="Create" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
