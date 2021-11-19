import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { GetIcon, MyButton } from '../button';
import { useNavigation } from '@react-navigation/core';
import { outputDate } from '../../styles/outputDate';
import Card from '../card';
import Tag from '../tag';

const defaultFilter = {
    search: '',
    type: 'Loại tra cứu',
    // time: 
}

export default function ListHistory({ data, filter = defaultFilter }) {
    const navigation = useNavigation()
    const [items, setItems] = React.useState([])
    var tempItems
    React.useEffect(() => {
        tempItems = []
        // for (let id in dataTest) {
        //     insertIntoTemp(dataTest[id])
        // }
    }, [])

    const checkDate = (date) => {
        if (date.getMonth() == filterTime.getMonth() && date.getFullYear() == filterTime.getFullYear())
            return true
        return false
    }

    const insertIntoTemp = (item) => {
        // const date = new Date(item.date)
        const itemDateString = date.toString().substring(0, 15)
        for (let i = 0; i < tempData.length; i++) {
            const tempDateString = tempData[i].date.toString().substring(0, 15)
            if (tempDateString == itemDateString) {
                tempData[i].items.push(item)
                tempData[i].total += infor.totalAmount
                return
            }
            else if (tempData[i].date > date) {
                tempData.splice(i, 0, {
                    date: date, total: infor.totalAmount, items: [item]
                })
                return
            }
        }
        tempData.push({
            date: date, total: infor.totalAmount,
            items: [item]
        })

    }
    const toDetail = (item) => {
        navigation.navigate('HistoryDetail', { title: item.title, date: item.date.toString().substr(0, 16) })
    }

    const Item = ({ item }) => {
        return (
            <View style={{ marginHorizontal: 2 }}  >
                <Card>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => toDetail(item)} >
                        <View style={{ flex: 1, margin: 5 }} >
                            <Text style={{ fontSize: 15, fontWeight: '500', marginBottom: 5 }} >{item.title}</Text>
                            <Tag item={item.date.toString().substr(0, 16)} />
                        </View>
                        <GetIcon iconName={'right'} source={'AntDesign'} size={24} />
                    </TouchableOpacity>

                </Card >
            </View >
        )
    }
    return (
        <FlatList
            data={dataTest}
            renderItem={Item}
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
        title: 'Nguyên nhân covid',
        // type: 0,
        date: new Date(),
    }, {
        id: 1,
        title: 'Cách điều trị viêm xoang',
        // type: 0,
        date: new Date(),
    }, {
        id: 2,
        title: 'Triệu chứng của ung thư phổi',
        // type: 0,
        date: new Date(),
    }, {
        id: 3,
        title: 'Cách phòng tránh tiểu đường',
        // type: 0,
        date: new Date(),
    }, {
        id: 4,
        title: 'Chuẩn đoán bệnh',
        // type: 0,
        date: new Date(),
    }, {
        id: 5,
        title: 'Lưu ý khi mắc bệnh loãng xương',
        // type: 0,
        date: new Date(),
    }, {
        id: 6,
        title: 'Cách điều trị đau họng',
        // type: 0,
        date: new Date(),
    }, {
        id: 7,
        title: 'Nguyên nhân của đau cột sống',
        // type: 0,
        date: new Date(),
    }, {
        id: 8,
        title: 'Triệu chứng của đau dạ dày',
        // type: 0,
        date: new Date(),
    }, {
        id: 9,
        title: 'Thông tin bệnh covid',
        // type: 0,
        date: new Date(),
    },
]