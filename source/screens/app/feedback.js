import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import LoadingIndicator from '../../components/loadingIndicator';
import { globalStyles } from '../../styles/globalStyles';

export default function FeedbackScreen() {
    return (
        <SafeAreaView style={globalStyles.container}>
            <LoadingIndicator text='Comming soon' />
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