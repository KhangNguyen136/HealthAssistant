import React from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import { GetIcon } from './button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyDateTimePicker({ title, date, setDate }) {
    const isIOS = Platform.OS === 'ios';

    const AndroidDateTimePicker = () => {
        const [show, setShow] = React.useState(false)
        const onChangeAndroid = (event, selectedDate) => {
            setShow(false)
            const currentDate = selectedDate || date;
            setDate(currentDate)
        }
        return (
            <View>
                <Button title={date.toLocaleDateString()} onPress={() => setShow(true)} />
                {show &&
                    <DateTimePicker
                        testID="dateTimePickerAndroid"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeAndroid}
                    />
                }
            </View>
        )
    }
    const onChangeIOS = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
    }


    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <GetIcon iconName={'birthday-cake'} source={'FontAwesome'} />
                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '500' }} >{title}</Text>
            </View>
            {
                isIOS ?
                    <DateTimePicker
                        testID="dateTimePickerIOS"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeIOS}
                        style={{ width: 130 }}
                    /> :
                    <AndroidDateTimePicker />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center', justifyContent:
            'space-between', marginVertical: 10, marginHorizontal: 5, borderWidth: 1, borderColor: '#797979',
        padding: 10, borderRadius: 5, backgroundColor: '#F6F6F6'
    }
})

