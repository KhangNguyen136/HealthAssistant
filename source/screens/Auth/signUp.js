import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import firebaseApp from '../../firebaseConfig';
import TextInputCard from '../../components/TextInputCard';
import PasswordTextInput from '../../components/passwordInput';
import { AuthButton } from '../../components/button';
import { Formik } from 'formik';
import Card, { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';
// import InputForm from '../../Components/InputForm/signUpForm'

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [displayName, setDisplayName] = React.useState('')

    const [usernameError, setUsernameError] = React.useState('')
    const [passError, setPassError] = React.useState('')
    const [confirmPassError, setConfirmPassError] = React.useState('')
    const [displayNameError, setDisplayNameError] = React.useState('')

    const navigation = useNavigation()
    const SignUpAcc = (email, password) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                setLoading(false);
                showMessage({
                    message: 'Đăng ký thành công',
                    description: 'Tự động đăng nhập sau khi đăng ký',
                    type: 'success'
                });
                // firebaseApp.auth().signOut().then(() => {
                //     // Sign-out successful.
                //     console.log('Logged out after sign up successfully!')
                // }).catch((error) => {
                //     // An error happened.
                //     console.log('Logged out after sign up failed!')
                // });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false);
                showMessage({
                    message: 'Đăng ký thất bại',
                    description: error.message,
                    type: 'danger'
                })
                // ..
            });
    }
    pressSignUp = () => {
        console.log('press sign up')
        if (CheckInput(username, password, confirmPassword, displayName) === false) {
            console.log(false)
            return
        }
        setLoading(true)

        SignUpAcc(username, password)
    }
    function CheckInput(email, pass, pass2, name) {
        if (validateEmail(email) === false) {
            setUsernameError('Email không hợp lệ')
            return false
        }
        if (checkPassword(pass) === false) {
            setPassError('Mật khẩu phải chứa ít nhất 6 ký tự.')
            return false
        }
        if (pass !== pass2) {
            setConfirmPassError('Xác nhận mật khẩu không trùng khớp')

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

            <ScrollView style={{ flex: 1 }} >
                <FlexCard  >
                    <View style={{ alignSelf: 'center' }} >
                        <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
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

                    <Text style={styles.error}>{usernameError}</Text>
                    <PasswordTextInput title={'Mật khẩu'} placeholder={'Phải chứa ít nhất 6 ký tự.'} value={password}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setPassError('Mật khẩu phải chứa ít nhất 6 ký tự')
                            }
                            else {
                                setPassError('')
                            }
                            setPassword(value)
                        }} />

                    <Text style={styles.error}>{passError}</Text>

                    <PasswordTextInput title={'Xác nhận mật khẩu'} placeholder={'Nhập lại mật khẩu'} value={confirmPassword}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setConfirmPassError('Xác nhận mật khẩu không trùng khớp')
                            }
                            else {
                                setConfirmPassError('')
                            }
                            setConfirmPassword(value)
                        }} />

                    <Text style={styles.error}>{confirmPassError}</Text>

                    {/* <Text style={{ paddingLeft: 10, marginBottom: 5 }}>Must be the same as password.</Text> */}

                    <TextInputCard title={'Tên hiển thị'} placeholder={'Nhập tên bạn muốn sử dụng'} value={displayName}
                        onChangeValue={(value) => {
                            if (value == '') {
                                setDisplayNameError('Vui lòng nhập tên hiển thị')
                            }
                            else {
                                setDisplayNameError('')
                            }
                            setDisplayName(value)
                        }} />

                    <Text style={styles.error}>{displayNameError}</Text>
                    <View style={{ height: 10 }} />
                    <AuthButton onPress={pressSignUp} title={'Đăng ký'} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }} >
                        <Text style={{ fontSize: 14 }} >Đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                            <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    {loading &&
                        <LoadingIndicator />
                    }
                </FlexCard>
            </ScrollView>

            {/* </ScrollView> */}
        </SafeAreaView>
    )
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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}