// 検索コントラクト テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO: 次のスクリプト タグをスタート ページの先頭に追加し、
// 検索コントラクト イベントを定期受信します。
//  
// <script src="/pages/search/searchResults.js"></script>

(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/search/searchResults.html";
    var listView;

    ui.Pages.define(searchPageURI, {
        _filters: [],
        _lastSearch: "",

        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            listView = element.querySelector(".resultslist").winControl;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // この関数は、viewState の変更に応じてページ レイアウトを更新します。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".resultslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    var firstVisible = listView.indexOfFirstVisible;
                    this._initializeLayout(listView, viewState);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                }
            }
        },

      
        // この関数は、検索の実行に必要な各手順を実行します。
        _handleQuery: function (element, args) {
            var originalResults;
            this._lastSearch = args.queryText;
            this._initializeLayout(element.querySelector(".resultslist").winControl, Windows.UI.ViewManagement.ApplicationView.value);
            originalResults = this._searchData(args.queryText);
            if (originalResults.length === 0) {
                //document.querySelector('.filterarea').style.display = "none";
            } else {
                document.querySelector('.resultsmessage').style.display = "none";
                listView.itemDataSource = originalResults.dataSource;
            }
        },

        // この関数は、新しいレイアウトで ListView を更新します
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                document.querySelector(".titlearea .pagetitle").textContent = '“' + this._lastSearch + '”';
                document.querySelector(".titlearea .pagesubtitle").textContent = "";
            } else {
                listView.layout = new ui.GridLayout();

                // TODO: "アプリケーション名" をアプリケーションの名前に変更してください。
                //document.querySelector(".titlearea .pagetitle").textContent = "RSS ニュース番長 - 自動車篇";
                document.querySelector(".titlearea .pagesubtitle").textContent = "キーワード“" + this._lastSearch + '”での検索結果';
            }
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: 呼び出された項目に移動します。
                WinJS.Navigation.navigate("/pages/news/article.html", { newsData: item.data });
            });
        },
        
       
        
        // この関数は、指定されたクエリの検索結果を WinJS.Binding.List に
        // 設定します。
        _searchData: function (queryText) {
            var originalResults = new WinJS.Binding.List();

            // TODO: データの適切な検索を実行します。
            queryText = queryText.toLowerCase();
            if (RSS.newsFeeds) {

                for (var i = 0; i < RSS.newsFeeds.length; i++)
                {
                    var feed = RSS.newsFeeds[i];
                    if (feed.title.toLowerCase().indexOf(queryText) >= 0 || feed.description.toLowerCase().indexOf(queryText) >= 0)
                    {
                       //検索の条件に合致したデータを Push
                        originalResults.push({
                            listIndex:i,
                            link: feed.link,
                            group: feed.group,
                            title: feed.title,
                            description: feed.description,
                            pubDate: feed.pubDateDisplay,
                            pictute: feed.pictute
                        });

                    }
                }

            } 
            return originalResults;
        }

    });


    WinJS.Application.addEventListener("activated", function (args) {
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };
})();
