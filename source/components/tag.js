import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Tag = ({ item }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.content} >{item}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        borderRadius: 4,
        backgroundColor: '#81ecec',
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginHorizontal: 2,
        marginVertical: 2,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    content: {
        fontWeight: '600',
        color: '#0984e3'
    }
})

export default Tag;