import React from "react";
import { BackIcon, Container, Logo, BackButton } from "./styles";

import logoImage from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  shouldShowBackButton?: boolean;
};

export const Header = ({ shouldShowBackButton = false }: Props) => {
  const { navigate } = useNavigation();

  function handleGoHome() {
    navigate("groups");
  }
  return (
    <Container>
      {shouldShowBackButton && (
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImage} />
    </Container>
  );
};
