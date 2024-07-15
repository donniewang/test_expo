import styled from "styled-components/native";

import { IPProps } from "@/components/Headings/P/P.type";
import { UiFontLineHeight, UiFonts, UiFontSizes } from "@/config/fonts";
import { colorScheme } from "@/config/colorScheme";

export const P = styled.Text<IPProps>`
  ${(props) => {
    switch (props.fontWeight) {
      case "500":
        return `
          font-family: ${UiFonts.Poppins.Medium};
        `;
      case "600":
        return `
          font-family: ${UiFonts.Poppins.SemiBold};
        `;
      case "700":
        return `
          font-family: ${UiFonts.Poppins.Bold};
        `;

      case "400":
      default:
        return `
          font-family: ${UiFonts.Poppins.Regular};
        `;
      case "100":
        return `
          font-family: ${UiFonts.Poppins.Light};
        `;
    }
  }}

  font-size: ${UiFontSizes.regular}px;
  line-height: ${UiFontLineHeight.regular}px;

  text-align: ${(props) => props.textAlign || "left"};

  ${(props) => {
    switch (props.color) {
      case "black":
        return `
          color: ${colorScheme.black};
        `;
      case "red":
        return `
          color: ${colorScheme.negative};
        `;
      case "yellow":
        return `
          color: ${colorScheme.gold};
        `;

      default:
        return `
          color: ${colorScheme.text};
        `;
    }
  }}
`;

P.defaultProps = {
  fontWeight: "400",
  color: "white",
};
