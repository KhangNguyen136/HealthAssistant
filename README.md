# Project: Trợ lý sức khỏe (Health assistant)

-   **Mô tả**: một ứng dụng tra cứu dưới dạng chatbot giúp người dùng tìm hiểu về thông tin của những căn bệnh, chẩn đoán căn bệnh tiềm tàng với những triệu chứng lâm sàng và tra cứu về những thông tin y tế khác. 
Ứng dụng còn hỗ trợ nhập tin nhắn bằng giọng nói và đọc văn bản tiếng Việt để hỗ trọ những người có thị lực yếu, khả năng nhập liệu không tốt (đặc biệt là người già) giúp tiếp cận được nhiều người dùng hơn.
Dữ liệu của ứng dụng được chọn lọc từ những nguồn tin y tế đáng tin cậy như: youmed (có chứng chỉ quốc tế về thông tin y tế) và vinmec (trang thông tin y tế của hệ thống bệnh viện đa khoa quốc tế Vinmec, một công ty con của tập đoàn VinGroup)
-   **Về chúng tôi**: https://trolysuckhoe.herokuapp.com/
-   **Xây dựng với**: React native (Javascript), dialogflow (hệ thống xử lý ngôn ngữ tự nhiên), google speech to text service, FPT text to speech API, express nodeJS, mongoDB ....
-   **Hỗ trợ hệ điều hành**: android, ios.
-   **Dev**: Nguyen Tan Khang.

## Những chức năng chính:

-   **Đăng nhập, đăng ký, quên mật khẩu, đổi mật khẩu**: 
<p align="center"> 
<img src="https://i.imgur.com/EXImaLZ.png" width="300" height="650">
</p>

-   **Tra cứu thông tin về những căn bệnh**: thông tin được trả về dưới dạng tin nhắn và có hình ảnh minh họa nếu có, sẽ có gợi ý những thông tin liên quan đến căn bệnh đó. Tin nhắn sẽ được quy định ở độ dài nhất định, người dùng có thể chọn xem thêm để xem toàn bộ tin nhắn, điều này giúp tránh trãi nghiệp xấu khi câu trả lời không chính xác.
<p align="center"> 
<img src="https://i.imgur.com/IV7KiUs.png" width="300" height="650"><img src="https://i.imgur.com/UuTEJhW.png" width="300" height="650">


</p>

-   **Hỗ trợ trò chuyện ngữ cảnh**: ứng dụng còn hỗ trợ trò chuyện trong ngữ cảnh cho phép (ghi nhỡ những tên bệnh, thông tin đã hỏi trước đó)
<p align="center"> 
<img src="https://i.imgur.com/VOC9ZNc.png" width="300" height="650">
</p>

-   **Chẩn đoán bệnh**: có thể từ những triệu chứng lâm sàng, dễ nhận thấy được người dùng cung cấp để trả ra những con bệnh có kết quả phù hợp nhất. Điều này giúp người dùng sớm phát hiện ra những khả năng mắc bệnh của mình và tránh những hậu quả đáng tiếc khi quá muộn. Tuy nhiên vẫn cảnh báo với người dùng đây chỉ là kết quả chẩn đoán dựa theo những triệu chứng đã cung cấp, vẫn nên đến bệnh viện và gặp trực tiếp bác sĩ.
<p align="center"> 
<img src="https://i.imgur.com/EWXI3eM.png" width="300" height="650">
</p>

- **Đọc văn bảng tiếng Việt**:
<p align="center">
<img src="https://i.imgur.com/3aH3LR3.png" width="300" height="650">
</p>

-   **Nhận phản hồi từ người dùng**: 
<p align="center"> 
<img src="https://i.imgur.com/HpgT2Uz.png" width="300" height="650">
</p>

-   **Thông tin tài khoản**: 
<p align="center"> 
<img src="https://i.imgur.com/ZEVeTZb.png" width="300" height="650">
</p>

-   **Về chúng tôi**: 
<p align="center"> 
<img src="https://i.imgur.com/rtsjeJo.png" width="300" height="650">
</p>