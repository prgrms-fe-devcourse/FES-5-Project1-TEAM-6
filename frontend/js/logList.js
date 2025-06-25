import { fetchDocuments, createDocument, deleteDocument } from './api/fitnessApi.js';

export async function initFitness() {
  const logList = document.querySelector('.log_list');
  const logAddBtn = document.querySelector('#logAddBtn');

  function createLogItem(tit) {
    return `
    <li>
      <div class="log_doc_item" role="button" tabindex="0">
        <button type="button" class="arrow"><span class="blind">페이지 없음</span></button>
        <p class="tit">${tit}</p>

        <div class="btn_wrap">
          <button type="button" class="add_btn"><span class="blind">하위 페이지 추가</span></button>
          <button type="button" class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
        </div>
      </div>
    </li>
    `;
  }

  function createLogItemInDepth(tit) {
    return `
      <li>
        <div class="log_doc_item" role="button" tabindex="0">
          <button type="button" class="arrow"><span class="blind">페이지 없음</span></button>
          <p class="tit">${tit}</p>

          <div class="btn_wrap">
            <button type="button" class="add_btn"><span class="blind">하위 페이지 추가</span></button>
            <button type="button" class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
          </div>
        </div>
      </li>
    `;
  }

  function handleAddItem(e) {
    e.preventDefault();
    e.stopPropagation();
    const addBtn = e.target.closest('.add_btn');
    if (!addBtn) return;

    const li = addBtn.closest('li');
    handleClickLogAddBtnInDepth(li, e);
  }



  async function loadLogsFromServer() {
    const documents = await fetchDocuments();
    documents.forEach(doc => {
      logList.insertAdjacentHTML('beforeend', createLogItem(doc.title));
    });
  }
  //추가 버튼 누르면 서버에도 POST
  async function handleClickLogAddBtn(e) {
    e.preventDefault();
    const btn = e.target.closest('#logAddBtn');
    if (!btn) return;

    const newDoc = await createDocument({ title: '새 운동 기록' });
    logList.insertAdjacentHTML('beforeend', createLogItem(newDoc.title));
  }

  //삭제 버튼 누르면 서버에도 DELETE
  async function handleDeleteItem(e) {
    e.preventDefault();
    e.stopPropagation();

    const deleteBtn = e.target.closest('.delete_btn');
    if (!deleteBtn) return;

    const li = deleteBtn.closest('li');
    const title = li.querySelector('.tit').textContent;

    const documents = await fetchDocuments();
    const matched = documents.find(doc => doc.title === title);
    if (matched) {
      await deleteDocument(matched.id);
    }

    li.remove();
  }
  // 하위 항목 추가 시에도 서버 연동 (데이터는 동기화 안 해도 되지만 예시로 POST)
  async function handleClickLogAddBtnInDepth(li, e) {
    e.preventDefault();
    const ulInDepth = document.createElement('ul');
    ulInDepth.classList.add('in_depth');

    const newChildDoc = await createDocument({ title: '하위 기록' });
    ulInDepth.insertAdjacentHTML('beforeend', createLogItemInDepth(newChildDoc.title));

    li.appendChild(ulInDepth);
  }

  // 초기 로드
  await loadLogsFromServer();

  logList.addEventListener('click', handleDeleteItem);
  logList.addEventListener('click', handleAddItem);
  logAddBtn.addEventListener('click', handleClickLogAddBtn);
}