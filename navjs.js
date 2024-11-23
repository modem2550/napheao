window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-nav');
    if (window.scrollY > 50) { 
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  // ซ่อนเนื้อหาทั้งหมด
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");

  // ลบคลาส "active" จากแท็บทั้งหมด
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // แสดงเนื้อหาที่ตรงกับคลาสที่เลือก
  if (tabName === 'All') {
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "block"; // แสดงเนื้อหาทั้งหมด
      }
  } else {
      // แสดงเฉพาะเนื้อหาที่มีคลาสตามที่เลือก
      var selectedContent = document.getElementsByClassName(tabName);
      for (i = 0; i < selectedContent.length; i++) {
          selectedContent[i].style.display = "block"; // แสดงเนื้อหาที่เลือก
      }
  }

  // เพิ่มคลาส "active" ให้กับแท็บที่ถูกเลือก
  evt.currentTarget.className += " active";
}

// เรียกใช้ฟังก์ชัน openTab เมื่อโหลดหน้า
window.onload = function() {
  // เรียกใช้ openTab กับ 'All' และส่ง evt เป็น null
  openTab({ currentTarget: document.querySelector('.tablinks') }, 'All');
};