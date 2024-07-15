import { FunctionComponent, Suspense } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
// import { useTranslation } from "react-i18next";

import { IChatMessage } from "./Message.type";
import {
  CenterVideo,
  ChatMessage,
  FullScreenButton,
  FullScreenButtonVideo,
  ImageOutline,
  Initial,
  InitialBox,
  InitialOutBox,
  InitialTriangleIcon,
  MessageMessage,
  MessageTime,
  MessageTimeBox,
  MessageUsername,
  PlayerImage,
  TextBox,
  VideoPlayer,
  Video,
} from "./Message.style";

import { Spacer } from "@/components/Spacer/Spacer";
import { Shadow } from "react-native-shadow-2";
import { Icon } from "@/components/Icon/Icon";
import { IconNames, IconSizes } from "@/components/Icon/Icon.type";
import { colorScheme } from "@/config/colorScheme";
import InAppMessage from "@/components/InAppMessage/InAppMessage";
import { UiRadius } from "@/config/borderRadius";
import FastImage from "react-native-fast-image";

const Message: FunctionComponent<IChatMessage> = ({
  index,
  isNameSame,
  initial,
  message,
  firstname,
  user_name,
  expandBtnImage,
  onError,
  expandBtnList,
  last,
  isWebM,
  onErrorList,
  time,
  isNameSameAsPrevious,
  isNameSameAsNext,
}) => {
  // const { t } = useTranslation("topic");
  return (
    <ChatMessage direction={isNameSame}>
      <InitialOutBox isNameTheSame={isNameSame}>
        {!isNameSameAsNext && !isNameSame && (
          <InitialBox isNameTheSame={isNameSame} error={message.message_type === "<e>error<e>"}>
            <Initial>{initial}</Initial>
          </InitialBox>
        )}
      </InitialOutBox>
      <TextBox isNameTheSame={isNameSame} error={message.message_type === "<e>error<e>"} isNameSameAsNext={isNameSameAsNext}>
        {!isNameSameAsPrevious && !isNameSame && <MessageUsername>{isNameSame ? firstname : user_name}</MessageUsername>}
        {message.message && <MessageMessage>{message.message}</MessageMessage>}
        {message.image_string && (
          <>
            {Platform.OS !== "ios" && <Spacer size="regular" />}
            <ImageOutline>
              {/*<PlayerImage*/}
              {/*  width={Dimensions.get("screen").width}*/}
              {/*  height={Dimensions.get("screen").height}*/}
              {/*  source={{ uri: message.image_string }}*/}
              {/*  resizeMode="cover"*/}
              {/*/>*/}
              <FastImage
                source={{ 
                  uri: message.image_string, 
                  priority: FastImage.priority.normal 
                }}
                style={{
                  minHeight: Dimensions.get("screen").width * 0.4,
                  minWidth: Dimensions.get("screen").width * 0.6,
                  borderRadius: 5,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <FullScreenButton>
                <Shadow distance={5} startColor={"#34343484"} endColor={"rgba(0, 0, 0 ,0)"} offset={[0, 0]}>
                  <TouchableOpacity onPress={expandBtnImage}>
                    <Icon name={IconNames.Expand} size={IconSizes.Normal} color={colorScheme.text} />
                  </TouchableOpacity>
                </Shadow>
              </FullScreenButton>
            </ImageOutline>
            {/*{Platform.OS !== "ios" && <Spacer size="regular" />}*/}
          </>
        )}
        {isWebM && Platform.OS === "ios" ? (
          <InAppMessage key={index} index={index} text={"image.webMNotSupported"} />
        ) : (
          <>
            {message.video_string && (
              <CenterVideo>
                {Platform.OS === "ios" ? (
                  <Video
                    id="video"
                    // source={{ uri: message.video_string }}
                    style={{
                      width: Dimensions.get("window").width * 0.6,
                      aspectRatio: 1,
                      borderRadius: UiRadius.small,
                    }}
                    // resizeMode="contain"
                    // controls={false}
                    // paused={!last}
                    // onError={onError}
                  />
                ) : (
                  <VideoPlayer
                    // source={{ uri: message.video_string }}
                    // videoStyle={{
                    //   width: "100%",
                    //   height: "100%",
                    // }}
                    style={{
                      width: Dimensions.get("window").width * 0.6,
                      borderRadius: UiRadius.small,
                    }}
                    // paused={!last}
                    // disableBack={true}
                    // disableFullscreen={true}
                  />
                )}
                <FullScreenButtonVideo>
                  <Shadow distance={5} startColor={"#34343484"} endColor={"rgba(0, 0, 0 ,0)"} offset={[0, 0]}>
                    <TouchableOpacity onPress={expandBtnList}>
                      <Icon name={IconNames.Expand} size={IconSizes.Normal} color={colorScheme.white} />
                    </TouchableOpacity>
                  </Shadow>
                </FullScreenButtonVideo>
                {onErrorList.map(
                  (item) =>
                    item === index && (
                      <InAppMessage
                        key={index}
                        index={index}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        text={"image.couldNotLoad"}
                      />
                    ),
                )}
              </CenterVideo>
            )}
          </>
        )}
        <MessageTimeBox>
          <MessageTime>{time}</MessageTime>
        </MessageTimeBox>
      </TextBox>
      {!isNameSameAsNext && <InitialTriangleIcon isNameTheSame={isNameSame} />}
    </ChatMessage>
  );
};

export default Message;
