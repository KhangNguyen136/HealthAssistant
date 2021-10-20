import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { GetIcon, IconButton } from './button';

export default function PasswordTextInput({ value, placeholder, onChangeValue, onBlur }) {
    const [show, setShow] = React.useState(false)
    var showIcon = show ? 'eye' : 'eye-with-line'
    var source = 'MaterialIcons'
    var iconName = 'confirmation-num'
    if (placeholder == 'Password' || placeholder == 'New password') {
        source = 'AntDesign'
        iconName = 'key'
    }
    return (
        <View style={styles.container} >
            <GetIcon iconName={iconName} size={26} source={source} />
            <View style={styles.contentArea}>
                <TextInput style={styles.content}
                    value={value}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    secureTextEntry={!show}
                />
            </View>
            <IconButton iconName={showIcon} source={'Entypo'} onPress={() => setShow(!show)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    content: {
        fontSize: 16,
    },
    contentArea: {
        marginHorizontal: 5,
        padding: 5,
        flex: 1,

    }
})