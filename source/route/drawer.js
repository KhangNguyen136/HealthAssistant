import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatboxScreen from '../screens/app/chatBox';
import GuideScreen from '../screens/app/guide';
import FeedbackScreen from '../screens/app/feedback';
import OtherScreen from '../screens/app/other';
import AccountInfoScreen from '../screens/app/accountInfo';
import CustomSidebarMenu from '../components/customDrawer';
import HistoryScreen from '../screens/app/history';
const Drawer = createDrawerNavigator();

function AppDrawer({ navigation }) {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
            headerTitleAlign: 'center', drawerItemStyle: { marginVertical: 5 }
        }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen name="Chatbox" component={ChatboxScreen} options={{ title: 'Chat' }} />
            <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Lịch sử' }} />
            <Drawer.Screen name="Guide" component={GuideScreen} options={{ title: 'Hướng dẫn' }} />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Phản hồi' }} />
            {/* <Drawer.Screen name="Other" component={OtherScreen} options={{ title: 'Khác' }} /> */}
            <Drawer.Screen name="AccountInfo" component={AccountInfoScreen} options={{ title: 'Thông tin tài khoản' }} />
        </Drawer.Navigator>
    );
}

export default AppDrawer;