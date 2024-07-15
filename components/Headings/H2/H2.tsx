import styled from "styled-components/native";

import { UiFontLineHeight, UiFontSizes, UiFonts } from "@/config/fonts";
import { colorScheme } from "@/config/colorScheme";

export const H2 = styled.Text`
  font-size: ${UiFontSizes.medium}px;
  line-height: ${UiFontLineHeight.medium}px;
  font-family: ${UiFonts.Poppins.SemiBold};
  color: ${colorScheme.text};
`;
