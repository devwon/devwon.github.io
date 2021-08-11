---
layout: post
title:  "[업무 자동화] 재부팅시 로컬 도커 컨테이너 시작하기"
date:   2021-08-10 00:00:00
last_modified_at:  2021-08-10 00:00:00
categories: docker
tags:  docker, container, reboot, automator, mac, windows
image:
  feature: auto_start_docker_container.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

> 서버가 아닌 로컬 도커 컨테이너를 사용한다면 맥북을 종료할 때 도커 컨테이너가 종료됩니다.  
따라서 매번 재부팅할 때마다 도커 컨테이너를 재시작해줘야하는 번거로움이 있는데,  
쉘 스크립트와 Automator 앱(Mac) 또는 작업 스케줄러 앱(Window)을 통해
이를 자동화할 수 있습니다.

### 1. 쉘 스크립트(Shell Script) 작성
기존에 이미 도커 이미지로 컨테이너를 실행한 이력이 있다면 아래처럼 이전 도커 이력에서 컨테이너명(NAMES)을 찾아볼 수 있습니다.
```bash
터미널> docker ps -a
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS                      PORTS                    NAMES
903487e2b9bb        redis:3.2.10           "docker-entrypoint.s…"   7 weeks ago         Up 5 minutes                0.0.0.0:6379->6379/tcp   redis3
```

해당 컨테이너명을 이용하여 간단한 쉘스크립트를 작성하고, 파일 권한을 755로 부여합니다.
예시) start_redis3.sh

##### 1) docker-machine 사용시

1분을 기다린 후, 현재 redis3이라는 이름이 docker ps 에서 잡히면 이미 해당 컨테이너가 돌아가고 있는 걸로 간주하여 재시작하지 않고, 잡히지 않으면 재시작합니다.

```bash
#!/bin/bash

echo "Wait..for 1 minute."
sleep 60 # Waits 1 minutes.
echo "Let's start!"
#Open Docker, only if is not running
if [ $(docker-machine status | grep 'Running' | wc -l) -gt 0 ]
then
    echo "docker-machine is already running!"
else
    echo "Start docker-machine!"
    docker-machine start default
fi
eval $(docker-machine env default)
#Start redis3 container, only if is not running
if [ $(docker ps | grep 'redis3' | wc -l) -gt 0 ]
then
    echo "Container redis3 is already running!"
else
    echo "Restart redis3 container!"
    docker restart redis3
fi
```
그리고 docker-machine 환경 변수 설정하는 명령어를 .bash_profile에 추가합니다.
```bash
echo 'eval "$(docker-machine env default)"' >> ~/.bash_profile
```
##### 2) docker desktop 사용시

도커 앱이 running 상태가 아니면 도커 앱을 실행시키고 Docker daemon이 시작되기까지 기다립니다. 그 후 컨테이너 상태를 확인하여 돌아가고 있지 않으면 restart 합니다.

- Bash Shell

```bash
#!/bin/bash

#Open Docker, only if is not running
if (! docker stats --no-stream ); then
  # On Mac OS this would be the terminal command to launch Docker
  open /Applications/Docker.app
 #Wait until Docker daemon is running and has completed initialisation
while (! docker stats --no-stream ); do
  # Docker takes a few seconds to initialize
  echo "Waiting for Docker to launch..."
  sleep 1
done
fi
if [ $(docker ps | grep 'redis3' | wc -l) -gt 0 ]
then
    echo "Container redis3 is already running!"
else
    echo "Restart redis3 container!"
    docker restart redis3
fi
```

- PowerShell

