import { handlePopupClose } from "./popup.js" 

const urlParams = new URLSearchParams(location.search);
const memoId = urlParams.get("id");
const cardContainer = document.querySelector('.card-container');

//state 초기화(기본값)
let state = {
  title: "운동 기록",
  content: "",
  date: new Date().toISOString(),
  isEditing: !memoId, // 새로운글이면 true,기존글이면 false
};

/*-- 팝업 열기 --*/
function renderDiaryPopup(documentIndex) {
  //서버에서 일기 데이터 불러오기
  fetch("http://localhost:3000/memos")
    .then((res) => res.json())
    .then((memos) => {
      const targetMemo = memos[Number(documentIndex) - 1];
      if (!targetMemo) throw new Error("메모를 찾을 수 없음");

      const { id } = targetMemo;
      return fetch(`http://localhost:3000/memos/${id}`);
    })
    .then((res) => res.json())
    .then((data) => {
      // 데이터 불러오기 성공하면 화면에 popup container 렌더링
      state = { ...data, isEditing: false };
      const popupContainer = document.createElement("div");
      popupContainer.className = "popup_diary_card_container";
      document.body.appendChild(popupContainer);
      renderEditorInPopup(popupContainer, data.id);
      requestAnimationFrame(() => {
        popupContainer.classList.add("show");
        handlePopupClose();
      });
    })
    .catch((err) => {
      console.error(err);
      alert("데이터를 불러오지 못했습니다.");
    });
}

/*-- 팝업 내부 에디터 렌더링 --*/
function renderEditorInPopup(container, memoId) {
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

  editBtn.addEventListener("click", () => {
    state.isEditing = true;
    renderEditorInPopup(container, memoId);
  });

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
  preview.style.display = state.isEditing ? "none" : "block";

  textarea.addEventListener("input", () => {
    const val = textarea.value;
    preview.innerHTML = window.marked.parse(val);
    localStorage.setItem("tempMemo", val);
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const content = textarea.value.trim();
    const titleText = title.textContent.trim();
    if (!content) return alert("내용을 입력해주세요!");

    const data = {
      title: titleText || "제목 없음",
      content,
      date: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/memos/${memoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert("수정 완료!");
        console.log('page reload?')
        // setIgnoreNextClickOnce();
        localStorage.removeItem("tempMemo");
        state = { ...resData, isEditing: false };
        textarea.style.display = "none";
        preview.innerHTML = window.marked.parse(state.content);
        preview.style.display = "block";
        editBtn.style.display = "inline-block";
      });
  });

  deleteBtn.addEventListener("click", () => {
    if (!textarea.value.trim()) return alert("삭제할 내용이 없습니다!");
    if (!confirm("정말 삭제하시겠습니까?")) return;

    fetch(`http://localhost:3000/memos/${memoId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제 완료!");
      document.querySelector(".popup_diary_card_container")?.remove();
      document.body.style.overflow = "";
    });
  });

  wrapper.append(titleArea, meta);
  if (state.isEditing) wrapper.appendChild(textarea);
  wrapper.appendChild(preview);
  container.appendChild(wrapper);
}

/*-- 작성일 포맷 --*/
function formatKoreanDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `작성일&nbsp;&nbsp; ${year} / ${month} / ${day} ${hour}:${min}`;
}

/*-- 카드 클릭 이벤트 핸들러 --*/
function handlePopupEvents(e) {
  const targetBtn = e.target.closest('.card-open');
  if (!targetBtn) return;

  const documentId = targetBtn.dataset.value;
  renderDiaryPopup(documentId);
}

// 이벤트 등록
cardContainer.addEventListener('click', handlePopupEvents);

