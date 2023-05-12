import React from "react";
import { Container, EmptyText } from "./styles";

type Props = {
  title?: string;
};

export const EmptyList = ({ title = "Oh, it seems to be empty :(" }: Props) => {
  return (
    <Container>
      <EmptyText>{title}</EmptyText>
    </Container>
  );
};
