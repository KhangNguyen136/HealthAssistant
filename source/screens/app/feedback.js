import React from 'react';
import { Text, SafeAreaView, Image, StyleSheet, View, ImageBackground } from 'react-native';
import LoadingIndicator from '../../components/loadingIndicator';
import { globalStyles } from '../../styles/globalStyles';
import StarRating from 'react-native-star-rating';
import { TextInput } from 'react-native-paper';
import { FlexCard } from '../../components/card';
import { AuthButton, GetIcon } from '../../components/button';
import { sendFeedback } from '../../servies/feedbackServices';
import firebaseApp from '../../firebaseConfig';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';

export default function FeedbackScreen() {
    const [isSent, setIsSent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [rating, setRating] = React.useState(null);
    const [feedback, setFeedback] = React.useState("");
    const [userInfo] = React.useState(firebaseApp.auth().currentUser);
    const submit = async () => {
        if (rating == null) {
            showMessage({
                type: 'warning',
                message: 'Vui lòng đánh giá trãi nghiệm của bạn'
            })
            return;
        }
        setLoading(true);
        const res = await sendFeedback(userInfo.uid, rating, feedback);
        if (res) {
            setIsSent(true);
        }
        else {
            showMessage({
                type: 'danger',
                message: 'Có lỗi đã xảy ra',
                description: 'Vui lòng kiểm tra kết nối internet và thử lại!'
            })
        }
        setLoading(false);
    }
    const ThankScreen = () => {

    }
    if (isSent)
        return (
            <ImageBackground source={require('../../../assets/background.png')} style={globalStyles.imageBackground} >
                <SafeAreaView style={globalStyles.container} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ margin: 20 }}>
                            <GetIcon iconName={'checkcircleo'} source={'AntDesign'} size={69} color={'#00a8ff'} />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Cảm ơn phản hồi của bạn!</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Chúng tôi sẽ tích cực tiếp nhận phản hồi của bạn và cải thiện ứng dụng ngày càng tốt hơn.</Text>
                    </View>
                    <AuthButton title={'Gửi lại'} onPress={() => setIsSent(false)} />
                </SafeAreaView>
            </ImageBackground>
        )
    return (
        <SafeAreaView style={globalStyles.container}>
            <FlexCard>
                <ScrollView style={{ flex: 1 }}>
                    <Image source={{ uri: gifLink }} style={styles.imgStyle} />
                    <Text style={styles.title}>Trãi nghiệm của bạn như thế nào?</Text>
                    <StarRating
                        disabled={false} maxStars={5} rating={rating} selectedStar={setRating}
                        starSize={30} containerStyle={{ padding: 20 }} fullStarColor={'#f1c40f'} />
                    <Text style={styles.title}>Nhận xét</Text>
                    <TextInput value={feedback} placeholder={'Hãy cho chúng tôi biết cảm nhận hoặc đóng góp của bạn'}
                        multiline onChangeText={setFeedback} mode={'outlined'}
                        style={styles.input} maxLength={1500} />
                    <AuthButton title={'Gửi'} onPress={submit} />
                </ScrollView>
            </FlexCard>
            {
                loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imgStyle: { width: '100%', height: 200 },
    title: {
        fontSize: 18, fontWeight: 'bold', margin: 10,
    },
    input: {
        minHeight: 60, maxHeight: 200, padding: 5, marginBottom: 10
    }

})

const gifLink = 'https://cdn.dribbble.com/users/616823/screenshots/3786967/breton-feedback-box.gif';