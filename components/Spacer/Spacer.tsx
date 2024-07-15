import { FC } from "react";
import styled from "styled-components/native";

import { ISpacerProps } from "./Spacer.type";

export const Spacer: FC<ISpacerProps> = styled.View<ISpacerProps>`
  width: 100%;
  height: 10px;
`;
