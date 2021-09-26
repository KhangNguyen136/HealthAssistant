import React from 'react';
import store from './appStore';
import { Provider } from 'react-redux';
import AppRoute from './route/appRoute';

export default function App() {
    return (
        <Provider store={store}>
            <AppRoute />
        </Provider>
    )
}