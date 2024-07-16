import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput as RNTextInput, Keyboard
} from "react-native";
import { useNavigation } from "expo-router";
import {Key, memo, Suspense, useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {ActivityIndicator} from "react-native-paper";
// import {useTranslation} from "react-i18next";

import Message from "@/components/Message/Message";

import {colorScheme} from "../../config/colorScheme";

import {
    Header,
    Title,
    ConnectedDot,
    TopicOutline,
    TopicMessageGroup,
    GradientView,
    MoreButton,
    NoMoreView,
    DateBoxView,
    DateText,
    ToolBox,
    InputBox,
    SendBox,
    SendButton,
    InputPosition,
    InputMessageGroup,
    SelectFileButton,
    SelectFileButtonText,
    ToolButton,
    SafeBottomBox,
    AppBackgroundLinearGradientStyles,
    CenterVideo,
    ChatMessage,
    ImageOutline,
    Initial,
    InitialBox,
    MessageMessage,
    MessageUsername,
    MessagesGroup,
    PlayerImage,
    TextBox,
    VideoPlayer,
    Video,
} from "./topic.style";

// import {Icon} from "@/components/Icon/Icon";
// import {IconNames, IconSizes} from "@/components/Icon/Icon.type";
import {Spacer} from "@/components/Spacer/Spacer";
import NotConnected from "@/components/NotConnected/NotConnected";
import {P} from "@/components/Headings/P/P";
import {useBoolean} from "@/hooks/useBoolean";

import {UiRadius} from "@/config/borderRadius";
import {UiFontSizes} from "@/config/fonts";

const Send = require("@/assets/icons/send.svg");
const AngleUp = require("@/assets/icons/angle-up.svg");
const AngleDown = require("@/assets/icons/angle-down.svg");

interface IMessage {
    user_name: string;
    message: string;
    image: boolean;
    image_string: string;
    video: boolean;
    video_string: string;
    time: string;
    message_type: string;
    topic: string;
}

export default function Topic() {
    // const {t} = useTranslation("views");

    const navigation = useNavigation();

    const {top, bottom} = useSafeAreaInsets();

    useEffect(() => {
        navigation.setOptions({headerShown: false});
    }, [navigation]);


    const scrollToEnd = () => {
        scrollViewRef?.current?.scrollToEnd({
            animated: true,
        });
    }

    useEffect(() => {
        const keyboardShowSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height);
            setSafeBottomHeight(0);
            if (scrollViewRef.current){
                setTimeout(() => scrollToEnd());
            }
        });
        const keyboardHideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
            setSafeBottomHeight(bottom - (Platform.OS !== "android" ? 15 : 0));
            setKeyboardHeight(0);
            if (scrollViewRef.current){
                setTimeout(() => scrollToEnd());
            }
        });
        return () => {
            keyboardShowSubscription.remove();
            keyboardHideSubscription.remove();
        };
    }, []);

    const backButton = false;
    const title = "AAAAAAAAAAAAA";
    const topic = {isConnected: true};

    const [isConnected, setIsConnected] = useState<boolean>(true);
    const [connectionError, setConnectionErrorsetPlayer] = useState<any>();

    const [player, setPlayer] = useState<any>();

    const [status, setStatus] = useState<string>("connected");




    const [disableMore, setDisableMore] = useState<boolean>(false);

    const [imageSelected, setImageSelected] = useState<boolean>(false);
    const [videoSelected, setVideoSelected] = useState<boolean>(false);

    const [cameraSelected, {on: showCameraModal, off: hideCameraModal}] = useBoolean(false);
    const [isCameraSelected, setIsCameraSelected] = useState<boolean>(false);

    const [cameraTypeOfFeedTaken, setCameraTypeOfFeedTaken] = useState<any>({type: "", url: ""});

    const [loading, setLoading] = useState<boolean>(false);

    const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);

    const [messageList, setMessageList] = useState<IMessage[]>([]);

    const [base64String, setBase64String] = useState<string>("");

    const [result, setResult] = useState<any>();

    const scrollViewRef = useRef<ScrollView | null>(null);

    const [onErrorList, setOnErrorList] = useState<any>([]);

    const [message, setMessage] = useState<any>();

    const renderMessage = (item: any, index: number) => {
        const idx = item.index;
        const last = idx === messageList.length - 1;
        const message = item.item;
        const initial = message!.user_name?.charAt(0);
        const date = new Date(message.time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        // Adding 1 because getMonth() returns 0-based index (0 for January, 1 for February, and so on)
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const time = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

        const isWebM = message.video_string?.includes("webm");

        const isDateSameAsPrevious =
            idx == 0
                ? false
                : year == new Date(messageList[idx - 1].time).getFullYear() &&
                month == new Date(messageList[idx - 1].time).getMonth() + 1 &&
                day == new Date(messageList[idx - 1].time).getDate();
        const isDateSameAsNext = last
            ? false
            : year == new Date(messageList[idx + 1].time).getFullYear() &&
            month == new Date(messageList[idx + 1].time).getMonth() + 1 &&
            day == new Date(messageList[idx + 1].time).getDate();

        const isNameSameAsPrevious = isDateSameAsPrevious && (idx == 0 ? false : messageList[idx - 1].user_name === message.user_name);
        const isNameSameAsNext = isDateSameAsNext && (last ? false : messageList[idx + 1].user_name === message.user_name);

        return (
            <TopicMessageGroup
                key={idx}
                alignItems={message.user_name === player?.firstNames}
                // onLayout={(event) => {
                // const layout = event.nativeEvent.layout;
                // if (last) setScrollTo(layout.y);
                // }}
            >
                <Suspense fallback={<ActivityIndicator size="large"/>}>
                    {!isDateSameAsPrevious && (
                        <DateBoxView>
                            <DateText>
                                {day < 10 ? "0" + day : day}/{month < 10 ? "0" + month : month}
                            </DateText>
                        </DateBoxView>
                    )}
                    <Message
                        index={idx}
                        isNameSame={message.user_name === player?.firstNames}
                        isNameSameAsNext={isNameSameAsNext}
                        isNameSameAsPrevious={isNameSameAsPrevious}
                        initial={initial}
                        message={message}
                        firstname={player?.firstNames || ""}
                        user_name={message.user_name}
                        expandBtnImage={() => {

                        }}
                        last={last}
                        isWebM={isWebM}
                        onErrorList={onErrorList}
                        time={time}
                        onError={() => {

                        }}
                        expandBtnList={() => {

                        }}
                    />
                </Suspense>
            </TopicMessageGroup>
        );
    };

    const RenderMessageMemo = memo(renderMessage);

    const onAttachmentButtonPress = async () => {
        if (!isInputBoxExpanded) {
            setInputBoxHeight(120);
            setIsInputBoxExpanded(true);
        } else {
            setInputBoxHeight(60);
            setIsInputBoxExpanded(false);
        }
        // if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
        if (scrollViewRef.current) setTimeout(() => scrollToEnd());
    };

    const onChangeMessage = (text: string) => {
        setMessage(text);
    };





    const [isInputBoxExpanded, setIsInputBoxExpanded] = useState<boolean>(false);
    const [inputBoxHeight, setInputBoxHeight] = useState<number>(60);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    const [headerHeight, setHeaderHeight] = useState<number>(88);

    const [windowHeight, setWindowHeight] = useState<number>(
        Platform.OS === 'android' && Platform.Version >= 29 ?
        Dimensions.get('window').height + top :
        Dimensions.get('window').height
    )



    const [safeBottomHeight, setSafeBottomHeight] = useState<number>(bottom - (Platform.OS === "ios" ? 15 : 0));


    useEffect(() => {
        setTimeout(()=>{
            var messages = [];
            for(var i=0;i<50;i++) {

                var datetime = new Date();
                datetime.setHours(10);
                datetime.setMinutes(i);
                datetime.setSeconds(i);

                messages.push({
                    user_name:`t${i}`,time:datetime.toISOString(),video_string:"",image_string:"",message_type:"message",message:`test test test ${i}${i}${i}`,topic:"1",video:false,image:false
                });
            }
            setMessageList(messages);
        });
    }, []);

    console.log(`============================window.height:${windowHeight}, inputBoxHeight:${inputBoxHeight}, keyboardHeight:${keyboardHeight}, top:${top}, safeBottomHeight:${safeBottomHeight}, bottom:${bottom}`);
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS !== "android" ? "padding" : "padding"} style={{ flex: 1, backgroundColor: colorScheme.bg, position:"relative" }}>

            <View style={{ zIndex: 9998,backgroundColor:"#FF0000",position:"absolute",right:0,bottom:0,width:30,height:(windowHeight) }}></View>

            <View style={{ zIndex: 9999,backgroundColor:"#ff8888",position:"absolute",right:0,top:0,width:20,height:(top) }}></View>

            <View style={{ zIndex: 9999,backgroundColor:"#ff8800",position:"absolute",right:0,top:(top),width:20,height:(headerHeight) }}></View>

            <View style={{ zIndex: 9999,backgroundColor:"#00ff77",position:"absolute",right:0,bottom:(safeBottomHeight+inputBoxHeight+keyboardHeight),width:20,height:(windowHeight-top-inputBoxHeight-safeBottomHeight-keyboardHeight-headerHeight) }}></View>

            <View style={{ zIndex: 9999,backgroundColor:"#0000FF",position:"absolute",right:0,bottom:(safeBottomHeight+keyboardHeight),width:20,height:(inputBoxHeight) }}></View>

            <View style={{
                zIndex:1,
                backgroundColor: colorScheme.bg,
                // display:"flex",
                // flexDirection:"column",
                // alignItems:"flex-start",
                // justifyContent:"flex-start",
                // height:(windowHeight - top - headerHeight - inputBoxHeight - safeBottomHeight - keyboardHeight) + headerHeight + top
            }}>
                <View style={{
                    paddingTop:top,
                }}>
                    <Header isItems={backButton || !!title || topic.isConnected} style={{ height:headerHeight }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            {backButton ? (
                                <TouchableOpacity onPress={()=>{}}>
                                    {/*<Icon name={IconNames.Back} size={IconSizes.Large} color={colorScheme.text} />*/}
                                </TouchableOpacity>
                            ) : (
                                <></>
                            )}
                            {title ? <Title backbutton={backButton}>{title}</Title> : <></>}
                        </View>
                        {topic && topic.isConnected ? <ConnectedDot connected /> : <></>}
                    </Header>

                    <TopicOutline style={{
                        height:(windowHeight - top - headerHeight - inputBoxHeight - safeBottomHeight - keyboardHeight),
                    }}>
                        {status === "isFetching" ? (
                            <NotConnected isLoading />
                        ) : (
                            <>
                                {isConnected && status === "connected" ? (
                                    <>
                                        <GradientView>
                                            <LinearGradient
                                                start={[0, 0]}
                                                end={[0, 1]}
                                                style={AppBackgroundLinearGradientStyles.topToBottom}
                                                colors={["rgba(13, 3, 43, 0.0)", "rgba(13, 3, 43, 0.0)", colorScheme.gold]}
                                            />
                                        </GradientView>

                                        <Spacer size="huge" />

                                        <MessagesGroup contentContainerStyle={{ padding: 10 }}
                                                    onContentSizeChange={(contentWidth, contentHeight) => {
                                                        // setScrollTo(contentHeight);
                                                        scrollViewRef?.current?.scrollToEnd({
                                                            animated: true,
                                                        });
                                                    }}
                                        >
                                            { (isMessagesLoading
                                                // ||isMoreMessagesLoading
                                            ) ? (
                                                <View style={{ padding:5 }}>
                                                    <ActivityIndicator size={25} color={colorScheme.gold} />
                                                </View>
                                            ) : (
                                                <>
                                                    {disableMore ? (
                                                        <NoMoreView>
                                                            <P style={{ opacity: 0.4 }}>{"noMore"}</P>
                                                        </NoMoreView>
                                                    ) : (
                                                        <MoreButton
                                                            onPress={() => {}}
                                                            style={({ pressed }) => [
                                                                {
                                                                    opacity: pressed ? 0.2 : 0.4,
                                                                },
                                                            ]}
                                                        >
                                                            <P>{"more"}</P>
                                                        </MoreButton>
                                                    )}
                                                </>
                                            )}
                                            <FlatList
                                                scrollEnabled={false}
                                                keyExtractor={(item,index) => `key-${item.time}`}
                                                data={ messageList }
                                                removeClippedSubviews={true}
                                                // renderItem={renderMessage}
                                                renderItem={({item,index}) => <RenderMessageMemo item={item} index={index}/>}
                                                windowSize={10000}
                                            />
                                            {loading && (
                                                <>
                                                    <ChatMessage direction>
                                                        <InitialBox isNameTheSame error={false}>
                                                            <Initial>{player?.firstNames.charAt(0)}</Initial>
                                                        </InitialBox>
                                                        <TextBox isNameTheSame isNameSameAsNext error={false}>
                                                            <MessageUsername>{player?.firstNames}</MessageUsername>
                                                            {message && <MessageMessage>{message}</MessageMessage>}
                                                            {(imageSelected && result) || (isCameraSelected && cameraTypeOfFeedTaken.type === "image" && result) ? (
                                                                <>
                                                                    {Platform.OS === "android" && <Spacer size="regular" />}
                                                                    <ImageOutline>
                                                                        <PlayerImage
                                                                            width={Dimensions.get("screen").width}
                                                                            height={Dimensions.get("screen").height}
                                                                            source={{
                                                                                uri: `data:image/png;base64,${cameraTypeOfFeedTaken.type === "image" ? cameraTypeOfFeedTaken.url : base64String}`,
                                                                            }}
                                                                            resizeMode="cover"
                                                                        />
                                                                    </ImageOutline>
                                                                    {Platform.OS === "android" && <Spacer size="regular" />}
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            {(videoSelected && result) || (isCameraSelected && cameraTypeOfFeedTaken.type === "video" && result) ? (
                                                                <CenterVideo>
                                                                    {Platform.OS !== "android" ? (
                                                                        <Video
                                                                            id="video"
                                                                            // source={
                                                                            //     cameraTypeOfFeedTaken.type === "video" ? cameraTypeOfFeedTaken.url : { uri: result.fileCopyUri }
                                                                            // }
                                                                            style={{
                                                                                width: Dimensions.get("window").width * 0.6,
                                                                                aspectRatio: 1,
                                                                                borderRadius: UiRadius.small,
                                                                            }}
                                                                            // resizeMode="contain"
                                                                            // controls={true}
                                                                        />
                                                                    ) : (
                                                                        <VideoPlayer
                                                                            // source={{ uri: result.fileCopyUri }}
                                                                            // videoStyle={{
                                                                            //     width: "100%",
                                                                            //     height: "100%",
                                                                            // }}
                                                                            style={{
                                                                                width: Dimensions.get("window").width * 0.6,
                                                                                borderRadius: UiRadius.small,
                                                                            }}
                                                                            // disableBack={true}
                                                                            // disableFullscreen={true}
                                                                        />
                                                                    )}
                                                                </CenterVideo>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </TextBox>
                                                    </ChatMessage>
                                                    <Spacer size="extraHuge" />
                                                    <Spacer size="extraHuge" />
                                                    <Spacer size="extraHuge" />
                                                    <Spacer size="extraHuge" />
                                                    <Spacer size="extraHuge" />
                                                </>
                                            )}
                                        </MessagesGroup>
                                    </>
                                ) : (
                                    status === "failed" && <NotConnected connectionError={connectionError} connect={async () => {}} />
                                )}
                            </>
                        )}
                    </TopicOutline>

                </View>
            </View>

            {isConnected && status !== "failed" && (
                <InputPosition
                    inputBoxHeight={inputBoxHeight}
                    style={{
                        zIndex: 10,
			            position: "absolute",
            		    bottom: Platform.OS === "android" ? 0 : (safeBottomHeight+keyboardHeight),
            		    left: 0,
            		    right: 0,
                        height:inputBoxHeight,
                    }}
                >
                    {isInputBoxExpanded && (
                        <ScrollView
                            horizontal
                            contentContainerStyle={{
                                width: "100%",
                                height: 60,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            {/* Take Picture Button */}
                            <SelectFileButton
                                style={{ backgroundColor: isCameraSelected ? colorScheme.notifications.success : colorScheme.lightMidnightExpress }}
                                onPress={showCameraModal}
                            >
                                {isCameraSelected ? (
                                    <TouchableOpacity onPress={() => {}}>
                                        <View></View>
                                        {/*<Icon name={IconNames.Exit} size={IconSizes.Small} color={colorScheme.white} strokeWidth={2} />*/}
                                    </TouchableOpacity>
                                ) : (
                                    <View></View>
                                    //<Icon name={IconNames.Camera} size={IconSizes.Small} color={colorScheme.white} />
                                )}
                                <SelectFileButtonText>{"picture"}</SelectFileButtonText>
                            </SelectFileButton>
                            {/* Select Video Button */}
                            <SelectFileButton
                                style={{ backgroundColor: videoSelected ? colorScheme.notifications.success : colorScheme.lightMidnightExpress }}
                                onPress={async () => {

                                }}
                            >
                                {videoSelected ? (
                                    <TouchableOpacity onPress={() => {}}>
                                        <View></View>
                                        {/*<Icon name={IconNames.Exit} size={IconSizes.Small} color={colorScheme.white} strokeWidth={2} />*/}
                                    </TouchableOpacity>
                                ) : (
                                    <View></View>
                                    // <Icon name={IconNames.Video} size={IconSizes.Small} color={colorScheme.white} />
                                )}
                                <SelectFileButtonText>{"video"}</SelectFileButtonText>
                            </SelectFileButton>
                            {/* Select Image Button */}
                            <SelectFileButton
                                style={{ backgroundColor: imageSelected ? colorScheme.notifications.success : colorScheme.lightMidnightExpress }}
                                onPress={async () => {

                                }}
                            >
                                {imageSelected ? (
                                    <TouchableOpacity onPress={() => {}}>
                                        <View></View>
                                        {/*<Icon name={IconNames.Exit} size={IconSizes.Small} color={colorScheme.white} />*/}
                                    </TouchableOpacity>
                                ) : (
                                    <View></View>
                                    // <Icon name={IconNames.Image} size={IconSizes.Small} color={colorScheme.white} />
                                )}
                                <SelectFileButtonText>{"image"}</SelectFileButtonText>
                            </SelectFileButton>
                        </ScrollView>
                    )}
                    <InputMessageGroup>
                        <ToolBox>
                            <ToolButton
                                style={{
                                    backgroundColor: "#54246B",
                                }}
                                onPress={onAttachmentButtonPress}
                            >
                        {/*        {isInputBoxExpanded && <AngleDown color={colorScheme.white} width={40} />}*/}
                        {/*        {!isInputBoxExpanded && <AngleUp color={colorScheme.white} width={40} />}*/}
                            </ToolButton>
                        </ToolBox>

                        <InputBox>
                            <RNTextInput
                                placeholder={"textInput.placeholder"}
                                placeholderTextColor={"#DDD"}
                                value={message}
                                onChangeText={(value) => onChangeMessage(value)}
                                style={{
                                    width: "100%",
                                    borderRadius: 0,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    height: 48,
                                    margin: 0,
                                    backgroundColor: "#142026",
                                    color: "#FFFFFF",
                                    fontSize: UiFontSizes.regular,
                                }}
                                multiline
                            />
                        </InputBox>

                        <SendBox>
                            <SendButton
                                onPress={() => {
                                }}
                                disabled={loading}
                                style={{
                                    backgroundColor:"#351d41",
                                }}
                            >
                        {/*        {loading ? (*/}
                        {/*            <ActivityIndicator size={25} color={colorScheme.gold} />*/}
                        {/*        ) : (*/}
                        {/*            <Send*/}
                        {/*                color={ "#ebebebb9" }*/}
                        {/*                width={30}*/}
                        {/*            />*/}
                        {/*        )}*/}
                            </SendButton>
                        </SendBox>
                    </InputMessageGroup>
                </InputPosition>
            )}
            <SafeBottomBox
                style={{
                    position: "absolute",
                    bottom: Platform.OS === "android" ? 0 : keyboardHeight,
                    left: 0,
                    right: 0,
                    height: safeBottomHeight,
                    backgroundColor:"#22313f",
                }}
            ></SafeBottomBox>
        </KeyboardAvoidingView>
    )
}