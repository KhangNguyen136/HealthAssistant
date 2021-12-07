import React from 'react';
import { Text, SafeAreaView, FlatList, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { GetIcon } from '../../components/button';
import { FlexCard } from '../../components/card';
import Tag from '../../components/tag';
import ViewMoreText from 'react-native-view-more-text';
import ExpandTextView from '../../components/output';

export default function HistoryDetail({ navigation, route }) {
    const data = route.params
    return (
        <SafeAreaView style={globalStyles.container} >
            <ScrollView>
                <FlexCard>
                    <Text style={globalStyles.title1} >{data.title}</Text>
                    <Tag item={data.date} />
                    <ExpandTextView />
                </FlexCard>
            </ScrollView>
        </SafeAreaView>
    )
}
//https://youmed.vn/tin-tuc/buou-giap-don-thuan/
const data = [
    {
        type: "p",
        content: "Rối loạn tiền đình là gì?"
    },
    {
        type: "p",
        content: "Hệ thống tiền đình nằm ở phía sau ốc tai, đóng vai trò quan trọng trong duy trì tư thế thăng bằng, dáng bộ, phối hợp cử động mắt, đầu và thân mình."
    },
    {
        type: "p",
        content: "Dây thần kinh số 8 là đường truyền dẫn thông tin điều khiển hệ thống tiền đình giữ thăng bằng cho cơ thể. Khi chúng ta di chuyển, cúi, xoay… hệ thống tiền đình sẽ nghiêng, lắc để giữ thăng bằng cho cơ thể."

    },
    {
        type: "p",
        content: "Rối loạn tiền đình là tình trạng tổn thương dây thần kinh số 8 do nhiều nguyên nhân khác nhau khiến thông tin dẫn truyền bị sai lệch làm cho cơ thể mất khả năng kiểm soát thăng bằng, hoa mắt, chóng mặt, ù tai, buồn nôn…"
    },
    {
        type: "p",
        content: "Ngoài ra, tình trạng tắc nghẽn mạch máu nuôi não hoặc thiếu máu cũng khiến cho hệ thống tiền đình tiếp nhận thông tin chậm hoặc sai lệch từ não bộ, gây hội chứng rối loạn tiền đình."
    },
    {
        type: "p",
        content: "Rối loạn tiền đình do nguyên nhân gì?"
    },
    {
        type: "p",
        content: "Bệnh do nhiều nguyên nhân:"
    },
    {
        type: "li",
        content: "\nViêm tai giữa do nhiễm virus hoặc vi khuẩn ở tai...\n"
    },
    {
        type: "li",
        content: "\nChấn thương đầu\n"
    },
    {
        type: "li",
        content: "\nRối loạn tuần hoàn máu như tắc động mạch tiền đình, co thắt động mạch cột sống ảnh hưởng đến tai trong hoặc não\n"
    },
    {
        type: "li",
        content: "\nBệnh rối loạn tiền đình cũng có thể do các yếu tố di truyền và môi trường sống (ô nhiễm tiếng ồn, stress...)\n"
    },
    {
        type: "p",
        content: "Theo nghiên cứu cho biết, vấn đề giữ thăng bằng và chóng mặt có thể do việc sử dụng thuốc điều trị đau mạn tính chứ không phải ung thư hoặc các rối loạn thần kinh khác gây ra."
    }
]
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
            type: 'header2',
            content: 'Triệu chứng rối loạn chức năng tuyến giáp'
        },
        {
            type: 'paragraph',
            content: testParagraph
        },

        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'list',
            content: 'item1'
        },
        {
            type: 'image',
            content: 'link'
        }
    ]

//https://github.com/taskrabbit/react-native-parsed-text#readme