export function insertFitnessLogTemplate() {
  const template = document.createElement('template');
  template.id = 'fitnessLogTemplate';

  template.innerHTML = /* html */`
    <section class="log_section">
      <h3 class="sub_tit">운동 기록 🏋️</h3>
      <button type="button" id="logAddBtn">기록 추가 +</button>

      <ul class="log_list">
        <li>
          <div class="log_card" tabindex="0" role="button">
            <span class="date">25/06/24</span>
            <span class="tit">데드리프트 참 재밌었다 하핳</span>
            <button class="log_card_delete"><span class="blind">삭제</span></button>
          </div>
        </li>
      </ul>
    </section>
  `;

  document.body.appendChild(template);
}