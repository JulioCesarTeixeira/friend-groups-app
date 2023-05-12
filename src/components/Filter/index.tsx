import React from "react";
import { Container, Label, FilterStyleProps } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    label: string;
  };

export function Filter({ label, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Label>{label}</Label>
    </Container>
  );
}
