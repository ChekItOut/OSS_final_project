# 🌍 Global Weather Information

AI가 분석해주는 실시간 날씨 정보 서비스

## 📌 프로젝트 소개

사용자가 입력한 도시의 실시간 날씨를 조회하고, Gemini AI가 날씨에 따른 주의사항을 분석해주는 웹 애플리케이션입니다. React 프론트엔드와 Spring Boot 백엔드가 REST API로 통신하는 구조로 설계되었습니다.

## ✨ 주요 기능

- **실시간 날씨 조회**: 도시명을 입력하여 현재 날씨 정보 확인
- **AI 날씨 분석**: Gemini AI가 날씨에 따른 맞춤형 조언 제공
- **검색 기록 관리**: 과거 검색한 날씨 기록 저장 및 조회
- **기록 삭제**: 저장된 검색 기록 전체 삭제 기능
- **반응형 UI**: 우주 테마의 세련된 글래스모피즘 디자인

## 🛠️ 기술 스택

### Frontend
- **React** 18.x
- **React Router DOM** - 페이지 라우팅
- **CSS3** - 커스텀 스타일링 (글래스모피즘, 네온 효과)
- **Google Fonts** - Playfair Display, Inter

### Backend
- **Spring Boot** - REST API 서버
- **Railway** - 백엔드 배포 플랫폼

### API
- **OpenWeather API** - 실시간 날씨 데이터
- **Gemini AI** - 날씨 분석 및 조언 생성

## 📁 프로젝트 구조

```
src/
├── App.js              # 메인 앱 컴포넌트 (라우팅 설정)
├── App.css             # 전역 스타일시트
├── MainPage.js         # 메인 페이지 (검색 화면)
├── ResultPage.js       # 날씨 결과 페이지
├── HistoryPage.js      # 검색 기록 페이지
├── index.js            # React 진입점
└── index.css           # 기본 스타일
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 14.x 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone [repository-url]
cd [project-name]
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm start
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

## 🌐 API 엔드포인트

백엔드 서버: `https://weatherserverpublish-production-6ce6.up.railway.app`

### 날씨 조회
```
GET /weather/{city}
```
**응답 예시:**
```json
{
  "city": "Seoul",
  "temperature": 15.2,
  "humidity": 65,
  "description": "Clear sky",
  "text": "맑은 날씨입니다. 외출하기 좋은 날씨네요!"
}
```

### 검색 기록 조회
```
GET /weather/history
```

### 전체 기록 삭제
```
DELETE /weather/deleteAll
```

## 🎨 디자인 특징

- **다크 모드**: 우주 배경 이미지와 다크 테마
- **글래스모피즘**: 반투명 유리 효과의 카드 디자인
- **네온 효과**: 라임 컬러 강조색과 글로우 효과
- **부드러운 애니메이션**: 호버 효과 및 트랜지션

### 컬러 팔레트
- 배경: `#050505`
- 강조색: `#ccff00` (네온 라임)
- 텍스트: `#ffffff`, `#9ca3af`
- 유리 효과: `rgba(255, 255, 255, 0.05)`

## 📱 페이지 구성

### 1. 메인 페이지 (`/`)
- 대형 타이포그래피 헤더
- 도시 검색 입력창
- 검색 기록 바로가기 링크

### 2. 결과 페이지 (`/weather/:city`)
- 날씨 아이콘 및 도시명
- 온도, 습도 정보
- Gemini AI 분석 결과

### 3. 기록 페이지 (`/history`)
- 과거 검색 기록 리스트
- 전체 삭제 버튼
- 각 기록별 날씨 요약 정보

## 🔧 주요 기능 설명

### 날씨 아이콘 매핑
```javascript
const getWeatherIcon = (description) => {
  // Clear -> ☀️
  // Cloud -> ☁️
  // Rain -> 🌧️
  // Snow -> ❄️
  // Thunder -> ⚡
}
```

### 검색 기록 관리
- 서버에 자동 저장
- 도시명, 온도, 습도, 날씨 설명 포함
- 한 번의 클릭으로 전체 삭제 가능


## 👥 개발자

- Frontend: React
- Backend: Spring Boot
