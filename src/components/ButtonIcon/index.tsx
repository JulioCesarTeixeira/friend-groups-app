import { TouchableOpacityProps } from "react-native";
import React from "react";
import { ButtonIconnTypeStyleProps, Container } from "./styles";

type Props = TouchableOpacityProps & {
  type: ButtonIconnTypeStyleProps;
};

export default function index({ type = "PRIMARY", ...rest }: Props) {
  return (
    <Container type="PRIMARY" {...rest}>
      {" "}
    </Container>
  );
}
