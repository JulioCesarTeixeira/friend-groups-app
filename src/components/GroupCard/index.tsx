import React from "react";
import { Container, Icon, Title } from "./styles";

type Props = {
  title: string;
};

export const GroupCard = ({ title }: Props) => {
  return (
    <Container>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
};
