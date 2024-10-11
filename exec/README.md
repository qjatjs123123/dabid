# 1. gitlab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정 값, 버전

- JVM : `OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)`
- 웹서버 : `nginx/1.15.12`
- WAS : `Apache Tomcat/10.1.28`
- IDE : `IntelliJ IDEA 2024.1.4`, `Visual Studio Code`

2. 빌드 시 사용되는 환경 변수 등의 내용 상세

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
