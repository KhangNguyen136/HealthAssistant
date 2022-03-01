import React from 'react';
import { SafeAreaView, View, ScrollView, Image, Dimensions, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Spinner from 'react-native-spinkit';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';
import { IconButton } from '../../components/button';
import { useFocusEffect } from '@react-navigation/native';
var Sound = require('react-native-sound');
const ratio = 1250 / 2223;
function SpeakGuide({ id, setSpeak, speak }) {
    const [playing, setPlaying] = React.useState(false);
    var audio = undefined;
    const audioLinks = [
        'https://drive.google.com/uc?export=download&id=1RfHXN271SVTKMZI6f7XMfuagveIa2JVf',
        'https://drive.google.com/uc?export=download&id=1UwSDFWTaqfs_APZ9TdD8vgubjl-9pXcE',
        'https://drive.google.com/uc?export=download&id=1HYQYlZU-MUF5uEC4DGv1QVXe3d5E7Tg4',
        'https://drive.google.com/uc?export=download&id=1IiNOTShBVi1SZ6fmtOBIg5Fr2NB5MHoK'
    ]
    React.useEffect(() => {
        console.log('effect');
        console.log({ audio, id })
        if (!speak)
            return
        speakGuide()
        return () => clearAudio()
    }, [speak])


    const clearAudio = () => {
        console.log("Clear_audio");
        console.log({ audio, id })
        if (audio != undefined && audio.isPlaying()) {
            audio.pause()
            // setPlaying(false);
        }
        audio = undefined;
        setPlaying(false);
    }

    const speakDone = () => {
        console.log("Speak_done")
        console.log({ audio, id })
        setPlaying(false);
        audio = undefined;
        setSpeak(false);
    }
    const cancelSpeak = () => {
        console.log("Cancel_speak")
        console.log({ audio, id })
        clearAudio()
        speakDone()
    }
    const speakGuide = () => {
        setPlaying(true);
        // clearAudio();
        audio = new Sound(audioLinks[id], null, error => {
            if (error) {
                console.log('Fail to play sound: ' + error);
                showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                cancelSpeak()
            }
            else {
                console.log('Start speak');
                // setPlaying(true);
                audio.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                    }
                    speakDone()
                    console.log('End speak');
                });
            }
            // setLoading(false);
        })
    }
    if (playing)
        return (
            <View style={styles.convertingConatiner} >
                <View style={styles.row} >
                    <Text style={styles.converting}>Đang đọc hướng dẫn</Text>
                    <Spinner isVisible={true} type='Wave' size={20} color='#5f27cd' />
                </View>
                <IconButton iconName={'cancel'} source={'MaterialIcons'} color='red'
                    onPress={cancelSpeak} />
            </View>
        )
    return null;
}



export default function GuideScreen({ navigation }) {
    const [step, setStep] = React.useState(0);
    const [speak, setSpeak] = React.useState(false);
    const screenSize = Dimensions.get('screen');
    const labels = ['Tra cứu thông tin bệnh', 'Chuẩn đoán bệnh', 'Nhập tin nhắn bằng giọng nói', 'Chuyển văn bản thành giọng nói'];
    const imgs = [
        {
            src: [
                require('../../../assets/guide/diseaseInfo1.png'),
                require('../../../assets/guide/diseaseInfo2.png'),
                require('../../../assets/guide/diseaseInfo3.png'),
            ]
        },
        {
            src: [
                require('../../../assets/guide/diagnose1.png'),
                require('../../../assets/guide/diagnose2.png'),
                require('../../../assets/guide/diagnose3.png'),
            ]
        },
        // {
        //     src: [
        //         require('../../../assets/guide/feedback.png'),
        //     ]
        // },
        {
            src: [
                require('../../../assets/guide/textByVoice1.png'),
                require('../../../assets/guide/textByVoice2.png'),
                require('../../../assets/guide/textByVoice3.png'),
            ]
        },
        {
            src: [
                require('../../../assets/guide/textToSpeak.png'),
            ]
        },
    ]

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton onPress={toSpeak}
                iconName={'text-to-speech'} source={'MaterialCommunityIcons'} size={24} />
        })
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            return () => setSpeak(false);
        }, [])
    )
    const toSpeak = () => {
        console.log(step)
        setSpeak(true);
    }

    const changeStep = (newStep) => {
        if (newStep == step)
            return
        setStep(newStep);
        setSpeak(false);
    }

    const StepGuide = () => {
        var id = 0;
        return (
            // <SliderBox images={data[step].imgs} style={{ height: screenSize.height - otherHeight, aspectRatio: ratio, resizeMode: 'center' }} />
            <ScrollView style={{ flex: 1, marginBottom: 5 }} >
                {
                    imgs[step].src.map(item =>
                        <Image key={id++} source={item} style={{ width: screenSize.width, height: undefined, aspectRatio: ratio, resizeMode: 'contain' }} />)
                }

            </ScrollView>

        )
    }

    return (
        <SafeAreaView style={{ ...globalStyles.container, backgroundColor: 'white' }} >
            <SpeakGuide id={step} setSpeak={setSpeak} speak={speak} />
            <StepGuide />
            <View >
                <StepIndicator currentPosition={step} onPress={changeStep} labels={labels} stepCount={4} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    convertingConatiner: {
        backgroundColor: '#c8d6e5', width: '100%',
        flexDirection: 'row', padding: 6, alignItems: 'center'
    },
    converting: {
        fontSize: 14,
        fontWeight: '600', color: '#5f27cd', textAlign: 'center',
        marginEnd: 5
    },
    row: {
        flexDirection: 'row', flex: 1, justifyContent: 'center'
    }
})