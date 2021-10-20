import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { GetIcon } from './button';

export default function TextInputCard({ value, title, placeholder, onChangeValue, onBlur, keyboardType = 'default', isEdit = true }) {
    var iconName
    var source
    switch (title) {
        case 'Phone number: ':
            iconName = 'phone'
            source = 'SimpleLineIcons'
            break;
        case 'Email or phone number: ':
        case 'Email address: ':
            iconName = 'email'
            source = 'Entypo'
            break;

        case 'Name: ':
            iconName = 'user'
            source = 'AntDesign'
    }
    return (
        <View style={styles.container} >
            <View style={styles.titleContainer} >
                <GetIcon iconName={iconName} size={20} source={source} />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
                <TextInput style={styles.content}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    editable={isEdit}
                    multiline={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    titleContainer: {
        flexDirection: 'row',
        margin: 3,
        alignItems: 'center',
    },
    content: {
        fontSize: 15,
        padding: 5,
    },
    contentContainer: {
        // flex: 1,
        borderWidth: 0.25,
        borderColor: 'black',
        margin: 1,
        borderRadius: 8,
        padding: 2,
    },
    title: { fontSize: 15, fontWeight: '500', marginLeft: 4 }
})