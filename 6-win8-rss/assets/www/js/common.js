(function () {
    "use strict";

    //document.getElementById をいちいち書くのが面倒なので
    function id$(elementID) {
        return document.getElementById(elementID);
    }

    //日付を年月日に
    function formatDatetime_JP_from_string(data) {
        var dateObj = new Date(data.pubDate);
        return dateObj.getFullYear() + "年"
            + (dateObj.getMonth() + 1) + "月"
            + dateObj.getDate() + "日"
            + dateObj.getHours() + "時"
            + dateObj.getMinutes() + "分";
    }

    function formatDate_JP(dateObj) {
        return dateObj.getFullYear() + "年"
            + (dateObj.getMonth() + 1) + "月"
            + dateObj.getDate() + "日";
    }

    function formatDatetime_JP(dateObj) {
        return formatDate_JP(dateObj) + " "
            + formatFrontZero(dateObj.getHours()) + "時"
            + formatFrontZero(dateObj.getMinutes()) + "分";
    }

    //ダイアログボックスを表示する
    function showDlg(msg) {
        var dlg = new Windows.UI.Popups.MessageDialog(msg);
        dlg.showAsync();
    }

    //トーストを表示する
    function showToast(msg) {
        var template = Windows.UI.Notifications.ToastTemplateType.toastImageAndText01;
        var toastXml = Windows.UI.Notifications.ToastNotificationManager.getTemplateContent(template);
        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].appendChild(toastXml.createTextNode(msg));
        var toast = new Windows.UI.Notifications.ToastNotification(toastXml);
        var toastNotifier = Windows.UI.Notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    }


    function showFlyOut(msg, elementID) {
        var flyOutCtrl = document.getElementById("flyOut");
        flyOutCtrl.innerText = msg;
        flyOutCtrl.winControl.show(document.getElementById(elementID));
    }

    //IE を起動して Web ページを表示する
    function launchUrl(pageURL) {
        Windows.System.Launcher.launchUriAsync(Windows.Foundation.Uri(pageURL));
    }

    //一桁の数字の先頭に 0 を付ける
    function formatFrontZero(dMin) {
        return (dMin < 10) ? "0" + dMin : "" + dMin;
    }

    //オフラインの際にページを移動
    function checkOnline() {
        if (!navigator.onLine) {
            showDlg("ネットワークは現在オフラインです。\n本アプリはオフラインでは使用することができません。\nインターネットへの接続を確認し、やりなおしてください。");
            return false;
        }
        return true;
    }

    WinJS.Namespace.define("appUtil", {
        id$: id$,
        showDlg: showDlg,
        showToast: showToast,
        showFlyOut:showFlyOut,
        formatDate_JP: formatDate_JP,
        formatDatetime_JP_from_string: formatDatetime_JP_from_string,
        formatDatetime_JP: formatDatetime_JP,
        checkOnline : checkOnline,
        launchUrl: launchUrl
    });
    //WinJS.Utilities.markSupportedForProcessing(appUtil.formatDatetime_JP_from_string);
})();