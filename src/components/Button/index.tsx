import React from "react";
import { ButtonText, ButtonTypeStyleProps, Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

export const Button = ({ title, type = "PRIMARY", ...rest }: Props) => {
  return (
    <Container type={type} {...rest}>
      <ButtonText>{title}</ButtonText>
    </Container>
  );
};
