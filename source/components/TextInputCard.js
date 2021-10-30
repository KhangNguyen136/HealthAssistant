import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { GetIcon } from './button';

export default function TextInputCard({ value, title, placeholder, onChangeValue, onBlur, keyboardType = 'default', isEdit = true }) {
    var iconName
    var source
    switch (title) {
        case 'Phone number':
        case 'Số điện thoại':
            iconName = 'phone'
            source = 'FontAwesome'
            break;
        case 'Email':
        case 'Email address:':
        case 'Email or phone number':
            iconName = 'email'
            source = 'Entypo'
            break;

        case 'Name':
        case 'Tên hiển thị':
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
        margin: 3,

    },
    titleContainer: {
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },
    content: {
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#dfe6e9',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,

    },
    contentContainer: {
        // flex: 1,
        margin: 2,
    },
    title: { fontSize: 17, fontWeight: '600', marginLeft: 4 }
})