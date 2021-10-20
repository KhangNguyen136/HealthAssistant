import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import AppDrawer from './drawerRoutes';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from '../firebaseConfig';
import FlashMessage from 'react-native-flash-message';

export default function AppRoute() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        const auth = firebaseApp.auth()
        auth.onAuthStateChanged((user) => {
            if (user != null) {
                setIsLoggedIn(true)
                setIsLoading(false)
            }
            else {
                setIsLoggedIn(false)
                setIsLoading(false)
            }
        })
    }, [])

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
                        <AppDrawer />
                    ) :
                    (<AuthStack />)
            }
            <FlashMessage position={'top'} />
        </NavigationContainer>
    )

}