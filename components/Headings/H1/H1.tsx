import styled from "styled-components/native";

import { IH1Props } from "@/components/Headings/H1/H1.type";
import { UiFontLineHeight, UiFonts, UiFontSizes } from "@/config/fonts";

export const H1 = styled.Text<IH1Props>`
  font-size: ${UiFontSizes.medium}px;
  line-height: ${UiFontLineHeight.medium}px;
  font-family: ${UiFonts.Poppins.SemiBold};
  color: ${(props) => props.color};

  text-align: ${(props) => props.textAlign};
`;

H1.defaultProps = {
  textAlign: "left",
};
