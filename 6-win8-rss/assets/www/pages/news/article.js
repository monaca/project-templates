// ページ コントロール テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    //画面レイアウト対応
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var contentURL = "";
    var contentTitle = "";

    WinJS.UI.Pages.define("/pages/news/article.html", {
        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            // TODO: ここでページを初期化します。

            //スナップビューを解除
            Windows.UI.ViewManagement.ApplicationView.tryUnsnap();

            var articleData = options.newsData;
            renderRSS(articleData);
            contentURL = articleData.link;
            contentTitle = articleData.title;

            //共有ソースを設定
            dataTransferManager.addEventListener("datarequested", dataRequested);

        },

        unload: function () {
            // TODO: このページからの移動に対応します。

            //ハンドラのバッティングを避けるためにハンドラを削除
            dataTransferManager.removeEventListener("datarequested", dataRequested);
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: viewState の変更に対応します。
        }
    });

    //共有ソースの設定 
    function dataRequested(e) {
        var request = e.request;
        
        // Title は必須
        var dataPackageTitle = contentTitle;
        if ((typeof dataPackageTitle === "string") && (dataPackageTitle !== "")) {
            var dataPackageText = contentURL;
            if ((typeof dataPackageText === "string") && (dataPackageText !== "")) {
                request.data.properties.title = contentTitle;
                request.data.setUri(Windows.Foundation.Uri(dataPackageText));
            } else {
                request.failWithDisplayText("本文が設定されていません。");
            }
        } else {
            request.failWithDisplayText("タイトルが設定されていません。");
        }
    }

    //RSS データをページに書きだす
    function renderRSS(rssItems) {

        var article = rssItems.description;
        var subTitle = article;
        subTitle = subTitle.substring(0, subTitle.indexOf("\n"));

      
        document.getElementById("article").innerText = article;

        //本文が HTML で記述されている場合は以下を使用
        //document.getElementById("article").innerHTML = toStaticHTML(article); 

        var area = document.getElementById("contentArea");
        var pageTitleLink = document.getElementById("pagetitleLink");

        pageTitleLink.innerText = rssItems.title;
        pageTitleLink.addEventListener("click",
          function () {
              WinJS.Navigation.navigate("/pages/news/view.html", { url: contentURL, title: rssItems.title });
          });

        document.getElementById("pubDateDisplay").innerText = rssItems.pubDateDisplay;
        document.getElementById("sourceTitle").innerHTML = "　-　"
            + rssItems.title + "　(<a href='"
            + rssItems.link + "'>"
            + rssItems.group.title + "</a>)";

        var imgElement = document.getElementById("carImage");
        if (!rssItems.includingPicture) {
            imgElement.src = rssItems.pictute;
        }
        else { imgElement.style.visibility = "hidden"; }
    }

})();
