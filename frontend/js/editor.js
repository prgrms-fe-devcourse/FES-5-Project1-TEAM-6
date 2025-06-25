const urlParams = new URLSearchParams(location.search);
const memoId = urlParams.get("id");
const cardContainer = document.querySelector('.card-container');
// const cardContainer = document.querySelector('.log_list');
const urlId = new URLSearchParams(location.search).get("id");
if (urlId) {
  renderDiaryPopup(urlId);
}

//state 초기화(기본값)
let state = {
    title: "운동 기록",
    content: "",
    date: new Date().toISOString(),
    isEditing: !memoId, // 새로운글이면 true,기존글이면 false
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
/*-- save Event: PUT / POST 분기 --*/
function handleSaveBtn(e, memoId) {
    e.preventDefault();
    const textarea = document.querySelector("textarea");
    const title = document.querySelector("h1");
    const popupContainer = document.querySelector(".popup_diary_card_container");
    
    const content = textarea.value.trim();
    const titleText = title.textContent.trim();
    if (!content) return alert("내용을 입력해주세요!");

    const data = {
      title: titleText || "제목 없음",
      content,
      date: new Date().toISOString(),
    };

    const url = memoId
      ? `http://localhost:3000/fitnessLogs/${memoId}`
      : `http://localhost:3000/fitnessLogs`;
    const method = memoId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert(memoId ? "수정 완료!" : "저장 완료!");
        localStorage.removeItem(memoId? `draft-${memoId}` : "draft-new");

        const newId = memoId || resData.id;

        state = { ...resData, isEditing: false };

        // 새 글이면 URL 갱신
        if (!memoId) {
          history.pushState({}, "", `?id=${newId}`);
        }
        createEditorInPopup(popupContainer, memoId);
      });
  }

/*-- delete Event: DELETE 통신 --*/
function handleDeleteBtn() {
    const textarea = document.querySelector("textarea");
    if (!textarea.value.trim()) return alert("삭제할 내용이 없습니다!");
    if (!confirm("정말 삭제하시겠습니까?")) return;

    fetch(`http://localhost:3000/fitnessLogs/${memoId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제 완료!");
      document.querySelector(".popup_diary_card_container")?.remove();
      document.body.style.overflow = "";
    });
}

/*-- popup container 생성 */
function createPopupContainer() {
  const popupContainer = document.createElement("div");
  popupContainer.className = "popup_diary_card_container";
  document.body.appendChild(popupContainer);
  return popupContainer;
}

/*-- 팝업 내부 에디터 생성 --*/
function createEditorInPopup(container, memoId) {
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.id = "editor_wrapper";

  const title = document.createElement("h1");
  title.contentEditable = true;
  title.id = "note_title";
  title.textContent = state.title;

  const saveBtn = document.createElement("button");
  saveBtn.id = "save_btn";
  saveBtn.type = "button";
  saveBtn.title = "저장";
  saveBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete_btn";
  deleteBtn.title = "삭제";
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  const editBtn = document.createElement("button");
  editBtn.id = "edit_btn";
  editBtn.title = "수정";
  editBtn.innerHTML = `<i class="fa-solid fa-edit"></i>`;
  if (state.isEditing) editBtn.style.display = "none";

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button_group";
  buttonGroup.append(saveBtn, deleteBtn, editBtn);

  const titleArea = document.createElement("div");
  titleArea.className = "title_area";
  titleArea.append(title, buttonGroup);

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

  wrapper.append(titleArea, meta);
  const editorArea = document.createElement("div");
  editorArea.className = "editor_area";
  if (state.isEditing) {
    textarea.style.display = "block";
    editorArea.appendChild(textarea);
  } else {
    textarea.style.display = "none";
  }
  editorArea.appendChild(preview);
  wrapper.appendChild(editorArea);
  container.appendChild(wrapper);

  // 작성 중인 글 localStorage에 저장
  textarea.addEventListener("input", () => {
    const val = textarea.value;
    preview.innerHTML = window.marked.parse(val);

    const dataKey = memoId ? `draft-${memoId}` : "draft-new";
    localStorage.setItem(dataKey, val);
  });

  // 버튼별 이벤트리스너 추가
  editBtn.addEventListener("click", () => {
    state.isEditing = true;
    console.log(state.isEditing);
    createEditorInPopup(container, memoId);
  });
  saveBtn.addEventListener("click", (e) => handleSaveBtn(e, memoId));
  deleteBtn.addEventListener("click", handleDeleteBtn);

}

/*-- 새 글 작성 --*/
function newDiaryEditor() {
  history.replaceState({}, "", "?new=true");

  // localStorage 에 저장된 값 있으면 불러오기
  const savedContent = localStorage.getItem("draft-new") || "";

  state = {
    title: "운동 기록",
    content: savedContent,
    date: new Date().toISOString(),
    isEditing: true,
  };

  // 팝업창 렌더링
  const popupContainer = createPopupContainer();
  createEditorInPopup(popupContainer, null); // memoId 없음
  requestAnimationFrame(() => {
    popupContainer.classList.add("show");
    handleDiaryPopupClose();
  });
}

/*-- 팝업 닫기 --*/
function handleDiaryPopupClose() {
    const popupContainer = document.querySelector(".popup_diary_card_container");
    // 팝업 및 이벤트리스너 제거 
    const closePopup = () => {
        document.removeEventListener('keydown', escHandler);
        popupContainer?.remove();
        // 스크롤 복구 
        document.body.style.overflow = "";
    }

    /* ESC 누를 시 동작 */
    const escHandler = (e) => {
        if(e.key === 'Escape') {
            closePopup();
            history.replaceState({}, "", location.pathname);
        }
    };

    /* X 버튼 클릭 시 동작 */
    const clickHandler = (e) => {
        const closeBtn = e.target.closest(".popup_close-button") ||
        e.target.closest(".popup_diary_close_button");
    
        if (closeBtn) {
            closePopup();
            history.replaceState({}, "", location.pathname);
        }
    }

    /* 이벤트리스너 등록 */
    document.addEventListener('keydown', escHandler);
}

/*-- 팝업 열기 --*/
function renderDiaryPopup(memoId) {
  // 이미 팝업이 있으면 렌더링 안함
  if (document.querySelector(".popup_diary_card_container")) return;

  // 새 글 작성
  if (memoId === "new") {
    newDiaryEditor();
    return;
  }
  
  // 서버에서 데이터 불러오기
  fetch(`http://localhost:3000/fitnessLogs/${memoId}`)
    .then(res => {
      if (!res.ok) throw new Error("해당 기록을 찾을 수 없습니다.");
      return res.json();
    })
    .then((data) => {

      // localStorage에 저장된 값 있는지 확인
      const localData = localStorage.getItem(`draft-${memoId}`);
      if (localData) {
        data.content = localData; // 저장된 값이 있으면 덮어쓰기
      }

      // 데이터 불러오기 성공하면 화면에 popup container 렌더링
      state = { ...data, isEditing: false };

      history.replaceState({}, "", `?id=${data.id}`);

      const popupContainer = createPopupContainer();
      createEditorInPopup(popupContainer, data.id);
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
function handlePopupEvents(e) {
  const targetBtn = e.target.closest('.card-open');
  // const targetBtn = e.target.closest('.log_doc_item');
  if (!targetBtn) return;

  const documentId = targetBtn.dataset.value;
  renderDiaryPopup(documentId);
}

// 이벤트 등록
cardContainer.addEventListener('click', handlePopupEvents);

