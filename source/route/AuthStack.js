import React from 'react';
import Login from '../screens/Auth/login';
import SignUp from '../screens/Auth/signUp';
import ForgotPassword from '../screens/Auth/forgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthStack({ navigation }) {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="LogIn" component={Login} options={{ title: 'Đăng nhập' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Đăng ký' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Quên mật khẩu' }} />
        </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default AuthStack;