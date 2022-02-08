import React from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import LoadingIndicator from '../../components/loadingIndicator';
import { globalStyles } from '../../styles/globalStyles';
export default function AboutUs() {
    const [loading, setLoading] = React.useState(true);

    const loadEnd = () => {
        console.log('Load end');
        setLoading(false);
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            {
                loading &&
                <LoadingIndicator />
            }
            < WebView onLoadEnd={loadEnd} source={{ uri: 'https://trolysuckhoe.herokuapp.com/' }} style={{ flex: 1 }} />
        </SafeAreaView>

    )
}