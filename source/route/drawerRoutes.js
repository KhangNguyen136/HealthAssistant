import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatboxScreen from '../screens/app/chatBox';
import GuideScreen from '../screens/app/guide';
import AccountInfoScreen from '../screens/app/accountInfo';
import FeedbackScreen from '../screens/app/feedback';
const Drawer = createDrawerNavigator();

function AppDrawer({ navigation }) {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center'
        }}>
            <Drawer.Screen name="Chatbox" component={ChatboxScreen} />
            <Drawer.Screen name="Guide" component={GuideScreen} />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} />
            <Drawer.Screen name="AccountInfo" component={AccountInfoScreen} options={{ title: 'User information' }} />
        </Drawer.Navigator>
    );
}

export default AppDrawer;