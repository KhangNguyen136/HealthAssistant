import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import firebaseApp from '../../firebaseConfig';
import TextInputCard from '../../components/TextInputCard';
import { GetIcon, MyButton } from '../../components/button';
import { globalStyles } from '../../styles/globalStyles';
import Card from '../../components/card';

export default function ChangePassword(navigation) {
    const [email, setEmail] = React.useState('')
    const ok = () => {

    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                {/* <Text style={styles.Title} >Change password</Text> */}
                <View style={{ alignItems: 'center' }} >
                    <GetIcon iconName={'key-change'} source={'MaterialCommunityIcons'} size={80} />
                </View>
                <Text style={styles.content}>Enter the email with your account and we will send an email with instructions to reset your password</Text>
                {/* <Text style={styles.content}>Email address: </Text> */}
                <TextInputCard title={'Email address'} placeholder={'Enter your email'} value={email} onChangeValue={setEmail} />
                <MyButton title={'Send instructions'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} onPress={ok} />

            </Card>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        padding: 10
    },
    content: {
        fontSize: 18,
        padding: 10
    }
})