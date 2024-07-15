import { FunctionComponent } from "react";

import { InAppMessageStyle, NotSupportedText } from "./InAppMessage.style";
import { IInAppMessage } from "./InAppMessage.type";

import { Icon } from "@/components/Icon/Icon";
import { IconNames } from "@/components/Icon/Icon.type";
import { IconSizes } from "@/components/Icon/Icon.type";
import { colorScheme } from "@/config/colorScheme";
import { Spacer } from "@/components/Spacer/Spacer";

const InAppMessage: FunctionComponent<IInAppMessage> = ({ index, style, text }) => {
  return (
    <InAppMessageStyle key={index} style={style}>
      <Icon name={IconNames.Close} size={IconSizes.ExtraHuge} color={colorScheme.negative} />
      <Spacer size="large" />
      <NotSupportedText>{text}</NotSupportedText>
    </InAppMessageStyle>
  );
};

export default InAppMessage;
