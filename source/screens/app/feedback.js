import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export default function FeedbackScreen() {
    return (
        <SafeAreaView>
            <Text>Feedback</Text>
        </SafeAreaView>
    )
}

const history = {
    cau_hoi: {
        _id: '',
        text: 'user input',
        createdDate: new Date(),
    },
    cau_tra_loi: {
        _id: '',
        createdDate: new Date(),
        text: '',
        content: []
        // illID: '',
        // attr: 'trieu_chung'
    }
}