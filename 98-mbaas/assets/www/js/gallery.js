
var GalleryController = {

    init : function() {
        $(function() {
            GalleryController.prepare();
        });
    },

    // onload時の処理を行う
    prepare : function() {
        $('#image-file').change(function() {
            GalleryController.upload();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });

        this.refresh();
    },

    // 画像をアップロードする
    upload : function() {
        var fileInput = $("#image-file")[0];

        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            
            if ((/\.(png|jpg|jpeg|gif)$/i).test(file.name)) {

                if (window.cordova) {
                  delete File;  // Avoid conflict with PhoneGap File API
                }
                var ncmbFile = new NCMB.File(file.name, file);
                
                ncmbFile.save().then(function() {
                    // アップロード成功
                    GalleryController.refresh();
                    hideSpinner();
                }, function(error) {
                    // アップロード失敗
                    alert(error);
                    hideSpinner();
                });

                showSpinner();
            }
        }

    },

    refresh : function() {

        showSpinner();

        var query = new NCMB.Query("file");

        query.find({
            success: function(files) {
                GalleryController.render(files);
            },
            error: function(err) {
              // 失敗
              console.log(err);
            }
        });
    },

    // 画像をリストにして表示する
    render : function(files) {
        var cellTemplate = $('#grid-table-cell-template')[0];
        var fragment = document.createDocumentFragment();

        files.map(function(file) {
            var cell = cellTemplate.cloneNode(true);
            $('img', cell).attr('src', downloadImage(file.get('fileName')));

            return cell;
        }).forEach(function(tableCell) {
            fragment.appendChild(tableCell);
        });

        $('.grid-table-body').empty().append(fragment);

        hideSpinner();
    }
};

var downloadImage = function(fileName) {
    var route = "files";
    var objectId = null;
    var api_version = "2013-09-01"
    var url = "https://mb.api.cloud.nifty.com/" + api_version + "/" + route + "/" + fileName;

    // タイムスタンプの生成
    var timestamp = new Date().toISOString().replace('/:/g', '%3A');

    // シグネチャの計算
    var signature = NCMB._createSignature(route, fileName, objectId, url, 'GET', timestamp);

    // リクエストの実行
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.overrideMimeType('text/plain; charset=x-user-defined');
    request.setRequestHeader("X-NCMB-Application-Key", window.APP_KEY);
    request.setRequestHeader("X-NCMB-Timestamp", timestamp);
    request.setRequestHeader("X-NCMB-Signature", signature);
    request.send(null);

    if (request.status != 200) {
        alert("取得に失敗しました");
        return;
    }

    var response = request.responseText;

    // 画像のバイナリを文字列に変換
    var s_response = '';
    for (i = 0; i < response.length; i++){
        s_response += String.fromCharCode(response.charCodeAt(i) & 0xff);
    }

    // 画像形式の推定
    var header = s_response.substring(0,9);
    var type;
    if (header.match(/^\x89PNG/)) {
        type = 'png';
    } else if (header.match(/^BM/)){
        type = 'bmp';
    } else if (header.match(/^GIF87a/) || header.match(/^GIF89a/)) {
        type = 'gif';
    } else if (header.match(/^\xff\xd8/)) {
        type = 'jpeg';
    } else {
        alert("画像ファイルの形式が特定できないため中断しました");
        return;
    }

    // base64変換してimgタグに直書き込み
    var data = 'data:image/' + type + ';base64,' + btoa(s_response);

    return data;
};
