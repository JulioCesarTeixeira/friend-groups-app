import React, { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { SafeAreaView } from "react-native";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { TextInput } from "@components/FormComponents/TextInput";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const { navigate } = useNavigation();
  const [group, setGroup] = useState("");

  function handleNewGroup() {
    console.log(`New group ${group} created`);

    navigate("players", { group });
  }
  return (
    <Container>
      <SafeAreaView />
      <Header shouldShowBackButton />

      <Content>
        <Icon />
        <Highlight
          title="New group"
          subtitle="Create a new group to add new people"
        />
        <TextInput
          placeholder="Group name"
          value={group}
          onChangeText={setGroup}
          autoCorrect={false}
        />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  );
}
