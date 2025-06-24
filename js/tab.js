import { exercises as data } from './data.js';
import { renderCards} from './card.js';


let tabMenuList = document.querySelectorAll('.tab_menu > li');
let tabContList = document.querySelectorAll('.tab_cont_wrap > div');

tabMenuList = [...tabMenuList];
tabContList = [...tabContList];

const categories = ['등', '팔', '가슴', '하체', '유산소'];
const itemsPerLoad = 6;       // 처음 보여줄 카드 수
const moreItemsPerClick = 6;  // 더보기 클릭 시 추가할 카드 수

// 각 카테고리별 현재 보여진 카드 수 저장
const getShownCount = {};
categories.forEach(cate => getShownCount[cate] = itemsPerLoad);


/* 탭 메뉴 클릭 이벤트 */
function handleTabMenu(e) {
  e.preventDefault();

  const activeTab = e.currentTarget;
  const index = tabMenuList.indexOf(activeTab);

  tabMenuList.forEach(tab => tab.classList.remove('active'));
  tabContList.forEach(cont => cont.classList.remove('active'));

  activeTab.classList.add('active');
  tabContList[index].classList.add('active');

  setMoreBtnVisible(index);
}

/* 탭 컨텐츠 전체 초기 렌더링 */
function renderAllTabContents() {
  categories.forEach((category, index) => {
    const filtered = data.filter(item => item.category === category);
    const cardWrap = tabContList[index].querySelector('.card_wrap');

    renderCards(cardWrap, filtered, 0, itemsPerLoad);
    setMoreBtnVisible(index);
  });
}

/* 더보기 버튼 표시 여부 업데이트 */
function setMoreBtnVisible(tabIndex) {
  const category = categories[tabIndex];
  const filtered = data.filter(item => item.category === category);
  const moreBtn = tabContList[tabIndex].querySelector('.more_btn');
  if (!moreBtn) return;

  if (getShownCount[category] >= filtered.length) {
    moreBtn.style.display = 'none';
  } else {
    moreBtn.style.display = 'block';
  }
}

/* 더보기 버튼 클릭 이벤트 */
function handleMoreClick(e) {
  const activeIndex = tabMenuList.findIndex(tab => tab.classList.contains('active'));

  //findIndex() : 조건에 업으면 -1로 반환
  if (activeIndex === -1) return;

  const category = categories[activeIndex];

  const filtered = data.filter(item => item.category === category);
  const cardWrap = tabContList[activeIndex].querySelector('.card_wrap');

  const currentShown = getShownCount[category];

  const addedCount = renderCards(cardWrap, filtered, currentShown, moreItemsPerClick);

  getShownCount[category] += addedCount;

  setMoreBtnVisible(activeIndex);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAllTabContents();

  tabMenuList.forEach(tab => {
    tab.addEventListener('click', handleTabMenu);
  });

  tabContList.forEach(cont => {
    const btn = cont.querySelector('.more_btn');
    if (btn) btn.addEventListener('click', handleMoreClick);
  });
});
 