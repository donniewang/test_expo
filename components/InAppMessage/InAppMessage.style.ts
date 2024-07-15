import styled from "styled-components/native";

import { colorScheme } from "@/config/colorScheme";
import { UiFontLineHeight, UiFontSizes, UiFonts } from "@/config/fonts";
import { UiRadius } from "@/config/borderRadius";

export const InAppMessageStyle = styled.View`
  background-color: ${colorScheme.bg};
  padding: 20px;
  border-radius: ${UiRadius.light}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotSupportedText = styled.Text`
  font-family: ${UiFonts.Poppins.Bold};
  font-size: ${UiFontSizes.small}px;
  line-height: ${UiFontLineHeight.small}px;
  color: ${colorScheme.white};
  text-align: center;
`;
