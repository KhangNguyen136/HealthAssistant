import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { IconButton } from './button';
import { Bubble } from 'react-native-gifted-chat';
import ExpandTextView from './output';
import axios from 'axios';
import { textToSpeechAPIHeader, textToSpeechAPIUrl } from '../const';
import { showMessage } from 'react-native-flash-message';

import Spinner from 'react-native-spinkit';
var Sound = require('react-native-sound');

export const renderMessageText = (props) => {

    return (
        <ExpandTextView currentMessage={props.currentMessage} />
    )
}

export const customBubble = (props, msgSpeakingID, setMsgSpeakingID, textToSpeechAudio, setTextToSpeechAudio) => {
    const isConverting = msgSpeakingID === props.currentMessage._id;
    const isUser = props.currentMessage.user._id == 1
    // console.log({ isConverting, msgSpeakingID })
    const trySpeech = (count, link) => {
        if (textToSpeechAudio != undefined && textToSpeechAudio.isPlaying()) {
            return;
        }
        console.log({ count, link });
        const newAudio = new Sound(link, null,
            error => {
                if (error) {
                    if (count > 0) {
                        setTimeout(() => {
                            trySpeech(count - 1, link);
                        }, 4000)
                        // return;
                    }
                    else {
                        console.log('Fail to play sound: ' + error);
                        showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                        // setPlaying(false);
                        setMsgSpeakingID('');
                    }
                }
                else {
                    newAudio.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                            setMsgSpeakingID('');
                        } else {
                            console.log('playback failed due to audio decoding errors');
                            showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                        }
                        // setPlaying(false);
                    });
                }
            })
        setTextToSpeechAudio(newAudio);
        // textToSpeechAudio.release()
    }
    const toSpeech = async () => {
        if (textToSpeechAudio != undefined && textToSpeechAudio.isPlaying()) {
            textToSpeechAudio.pause();
        }
        const text = getText(props.currentMessage);
        if (text.length < 3)
            return
        try {
            const res = await axios.post(textToSpeechAPIUrl, text,
                { headers: textToSpeechAPIHeader });
            console.log(res.data);
            setTimeout(() => trySpeech(10, res.data.async), 1000)
            // showMessage({ type: 'info', message: 'Đang chuyển đổi văn bản thành giọng nói, xin hãy chờ trong giây lát!' })
            setMsgSpeakingID(props.currentMessage._id);
        } catch (error) {
            console.log(error.response.data);
            // setPlaying(false);
            // errorHandle(error);
        }
    }
    const TTS = ({ isLeft = true }) => {
        const style = isLeft ? { marginLeft: -50 } : { marginRight: -50 }
        // const icon = isConverting ? { name: 'loading1', src: 'AntDesign' } : { name: 'text-to-speech', src: 'MaterialCommunityIcons' }
        if (isConverting)
            return <Spinner style={style} type='Bounce' size={24} />
        return (<View style={style} >
            <IconButton iconName={'text-to-speech'}
                source={'MaterialCommunityIcons'} size={24} onPress={toSpeech} />
        </View>)
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
                <TTS isLeft={false} />
            }
            <View  >
                <Bubble {...props} containerStyle={{ margin: 0 }} />
            </View>
            {(!isUser) &&
                <TTS />
            }
        </View>
    )
}

function getText(msg) {
    if (msg.user._id == 1 || msg.data == undefined || msg.data.length == 0) {
        return msg.text
    }
    var result = '';
    const content = msg.data
    for (let i = 0; i < content.length; i++) {
        result += content[i].content;
    }
    return result;
}