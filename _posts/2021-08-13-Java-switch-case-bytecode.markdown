---
layout: post
title:  "JAVA Switch-Case문 조건들은 어떻게 저장될까?"
date:   2021-08-13 00:00:00
last_modified_at:  2021-08-13 00:00:00
categories: java
tags:  java, switch, case, compiler, bytecode, decompiler
image:
  feature: javap_bytecode_switch_string.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

> 👩‍🏫 자바 강의를 준비하며 새롭게 알게된 내용을 정리합니다. 

조건문 리팩토링을 고민하며 새롭게 알게된 사실은 if-else와 switch-case문의 로직 수행 절차의 차이점입니다.

조건문에는 if-else와 switch-case 문이 있죠?

기초적인 거여서 간략하게 생김새만 보면 아래에 신용등급에 따라 대출 한도 금액이 달라지는 예시로 if-else문, switch-case문이 각각 있습니다.
(높은 등급 순으로 많다고 가정하면 좋을 것 같아요!)

### if-else문
```java
// 지금은 사라진 신용등급제에 따른 대출 한도

int creditGrade = 1;
int loanLimit;

if( creditGrade == 1){
    loanLimit = 1200;
} else if( creditGrade == 2 ) {
    loanLimit = 900;
} else if( creditGrade == 3 ) {
    loanLimit = 300;
} else {
    loanLimit = 100;
}
```
### switch-case문
```java
// 지금은 사라진 신용등급제에 따른 대출 한도

int creditGrade = 1;
int loanLimit;

switch( creditGrade ){
    case 1: loanLimit = 1200;
        break;
    case 2: loanLimit = 900;
        break;
    case 3: loanLimit = 300;
        break;
    default:
        loanLimit = 100;
}
```

여기서 봐야할 점이 **if-else**문은 각 조건문이 참일때까지 조건문들을 돌면서 로직을 결정한다는 점이고,
**switch-case**문은 입력받은 케이스의 로직으로 바로 결정됩니다.

if-else문은 방 위치를 몰라서 방문을 하나씩 두드려본다면 switch-case문은 방 위치를 바로 알아서 들어가는 느낌이랄까?
그러니 "방이 많을 수록" 방문을 앞에부터 하나씩 두드려보는 if-else 보다 switch-case문이 더 유리할 수 밖에,

조건문 4개 이상일 때부터 if-else 보다 switch-case의 성능이 좋다고 하니 이때부터 이 차이가 더 극대화 되나보군요.

그리고 위 소스코드처럼 조건의 값들이 0에 가장 가까운 오름차순으로 사용할 때가 switch-case문을 쓰기 가장 적절하다고 하는데,

**(중요)**그 이유는 자바컴파일러에 의해 switch는 tableswitch 또는 lookupswitch 명령으로 컴파일되어 case문의 조건은 숫자로 바뀌게 되고, 조건이 String 객체라면 String 객체는 hashCode 메서드에 의해서 int 형으로 바뀌기 때문이라고 합니다. case문이 숫자의 작은 것부터 정렬이 되기 때문에 case문이 원래부터 숫자이고, 오름차순으로 정렬이 되어있다면 그렇지 않은 경우보다 더 빨리 수행되겠죠?

직접 컴파일된 바이트 코드를 확인해봅시다.

컴파일러가 친절하게 변환해준 클래스 파일이 있는 곳에서 아래 명령어를 실행해줍니다.

```bash
javap -c "클래스명".class
```
오...!

우측이 터미널 창인데, tableswitch라는 형태가 보입니다. value값으로 보이는 hashCode는 일반적으로 각 객체의 주소값을 변환한여 생성한 객체의 고유한 정수값으로, equals() 메서드에서 이 hashCode를 이용하여 객체를 비교합니다.

case문의 1,2,3,default가 그대로 tableswitch에 key에 들어가있네요. 순서도 오름차순이었어서, 위에서 말한 것 처럼 hashCode() 메서드가 할 일을 줄여줬어요^^ loanLimit 변수의 값들은 sipush로 들어가있는데, sipush, istore, goto 등 에 대해서는 추후에 따로 포스팅하도록 하겠습니다. 자세한 내용은 [[오라클 공식문서-Compiling Switches]](https://docs.oracle.com/javase/specs/jvms/se12/html/jvms-3.html#jvms-3.10)를 참고해주세요.


![javap_bytecode_switch_int](https://user-images.githubusercontent.com/34532192/129339637-8091d006-a75d-447e-aa92-172a41bfb09c.png){: width="100%" height="100%"}

그렇다면 case에 문자열을 넣었을 때는 어떠할까요?

![javap_bytecode_switch_string](https://user-images.githubusercontent.com/34532192/129339652-1b750974-7583-46f6-96ea-e461b938f7a0.png){: width="100%" height="100%"}

case에 "bronze", "silver", "golde"의 문자열을 넣어주었는데도, tableswitch의 key는 0,1,2,default로 바뀌었습니다! 여기서 봐야할 점은 숫자일 때는 key에 0 값이 없었는데, 여긴 0부터 시작한다는 점인데요..!

추측하기로는 컴파일시 hashCode() 메서드에서 숫자일 때는 숫자로 바꿔주는 로직이 안돌고 그대로 들어갔지만, 
여기서는 조건이 문자열이기 때문에 hashCode 메서드에 의해 숫자로 case문의 조건이 String 객체라면 String 객체는에 의해서 0부터 시작하는 int 값을 넣어주었기 때문일 것 같습니다.

이렇게 JAVA Switch-Case문 조건들이 tableswitch로 저장되는 모습을 확인했습니다. 다음에는 lookupswitch로 저장되는 모습도 확인해보겠습니다.
