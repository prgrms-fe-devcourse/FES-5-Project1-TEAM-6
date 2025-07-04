# 💪 헬스는 처음이라
<헬스는 처음이라> 는 운동 초보자가 부위별로 운동 정보를 탐색할 수 있는 반응형 웹 페이지입니다.


<br/>

## 🧩 주요 기능

|기능 구분 | 기능              | 설명 |
|--------|------------------|------|
|일반 | 모바일 반응형 지원 | 모바일 및 다양한 해상도 대응 |
|일반 | 모바일 반응형 메뉴 | 화면 폭이 좁을 때 햄버거 메뉴(☰)를 통해 메뉴를 열고 닫을 수 있음 |
|일반 | 스크롤 감지 | 스크롤 방향에 따라 네비게이션을 자동으로 숨기거나 보임 |
|일반 | 내비게이션 | 메뉴 클릭 시 페이지 이동 및 현재 위치 표시 (활성화 색상) |
|Home | 운동 검색 창 | 추천 자동 검색어 리스트로 출력 |
|Home | 운동 검색 결과 | 운동 리스트에서 일치하는 항목만 필터링 |
|Home | 탭 컨텐츠 | 운동 카테고리 별로 이동 가능 및 각 카테고리마다 운동 리스트 노출 |
|Home | 운동 더보기 버튼 | 기존 6개 항목이 보인 상태에서 '더보기' 버튼 클릭 시, 추가로 6개 항목이 출력 |
|Home | 좋아요 버튼 | 좋아하는 운동에 좋아요 버튼 활성 기능 |
|Home | 운동 상세 보기 | 상세보기 버튼 클릭 시 팝업창 출력 |
|Home | 운동 상세 팝업 | 운동 동영상 자동 재생 및 상세한 자세, 동작, 호흡법, 주의사항 안내 |
|Fitness Log | 운동 기록 목록 | 최초 로딩 시 저장된 운동 기록 리스트 불러오기 |
|Fitness Log | 운동 기록 목록 | 계층 구조로 구성 ( + 버튼을 통해 하위 기록 생성 가능) |
|Fitness Log | 운동 기록 목록 | 하위 기록 있을 경우 아코디언으로 목록 열기/닫기 가능 |
|Fitness Log | 운동 기록 추가 | 추가 기록 생성 시 가장 상단에 추가됨 (최신순 정렬) |
|Fitness Log | 운동 기록 삭제 | 목록 리스트에서 삭제 버튼 클릭 시 바로 삭제 가능 | 
|Fitness Log | 운동 기록 팝업 | 목록 리스트에서 기록 클릭 시 팝업으로 상세 내용 확인 가능 |
|Fitness Log | 운동 기록 수정 | 수정 버튼 클릭 시 에디터 / 미리보기 모드 활성화 (markdown) |
|Fitness Log | 운동 기록 저장 | 저장 버튼 클릭 시 수정한 기록 내용 저장 |
|Fitness Log | 운동 기록 삭제 | 삭제 버튼 클릭 시 해당 기록 삭제 및 팝업 닫힘 |
|Fitness Log | 운동 기록 임시 저장 | 작성 중인 내용은 localStorage에 저장되어 복구 가능 |
|Fitness Log | 운동 기록 팝업 제어 | ESC / 닫기 버튼을 통해 팝업 닫기 가능 |


## 🛠️ 서버 구동 방법
```bash
npm install
npm run serve:backend     // 백엔드 서버 실행
npm run serve:frontend    // 클라이언트 서버 실행
npm run start             // 서버와 클라이언트 동시 실행
```

## 🖥️ 사용 기술

- HTML5
- CSS3
- JavaScript

<br/>

## 📁 폴더 구조

```
📦 FES-5-PROJECT1-TEAM-6
├── 📁 backend
│   └── 📄 db.json                     # JSON Server용 DB 파일
├── 📁 frontend
│   ├── 📄 index.html                 # 메인 HTML 파일
│   ├── 📁 assets                     # 이미지, 영상, 아이콘
│   ├── 📁 css                        # 공통 및 스타일 관련 CSS
│   │   ├── 🎨 common.css
│   │   ├── 🎨 editor.css
│   │   ├── 🎨 logList.css
│   │   ├── 🎨 reset.css
│   │   └── 🎨 style.css
│   ├── 📁 js
│   │   ├── 📁 api
│   │   │   └── ⚙️ fitnessApi.js       # 운동 기록 관련 API 통신
│   │   ├── 📁 dom
│   │   │   ├── 🧱 fitnessLogTemplate.js # 운동 기록 DOM 템플릿
│   │   │   └── 🧱 homeTemplate.js       # 홈 화면 템플릿
│   │   ├── 📁 pages
│   │   │   ├── 📄 fitnessLog.js       # 운동 기록 페이지 로직
│   │   │   └── 📄 home.js             # 홈 화면 로직
│   │   ├── 📁 router
│   │   │   └── 🔀 router.js           # 라우팅 제어
│   │   ├── ⚙️ card.js                # 운동 카드 생성
│   │   ├── ✏️ editor.js              # 에디터 관련 기능
│   │   ├── 📊 exerciseData.js        # 운동 데이터 모음
│   │   ├── 🧭 header.js              # 상단 네비게이션 제어
│   │   ├── 🚀 hero.js                # Hero section 애니메이션
│   │   ├── 📍 index.js               # JS 진입점
│   │   ├── 📝 logList.js             # 운동 기록 리스트 렌더링
│   │   ├── 📦 popup.js               # 팝업 기능 통합 제어
│   │   ├── 🔍 search.js              # 검색창 동작
│   │   └── 📚 tab.js                 # 운동 탭 제어
│   └── 📁 lib                        # 라이브러리 모음
└── 📄 README.md

```


<br/>

## 📸 화면 예시
### Home 화면

![메인화면](https://github.com/user-attachments/assets/1b6cfb49-023c-4b76-a033-2f8feca9db50)

### Fitness Log 화면

![운동기록화면](https://github.com/user-attachments/assets/0fa204b6-427a-4c0a-b821-76e5e20d7bee)
※ 위 이미지는 프로젝트 실제 실행 화면입니다.

<br/>


## 👨‍💻 개발자 (프론트엔드 5기 6조)

| 이름   | 역할         |
|--------|--------------|
| 노동연 | 팀장         |
| 정은진 | 팀원         |
| 박진강 | 팀원         |
| 김아현 | 팀원         |
| 최정은 | 팀원         |

