export function insertHomeTemplate() {
  const template = document.createElement('template');
  template.id = 'homeTemplate';

  template.innerHTML = /* html */`
    <!-- 비주얼 영역 -->
    <section class="hero_section">
      <div class="hero_inner">
        <div class="hero_text">
          <strong>헬스가 처음인 당신을 위해</strong>
          <h2>궁금한 운동 정보를<br />검색해보세요!</h2>
          <p>헬린이를 위한 맞춤 운동 정보를 제공해 드립니다.</p>
        </div>
        <div class="hero_image">
          <div class="slider_wrapper">
            <div class="slider_track">
              <img src="./assets/images/hero/healthPhoto-01.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-02.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-03.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-04.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-05.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-06.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-01.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-02.jpg" alt="" />
              <img src="./assets/images/hero/healthPhoto-03.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--검색 영역 -->
    <section class="search_section">
      <!-- 검색 창 -->
      <div class="search_bar">
        <div class="input_wrapper">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            class="search_input_wrapper"
            placeholder="운동 이름을 검색해보세요"
          />
          <ul class="autocomplete_list"></ul>
          <!-- <li></li> -->
        </div>
      </div>

      <div class="result_wrap">
        <h3 class="sub_tit">검색 결과</h3>

        <ul class="card_wrap">
          <!-- JS로 이미지 동적으로 -->
        </ul>
      </div>

      <!-- 탭 컨텐츠 -->
      <div class="result_wrap">
        <h3 class="sub_tit">부위별 운동</h3>
      
        <div class="tab_wrap">
          <ul class="tab_menu">
            <li class="active"><button role="tab">등</button></li>
            <li><button role="tab">팔</button></li>
            <li><button role="tab">가슴</button></li>
            <li><button role="tab">하체</button></li>
            <li><button role="tab">유산소</button></li>
          </ul>

          <div class="tab_cont_wrap">
            <div class="tab_cont active">
              <ul class="card_wrap">
              </ul>

              <div class="more_btn_wrap">
                <button class="more_btn">더보기</button>
              </div>
            </div>

            <div class="tab_cont">
              <ul class="card_wrap">
              </ul>

              <div class="more_btn_wrap">
                <button class="more_btn">더보기</button>
              </div>
            </div>

            <div class="tab_cont">
              <ul class="card_wrap">
              </ul>

              <div class="more_btn_wrap">
                <button class="more_btn">더보기</button>
              </div>
            </div>

            <div class="tab_cont">
              <ul class="card_wrap">
              </ul>

              <div class="more_btn_wrap">
                <button class="more_btn">더보기</button>
              </div>
            </div>

            <div class="tab_cont">
              <ul class="card_wrap">
              </ul>

              <div class="more_btn_wrap">
                <button class="more_btn">더보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.body.appendChild(template);
}