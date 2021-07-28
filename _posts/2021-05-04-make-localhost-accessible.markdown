---
layout: post
title:  "로컬 호스트를 외부에서 접속 가능하게 만들기"
date:   2021-05-04 10:20:00
last_modified_at:  2021-07-28 18:22:00
categories: 협업
tags:  localhost, hosting, network, accesible, devwon
image:
  feature: local_server_access.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---
### 로컬 호스트를 외부에서 접속 가능하게 만들기


---

분리되어있는 백-프론트 개발을 하면서 로컬 환경에서 많이들 테스트하시죠?
이 때 개발 서버에 올리기 전에 옆에 있는 동료에게 테스트를 요청하여 로컬에서
디버깅 해야할 때가 있지 않나요?
그럴 때 사용할 수 있는 간편한 터널 프로그램 ngrok을 이용해서 테스트 해보세요!

#### 설치하기

세상 간편한 패키지 매니징 프로그램인 npm을 이용해서 ngrok을 설치해줍니다.

```bash
npm install -g ngrok
```

npm이 깔려있지 않다면 [ngrok 공식 홈페이지](https://ngrok.com/)에서 다운로드 해주세요.

#### 토큰 등록하기

비회원으로 ngrok을 실행하면 8시간 이후 세션이 만료되기 때문에, [ngrok 공식 홈페이지](https://dashboard.ngrok.com/auth/your-authtoken)에서 회원가입 후 발급 받은 토큰을 아래와 같이 등록해줍니다.

```bash
ngrok authtoken <Your Authtoken>
```

#### 서버 실행하기

백엔드, 프론트 서버 실행시 분리가 되어있다면 아래 내용들을 **꼭 추가해주셔야 서로가 서로를 인식합니다.**

##### 백엔드 서버 실행시

1. **모든 IP를 허용**

    127.0.0.1 만이 아니라 **8000(또는 원하는 포트 번호)로 들어오는 모든 IP를 허용**한다는 내용을 서버 실행시 추가해주어야 하는데요, 본인의 평소 실행 환경에 맞추어서 둘 중 원하시는 방법으로 실행해주세요.

    - 커맨드 라인에서 서버 실행시

        ```bash
        python3 manage.py runserver **0:8000**
        ```

    - 파이참 Run/Debug Configurations로 서버 실행시

        ![run-debug-config](https://user-images.githubusercontent.com/34532192/116960581-ce117d00-acdb-11eb-98d3-8140e10d12d9.png){: width="100%" height="100%"}

2. **장고 셋팅 파일내 ALLOWED_HOSTS에 사설 IP 추가**

    저는 base.py라는 기본 셋팅 파일의 내용을 import하고 local.py에서 커스텀할 내용을 넣어서 따로 로컬용 셋팅 파일(local.py)을 만들어서 사용하고 있습니다.

    셋팅 파일내 ALLOWED_HOSTS에 **본인 컴퓨터에 부여된 사설IP**를 추가해주세요.

    공인 IP는 전세계 어디에서나 접근할 수 있는 공인된 IP이고, 
    사설 IP는 특정 네트워크 안에서만 접근할 수 있는 IP입니다.
    네트워크 밖에서는 사설 IP에 접근할 수가 없습니다. (공인 IP를 매개로 접근할 수는 있습니다.)
    공유기에 연결된 PC라면 공유기에서 사설 IP를 부여하는데,
    사설 IP는 보통 192.168.xxx.xxx 또는 172.0.xxx.xxx 처럼 생겼습니다.

    - 사설 IP 확인 방법
        - Mac 터미널

            ```bash
            ifconfig | grep inet
            ```

            ![ifconfig_mac](https://user-images.githubusercontent.com/34532192/116961246-cce14f80-acdd-11eb-9519-f1364736e936.png){: width="100%" height="100%"}

        - Windows CMD

            ```powershell
            ipconfig
            ```

            ![ipconfig_win](https://user-images.githubusercontent.com/34532192/116961241-cb178c00-acdd-11eb-81f2-6b034ee62bb0.png){: width="100%" height="100%"}

             출처: [https://jb-skin-139.tistory.com/36](https://jb-skin-139.tistory.com/36)

    * 만약 ALLOWED_HOSTS에 추가하지 않는다면 아래와 같이 백엔드 서버 오류가 뜹니다.
    (IP는 x처리하였습니다.)

    ```bash
    Invalid HTTP_HOST header: '172.16.2xx.xxx:8000'. You may need to add '172.16.2xx.xxx' to ALLOWED_HOSTS.
    ```






##### 프론트 서버 실행시

1. **API 요청 IP를 사설 IP로 설정하기**

    프론트 → 백으로 API 요청시의 주소를 앞서 설정한 172.16.2xx.xxx:8000(`사설IP:포트번호`) 로 설정해줍니다.

    ```bash
BASENAME = 'http://172.16.2xx.xxx:8000'; #local server
```
    



    
#### ngrok 실행하기

아래 명령어를 입력하면 ngrok이 실행되고 아래 그림과 같이 포워딩되는 주소를 알려줍니다.

* 본인의 프론트 서버 포트에 맞게 포트 번호를 설정해주세요.

```jsx
ngrok http 3000
```

![ngrok_http3000](https://user-images.githubusercontent.com/34532192/116961040-2f861b80-acdd-11eb-8ccf-613f89b61fe3.png){: width="100%" height="100%"}

#### 테스트 진행하기

ngrok 실행시 부여된 주소로 들어가면 로컬 백엔드 서버와 연결되어 바로 테스트 및 디버깅이 가능합니다~

![ngrok_test_page](https://user-images.githubusercontent.com/34532192/116961031-285f0d80-acdd-11eb-8ee8-45883ce8ffe4.png){: width="100%" height="100%"}

이렇게 로컬호스트를 외부에서 접속하는 방법에 대해 알아보았습니다.

