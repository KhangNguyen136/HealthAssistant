import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { IconButton } from './button';
import { Bubble } from 'react-native-gifted-chat';
import ExpandTextView from './output';
// import axios from 'axios';
// import { textToSpeechAPIHeader, textToSpeechAPIUrl } from '../const';
// import { showMessage } from 'react-native-flash-message';

// import Spinner from 'react-native-spinkit';

export const renderMessageText = (props) => {

    return (
        <ExpandTextView currentMessage={props.currentMessage} />
    )
}

export const customBubble = (props, setSpeechText) => {
    const isUser = props.currentMessage.user._id == 1
    // console.log({ isConverting, msgSpeakingID })
    const toSpeech = () => {
        setSpeechText(getText(props.currentMessage));
    }
    // const TTS = ({ isLeft = true }) => {
    //     const style = isLeft ? { marginLeft: -50 } : { marginRight: -50 }
    //     // const icon = isConverting ? { name: 'loading1', src: 'AntDesign' } : { name: 'text-to-speech', src: 'MaterialCommunityIcons' }
    //     if (isConverting)
    //         return <Spinner style={style} type='Bounce' size={24} />
    //     return (<View style={style} >
    //         <IconButton iconName={'text-to-speech'}
    //             source={'MaterialCommunityIcons'} size={24} onPress={toSpeech} />
    //     </View>)
    // }
    return (
        <View
            style={{
                flexDirection: 'row', width: '92%',
                alignItems: 'center',
                justifyContent: isUser ? 'flex-end' : 'flex-start'
            }}
        >
            {isUser &&
                <View style={{ marginRight: -55 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={24} onPress={toSpeech} />
                </View>
            }
            <View  >
                <Bubble {...props} containerStyle={{ margin: 0 }} />
            </View>
            {(!isUser) &&
                <View style={{ marginLeft: -55 }} >
                    <IconButton iconName={'text-to-speech'}
                        source={'MaterialCommunityIcons'} size={24} onPress={toSpeech} />
                </View>
            }
        </View>
    )
}

function getText(msg) {
    if (msg.user._id == 1 || msg.data == undefined || msg.data.length == 0) {
        return msg.text
    }
    var result = msg.text + '. ';
    const content = msg.data
    for (let i = 0; i < content.length; i++) {
        result += content[i].content;
    }
    return result;
}