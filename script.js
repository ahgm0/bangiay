// script_giay.js

document.addEventListener('DOMContentLoaded', () => {
    const giayTrack = document.querySelector('.giay-track');
    const giayImages = document.querySelectorAll('.giay-image'); // Lấy tất cả ảnh
    const dotsContainer = document.querySelector('.giay-dots');
    const dots = document.querySelectorAll('.dot');
    // Đảm bảo selector cho nút prev/next khớp với HTML của bạn (ví dụ: .giay-btn.prev-btn)
    // Nếu bạn chỉ dùng class prev-btn và next-btn mà không có giay-btn kèm theo
    // thì giữ nguyên như bạn đã có:
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const giayContainer = document.querySelector('.giay-container'); // Thêm dòng này để lấy container

    let currentIndex = 0;
    const totalImages = giayImages.length;
    let imageWidth; // Khai báo nhưng chưa gán giá trị ở đây

    // Hàm để lấy chiều rộng của khung hình hiển thị (container)
    // và tính toán lại vị trí cuộn
    function getContainerWidth() {
        // Lấy chiều rộng hiện tại của khung chứa .giay-container
        // Đây là chiều rộng mà mỗi ảnh phải vừa vào
        return giayContainer.clientWidth;
    }

    // Hàm cập nhật hiển thị của giay và chấm
    function updateGiay() { // Đổi tên hàm cho đúng ngữ cảnh 'giay'
        imageWidth = getContainerWidth(); // Cập nhật chiều rộng ảnh mỗi lần cuộn/thay đổi

        // Di chuyển track để hiển thị ảnh hiện tại
        giayTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

        // Xóa class 'active' khỏi tất cả các chấm
        dots.forEach(dot => dot.classList.remove('active'));
        // Thêm class 'active' vào chấm tương ứng với ảnh hiện tại
        // Đảm bảo dots[currentIndex] tồn tại trước khi truy cập
        if (dots[currentIndex]) {
             dots[currentIndex].classList.add('active');
        }
    }

    // Hàm để cuộn đến slide mục tiêu (dùng sau khi kéo thả hoặc lăn chuột)
    function moveToSlide(index) {
        // Đảm bảo currentIndex không vượt quá giới hạn
        // Điều chỉnh để có vòng lặp vô hạn
        currentIndex = (index + totalImages) % totalImages;
        updateGiay();
    }


    // Xử lý khi click vào nút "Next"
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // Xử lý khi click vào nút "Prev"
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // Xử lý khi click vào các chấm
    dotsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            const slideIndex = parseInt(event.target.dataset.slide);
            moveToSlide(slideIndex);
        }
    });

    // Thêm Listener cho sự kiện resize của cửa sổ trình duyệt
    window.addEventListener('resize', updateGiay);

    // --- THÊM CHỨC NĂNG LĂN CHUỘT (SCROLL WHEEL) ---
    giayContainer.addEventListener('wheel', (e) => {
        // Ngăn chặn trang cuộn (scroll) khi lăn chuột trên slider
        e.preventDefault();

        // Kiểm tra hướng lăn: deltaY > 0 nghĩa là lăn xuống (next), < 0 là lăn lên (prev)
        if (e.deltaY > 0) { // Lăn xuống
            moveToSlide(currentIndex + 1);
        } else { // Lăn lên
            moveToSlide(currentIndex - 1);
        }
    });

    // Khởi tạo trạng thái ban đầu khi tải trang
    updateGiay();
});



const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if (target) {
      target.classList.add('active');
    }
  });
});
