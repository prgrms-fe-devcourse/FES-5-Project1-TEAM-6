const app = document.getElementById("app");
const urlParams = new URLSearchParams(location.search);
const memoId = urlParams.get("id");

//state 초기화(기본값)
let state = {
  title: "운동 기록",
  content: "",
  date: new Date().toISOString(),
  isEditing: !memoId, // 새로운글이면 true,기존글이면 false
};

//서버에서 memoId 메모 가져오기
if (memoId) {
  // 기존 메모
  fetch(`http://localhost:3000/memos/${memoId}`)
    .then((res) => res.json())
    .then((data) => {
      state = { ...data, isEditing: false }; //불러온 데이터로 state 갱신
      renderEditor();
    });
} else {
  // memoId 없으면 localStorage에서 임시 메모 가져오기
  const saved = localStorage.getItem("tempMemo");
  if (saved) state.content = saved;
  renderEditor();
}

function renderEditor() {
  app.innerHTML = ""; //기존내용 초기화

  const wrapper = document.createElement("div");
  wrapper.id = "editor_wrapper";

  // 제목
  const title = document.createElement("h1");
  title.contentEditable = true; //수정가능
  title.id = "note_title";
  title.textContent = state.title;

  //저장버튼
  const saveBtn = document.createElement("button");
  saveBtn.id = "save_btn";
  saveBtn.title = "저장";
  saveBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  //삭제버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete_btn";
  deleteBtn.title = "삭제";
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  if (!memoId) deleteBtn.style.display = "none"; // 새글

  // 수정 버튼
  const editBtn = document.createElement("button");
  editBtn.id = "edit_btn";
  editBtn.title = "수정";
  editBtn.innerHTML = `<i class="fa-solid fa-edit"></i>`;
  if (state.isEditing) editBtn.style.display = "none"; //수정 중

  editBtn.addEventListener("click", () => {
    state.isEditing = true;
    renderEditor();
  });

  //저장 + 삭제 버튼 전체 묶기
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button_group";
  buttonGroup.append(saveBtn, deleteBtn, editBtn);

  //제목 + 버튼 영역을 수평 정렬
  const titleArea = document.createElement("div");
  titleArea.className = "title_area";
  titleArea.append(title, buttonGroup);

  // 작성일
  const meta = document.createElement("div");
  meta.className = "note_meta";
  const formattedDate = formatKoreanDate(state.date);
  meta.innerHTML = `<i class="fa-solid fa-calendar-days"></i><span> ${formattedDate}</span>`;

  // 메모 markdown
  const textarea = document.createElement("textarea");
  textarea.id = "markdown_input";
  textarea.value = state.content;
  textarea.placeholder = "여기에 오늘 운동을 기록하세요...";
  textarea.style.display = state.isEditing ? "block" : "none";

  // 메모 preview 렌더링
  const preview = document.createElement("div");
  preview.id = "preview_area";
  preview.innerHTML = window.marked.parse(state.content);

  //실시간 preview + localStorage 저장
  textarea.addEventListener("input", () => {
    const val = textarea.value;
    preview.innerHTML = window.marked.parse(val);
    localStorage.setItem("tempMemo", val);
  });

  //제목 + 내용 => 서버에 전송
  saveBtn.addEventListener("click", () => {
    const content = textarea.value.trim();
    const titleText = title.textContent.trim();
    if (!content) return alert("내용을 입력해주세요!");

    const data = {
      title: titleText || "제목 없음",
      content,
      date: new Date().toISOString(),
    };

    const url = memoId
      ? `http://localhost:3000/memos/${memoId}`
      : "http://localhost:3000/memos";
    const method = memoId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert(memoId ? "수정 완료!" : "저장 완료!");
        localStorage.removeItem("tempMemo");
        // 새 글이면 resData.id를 사용하고, 수정이면 기존 memoId 유지
        const newId = memoId || resData.id;
        state = {
          ...data,
          isEditing: false,
        };
        //SPA
        history.pushState({}, "", `/cje/editor.html?id=${newId}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
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
      //SPA
      history.pushState({}, "", "/list");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });

  wrapper.append(titleArea, meta);
  if (state.isEditing) wrapper.appendChild(textarea); //수정중이면 마크다운 보여줌
  wrapper.appendChild(preview);
  app.appendChild(wrapper);
}

// 작성일 함수
function formatKoreanDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `작성일&nbsp;&nbsp; ${year} / ${month} / ${day} ${hour}:${min}`;
}
