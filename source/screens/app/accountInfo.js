import React from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GetIcon, MyButton } from '../../components/button';
import Card, { FlexCard } from '../../components/card';
// import CountryPicker from '../../components/countryPicker';
import MyDatePicker from '../../components/datePicker';
import TextInputCard from '../../components/TextInputCard';
import { globalStyles } from '../../styles/globalStyles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import LoadingIndicator from '../../components/loadingIndicator';

var options = {
    title: 'Select Image',
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    // mediaType: 'photo'
};

export default function UserInfo({ navigation }) {
    // const [country, setCountry] = React.useState('Vietnam')
    const [img, setImg] = React.useState(require('../../../assets/botAvt.jpg'))
    React.useEffect(() => {
        console.log(img)
    }, [])
    const editAvt = () => {
        launchImageLibrary(options, Response => {
            if (Response.didCancel) {
                return
            }
            else if (Response.errorCode) {
                showMessage({
                    message: 'Action failed', description: Response.errorMessage, type: 'danger'
                })
            }
            else {
                console.log(Response.assets)
                setImg({ uri: Response.assets[0].uri })
            }

        })
    }
    return (
        <SafeAreaView style={globalStyles.container} >
            {/* <ScrollView>
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 2 }} onPress={editAvt} >
                            <Image style={globalStyles.avt} source={img} />
                            <View style={{ flexDirection: 'row', marginTop: 4 }} >
                                <Text style={{ fontWeight: '500', color: '#3399ff' }} >Edit</Text>
                                <GetIcon iconName={'edit'} source={'AntDesign'} size={16} color={'#3399ff'} />

                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} >
                            <Text style={globalStyles.titleName} >Khang Nguyen</Text>
                            <Text>Account id: asdd123dsd3434</Text>
                            <Text>Account type: student</Text>


                        </View>
                    </View>
                </Card>
                <Card>
                    <TextInputCard title={'Name'} placeholder={'Enter your name'} />
                    
                    <TextInputCard title={'Phone number'} keyboardType={'phone-pad'} placeholder={'Enter your phone number'} />
                    
                    <TextInputCard title={'Email'} placeholder={'Enter your email'} />
                </Card>
                
                <Card>
                    <MyDatePicker title={'Birthday'} />
                </Card>
                <MyButton moreStyle={{ ...globalStyles.authBtnContainer, width: '69%' }} title={'Save'} moreTitleStyle={{ color: 'white' }} />
            </ScrollView> */}
            <LoadingIndicator text='Comming soon' />
        </SafeAreaView>
    )
}