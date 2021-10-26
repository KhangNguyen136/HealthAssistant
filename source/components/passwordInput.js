import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { GetIcon, IconButton } from './button';

export default function PasswordTextInput({ title, value, placeholder, onChangeValue, onBlur }) {
    const [show, setShow] = React.useState(false)
    var showIcon = show ? 'eye' : 'eye-with-line'
    var source = 'MaterialIcons'
    var iconName = 'confirmation-num'
    if (title == 'Password' || title == 'New password') {
        source = 'AntDesign'
        iconName = 'key'
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
                    secureTextEntry={!show}
                />
                <IconButton iconName={showIcon} source={'Entypo'} onPress={() => setShow(!show)} size={16} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 3
    },
    content: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 3, alignItems: 'center',
        margin: 2,
        backgroundColor: '#dfe6e9'
    },
    titleContainer: {
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },
    title: { fontSize: 17, fontWeight: '600', marginLeft: 4 }

})