# 1. gitlab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정 값, 버전

- JVM : `OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)`
- 웹서버 : `nginx/1.15.12`
- WAS : `Apache Tomcat/10.1.28`
- IDE : `IntelliJ IDEA 2024.1.4`, `Visual Studio Code`

(Frontend)
| 종류            | 버전 | 
| ------------- | -------- | 
| React         | 18.3.1     | 
| Node       | 20.15.1    |


2. 빌드 시 사용되는 환경 변수 등의 내용 상세 기재

(Frontend)
| 환경변수            | 값 | 
| ------------- | -------- | 
| TRACKER_API_CLIENT_ID         | 18.3.1     | 
| TRACKER_API_CLIENT_SECRET       | 20.15.1    |
| VITE_SERVER_ENDPOINT       | https://j11a505.p.ssafy.io    |


(Backend)
- 소스 코드 내 설정 파일에 작성한 환경 변수 외에 **추가로 사용하는 환경 변수는 없습니다**.

3. 배포 시 특이사항

- elasticsearch를 새로 구동할 시 mysql에 기존에 저장된 데이터가 연동되지 않는 문제가 있어,
  mysql의 덤프파일을 활용해도 거래/경매 데이터가 복원되지 않을 수 있습니다.

4. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

- 각 DB는 도커 컨테이너로 구동

| DB            | 포트번호 | 계정 | 암호  |
| ------------- | -------- | ---- | ----- |
| MySQL         | 3306     | root | dabid |
| MongoDB       | 27017    | root | dabid |
| ElasticSearch | 9200     |      |       |
| Redis         | 6379     | root | dabid |

- 프로퍼티가 정의된 파일 목록
  - `backend\src\main\resources\application.yml`

# 2. 프로젝트에서 사용하는 외부 서비스 정보를 정리한 문서

1. Delivery Tracker API
- 택배 현황 조회 API로 `https://apis.tracker.delivery/graphql` URL을 사용합니다.
- ClientID : `7lbeq73am80t54r3rs7l6vjnnv `
- SecretID : `103eufmav4298s8ms4581nkffhmajqg20qmbmco1uoig535775j8`


2. CoolSMS(Nurigo)
- 알림 sms 전송을 위한 서비스입니다.
- 발신자명 : 010-6640-6343
- 일 발송 제한이 50회이므로 서비스 이용 중 메세지 발신이 제한될 수 있습니다.

# 4. 시연 시나리오
다비드_시연_시나리오.pdf 확인
