(function () {
    "use strict";

    var app = WinJS.Application;

    //画面レイアウト対応
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            // TODO: ここでページを初期化します。

            if (navigator.onLine) {
                if (app.sessionState.filterdFeeds) {
                    bindList2(app.sessionState.filterdFeeds);
                    document.getElementById(app.sessionState.labelCaption).winControl.selected = true;
                    selectedChange(app.sessionState.labelCaption);
                }
                else {
                    if (RSS.newsFeeds) {
                        bindList();
                    }
                    else { RSS.getRss(bindList); }
                }
                setAppberHandler();
                setUpdateCaption();
            }
            else {
                offlineJob();
            }
        },

        updateLayout: function (element, viewState, lastViewState) {
            //スナップ表示にされたら潔く別のページに飛ばす
        if (viewState === appViewState.snapped) {
            WinJS.Navigation.navigate("/pages/home/snaphome.html");
        }
    }
    });

    function bindList() {
        var itemTemplate = document.getElementById("itemTemplate");
        var listView = document.getElementById("itemListView");
        var BindList = new WinJS.Binding.List(RSS.newsFeeds);
        listView.winControl.itemDataSource = BindList.dataSource;
        listView.winControl.itemTemplate = itemTemplate;
        listView.winControl.Layout = WinJS.UI.GridLayout;
        listView.winControl.oniteminvoked = onitemInvoked;

        document.getElementById("progressPoint").style.visibility = "hidden";
    }


    function bindList2(fillerdFeeds) {
        var itemTemplate = document.getElementById("itemTemplate");
        var listView = document.getElementById("itemListView");
        var BindList = new WinJS.Binding.List(fillerdFeeds);
        listView.winControl.itemDataSource = BindList.dataSource;
        listView.winControl.itemTemplate = itemTemplate;
        listView.winControl.Layout = WinJS.UI.GridLayout;
        listView.winControl.oniteminvoked = onitemInvoked;

        document.getElementById("progressPoint").style.visibility = "hidden";
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

    function setAppberHandler() {
        document.getElementById("cmdRefresh").addEventListener("click",
            function () {
                document.getElementById("progressPoint").style.visibility = "visible";
                RSS.initJob();
                RSS.getRss(bindList);
                appUtil.showToast("ニュース情報を更新しました。");
            });
        setFilterMenu();
    }

    function setUpdateCaption() {
        document.getElementById("updateCaption").innerText = appUtil.formatDatetime_JP(new Date()) + " 更新";
    }

    function execFilter(categoryType) {
        if (categoryType == "all") {
            bindList2(RSS.newsFeeds);
            app.sessionState.filterdFeeds = null;
            app.sessionState.categoryType = null;
            return;
        }
        var fillerdFeeds = [];
        var loopMax = RSS.newsFeeds.length;
        for (var i = 0; i < loopMax; i++) {
            var feed = RSS.newsFeeds[i];
            if (feed.group.category == categoryType) {
                fillerdFeeds.push(feed);
            }
        }
        bindList2(fillerdFeeds);
        app.sessionState.filterdFeeds = fillerdFeeds;
    }


    function offlineJob() {
        document.getElementById("progressPoint").style.visibility = "hidden";
        document.getElementById("offlineBox").style.display = "block";
        document.getElementById("retryButton").addEventListener("click",
            function () {
                WinJS.Navigation.navigate("/pages/home/home.html");
            });
    }

    function setFilterMenu() {
        document.getElementById("filterMenu0").addEventListener("click",
            function () {
                execFilter("all");
                selectedChange(this.id);
            });

        document.getElementById("filterMenu1").addEventListener("click",
            function () {
                execFilter("developer");
                selectedChange(this.id);
            });

        document.getElementById("filterMenu2").addEventListener("click",
            function () {
                execFilter("it-pro");
                selectedChange(this.id);
            });

        
    }

    function selectedChange(labelCaption) {
        app.sessionState.labelCaption = labelCaption;
        var menuLabels = ["filterMenu0", "filterMenu1",
            "filterMenu2"];
        var menuMax = menuLabels.length;
        for (var i = 0; i < menuMax; i++) {
            var menuLabel = menuLabels[i];
            if (labelCaption != menuLabel) {
                document.getElementById(menuLabel).winControl.selected = false;
            }
        }
    }

})();
