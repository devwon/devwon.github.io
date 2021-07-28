---
layout: post
title:  "포스트맨(Postman) 쉽게 쓰는 방"
date:   2020-01-04 17:20:00
last_modified_at:  2020-01-04 17:20:00
excerpt: "How to use postman easily"
categories: backend
tags:  Postman, django, python, collection
image:
  feature: postman-logo.png
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: no
---


### [Postman 편하게 쓰기]

회사내 기존 api들을 테스트하기 위해서 postman으로 직접 request 날려보면서 하면 더 이해가 쉽게 된다. swagger를 보면서 날려보기에는 한계가 있어서 모듈별로 collection을 만들어서 사용해보았다.

참고 사이트 - [[Automatically Set CSRF Token in Postman — Django Tips]](https://hackernoon.com/automatically-set-csrf-token-in-postman-django-tips-c9ec8eb9eb5b)

*(잘못된 내용이 있으면 언제든지 고쳐주시고 댓글로 알려주시면 감사하겠습니다!)*

## [테스트 방법]

####  1.  Postman API collection 파일을 준비한다.
	🧞‍♂️: 각자 만들어 놓은 collection으로!(난 내가 만들었음..)

#### 2.  import collections

![1_import_collection](https://user-images.githubusercontent.com/34532192/74041426-f216dd80-4a08-11ea-97fb-613df51e2213.png){: width="100%" height="100%"}

postman 접속해서 다운 받은 파일을 압축해제 후 **import**한다.

#### 3.  회원가입, 유저 로그인

API를 통해 회원 가입, 유저 로그인 진행한다.

#### 4.  token 발행 확인

유저 로그인 후 Response 부분에서 두 곳을 봐야한다.

>1.  Body : 발행된 key
>2.  Cookies : 발행된 csrftoken


#### 5. environment 추가

	🧞‍♂️: environment를 사용하면 매번 cookie와 token을 입력할 필요가 없이 변수에 담아놓고 사용할 수 있어 굉장히 엄청나게 대박 편리하다!

![5-1-add-env](https://user-images.githubusercontent.com/34532192/74041537-2c807a80-4a09-11ea-8105-e82ef1ce59d8.png){: width="100%" height="100%"}

우측 상단에 톱니바퀴 버튼을 누르면 environment 관리 화면이 나오는데, 여기서 Add 버튼 눌러서 환경을 추가한다.

![5-2-add-var](https://user-images.githubusercontent.com/34532192/74041648-65205400-4a09-11ea-844a-6e7ff0c0675e.png){: width="100%" height="100%"}

환경의 이름을 추가하고, 'token', 'csrftoken'의 이름으로 2개의 변수를 추가한다.

먼저 token이라는 변수에는 위에 로그인 후 발행된 key(uuid)를 넣고, csrftoken이라는 변수에는 로그인 후 발행된 csrftoken을 넣는다.

	🧞‍♂️: 추후에 새로운 정보로 재로그인시 두 VALUE 를 바꿔준다.

#### 6.  environment 적용

![6-1-adjust-env](https://user-images.githubusercontent.com/34532192/74041694-7c5f4180-4a09-11ea-8d35-e188d433462a.png){: width="100%" height="100%"}

우측 상단에서 위에서 추가한 환경을 선택하여 적용시킨다.

> Request Headers부분에 {{csrftoken}}이 들어가있는데, 이건 환경에서 추가한 변수이다.

![6-2-token](https://user-images.githubusercontent.com/34532192/74041656-68b3db00-4a09-11ea-8569-c44e7e0bb44e.png){: width="100%" height="100%"}

Request Authorization부분에 Bearer Token 타입으로 {{token}}이 들어가있는데, 이것도 환경에서 추가한 변수이다.

---
> #### 🧞‍♂️: 권한 문제! 
>![7-issue1](https://user-images.githubusercontent.com/34532192/74041729-8d0fb780-4a09-11ea-8a50-3bb11a6f7875.png){: width="100%" height="100%"}
>로그인한 계정으로는 권한이 충분치 않은 request를 날리면 위와 같이 뜬다. 이때 권한을 바꾸고 싶으면, DB자체 혹은 관련 API로 수정한다.



