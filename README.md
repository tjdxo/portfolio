# 김성태 | Personal Portfolio

서울시립대학교 전자전기컴퓨터공학부 김성태의 개인 포트폴리오입니다. 취업 및 자기소개를 위해 문제를 발견하고 정의한 과정, 직접 맡은 역할과 프로젝트 결과를 정리합니다.

- 저장소: [tjdxo/portfolio](https://github.com/tjdxo/portfolio)
- GitHub: [@tjdxo](https://github.com/tjdxo)
- 이메일: rlatjdxo951@gmail.com
- 배포 URL: https://tjdxo.github.io/portfolio/
- GitHub Pages 사용 중. 배포 사이트의 HTML·CSS·JavaScript 응답과 브라우저 동작을 확인했습니다.

## 사용 기술

HTML / CSS / JavaScript. 프레임워크, 외부 라이브러리, 패키지 설치나 빌드 과정 없이 실행하는 정적 웹사이트입니다. Skills에 적힌 기술은 개인 경험 목록이며 이 사이트의 의존성이 아닙니다.

## 페이지 구성

1. Header / Navigation
2. Hero — 왼쪽 프로필 사진, 이름·소속·소개와 이메일
3. Skills — 카테고리별 기술 목록
4. Awards — 2021 → 2025 → 2026 연도 오름차순 수상 내역
5. Projects — 제목 목차와 프로젝트 상세: UOSLIFE / 시대생 → Flat-on → Energy AI Workflow → On-Device VLM Optimization → Speaker Verification / OpenLab
6. Footer — 오른쪽 정렬된 `© 2026 김성태` 이메일 링크 (주소는 마우스를 올리면 표시)

400px 초과 스크롤 시 오른쪽 아래에 작은 맨 위로 이동 버튼이 고정 표시됩니다.

About은 Hero에 통합했습니다. 학교와 전공은 소개에 표시하며 별도 Education은 두지 않습니다. 상단 메뉴도 Skills → Awards → Projects 순서입니다. 별도의 Contact 영역·메뉴·폼은 두지 않으며, 이메일은 소개와 푸터의 `mailto:` 링크로 제공합니다. 링크는 방문자의 이메일 앱을 열며 서버에서 메시지를 전송하지 않습니다.

프로젝트는 `index.html`에서 직접 관리합니다. 배경·참여 내용·결과를 중심으로 분량과 소제목을 맞추며, 진행 중인 SV는 결과 대신 진행 상황을 표시합니다. 프로젝트 제목 목차에서 각 상세 항목으로 이동할 수 있습니다. 별도 Experience는 프로젝트와 중복되어 두지 않습니다. 진행 중인 Speaker Verification은 완료 성과로 표현하지 않습니다.

VLM은 2026.03–2026.06 전자전기컴퓨터공학종합설계 / SW 산학협력의 Academic Project입니다. 입력 해상도와 CLIP 기반 영역 선택을 실험하고 정확도·token·latency·메모리의 trade-off를 분석한 경험으로 소개합니다. VStar·HRBench 수치는 비슷한 token budget의 720px 입력과 비교한 실험 결과이며, TreeBench의 제한적인 개선과 crop 증가에 따른 비용도 함께 기록합니다. SV는 현재 진행 중인 학습·탐구로 마지막에 배치합니다.

## 디자인과 접근성

- 흰 배경, 무채색 본문과 얇은 구분선 중심의 레이아웃
- 데스크톱·태블릿 프로젝트 2열, 767px 이하 모바일 1열
- 카드·배지·그림자·등장 애니메이션 없이 콘텐츠 위계와 여백으로 구분
- 모바일 햄버거 아이콘 메뉴(열면 닫기 아이콘), 스크린리더용 이름, Escape 닫기와 키보드 초점 관리
- 파란색 장식은 Skills·Awards·Projects 제목 위의 짧은 선에만 사용
- 섹션 제목은 36px(모바일 30px), 프로젝트 제목은 23px(모바일 21px)로 위계 구분
- 본문 바로가기, 시맨틱 제목, 명확한 포커스 표시
- hover 시 색상 변경이나 이동 효과 없이 링크 밑줄만 표시
- `prefers-reduced-motion`에 따라 부드러운 스크롤 해제
- JavaScript 없이도 콘텐츠와 내비게이션 이용 가능
- 인쇄 시 내비게이션과 불필요한 버튼 숨김

## 실행 방법

저장소를 내려받은 뒤 `index.html`을 브라우저로 열면 됩니다. 로컬 서버를 사용하려면 저장소 루트에서 다음 명령을 실행합니다.

```sh
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`에 접속합니다. VS Code의 Live Server도 사용할 수 있습니다.

## 파일 구성

```text
portfolio/
├── index.html               # 소개, 프로젝트와 수상 내용
├── css/style.css            # 레이아웃, 반응형, 접근성 및 인쇄 스타일
├── js/main.js               # 모바일 내비게이션
├── images/
│   ├── profile.jpg          # Hero 프로필 사진
│   ├── screenshot-desktop.png
│   └── screenshot-mobile.png
└── README.md
```

## 화면 미리보기

[데스크톱 전체 화면](images/screenshot-desktop.png) · [모바일 전체 화면](images/screenshot-mobile.png)

## 콘텐츠 보완

- LinkedIn: 실제 URL이 있을 때만 푸터에 추가합니다.
- 프로젝트 이미지: VLM에는 `images/clip_guided grid.png`와 방식 설명 캡션을 표시합니다. 이미지를 누르면 새 탭에서 원본을 확인할 수 있습니다. 다른 프로젝트도 실제 장치·서비스·Workflow 화면을 준비한 후 해당 article에 설명과 함께 추가합니다. 원본 비율, 이미지 크기, 의미 있는 대체 텍스트를 지정합니다.
- 프로젝트 URL: 공개 가능한 저장소, 서비스 또는 발표 자료의 실제 링크를 각 프로젝트에 추가합니다.
- 프로젝트 기간: 시대생 2021.09 – 2022.07, Flat-on 2025.09 – 2025.11, Energy AI 2026.01, VLM 2026.03 – 2026.06, SV 2026.09 – 현재.
- 이력서: 실제 PDF를 준비한 뒤 Hero에 링크를 추가할 수 있습니다.
- 특허 출원과 OpenLab 진행 상황은 변경될 때 갱신합니다.

## 배포

CSS 또는 JavaScript를 변경한 뒤 커밋하기 전에 아래 명령을 실행합니다. 파일 내용의 해시를 `index.html`의 CSS·JS 주소에 붙여, 배포 후 이전 캐시와 새 HTML이 섞이지 않게 합니다. 빌드나 패키지 설치는 필요하지 않습니다.

```sh
node scripts/update-asset-versions.cjs
```

GitHub Pages 응답은 현재 `Cache-Control: max-age=600`을 사용합니다. HTML 자체가 캐시된 경우 새 배포가 잠시 늦게 보일 수 있지만, 새 HTML을 받은 이후에는 해당 버전의 CSS·JS를 요청합니다.

GitHub Pages에서 별도 빌드 없이 서비스할 수 있는 구조입니다. Pages를 사용할 경우 저장소 Settings → Pages에서 배포 소스를 `main` 브랜치의 `/(root)`로 지정하고, 배포 완료 후 표시되는 실제 URL을 위의 배포 URL 항목에 기입합니다. 이 저장소 수정만으로 Pages 활성화나 배포 성공을 의미하지는 않습니다.

## 검증

Chromium에서 320 / 390 / 768 / 1024 / 1440px 너비의 가로 넘침, 프로젝트 5개 표시, 내부 링크를 확인했습니다. 모바일 메뉴 열기·닫기, Escape, 목적지 초점 이동, 동작 줄이기 설정과 JavaScript 비활성화 상태의 내비게이션을 확인했습니다. JavaScript 구문 검사와 `git diff --check`도 수행했습니다.

GitHub Pages 프로젝트 사이트와 같은 `/portfolio/` 하위 경로에서 HTTP로 검증했습니다. CSS·JavaScript·이미지의 상대 경로, 파일명 대소문자, 공백을 `%20`으로 인코딩한 이미지 원본 링크가 정상 동작합니다. `/portfolio/index.html` 및 섹션 해시로 직접 접근하는 경우도 확인했습니다. 실제 GitHub Pages 배포 성공 여부는 별도 확인이 필요합니다.
