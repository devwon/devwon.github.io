---
layout: post
title:  "파이참(Pycharm)에서 오픈 소스 디버깅하기 🐜"
date:   2021-07-30 00:00:00
last_modified_at:  2021-07-30 00:00:00
categories: python
tags:  python, pip, open_source, pycharm, package, debugging, print
image:
  feature: open_source_debugging.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

> celery worker, celery flower 같은 오픈소스를 디버깅하고 싶을 때가 있습니다. 
지금까지는 **print**로 디버깅 했다면,   
> 이제는 대표적인 IDE 툴인 Pycharm Debug을 이용하여 디버깅 해보겠습니다. 
**Mac OS** 기준이며, 방법은 간단합니다.

#### 1. Configurations 추가

Pycharm의 Run/Debug Configurations를 설정하면 되는데요,
크게 3가지 예시로 보여드리겠습니다.

##### [celery flower 실행하는 예시]
![mac_vsc_opensouce_debugging_1](https://user-images.githubusercontent.com/34532192/127656706-001adf6c-135e-407d-848a-47f39f65f05c.png){: width="100%" height="100%"}

python 환경을 추가하여 위와 같이 설정을 추가합니다.

위 예시는 터미널에서 아래 명령어를 실행한 결과와 같습니다.

```livescript
celery  
```

'celery' 라는 pip로 설치한 모듈을 Module name으로 설정하고 나머지 파라메터들을 그 아래에 적습니다.

##### [celery worker를 실행하는 예시]
![mac_vsc_opensouce_debugging_2](https://user-images.githubusercontent.com/34532192/127656724-d22794c1-f740-42e0-993b-fdcc5262b6b7.png){: width="100%" height="100%"}

또 다른 예시는 celery worker를 실행하는 예시인데요.   
Module name 에는 celery 모듈을 선택해주시고 Parameters에 worker를 비롯한 옵션값들을 넣어줍니다.
아래 예시 화면 참고 바랍니다.
```bash
worker -A {App 이름} -E --loglevel=info
```
> **-E, --task-events, --events**     
Send task-related events that can be captured by monitors like celery events, celerymon, and others.
###### : 모니터하고 있는 곳에서 감지할 수 있는 이벤트를 보내는 옵션입니다.

> **-l, --loglevel {loglevel}**   
Options: DEBUG|INFO|WARNING|ERROR|CRITICAL|FATAL
###### : DEBUG~FATAL 까지 로그 레벨을 설정해주는 옵션입니다.
>

##### [celery beat를 실행하는 예시]

![mac_vsc_opensouce_debugging_3](https://user-images.githubusercontent.com/34532192/127656726-8a953d9e-9e8f-4d11-a17f-6ef7b70ce444.png){: width="100%" height="100%"}

parameters는 아래와 같이 넣어줬습니다. 기네요..

```bash
-A {App 이름} beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler --broker=redis://192.168.99.100:6379
```
> **-S, --scheduler {scheduler}**   
Scheduler class to use.
###### : 스케쥴러로 쓸 클래스를 넣어줍니다.

> **-b, --broker {broker}**
###### : 브로커의 주소를 넣어줍니다.
*저는 브로커로 Redis docker image를 사용하고 있어서 docker-machine IP:Port를 넣어주었습니다.


##### [꿀팁🍯]
![mac_vsc_opensouce_debugging_4](https://user-images.githubusercontent.com/34532192/127656727-fcba15ee-7d13-474c-aaa6-49befd30c4e6.png){: width="100%" height="100%"}

celery beat를 돌릴 때 **특정 시간**으로 설정하고 돌리고 싶다면 libfaketime 모듈을 설치한 후,   
'Environment variables'에 아래 3개의 변수를 추가합니다.    
(FAKETIME 값에 @를 꼭 붙여줘야함)

```bash
DYLD_FORCE_FLAT_NAMESPACE=1
DYLD_INSERT_LIBRARIES=/usr/local/Cellar/libfaketime/0.9.8/lib/faketime/libfaketime.1.dylib
FAKETIME=@2020-07-15 11:25:10
```

> **DYLD_FORCE_FLAT_NAMESPACE**   
###### : function hooking을 위해서 동일한 symbol name을 가진 다른 library를 inject 하려는 경우 처럼 flat namespace를 restrict 해야해서 non-zero로 설정합니다.

> **DYLD_INSERT_LIBRARIES**
###### : library를 우선적으로 application에 강제 inject하도록 해당 library를 설정합니다.

> **FAKETIME**
###### : 원하는 시간을 {yyyy-mm-dd HH:mm:ss} 형식으로 설정합니다.


#### 2. Breakpoint 잡고 디버깅 모드로 실행하여 자유롭게 디버깅~

![mac_vsc_opensouce_debugging_5](https://user-images.githubusercontent.com/34532192/127656729-af9ac486-faba-48c2-9947-1d8b3cef28cc.png){: width="100%" height="100%"}

파이참에서 디버깅하는 방법에 대 자세한 내용은 [공식문서](https://www.jetbrains.com/help/pycharm/debugging-python-code.html)를 참고해주세요!

[참고]
- [Celery command Line Interface](https://docs.celeryproject.org/en/stable/reference/cli.html#cmdoption-celery-b)
- [How do I enable remote celery debugging in PyCharm?](https://stackoverflow.com/questions/29312809/how-do-i-enable-remote-celery-debugging-in-pycharm)  
- [dyld Features 관련](https://sungunjo.github.io/mac-os-x/2019/11/13/ch.4-parts-of-the-process.html)
