# 다비드: DABID

![image.png](https://withme.s3.amazonaws.com/interImg/2f70895b-0161-4410-88e6-832a39920239_image.png)

**✨경매 기반의 중고 안심 거래 플랫폼**

## 기획 배경

기존의 선착순 위주의 중고거래, 간편한 국내 중고 거래 환경이 부재했습니다.\
때문에 중고 거래의 비용 측면을 살리고 시간적 여유를 확보하며,\
국내 배송 비대면 거래 지원이 세가지를 제공하는 프로젝트를 기획하게 되었습니다.

## 프로젝트 소개

### 개발 기간

2024-08-19 ~ 2024-10-11

### 🧑‍🤝‍🧑 Team members

*   Full Stack

| 유우준(팀장)         | 조성욱                    | 황태건                      | 이민정              | 장윤주                         | 홍번선                        |
| --------------- | ---------------------- | ------------------------ | ---------------- | --------------------------- | -------------------------- |
| 경매 ELK Stack 적용 | 경매 실시간 채팅 Promethus 적용 | 회원 관리 챗봇 SMS 알림 CI/CD 구축 | Escrow 거래 실시간 채팅 | 회원 관리 SSAFY 금융망 API 연동 고객센터 | 거래 Delivery Tracker API 연동 |

## 💻 Tech Stack

### 🔐 Backend

![BlockNote image](https://img.shields.io/badge/java-007396?style=for-the-badge\&logo=java\&logoColor=white)![BlockNote image](https://img.shields.io/badge/spring-6DB33F?style=for-the-badge\&logo=spring\&logoColor=white)![BlockNote image](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge\&logo=mysql\&logoColor=white)![BlockNote image](https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge\&logo=MongoDB\&logoColor=white)![BlockNote image](https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge\&logo=elasticsearch\&logoColor=white)![BlockNote image](https://img.shields.io/badge/Kibana-005571?style=for-the-badge\&logo=Kibana\&logoColor=white)

### 🌅 Frontend

![BlockNote image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)![BlockNote image](https://img.shields.io/badge/react-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)![BlockNote image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

### 🚨Monitoring

![BlockNote image](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge\&logo=Prometheus\&logoColor=white)![BlockNote image](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge\&logo=grafana\&logoColor=white)

### ⚙AI

![BlockNote image](https://img.shields.io/badge/Flask-000000?style=for-the-badge\&logo=flask\&logoColor=white)![BlockNote image](https://img.shields.io/badge/redis-%23DD0031.svg?\&style=for-the-badge\&logo=redis\&logoColor=white)

## 아키텍처

![image.png](https://withme.s3.amazonaws.com/interImg/78a4c7cc-57a7-4a1b-9653-4effe7452519_image.png)

## 주요 기능

### 회원가입/계좌연동

![image.png](https://withme.s3.amazonaws.com/interImg/6ce94f57-dd45-44cb-88e2-806961fbe951_image.png)![image.png](https://withme.s3.amazonaws.com/interImg/1fbf0111-2058-4c80-9df8-b72eb538d5cc_image.png)

*   거래 신원 보장 및 경매 알림을 위해 **SMS 인증**을 통해 전화번호를 등록합니다.
*   **1원 인증**을 거쳐 경매/거래에 사용할 계좌를 등록할 수 있습니다.
*   **포인트**는 등록한 계좌로 충전할 수 있으며 **경매에서 보증금**으로 사용됩니다.

### 경매

![image.png](https://withme.s3.amazonaws.com/interImg/130e5407-2dbe-4012-97af-b596fe64b1a3_image.png)

*   물건을 판매하고 싶은 경우 5000포인트를 지출하고 경매 등록을 통해 경매를 올릴 수 있습니다.
*   경매에 참가하고 싶은 경우 경매시작가의 30%에 해당하는 보증금을 지출하고 참가할 수 있습니다.
*   판매자가 경매를 포기하고 싶은 경우, 참가자 유무에 따라 보증금을 환급받고 경매를 종료합니다. 또한, 경매 참가자에게 SMS 알림이 전송됩니다.
*   구매자가 경매 참가를 포기하고 싶은 경우, 유력 입찰자가 아니라면 참가 포기가 가능합니다.
*   Spring Batch를 사용해 경매를 판매자가 설정한 시간에 따라 자동적으로 종료되고, 판매자와 유력 입찰자는 자동으로 거래 프로세스를 진행합니다. 또한 당사자간에 SMS 알림이 전송됩니다.

### 거래

![image.png](https://withme.s3.amazonaws.com/interImg/7482eefd-6512-4eef-a2d6-14e09625723f_image.png)![image.png](https://withme.s3.amazonaws.com/interImg/83979c6a-cfe9-4885-a3d1-b78751e1dc66_image.png)![image.png](https://withme.s3.amazonaws.com/interImg/c419b66c-9e10-4f20-bfac-9b5aae1a3874_image.png)

*   경매가 정상적으로 종료되면, 최종 낙찰자는 구매자가 되어 판매자와 거래 페이지에서 거래를 진행할 수 있습니다.

*   거래는 **에스크로 방식으로 진행**됩니다.

    1.  구매자가 거래용 가상 계좌에 입찰 금액을 송금합니다.
    2.  판매자는 입금이 확인되면 상품을 배송하고 택배 정보를 등록합니다.

3. 이후 구매자가 물품을 정상적으로 수령하고 인수를 확정하면, 판매자에게 대금이 입금됩니다.

*   판매자와 구매자 간 채팅이 가능합니다.
*   Delivery Tracker API를 활용해 배송 조회 기능을 제공합니다. 사용자는 운송사와 운송장 번호를 등록해 배송 현황을 확인할 수 있습니다.


### 후기

*   AI가 프로젝트 디렉토리를 분석해 작성한 후기입니다.

<!---->

    이 Git 리포지토리는 다양한 디렉토리와 파일 구조를 가지고 있으며, 주로 백엔드 서버 개발에 중점을 두고 있는 것으로 보입니다.
    특히 backend 디토리 내부에는 java 언어를 사용하는 여러 하위 디렉토리가 포함되어 있어, Java 기반의 서버 애플리케이션 개발에 필요한 다양한 컴포넌트들이 구성되어 있.
    이 구조에서 auction, deal, inquiry, job, member 등의 디렉토리는 각각 다른 도메인을 나타내며, 이들 각각에는 controller, dto, entity, repository, `` 등의 하위 디렉토리가 존재합니다. 이는 각 도메인에 대해 MVC 패턴이나 유사한 구조를 따르고 있음을 시사합니다.
    또한, global 디렉토리 내에서는 api, ``, consts, error, filter, status, utils 등의 다양한 설정과 유틸리티들이 관리되고 있어, 전역적으로 사용되는 기능들과 설정들이 중앙집중적으로 관리되고 있는을 확인할 수 있습니다.
    이 리포지토리는 또한 docker_setting 디렉토리를 포함하고 있어, Docker를 사용하여 환경을 구성하고 있음을 알 수 있습니다. 이는 개발 및 배포 과정의관성과 효율성을 높이는 데 기여할 것입니다.
    전반적으로, 이 리포지토리는 복잡한 서버 사이드 애플리케이션을 효과적으로 개발 및 관리하기 위한 다양한 도구와조를 갖추고 있으며, 특히 Java 기반의 기술 스택에 중점을 둔 개발이 이루어지고 있는 것으로 보입니다. 이러한 구조는 대규모 프로젝트에서 요구되는 확장성과 유보수성을 제공합니다.
