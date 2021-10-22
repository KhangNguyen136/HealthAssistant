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
                <IconButton iconName={showIcon} source={'Entypo'} onPress={() => setShow(!show)} size={20} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 5,
        // marginVertical: 5,
        borderBottomWidth: 0.25,
        borderColor: 'black'
    },
    content: {
        fontSize: 16,
        paddingHorizontal: 10,
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: 'black',
        borderRadius: 4, alignItems: 'center',
        padding: 2,
    },
    titleContainer: {
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },
    title: { fontSize: 17, fontWeight: '600', marginLeft: 4 }

})