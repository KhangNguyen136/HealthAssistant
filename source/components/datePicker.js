import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { GetIcon } from './button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyDateTimePicker({ title, mode }) {
    const [date, setDate] = React.useState(new Date())
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
                        mode={mode}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <GetIcon iconName={'birthday-cake'} source={'FontAwesome'} />
                <Text style={{ marginLeft: 10, fontSize: 15 }} >{title}</Text>
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

