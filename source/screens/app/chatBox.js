import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { dialogflowConfig } from '../../../env';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { showMessage } from 'react-native-flash-message';
import { GetIcon, IconButton } from '../../components/button';
import Voice from '@react-native-voice/voice';
import NetInfo from '@react-native-community/netinfo';
// import {per} from 'expo'
import { renderMessageText, customMessage, customBubble } from '../../components/customChatbox';

const BOT = {
    _id: 2,
    name: 'Bot',
    avatar: require('../../../assets/botAvt.jpg'),
}

const requestRecordPermission = async () => {
    if (Platform.OS === 'ios')
        return
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Yêu cầu quyền ghi âm",
                message:
                    "Chúng tôi cần quyền ghi âm để sử dụng chức năng nói chuyện bằng giọng nói.",
                buttonNeutral: "Hỏi tôi sau",
                buttonNegative: "Từ chối",
                buttonPositive: "Chấp nhận"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can record audio");
        } else {
            console.log("Recording audio permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export default function ChatboxScreen({ navigation }) {
    var [isSetupDialogflow, setIsSetupDialogflow] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isOffline, setIsOffline] = React.useState(true);
    const [messages, setMessages] = React.useState([helloMsg]);
    const [isTyping, setIsTyping] = React.useState(false);
    const [isListening, setIsListening] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [pitch, setPitch] = React.useState('');
    // const [results, setResults] = React.useState([]);
    // const [partialResults, setPartialResults] = React.useState([]);
    const setUpDialogflow = () => {

    }
    React.useEffect(() => {
        console.log({ isOffline, isSetupDialogflow });
        if (!isSetupDialogflow && !isOffline) {
            Dialogflow_V2.setConfiguration(
                dialogflowConfig.client_email,
                dialogflowConfig.private_key,
                Dialogflow_V2.LANG_ENGLISH_US,
                dialogflowConfig.project_id,
            )
            const permanentContexts = [{
                name: "Auth",
                // lifespan 1 is set automatically, but it's overrideable
                parameters: {
                    AccessToken: "1234yo1234"
                }
            }];
            Dialogflow_V2.setPermanentContexts(permanentContexts);
            setIsSetupDialogflow(true);
        }
    }, [isOffline])

    React.useEffect(() => {
        const removeNetInfoSub = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setIsOffline(offline);
            setIsLoading(false);
        });
        requestRecordPermission()
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        Voice.onSpeechResults = onSpeechResults;
        Voice.destroy = destroyRecognizer;
        // Voice.onSpeechPartialResults = onSpeechPartialResults;
        // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
            removeNetInfoSub();
        };
    }, [])



    const onSpeechStart = () => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ');
    };

    const onSpeechEnd = () => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        // setError(JSON.stringify(e.error));
        // showMessage({ type: 'danger', description: 'Chức năng không khả thi trên ứng dụng này' })
    };

    const onSpeechResults = (event) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', event);
        if (isListening)
            return
        // let speech = event.value[0];
        setMsg(event.value[0])
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        // console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        try {
            await Voice.start('vi-VN');
            setIsListening(true);
            setPitch('');
            // setError('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
            setIsListening(false);
            console.log('stop record');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
            setIsListening(false);
            setMsg('');
            console.log('cancel record');

        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
            // showMessage({ type: 'danger', description: 'Có lỗi đang xảy ra, vui lòng thử lại!' })
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
            setPitch('');
            // setError('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };



    const onSend = React.useCallback((messages = []) => {
        const msg = messages[0].text
        setIsTyping(true);
        Dialogflow_V2.requestQuery(msg,
            (result) => {
                setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
                handleResponse(result);
                setIsOffline(false);
            },
            (error) => {
                console.log(error.message)
                showMessage({ message: 'Gửi thất bại', description: 'Vui lòng thử lại!', type: 'danger' })
                setMsg(msg);
                setIsTyping(false);
            }
        )
    }, [])

    const clearMsg = () => {
        setMsg('');
    }
    const handleResponse = (result) => {
        console.log('Response from dialogflow: ')
        console.log(result)
        // const msg = msgForm;
        try {
            const webhoookStt = result.webhookStatus
            if (webhoookStt?.code != undefined) {
                throw new Error();
            }
            let text = result.queryResult.fulfillmentMessages[0].text.text[0];
            let data = result.queryResult.fulfillmentMessages[1]?.payload.content;
            // console.log(data)
            let msg = {
                _id: result.responseId,
                data,
                text,
                createdAt: new Date(),
                user: BOT
            }

            botReply(msg);
        } catch (error) {
            console.log(error);
            console.log(messages[messages.length - 1]);
            let msg = {
                _id: result.responseId,
                text: 'Hệ thống đang gặp trục trặc, xin vui lòng thử lại sau!',
                createdAt: new Date(),
                user: BOT
            }
            botReply(msg);
        }

    }

    const botReply = (msg) => {
        // console.log(msg)
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        setIsTyping(false);
    }

    const retryConnection = () => {
        NetInfo.fetch().then(state => {
            setIsOffline(!state.isConnected);
            console.log(state.isConnected);
        })
    }

    const CustomButton = (props) => {
        if (isListening) {
            return (
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <IconButton iconName={'checksquareo'} source={'AntDesign'} size={24} color={'#3498db'}
                        onPress={stopRecognizing} />
                    <IconButton iconName={'cancel-presentation'} source={'MaterialIcons'} size={24} color={'#e74c3c'}
                        onPress={cancelRecognizing} />
                </View>
            )
        }
        if (props.text == '') {
            return (
                <View style={{ padding: 5, alignSelf: 'flex-start', flexDirection: 'row' }} >
                    <IconButton iconName={'keyboard-voice'} source={'MaterialIcons'}
                        color={'#3399ff'} size={24}
                        // onPress={startRecognizing}
                        onPress={startRecognizing}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <View style={{ paddingEnd: 5 }} >
                        <IconButton iconName={'close-circle-outline'} source={'Ionicons'}
                            color={'gray'} size={24} onPress={clearMsg} />
                    </View>
                    <Send {...props} containerStyle={{ paddingEnd: 7, justifyContent: 'center' }} >
                        <GetIcon iconName={'ios-send-sharp'} size={24}
                            source={'Ionicons'} color={'#3399ff'} />
                    </Send>
                </View>
            )
        }
    }

    const clickSend = (msg) => {
        console.log(msg[0].text);
        // if (isOffline) {
        //     showMessage({
        //         type: 'danger', message: 'Không có kết nối internet, xin vui lòng kiểm tra và thử lại!'
        //     })
        //     setMsg(msg[0].text);
        //     return;
        // }
        if (isTyping) {
            showMessage({
                message: 'Xin hãy chờ tôi một chút!',
                type: 'warning'
            })
            setMsg(msg[0].text);
            return;
        }
        onSend(msg);
    }

    return (
        <SafeAreaView style={styles.container} >
            {
                isOffline &&
                <View style={styles.noInternetContainer} >
                    <Text style={styles.noInternet}>Không có kết nối internet</Text>
                    {/* <IconButton iconName={'reload'} source={'Ionicons'} onPress={retryConnection} size={18} /> */}

                </View>
            }
            <GiftedChat
                text={msg}
                onInputTextChanged={setMsg}
                messages={messages}
                onSend={messages => clickSend(messages)}
                user={{
                    _id: 1,
                }}
                renderSend={CustomButton}
                // renderMessage={customMessage}
                renderBubble={customBubble}
                isTyping={isTyping}
                renderMessageText={renderMessageText}
                placeholder={'Nhập tin nhắn'}
            // isTyping={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noInternet: {
        fontSize: 15,
        fontWeight: '600', color: 'red', textAlign: 'center',

    },
    noInternetContainer: {
        backgroundColor: '#b2bec3', width: '100%', justifyContent: 'center',
        flexDirection: 'row', padding: 6, alignItems: 'center'
    }
});

const helloMsg = {
    _id: 0,
    text: 'Xin chào! Tôi có thể giúp gì được cho bạn?',
    createdAt: new Date(),
    user: BOT
}

const msgForm = {
    _id: -1,
    text: '',
    createdAt: undefined,
    user: undefined,
}