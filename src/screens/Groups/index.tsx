import React, { useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList, SafeAreaView } from "react-native";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

export function Groups() {
  const [groups, setGroups] = useState([
    // "Football",
    // "Basketball",
    // "Volleyball",
  ]);

  function handleGroupCardClick(groupName: string) {
    console.log(`${groupName} clicked`);
  }

  function handleNewGroupButtonClick() {
    console.log("New group button clicked");
  }

  return (
    <Container>
      <SafeAreaView />
      <Header />
      <Highlight title="Groups" subtitle="Play with your group" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleGroupCardClick(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList title="Maybe you should register a new group?" />
        )}
      />

      <Button
        title="Register a new group"
        onPress={handleNewGroupButtonClick}
      />
    </Container>
  );
}
