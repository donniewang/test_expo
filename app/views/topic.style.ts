import styled from "styled-components/native";
import { StyleProp, ViewStyle, StyleSheet, Dimensions, Platform } from "react-native";
import { UiFontLineHeight, UiFonts, UiFontSizes } from "@/config/fonts";
import { colorScheme } from "@/config/colorScheme";
import { UiRadius } from "@/config/borderRadius";

export const AppBackgroundImageHeight = 300;

export const Header = styled.View<{ isItems: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: ${(props) => (props.isItems ? 20 : 0)}px;
`;

export const Title = styled.Text<{ backbutton: boolean }>`
  font-size: ${Dimensions.get("window").width / 15}px;
  line-height: ${UiFontLineHeight.extraLarge}px;
  color: ${colorScheme.text};
  font-family: ${UiFonts.Poppins.Medium};
  padding-left: ${(props) => (props.backbutton ? 20 : 0)}px;
`;

export const ConnectedDot = styled.View<{ connected?: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: ${UiRadius.medium}px;
  overflow: hidden;
  background-color: ${(props) => (props.connected ? "green" : "red")};
`;

const gradientStyles: ViewStyle = {
    position: "absolute",
    zIndex: 2,
    left: 0,
    top: 0,
    right: 0,
};

export const AppBackgroundLinearGradientStyles = StyleSheet.create({
    bottomToTop: {
        height: AppBackgroundImageHeight,
        bottom: 0,
        ...gradientStyles,
    },
    topToBottom: {
        height: 10,
        ...gradientStyles,
    },
});


export const ChatMessage = styled.View<{ direction: boolean }>`
  display: flex;
  align-items: flex-end;
  flex-direction: ${(props) => (props.direction ? "row-reverse" : "row")};
  position: relative;
  min-width: 48px;
  min-height: 48px;
`;

export const InitialBox = styled.View<{ isNameTheSame: boolean; error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: ${UiRadius.medium}px;
  background-color: ${(props) =>
    props.error ? colorScheme.negative : props.isNameTheSame ? colorScheme.personalMessages : colorScheme.otherMessages};
  border-color: ${(props) =>
    props.error ? colorScheme.negative : props.isNameTheSame ? colorScheme.personalMessages : colorScheme.otherMessages};
  margin-left: ${(props) => (props.isNameTheSame ? 10 : 0)}px;
  margin-right: ${(props) => (!props.isNameTheSame ? 10 : 0)}px;
`;

export const InitialOutBox = styled.View<{ isNameTheSame: boolean }>`
  width: ${(props) => (props.isNameTheSame ? 20 : 50)}px;
`;

export const Initial = styled.Text`
  font-weight: 900;
  color: white;
  font-size: ${UiFontSizes.inBetweenSmall}px;
  text-align: center;
  text-transform: uppercase;
`;

export const InitialTriangleIcon = styled.View<{ isNameTheSame: boolean }>`
  position: absolute;
  bottom: 0;
  margin-right: ${(props) => (props.isNameTheSame ? 10.5 : 0)}px;
  margin-left: ${(props) => (props.isNameTheSame ? 0 : 40.5)}px;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 0;
  border-right-width: ${(props) => (props.isNameTheSame ? 10 : 0)}px;
  border-bottom-width: ${(props) => (props.isNameTheSame ? 10 : 10)}px;
  border-left-width: ${(props) => (props.isNameTheSame ? 0 : 10)}px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${(props) => (props.isNameTheSame ? colorScheme.personalMessages : colorScheme.otherMessages)};
  border-left-color: transparent;
`;

export const TextBox = styled.View<{ isNameTheSame: boolean; error: boolean; isNameSameAsNext: boolean }>`
  border-top-left-radius: ${UiRadius.light}px;
  border-top-right-radius: ${UiRadius.light}px;
  border-bottom-left-radius: ${(props) => (props.isNameTheSame ? UiRadius.light : props.isNameSameAsNext ? UiRadius.light : 0)}px;
  border-bottom-right-radius: ${(props) => (!props.isNameTheSame ? UiRadius.light : props.isNameSameAsNext ? UiRadius.light : 0)}px;
  padding: 5px 10px 20px 10px;
  overflow: hidden;
  min-width: 80px;
  max-width: ${Dimensions.get("screen").width * 0.75}px;
  background-color: ${(props) =>
    props.error ? colorScheme.negative : props.isNameTheSame ? colorScheme.personalMessages : colorScheme.otherMessages};
  border-color: ${(props) =>
    props.error ? colorScheme.negative : props.isNameTheSame ? colorScheme.personalMessages : colorScheme.otherMessages};
`;

export const ImageOutline = styled.View`
  min-width: ${Dimensions.get("screen").width * 0.2}px;
  max-width: ${Dimensions.get("screen").width * 0.8}px;
  min-height: ${Dimensions.get("screen").height * 0.001}px;
  max-height: ${Dimensions.get("screen").height * 0.4}px;
  padding: 0 0 3px 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const PlayerImage = styled.Image<{ width?: number; height?: number }>`
  width: ${(props) => (props.width && props.width > 0 ? props.width / 1.9 : Dimensions.get("screen").width * 0.6)}px;
  height: ${(props) => (props.height && props.height > 0 ? props.height / 6 : Dimensions.get("screen").height * 0.4)}px;
  object-fit: cover;
  min-width: 48px;
  min-height: 48px;
`;

export const MessageUsername = styled.Text`
  font-size: ${UiFontSizes.inBetweenSmall}px;
  line-height: ${UiFontLineHeight.small}px;
  font-family: ${UiFonts.Poppins.Bold};
  font-weight: 700;
  color: white;
  padding-bottom: 5px;
  text-transform: capitalize;
`;

export const MessageMessage = styled.Text`
  font-size: ${UiFontSizes.regular}px;
  line-height: ${UiFontLineHeight.regular}px;
  font-family: ${UiFonts.Poppins.Regular};
  color: white;
`;

export const MessageTimeBox = styled.View`
  position: absolute;
  right: 6px;
  bottom: 0;
`;

export const MessageTime = styled.Text`
  font-size: ${UiFontSizes.extraSmall}px;
  line-height: ${UiFontLineHeight.regular}px;
  color: white;
  overflow: hidden;
  opacity: 0.4;
  text-align: right;
`;

export const MessagesGroup = styled.ScrollView`
  width: ${Dimensions.get("window").width}px;
  flex: 1;
`;

export const CenterVideo = styled.View`
  min-width: ${Dimensions.get("screen").width * 0.2}px;
  max-width: ${Dimensions.get("screen").width * 0.8}px;
  min-height: ${Dimensions.get("screen").height * 0.2}px;
  max-height: ${Dimensions.get("screen").height * 0.4}px;
  padding: 6px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullScreenButton = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const FullScreenButtonVideo = styled.View`
  position: absolute;
  top: ${Platform.OS === "macos" ? 8 : 10}px;
  left: ${Platform.OS === "macos" ? 50 : 6}px;
`;

export const TopicOutline = styled.View`
  width: 100%;
`;

export const TopicMessageGroup = styled.View<{ alignItems: boolean }>`
  margin-bottom: 5px;
  align-items: ${(props) => (props.alignItems ? "flex-end" : "flex-start")};
`;

export const GradientView = styled.View`
  width: 150%;
  margin-left: -50px;
`;

export const MoreButton = styled.Pressable`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const NoMoreView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const DateBoxView = styled.View`
  width: 100%;
  height: 25px;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: ${UiFontSizes.extraSmall}px;
  color: white;
  overflow: hidden;
  opacity: 0.4;
`;

export const ToolBox = styled.View`
  width: 60px;
  height: 60px;
  padding: 5px;
`;

export const SendBox = styled.View`
  width: 60px;
  height: 60px;
  padding: 5px 10px 5px 5px;
`;

export const InputBox = styled.View`
  flex: 1;
  padding: 6px 0 0 0;
`;

export const InputPosition = styled.View<{ inputBoxHeight: number }>`
  height: ${(props) => props.inputBoxHeight}px;
  background-color: #22313f;
  display: flex;
  flex-direction: column;
`;

export const InputMessageGroup = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 5px;
`;

export const SendButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${UiRadius.light}px;
  position: relative;
`;

export const SafeBottomBox = styled.View`
  width: 100%;
  background-color: #22313f;
`;

export const ToolButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${UiRadius.light}px;
`;

export const SelectFileButton = styled.TouchableOpacity`
  background-color: ${colorScheme.lightMidnightExpress};
  padding: 10px;
  border-radius: ${UiRadius.medium}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 10px;
`;

export const SelectFileButtonText = styled.Text`
  color: ${colorScheme.white};
  margin-left: 5px;
  font-family: ${UiFonts.Poppins.Medium};
`;


export const VideoPlayer = styled.View`

`;

export const Video = styled.View`

`;