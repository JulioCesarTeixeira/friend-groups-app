import React, { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { TextInput } from "@components/FormComponents/TextInput";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";

export function NewGroup() {
  const [groupName, setGroupName] = useState("");
  const { navigate } = useNavigation();

  async function handleNewGroup() {
    console.log(`New group ${groupName} created`);

    await groupCreate(groupName);

    navigate("players", { groupName });
  }
  return (
    <Container>
      <Header shouldShowBackButton />

      <Content>
        <Icon />
        <Highlight
          title="New group"
          subtitle="Create a new group to add new people"
        />
        <TextInput
          placeholder="Group name"
          value={groupName}
          onChangeText={setGroupName}
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
