import React, { useState } from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { TextInput } from "@components/FormComponents/TextInput";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { useAlert } from "@hooks/useAlert";

export function NewGroup() {
  const [groupName, setGroupName] = useState("");
  const { navigate } = useNavigation();
  const { showAlert } = useAlert();

  async function handleNewGroup() {
    console.log(`New group ${groupName} created`);

    try {
      if (!groupName.trim()) {
        return showAlert({
          title: "New group",
          message: "Group name is required",
          buttons: [{ text: "OK", onPress: handleResetForm }],
        });
      }

      await groupCreate(groupName);

      navigate("players", { groupName });
    } catch (error) {
      if (error instanceof AppError) {
        return showAlert({
          message: error.message,
          buttons: [{ text: "OK", onPress: handleResetForm }],
        });
      } else {
        return showAlert({
          message: "It was not possible to create a new group.",
          buttons: [{ text: "OK", onPress: handleResetForm }],
        });
      }
    }
  }

  function handleResetForm() {
    setGroupName("");
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
