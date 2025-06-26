import { initFitness } from "./logList.js";
import { renderFitnessLog } from "./pages/fitnessLog.js"

const urlParams = new URLSearchParams(location.search);
const memoId = urlParams.get("id");
// const cardContainer = document.querySelector('.card-container');
const urlId = new URLSearchParams(location.search).get("id");
if (urlId) {
  renderDiaryPopup(urlId);
}

//state 초기화(기본값)
let state = {
    title: "새 운동 기록",
    content: "",
    date: new Date().toISOString(),
    isEditing: !memoId, // 새로운글이면 true,기존글이면 false
    parent: null
  };


/*-- 작성일 포맷팅 --*/
function formatKoreanDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `작성일&nbsp;&nbsp; ${year} / ${month} / ${day} ${hour}:${min}`;
}

/*---------- fetch 통신 ----------*/
/*-- save Event: PUT --*/
function handleSaveBtn(e, memoId, state) {
    e.preventDefault();
    const textarea = document.querySelector("textarea");
    const title = document.querySelector("#note_title");
    const popupContainer = document.querySelector(".popup_diary_card_container");
    
    const content = textarea ? textarea.value.trim() : state.content;
    const titleText = title.textContent.trim();
    // if (!content) return alert("내용을 입력해주세요!");

    const data = {
      id: memoId,
      title: titleText || "새 운동 기록",
      content: content || "",
      date: new Date().toISOString(),
      parent: state.parent || null
    };

    const url = `http://localhost:3000/fitnessLogs/${memoId}`;

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert("저장 완료!");
        localStorage.removeItem(`draft-${memoId}`);
        state = { ...resData, isEditing: false };

        createEditorInPopup(popupContainer, memoId, state);
      });
  }

