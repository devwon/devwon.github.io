---
layout: post
title:  "Mac VSCODE에서 가상환경내 Python으로 Python Interpreter 설정"
date:   2021-08-01 00:00:00
last_modified_at:  2021-08-01 00:00:00
categories: python
tags:  python, venv, vscode, interpreter, myvenv
image:
  feature: mac_vscode_python_interpreter_8.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

> 패스트캠퍼스 python 바이트 디그리 for KT 수강생분들을 위한 포스팅입니다.
VSCODE에 Python Interpreter 설정시 Windows 환경에서는 처음부터 가상환경의 Python을 잘 인식하지만 Mac 환경에서는 가상환경의 Python을 잘 인식하지 못합니다. 그래서 defaultInterpreterPath을 설정하여 잘 인식할 수 있도록 설정해보겠습니다.   
* Python Interpreter을 가상환경의 Python으로 설정할 경우 터미널을 실행하게 될 경우 가상환경을 바로 실행하게 하거나 Python 파일 실행시 가상환경 내의 Python으로 실행될 수 있도록 할 수 있습니다.

처음 VSCODE를 실행하여 폴더를 선택해주면 아래 그림과 같이 하단에서 Python Interpreter가 설정되지 않은걸 볼 수 있습니다.

![mac_vscode_python_interpreter_1](https://user-images.githubusercontent.com/34532192/127770481-6b2041c5-c331-466d-8651-4e833adae3ab.png){: width="100%" height="100%"}

#### 1. Python 가상환경 생성 및 실행
아래 명령어로 testenv라는 이름의 Python 가상환경을 생성해주고 실행해보겠습니다.
```bash
python3 -m vevn testenv
source testenv/bin/activate
```
![mac_vscode_python_interpreter_2](https://user-images.githubusercontent.com/34532192/127770484-dc578766-bb24-42fd-a294-5fed5735d72f.png){: width="100%" height="100%"}

#### 2. defaultInterpreterPath 설정
이제 "Ctrl + Command + P" 단축키를 통해 Python Interpreter를 가상환경의 Python으로 설정해주려는데, 리스트에 아무리 찾아도 가상환경의 Python이 없네요. 직접 타이핑하거나 가상환경의 Python을 선택해도 기본 Python이 선택이 됩니다.

![mac_vscode_python_interpreter_3](https://user-images.githubusercontent.com/34532192/127771139-9ad65038-5162-4baa-ad7c-5ad9f6d6e307.png){: width="100%" height="100%"}

이럴 때는 settings.json의 defaultInterpreterPath을 가상환경의 Python으로 설정해주어 VSCODE가 해당 Python을 인식해주도록 합니다.

먼저 settings.json의 defaultInterpreterPath을 본인의 가상환경의 Python 경로로 설정해주고,
```json
"python.defaultInterpreterPath": "${workspaceFolder}/python_basic/testenv/bin/python3",
```
🧞: ${workspaceFolder} 라는 변수를 이용하면 여러 가상환경을 관리하기가 편리합니다.

![mac_vscode_python_interpreter_4](https://user-images.githubusercontent.com/34532192/127771629-fe2ede5b-6c6e-4de3-9ad5-1e7e53faac55.png){: width="100%" height="100%"}


다시 "Ctrl + Command + P" 단축키를 통해 맨 하단의 "Use default Python interpreter path"를 선택해줍니다.

![mac_vscode_python_interpreter_5](https://user-images.githubusercontent.com/34532192/127771805-11cbe74f-4f45-4140-a16c-108d6785f1d3.png){: width="100%" height="100%"}

그 이후 하단에 보시면 Python Interpreter로 가상환경의 Python이 선택된 것을 보실 수 있습니다.

![mac_vscode_python_interpreter_6](https://user-images.githubusercontent.com/34532192/127771840-b002ecd5-0bcb-420d-ac8d-2ac704c31f1b.png){: width="100%" height="100%"}

#### 3.Select Interpreter 창에서 가상환경의 Python이 노출되는지 확인
다시 "Ctrl + Command + P" 단축키를 통해 Python Interpreter를 확인해보시면, 이전에는 없던 testenv 폴더의 Python이 노출됩니다.

![mac_vscode_python_interpreter_7](https://user-images.githubusercontent.com/34532192/127771882-bb4fcf85-2463-44fc-a280-1f81872c4764.png){: width="100%" height="100%"}

그리고 이렇게 Python Interpreter로 가상환경의 Python이 선택되어있을 경우, **새 터미널 창을 열면** 가상환경이 자동 실행되게 됩니다.

![mac_vscode_python_interpreter_8](https://user-images.githubusercontent.com/34532192/127772215-317d8d12-eeb0-4e97-9c85-ba7b3f0232f5.png){: width="100%" height="100%"}

앞으로 새로 VSCODE를 열 때 하단 창에 Python Interpreter가 어떻게 설정되어있는지 확인해보세요!

[참고]
- [VSCODE docs>Python settings reference](https://code.visualstudio.com/docs/python/settings-reference#_general-settings)