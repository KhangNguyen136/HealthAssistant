import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatboxScreen() {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello! How can i help you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: require('../../../assets/botAvt.jpg'),
                },
            },
        ])
    }, [])

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.container} >
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
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
