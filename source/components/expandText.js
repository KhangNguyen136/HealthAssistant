import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';
import { GetIcon, IconButton } from './button';

export default function FlexText({ currentMessage }) {
    const isUser = currentMessage.user._id == 1
    const textColor = isUser ? 'white' : 'black'

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
        // <View
        // style={{
        //     padding: 5, paddingHorizontal: 7, maxWidth: '80%',
        //     flexDirection: 'row', alignItems: 'center'
        // }} 
        // >
        <View>
            < ViewMoreText numberOfLines={10}
                renderViewLess={renderViewLess}
                renderViewMore={renderViewMore}
                textStyle={{ color: textColor, fontSize: 16, padding: 5, paddingHorizontal: 7 }
                }
            >
                <Text >
                    {currentMessage.text}
                </Text>

            </ViewMoreText >
            {/* <View style={{ margin: 0 }} >
                <IconButton iconName={'text-to-speech'}
                    source={'MaterialCommunityIcons'} size={30} />
            </View> */}
        </View>
    )
}
