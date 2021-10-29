import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Touchable } from 'react-native';
import { GetIcon } from './button';

export default function OtherButton({ title, iconName, iconSource, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} >
            <GetIcon iconName={iconName} source={iconSource} />
            <Text style={styles.title} >{title}</Text>
            <GetIcon iconName={'right'} source={'AntDesign'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '96%',
        paddingHorizontal: 5,
        paddingVertical: 8,
        paddingLeft: 10,
        margin: 3,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#333',
        shadowOpacity: 0.1,
        shadowOffset: { width: 1, height: 1 },
    },
    title: {
        flex: 1,
        fontWeight: '500',
        fontSize: 18,
        marginLeft: 10
    }
})