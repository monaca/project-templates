(function () {
    "use strict";

    var RssItemsArray = [];

    var sourceInfo = [{
        url: "http://www.microsoft.com/japan/technet/rss/articles_rss.aspx?category=093",
        group: {
            key: "technet-online",
            category: "it-pro",
            title: "TechNet オンライン"
        }
    }, {
        url: "http://www.microsoft.com/japan/msdn/rss.xml",
        group: {
            key: "MSDN",
            category: "developer",
            title: "MSDN オンライン"
        }
    }];

    var _readCount = 0;
    var _listIndex = 0;
    var _callBackFunction = null;

    WinJS.Namespace.define("RSS",
           {
               getRss: getRss
           });

    function getRss(callBackFunction) {

        _callBackFunction = callBackFunction;

        
        var secondJob = function () {
            _readCount++;
            WinJS.xhr({
                url: sourceInfo[_readCount].url
            }).then(loadRSS, errHendler).then(defineNameSpace).done(callBackFunction);
        };
        
        
        //RSS が一つしかない場合は ① のコメントを解除し、② コメントアウト
        WinJS.xhr({
            url: sourceInfo[_readCount].url
        }).then(loadRSS, errHendler)//.then(defineNameSpace).done(callBackFunction); //①
           .then(secondJob); //②
    }

    function loadRSS(response) {
        //RSS の記事一覧が格納される
        
        var skipWord = "PR:";
        var resXML = response.responseXML;
        var items = resXML.querySelectorAll("rss > channel > item");
        var length = items.length;

        for (var i = 0; i < length; i++) {
            var _item = items[i];
            var _title = _item.querySelector("title").textContent;
            var _link = _item.querySelector("link").textContent;
            var _date = new Date(_item.querySelector("pubDate").textContent);
            if ((_date.getFullYear() <= (new Date()).getFullYear()) && _title.indexOf(skipWord) < 0) {
                var _description = (_item.querySelector("description") != null) ? _item.querySelector("description").textContent : "";
                var _picture = null;
                var _includingPic = false;
                var _enclosure = _item.querySelector("enclosure");
                if (_enclosure != null)
                { _picture = _enclosure.attributes["url"].value; }
                
                var _encoded = _item.querySelector("encoded");
                if (_encoded != null) {
                    var str = _encoded.textContent;
                    _description += "<br><br>" + str;
                   
                        str = getFromImagePath(str);
                        if (str) {
                            _picture = str;
                            _includingPic = true;
                        }
                }

                if (_picture==null) {
                    var str = _description;
                    str = getFromImagePath(str);
                    if (str) {
                        _picture = str;
                        _includingPic = true;
                    }
                }
                if (!_picture) { _picture = "/images/NoPhoto.png"; }
                RssItemsArray.push({
                    listIndex: _listIndex++,
                    group: sourceInfo[_readCount].group,
                    title: _title,
                    link: _link,
                    pubDate: _date,
                    pubDateDisplay: appUtil.formatDatetime_JP(_date),
                    description: _description,
                    pictute: _picture,
                    includingPicture: _includingPic
                });
            }
        }
    }

   
    function errHendler(ex)
    {
        if (RssItemsArray)
        {
            defineNameSpace();
            _callBackFunction();
        }
    }


    //画像の URL を取り出す
    function getFromImagePath(str) {
        var imgInex = str.indexOf("<img");
        if (imgInex >= 0) {
            str = str.substring(imgInex + 4, str.length);
            imgInex = str.indexOf("src=");
            str = str.substring(imgInex + 5, str.length)
            var extenPoint = (str.indexOf(".jpg") + 4);
            if (extenPoint < 4) extenPoint = (str.indexOf(".jpeg") + 5);
            if (extenPoint < 5) extenPoint = (str.indexOf(".gif") + 4);
            if (extenPoint < 4) extenPoint = (str.indexOf(".png") + 4);
            if (extenPoint < 4) {
                return null;
            } else {
                str = str.substring(0, extenPoint);
                return str;
            }
        }
        return null;
    }

   
   
   

    function compareItem(leftItem, rightItem) {
        return rightItem.pubDate - leftItem.pubDate;
    }

    //その他ファイルで使用できるように
    function defineNameSpace() {

        RssItemsArray.sort(compareItem);

        WinJS.Namespace.define("RSS",
              {
                  initJob:initJob,
                  newsFeeds: RssItemsArray,
              });
    }

    //再処理を行う際のリセット作業
    function initJob() {
        RssItemsArray = [];
        _readCount = 0;
        _listIndex = 0;
        _callBackFunction = null;
    }


})();

