import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import firebaseApp from '../../firebaseConfig';
import { TextInput } from 'react-native-paper';
import PasswordTextInput from '../../components/passwordInput';
import { AuthButton } from '../../components/button';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import { resgister } from '../../servies/userInfoServices';
// import InputForm from '../../Components/InputForm/signUpForm'

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [displayName, setDisplayName] = React.useState('')

    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')
    const [displayNameError, setDisplayNameError] = React.useState('')

    const navigation = useNavigation()
    const SignUpAcc = async (email, password) => {
        try {
            const userCredential = await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            const user = userCredential.user
            if (user == null)
                throw new Error();
            const res = await resgister(user.uid, email, displayName);
            if (res)
                showMessage({
                    message: 'Đăng ký thành công',
                    description: 'Tự động đăng nhập sau khi đăng ký',
                    type: 'success'
                });
            else
                throw new Error()
            setLoading(false);
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            var des = "Có sự cố xảy ra trong quá trình đăng nhập, vui lòng kiểm tra và thử lại.";
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    des = "Email đã sử dụng"
                    break;
                case "auth/network-request-failed":
                    des = "Vui lòng kiểm tra kết nối mạng và thử lại";
                    break;
            }
            setLoading(false);
            showMessage({
                message: 'Đăng ký thất bại',
                description: des,
                type: 'danger'
            })
        }
        // .then(async (userCredential) => {
        //     // Signed in 
        //     var user = userCredential.user;
        //     const res = await resgister(user.uid, email, displayName)
        //     if (res)
        //         showMessage({
        //             message: 'Đăng ký thành công',
        //             description: 'Tự động đăng nhập sau khi đăng ký',
        //             type: 'success'
        //         });
        //     else
        //         throw new Error()
        //     setLoading(false);
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     console.log(errorCode);
        //     var des = "Có sự cố xảy ra trong quá trình đăng nhập, vui lòng kiểm tra và thử lại.";
        //     switch (errorCode) {
        //         case 'auth/email-already-in-use':
        //             des = "Email đã sử dụng"
        //             break;
        //         case "auth/network-request-failed":
        //             des = "Vui lòng kiểm tra kết nối mạng và thử lại";
        //             break;
        //     }
        //     setLoading(false);
        //     showMessage({
        //         message: 'Đăng ký thất bại',
        //         description: des,
        //         type: 'danger'
        //     })
        //     // ..
        // });
    }
    pressSignUp = () => {
        if (CheckInput(username, password, displayName) === false) {
            return
        }
        setLoading(true)
        SignUpAcc(username, password)
    }
    function CheckInput(email, pass, name) {
        if (usernameError != "" || passError != "" || displayNameError != "")
            return false
        if (email == "") {
            setUsernameError('Vui lòng nhập email');
            return false;
        }
        if (validateEmail(email) === false) {
            setUsernameError('Email không hợp lệ')
            return false
        }
        if (pass == "") {
            setPassError('Vui lòng nhập mật khẩu')
            return false
        }
        if (checkPassword(pass) === false) {
            setPassError('Mật khẩu phải chứa ít nhất 6 ký tự.')
            return false
        }
        if (name === '') {
            setDisplayNameError('Vui lòng nhập tên hiển thị')
            return false
        }
        return true
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* <ScrollView style={{ flex: 1 }} > */}
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={globalStyles.imageBackground} >

                <ScrollView style={{ flex: 1, padding: 10 }} >
                    {/* <FlexCard  > */}
                    <View style={{ alignSelf: 'center' }} >
                        <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
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
                        // style={{ color: getColor(usernameError != "") }}
                        left={<TextInput.Icon name={'email'} />}
                        error={usernameError}
                    />

                    <Text style={styles.errorMsg}>{usernameError}</Text>
                    <PasswordTextInput title={'Mật khẩu'} placeholder={'Phải chứa ít nhất 6 ký tự.'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Mật khẩu phải chứa ít nhất 6 ký tự')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} isError={passError != ""} />

                    <Text style={styles.errorMsg}>{passError}</Text>
                    <TextInput label={'Tên hiển thị'} mode='outlined'
                        placeholder={'Nhập tên bạn muốn sử dụng'} value={displayName}
                        onChangeText={(value) => {
                            if (value == '') {
                                setDisplayNameError('Vui lòng nhập tên hiển thị')
                            }
                            else {
                                setDisplayNameError('')
                            }
                            setDisplayName(value)
                        }} style={{ color: getColor(displayNameError != "") }}
                        left={<TextInput.Icon name={'account'} />}
                        error={displayNameError}
                    />

                    <Text style={styles.errorMsg}>{displayNameError}</Text>
                    <View style={{ height: 10 }} />
                    <AuthButton onPress={pressSignUp} title={'Đăng ký'} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 10
                    }} >
                        <Text style={{ fontSize: 16 }} >Đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                            <Text style={{ paddingLeft: 3, fontSize: 16, fontWeight: '500', color: '#3399ff' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <LoadingIndicator />
                    }
                    {/* </FlexCard> */}
                </ScrollView>
            </ImageBackground>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

styles = StyleSheet.create({
    errorMsg: { color: 'red', marginTop: 5, marginBottom: 10, fontWeight: '500' },
})


function checkPassword(pass) {
    if (pass.length < 6) {
        return false
    }
    return true
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const getColor = (isError) => {
    return isError ? "red" : "black";
}