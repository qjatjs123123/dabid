<h1>
<img src='./frontend/src/assets/about/main-bg.png' width="40" height="auto"/> 다비드: DABID</h1>
![메인화면](/uploads/582e5196678f114f67358d77f5df647f/메인화면.PNG)
<hr>

### 프로젝트 개요 🎥
> 경매 기반의 중고 안심 거래 플랫폼

### 프로젝트 제안배경
> 기존의 선착순 위주의 중고거래, 간편한 국내 중고 거래 환경이 부재했습니다.<br/>때문에 중고 거래의 비용 측면을 살리고 시간적 여유를 확보하며, <br/> 국내 배송 비대면 거래 지원이 세가지를 제공하는 프로젝트를 기획하게 되었습니다.
### 개발 기간
> 2024-08-19 ~ 2024-10-11

### 🧑‍🤝‍🧑 Team members (채워주세요)
##### |  Backend  / Frontend |<br/>
|   유우준(팀장)   |   조성욱   |   황태건   |   이민정   |   장윤주   |   홍번선(FE 총괄)   |
| --------- | ---------| ---------| ---------| ---------| ---------|
|경매 FE, BE 담당<br/>ELK Stack 적용|경매 FE, BE 담당<br/>Prometheus 적용<br/>실시간 채팅 지원|Infra 총괄, UCC 감독<br/>회원 관리 FE, BE 담당<br/>Chat Bot<br/>SMS 알림 적용|거래 FE, BE 담당<br/>Stomp + Kafka 실시간 채팅 적용<br/>Escrow 서비스 적용|회원 관리 FE, BE 담당<br/>SSAFY 금융망 API 적용<br/>다비드 고객센터 관리|거래 FE, BE 담당<br/>Delivery Tracker 서비스 적용| 
<hr>

### 실행 환경
> | TECH                        | Version |
> | --------------------------- | ------- |
> | React                       | 18.3.1  |
> | ReactQuery                  | 5.59.0  |
> | Recoil                      | 0.7.7   |
> | TypeScript                  | 5.5.4   |
> | Tailwind                    | 0.4.4   |
> | Spring boot                 | 3.3.3   |
> | Spring Security             | 6.3.3   |
> | JWT                         | 0.11.2  |
> | Flask                       | 3.0.3   |
> | OpenAI                      | 1.5.0   |
> | Kafka                       | 2.8.1   |
> | MySQL                       | 8.0.33  |
> | MongoDB                     | 6.0.17  |
> | Redis                       | 7.4.0   |
> | ElasticSearch               | 8.6.2   |
> | Logstash                    | 8.6.2   |
> | Kibana                      | 8.6.2   |
> | Prometheus                  | 2.54.1  |
> | Nurigo(SMS 전송)            | 4.3.0   |
> | Apache POI (엑셀 문서 생성) | 5.3.0   |


</br>

## 💻 Tech Stack
### 🔐 Backend
><img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"><img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"><img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white"><img src="https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white"><img src="https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white"><img src="https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white"><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"><img src = "https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white">![kafka2](/uploads/46dd938aaa0854bf08bca554b4f8c100/kafka2.png)![logstash2](/uploads/74ec7a01429cebcb86c15314d7f5167c/logstash2.png)


### 🌅 Frontend
>   <img src="	https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  

## ERD
![ERD](/uploads/08be40f73be526c97b704b45f03eaa53/image.png)

## Architecture
![다비드_아키텍처](/uploads/a384d1722bb6cae4490fcbf55390d71f/다비드_아키텍처_찐찐찐찐.png)

## 사용 방법
### 🔐 Backend
> ```
> $ ./gradlew clean build;
> $ java -jar build/libs/*SNAPSHOT.jar
> ```
### 🌅 Front-end
> ```
> $ npm install
> $ npm start
> ```


## 🖥️ 핵심 기능 설명

|회원가입&로그인&마이페이지|
| :---: |
|![로그인](/uploads/52c93289b3499116cfb53f0f74295cc4/image.png)|
|![회원가입](/uploads/7ccd4ab03c6e5a2d935b585fa4ca686b/image.png)|
|![마이페이지](/uploads/4322b8722ea7497bc6b0bad7968769ff/마이페이지.png)|
|<회원가입&로그인&마이페이지> <br/>
<br/>회원가입 폼에서 이메일, 닉네임, 비밀번호, 전화번호를 입력합니다.
<br/>이메일, 닉네임, 전화번호는 중복 여부를 확인하고, 이메일과 전화번호는 정규식에 맞게 입력되었는지 검증합니다.
<br/>전화번호 인증 코드를 메시지로 전송하여 본인 인증을 진행합니다.
<br/>회원가입 완료 시 자동으로 로그인되며, 이후에는 가입한 이메일과 비밀번호로 로그인을 진행할 수 있습니다.|

