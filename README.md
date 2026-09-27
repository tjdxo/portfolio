# 김성태 | Personal Portfolio

서울시립대학교 전자전기컴퓨터공학부 김성태의 개인 포트폴리오입니다. 취업 및 자기소개를 위해 문제를 발견하고 정의한 과정, 직접 맡은 역할과 프로젝트 결과를 정리합니다.

- 저장소: [tjdxo/portfolio](https://github.com/tjdxo/portfolio)
- GitHub: [@tjdxo](https://github.com/tjdxo)
- 이메일: rlatjdxo951@gmail.com
- 배포 URL: 배포 확인 후 기입
- GitHub Pages 사용 여부: 미확인. 저장소에 배포 workflow나 별도 도메인 설정은 없습니다. GitHub의 Pages 설정은 별도 확인이 필요합니다.

## 사용 기술

HTML / CSS / JavaScript. 프레임워크, 외부 라이브러리, 패키지 설치나 빌드 과정 없이 실행하는 정적 웹사이트입니다. Skills에 적힌 기술은 개인 경험 목록이며 이 사이트의 의존성이 아닙니다.

## 페이지 구성

1. Header / Navigation
2. Hero — 소개, 관심 분야, Projects와 GitHub 링크
3. Selected Projects — Flat-on, UOSLIFE / 시대생, Energy AI Workflow Hackathon, Speaker Verification / OpenLab
4. Experience — 조직, 역할과 책임 중심의 요약
5. Awards & Recognition — 연도별 수상 내역
6. Skills — 카테고리별 기술 목록
7. Education — 서울시립대학교 전자전기컴퓨터공학부
8. Footer — 이메일과 맨 위로 이동 링크

About은 Hero에 통합했습니다. 별도의 Contact 영역·메뉴·폼은 두지 않으며, 이메일은 푸터의 `mailto:` 링크로만 제공합니다. 링크는 방문자의 이메일 앱을 열며 서버에서 메시지를 전송하지 않습니다.

프로젝트는 `index.html`에서 직접 관리합니다. 각 항목은 배경·문제, 수행 내용, 결과 또는 현재 탐구 주제, 키워드 순서로 구성합니다. 진행 중인 Speaker Verification은 완료 성과로 표현하지 않습니다.

## 디자인과 접근성

- 밝은 배경, 짙은 본문과 녹색 포인트, 얇은 구분선 중심의 레이아웃
- 데스크톱·태블릿 프로젝트 2열, 767px 이하 모바일 1열
- 카드·배지·그림자·등장 애니메이션 없이 콘텐츠 위계와 여백으로 구분
- 모바일 접이식 메뉴, Escape 닫기와 키보드 초점 관리
- 본문 바로가기, 시맨틱 제목, 명확한 포커스 표시
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
├── index.html               # 소개, 프로젝트, 경력과 수상 내용
├── css/style.css            # 레이아웃, 반응형, 접근성 및 인쇄 스타일
├── js/main.js               # 모바일 내비게이션
├── images/
│   ├── profile.jpg          # 기존 원본 사진 보관 (현재 화면에서는 미사용)
│   ├── screenshot-desktop.png
│   └── screenshot-mobile.png
└── README.md
```

## 화면 미리보기

[데스크톱 전체 화면](images/screenshot-desktop.png) · [모바일 전체 화면](images/screenshot-mobile.png)

## 콘텐츠 보완

- LinkedIn: 실제 URL이 있을 때만 푸터에 추가합니다.
- 프로젝트 이미지: 실제 장치·서비스·Workflow 화면을 준비한 후 해당 article에 설명과 함께 추가합니다. 원본 비율, 이미지 크기, 의미 있는 대체 텍스트를 지정합니다.
- 프로젝트 URL: 공개 가능한 저장소, 서비스 또는 발표 자료의 실제 링크를 각 프로젝트에 추가합니다.
- 기간: UOSLIFE의 정확한 활동 기간, Flat-on 활동 기간과 재학 기간은 확인 후 기입합니다.
- 이력서: 실제 PDF를 준비한 뒤 Hero에 링크를 추가할 수 있습니다.
- 특허 출원과 OpenLab 진행 상황은 변경될 때 갱신합니다.

## 배포

GitHub Pages에서 별도 빌드 없이 서비스할 수 있는 구조입니다. Pages를 사용할 경우 저장소 Settings → Pages에서 배포 소스를 `main` 브랜치의 `/(root)`로 지정하고, 배포 완료 후 표시되는 실제 URL을 위의 배포 URL 항목에 기입합니다. 이 저장소 수정만으로 Pages 활성화나 배포 성공을 의미하지는 않습니다.

## 검증

Chromium에서 320 / 390 / 768 / 1024 / 1440px 너비의 가로 넘침, 프로젝트 4개 표시, 내부 링크를 확인했습니다. 모바일 메뉴 열기·닫기, Escape, 목적지 초점 이동, 동작 줄이기 설정과 JavaScript 비활성화 상태의 내비게이션을 확인했습니다. JavaScript 구문 검사와 `git diff --check`도 수행했습니다.
