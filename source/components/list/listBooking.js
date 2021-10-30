import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { GetIcon, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import { outputDate } from '../../styles/outputDate';
import Card from '../card';
import Tag from '../tag';
export default function ListBooking({ data, search }) {
    const navigation = useNavigation()
    const Booking = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{item.name}</Text>
                            <Tag item={item.date.toString().substr(0, 16)} />
                            <Tag item={item.date.toString().substr(16, 8)} />
                        </View>
                    </View>

                </Card >
            </View >
        )
    }
    return (
        <FlatList
            data={dataTest}
            renderItem={Booking}
            keyExtractor={item => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50,
        borderRadius: 10,
        margin: 5
    },
    rowItem:
    {
        flexDirection: 'row', alignItems: 'center',
        margin: 3
    }

})

const dataTest = [
    {
        id: 0,
        name: 'John',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 1,
        name: 'Anna',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 2,
        name: 'Kelvin',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 3,
        name: 'Jack',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 4,
        name: 'Jenny',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 5,
        name: 'Paul',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 6,
        name: 'Julia',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 7,
        name: 'Ino',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 8,
        name: 'Roy',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
    {
        id: 9,
        name: 'Yang',
        date: new Date(),
        startTime: "20:20",
        endTime: "22:22"
    },
]