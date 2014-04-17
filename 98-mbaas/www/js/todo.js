
var TODO = NCMB.Object.extend('TODO');

var TODOListController = {

    init : function() {
        $(function() {
            TODOListController.prepare();
        });
    },

    prepare : function() {
        $('#add-todo').on('tappable-tap', function() {
            TODOListController.add();
        });

        $('#back').on('tappable-tap', function() {
            location.href = 'index.html';
        });

        TODOListController.refresh();
    },

    add : function() {
        var todo = prompt('TODOを追加');

        if (typeof todo === 'string' && todo.length > 0) {
            // TODOを保存
            new TODO().save({
                todo : todo
            }, {
                success : function() {
                    alert("TODO追加できました");
                    TODOListController.refresh();
                }, 
                error : function() {
                    alert("エラーがおきました:");
                }
            });
        }
    },

    refresh : function() {

        showSpinner();

        var query = new NCMB.Query(TODO);
        query.find({
            success : function(results) {
                TODOListController.render(results);
            },
            error : function(error) {
                console.log(JSON.stringify(arguments));
            }
        }); 
    },

    render : function(todoArray) {
        var tableCellTemplate = $('#table-cell-template')[0];
        var fragment = document.createDocumentFragment();

        todoArray.map(function(todo) {
            var tableCell = tableCellTemplate.cloneNode(true);
            console.log(todo);
            $('p', tableCell).text(todo.get('todo'));

            return tableCell;
        }).forEach(function(tableCell) {
            fragment.appendChild(tableCell);
        });

        $('.table-body').empty().append(fragment);

        hideSpinner();
    }
};
