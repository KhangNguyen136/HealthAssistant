import React from 'react';
import store from './appStore';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper'
import AppRoute from './route/appRoute';

export default function App() {
    return (
        <Provider store={store}>
            {/* <PaperProvider> */}
            <AppRoute />
            {/* </PaperProvider> */}
        </Provider>
    )
}