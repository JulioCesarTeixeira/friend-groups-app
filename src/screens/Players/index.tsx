import React, { useCallback, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { TextInput } from "@components/FormComponents/TextInput";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useAlert } from "@hooks/useAlert";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerDelete } from "@storage/player/playerDelete";

type RouteParams = {
  groupName: string;
};

export function Players() {
  const teams = ["Team A", "Team B"];
  const { showAlert } = useAlert();
  const [team, setTeam] = useState<string>(teams[0]);

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const [playerName, setPlayerName] = useState<string>("");

  const { params } = useRoute();
  const { groupName } = params as RouteParams;

  async function handleAddPlayer() {
    console.log(`Player ${playerName} added`);

    try {
      if (playerName === "") return;

      await playerAddByGroup({ name: playerName, team }, groupName);

      setPlayerName("");
    } catch (error: any) {
      if (error instanceof AppError) {
        return showAlert({
          title: "Error",
          message: error.message,
        });
      }

      return showAlert({
        title: "Error",
        message: "An unexpected error has occurred",
      });
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerDelete(playerName, groupName);
    } catch (error: any) {
      if (error instanceof AppError) {
        return showAlert({
          title: "Error",
          message: error.message,
        });
      }

      return showAlert({
        title: "Error",
        message: "An unexpected error has occurred",
      });
    }
    console.log(`Player ${playerName} removed`);
  }

  async function handleFetchPlayers() {
    try {
      const players = await playersGetByGroup(groupName);
      setPlayers(players);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchPlayers();
    }, [handleRemovePlayer, handleAddPlayer])
  );

  return (
    <Container>
      <Header shouldShowBackButton />

      <Highlight
        title={groupName}
        subtitle="Add people and divide them into teams"
      />

      <Form>
        <TextInput
          placeholder="Player name"
          autoCorrect={false}
          value={playerName}
          onChangeText={setPlayerName}
        />

        <ButtonIcon type={"PRIMARY"} icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={teams}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              label={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList title="Maybe you should add some players?" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remove team" type="SECONDARY" />
    </Container>
  );
}
