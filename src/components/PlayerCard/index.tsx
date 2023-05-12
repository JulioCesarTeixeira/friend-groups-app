import React from "react";
import { Container, Icon, Label } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";

type Props = {
  name: string;
  onRemove?: () => void;
};

export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon name="person" />
      <Label>{name}</Label>

      <ButtonIcon type="SECONDARY" icon="delete" onPress={onRemove} />
    </Container>
  );
}
