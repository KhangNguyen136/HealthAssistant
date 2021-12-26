import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import LoadingIndicator from '../../components/loadingIndicator';
import axios from 'axios';

export default function GuideScreen() {
    React.useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={globalStyles.container} >
            <LoadingIndicator text='Comming soon' />
        </SafeAreaView>
    )
}