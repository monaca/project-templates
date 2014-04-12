
var LoginPageController = {
    init : function() {
        $(function() {
            LoginPageController.prepare();
        });
    },

    prepare : function() {
        $('#login').on('tappable-tap', function() {
            LoginPageController.login();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });
    },

    login : function() {
        var userName = $('#user-name').val();
        var password = $('#password').val();

        NCMB.User.logIn(userName, password, {
            success : function(user) {
                // 成功
                alert("ログインに成功しました");
                location.href = 'user.html';
            },
            error : function(user, error) {
                // エラー
                alert("ログインに失敗しました");
                console.log(JSON.stringify(arguments));
            }
        });
    }
};



