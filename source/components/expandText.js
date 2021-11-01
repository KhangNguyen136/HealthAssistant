import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';
import { GetIcon } from './button';

export default function FlexText({ currentMessage }) {
    const textColor = currentMessage.user._id == 1 ? 'white' : 'black'

    const renderViewMore = (onPress) => {
        return (
            <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }} >
                <Text style={{ color: textColor, fontWeight: '600' }} >Xem thêm</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={14} color={textColor} />
            </TouchableOpacity >
        )
    }
    const renderViewLess = (onPress) => {
        return (
            <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }} >
                <Text style={{ color: textColor, fontWeight: '600' }} >Thu gọn</Text>
                <GetIcon iconName={'up'} source={'AntDesign'} size={14} color={textColor} />
            </TouchableOpacity >)
    }

    return (
        <View style={{ padding: 5, paddingHorizontal: 7, flexDirection: 'row', alignItems: 'center' }} >
            <ViewMoreText numberOfLines={10}
                renderViewLess={renderViewLess}
                renderViewMore={renderViewMore}
                textStyle={{ color: textColor, fontSize: 16 }}
            >
                <Text>
                    {currentMessage.text}
                </Text>
            </ViewMoreText>
        </View>
    )
}