import React, { useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList, SafeAreaView } from "react-native";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";

export function Groups() {
  const [groups, setGroups] = useState([
    "Football",
    "Basketball",
    "Volleyball",
  ]);

  const navigation = useNavigation();

  function handleGroupCardClick(group: string) {
    console.log(`${group} clicked`);
    navigation.navigate("players", { groupName: group });
  }

  function handleNewGroupButtonClick() {
    console.log("New group button clicked");
    navigation.navigate("new");
  }

  return (
    <Container>
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
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Register a new group"
        onPress={handleNewGroupButtonClick}
      />
    </Container>
  );
}
