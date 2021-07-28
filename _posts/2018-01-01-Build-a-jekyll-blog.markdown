---
layout: post
title: 기술블로그 운영을 위해 Jekyll 설치
date: 2018-01-01T17:03:00.000Z
last_modified_at: 2020-10-02T17:03:00.000Z
excerpt: how to bulid a jekyll blog?
categories: blog
tags: 'jekyll, blog'
image:
  feature: jekyll-logo.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: false
published: true
---
#### 참고 사이트 - [[지킬로 깃허브에 무료 블로그 만들기]](https://nolboo.kim/blog/2013/10/15/free-blog-with-github-jekyll/)

*기술블로그로 무엇이 좋을까 찾아보다가 내맘대로 커스터마이징(customizing)할 수 있는 jekyll로 블로그를 만들기로 결정하고 [참고 사이트](https://nolboo.kim/blog/2013/10/15/free-blog-with-github-jekyll/)에 따라 기술블로그를 만들었다.~~(이때는 커스터마이징이 이렇게 힘들줄 몰랐음)~~
그 과정에서 나온 **오류들, 해결과정**을 정리해보려고 한다:)*
### 1. jekyll 설치

  terminal에
  `$sudo gem install Jekyll`
  를 입력하라고해서 입력했는데..

 <img width="557" alt="1" src="https://user-images.githubusercontent.com/34532192/40702364-7fe657c8-641c-11e8-96a9-6cc1e02c77ed.png">
 
  이러한 에러 발생.. stackoverflow, 구글링 통해 찾아봤더니
  `$gem update —-system`
  를 입력하면 해결 된다고 해서 입력했는데..

  또 오류ㅜㅜ

<img width="706" alt="2" src="https://user-images.githubusercontent.com/34532192/40702852-598b7d86-641e-11e8-9948-96f94d1f6c44.png">

  고민하다가..지난번 'fastcamp101-python'에서 살짝 배웠던 Homebrew를 사용하기로 함!
  [[지킬문서]](https://jekyllrb.com/docs/troubleshooting/#jekyll--mac-os-x-1011)
  를 참고하여
  `brew install ruby`
  brew에 ruby 설치 후,
  `$sudo gem install Jekyll`
  다시 시도했더니 설치가 되었다..ㅎㅎ

<img width="712" alt="gem installed" src="https://user-images.githubusercontent.com/34532192/40702719-da3922fe-641d-11e8-8f97-87be97c18c1f.png">

  이렇게나 많은 gem들이 설치되었다:)

##  2. 계정 주소 만들기

사이트의 안내에 따라,

`new 깃허브사용자명.github.com`
으로 계정 주소를 만들고,

`cd 깃허브사용자명.github.com`

`jekyll serve --watch`했는데.. 또 나의 친구💛오류가...

<img width="719" alt="3" src="https://user-images.githubusercontent.com/34532192/40702644-902f21f4-641d-11e8-98db-5c2750752d57.png">


>**허무했던  해결의 과정**
>
>  이전에 python django 서버를 켜놨었는데 그걸 끄고(ctrl+c) 다시
>  `jekyll serve --watch`
>  하니까 되었다.
>  
>  <img width="692" alt="sever running" src="https://user-images.githubusercontent.com/34532192/40702714-d604cff8-641d-11e8-8d3d-59255557297d.png">

## 2-2. github에 저장소 추가

내 github에 로그인해서 repository 추가한 후,

- `git init`
- `git remote add origin 해당 repositoryURL`
- `git add .`
- `git commit -m "Initialize blog"`
- `git push -u origin master`

이 단계로 하고 있었는데..
마지막 `git push` 부분에서 에러가 나오셨도다...

<img width="695" alt="4" src="https://user-images.githubusercontent.com/34532192/40702647-91265d66-641d-11e8-82c2-a98c3e4114bb.png">

그래서 stackoverflow에 오류 내용을 검색했더니,

`git push -f origin master`

`-u` 대신에 `-f`를 쓰란다! 입력하니 바로 해결ㅎㅎ

<img width="671" alt="default" src="https://user-images.githubusercontent.com/34532192/40702649-92ae439c-641d-11e8-9002-9072486d7f1c.png">

>**번외**: git repository URL을 변경하는 방법
>
>`git remote set-url origin 변경하려는URL`
>
>*어떤 분들은 **지킬 테마**를 git으로 다운받고 주소만 변경하는 간단한 방법을 쓰기도 하더라!

# 드디어 완료~~~!
> devwon.github.io 의 주소를 가진 나만의 블로그를 만들었다.
>
> 개인적인 정보들을 추가해서 조금 꾸민 모습!

<img width="769" alt="default" src="https://user-images.githubusercontent.com/34532192/40702837-48461ab8-641e-11e8-9b91-8765f7772a57.png">

> 이제 [Disqus](https://disqus.com/) 댓글기능을 붙이고, 메뉴를 추가하고, 꾸준히 웹개발 관련 글을 올리는 게 목표! 화이팅:)
