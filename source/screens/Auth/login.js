import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Formik } from 'formik';
import firebaseApp from '../../firebaseConfig';
// import { Success, CheckInputFailed } from '../../Components/AlertMsg/messageAlert';
import TextInputCard from '../../components/TextInputCard'
import PasswordTextInput from '../../components/passwordInput';
import { AuthButton } from '../../components/button';
import LoadingIndicator from '../../components/loadingIndicator';
import { FlexCard } from '../../components/card';
import { showMessage } from 'react-native-flash-message';

export default function Login(props) {
    const [loading, setLoading] = React.useState(false)
    const { navigation } = props

    const LoginAcc = (email, password, setAccount) => {
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                setLoading(false)
                showMessage({
                    message: 'Logged in successfully',
                    type: 'success'
                });
                dispatch(loggedIn())
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false)
                showMessage({
                    message: 'Login failed',
                    description: error.message,
                    type: 'danger'
                })
            });
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            <Formik initialValues={{ email: '', pass: '' }}
                onSubmit={(values) => {
                    setLoading(true)
                    if (CheckInput(values.email, values.pass) === false) {
                        setLoading(false)
                        return
                    }
                    LoginAcc(values.email, values.pass)
                }}>
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <FlexCard >
                        <View style={{ alignSelf: 'center' }} >
                            <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 40 }} />
                        </View>
                        <TextInputCard title={'Email or phone number: '} placeholder={'Enter email or phone number'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
                        <View style={{ height: 10 }} />
                        <PasswordTextInput placeholder={'Password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />
                        <View style={{ height: 10 }} />
                        <AuthButton onPress={handleSubmit} title={'Login'} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }} >
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }} >FORGOT PASSWORD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#3399ff' }}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                        {loading &&
                            <LoadingIndicator />
                        }
                    </FlexCard>
                )}
            </Formik>
        </SafeAreaView>)
}

function CheckInput(email, pass) {
    if (validateEmail(email) === false) {
        showMessage({
            message: 'Invalid email',
            description: 'Check your email and try again!',
            type: 'warning'
        })
        return false
    }
    if (checkPassword(pass) === false) {
        showMessage({
            message: 'Invalid password',
            description: 'Password must contain more than 5 characters!',
            type: 'warning'
        })
        return false
    }
    return true
}
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