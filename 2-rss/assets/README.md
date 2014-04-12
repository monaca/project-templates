(日本語の説明は英語の後に記述されます)

RSS Reader Example
==================

This project contains a sample of RSS reader application. RSS is widely used
for blog and other timelined documents. By using this sample, you can easily
integrate your blog or other information into an application format.

Your TODO
---------

1. Change RSS URL

  The RSS feed URL is specified in index.html.
  Please modify those two lines mentioned by "CHANGE HERE!" to wherever appropriate.

2. Change look & feel

  This application has only one page, which consists of two files:
  
    - index.html: HTML of the page
    - index.ui  : Native component of the page

  index.html contains entire HTML as well as main program of the page. On the other
  hand, index.ui contains native UI widgets of the page, which is the top toolbar
  in this case.

  index.html also refers to css/style.css for stylesheet definition.
  You can modify this stylesheet to change the look&feel.

  index.ui describes native UI component of the page. You can see the reference
  by the url: <http://docs.monaca.mobi/reference/native_index/>

3. Change behavior

  JavaScript program is loaded from js/feed-reader.js.
  You can modify source code to suite your needs.

4. Debug

  You need to use Monaca Debugger to check the behaviour. It is not possible to 
  check it on-line, because there is cross-domain problem between IDE and RSS
  feed server.

5. Build & Deploy

  You can build & deploy this app for Android and iOS. Please 
  refer to the manual for details: <http://docs.monaca.mobi/manual/>


RSSリーダーサンプル
===================

本プロジェクトには、RSSリーダーアプリケーションのサンプルが含まれています。
RSSは、ブログなどの時系列ドキュメントで広く使用されます。
このサンプルを使うことで、ブログやその他の情報を、
アプリケーションフォーマットの中へ簡単に統合することができます。

あなたの作業
------------

1. RSSフィードURLの変更

  RSSフィードURLは、index.htmlの中で指定されています。
  「CHANGE HERE!」と書かれた行を、適切なURLに修正して下さい。

2. 外観の変更

  本アプリケーションのページ数は1ページのみで、次の2つのファイルから構成されます:

    - index.html: ページのHTML
    - index.ui : ページのネイティブコンポーネント

  index.htmlには、全HTMLと共に、ページのメインプログラムが含まれています。
  一方、index.uiには、ページのネイティブUIウィジェットが含まれており、
  このサンプルの場合、上部ツールバーとして表示されます。

  index.htmlはcss/style.cssを参照しています。
  内容を修正することで、外観を変更することができます。

  index.uiは、ページのネイティブUIコンポーネントを記述しています。
  次のURLで参考資料を見ることができます: <http://docs.monaca.mobi/reference/native_index/>

3. 動作の変更 

  JavaScriptプログラムは js/feed-reader.js に配置されています。
  ソースコードは必要に応じて修正することができます。

4. デバッグ

  動作をチェックするには、Monacaデバッガーを使う必要があります。
  開発環境とRSSフィードサーバーとの間にはクロスドメイン問題が存在するため、
  IDEのプレビューでは動作をチェックすることができません。

5. 構築および配布

  このアプリをAndroidまたはiOS向けにビルドし、配布することができます。
  詳しいマニュアルは次のURLを参照してください: <http://docs.monaca.mobi/manual/>

