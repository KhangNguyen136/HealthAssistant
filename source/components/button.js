import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import {
    MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5, FontAwesome,
    AntDesign, Entypo, Fontisto, Feather, Octicons
} from '@expo/vector-icons';

export function IconButton({ iconName, onPress, source, size, color = 'black' }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconButton}>
                <GetIcon iconName={iconName} source={source} size={size} color={color} />
            </View>
        </TouchableOpacity>
    );
}

export function GetIcon({ iconName, source, size = 24, color = 'black' }) {
    switch (source) {
        case 'Fontisto':
            return <Fontisto name={iconName} size={size} color={color} />
        case 'Entypo':
            return <Entypo name={iconName} size={size} color={color} />
        case 'AntDesign':
            return <AntDesign name={iconName} size={size} color={color} />
        case 'FontAwesome5':
            return <FontAwesome5 name={iconName} size={size} color={color} />
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={size} color={color} />
        case 'MaterialCommunityIcons':
            return (<MaterialCommunityIcons name={iconName} size={size} color={color} />)
        case 'MaterialIcons':
            return (<MaterialIcons name={iconName} size={size} color={color} />)
        case 'Feather':
            return (<Feather name={iconName} size={size} color={color} />)
        case 'Octicons':
            return (<Octicons name={iconName} size={size} color={color} />)
        default:
            return (<Ionicons name={iconName} size={size} color={color} />)
    }
}

export function MyIconButton({ onPress, title, width = 200, color = '#0be881', iconName, iconSource, iconSize = 22, iconColor = 'black' }) {
    return (
        <TouchableOpacity style={{ ...styles.MyButtonCotainer, width: width, backgroundColor: color }} onPress={onPress} >
            <GetIcon iconName={iconName} source={iconSource} size={iconSize} color={iconColor} />
            <Text style={styles.MyButtonContent} > {title} </Text>
        </TouchableOpacity>
    )
}

export function MyButton({ onPress, title, width = 200 }) {
    return (
        <TouchableOpacity style={{ ...styles.MyButtonCotainer, width: width }} onPress={onPress} >
            <Text style={styles.MyButtonContent} > {title} </Text>
        </TouchableOpacity>
    )
}

export function AuthButton({ onPress, title }) {
    return (
        <TouchableOpacity style={{ ...styles.authButtonContainer }} onPress={onPress} >
            <Text style={[styles.MyButtonContent, { color: 'white' }]} > {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        iconButton: {
            paddingVertical: 5,
            paddingHorizontal: 5,
            justifyContent: 'center',
        },
        MyButtonCotainer: {
            margin: 5,
            alignSelf: 'center',
            padding: 5,
            justifyContent: 'center',
            backgroundColor: '#0be881',
            borderRadius: 8,
            shadowColor: '#333',
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },

        },
        MyButtonContent: {
            fontSize: 15,
            fontWeight: '600'
        },
        authButtonContainer: {
            margin: 5,
            width: '69%',
            alignSelf: 'center',
            padding: 5,
            alignItems: 'center',
            backgroundColor: '#3399ff',
            borderRadius: 8,
            shadowColor: '#333',
            shadowOpacity: 0.1,
            shadowOffset: { width: 1, height: 1 },
        },

    }
)