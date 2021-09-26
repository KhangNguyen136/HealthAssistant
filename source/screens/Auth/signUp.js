import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/core';
import LoadingIndicator from '../../components/loadingIndicator';
import firebaseApp from '../../firebaseConfig';
import TextInputCard from '../../components/TextInputCard';
import PasswordTextInput from '../../components/passwordInput';
import { LoginButton } from '../../components/button';
import { Formik } from 'formik';
import { FlexCard } from '../../components/card';
// import InputForm from '../../Components/InputForm/signUpForm'

export default function SignUp() {
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation()
    const SignUpAcc = (email, password, resetForm) => {
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                setLoading(false);
                // Success('Signed up successfully', 'Auto login after signed up.')
                console.log('Sign up successfully')
                resetForm()
                firebaseApp.auth().signOut().then(() => {
                    // Sign-out successful.
                    console.log('Logged out after sign up successfully!')
                }).catch((error) => {
                    // An error happened.
                    console.log('Logged out after sign up failed!')
                });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setLoading(false);
                // CheckInputFailed('Signed up failed', errorMessage)
                console.log('Signed up failed', errorMessage)
                // ..
            });
    }
    return (
        <SafeAreaView style={globalStyles.container}>
            {/* <InputForm /> */}
            <Formik initialValues={{ email: '', pass: '', pass2: '', displayName: '' }}
                onSubmit={(values, { resetForm }) => {
                    setLoading(true)
                    if (CheckInput(values.email, values.pass, values.pass2, values.displayName) === false) {
                        setLoading(false)
                        return
                    }
                    SignUpAcc(values.email, values.pass, resetForm)
                }}>
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <FlexCard >
                        <View style={{ alignSelf: 'center' }} >
                            <Image style={{ borderRadius: 40 }} source={require('../../../assets/logo.png')} />
                        </View>
                        <TextInputCard placeholder={'Your Email'} value={values.email} onChangeValue={handleChange('email')} onBlur={handleBlur('email')} />
                        {/* <View style={{ height: 5 }} /> */}
                        <PasswordTextInput placeholder={'Password'} value={values.pass} onChangeValue={handleChange('pass')} onBlur={handleBlur('pass')} />

                        <Text style={{ paddingLeft: 10 }}>Must be contain at least 6 characters.</Text>
                        {/* <View style={{ height: 5 }} /> */}
                        <PasswordTextInput placeholder={'Confirm password'} value={values.pass2} onChangeValue={handleChange('pass2')} onBlur={handleBlur('pass2')} />
                        <Text style={{ paddingLeft: 10 }}>Must be the same as password.</Text>

                        {/* <View style={{ height: 5 }} /> */}
                        <TextInputCard placeholder={'Display name'} value={values.displayName} onChangeValue={handleChange('displayName')} onBlur={handleBlur('displayName')} />
                        <View style={{ height: 20 }} />
                        <LoginButton onPress={handleSubmit} title={'Sign up'} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // paddingHorizontal: 10
                        }} >
                            <Text style={{ fontSize: 14 }} >Have had an account already?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
                                <Text style={{ paddingLeft: 3, fontSize: 14, fontWeight: '500', color: '#3399ff' }}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                        {loading &&
                            <LoadingIndicator />
                        }
                    </FlexCard>
                )}
            </Formik>
        </SafeAreaView>
    )
}

function CheckInput(email, pass, pass2, name) {
    if (validateEmail(email) === false) {
        CheckInputFailed('Invalid email', 'Check your email and try again!')
        return false
    }
    if (checkPassword(pass) === false) {
        CheckInputFailed('Invalid password', 'Password must contain more than 5 characters!')
        return false
    }
    if (pass !== pass2) {
        CheckInputFailed('Confirm password failed', 'Password and confirm password are not the same!')
        return false
    }
    if (name === '') {
        CheckInputFailed('Please enter display name!', 'We will use it to display your name in app')
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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}