import React from 'react';
import BottomTab from './bottomTab';
import HistoryDetail from '../screens/app/historyDetail';
import FeedBack from '../screens/app/feedback';
import ChatboxScreen from '../screens/app/chatBox';
import ChangePassword from '../screens/Auth/changePassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountInfoScreen from '../screens/app/accountInfo';
import AppDrawer from './drawer';

const Stack = createNativeStackNavigator();

function MainStack({ navigation }) {
    return (
        // <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Drawer" component={AppDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="Chatbox" component={ChatboxScreen} />
            {/* <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} /> */}
            <Stack.Screen name="UserInfo" component={AccountInfoScreen} options={{ title: 'User Information' }} />
            <Stack.Screen name="Feedback" component={FeedBack} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetail} options={{ title: 'History detail' }} />
        </Stack.Navigator>

        // </NavigationContainer>
    )
}

export default MainStack;