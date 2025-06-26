import { exercises } from "./exerciseData.js";
import { renderCards } from "../js/card.js";


export function initSearch() {
  const searchInput = document.querySelector(".search_input_wrapper");
  if (!searchInput) return;

  const cardWrap = document.querySelector(".card_wrap");
  const autocompleteList = document.querySelector(".autocomplete_list");
  const searchTitle = document.querySelector(".sub_tit");

  // 검색 결과 보여주는 함수
  function showSearchResult(keyword) {
    const matchedExercises = exercises.filter((item) =>
      item.name.includes(keyword)
    );
    cardWrap.innerHTML = "";

    if (matchedExercises.length > 0) {
      renderCards(cardWrap, matchedExercises, 0, matchedExercises.length);
    } else {
      cardWrap.innerHTML = `<li class="no_data">해당 이름을 가진 운동을 찾을 수 없어요 😓</li>`;
    }
  }

  // 운동리스트에서 검색이 포함된 항목만 필터링
  function getMatchedExercises(keyword) {
    return exercises.filter((item) => item.name.includes(keyword));
  }

  // 입력값과 일치하는 부분에 하이라이트를 적용
  function getHighlightedText(text, keyword) {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }

  // handleSearchInput 함수
  function handleSearchInput() {
    const inputValue = searchInput.value.trim();
    cardWrap.innerHTML = "";
    autocompleteList.innerHTML = "";

    if (!inputValue) {
      cardWrap.style.display = "none";
      searchTitle.style.display = "none";
      return;
    }

    const matchedExercises = getMatchedExercises(inputValue);

    if (matchedExercises.length > 0) {
      autocompleteList.style.display = "block";
      matchedExercises.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = getHighlightedText(item.name, inputValue);
        li.addEventListener("click", () => {
          searchInput.value = item.name;
          autocompleteList.innerHTML = "";
          autocompleteList.style.display = "none";
          showSearchResult(item.name);
        });
        autocompleteList.appendChild(li);
      });
    } else {
      autocompleteList.style.display = "none";
    }

    cardWrap.style.display = "flex";
    searchTitle.style.display = "block";
    showSearchResult(inputValue);
  }

  searchInput.addEventListener("input", handleSearchInput);

  // input 외 영역 클릭 시 리스트 숨기기
  document.addEventListener("click", (e) => {
    const isClickInsideInput = searchInput.contains(e.target);
    const isClickInsideList = autocompleteList.contains(e.target);

    if (!isClickInsideInput && !isClickInsideList) {
      autocompleteList.style.display = "none";
    }
  });

  handleSearchInput();
}
