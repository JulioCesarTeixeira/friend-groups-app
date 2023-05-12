import styled, { css } from "styled-components/native";
import { TextInput as RNTextInput } from "react-native";

export const Container = styled(RNTextInput).attrs(({ theme }) => ({
  // placeholderTextColor: theme.COLORS.GRAY_300,
}))`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}

  border-radius: 8px;

  padding: 16px;
`;
