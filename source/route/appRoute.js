import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import AppDrawer from './drawerRoutes';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseApp from '../firebaseConfig';
import { loggedIn, loggedOut } from '../redux/authStateSlice';

export default function AppRoute() {
    // const [loading, setLoading] = React.useState(true)
    const authState = useSelector(state => state.authState)
    const dispatch = useDispatch()
    React.useEffect(() => {
        console.log(authState)
        // firebaseApp.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         const uid = user.uid
        //         // User is signed in.
        //         console.log('Logged in')
        //         dispatch(loggedIn())
        //         // initDatabase(uid, success)
        //     } else {
        //         // No user is signed in.
        //         console.log('Not logged in')
        //         dispatch(loggedOut())
        //     }
        // });
    }, [authState])

    // return (
    //     <NavigationContainer>
    //         <AppDrawer />
    //     </NavigationContainer>
    // )
    // if (authState.loading) {
    //     return <SplashScreen />
    // }
    return (
        <NavigationContainer>
            {
                authState.isLoggedIn == true ?
                    (
                        <AppDrawer />
                    ) :
                    (<AuthStack />)
            }
        </NavigationContainer>
    )

}