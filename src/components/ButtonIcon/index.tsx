import { TouchableOpacityProps } from "react-native";
import React from "react";
import {
  ButtonIconnTypeStyleProps,
  Container,
  Icon,
  MaterialIconsVariants,
} from "./styles";

type Props = TouchableOpacityProps & {
  type?: ButtonIconnTypeStyleProps;
  icon?: MaterialIconsVariants;
};

export function ButtonIcon({ type = "PRIMARY", icon = "add", ...rest }: Props) {
  return (
    <Container type="PRIMARY" {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
}
