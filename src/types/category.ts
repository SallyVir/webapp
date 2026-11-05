
// const SOURCE_PATH = "https://tienphong.vn/rss/";

export interface Category {
    id: number;
    categoryName: string;
    categoryPath: URL;
}

// const CATEGORY_PATHS: Record<string, string> = {
//
//     "Trang chủ": "home.rss",
//
//     "Xã hội": "xa-hoi-2.rss",
//     "Chính trị": "chinh-tri-308.rss",
//     "Tin tức": "xa-hoi-tin-tuc-104.rss",
//     "Phóng sự": "xa-hoi-phong-su-13.rss",
//
//     "Kinh tế": "kinh-te-3.rss",
//     "Thị trường": "kinh-te-thi-truong-24.rss",
//     "Doanh nghiệp": "doanh-nghiep-22.rss",
//     "Đầu tư": "dau-tu-165.rss",
//     "Tài chính - Chứng khoán": "tai-chinh-chung-khoan-105.rss",
//     "Giảm nghèo bền vững": "giam-ngheo-ben-vung-413.rss",
//
//     "Sóng xanh": "song-xanh-441.rss",
//     "Di chuyển xanh": "di-chuyen-xanh-442.rss",
//     "Net zero": "netzero-443.rss",
//     "Đầu tư (Sóng xanh)": "song-xanh-dau-tu-444.rss",
//     "Lifestyle": "lifestyle-445.rss",
//     "Xanh 4.0": "xanh-4-0-446.rss",
//
//     "Địa ốc": "dia-oc-166.rss",
//     "Đô thị - Dự án": "do-thi-du-an-269.rss",
//     "Thị trường - Doanh nghiệp": "thi-truong-doanh-nghiep-270.rss",
//     "Nhà đẹp - Kiến trúc": "nha-dep-kien-truc-271.rss",
//     "Chuyên gia - Tư vấn": "chuyen-gia-tu-van-272.rss",
//     "Media Địa ốc": "media-dia-oc-169.rss",
//
//     "Sức khỏe": "suc-khoe-210.rss",
//     "Y khoa": "y-khoa-304.rss",
//     "Thuốc tốt": "thuoc-tot-305.rss",
//     "Khỏe đẹp": "khoe-dep-306.rss",
//     "Giới tính": "suc-khoe-gioi-tinh-144.rss",
//     "Mẹ và bé": "me-va-be-447.rss",
//     "Phòng chống ung thư": "phong-chong-ung-thu-448.rss",
//
//     "Thế giới": "the-gioi-5.rss",
//     "Phân tích - Bình luận": "the-gioi-phan-tich-binh-luan-31.rss",
//     "Chuyện lạ": "chuyen-la-32.rss",
//
//     "Giới trẻ": "gioi-tre-4.rss",
//     "Nhịp sống": "gioi-tre-nhip-song-27.rss",
//     "Cộng đồng mạng": "cong-dong-mang-26.rss",
//
//     "Pháp luật": "phap-luat-12.rss",
//     "Bản tin 113": "ban-tin-113-231.rss",
//     "Pháp đình": "phap-luat-chuyen-toa-173.rss",
//
//     "Thể thao": "the-thao-11.rss",
//     "Bóng đá": "the-thao-bong-da-49.rss",
//     "Hậu trường thể thao": "the-thao-hau-truong-111.rss",
//     "Golf": "the-thao-golf-280.rss",
//     "HIGHLIGHTS": "video-the-thao-425.rss",
//
//     "Người lính": "hanh-trang-nguoi-linh-182.rss",
//
//     "Xe": "xe-113.rss",
//     "Thị trường xe": "thi-truong-xe-276.rss",
//     "Đánh giá xe": "danh-gia-xe-277.rss",
//     "Cộng đồng xe": "cong-dong-xe-278.rss",
//     "Tư vấn": "xe-tu-van-279.rss",
//
//     "Văn hóa": "van-hoa-7.rss",
//     "Chuyển động văn hóa": "chuyen-dong-van-hoa-264.rss",
//     "Sách": "sach-429.rss",
//     "Góc nhìn": "goc-nhin-262.rss",
//
//     "Giải trí": "giai-tri-36.rss",
//     "Phim ảnh": "phim-anh-35.rss",
//     "Hậu trường sao": "giai-tri-hau-truong-168.rss",
//     "Âm nhạc": "am-nhac-153.rss",
//     "Thời trang - Làm đẹp": "thoi-trang-lam-dep-213.rss",
//
//     "Giáo dục": "giao-duc-71.rss",
//     "Cổng trường": "cong-truong-310.rss",
//     "Tuyển sinh": "tuyen-sinh2011-163.rss",
//     "Du học": "giao-duc-du-hoc-40.rss",
//
//     "Khoa học": "khoa-hoc-45.rss",
//
//     "Hoa hậu": "hoa-hau-253.rss",
//     "Tin tức trong nước": "hh-tin-tuc-trong-nuoc-255.rss",
//     "Hoa hậu Việt Nam": "hoa-hau-viet-nam-257.rss",
//     "Quốc tế": "quoc-te-265.rss",
//
//     "Bạn đọc": "ban-doc-15.rss",
//     "Điều tra": "ban-doc-dieu-tra-300.rss",
//     "Diễn đàn": "ban-doc-dien-dan-301.rss",
//     "Hồi âm": "ban-doc-hoi-am-302.rss",
//     "Nhân ái": "ban-doc-nhan-ai-303.rss",
//
//     "Video": "video-clip-115.rss",
//
//     "Tôi nghĩ": "toi-nghi-273.rss",
//
//     "Nhật báo": "nhat-bao-433.rss",
//
//     "Hàng không - Du lịch": "hang-khong-du-lich-220.rss",
//     "Hành trình": "hanh-trinh-434.rss",
//     "Mở vali": "mo-vali-435.rss",
//     "Vivu": "vi-vu-436.rss",
//     "Khoảnh khắc": "khoanh-khac-437.rss",
//     "Đối thoại": "doi-thoai-438.rss",
//
//     "Nhịp sống Thủ đô": "nhip-song-thu-do-242.rss",
//     "Đời sống": "nstd-doi-song-243.rss",
//     "Giao thông - Đô thị": "nstd-giao-thong-do-thi-244.rss",
//     "Đầu tư (Nhịp sống Thủ đô)": "nstd-dau-tu-245.rss",
//     "Môi trường": "nstd-moi-truong-313.rss",
//
//     "Nhịp sống phương Nam": "nhip-song-phuong-nam-408.rss",
//     "Chuyển động 24h": "chuyen-dong-24h-409.rss",
//     "Giao thông – Đô thị": "giao-thong-do-thi-410.rss",
//     "Kinh tế - Thị trường": "kinh-te--thi-truong-411.rss",
//     "Media": "media-412.rss",
//
//     "Tết Việt": "tet-viet-416.rss",
//     "Đính chính": "dinh-chinh-476.rss"
// };
//
//
// export function createPath(categoryName: string): Category {
//
//     const path = CATEGORY_PATHS[categoryName];
//
//     return {
//         categoryName: categoryName,
//         categoryPath: new URL(path, SOURCE_PATH)
//     };
// }
