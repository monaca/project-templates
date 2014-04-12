///// Return list of memo
function getMemoList() {
    var list = localStorage.getItem("memo_list");
    if (list == null) {
        return new Array();
    } else {
        return JSON.parse(list);
    }
}

///// Save memo
function saveMemoList(list) {
    try {
        localStorage.setItem("memo_list", JSON.stringify(list));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}

///// Add memo
function addMemo(text) {
  var list = getMemoList();
  var time = new Date().getTime();
  list.push({ id: time, time: time, text: text });
  saveMemoList(list);
}

///// Delete specified memo
function deleteMemo(id) {
    var list = getMemoList();
    for (var i in list) {
        if (list[i].id == id) {
            list.splice(i, 1);
            break;  // Quit for loop when found
        }
    }
    saveMemoList(list);
}