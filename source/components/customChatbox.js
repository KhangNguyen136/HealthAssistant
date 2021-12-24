import React from 'react';
import { View } from 'react-native';
import { GetIcon, IconButton } from './button';
import { Message, Bubble } from 'react-native-gifted-chat';
import ExpandTextView from './output';

export const renderMessageText = (props) => {

    return (
        <ExpandTextView currentMessage={props.currentMessage} />
    )
}

export const customBubble = (props) => {
    const isUser = props.currentMessage.user._id == 1
    const toSpeech = () => {

    }
    return (
        <View
            style={{
                flexDirection: 'row', width: '92%',
                alignItems: 'center',
                justifyContent: isUser ? 'flex-end' : 'flex-start'
            }}
        >
            {isUser &&
                <View style={{ marginRight: -50 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={22} />
                </View>
            }
            <View  >
                <Bubble {...props} containerStyle={{ margin: 0 }} />
            </View>
            {!isUser &&
                <View style={{ marginLeft: -50 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={24} />
                </View>
            }
        </View>
    )
}

function getText(content) {
    var result = '';
    for (let i = 0; i < content.length; i++) {
        result += content[i].content;
    }
    return result;
}