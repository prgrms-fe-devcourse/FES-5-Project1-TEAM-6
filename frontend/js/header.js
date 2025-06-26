const header = document.querySelector('.main_header');
let lastScroll = 0;

// 스크롤 시 헤더 숨기기 또는 보이기
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // 아래로 스크롤 중
    header.classList.add('hidden');
  } else {
    // 위로 스크롤 중
    header.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

// 마우스가 상단에 닿으면 헤더 다시 보이기
document.addEventListener('mousemove', (e) => {
  if (e.clientY <= 20) {
    header.classList.remove('hidden');
  }
});

//햄부기 버튼 클릭시 네비바열기
const menuToggleBtn = document.querySelector('.menu_toggle_btn');
const mobileMenu = document.querySelector('.mobile_nav_menu');

menuToggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

const mobileLinks = document.querySelectorAll('.mobile_nav_menu a, .mobile_nav_menu button');

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

const closeMenuBtn = document.querySelector('.close_menu_btn');

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// 클릭한 메뉴에 active 추가
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('a.menu_item');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
