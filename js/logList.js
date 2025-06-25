export function initFitness() {
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

  function handleClickLogAddBtn() {
    logList.insertAdjacentHTML('beforeend', createlogItem('데이터 받아야함'));
  }

  function handleAddItem(e){
    if(e.target.classList.contains('add_btn')){
      const li = e.target.closest('li');
      handleClickLogAddBtnInDepth(li);
    }
  }

  function handleClickLogAddBtnInDepth(li) {
    const ulInDepth = document.createElement('ul');
    ulInDepth.classList.add('in_depth');

    li.appendChild(ulInDepth);

    ulInDepth.insertAdjacentHTML('beforeend', createlogItemInDepth('하위 뎁스 연결 받아야함'));
  }

  function handleDeleteItem(e){
    if(e.target.classList.contains('delete_btn')){
      const li = e.target.closest('li');
      li.remove();
    }
  }
  

  logList.addEventListener('click', handleDeleteItem);
  logList.addEventListener('click', handleAddItem);
  logAddBtn.addEventListener('click', handleClickLogAddBtn);
}