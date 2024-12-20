<div align="center">
<img src="https://github.com/user-attachments/assets/18374c51-18c3-4413-8209-3b3db42197a3" width="600"/>
  <br/>
<img src='./frontend/src/assets/about/main-bg.png' width="100" height="auto"/>
  
### 경매 기반의 중고 안심 거래 플랫폼 🖍️

[<img src="https://img.shields.io/badge/release-v0.0.0-ㅎㄱㄷ두?style=flat&logo=google-chrome&logoColor=white" />]() 
<br/> [<img src="https://img.shields.io/badge/프로젝트 기간-2024.08.19~2024.09.11-fab2ac?style=flat&logo=&logoColor=white" />]() <br/>
<img src="https://img.shields.io/badge/특화 프로젝트 우수상-FFD700?style=for-the-badge&logo=award&logoColor=white" alt="우수상">

</div> 


## 📝 목차
- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 담당 역할](#2-담당-역할)
- [3. 프로젝트 화면 구성](#3-프로젝트-화면-구성)
- [4. 내가 사용한 기술 스택](#4-사용한-기술-스택)
- [5. 기술적 이슈와 해결 과정](#5-기술적-이슈와-해결-과정)
- [6. 팀원](#6-팀원)

다음과 같은 목차로 구성되어 있습니다.

<br />

## 🚀 프로젝트 개요
💡 **SSAFY 금융망 활용한 거래 시나리오**
- 1원 인증, 계좌생성, 입금, 출금, 이체 등 거래 시나리오

💡 **에스크로 결제**
- 에스크로 서비스 제공자가 대금을 보관
- 구매자가 상품 확인 후 판매자에게 지급하는 안전한 결제 방식

💡 **비크리 경매**
- 가장 높은 입찰자가 낙찰받되, 두 번째로 높은 가격을 지불하는 경매 방식

💡 **실시간 택배 현황 조회**
- Delivery-Tracker API를 활용한 실시간 택배 현황 조회

💡 **거래 완료 알람 문자 서비스**
- coolSMS API를 사용한 거래 완료 알람 문자 서비스

💡 **판매자와 거래자간 1:1 채팅 서비스**
- stomp + kafka를 사용한 채팅 서비스

💡 **챗봇 서비스**
- Flask와 ChatGPT를 사용한 챗봇 서비스

<br />

## 👨‍💻 담당 역할
💡 **에스크로 결제 로직 개발**
- SpringBoot와 JPA를 활용

💡 **SSAFY 금융망 API 호출 로직 개발**
- webClient를 사용하여 비동기적으로 SSAFY 금융망 API 호출을 관리하는 로직 분리

💡 **거래 페이지 개발**

💡 **실시간 택배 현황 조회**
- Delivery-Tracker 사용


<br />

## 🖥️ 화면 구성
|경매 페이지|
|:---:|
|<img src="https://github.com/user-attachments/assets/b6e62676-7c10-47dd-9422-f8c3a357303c" width="450"/>|
|Spring Batch를 사용하여 설정된 시간에 자동 종료|


|경매 상세 페이지|
|:---:|
|<img src="https://github.com/user-attachments/assets/057b4656-2417-4113-bb65-c80b1a04f160" width="450"/>|
|비크리 경매 방식을 적용| 

|내 거래 페이지|
|:---:|
|<img src="https://github.com/user-attachments/assets/bb798402-1c54-4ba1-bc64-3192565488e1" width="450"/>|
|에스크로 결제 방식 적용|

|택배 현황 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/0f244ba7-dbb1-42e3-9b76-681c1b5bce9d" width="450"/>|
|Delivery-Tracker API 사용|

|내 계좌 잔액 조회|
|:---:|
|<img src="https://github.com/user-attachments/assets/9801ab56-2da4-42d7-806a-19d87c412e9e" width="450"/>|
|SSAFY 금융 API 사용|

|챗봇|
|:---:|
|<img src="https://github.com/user-attachments/assets/690af68b-548a-4f70-9289-f8a7a8505b20" width="450"/>|
|사이트 이용에 관해 질문할 수 있다.|

|고객센터|
|:---:|
|<img src="https://github.com/user-attachments/assets/fa684b91-a56c-4a43-8c33-731c2a6f4568" width="450"/>|
|회원은 문의글 작성 및 확인, 관리자는 문의글을 엑셀로 다운로드 있다.|
<br />



## ⚙ 내가 사용한 기술 스택
### Frontend
<div>
<img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind CSS-%2306B6D4.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-%3578E5.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iNiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02IDEuYTUuMDA0IDUuMDA0IDAgMSAxIDAgMTAgNS4wMDQgNS4wMDQgMCAwIDEgMC0xMHptMCAxLjk0YTEuOTY3IDEuOTY3IDAgMSAwIDAgMy45MzMgMS45NjcgMS45NjcgMCAwIDAgMC0zLjkzM3oiIGZpbGw9IiMwMDAiLz48L3N2Zz4=&logoColor=white">

</div>

### Tools
<div>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white">
</div>

<br />

## 🤔 기술적 이슈와 해결 과정
> ### 💡 **재사용성과 확장성을 고려한 코드 설계**
> - 팀원들이 각각 자신이 정의한 SSAFY 금융망 API 코드를 작성하면서 유지보수에 어려움 발생 → SSAFY 금융망 호출 코드와 응답 데이터를 통합적으로 정의하여 재사용성 향상, 개발 속도 향상 [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/backend/src/main/java/com/ssafy/dabid/global/api/ssafy/SsafyApiClient.java#L1-L174)  
<br />

> ### 💡 **에스크로 결제 개발**
> <img src="https://github.com/user-attachments/assets/6c2f2d10-a4e9-45cd-bc07-b4e119c37465" width="450"/> <br/> 
> - 구매자는 에스크로 서비스 관리자(시스템 관리자 계좌)에 낙찰금을 입금한다. [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/backend/src/main/java/com/ssafy/dabid/domain/deal/service/DealServiceImpl.java#L371-L413)  
> - 판매자는 입금 금액을 확인한다.
> - 판매자는 물품을 택배로 발송하고 운송 번호를 입력한다. [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/backend/src/main/java/com/ssafy/dabid/domain/deal/service/DealServiceImpl.java#L71-L93)
> - 구매자는 물품을 받고 인수확인을 한다. [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/backend/src/main/java/com/ssafy/dabid/domain/deal/service/DealServiceImpl.java#L97-L127)
> - 에스크로 서비스 관리자는 낙찰금을 판매자 계좌에 이체한다.
> - 거래는 종료된다.
> - 이 과정에서 판매자와 구매자간 1:1 채팅이 지원되고, 문제가 발생할 경우 고객센터로 문의한다.
<br />

> ### 💡 **이미지 로딩으로 레이아웃이 이동하는 현상**
> - 이미지 로딩 동안 Skeleton UI를 보여줌으로서 CLS 해결 [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/frontend/src/pages/Deal/components/DealContentDetail.tsx#L26-L28)

<br />

> ### 💡 **API 호출 응답 대기 시간 UX로 해결** 
> - 운송장 번호 입력 API 호출 후 응답 시간을 React-Query의 `Optimistic Update`로 해결 [코드 바로보기](https://github.com/qjatjs123123/dabid/blob/master/frontend/src/business/hooks/useDeal/usePostCourierInfo.ts#L19-L58)
<br />

> ### 💡 **컴포넌트 간 API 데이터 불일치** 
> - 택배 현황 변경 시 모달 창과 거래 상세 페이지 간 데이터 불일치 오류 발생 → `React-Query`를 활용해 데이터 불일치 문제 해결
> - 유저 정보 Props drilling 문제 → `Recoil`로 문제 해결
<br />

## 💁‍♂️ 프로젝트 팀원
| **FullStack** | **FullStack** | **FullStack** | **FullStack** | **FullStack** | **FullStack** |
|:---:|:---:|:---:|:---:|:---:|:---:|
| ![](https://github.com/qjatjs123123.png?width=120&height=120) | ![](https://github.com/taegun1011.png??width=120&height=120) | ![](https://github.com/YWJ1228.png??width=120&height=120) | ![](https://github.com/umulum.png??width=120&height=120) | ![](https://github.com/josungyuk.png??width=120&height=120) | ![](https://github.com/wonchul98.png??width=120&height=120) |
| [홍범선](https://github.com/qjatjs123123) | [황태건](https://github.com/taegun1011) | [유우준](https://github.com/YWJ1228) | [장윤주](https://github.com/umulum) | [조성욱](https://github.com/josungyuk) | [이민정](https://github.com/wonchul98) |


