// ===== 1. MENU TRÊN ĐIỆN THOẠI: bấm ☰ để mở/đóng =====
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");       // thêm/bỏ lớp "open"
  menuToggle.setAttribute("aria-expanded", isOpen);      // báo trạng thái cho trình đọc màn hình
});

// Bấm vào một mục menu thì đóng menu lại
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

// ===== 2. LỌC ẢNH: Tất cả / Sự kiện / Câu lạc bộ =====
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;                // đọc giá trị data-filter của nút

    // Đánh dấu nút đang chọn
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    // Ẩn ảnh không khớp, hiện ảnh khớp
    galleryItems.forEach((item) => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !show);
    });
  });
});

// ===== 3. BIỂU MẪU LIÊN HỆ: kiểm tra dữ liệu trước khi "gửi" =====
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

// Hiện (hoặc xóa) thông báo lỗi dưới một ô nhập
function setError(fieldName, message) {
  form.querySelector(`.error[data-for="${fieldName}"]`).textContent = message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();                                // chặn trình duyệt tải lại trang
  statusText.textContent = "";

  const name = form.name.value.trim();                   // trim(): bỏ khoảng trắng thừa
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  let valid = true;

  if (name === "") { setError("name", "Vui lòng nhập họ và tên."); valid = false; }
  else { setError("name", ""); }

  // Kiểm tra email theo dạng đơn giản: có @ và dấu chấm
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Email chưa đúng, ví dụ: ten@gmail.com."); valid = false; }
  else { setError("email", ""); }

  if (message.length < 10) { setError("message", "Vui lòng nhập ít nhất 10 ký tự."); valid = false; }
  else { setError("message", ""); }

  if (valid) {
    // Hiện tại chưa có máy chủ nhận dữ liệu, nên chỉ hiện thông báo
    statusText.textContent = "Cảm ơn bạn! Nhà trường đã nhận được ý kiến của bạn.";
    form.reset();                                        // xóa nội dung các ô
  }
});

// ===== 4. TỰ ĐIỀN NĂM Ở CHÂN TRANG =====
document.getElementById("year").textContent = new Date().getFullYear();
