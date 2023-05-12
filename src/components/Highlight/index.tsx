import React from "react";
import { Container, Subtitle, Title } from "./styles";

type Props = {
  title?: string;
  subtitle?: string;
};

export const Highlight = ({
  title = "Groups",
  subtitle = "Play with your group",
}: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};
