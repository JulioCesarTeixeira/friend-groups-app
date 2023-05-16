import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Container } from "./styles";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { EmptyList } from "@components/EmptyList";

import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState([]);

  function handleGroupCardClick(group: string) {
    console.log(`${group} clicked`);
    navigation.navigate("players", { groupName: group });
  }

  function handleNewGroupButtonClick() {
    console.log("New group button clicked");
    navigation.navigate("new");
  }

  async function handleRefreshGroups() {
    try {
      const groups = await groupsGetAll();
      setGroups(groups);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleRefreshGroups();
    }, [])
  );

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
