export function insertFitnessLogTemplate() {
  const template = document.createElement('template');
  template.id = 'fitnessLogTemplate';

  template.innerHTML = /* html */`
    <section class="log_section">
      <h3 class="sub_tit">운동 기록 🏋️</h3>

      <div class="log_bar">
        <button type="button" class="log_addbtn" id="logAddBtn">기록 추가 +</button>

        <ul class="log_list">
          <li>
            <div class="log_doc_item" role="button" tabindex="0">
              <button class="arrow"><span class="blind">페이지 없음</span></button>
              <p class="tit">제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비제목이 길어질 경우를 대비</p>

              <div class="btn_wrap">
                <button class="add_btn"><span class="blind">하위 페이지 추가</span></button>
                <button class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
              </div>
            </div>
          </li>
          <li>
            <div class="log_doc_item" role="button" tabindex="0">
              <button class="arrow rotate"><span class="blind">하위 페이지 있음</span></button>
              <p class="tit">제목이 길어질 경우를 대비제목이 길어질 경우를 대비</p>

              <div class="btn_wrap">
                <button class="add_btn"><span class="blind">하위 페이지 추가</span></button>
                <button class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
              </div>
            </div>

            <ul class="in_depth">
              <li>
                <div class="log_doc_item" role="button" tabindex="0">
                  <button class="arrow"><span class="blind">하위 페이지 없음</span></button>
                  <p class="tit">제목이 길어질 경우를 대비제목이 길어질 경우를 대비</p>

                  <div class="btn_wrap">
                    <button class="add_btn"><span class="blind">하위 페이지 추가</span></button>
                    <button class="delete_btn"><span class="blind">해당 페이지 삭제</span></button>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div> 
    </section>
  `;

  document.body.appendChild(template);
}