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
import { useAlert } from "@hooks/useAlert";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [groups, setGroups] = useState([]);

  function handleNewGroupButtonClick() {
    console.log("New group button clicked");
    navigation.navigate("new");
  }

  function handleOpenGroup(group: string) {
    console.log(`${group} clicked`);
    navigation.navigate("players", { groupName: group });
  }

  async function handleRefreshGroups() {
    try {
      setIsLoading(true);

      const groups = await groupsGetAll();
      setGroups(groups);
    } catch (error: any) {
      console.log(error.message);
      showAlert({
        title: "Error",
        message: "An error occurred while trying to get the groups",
      });
    } finally {
      setIsLoading(false);
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <EmptyList title="Maybe you should register a new group?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="New Group" onPress={handleNewGroupButtonClick} />
    </Container>
  );
}
