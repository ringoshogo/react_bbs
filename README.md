# 食べても大丈夫？
 
賞味期限切れの食べ物を食べた結果(味・見た目・食後の健康状態)を共有するサイト
 
# イメージ図
 ![can_you_eat](https://user-images.githubusercontent.com/30945996/113302158-dec97000-92a3-11eb-8ff0-f140921cdb14.JPG)

 
# 概要

冷蔵庫を開けた時こんな経験ありませんか？

「あっ、、、これ、賞味期限切れてる。。。でも2日前だし食べても大丈夫かな。。。」

そんな時に、みんなの体験談を参考に出来るサイトです。
※ あくまで個人の体験談なので、食べる時は自己責任です。
 
# デモ動画
以下にアプリの簡単なデモ動画を作成しました。
https://youtu.be/agiH8CFzzMM

# 実装した機能

## *SPA*
* React ×　Django REST FrameworkによるREST APIで実装

# 特徴
## *スレッド検索機能(ヘッダ)*
* 食品名を入力すると部分一致で食品を検索して一覧に表示する

## *スレッド一覧画面*
* 各スレッドごとの投稿数を表示

## *スレッド詳細画面*
* 投稿結果のサマリを上部に表示(グラフで視覚的に理解できる)
* 投稿するためにはログインする必要あり

# 使用技術

## フロントエンド
* react: 17.0.1
* react-redux: 7.2.2
* redux-thunk: 2.3.0
* react-router-dom: 5.2.0
* recharts: 2.0.6
* HTML/CSS

## バックエンド
* Django: 3.0.8
* djangorestframework: 3.11.0
* django-allauth: 0.44.0
* django-rest-auth: 0.9.5

## インフラ
* AWS/ECS
* Docker
* Nginx(WebServer)

# クローン後のローカル環境での動かし方

* /api/.env ファイルの作成(次の2変数を定義 ⇒ REACT_APP_END_POINT=APIのURL、REACT_APP_AXIOS_BASE_URL=axiosのbase URL)</br>
　例) REACT_APP_END_POINT=http://127.0.0.1:8000</br>
 　　 REACT_APP_AXIOS_BASE_URL=http://127.0.0.1:8000/api/v1/
* /bbs/.env ファイルの作成(次の1変数を定義 ⇒ DATABASE_URL=mysql://root:@localhost:3306/nani_taberu)
* msqyl 上にDBを作成(DB名：nani_taberu)し、起動
* bbsフォルダ配下で以下のコマンドを実行</br>
　・npm install</br>
　・npm start</br>
* apiフォルダ配下で以下のコマンドを実行</br>
　・pip install -r requirements.txt</br>
　・python manage.py createsuperuser</br>
　・python manage.py makemigrations</br>
　・python manage.py migrate</br>
　・python manage.py runserver</br>
