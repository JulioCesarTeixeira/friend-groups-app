import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
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

type RouteParams = {
  groupName: string;
};

export function Players() {
  const teams = ["Team A", "Team B"];
  const [team, setTeam] = useState<string>(teams[0]);

  const [players, setPlayers] = useState<string[]>([]);

  const [playerName, setPlayerName] = useState<string>("");

  const { params } = useRoute();
  const { groupName } = params as RouteParams;

  function handleAddPlayer() {
    console.log(`Player ${playerName} added`);

    setPlayers((players) => [...players, playerName]);
    setPlayerName("");
  }

  function handleRemovePlayer(playerName: string) {
    console.log(`Player ${playerName} removed`);

    setPlayers((players) => players.filter((player) => player !== playerName));
  }

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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => handleRemovePlayer(item)} />
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
