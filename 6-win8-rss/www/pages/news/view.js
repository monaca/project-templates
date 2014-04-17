// ページ コントロール テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/news/view.html", {
        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            // TODO: ここでページを初期化します。
            var url = options.url;
            var title = options.title;
            document.getElementById("contentFrame").src = url;
            var contentsLink = document.getElementById("contentsTitle");
            contentsLink.innerText = title;
            contentsLink.href = url;
        },

        unload: function () {
            // TODO: このページからの移動に対応します。
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: viewState の変更に対応します。
        }
    });
})();
