import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonIconnTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonIconnTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;

  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;
