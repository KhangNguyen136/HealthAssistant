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
        // console.log(event.nativeEvent.layout.height);
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

    const getContent = (data, title) => {
        var result = []
        result.push(getTitle(title));
        for (let i = 0; i < data.length; i++) {
            result.push(getComponent(data[i], i))
        }
        return result;
    }

    const getComponent = (item, id) => {
        // console.log(item)
        switch (item.type) {
            case 'p':
                return getParagraph(item.content, id)
            case 'li':
                return getList(item.content, id)
            case 'li1':
                return getList1(item.content, id)
            case 'image':
                return
            case 'single':
                return (<Text style={{ fontSize: 15 }} key={id}>{item.content}</Text>)
            case 'h2':
            case 'h3':
                return getOtherHeader(item, id);
            default:
                return
        }
    }

    const getOtherHeader = (item, id) => {
        return (
            <Text key={id} style={getTextStyles(item.type)} >{item.content}</Text>
        )
    }
    const getTitle = (item) => {
        return (
            <Text key={-1} style={styles.title} >{item}</Text >
        )
    }

    const getList = (item, id) => {
        return (
            <Text key={id}
                style={{
                    textAlignVertical: 'center', fontSize: 15,
                    lineHeight: 20,
                    marginLeft: 10, color: textColor,
                    // alignItems: 'center'
                }}> <Text style={{ fontSize: 13, }} >{'\u2B25'}</Text> {item.substr(1, item.length - 2)}</Text>
        )
    }

    const getList1 = (item, id) => {
        return (
            // <View style={{ marginLeft: 10, marginTop: 5 }} >
            <Text key={id}
                style={{
                    textAlignVertical: 'center', fontSize: 15,
                    marginLeft: 16, lineHeight: 20

                }}> <Text style={{ fontSize: 14 }} >{'\u2B26'}</Text> {item}</Text>
            // </View>
        )
    }

    const getParagraph = (item, id) => {
        return (
            <Text key={id} style={{ lineHeight: 20, fontSize: 15, marginVertical: 4 }}  >
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
                    {getContent(currentMessage.data, currentMessage.text)}
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
        case 'h2':
            return styles.title
        case 'h3':
            return styles.header3
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
    title: {
        fontSize: 17, fontWeight: 'bold', marginBottom: 6
    },
    header3: {
        fontSize: 16, fontWeight: 'bold', marginVertical: 1
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
