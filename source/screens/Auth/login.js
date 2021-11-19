import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Formik } from 'formik';
import firebaseApp from '../../firebaseConfig';
// import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import TextInputCard from '../../components/TextInputCard'
import PasswordTextInput from '../../components/passwordInput';
import { AuthButton, GetIcon, MyButton } from '../../components/button';
import LoadingIndicator from '../../components/loadingIndicator';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import LoginWithBtn from '../../components/loginWithButton';

export default function Login(props) {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')

    const { navigation } = props


    const LoginAcc = (email, password, setAccount) => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                setLoading(false)
                showMessage({
                    message: 'Đăng nhập thành công',
                    type: 'success'
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false)
                showMessage({
                    message: 'Đăng nhập thất bại',
                    description: error.message,
                    type: 'danger'
                })
            });
    }

    CheckInput = (email, pass) => {
        if (validateEmail(email) === false) {
            setUsernameError('Email không hợp lệ')
            return false
        }
        if (checkPassword(pass) === false) {
            setPassError('Mật khẩu không hợp lệ')
            return false
        }
        return true
    }

    PressLogin = () => {
        console.log('log in with', { username, password })
        if (CheckInput(username, password) === false) {
            console.log('false')
            return
        }
        setLoading(true)
        LoginAcc(username, password)
    }

    return (
        <SafeAreaView style={{
            ...globalStyles.container,
            // backgroundColor: '#81ecec'
        }}>

            <ScrollView style={{ flex: 1 }} >
                <FlexCard >
                    {/* // <View> */}
                    <View style={{ alignSelf: 'center' }} >
                        <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 40 }} />
                    </View>
                    <TextInputCard title={'Email'} placeholder={'Nhập email'} value={username}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setUsernameError('Vui lòng nhập email')
                            }
                            else {
                                setUsernameError('')
                            }
                            setUsername(value)
                        }} />

                    <Text style={styles.error} >{usernameError}</Text>
                    <View style={{ height: 10 }} />
                    <PasswordTextInput title={'Mật khẩu'} placeholder={'Nhập mật khẩu'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Vui lòng nhập mật khẩu')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} />
                    <Text style={styles.error} >{passError}</Text>

                    <View style={{ height: 10 }} />
                    <AuthButton onPress={PressLogin} title={'Đăng nhập'} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }} >
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }} >Quên mật khẩu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Đăng ký</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }} > Hoặc tiếp tục với </Text>
                    <LoginWithBtn type={'facebook'} />
                    <LoginWithBtn type={'google'} />
                    <LoginWithBtn type={'phone'} />
                    {loading &&
                        <LoadingIndicator />
                    }
                    {/* </View> */}
                </FlexCard>
            </ScrollView>

        </SafeAreaView>)
}


styles = StyleSheet.create({
    error: { color: 'orange', marginLeft: 10, fontWeight: '500' },
})



function checkPassword(pass) {
    if (pass.length < 6) {
        return false
    }
    return true
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}