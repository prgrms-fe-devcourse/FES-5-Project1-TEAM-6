import { handlePopupEvents } from "../../js/editor.js"

export function insertFitnessLogTemplate() {
  const template = document.createElement('template');
  template.id = 'fitnessLogTemplate';

  template.innerHTML = /* html */`
    <section class="log_section">
      <h3 class="sub_tit">운동 기록 🏋️</h3>

      <div class="log_bar">
        <button type="button" class="log_addbtn" id="logAddBtn">기록 추가 +</button>

        <ul class="log_list">
         
        </ul>
      </div> 
    </section>
  `;

  document.body.appendChild(template);
}

// 이벤트 등록
const cardContainer = document.querySelector('.log_list');
cardContainer.addEventListener('click', handlePopupEvents);