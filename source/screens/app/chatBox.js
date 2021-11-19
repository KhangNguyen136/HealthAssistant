import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { dialogflowConfig } from '../../../env';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { showMessage } from 'react-native-flash-message';
import { GetIcon, IconButton } from '../../components/button';
import Voice from '@react-native-voice/voice';
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
    const [isListening, setIsListening] = React.useState(false)

    const [pitch, setPitch] = React.useState('');
    const [error, setError] = React.useState('');
    const [end, setEnd] = React.useState('');
    const [started, setStarted] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [partialResults, setPartialResults] = React.useState([]);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 7 }} onPress={() => navigation.navigate('History')} >
                    <GetIcon iconName={'history'} source={'FontAwesome'} />
                </TouchableOpacity>
            ),
        })
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
        setStarted('√');
    };

    const onSpeechEnd = (e) => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        setEnd('√');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        // setResults(e.value);
    };

    const onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        try {
            await Voice.start('vn');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };


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

    const handleResponse = (result) => {
        // console.log(result)
        let text = result.queryResult.fulfillmentMessages[0].text.text[0]
        let msg = {
            _id: result.responseId,
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
                <Send {...props} containerStyle={{ padding: 5, justifyContent: 'flex-start' }} >
                    <GetIcon iconName={'ios-send-sharp'} source={'Ionicons'} color={'#3399ff'} />
                </Send>

            )
        }
    }


    return (
        <SafeAreaView style={styles.container} >
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderSend={CustomButton}
                // renderMessage={customMessage}
                renderBubble={customBubble}
                messagesContainerStyle={{
                    minHeight: 0,
                    margin: 0
                    // maxHeight: 500
                    // flex: 1,
                }}
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