```bash
#!/usr/bin/env pwsh

#Open Docker, only if is not running
if (! (docker stats --no-stream) ){
  # On Window10 powershell this would be the terminal command to launch Docker
  Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe"
}
#Wait until Docker daemon is running and has completed initialisation
while (! (docker stats --no-stream) ){
  # Docker takes a few seconds to initialize
  echo "Waiting for Docker to launch..."
  Start-Sleep -s 60 # Waits 1 minutes.
}
#Start redis3 container, only if is not running
if (docker ps | select-string redis3){
    echo "Container redis3 is already running!"
}else{
    echo "Restart redis3 container!"
    docker restart redis3
}

```

  - [powershell 실행 권한 관련 참고 링크]( https://m.blog.naver.com/PostView.nhn?blogId=bluesketch21&logNo=221383264763&proxyReferer=https:%2F%2Fwww.google.com%2F)


##### 3) docker toolbox 사용시

* docker toolbox도 결국 docker-machine 기반으로 돌아감

   - 관련 내용 참고: [https://ndb796.tistory.com/92](https://ndb796.tistory.com/92)

- PowerShell
```bash
#!/usr/bin/env pwsh
#Open Docker, only if is not running
if (! (docker-machine status | select-string Running) ){
  # On Window10 powershell this would be the terminal command to launch Docker
  echo "Start docker-machine!"
  docker-machine start default
}else{
  echo "docker-machine is already running!"
}
#Start redis3 container, only if is not running
if ( (docker ps | select-string redis3)){
    echo "Container redis3 is already running!"
}else{
    echo "Restart redis3 container!"
    docker restart redis3
}
```

---

#### [Mac 환경]


### 2. Automator 앱 생성
(Automator 앱은 이미 설치 되어있는 기본 앱이어서 따로 설치해 줄 필요가 없습니다.)

1. Automator 앱을 실행하여 '응용 프로그램'을 선택합니다.
![automator_1](https://user-images.githubusercontent.com/34532192/129030018-de3b55af-f54a-425e-9429-83cab6f21931.png){: width="80%" height="80%"}

2. '셸 스크립트 실행'을 클릭합니다.
![automator_2](https://user-images.githubusercontent.com/34532192/129030029-57ce3cd4-505b-4606-996c-99fb41358c8f.png){: width="80%" height="80%"}

3. **/bin/sh 셸**로 선택해주고, 경로(PATH)와 실행할 스크립트를 실행하는 명령어를 입력합니다.
![automator_3](https://user-images.githubusercontent.com/34532192/129030034-0e7bb09d-8195-4338-9e2e-ea9f21289ab1.png){: width="80%" height="80%"}

4. Ctrl+S를 눌러서 원하는 이름의 '응용 프로그램' 포맷으로 저장합니다.
![automator_4](https://user-images.githubusercontent.com/34532192/129030037-bb90e08a-7c66-4c56-9487-b582123c53a9.png){: width="80%" height="80%"}

5. 해당 응용프로그램 앱의 '컴퓨터 제어' 설정을 허용합니다.   
    [시스템 환경설정] > [보안 및 개인 정보 보호] > [손쉬운 사용]- 개인 정보 보호 탭)
![automator_5](https://user-images.githubusercontent.com/34532192/129030040-3b2704b2-5a46-44ae-a842-908513ce893c.png){: width="70%" height="70%"}

### 3. 로그인 항목 앱 추가
[시스템 환경설정] > [사용자 및 그룹] > "현재 사용자명 선택" > [로그인 항목]

해당 응용프로그램 앱을 로그인시 실행되도록 추가합니다.

![automator_6](https://user-images.githubusercontent.com/34532192/129030042-5e802dcd-adc9-42f5-9bc3-cde989d8fddf.png){: width="70%" height="70%"}
  
  [참고] 앞에 chrome GPU 돌아가면 실행시간이 오래걸림

이 밖에도 Automator를 이용하여 여러 작업들을 자동화할 수 있으니 아래 링크에서 자세히 살펴보시길 바랍니다.

[https://support.apple.com/ko-kr/guide/automator/welcome/mac](https://support.apple.com/ko-kr/guide/automator/welcome/mac)

---
#### [Window 환경]

### 2. 작업 스케쥴러 생성
1. 작업 스케쥴러 앱 실행하여 새 작업 만들기

![win_sh_scheduler_1](https://user-images.githubusercontent.com/34532192/129030044-9b355853-bf14-4a46-b7ae-b27cb7b72173.png){: width="70%" height="70%"}

##### 1-1. 트리거 추가

![win_sh_scheduler_2-1](https://user-images.githubusercontent.com/34532192/129030047-fc5128c4-9069-4495-ac25-993a4eee4f94.png){: width="60%" height="60%"}

![win_sh_scheduler_2-2](https://user-images.githubusercontent.com/34532192/129030050-1e059f3b-b850-4e51-90f0-4f91115c4566.png){: width="60%" height="60%"}

##### 1-2. 동작 추가

![win_sh_scheduler_3-1](https://user-images.githubusercontent.com/34532192/129030051-531f6707-18e5-48ba-9489-d67a6908389e.png){: width="70%" height="70%"}

윈도우에서는 파워쉘 프로그램 내에서 해당 파워쉘 스크립트가 동작해야하기 때문에 '파워쉘 프로그램 시작' 동작을 추가해야합니다.

![win_sh_scheduler_3-2](https://user-images.githubusercontent.com/34532192/129030052-3e1fae32-9619-4c23-9835-b833ba7a51a4.png){: width="60%" height="60%"}

* 프로그램/스크립트(P): **파워쉘 프로그램** 경로 삽입  
    (이 부분에 파워쉘 스크립트 경로를 넣으면 notepad 프로그램이 실행될 수 있어서 파워쉘 프로그램 경로를 넣는게 좋습니다.)

* 인수 추가(옵션)(A): 실행할 **파워쉘 스크립트 경로** 삽입

##### 1-3. 잘 생성되었는지 확인

![win_sh_scheduler_4](https://user-images.githubusercontent.com/34532192/129030053-a16984ab-afe6-4248-b1bc-7e8323014b59.png){: width="80%" height="80%"}
