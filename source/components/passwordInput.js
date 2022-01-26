import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function PasswordTextInput({ title, value, placeholder, onChangeValue, onBlur, isError }) {
    const [show, setShow] = React.useState(false)
    const clickEye = () => {
        setShow(!show);
    }
    return (
        <TextInput
            label={title}
            mode='outlined'
            value={value}
            onChangeText={onChangeValue}
            placeholder={placeholder}
            error={isError}
            onBlur={onBlur}
            secureTextEntry={!show}
            right={<TextInput.Icon name={'eye'} onPress={clickEye} />}
            left={<TextInput.Icon name={'lock'} />}
        />
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