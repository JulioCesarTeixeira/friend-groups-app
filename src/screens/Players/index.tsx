import { SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { TextInput } from "@components/FormComponents/TextInput";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

export function Players() {
  const teams = ["Team A", "Team B"];
  const [team, setTeam] = useState<string>(teams[0]);

  const [players, setPlayers] = useState<string[]>([
    "Julio Cesar",
    "John Doe",
    "Jane Doe",
    "John Smith",
    "Jane Smith",
    "Jo",
    "Pamela",
    "Joana",
    "João",
  ]);

  return (
    <Container>
      <SafeAreaView />
      <Header shouldShowBackButton />

      <Highlight
        title="Group name"
        subtitle="Add people and divide them into teams"
      />

      <Form>
        <TextInput placeholder="Player name" autoCorrect={false} />

        <ButtonIcon type={"PRIMARY"} icon="add" />
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
          <PlayerCard
            name={item}
            onRemove={() => console.log(`${item} was deleted`)}
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
