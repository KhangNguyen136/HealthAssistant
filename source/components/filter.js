import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import { GetIcon, IconButton } from './button';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import IsSelectedView from './selectedView';

const placeholderCongif = {
    color: 'gray',
    iconName: 'down',
    source: 'AntDesign'
}

const itemConfig = {
    color: 'black'
}

export default function Filter({ data, value, searchable, title, didSelect }) {
    const [visible, setVisible] = React.useState(false)
    const [key, setKey] = React.useState('')
    const [items, setItems] = React.useState(data)
    const textColor = value == title ? 'gray' : 'black'

    const didSelectItem = (newValue) => {
        hideMenu()
        if (newValue != value) {
            didSelect(newValue)
            // setType(newValue.typeID)
        }
    };

    const hideMenu = () => {
        setVisible(false)
    };
    const showMenu = () => {
        setVisible(true)
    };
    const searchUpdate = (text) => {
        setKey(text)
        setItems(data.filter((item) => item.toLowerCase().includes(text.toLowerCase())))
    }
    const Item = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <MenuItem style={{ padding: 0, margin: 0, fontSize: 15 }} onPress={() => didSelectItem(item)} >{item}</MenuItem>
                    <IsSelectedView isChoosen={item == value} />
                </View>
                <MenuDivider color={'black'} />
            </View>
        )
    }
    const PickerBtn = ({ onPress, value }) => {
        return (
            <TouchableOpacity style={styles.typeContainer} onPress={onPress} >
                <Text style={{ ...styles.typeContent, color: textColor }} >{value}</Text>
                {
                    value == title ?

                        <GetIcon iconName={'down'} source={'AntDesign'} size={18} color={'gray'} />
                        :
                        <IconButton iconName={'closecircleo'} source={'AntDesign'} size={18} onPress={() => didSelectItem(title)} />
                }
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container} >
            <Menu
                visible={visible}
                style={{ maxHeight: 300 }}
                onRequestClose={hideMenu}
                anchor={<PickerBtn onPress={showMenu} value={value} />}
            >
                <View>
                    {searchable &&
                        <TextInput style={{ fontSize: 14, padding: 5 }} placeholder={'Search'} value={key} onChangeText={searchUpdate} />
                    }
                    <View style={{
                        borderWidth: 1, borderColor: 'gray'
                    }} >
                        <MenuDivider color={'black'} />
                        <FlatList data={items} style={{}}
                            renderItem={Item}
                            keyExtractor={item => item.toString()} />
                    </View>
                </View>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 3,
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    title: { fontWeight: '500', marginLeft: 4 },
    typeContainer: {
        padding: 3,
        flexDirection: 'row',
        borderWidth: 0.25,
        borderColor: 'gray',
        alignItems: 'center',
        borderRadius: 6,
    },
    typeContent: {
        // fontWeight: '600',
        marginHorizontal: 5,
    }

})
