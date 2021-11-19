import React from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { FlexCard } from '../../components/card';
import Tag from '../../components/tag';

export default function HistoryDetail({ navigation, route }) {
    const data = route.params
    return (
        <SafeAreaView style={globalStyles.container} >
            <FlexCard>
                <Text style={globalStyles.title1} >{data.title}</Text>
                <Tag item={data.date} />
                <FlatList data={testData} renderItem={getComponent} style={{ margin: 10 }} />
            </FlexCard>
        </SafeAreaView>
    )
}

const getComponent = ({ item }) => {
    // console.log(item)
    switch (item.type) {
        case 'paragraph':
            return getParagraph(item.content)

        case 'list':
            return getList(item.content)
        case 'image':
            return
        default:
            return getHeader(item)

    }
}

const getHeader = (item) => {
    console.log(item)
    return (
        <Text style={getTextStyles(item.type)} >{item.content}</Text>
    )
}

const getList = (content) => {
    return (
        <FlatList data={content} keyExtractor={(item) => item}
            renderItem={({ item }) => <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text style={{ fontSize: 5, marginLeft: 10, marginRight: 5 }}>{'\u2B24'}</Text>
                <Text>{item}</Text>
            </View>} />
    )
}

const getParagraph = (item) => {
    const getParagraphText = (paragraphContent) => {
        var result = [];
        for (let i = 0; i < paragraphContent.length; i++) {
            result.push(
                <Text key={i.toString()} style={getTextStyles(testParagraph[i].type)}>{testParagraph[i].content}</Text>
            )
        }
        return result;
    }
    return (
        <Text style={{ margin: 5 }} >
            {
                getParagraphText(item)
            }
        </Text>
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
            return {
            }
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    header1: {
        fontSize: 16, fontWeight: '600', margin: 5
    },
    header2: {
        fontSize: 15, fontWeight: '500', margin: 3
    }
})
//https://youmed.vn/tin-tuc/buou-giap-don-thuan/
const testParagraph = [
    {
        type: 'n',
        content: 'Zitromax là thuốc kháng sinh đến từ công ty dược phẩm nổi tiếng Pfizer của Pháp. Thành phần của'
    },
    {
        type: 'b',
        content: ' thuốc kháng sinh Zitromax'
    },
    {
        type: 'n',
        content: ' là hoạt chất azithromycin, một chất thuộc nhóm macrolide.'
    },
    {
        type: 'i',
        content: 'Hiện nay, thuốc Zitromax có dạng bào chế như viên nén bao phim'
    },
    {
        type: 'n',
        content: ' (250mg, 500mg); hỗn dịch đơn liều (100mg) và hỗn dịch đa liều (200mg).'
    },
    {
        type: 'n',
        content: 'Những đối tượng sử dụng thuốc kháng sinh Zitromax là những bệnh nhân cần được điều trị một số bệnh nhiễm trùng do vi khuẩn gây bệnh như:'
    },
]
const testData =
    [
        {
            type: 'header1',
            content: 'Triệu chứng bướu giáp đơn thuần'
        },
        {
            type: 'paragraph',
            content: testParagraph
        },
        {
            type: 'header2',
            content: 'Triệu chứng rối loạn chức năng tuyến giáp'
        },
        {
            type: 'list',
            content: ['Khô da, sạm da.',
                // 'Khô da, sạm da.',
                // 'Khô da, sạm da.',
                // 'Nhịp tim chậm.',
                'Nhịp tim chậm.',
                // 'Táo bón.',
                'Táo bón.']
        },
        {
            type: 'image',
            content: 'link'
        }
    ]

//https://github.com/taskrabbit/react-native-parsed-text#readme