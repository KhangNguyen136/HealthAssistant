import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import ListHistory from '../../components/list/listHistory';
import Card from '../../components/card';
import SearchBox from '../../components/searchBar';
import Filter from '../../components/filter';
import { globalStyles } from '../../styles/globalStyles';
import LoadingIndicator from '../../components/loadingIndicator';

export default function BookingHistory() {
    const [searchKey, setSearchKey] = React.useState('')
    const [type, setType] = React.useState('Loại tra cứu')

    return (
        <SafeAreaView style={globalStyles.container}>
            <Card>
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Tìm kiếm theo nội dung'} />
                <View style={{ marginHorizontal: 5 }} >
                    <Filter data={types} value={type} title={'Loại tra cứu'} didSelect={setType} />
                </View>
            </Card>
            <ListHistory filter={{
                search: searchKey, type: type
            }} />
            <LoadingIndicator text='Comming soon' />
        </SafeAreaView>
    )
}

const types = ['Thông tin bệnh'
    , 'Nguyên nhân bệnh'
    , 'Triệu chứng'
    , 'Cách điều trị'
    , 'Chuẩn đoán bệnh'
    , 'Tra cứu khác']