|경매 페이지|
| :---: |
|![경매 페이지](/uploads/be6867a301c2accf23a69a99ccb114a9/image.png)|
![경매_등록페이지](/uploads/3d1675372d6b3f702e3ed72c4660e103/image.png)
|![경매_상세보기](/uploads/d29c5a65253b2884ae1e85ee7c79af01/경매_상세보기.png)|
| <경매 페이지> <br/>
<br/>물건을 판매하고 싶은 경우 5000포인트를 지출하고 경매 등록을 통해 경매를 올릴 수 있습니다.
<br/>경매에 참가하고 싶은 경우 경매시작가의 30%에 해당하는 보증금을 지출하고 참가할 수 있습니다.
<br/>판매자가 경매를 포기하고 싶은 경우, 참가자 유무에 따라 보증금을 환급받고 경매를 종료합니다. 또한, 경매 참가자에게 SMS 알림이 전송됩니다.
<br/>구매자가 경매 참가를 포기하고 싶은 경우, 유력 입찰자가 아니라면 참가 포기가 가능합니다.
<br/>경매를 판매자가 설정한 시간에 따라 자동적으로 종료되고, 판매자와 유력 입찰자는 자동으로 거래 프로세스를 진행합니다. 또한 당사자간에 SMS 알림이 전송됩니다.|

|거래 페이지 & 다비드 뱅크(SSAFY 금융망 API)|
| :---: |
|![거래페이지](/uploads/5d60ff751067ea2e23a8c8183b205ccd/거래페이지.png)|
|![거래상세페이지](/uploads/4e5e0781112264a14b4995dc2d440f32/거래상세페이지.png)|
|![다비드 뱅크](/uploads/5491f9183d15811e95eed9f37318ce61/image.png)|
| <거래 페이지> <br/>
<br/>거래 페이지에서는 구매자가 최종 입찰자일 때나 판매자가 경매를 정상적으로 종료했을 때 거래 과정이 진행되며, 에스크로 결제 방식이 적용됩니다.
<br/>먼저 구매자는 입찰 금액을 송금하고, 판매자는 입금이 확인되면 택배 정보를 등록합니다.
<br/>이후 구매자가 물품을 정상적으로 수령하고 인수를 확정하면, 판매자에게 대금이 입금됩니다.
<br/>Kakfa를 활용한 채팅 기능을 통해 판매자와 구매자 간 채팅 기능을 제공합니다.
<br/>Delivery Tracker API를 활용해 배송 조회 기능을 제공합니다. 사용자는 운송사와 운송장 번호를 등록해 배송 현황을 확인할 수 있습니다.|

|챗봇 페이지|
| :---: |
|![챗봇 페이지](/uploads/ee800f16c08585c820e3dea4e083ab27/image.png)|
| <챗봇 페이지> <br/>
<br/>하단의 플로팅 액션 버튼을 통해 챗봇에게 사이트 이용에 관해 질문할 수 있습니다.
<br/>자주 묻는 질문은 버튼으로 등록해 편리하게 물어볼 수 있습니다.
<br/>챗봇은 로그아웃할 때까지 기존의 대화 내용을 유지하고 있으며 이를 기반으로 새로운 답변을 생성할 수 있습니다.|

|고객센터 페이지|
| :---: |
|![고객센터](/uploads/a50eae90bcb5aa1054ffe8751c3a8f04/image.png)|
|![고객센터](/uploads/8715703ddd031aadb8e87fc3f256e088/고객센터.png)|
| <고객센터 페이지> <br/>
<br/>서비스 이용 중 시스템 상에서 해결되지 않는 문제가 발생하는 경우, 고객센터에서 이미지를 포함한 문의글을 작성할 수 있습니다.
<br/>회원은 자신이 작성한 문의를 확인할 수 있으며, 관리자는 문의 처리를 위해 현재까지 작성된 문의 글을 엑셀 파일로 다운로드할 수 있습니다.|

<hr>

## 느낀점
> 1. 유우준
> - 팀장으로서 훌륭한 팀원들과 협력하여 성공적인 프로젝트 결과물을 만들어낼 수 있었습니다. 특히 엘라스틱 서치를 적용하여 성능 향상을 이루었으며, 그 과정에서 많은 것을 배울 수 있었습니다.
> 2. 장윤주
> - 좋은 팀원들과 함께 프로젝트를 진행하며 많은 것을 배웠습니다. 프론트엔드뿐만 아니라 백엔드 기술에 대해서도 새로운 경험을 쌓을 수 있었습니다.
> 3. 이민정
> - 채팅 기능을 직접 개발하고, 이를 몽고DB에 저장해 지속적으로 사용할 수 있는 기능을 구현하며 자신감을 얻었습니다.
> 4. 조성욱
> - 프로메테우스를 활용해 성능 최적화를 시도해보았고, 훌륭한 팀원들과 함께 일하며 많은 것을 배웠습니다.
> 5. 홍범선
> - 프론트엔드에서 새로운 기술들을 학습하고 적용해볼 수 있는 기회였습니다. 또한 좋은 팀원들과 함께 프로젝트를 진행하며 많은 것을 배웠습니다.
> 6. 황태건
> - 인프라에 대해 깊이 배우는 계기가 되었으며, 챗봇 기능을 개발하면서 프롬프트 엔지니어링에 대해 많은 것을 배웠습니다.
