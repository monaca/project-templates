(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application", {
        PageControlNavigator: WinJS.Class.define(
            // PageControlNavigator のコンストラクター関数を定義します。
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");
                this._element.appendChild(this._createPageElement());

                this.home = options.home;
                this._lastViewstate = appView.value;

                nav.onnavigated = this._navigated.bind(this);
                window.onresize = this._resized.bind(this);

                document.body.onkeyup = this._keyupHandler.bind(this);
                document.body.onkeypress = this._keypressHandler.bind(this);
                document.body.onmspointerup = this._mspointerupHandler.bind(this);

                Application.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,

                // これは、現在読み込まれているページ オブジェクトです。
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // これは現在のページのルート要素です。
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // 読み込まれる新しいページのコンテナーを作成します。
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                // 現在のページにあるアニメーション要素の一覧を取得します。
                // ページで一覧が定義されていない場合は、ページ全体をアニメーション化します。
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                // BackSpace キーが押され、入力フィールドによってキャプチャされない場合に、後ろに
                // 移動します。
                _keypressHandler: function (args) {
                    if (args.key === "Backspace") {
                        nav.back();
                    }
                },

                // Alt キーと文字キーまたは Alt キーと右方向キーの組み合わせが押された場合に、前または後ろに
                // 移動します。
                _keyupHandler: function (args) {
                    if ((args.key === "Left" && args.altKey) || (args.key === "BrowserBack")) {
                        nav.back();
                    } else if ((args.key === "Right" && args.altKey) || (args.key === "BrowserForward")) {
                        nav.forward();
                    }
                },

                // この機能はクリックに反応し、マウスの前ボタンと後ろボタンを使用した
                // ナビゲーションを有効にします。
                _mspointerupHandler: function (args) {
                    if (args.button === 3) {
                        nav.back();
                    } else if (args.button === 4) {
                        nav.forward();
                    }
                },

                // 新しいページを DOM に追加してナビゲーションに対応します。
                _navigated: function (args) {
                    var newElement = this._createPageElement();
                    var parentedComplete;
                    var parented = new WinJS.Promise(function (c) { parentedComplete = c; });

                    this._lastNavigationPromise.cancel();

                    this._lastNavigationPromise = WinJS.Promise.timeout().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state, parented);
                    }).then(function parentElement(control) {
                        var oldElement = this.pageElement;
                        if (oldElement.winControl && oldElement.winControl.unload) {
                            oldElement.winControl.unload();
                        }
                        this._element.appendChild(newElement);
                        this._element.removeChild(oldElement);
                        oldElement.innerText = "";
                        this._updateBackButton();
                        parentedComplete();
                        WinJS.UI.Animation.enterPage(this._getAnimationElements()).done();
                    }.bind(this));

                    args.detail.setPromise(this._lastNavigationPromise);
                },

                // サイズ変更イベントに対応し、現在読み込まれているページに対して updateLayout 関数を
                // 呼び出します。
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement, appView.value, this._lastViewstate);
                    }
                    this._lastViewstate = appView.value;
                },

                // 戻るボタンの状態を更新します。ナビゲーション完了後に
                // 呼び出されます。
                _updateBackButton: function () {
                    var backButton = this.pageElement.querySelector("header[role=banner] .win-backbutton");
                    if (backButton) {
                        backButton.onclick = function () { nav.back(); };

                        if (nav.canGoBack) {
                            backButton.removeAttribute("disabled");
                        } else {
                            backButton.setAttribute("disabled", "disabled");
                        }
                    }
                },
            }
        )
    });
})();
