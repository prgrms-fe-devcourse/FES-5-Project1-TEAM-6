import { fetchDocuments, createDocument, deleteDocument } from './api/fitnessApi.js';

export async function initFitness() {
  const logList = document.querySelector('.log_list');
  const logAddBtn = document.querySelector('#logAddBtn');

  function createlogItem(tit) {
    return `
    <li>
      <div class="log_doc_item" role="button" tabindex="0">
        <button class="arrow"><span class="blind">페이지 없음</span></button>
        <p class="tit">${tit}</p>

        <div class="btn_wrap">
          <button class="add_btn"><span class="blind">하위 페이지 추가</span></button>
          <button class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
        </div>
      </div>
    </li>
    `;
  }

  function createlogItemInDepth(tit) {
    return `
      <li>
        <div class="log_doc_item" role="button" tabindex="0">
          <button class="arrow"><span class="blind">하위 페이지 없음</span></button>
          <p class="tit">${tit}</p>

          <div class="btn_wrap">
            <button class="add_btn"><span class="blind">하위 페이지 추가</span></button>
            <button class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
          </div>
        </div>
      </li>
    `;
  }

  // function handleClickLogAddBtn() {
  //   logList.insertAdjacentHTML('beforeend', createlogItem('데이터 받아야함'));
  // }

  function handleAddItem(e){
    if(e.target.classList.contains('add_btn')){
      const li = e.target.closest('li');
      handleClickLogAddBtnInDepth(li);
    }
  }

  // function handleClickLogAddBtnInDepth(li) {
  //   const ulInDepth = document.createElement('ul');
  //   ulInDepth.classList.add('in_depth');

  //   li.appendChild(ulInDepth);

  //   ulInDepth.insertAdjacentHTML('beforeend', createlogItemInDepth('하위 뎁스 연결 받아야함'));
  // }

  // function handleDeleteItem(e){
  //   if(e.target.classList.contains('delete_btn')){
  //     const li = e.target.closest('li');
  //     li.remove();
  //   }
  // }
  
async function loadLogsFromServer() {
    const documents = await fetchDocuments();
    documents.forEach(doc => {
      logList.insertAdjacentHTML('beforeend', createlogItem(doc.title));
    });
  }

  //추가 버튼 누르면 서버에도 POST
  async function handleClickLogAddBtn() {
    const newDoc = await createDocument({ title: '새 운동 기록' });
    logList.insertAdjacentHTML('beforeend', createlogItem(newDoc.title));
  }

  // 🔥삭제 버튼 누르면 서버에도 DELETE
  async function handleDeleteItem(e) {
    if (e.target.classList.contains('delete_btn')) {
      const li = e.target.closest('li');
      const title = li.querySelector('.tit').textContent;

      // title로 해당 문서를 찾기 (실제 구현에서는 ID를 써야 함)
      const documents = await fetchDocuments();
      const matched = documents.find(doc => doc.title === title);
      if (matched) {
        await deleteDocument(matched.id);
      }

      li.remove();
    }
  }

  // 하위 항목 추가 시에도 서버 연동 (데이터는 동기화 안 해도 되지만 예시로 POST)
  async function handleClickLogAddBtnInDepth(li) {
    const ulInDepth = document.createElement('ul');
    ulInDepth.classList.add('in_depth');

    const newChildDoc = await createDocument({ title: '하위 기록' });
    ulInDepth.insertAdjacentHTML('beforeend', createlogItemInDepth(newChildDoc.title));

    li.appendChild(ulInDepth);
  }

  // 초기 로드
  await loadLogsFromServer();


  logList.addEventListener('click', handleDeleteItem);
  logList.addEventListener('click', handleAddItem);
  logAddBtn.addEventListener('click', handleClickLogAddBtn);
}