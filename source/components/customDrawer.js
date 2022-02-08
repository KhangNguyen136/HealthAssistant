// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image, TouchableOpacity,
    Text,
    Linking,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { AuthButton, GetIcon } from './button';
import { showMessage } from 'react-native-flash-message';

const CustomSidebarMenu = (props) => {

    const logOut = () => {
        firebaseApp.auth().signOut().then(() => {
            console.log("Logged out successfully")
            showMessage({
                message: "Đăng xuất thành công",
                type: 'success'
            })

        }).catch((error) => {
            console.log('Log out failed', error.message)
            showMessage({
                message: 'Đăng xuất thất bại',
                description: error.message,
                type: 'danger'
            })
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/*Top Large Image */}
            <Image
                source={require('../../assets/logo.png')}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {/* <OtherButton title={'History'} /> */}
                <DrawerItem
                    label="Về chúng tôi"
                    onPress={() => Linking.openURL('https://trolysuckhoe.herokuapp.com/')}
                />
                <TouchableOpacity style={styles.customItem}>
                    <Text style={{ marginRight: 3 }}>
                        Đánh giá
                    </Text>
                    <GetIcon iconName={'star'} source={'AntDesign'} size={18} color={'#f1c40f'} />
                </TouchableOpacity>
                <AuthButton title={'Đăng xuất'} onPress={logOut} />
            </DrawerContentScrollView>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'grey'
                }}>
                Trợ lý sức khỏe
            </Text>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        // resizeMode: 'center',
        width: 120,
        height: 120,
        borderRadius: 10,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;