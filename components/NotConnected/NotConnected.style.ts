import { Dimensions } from "react-native";
import styled from "styled-components/native";

import { UiRadius } from "@/config/borderRadius";
import { colorScheme } from "@/config/colorScheme";

export const NotConnectedView = styled.View`
  width: 100%;
  height: ${Dimensions.get("screen").height / 2}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TryAgain = styled.TouchableOpacity`
  background-color: ${colorScheme.midnightExpress};
  padding: 10px 20px;
  border-radius: ${UiRadius.medium}px;
`;
