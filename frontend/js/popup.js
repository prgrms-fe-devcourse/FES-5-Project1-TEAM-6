import { exercises } from "./data.js";


/* data의 요소를 li로 변환 */
function toListItems(arr, className) {
    const style = (arr.length === 1) ? 
        `list-style-type: none; padding-left: 0;` :
        `list-style-type: decimal; padding-left: 1.2em;`
    const liList = arr.map(text => `<li>${text}</li>`).join('');
    return `<ol class="${className}" style="${style}">${liList}</ol>`
}


function handlePopupClose() {
    // 팝업 및 이벤트리스너 제거 
    const closePopup = () => {
        document.body.removeEventListener('click', clickHandler);
        document.removeEventListener('keydown', escHandler);
        document.querySelector('.popup_backdrop')?.remove();
        // 스크롤 복구 
        document.body.style.overflow = "";
    }

    /* ESC 누를 시 동작 */
    const escHandler = (e) => {
        if(e.key === 'Escape') {
            document.querySelector(".popup_card_container")?.remove();
            closePopup();
        }
    };

    /* 팝업 창 바깥 클릭 또는 X 버튼 클릭 시 동작 */
   const clickHandler = (e) => {
        const closeBtn = e.target.closest(".popup_close-button");
        const popupContainer = document.querySelector(".popup_card_container");

        if (!popupContainer || !popupContainer.contains(e.target) || closeBtn) {
            popupContainer.remove();
            closePopup();
    }}

    /* 이벤트리스너 등록 */
    document.addEventListener('keydown', escHandler);
    document.body.addEventListener('click', clickHandler);
}


/* 클릭한 data[index] 에 대한 Popup HTML 생성 */
function createExercisePopup(dataIdx) {
    const {name, video, desc, startPos, movement, breathing, cautions} = exercises[dataIdx];
    return /* html */`
    <div class="popup_backdrop"></div>
    <div class="popup_card_container">
        <header class="popup_header">
            <button class="popup_close-button">
                <img src="./assets/icons/close.png" alt="닫기" />
            </button>

            <h3 class="popup_card_name">${name}</h3>
        </header>
        <div class="popup_main">
            <p class="popup_card_description">${desc}</p>
            <div class="popup_card_contents">
                <div class="popup_exercise_video">
                    <video
                        src="${video}"
                        autoplay
                        muted
                        loop
                        playsinline></video>
                </div>
                <div class="popup_exercise_detail">
                    <div>
                        <h4 class="startPos">시작 자세</h4>
                        ${toListItems(startPos, "startPos")}
                    </div>
                    <div>
                        <h4 class="movement">운동 동작</h4>
                        ${toListItems(movement, "movement")}
                    </div>
                    <div>
                        <h4 class="breathing">호흡법</h4>
                        ${toListItems(breathing, "breathing")}
                    </div>
                    <div>
                        <h4 class="cautions">주의사항</h4>
                        ${toListItems(cautions, "cautions")}
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

/*화면에 렌더링 */
export function renderExercisePopup(dataIdx) {
    /* 이미 열려 있는 경우 중복 등록 방지 */
    if (document.querySelector('.popup_card_container')) return;

    const popupTemplate = createExercisePopup(dataIdx);
    document.body.insertAdjacentHTML("beforeend", popupTemplate);

    /* 스크롤 막기 */
    document.body.style.overflow = "hidden";

    /* 화면에 렌더링 된 이후에 팝업 닫기 이벤트 등록 */
    requestAnimationFrame(() => {
        document.querySelector(".popup_card_container")?.classList.add("show");
        handlePopupClose();
    });
}