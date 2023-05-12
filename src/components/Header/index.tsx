import React from "react";
import { BackIcon, Container, Logo, BackButton } from "./styles";

import logoImage from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export const Header = ({ showBackButton = false }: Props) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImage} />
    </Container>
  );
};
