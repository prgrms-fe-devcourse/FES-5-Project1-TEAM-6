//햄부기 버튼 클릭시 네비바열기
const menuToggleBtn = document.querySelector('.menu_toggle_btn');
const mobileMenu = document.querySelector('.mobile_nav_menu');

menuToggleBtn.addEventListener('click', () => {
  menuToggleBtn.classList.toggle('active');
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