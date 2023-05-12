import styled from "styled-components/native";
import { TextInput as RNTextInput } from "react-native";

export const Container = styled(RNTextInput).attrs(({ theme }) => ({
  // placeholderTextColor: theme.COLORS.GRAY_300,
}))`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  color: ${({ theme }) => theme.COLORS.WHITE};

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;

  border-radius: 8px;

  padding: 16px;
`;
