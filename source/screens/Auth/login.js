import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import firebaseApp from '../../firebaseConfig';
import PasswordTextInput from '../../components/passwordInput';
import { TextInput, Button } from 'react-native-paper';
import { AuthButton } from '../../components/button';
import LoadingIndicator from '../../components/loadingIndicator';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import LoginWithBtn from '../../components/loginWithButton';

export default function Login(props) {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [usernameError, setUsernameError] = React.useState(false);
    const [passError, setPassError] = React.useState(false);
    const { navigation } = props


    const LoginAcc = () => {
        firebaseApp.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
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

    CheckInput = () => {
        if (usernameError != "" || passError != "")
            return false
        if (username == "") {
            setUsernameError('Vui lòng nhập email');
            return false
        }
        if (validateEmail(username) === false) {
            setUsernameError('Email không hợp lệ');
            return false
        }
        if (password == "") {
            setPassError('Vui lòng nhập mật khẩu')
            return false
        }
        if (checkPassword(password) === false) {
            setPassError('Mật khẩu không hợp lệ')
            return false
        }
        return true
    }

    PressLogin = () => {
        if (CheckInput() === false) {
            return
        }
        setLoading(true)
        LoginAcc()
    }
    const getColor = (isError) => {
        return isError ? "red" : "black";
    }
    return (
        <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={globalStyles.imageBackground} >
            <SafeAreaView style={{
                ...globalStyles.container,
                // backgroundColor: '#81ecec'
            }}>
                {/* <FlexCard > */}
                <ScrollView style={{ flex: 1, height: '100%', padding: 10 }}   >
                    {/* // <View> */}
                    <View style={{ alignSelf: 'center' }} >
                        <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 40 }} />
                    </View>

                    <TextInput label={'Email'} placeholder='Nhập email'
                        value={username} mode='outlined' onChangeText={(value) => {
                            setUsername(value)
                            if (value == "") {
                                setUsernameError("Vui lòng nhập email");
                            }
                            else {
                                setUsernameError("");
                            }
                        }}
                        style={{ color: getColor(usernameError != "") }}
                        left={<TextInput.Icon name={'email'} />}
                        error={usernameError}
                    />
                    <Text style={styles.errorMsg} >{usernameError}</Text>

                    <PasswordTextInput title={'Mật khẩu'} placeholder={'Nhập mật khẩu'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Vui lòng nhập mật khẩu')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} isError={passError != ""} />

                    <Text style={styles.errorMsg} >{passError}</Text>

                    <AuthButton onPress={PressLogin} title={'Đăng nhập'} />
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('ForgotPassword')} >
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#3399ff', margin: 5 }} >Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }} > Hoặc tiếp tục với </Text>
                    <LoginWithBtn type={'facebook'} />
                    <LoginWithBtn type={'google'} />
                    <LoginWithBtn type={'phone'} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 10
                    }} >
                        <Text style={{ fontSize: 16 }} >Chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#3399ff' }}> Tạo tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <LoadingIndicator />
                    }
                    {/* </View> */}

                </ScrollView>
                {/* </FlexCard> */}
            </SafeAreaView>
        </ImageBackground>)
}


const styles = StyleSheet.create({
    errorMsg: { color: 'red', marginTop: 5, marginBottom: 10, fontWeight: '500' },
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