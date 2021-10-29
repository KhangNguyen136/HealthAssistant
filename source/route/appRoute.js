import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from '../firebaseConfig';
import FlashMessage from 'react-native-flash-message';
import MainStack from './mainStack';
import AppDrawer from './drawer';

export default function AppRoute() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        const auth = firebaseApp.auth()
        auth.onAuthStateChanged((user) => {
            if (user != null) {
                setLoginState(true)
            }
            else {
                setLoginState(false)
            }
        })
    }, [])
    const setLoginState = (stt) => {
        setIsLoggedIn(stt)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <SplashScreen />
        )
    }
    return (
        <NavigationContainer>
            {
                isLoggedIn == true ?
                    (
                        // <AppDrawer />
                        <MainStack />
                    ) :
                    (<AuthStack />)
            }
            <FlashMessage position={'top'} />
        </NavigationContainer>
    )

}