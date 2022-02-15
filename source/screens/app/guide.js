import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Image, Dimensions } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import LoadingIndicator from '../../components/loadingIndicator';
import { showMessage } from 'react-native-flash-message';
import StepIndicator from 'react-native-step-indicator';
import { IconButton } from '../../components/button';
import { useFocusEffect } from '@react-navigation/native';
var Sound = require('react-native-sound');
const ratio = 1250 / 2223;
export default function GuideScreen({ navigation }) {
    const [step, setStep] = React.useState(0);
    const [imgId, setImgId] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const screenSize = Dimensions.get('screen');
    var audio = undefined;
    const audioLink = 'https://drive.google.com/uc?export=download&id=1xM573UeLsq_EpUU5FN6CT98q-AUqYweP';
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
    // const ratios = [
    //     1250 / 6667,
    //     1250 / 6667,
    //     1250 / 2223,
    //     1250 / 8889,
    //     1250 / 2223,
    // ]
    useFocusEffect(
        React.useCallback(() => {
            return () => clearAudio();
        }, [])
    )
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton onPress={speakGuide}
                iconName={'text-to-speech'} source={'MaterialCommunityIcons'} size={24} />
        })
    }, [])
    React.useEffect(() => {
        return () => {
            clearAudio();
        }
    }, [])
    const changeStep = (newStep) => {
        setStep(newStep);
    }
    const clearAudio = () => {
        if (audio != undefined && audio.isPlaying())
            audio.pause()
        audio = undefined;
    }
    const speakGuide = () => {
        setLoading(true);
        clearAudio();
        audio = new Sound(audioLink, null, error => {
            if (error) {
                console.log('Fail to play sound: ' + error);
                showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                clearAudio();
            }
            else {
                console.log('Start speak');
                audio.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        showMessage({ type: 'danger', message: 'Chuyển đổi văn bản thành giọng nói thất bại, xin vui lòng thử lại sau' });
                    }
                    console.log('End speak');
                });
            }
            setLoading(false);
        })
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
            {
                loading &&
                <LoadingIndicator />
            }
            <StepGuide />
            <View onLayout={(e) => {
                console.log(e.nativeEvent.layout.height)
                setOtherHeight(e.nativeEvent.layout.height);
                setLoading(false);
            }}>
                <StepIndicator currentPosition={step} onPress={changeStep} labels={labels} stepCount={4} />

            </View>
        </SafeAreaView>
    )
}