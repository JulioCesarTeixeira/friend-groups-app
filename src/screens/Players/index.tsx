import React, { useRef, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, TextInput } from "react-native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/FormComponents/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useAlert } from "@hooks/useAlert";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerDeleteByGroup } from "@storage/player/playerDeleteByGroup";
import { groupDeleteByName } from "@storage/group/groupDeleteByName";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";

type RouteParams = {
  groupName: string;
};

export function Players() {
  const { showAlert } = useAlert();
  const { navigate } = useNavigation();

  const teams = ["Team A", "Team B"];
  const [team, setTeam] = useState<string>(teams[0]);
  const inputRef = useRef<TextInput>(null);

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [playerName, setPlayerName] = useState<string>("");

  const { params } = useRoute();
  const { groupName } = params as RouteParams;

  async function handlePlayerAdd() {
    console.log(`Player ${playerName} added`);

    if (playerName.trim() === "") return;

    const newPlayer: PlayerStorageDTO = {
      name: playerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, groupName);

      inputRef.current?.blur();

      fetchPlayersByTeam();
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

  async function handlePlayerDelete(playerName: string) {
    try {
      await playerDeleteByGroup(playerName, groupName);

      await fetchPlayersByTeam();
    } catch (error: any) {
      if (error instanceof AppError) {
        return showAlert({
          title: "Error",
          message: error.message,
        });
      }

      return showAlert({
        title: "Error",
        message: "It was not possible to remove chosen player",
      });
    }
    console.log(`Player ${playerName} removed`);
  }

  async function groupDeleteAndRedirectToHome() {
    try {
      await groupDeleteByName(groupName);
      console.log(`Team ${team} removed`);

      // Go back to the home screen
      navigate("groups");
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

  async function handleGroupDelete() {
    // Remove the team
    showAlert({
      title: "Are you sure?",
      message: "This action cannot be undone",
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Remove",
          onPress: () => groupDeleteAndRedirectToHome(),
        },
      ],
    });
  }

  async function fetchPlayersByTeam() {
    try {
      const players = await playersGetByGroupAndTeam(groupName, team);
      setPlayers(players);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header shouldShowBackButton />

      <Highlight
        title={groupName}
        subtitle="Add people and divide them into teams"
      />

      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Player name"
          autoCorrect={false}
          value={playerName}
          onChangeText={setPlayerName}
          onSubmitEditing={handlePlayerAdd}
          returnKeyType="done"
        />

        <ButtonIcon type={"PRIMARY"} icon="add" onPress={handlePlayerAdd} />
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
            onRemove={() => handlePlayerDelete(item.name)}
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

      <Button
        title="Remove team"
        type="SECONDARY"
        onPress={handleGroupDelete}
      />
    </Container>
  );
}
