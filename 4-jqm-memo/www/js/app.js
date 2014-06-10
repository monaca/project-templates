///// Save memo and return to top page
function onSaveBtn() {
    var text = $("#Memo").val();
    if (text != '') {
        // Save to local storage
        addMemo(text);
        // Clear form
        $("#Memo").val("");
        // Initialize top page
        initTopPage();
    }
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Initialize top page
function initTopPage() {
    $("#TopListView").empty();
    
    var list = getMemoList();
    for (var i in list) {
        var memo = list[i];
        var d = new Date(memo.time);
        var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        
        $li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
        $li.data("id", memo.id);
        $li.find("h3").text(date);
        $li.find("p").text(memo.text);
        $("#TopListView").prepend($li);
    }
    if (list.length == 0) {
        $li = $("<li>No memo found</li>");
        $("#TopListView").prepend($li);
    }
    $("#TopListView").listview("refresh");  // Call refresh after manipulating list
}

///// Move to detail page
function onShowLink() {
    var $li = $(this).parent();
    var memoTitle = $li.find("h3").text();
    var memoHtml = $li.find("p").html().replace(/\n/g, "<br>");
    
    $("#ShowPage h1").text(memoTitle);
    $("#ShowPage p").html(memoHtml);
    $.mobile.changePage("#ShowPage");
}

///// Delete memo
function onDeleteLink() {
    if (!confirm("Are you sure to delete this memo?")) {
      return;
    }
    var $li = $(this).parent();
    var id = $li.data("id");
    deleteMemo(id);
    
    initTopPage();
    
    // Return to top
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Called when app launch
function onReady() {
    initTopPage();
    $("#SaveBtn").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

