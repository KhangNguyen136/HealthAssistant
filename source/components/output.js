import React from 'react';
import { View, FlatList, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GetIcon } from './button';
// import { globalStyles } from '../../styles/globalStyles';

export default function ExpandTextView({ currentMessage, maxHeight = 300 }) {
    const isUser = currentMessage.user._id == 1
    const textColor = isUser ? 'white' : 'black';
    const noData = currentMessage.data == undefined
    const showText = isUser || noData
    // const textColor = 'black';
    const [isLongData, setIsLongData] = React.useState(false);
    const [isShowLess, setIsShowLess] = React.useState(true);

    const clickViewMore = () => {
        setIsShowLess(false);
    }

    const clickViewLess = () => {
        setIsShowLess(true);
    }

    const onLayoutView = (event) => {
        console.log(event.nativeEvent.layout.height);
        const contentHeight = event.nativeEvent.layout.height;
        if (contentHeight > maxHeight) {
            setIsLongData(true)
        }
    }

    const RenderViewMore = () => {
        return (
            // <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
            //     <Text style={{ flex: 1, textAlign: 'center' }}>.........</Text>
            <TouchableOpacity onPress={clickViewMore} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }} >
                <Text style={{ color: textColor, fontWeight: '600' }} >Xem thêm</Text>
                <GetIcon iconName={'down'} source={'AntDesign'} size={14} color={textColor} />
            </TouchableOpacity >
            // </View>
        )
    }
    const RenderViewLess = () => {
        return (
            <TouchableOpacity onPress={clickViewLess} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }} >
                <Text style={{ color: textColor, fontWeight: '600' }} >Thu gọn</Text>
                <GetIcon iconName={'up'} source={'AntDesign'} size={14} color={textColor} />
            </TouchableOpacity >)
    }

    const Footer = () => {
        if (isShowLess) {
            return (
                <RenderViewMore />
            )
        }
        return (
            <RenderViewLess />
        )
    }

    const getContent = (data) => {
        var result = []
        for (let i = 0; i < data.length; i++) {
            result.push(getComponent(data[i]))
        }
        return result;
    }

    const getComponent = (item) => {
        // console.log(item)
        switch (item.type) {
            case 'p':
                return getParagraph(item.content)
            case 'li':
                return getList(item.content)
            case 'li1':
                return getList1(item.content)
            case 'image':
                return
            case 'single':
                return (<Text>{item.content}</Text>)
            default:
                return getHeader(item)

        }
    }

    const getHeader = (item) => {
        return (
            <Text style={getTextStyles(item.type)} >{item.content}</Text>
        )
    }

    const getList = (item) => {
        return (
            <Text style={{
                textAlignVertical: 'center', fontSize: 15,
                lineHeight: 20,
                marginLeft: 5, color: textColor
            }}> <Text style={{ fontSize: 15 }} >{'\u2B25'}</Text> {item}</Text>
        )
    }

    const getList1 = (item) => {
        return (
            // <View style={{ marginLeft: 10, marginTop: 5 }} >
            <Text style={{
                textAlignVertical: 'center', fontSize: 15,
                marginLeft: 16, lineHeight: 20
            }}> <Text style={{ fontSize: 14 }} >{'\u2B26'}</Text> {item}</Text>
            // </View>
        )
    }

    const getParagraph = (item) => {

        return (
            <Text style={{ lineHeight: 20, fontSize: 16, marginVertical: 4 }}  >
                {"  " + item}
                {/* {'\n'} */}
            </Text>
        )
    }


    return (
        <View style={{ paddingHorizontal: 8, paddingTop: 8 }} >
            {showText ?
                <Text style={{ color: textColor, fontSize: 16 }} >{currentMessage.text}</Text> :
                <View onLayout={onLayoutView} style={isLongData && isShowLess ? styles.containerShowLess : styles.containerShowFull}  >
                    {getContent(currentMessage.data)}
                </View>
            }
            {
                isLongData &&
                <Footer />
            }
        </View>
    )

}


const getTextStyles = (type) => {
    switch (type) {
        case 'b':
            return styles.bold
        case 'i':
            return styles.italic
        case 'header1':
            return styles.header1
        case 'header2':
            return styles.header2
        default:
            return styles.normal
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold', fontSize: 15
    },
    italic: {
        fontStyle: 'italic'
    },
    header1: {
        fontSize: 17, fontWeight: '600', margin: 3
    },
    header2: {
        fontSize: 16, fontWeight: '500', margin: 3, marginVertical: 5
    },
    normal: {
        fontSize: 15, margin: 5
    },
    containerShowFull: {
        marginBottom: 5,
    },
    containerShowLess: {
        maxHeight: 300, overflow: 'hidden',
        marginBottom: 8
    }
})


const longData =
    [
        {
            type: 'header1',
            content: 'Triệu chứng bướu giáp đơn thuần'
        },
        {
            type: 'p',
            content: 'Tình trạng này thường đi kèm với các triệu chứng như giảm trí nhớ, rối loạn chức năng các cơ quan, tính cáu gắt khó chịu,…'
        },
        {
            type: 'p',
            content: 'Tình trạng này thường đi kèm với các triệu chứng như giảm trí nhớ, rối loạn chức năng các cơ quan, tính cáu gắt khó chịu,…'
        },
        {
            type: 'p',
            content: 'Tình trạng này thường đi kèm với các triệu chứng như giảm trí nhớ, rối loạn chức năng các cơ quan, tính cáu gắt khó chịu,…'
        },
        {
            type: 'header2',
            content: 'Triệu chứng rối loạn chức năng tuyến giáp'
        },
        {
            type: 'li',
            content: 'Item1'
        },
        {
            type: 'li',
            content: 'Item2'
        },
        {
            type: 'li1',
            content: 'Item 2.1'
        },
        {
            type: 'li1',
            content: 'Item 2.2'
        },
        {
            type: 'li',
            content: 'Item3'
        },
        {
            type: 'li',
            content: 'Item4'
        },
        {
            type: 'li1',
            content: 'Item 4.1'
        },
        {
            type: 'li1',
            content: 'Item 4.2'
        },
        {
            type: 'li1',
            content: 'Item 4.3'
        },

    ]

const shortData =
    [
        {
            type: 'header1',
            content: 'Triệu chứng bướu giáp đơn thuần'
        },
        {
            type: 'p',
            content: 'Tình trạng này thường đi kèm với các triệu chứng như giảm trí nhớ, rối loạn chức năng các cơ quan, tính cáu gắt khó chịu,…'
        },

        {
            type: 'header2',
            content: 'Triệu chứng rối loạn chức năng tuyến giáp'
        },
    ]
