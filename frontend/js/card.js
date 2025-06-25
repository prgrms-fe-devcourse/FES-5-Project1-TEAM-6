import { renderExercisePopup } from "./popup.js"

/* 카드 생성 함수 */
export function createCardItem(thumbnail, name, id) {
  return `
    <li class="card_contents" data-index="${id}">
      <img src="./${thumbnail}" alt="${name}" />
      <span class="ex_name">${name}</span>					
      <img class="like" src="./assets/images/heart.svg" alt="좋아요 버튼" />
      <button class="view_detail_btn" type="button">상세 보기</button>
    </li>
  `;
}

/* 좋아요 클릭 이벤트 핸들러 생성 */
export function handleLikeClick() {
  let heart = false;

  return (e) => {
    const target = e.currentTarget;
    const emptySrc = './assets/images/heart.svg';
    const fillSrc = './assets/images/fillheart.svg';

    if (!heart) {
      target.src = fillSrc;
    } else {
      target.src = emptySrc;
    }
    heart = !heart;
  };
}

/* 좋아요 이벤트 */
export function LikeEvents() {
  const likes = document.querySelectorAll('.like');
  likes.forEach(el => {
    el.removeEventListener('click', handleLikeClick);
    el.addEventListener('click', handleLikeClick());
  });
}

/* 상세보기 이벤트 */
export function DetailEvents() {
  const detailButtons = document.querySelectorAll('.view_detail_btn');
  detailButtons.forEach(btn => {
    btn.removeEventListener('click', handleDetailButtonClick);
    btn.addEventListener('click', handleDetailButtonClick);
  });
}

function handleDetailButtonClick(e) {
  const detailBtn = e.target.closest(".view_detail_btn");
	if (!detailBtn) return;

	const card = detailBtn.closest(".card_contents");
	const index = Number(card?.dataset.index);

  
  
	if (!isNaN(index)) {
		renderExercisePopup(index-1);
	}
}

/* 카드 여러 개 렌더링 + 이벤트 바인딩 */
export function renderCards(container, items, startIndex, count) {
  const slice = items.slice(startIndex, startIndex + count);
  slice.forEach(({ thumbnail, name, id}) => {
    const cardHTML = createCardItem(thumbnail, name, id);
    container.insertAdjacentHTML('beforeend', cardHTML);
  });

  LikeEvents();
  DetailEvents();

  return slice.length;
}
