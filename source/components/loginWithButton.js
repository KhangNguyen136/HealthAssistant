import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GetIcon } from './button';

export default function LoginWithBtn({ type, onPress }) {
    var content = {
        iconName: 'facebook', source: 'Entypo', title: 'Sign in with facebook', backgroundColor: '#4267B2'
    }
    switch (type) {
        case 'apple':
            content = {
                iconName: 'apple1', source: 'AntDesign', title: 'Sign in with apple', backgroundColor: '#4267B2'
            }
            break;
        case 'google':
            content = {
                iconName: 'google', source: 'AntDesign', title: 'Sign in with google', backgroundColor: '#e17055'
            }
            break;
        case 'phone':
            content = {
                iconName: 'phone', source: 'Entypo', title: 'Sign in with phone number', backgroundColor: '#38B45E'
            }
            break;
        default:
            break;
    }
    return (
        <TouchableOpacity onPress={onPress}
            style={{
                flexDirection: 'row', alignItems: 'center', backgroundColor: content.backgroundColor,
                alignSelf: 'center', width: '69%', justifyContent: 'center', padding: 5, borderRadius: 8, margin: 5
            }} >
            <GetIcon iconName={content.iconName} source={content.source} size={17} color={'white'} />
            <Text style={{
                fontSize: 16, fontWeight: '500', marginLeft: 4,
                color: 'white'
            }} >{content.title}</Text>
        </TouchableOpacity>
    )
}