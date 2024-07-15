import { FunctionComponent } from "react";
// import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import { NotConnectedView, TryAgain } from "./NotConnected.style";
import { INotConnected } from "./NotConnected.type";

import { Icon } from "@/components/Icon/Icon";
import { IconNames, IconSizes } from "@/components/Icon/Icon.type";
import { Spacer } from "@/components/Spacer/Spacer";
import { P } from "@/components/Headings/P/P";
import { colorScheme } from "@/config/colorScheme";

const NotConnected: FunctionComponent<INotConnected> = ({
  connectionError = { errorCode: "", errorMessage: "" },
  connect,
  isLoading = false,
}) => {
  // const { t } = useTranslation("topic");

  if (isLoading) {
    return (
      <NotConnectedView>
        <ActivityIndicator size={50} color={colorScheme.gold} />
      </NotConnectedView>
    );
  }

  return (
    <NotConnectedView style={{ width: "100%", height: "90%" }}>
      <Icon name={IconNames.Close} size={IconSizes.Huge} color={"red"} />
      <Spacer size="large" />
      <P fontWeight="700">{"reconnect.body"}</P>
      <Spacer size="regular" />
      <P fontWeight="400">
        {connectionError.errorCode} - {connectionError.errorMessage}
      </P>
      <Spacer size="large" />
      <TryAgain onPress={connect}>
        <P fontWeight="500">{"reconnect.button"}</P>
      </TryAgain>
    </NotConnectedView>
  );
};

export default NotConnected;
