 
var UserPageController = {
    init : function() {
        $(function() {
            UserPageController.prepare();
        });
    },

    prepare : function() {
        $('#logout').on('tappable-tap', function() {
            UserPageController.logout();
        });

        this.load();
    },

    load : function() {

        var currentUser = NCMB.User.current();
        if (currentUser) {
            console.log(currentUser);
            $('#user-name').text(currentUser.get('userName'));
            $('#create-date').text(currentUser.get('createDate'));
            $('#memo').text(currentUser.get('memo'));
        } else {
            alert("ログインしていません");
        }
    },

    logout : function() {
        NCMB.User.logOut();
        location.href = 'login.html';
    }
};

