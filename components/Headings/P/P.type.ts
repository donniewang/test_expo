import { TextProps } from "react-native";

export interface IPProps extends TextProps {
  color?: "black" | "white" | "red" | "yellow";
  fontWeight?: "100" | "400" | "500" | "600" | "700";
  textAlign?: "left" | "center" | "right";
}
