(日本語の説明は英語の後に記述されます)

# Monacanoid(Breakout)

Made with Monaca+enchant.js.

## Overview

Simple Breakout.

You can move the paddle by tilting your device.

(so you can't move it in Monaca IDE's Preview Pane)


Tap the screen when the ball and the paddle are near, and the ball get sticked on the paddle.


### Scores
Gray blocks：200 pts

Other blocks：1000 pts

Golden blocks：3000000 pts!


## Source instruction
### enchant.js(the Game Engine)
In index.html, js/enchant.min.js is included.

[enchant.js Official site](http://enchantjs.com/)


### Native Components
Native toolbar and buttons are used in this app.

Details about using Native Components [Here](http://docs.monaca.mobi/reference/native_ui/)


### Accelerometer (using PhoneGap)

By using PhoneGap, you can get many device informations and use native features.

For example, in this App the Accelerometer is used to move the paddle.

(in main.js, function toggleAccel)


### Google Web Fonts
I use CSS3 font-face to set font in this App.

I downloaded font file from Google Web Fonts,

and uploaded it to Monaca IDE by drag&dropping into the Project Tree.






# ブロックくずし
昔ながらのシンプルなブロックくずし。

Monaca+enchant.jsで動いています。

## 概要
ロードと同時に自動的にゲームが始まります。

落ちてくるボールを白いパドルで跳ね返し、ブロックを全て消したらクリア。
ボールが画面下に落ちてしまったらゲームオーバーです。


パドルの移動は端末を左右に傾けて行います。（実機でお試しください）


ボールがパドルに近づいたときにタイミングよく画面をタップするとボールをキャッチ！

押しっぱなしでホールド、指を離すとボールが再び発射されます。

### 得点
灰色（銀色）のブロック：200点

普通のブロック：1000点

金のブロック：3000000点

## 解説
### enchant.jsを使用する
enchant.min.jsをプロジェクトのjsフォルダにアップロード、index.htmlで読み込みます。

また、ゲームに関するコードはjs/main.jsに記述しています。

このサンプルはとてもシンプルなものですが、ボールやパドルなどの主要なパーツはクラスを定義してありますので（94行目から）興味があれば機能を追加してみてください。

enchant.jsを使うとクラスの定義や継承が簡単にできるので便利です。

[enchant.js 公式サイト](http://enchantjs.com/ja/)

### ネイティブコンポーネント
index.uiの設定に沿って、各端末でネイティブのツールバーやボタンを表示。

ネイティブコンポーネントの詳細については[こちら](http://docs.monaca.mobi/reference/native_ui/)をご覧ください。

### PhoneGapで加速度センサーの値を取得する
PhoneGapを利用することでiOSやAndroid端末のさまざまな情報を取得したり、逆に端末を操作したりできます。

例としてこのゲームでは加速度センサーの値を取得し、それをパドルの加速度に割り当てることで移動を実現しています。


実際のコードでいうと、

main.jsの75行目、toggleAccel関数でnavigator.accelerometer.watchAccelerationを呼び出し、

コールバック関数updateAccelerationを登録して値を更新しています。

取得した値は画面上にも表示していますので参考にしてください。

また、その他にもさまざまな機能を利用可能です（このアプリではバイブレーション機能などを使用）。

### Google Web Fontsの利用
レトロゲームの雰囲気を出したかったのでGoogle Web Fontsを使ってスコア表示のフォントを変更しました。

MonacaはHTMLベースで記述を行うため、ウェブサイト用のサービスを一部利用することができます。

（全サービスのMonaca上での動作を保障するものではありません）

フォントをGoogle Web Fontsなどからダウンロードし、

プロジェクト内の任意の場所にアップロードしてください。

その後、CSS3の@font-faceでフォントのファイルを指定してあげればOKです。

プロジェクト内にファイルを含めてしまえばオフライン動作時でもきちんと指定のフォントで表示されます。
