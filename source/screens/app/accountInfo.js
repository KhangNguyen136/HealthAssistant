import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Card from '../../components/card';
import { showMessage } from 'react-native-flash-message';
import firebaseApp from '../../firebaseConfig';

export default function AccountInfoScreen() {
    const logOut = () => {
        firebaseApp.auth().signOut().then(() => {
            console.log("Logged out successfully")
            showMessage({
                message: "Logged out sucessfully",
                type: 'success'
            })

        }).catch((error) => {
            console.log('Log out failed', error.message)
            showMessage({
                message: 'Action failed',
                description: error.message,
                type: 'danger'
            })
        })
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <Text>Account infor screen</Text>
                <Button title={'Log out'} onPress={logOut} />
            </Card>
        </SafeAreaView>
    )
}