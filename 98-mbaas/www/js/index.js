
var IndexPageController = {
    init : function() {
        $(function() {
            IndexPageController.prepare();
        });
    },

    prepare : function() {
        $('#todo-page').on('tappable-tap', function() {
            location.href = 'todo.html';
        });

        $('#gallery-page').on('tappable-tap', function() {
            location.href = 'gallery.html';
        });

        $('#login-page').on('tappable-tap', function() {
            location.href = 'login.html';
        });
    }
};

