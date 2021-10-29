import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Button title={'Chatbox'} onPress={() => navigation.navigate('Chatbox')} />

        </SafeAreaView>
    )
}