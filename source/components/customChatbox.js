import React from 'react';
import { View } from 'react-native';
import { GetIcon, IconButton } from './button';
import { Message, Bubble } from 'react-native-gifted-chat';
import FlexText from './expandText';

export const renderMessageText = (props) => {

    return (
        <FlexText currentMessage={props.currentMessage} />
    )
}

export const customMessage = (props) => {
    const isUser = props.currentMessage.user._id == 1
    return (
        <View
        // style={{ flexDirection: 'row', alignItems: 'center', width: '96%' }}
        >
            {isUser &&
                <View style={{ margin: 5 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={30} />
                </View>
            }
            <Message {...props} />
            {!isUser &&
                <View style={{ margin: 5 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={30} />
                </View>
            }
        </View>
    )
}

export const customBubble = (props) => {
    const isUser = props.currentMessage.user._id == 1
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
                        source={'MaterialCommunityIcons'} size={24} />
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