import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function LoadingIndicator({ text = '' }) {
    return (
        <View style={globalStyles.loading}>
            <ActivityIndicator color={'black'} size='large' />
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{text}</Text>
        </View>
    )
}