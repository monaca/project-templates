
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
                var ncmbFile = new NCMB.File(Date.now() + file.name, file);
                
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
            var objFile = new NCMB.File(file.get('fileName'), null, null, null);
            objFile.fetchImgSource($('img', cell).get(0));

            return cell;
        }).forEach(function(tableCell) {
            fragment.appendChild(tableCell);
        });

        $('.grid-table-body').empty().append(fragment);

        hideSpinner();
    }
};

