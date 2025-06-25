import { fetchDocuments, createDocument, deleteDocument } from './api/fitnessApi.js';

export async function initFitness() {
  const logList = document.querySelector('.log_list');
  const logAddBtn = document.querySelector('#logAddBtn');

  function createLogItem(id, tit) {
    return `
      <li>
        <div class="log_doc_item" role="button" tabindex="0" data-id="${id}">
          <button type="button" class="arrow" disabled><span class="blind">아코디언</span></button>
          <p class="tit">${tit}</p>
          <div class="btn_wrap">
            <button type="button" class="add_btn"><span class="blind">하위 페이지 추가</span></button>
            <button type="button" class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
          </div>
        </div>
      </li>
    `;
  }

  function createLogItemInDepth(id, tit) {
    return `
      <li>
        <div class="log_doc_item" role="button" tabindex="0" data-id="${id}">
          <button type="button" class="arrow" disabled><span class="blind">아코디언</span></button>
          <p class="tit">${tit}</p>
          <div class="btn_wrap">
            <button type="button" class="add_btn"><span class="blind">하위 페이지 추가</span></button>
            <button type="button" class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
          </div>
        </div>
      </li>
    `;
  }

  // 문서 불러와서 렌더링 시 .arrow가 없거나 자식이 없으면 disabled 유지
  async function loadLogsFromServer() {
    const documents = await fetchDocuments();
    logList.innerHTML = ''; // 초기화

    documents.forEach(doc => {
      logList.insertAdjacentHTML('beforeend', createLogItem(doc.id, doc.title));
    });

    logList.querySelectorAll('li').forEach(li => {
      const arrowBtn = li.querySelector('.arrow');
      const ulInDepth = li.querySelector('ul.in_depth');
      if (!ulInDepth) {
        arrowBtn.setAttribute('disabled', '');
        arrowBtn.classList.remove('rotate');
      } else {
        arrowBtn.removeAttribute('disabled');
      }
    });
  }

  // 루트 문서 추가
  async function handleClickLogAddBtn(e) {
    e.preventDefault();
    const btn = e.target.closest('#logAddBtn');
    if (!btn) return;

    const newDoc = await createDocument({ title: '새 운동 기록' });
    logList.insertAdjacentHTML('beforeend', createLogItem(newDoc.id, newDoc.title));
    // 새로 추가된 li의 arrow는 기본적으로 disabled (createLogItem에서 이미 disabled)
  }

  // 하위 문서 추가
  async function handleClickLogAddBtnInDepth(li, e) {
    e.preventDefault();

    // 하위 ul.in_depth 가 없으면 생성
    let ulInDepth = li.querySelector('ul.in_depth');
    if (!ulInDepth) {
      ulInDepth = document.createElement('ul');
      ulInDepth.classList.add('in_depth');
      li.appendChild(ulInDepth);
    }

    const newChildDoc = await createDocument({ title: '새 운동 기록' });
    ulInDepth.insertAdjacentHTML('beforeend', createLogItemInDepth(newChildDoc.id, newChildDoc.title));

    // 하위 문서가 생겼으니 arrow 버튼 활성화 & 회전 추가
    const toggleBtn = li.querySelector('.arrow');
    if (toggleBtn) {
      toggleBtn.removeAttribute('disabled');
      toggleBtn.classList.add('rotate');
    }
  }

  // 하위 페이지 추가 버튼 클릭 핸들러
  function handleAddItem(e) {
    e.preventDefault();
    const addBtn = e.target.closest('.add_btn');
    if (!addBtn) return;

    const li = addBtn.closest('li');
    handleClickLogAddBtnInDepth(li, e);
  }

  // 삭제 처리 (기존 유지)
  async function handleDeleteItem(e) {
    e.preventDefault();

    const deleteBtn = e.target.closest('.delete_btn');
    if (!deleteBtn) return;

    const li = deleteBtn.closest('li');
    const parentUl = li.parentElement;
    const title = li.querySelector('.tit').textContent;

    const documents = await fetchDocuments();
    const matched = documents.find(doc => doc.title === title);
    if (matched) {
      await deleteDocument(matched.id);
    }

    li.remove();

    const liCount = parentUl.querySelectorAll('li').length;
    if (liCount === 0) {
      const parentLi = parentUl.closest('li');
      parentUl.remove();

      if (parentLi) {
        const arrowBtn = parentLi.querySelector('.arrow');
        if (arrowBtn) {
          arrowBtn.classList.remove('rotate');
          arrowBtn.setAttribute('disabled', '');
        }
      }
    }
  }

  // 아코디언 토글
  function toggleAccordion(e) {
    e.preventDefault();

    const toggleBtn = e.target.closest('.arrow');
    if (!toggleBtn) return;

    const li = toggleBtn.closest('li');
    if (!li) return;

    const ulInDepth = li.querySelector('ul.in_depth');

    if (!ulInDepth) {
      toggleBtn.setAttribute('disabled', '');
      toggleBtn.classList.remove('rotate');
      return;
    } else {
      toggleBtn.removeAttribute('disabled');

      const isVisible = ulInDepth.style.display === 'block' || ulInDepth.style.display === '';

      if (isVisible) {
        ulInDepth.style.display = 'none';
        toggleBtn.classList.remove('rotate');
      } else {
        ulInDepth.style.display = 'block';
        toggleBtn.classList.add('rotate');
      }
    }
  }

  // 초기 실행
  await loadLogsFromServer();

  logList.addEventListener('click', handleDeleteItem);
  logList.addEventListener('click', handleAddItem);
  logList.addEventListener('click', toggleAccordion);
  logAddBtn.addEventListener('click', handleClickLogAddBtn);
}
