import React from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from '../firebaseConfig';
import FlashMessage from 'react-native-flash-message';
import MainStack from './mainStack';
import { getStatusBarHeight } from 'react-native-status-bar-height'
// import { useDispatch } from 'react-redux';
// import { setUserInfo } from '../redux/userInfoSlice';
export default function AppRoute() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true);
    // const dispatch = useDispatch();
    React.useEffect(() => {
        const auth = firebaseApp.auth()
        auth.onAuthStateChanged((user) => {
            if (user != null) {
                // console.log(user);
                // dispatch(setUserInfo({ email: user.email, uid: user.uid }));
                setLoginState(true)
            }
            else {
                setLoginState(false)
            }
            setIsLoading(false);
        })
    }, [])
    const setLoginState = (stt) => {
        setIsLoggedIn(stt)
    }
    // return (
    //     <SplashScreen />
    // )
    if (isLoading) {
        return (
            <SplashScreen />
        )
    }
    return (
        <NavigationContainer>
            <StatusBar translucent={true}
                barStyle={"dark-content"} />
            {
                isLoggedIn == true ?
                    (
                        // <AppDrawer />
                        <MainStack />
                    ) :
                    (<AuthStack />)
            }
            <FlashMessage position={'top'} statusBarHeight={getStatusBarHeight(false)} />
        </NavigationContainer>
    )

}