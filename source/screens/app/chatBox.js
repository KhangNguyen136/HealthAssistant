import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { dialogflowConfig } from '../../../env';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { showMessage } from 'react-native-flash-message';
import { GetIcon, IconButton } from '../../components/button';

const BOT = {
    _id: 2,
    name: 'Bot',
    avatar: require('../../../assets/botAvt.jpg'),
}



export default function ChatboxScreen() {
    const [messages, setMessages] = React.useState([{
        _id: 0,
        text: 'Hello! How can i help you?',
        createdAt: new Date(),
        user: BOT
    }]);

    React.useEffect(() => {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id,
        )
    }, [])

    const CustomButton = (props) => {
        if (props.text == '') {
            return (
                <View style={{ padding: 5, alignSelf: 'flex-start' }} >
                    <IconButton iconName={'keyboard-voice'} source={'MaterialIcons'}
                        color={'#3399ff'} size={24}
                        onPress={() => console.log('Voice')} />
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

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const msg = messages[0].text
        Dialogflow_V2.requestQuery(msg,
            (result) => handleResponse(result),
            (error) => {
                console.log(error.message)
                showMessage({ message: 'Send failed', description: error.message, type: 'danger' })
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

    return (
        <View style={styles.container} >
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            // renderSend={CustomButton}

            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
