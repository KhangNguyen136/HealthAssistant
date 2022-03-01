import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthButton, GetIcon, MyButton } from '../../components/button';
import { FlexCard } from '../../components/card';
// import CountryPicker from '../../components/countryPicker';
import MyDatePicker from '../../components/datePicker';
import { TextInput } from 'react-native-paper';
import { globalStyles } from '../../styles/globalStyles';
import { showMessage } from 'react-native-flash-message';
import LoadingIndicator from '../../components/loadingIndicator';
import { updateInfo } from '../../servies/userInfoServices';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/userInfoSlice'
export default function UserInfo({ navigation }) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    console.log(userInfo);
    const [loading, setLoading] = React.useState(false);
    const [displayName, setDisplayName] = React.useState(userInfo.displayName);
    const [fullName, setFullName] = React.useState(userInfo.fullName);
    const [phoneNumber, setPhoneNumber] = React.useState(userInfo.phoneNumber);
    const [birthday, setBirthday] = React.useState(new Date(userInfo.birthday))
    React.useEffect(() => {
    }, [])
    const submit = async () => {
        if (displayName == "") {
            showMessage({
                type: 'warning', message: 'Vui lòng nhập tên hiển thị'
            })
            return
        }
        setLoading(true);
        const res = await updateInfo(userInfo.userId, displayName, fullName, birthday.valueOf(), phoneNumber);
        console.log(res);
        if (res == null)
            showMessage({ type: 'danger', message: 'Có sự cố đã xảy ra', description: 'Vui lòng kiểm tra kết nối mạng và thử lại' })
        else {
            showMessage({ type: 'success', message: 'Cập nhật thông tin thành công' })
            dispatch(setUserInfo(res));
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={globalStyles.container} >
            <FlexCard>
                <ScrollView style={{ flex: 1 }}>
                    <TextInput label={'Tên hiển thị'} mode={'outlined'} style={styles.input}
                        value={displayName} onChangeText={setDisplayName}
                        left={<TextInput.Icon name={'account'} />} />
                    <TextInput label={'Tên đầy đủ'} mode={'outlined'} style={styles.input}
                        value={fullName} onChangeText={setFullName}
                        left={<TextInput.Icon name={'account-details'} />} />

                    <TextInput label={'Email'} mode={'outlined'} style={styles.input}
                        value={userInfo.email} disabled
                        left={<TextInput.Icon name={'email'} />} />

                    <TextInput label={'Số điện thoại'} mode={'outlined'} style={styles.input}
                        value={phoneNumber} onChangeText={setPhoneNumber}
                        keyboardType={'phone-pad'}
                        left={<TextInput.Icon name={'cellphone'} />} />
                    <MyDatePicker title={'Ngày sinh'} date={birthday} setDate={setBirthday} />

                    <AuthButton title={'Cập nhật'} onPress={submit} />

                </ScrollView>
            </FlexCard>

            {loading &&
                <LoadingIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 5
    }
})