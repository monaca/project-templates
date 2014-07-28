///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#SaveBtn").click(onSaveBtn);
  $("#EditBtn").click(onEditBtn);
  $("#UpdateBtn").click(onUpdateBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
  $("#YesBtn_delete").click(deleteMemo);
});



var currentMemoID;
var MC = monaca.cloud;

function onRegisterBtn()
{
  var email = $("#reg_email").val();
  var password = $("#reg_password").val();

  MC.User.register(email, password)
    .done(function()
    {
      console.log('Registration is success!' + MC.User._oid);
      $.mobile.changePage('#ListPage');
    })
    .fail(function(err)
    {
      alert('Registration failed!');
      console.error(JSON.stringify(err));
    });
}

function onLoginBtn()
{
  var email = $("#login_email").val();
  var password = $("#login_password").val();
  var MC = monaca.cloud;
  MC.User.login(email, password)
    .done(function()
    {
      console.log('login: '  + MC.User._oid);
      getMemoList();
      $.mobile.changePage('#ListPage');
    })
    .fail(function(err)
    {
      alert('Login failed: ' + err.message);
      console.error(JSON.stringify(err));
    });
}

function onLogoutBtn()
{
  MC.User.logout()
    .done(function()
    {
      console.log('Logout is success!');
      $.mobile.changePage('#LoginPage');
    })
    .fail(function(err)
    {
      alert('Logout failed!');
      console.error(JSON.stringify(err));
    });
}

function onSaveBtn()
{
  var title = $("#title").val();
  var content = $("#content").val();
  if (title != '')
  {
    addMemo(title,content);
  }
}

function addMemo(title,content) {
  var memo = MC.Collection("Memo");

  memo.insert({ title: title, content: content})
  .done(function(insertedItem)
  {
    console.log('Insert is success!');
    $("#title").val("");
    $("#content").val("");

    // display a dialog stating that the inserting is success
    $("#okDialog_add").popup("open", {positionTo: "origin"}).click(function(event)
    {
      getMemoList();
      $.mobile.changePage('#ListPage');
    });
  })
  .fail(function(err){
    if (err.code == -32602) {
      alert("Collection 'Memo' not found! Please create collection from IDE.");
    } else {
      console.error(JSON.stringify(err));
      alert('Insert failed!');
    }
  })
}

function onShowLink(id,title,content)
{
  currentMemoID = id;
  $("#title_show").text(title);
  $("#content_show").text(content);
  $.mobile.changePage("#ShowPage");
}

function onDeleteBtn(id)
{
  currentMemoID = id;
  $( "#yesNoDialog_delete" ).popup("open", {positionTo: "origin"})
}

function deleteMemo()
{
  console.log('yes');
  var memo = MC.Collection("Memo");
  memo.findOne(MC.Criteria("_id==?", [currentMemoID]))
    .done(function(item)
    {
      console.log(JSON.stringify(item));
      item.delete()
      .done(function()
       {
          console.log("The memo is deleted!");
          getMemoList();
          $.mobile.changePage("#ListPage");
       })
       .fail(function(err){
           console.log("Fail to delete the item.");
       });
      
    })
    .fail(function(err){
      console.error(JSON.stringify(err));
      alert('Insert failed!');
    });
}

function onEditBtn()
{
  var title = $("#title_show").text();
  var content = $("#content_show").text();
  $("#title_edit").val(title);
  $("#content_edit").text(content);
  $.mobile.changePage("#EditPage");
}

function onUpdateBtn()
{
  var new_title = $("#title_edit").val();
  var new_content = $("#content_edit").val();
  var id = currentMemoID;
  if (new_title != '') {
    editMemo(id, new_title, new_content);
  }
}

function editMemo(id, new_title, new_content){
  var memo = MC.Collection("Memo");
  memo.findMine(MC.Criteria("_id==?", [id]))
    .done(function(items, totalItems)
    {
      items.items[0].title = new_title;
      items.items[0].content = new_content;
      items.items[0].update()
        .done(function(updatedItem)
        {
          console.log('Updating is success!');
          //display a dialog stating that the updating is success
          $( "#okDialog_edit" ).popup("open", {positionTo: "origin"}).click(function(event)
          {
            getMemoList();
            $.mobile.changePage("#ListPage");
          });
        })
        .fail(function(err){ console.error(JSON.stringify(err)); });
    })
    .fail(function(err){
      console.error(JSON.stringify(err));
    });
}

function getMemoList() {
  console.log('Refresh List');
  var MC = monaca.cloud;
  var memo = MC.Collection("Memo");
  memo.findMine()
    .done(function(items, totalItems)
    {
        console.log("all: " + JSON.stringify(items));
      $("#ListPage #TopListView").empty();
      var list = items.items;

      for (var i in list)
      {
        var memo = list[i];
        var d = new Date(memo._createdAt);
        var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        $li = $("<li><a href='javascript:onShowLink(\"" + memo._id + "\",\"" + memo.title + "\",\"" + memo.content + "\")' class='show'><h3></h3><p></p></a><a href='javascript:onDeleteBtn(\"" + memo._id + "\")' class='delete'>Delete</a></li>");
        $li.find("h3").text(date);
        $li.find("p").text(memo.title);
        $("#TopListView").prepend($li);
      }
      if (list.length == 0) {
        $li = $("<li>No memo found</li>");
        $("#TopListView").prepend($li);
      }
      $("#ListPage #TopListView").listview("refresh");
    })
  .fail(function(err){
    if (err.code == -32602) {
      alert("Collection 'Memo' not found! Please create collection from IDE.");
    } else {
      console.error(JSON.stringify(err));
      alert('Insert failed!');
    }
  });
}