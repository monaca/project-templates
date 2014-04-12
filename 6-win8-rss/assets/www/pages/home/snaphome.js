// ページ コントロール テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var app = WinJS.Application;

    //画面レイアウト対応
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var appView = Windows.UI.ViewManagement.ApplicationView;

    WinJS.UI.Pages.define("/pages/home/snaphome.html", {
        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            if ((appView.value == appViewState.fullScreenLandscape) || (appView.value == appViewState.filled)) {
                WinJS.Navigation.navigate("/pages/home/home.html");
            }

            if (app.sessionState.filterdFeeds) {
                bindList2(app.sessionState.filterdFeeds);
            }
            else {
                bindList();
            }

        },

        unload: function () {
            // TODO: このページからの移動に対応します。
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: viewState の変更に対応します。
            if ((viewState == appViewState.fullScreenLandscape) || (appView.value == appViewState.filled)) {
                WinJS.Navigation.navigate("/pages/home/home.html");
            }
        }
    });

    function bindList() {
        var itemTemplate = document.getElementById("itemTemplate");
        var listView = document.getElementById("itemListView");
        var BindList = new WinJS.Binding.List(RSS.newsFeeds);

        listView.winControl.itemDataSource = BindList.dataSource;
        listView.winControl.itemTemplate = itemTemplate;
        listView.winControl.oniteminvoked = onitemInvoked;
    }

    function bindList2(fillerdFeeds) {
        var itemTemplate = document.getElementById("itemTemplate");
        var listView = document.getElementById("itemListView");
        var BindList = new WinJS.Binding.List(fillerdFeeds);
        listView.winControl.itemDataSource = BindList.dataSource;
        listView.winControl.itemTemplate = itemTemplate;
        listView.winControl.oniteminvoked = onitemInvoked;
    }

    //動画のサムネイルがクリックされた際のハンドラ
    function onitemInvoked(args) {
        args.detail.itemPromise.done(function itemInvoked(item) {
            // TODO: 呼び出された項目に移動します。
            if (appUtil.checkOnline()) {
                WinJS.Navigation.navigate("/pages/news/article.html", { newsData: item.data });
            }
        });
    }


})();
