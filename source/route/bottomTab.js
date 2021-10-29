import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { GetIcon } from '../components/button';
// import ChatboxScreen from '../screens/app/chatBox';
import HomeScreen from '../screens/app/home';
import HistoryScreen from '../screens/app/history';
import GuideScreen from '../screens/app/guide';
// import AccountInfoScreen from '../screens/app/accountInfo';
import OtherScreen from '../screens/app/other';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Chatbox" screenOptions={
            ({ route }) => ({
                headerTitleAlign: 'center',

                tabBarIcon: ({ focused, color, size }) => {
                    return (<TabBarIcon focused={focused} routeName={route.name} color={color} size={size} />)
                },
            })

        }>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                // title: 'Chatbox',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} >
                        <Image style={{ width: 35, height: 35, borderRadius: 5, marginRight: 10 }}
                            source={require('../../assets/botAvt.jpg')}
                        />
                    </TouchableOpacity>
                ),
            }} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Guide" component={GuideScreen} />
            <Tab.Screen name="Other" component={OtherScreen} />

        </Tab.Navigator >
    );
}

function TabBarIcon({ focused, routeName, color, size }) {
    let iconName;
    let iconSource;
    switch (routeName) {
        case 'Home':
            // iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            iconName = focused ? 'home' : 'home-outline';
            iconSource = 'Ionicons'
            break;
        case 'History':
            iconName = 'history';
            iconSource = 'MaterialIcons'
            break;
        case 'Guide':
            iconName = focused ? 'information-circle' : 'information-circle-outline';
            iconSource = 'Ionicons'
            break;
        case 'UserInfo':
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            iconSource = 'MaterialCommunityIcons'
            break;
        default:
            if (focused) {
                iconName = 'settings'
                iconSource = 'Ionicons'
            }
            else {
                iconName = 'setting'
                iconSource = 'AntDesign'
            }
    }
    return (
        <GetIcon iconName={iconName} size={size} color={color} source={iconSource} />
    )
}

export default BottomTab;