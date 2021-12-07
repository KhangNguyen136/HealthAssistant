import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { dialogflowConfig } from '../../../env';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { showMessage } from 'react-native-flash-message';
import { GetIcon, IconButton } from '../../components/button';
import Voice from '@react-native-voice/voice';
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
    const [messages, setMessages] = React.useState([{
        _id: 0,
        text: 'Xin chào! Tôi có thể giúp gì được cho bạn?',
        createdAt: new Date(),
        user: BOT
    }]);

    const [isListening, setIsListening] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [pitch, setPitch] = React.useState('');
    const [error, setError] = React.useState('');
    // const [end, setEnd] = React.useState('');
    // const [started, setStarted] = React.useState('');
    // const [results, setResults] = React.useState([]);
    // const [partialResults, setPartialResults] = React.useState([]);

    React.useEffect(() => {

        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id,
        )
        requestRecordPermission()
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        Voice.onSpeechResults = onSpeechResults;

        // Voice.onSpeechPartialResults = onSpeechPartialResults;
        // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [])



    const onSpeechStart = () => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ');
        // setStarted('√');
    };

    const onSpeechEnd = () => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ');

        // setEnd('√');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (event) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', event);
        if (isListening)
            return
        // setResults(event.value)
        // let speech = event.value[0];
        setMsg(event.value[0])

        // setResults(e.value);
    };

    // const onSpeechPartialResults = (e) => {
    //     //Invoked when any results are computed
    //     console.log('onSpeechPartialResults: ', e);
    //     setPartialResults(e.value);
    // };

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
            // setStarted('');
            // setResults([]);
            // setPartialResults([]);
            // setEnd('');
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
        }
    };

    // const destroyRecognizer = async () => {
    //     //Destroys the current SpeechRecognizer instance
    //     try {
    //         await Voice.destroy();
    //         setPitch('');
    //         setError('');
    //         setStarted('');
    //         setResults([]);
    //         setPartialResults([]);
    //         setEnd('');
    //     } catch (e) {
    //         //eslint-disable-next-line
    //         console.error(e);
    //     }
    // };

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const msg = messages[0].text
        Dialogflow_V2.requestQuery(msg,
            (result) => handleResponse(result),
            (error) => {
                console.log(error.message)
                showMessage({ message: 'Gửi thất bại', description: error.message, type: 'danger' })
            }
        )
    }, [])

    const clearMsg = () => {
        setMsg('');
    }
    const handleResponse = (result) => {
        console.log('Response from dialogflow: ')
        console.log(result)
        let text = result.queryResult.fulfillmentMessages[0].text.text[0]
        let data = result.queryResult.fulfillmentMessages[1]?.payload.content
        // console.log(data)
        let msg = {
            _id: result.responseId,
            data,
            text,
            createdAt: new Date(),
            user: BOT
        }
        botReply(msg)
    }

    const botReply = (msg) => {

        // console.log(msg)
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))

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


    return (
        <SafeAreaView style={styles.container} >
            <GiftedChat
                text={msg}
                onInputTextChanged={setMsg}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderSend={CustomButton}
                // renderMessage={customMessage}
                renderBubble={customBubble}

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
});
