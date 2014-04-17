// ナビゲーション テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: このアプリケーションは新しく起動しました。ここでアプリケーションを
                // 初期化します。
            } else {
                // TODO: このアプリケーションは中断状態から再度アクティブ化されました。
                // ここでアプリケーションの状態を復元します。
            }

            AddSettingsFlyout();

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。アプリケーションが中断される前に 
        // 非同期操作を終了する必要がある場合は 
        // args.setPromise() を呼び出してください。
        app.sessionState.history = nav.history;
    };

    //チャーム[設定]にメニューを表示する by ものえ
    function AddSettingsFlyout() {
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "help": { title: "このアプリケーションについて", href: "/pages/settings/settingFlyout.html" },
                "plivacy": { title: "プライバシーポリシー", href: "/pages/settings/privacy.html" }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }

    //チャーム[設定]にメニューを表示する by ものえ
    function AddSettingsFlyout() {
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "help": { title: "このアプリケーションについて", href: "/pages/settings/settingFlyout.html" },
                "plivacy": { title: "プライバシーポリシー", href: "/pages/settings/privacy.html" }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    }

    app.start();
})();
