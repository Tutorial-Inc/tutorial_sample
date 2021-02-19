# ネイティブアプリ風ウェブアプリを Ionic で作ってみる（完全入門編）

元記事はこちらになります。

* [第一回 記事](https://tutorial.co.jp/tech/2021/02/native-ionic-web-app-1/)
* [第二回 記事](https://tutorial.co.jp/tech/2021/02/native-ionic-web-app-2/)
* [第三回 記事](https://tutorial.co.jp/tech/2021/02/native-ionic-web-app-3/)
* [第四回 記事](https://tutorial.co.jp/tech/2021/02/native-ionic-web-app-4/)

ここでは、ソースコードを公開しています。

アプリも公開しています。
https://dev.d24wcf2ponetu0.amplifyapp.com/
ここから新規登録、利用ができます。

## 01-ionic-pure

HTML/JavaScript と Ionic だけで ToDo アプリを作ります。

フレームワークを利用しないパターンです。

## 02-rxjs-refactor

01 の JavaScript 部分を RxJS を使って書き換えています。

## 03-angular-ionic

ToDo アプリを Angular と Ionic を使って書き直しています。

## 04-behaviorsubject

BehaviorSubject クラスに状態を持たせてシンプルな状態管理をしています。

## 05-ngrx

状態管理に NgRx を利用しています。

## 06-redux-toolkit

NgRx のアクションやリデューサーの生成に、Redux Toolkit の createSlice を使って実装しています。

## 07-login-guard

ログインしていないと入れない画面の実装をしています。

## 08-calendar-view

ToDo の有効期限をカレンダーに表示する実装をしています。

## 09-amplify

ToDo アプリのバックエンドを Amplify にして、ログイン、サインアップ、データの永続化をしています。

## 10-pwa

PWA にしてアプリケーションを公開しています。
