---
layout: post
title:  "pip requests 패키지 설치시 SSLError 오류 해결 방법"
date:   2021-07-28 18:20:00
last_modified_at:  2021-07-28 18:22:00
categories: python
tags:  python, pip, install, requests, package, ssl, trustedhost
image:
  feature: win_pip_install_error.jpeg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---
> python 바이트 디그리 for KT 수강생분들을 위한 포스팅입니다.

현재 수강생분들 개발 환경에서 빈번하게 발생하고 있는 requests 패키지 설치시 SSLError에 대해 해결 방법 공유 드립니다.

#### [오류 예시]

![win_pip_install_error](https://user-images.githubusercontent.com/34532192/127428421-9f8ad774-ecef-493f-a0ac-ca82b77550f6.jpeg){: width="100%" height="100%"}


#### [해결 방법]

##### 방법1
해당 오류는 SSL 인증서 오류로 requests 패키지 설치시 trusted host를 설정해주어야합니다.

```python
pip --trusted-host pypi.org --trusted-host files.pythonhosted.org install requests
```
![win_pip_install_trusted_host_2](https://user-images.githubusercontent.com/34532192/127428424-6b214c78-b9f6-4b70-822b-31f701abae76.png){: width="100%" height="100%"}

하지만 위 방법은 일시적인 방법이고, 영구적으로 설정파일에 적용하는 방법으로는 아래와 같습니다.

##### 방법2

###### 1. config 파일을 생성(이미 있으면, 그걸 사용)

이미 pip config 파일이 존재할 수 있어서 파일이 존재하는지 아래 리스트에서 본인의 OS에 맞게 체크해보세요.

1) 윈도우 OS일 경우

[전체 유저에 적용시 위치]

- On Windows 7 and later: C:\ProgramData\pip\pip.ini (hidden but writeable)
- On Windows Vista: Global configuration is not supported.
- On Windows XP: C:\Documents and Settings\All Users\Application Data\pip\pip.ini

[현재 유저에만 적용시 위치]

- %APPDATA%\pip\pip.ini 또는 %HOME%\pip\pip.ini

2) 맥 OS일 경우

- $HOME/Library/Application Support/pip/pip.conf 또 $HOME/.config/pip/pip.conf

[pip 설정 파일 관련 참고 링크]( https://pip.pypa.io/en/stable/topics/configuration/)

정확한 pip 설정 파일의 위치는 아래 명령어로 찾아보세요.
```python
pip config -v list
```

###### 2. config 파일 내용 추가
```ini
[global]
trusted-host = pypi.org
                  files.pythonhosted.org
```
이 설정을 하시고 requests 패키지를 설치하시면 됩니다.

자세히 캡쳐화면으로 설명을 드릴게요.

1) 윈도우 OS일 경우

###### #1. pip 설정 파일의 위치 파악
![win_pip_config_1](https://user-images.githubusercontent.com/34532192/127433017-fed24c9c-6a3f-4306-b12d-e0364a98e140.png){: width="100%" height="100%"}
###### #2. 해당 위치에 pip.ini 파일 추가
###### > 저는 AppData\Roaming\pip 폴더에 넣을껀데요, pip 폴더도 없어서 폴더도 추가해주었습니다!
![win_pip_config_2](https://user-images.githubusercontent.com/34532192/127433036-81133c20-720e-4cc3-8b16-c61d4f2bc490.png){: width="100%" height="100%"}
###### #3. trusted-host 내용 추가 후 저장
![win_pip_config_3](https://user-images.githubusercontent.com/34532192/127433039-241a4d7e-055a-4857-983e-c092e493a925.png){: width="100%" height="100%"}
###### #4. requests 패키 설치 완료!
![win_pip_config_4](https://user-images.githubusercontent.com/34532192/127433045-a8e5dc33-8572-43ce-a328-bd1c9259ef2e.png){: width="100%" height="100%"}

2) 맥 OS 일 경우
###### #1. pip 설정 파일의 위치 파악
위 윈도우 OS와 동일하여 생략합니다.
###### #2. 해당 위치에 pip.conf 파일 추가
###### > 저는 $HOME/.config/pip 폴더에 넣을껀데요, pip 폴더도 없어서 폴더도 추가해주었습니다!
```zsh
mkdir .config/pip | touch .config/pip/pip.conf
```
###### #3. trusted-host 내용 추가 후 저장
![mac_pip_config_1](https://user-images.githubusercontent.com/34532192/127434390-d284792d-c0eb-45d4-a302-c4839efc7435.png){: width="100%" height="100%"}
###### #4. requests 패키 설치 완료!
![mac_pip_config_1](https://user-images.githubusercontent.com/34532192/127434399-9524d66a-622c-4233-a3d5-4c6e597b7fd8.png){: width="100%" height="100%"}


해보시고 안되시면 자세히 질문 남겨주시면 감사하겠습니다.

#### QnA 정리
---
> 파이썬에서 pip config -v list를 쳐서 아래 위치가 4개 나오는것 까진 확인했는데, 그뒤에 '해당위치에 pip.int 파일을 추가' 란 말이 4개 위치중에 아무곳이나 상관없는것인지?

###### 컴퓨터마다 다 환경이 달라서 여러 위치 중에 이미 pip.ini 또는 pip.conf 파일이 있을 수 있어서 경로 다 확인해보시고 있는 곳에 파일 수정하시는 걸 추천드리구요! 
###### 제 설명에 윈도우는 전체 유저에 적용, 현재 유저에 적용 이런식으로 되어있는데요,
###### 말 그대로 컴퓨터에 맨처음 로그인할 때 특정 유저로 로그인을 하니까 그 로그인한 유저의 설정에만 적용할꺼니?를 묻는 부분입니다. 
###### 정리하면 1) 존재하는 파일 우선 2) 원하는 폴더 우선
###### 이 순서로 선택하시면 될 것 같아요.

> pip.ini란 파일은 어디서 생성??해서 어떻게 추가하는것인지   
> (일단 경로대로 들어가보면 아무것도 없습니다)

###### 아무 곳에도 없다! 할 경우, VSCODE에서 리스트 중에 원하시는 폴더를 열어서 저희 텍스트 파일 추가하듯이 확장자를 ".ini"로 해서 파일을 추가하시면 되는데요,
###### 아래 그림 처럼 "File>Open..." 으로 원하는 폴더를 열어서 "File> New File" 으로 파일을 추가하는 방법이 있습니다.
![vscode_new_file](https://user-images.githubusercontent.com/34532192/127642512-2280dc84-c4dc-4f5b-8421-c82f534124c4.png){: width="100%" height="100%"}
> trusted host 추가를 어떻게 하는것인지

###### 내용에서 trusted host 추가는 단순히 저 [global]로 시작하는 문구를 pip.ini 파일에 넣고 저장하여 앞으로도 해당 host를 신뢰하라는 의미입니다.