/*-- delete Event: DELETE 통신 --*/
function handleDeleteBtn(memoId) {
    // const textarea = document.querySelector("textarea");
    // if (!textarea.value.trim()) return alert("삭제할 내용이 없습니다!");
    if (!confirm("정말 삭제하시겠습니까?")) return;

    fetch(`http://localhost:3000/fitnessLogs/${memoId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제 완료!");
      document.querySelector(".popup_diary_card_container")?.remove();
      document.body.style.overflow = "";
    });
    closePopup();
}

/*----------localStorage--------- */
function saveDraftToLocalStorage(memoId, title="", textarea="") {
  const draftKey = `draft-${memoId}`;

  const titleText = title.textContent.trim();
  const contentText = textarea.value;
  const draft = {
    title: titleText,
    content: contentText,
  }
  localStorage.setItem(draftKey, JSON.stringify(draft));
  }


/*-----------DOM 제어-------------*/
/*-- popup container 생성 */
function createPopupContainer() {
  const popupContainer = document.createElement("div");
  popupContainer.className = "popup_diary_card_container";
  document.body.appendChild(popupContainer);
  return popupContainer;
}

/*-- 팝업 내부 에디터 생성 --*/
function createEditorInPopup(container, memoId, state) {

  /* 스크롤 막기 */
  document.body.style.overflow = "hidden";

  container.innerHTML = "";

  const backdrop = document.querySelector('.popup_backdrop');
  if (!backdrop) {
    const newBackdrop = document.createElement("div");
    newBackdrop.className = "popup_backdrop";
    document.body.appendChild(newBackdrop);
  }

  const wrapper = document.createElement("div");
  wrapper.id = "editor_wrapper";

  const title = document.createElement("h1");
  title.contentEditable = true;
  title.id = "note_title";
  title.textContent = state.title;

  const closeBtn = document.createElement("button");
  closeBtn.className = "popup_diary_close_button";
  closeBtn.title = "닫기";
  closeBtn.innerHTML = `<img src="../assets/icons/close.png" alt="닫기" />`;

  const saveBtn = document.createElement("button");
  saveBtn.id = "save_btn";
  saveBtn.type = "button";
  saveBtn.title = "저장";
  // saveBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  saveBtn.textContent = "저장";

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete_btn";
  deleteBtn.title = "삭제";
  // deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteBtn.textContent = "삭제";

  const editBtn = document.createElement("button");
  editBtn.id = "edit_btn";
  editBtn.title = "수정";
  // editBtn.innerHTML = `<i class="fa-solid fa-edit"></i>`;
  editBtn.textContent = "수정";
  if (state.isEditing) editBtn.style.display = "none";

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button_group";
  buttonGroup.append(deleteBtn, editBtn, saveBtn);

  const titleArea = document.createElement("div");
  titleArea.className = "title_area";
  // titleArea.append(title, buttonGroup);
  titleArea.append(title);

  const meta = document.createElement("div");
  meta.className = "note_meta";
  meta.innerHTML = `<i class="fa-solid fa-calendar-days"></i><span> ${formatKoreanDate(state.date)}</span>`;

  const textarea = document.createElement("textarea");
  textarea.id = "markdown_input";
  textarea.value = state.content;
  textarea.placeholder = "여기에 오늘 운동을 기록하세요...";
  textarea.style.display = state.isEditing ? "block" : "none";

  const preview = document.createElement("div");
  preview.id = "preview_area";
  preview.innerHTML = window.marked.parse(state.content);
  preview.style.display = "block";

  const editorArea = document.createElement("div");
  editorArea.className = "editor_area";

  // 요소별 스타일 지정
  if (state.isEditing) {
    textarea.style.display = "block";
    editorArea.appendChild(textarea);
  } else {
    textarea.style.display = "none";
    preview.classList.add("edit_done");
    saveBtn.style.display = "none";
  }

  wrapper.append(titleArea, meta);
  wrapper.appendChild(editorArea);
  wrapper.appendChild(buttonGroup);
  wrapper.prepend(closeBtn);
  editorArea.appendChild(preview);
  container.appendChild(wrapper);


  // 작성 중인 글 localStorage에 저장
  textarea.addEventListener("input", () => {
    preview.innerHTML = window.marked.parse(textarea.value);    
    preview.scrollTop = preview.scrollHeight; // preview 자동 스크롤
    saveDraftToLocalStorage(memoId, title, textarea);
  });
  title.addEventListener("keydown", () => {
    if (!state.isEditing) {
      state.isEditing = true;
      editTitle(container, memoId, state);
    }
    saveDraftToLocalStorage(memoId, title, textarea);
  });
  
  // 버튼별 이벤트리스너 추가
  closeBtn.addEventListener("click", closePopup);

  editBtn.addEventListener("click", () => {
    state.isEditing = true;
    createEditorInPopup(container, memoId, state);
  });
  saveBtn.addEventListener("click", (e) => handleSaveBtn(e, memoId, state));
  deleteBtn.addEventListener("click", (e) => handleDeleteBtn(memoId));

}

/*-- 새 글 작성 --*/
function newDiaryEditor(memoId, parentId = null, serverData = {}) {
  history.replaceState({}, "", `?id=${memoId}`);

  let savedTitle = serverData.title || "새 운동 기록";
  let savedContent = serverData.content || "";

  // localStorage 에 저장된 값 있으면 불러오기
  const localData = localStorage.getItem(`draft-${memoId}`);
  
  if (localData) {
    const { title, content } = JSON.parse(localData);
    savedTitle = title || savedTitle;
    savedContent = content || savedContent; // 저장된 값이 있으면 덮어쓰기
  }
   
  state = {
    title: savedTitle,
    content: savedContent,
    date: new Date().toISOString(),
    isEditing: true,
    parent: parentId
  };

  // 팝업창 렌더링
  const popupContainer = createPopupContainer();
  createEditorInPopup(popupContainer, memoId, state);
  requestAnimationFrame(() => {
    popupContainer.classList.add("show");
    handleDiaryPopupClose();
  });
}

/*-- 제목 요소 수정 --*/
function editTitle(container, memoId, state) {
  // 수정 전 커서 위치 기억
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const cursorPos = range.startOffset;

  createEditorInPopup(container, memoId, state);

  // 렌더링 후 다시 포커스 + 커서 이동
  requestAnimationFrame(() => {
    const newTitle = document.querySelector("#note_title");
    const newRange = document.createRange();
    const newSelection = window.getSelection();

    newRange.setStart(newTitle.firstChild || newTitle, cursorPos);
    newRange.collapse(true);
    newSelection.removeAllRanges();
    newSelection.addRange(newRange);
  })
}

/*-- 팝업 닫기 --*/
const closePopup = async () => {
  const popupContainer = document.querySelector(".popup_diary_card_container");
  popupContainer?.remove();
  document.querySelector('.popup_backdrop')?.remove();

  // 스크롤 및 pathname 복구 
  document.body.style.overflow = "";
  history.replaceState({}, "", location.pathname);

  // 목록 리렌더링
  const contentsList = document.querySelector(".log_section");
  // renderFitnessLog(contentsList);
  const { initFitness } = await import('./pages/fitnessLog.js');
  initFitness()
}
  // ESC 누를 시 동작
function handleDiaryPopupClose() {
    const escHandler = (e) => {
        if(e.key === 'Escape') {
            closePopup();
        }
    };
    document.addEventListener('keydown', escHandler);
}

/*-- 팝업 열기 --*/
function renderDiaryPopup(memoId) {
  // 이미 팝업이 있으면 렌더링 안함
  if (document.querySelector(".popup_diary_card_container")) return;
  
  // 서버에서 데이터 불러오기
  fetch(`http://localhost:3000/fitnessLogs/${memoId}`)
    .then(res => {
      if (!res.ok) throw new Error("해당 기록을 찾을 수 없습니다.");
      return res.json();
    })
    .then((data) => {
      state = { 
        id: data.id || memoId,
        title: data.title || "새 운동 기록", 
        content: data.content || "",
        date: data.date,
        parent: data.parent || null,
        isEditing: false  };

      if (!state.content || state.content.trim() === "") {
        // 새 글 작성 상태로 진입
        newDiaryEditor(data.id, data.parent, data);
        return;
      }

      // localStorage에 저장된 값 있는지 확인
      const localData = localStorage.getItem(`draft-${data.id}`);
      if (localData) {
        const { title, content } = JSON.parse(localData);
        state.title = title;
        state.content = content; // 저장된 값이 있으면 덮어쓰기
      }

      // 데이터 불러오기 성공하면 화면에 popup container 렌더링
      history.replaceState({}, "", `?id=${data.id}`);

      const popupContainer = createPopupContainer();
      createEditorInPopup(popupContainer, data.id, state);

      requestAnimationFrame(() => {
        popupContainer.classList.add("show");
        
        handleDiaryPopupClose();
      });
    })
    .catch((err) => {
      console.error(err);
      alert("데이터를 불러오지 못했습니다.");
    });
}

/*-- 작성된 글 리스트 클릭 이벤트 핸들러 --*/
export function handlePopupEvents(e) {
  const targetBtn = e.target.closest('.log_doc_item');
  const buttons = e.target.closest('button');
  if (!targetBtn || buttons) return;
  const documentId = targetBtn.dataset.id;
  renderDiaryPopup(documentId);
}



