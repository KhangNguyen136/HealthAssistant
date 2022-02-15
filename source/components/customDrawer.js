// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image, TouchableOpacity,
    Text,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { AuthButton, GetIcon } from './button';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { resetUserInfo } from '../redux/userInfoSlice';

const CustomSidebarMenu = (props) => {
    const dispatch = useDispatch();
    const logOut = () => {
        firebaseApp.auth().signOut().then(() => {
            dispatch(resetUserInfo())
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
    const rate = () => {
        showMessage({
            type: 'info',
            message: 'Chức năng sắp ra mắt'
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

                <TouchableOpacity style={styles.customItem} onPress={rate}>
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