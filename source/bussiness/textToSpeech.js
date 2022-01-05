import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { textToSpeechAPIHeader, textToSpeechAPIUrl } from '../const';
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import { showMessage } from 'react-native-flash-message';
var Sound = require('react-native-sound');


export default function TextToSpeech({ content, setContent, audio }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    var audio = undefined;
    var timeOut = undefined;
    React.useEffect(() => {
        console.log(content);
        if (content == '') {
            return
        }
        toSpeech();
        return () => {
            clear();
        }
    }, [content])

    const clear = useCallback(() => {
        if (audio != undefined && audio.isPlaying())
            audio.pause()
        audio = undefined;
        clearTimeout(timeOut);
        // setIsPlaying(false);
    })

    const done = () => {
        setIsPlaying(false);
        audio = undefined;
        setContent('');
    }
    const trySpeech = (count, link) => {
        // if (audio != undefined && audio.isPlaying()) {
        //     return;
        // }
        console.log({ count, link });
        audio = new Sound(link, null,
            error => {
                if (error) {
                    if (count > 0) {
                        timeOut = setTimeout(() => {
                            trySpeech(count - 1, link);
                        }, 4000)
                    }
                    else {
                        console.log('Fail to play sound: ' + error);
                        showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                        done();

                    }
                }
                else {
                    audio.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                        } else {
                            console.log('playback failed due to audio decoding errors');
                            showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                        }
                        done();
                    });
                }
            })
    }
    const toSpeech = async () => {

        if (content.length < 3)
            return
        try {
            const res = await axios.post(textToSpeechAPIUrl, content,
                { headers: textToSpeechAPIHeader });
            console.log(res.data);
            timeOut = setTimeout(() => trySpeech(10, res.data.async), 2000)
            setIsPlaying(true);
        } catch (error) {
            console.log(error.response.data);
            // errorHandle(error);
        }
    }
    if (!isPlaying)
        return (<View />)
    return (
        <View style={styles.convertingConatiner} >
            <Text style={styles.converting}>Đang chuyển đổi văn bản thành giọng nói</Text>
            <Spinner isVisible={true} type='Wave' size={20} color='#5f27cd' />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        convertingConatiner: {
            backgroundColor: '#c8d6e5', width: '100%', justifyContent: 'center',
            flexDirection: 'row', padding: 6, alignItems: 'center'
        },
        converting: {
            fontSize: 14,
            fontWeight: '600', color: '#5f27cd', textAlign: 'center',
            marginEnd: 5
        }
    }
)