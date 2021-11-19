import React from 'react';
import { View } from 'react-native';
import { GetIcon } from './button';

export default function IsSelectedView({ isChoosen, paddingRight = 0, iconSize = 20 }) {
    if (isChoosen)
        return (
            <View  >
                <GetIcon iconName={'checkcircle'} source={'AntDesign'} color={'blue'} size={iconSize} />
            </View>
        )
    return (
        <View style={{ width: paddingRight }} />
    )
}
