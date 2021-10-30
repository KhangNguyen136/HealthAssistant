import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ListBooking from '../../components/list/listBooking';
import Card from '../../components/card';
import SearchBox from '../../components/searchBar';

export default function BookingHistory() {
    const [searchKey, setSearchKey] = React.useState('')
    return (
        <SafeAreaView>
            <Card>
                <SearchBox value={searchKey} textChange={setSearchKey} placeholder={'Tìm kiếm theo nội dung'} />
            </Card>
            <ListBooking />
        </SafeAreaView>
    )
}