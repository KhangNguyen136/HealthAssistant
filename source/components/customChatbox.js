import React from 'react';
import { View } from 'react-native';
import { GetIcon, IconButton } from './button';
import FlexText from './expandText';

export const renderMessageText = (props) => {

    return (
        <FlexText currentMessage={props.currentMessage} />
    )
}