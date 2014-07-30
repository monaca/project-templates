var app = angular.module('myApp', ['onsen.directives']);

app.service('sharedProperties', function ()
{
  var property;

  return {
    getProperty: function ()
    {
      return property;
    },
    setProperty: function(value)
    {
      property = value;
    }
  };
});

function List_Ctrl($scope, sharedProperties)
{

  var get_list = function()
  {
    setTimeout(function(){
       var content = jQuery.parseJSON(sharedProperties.getProperty());
      var friends = content.friends_list.data;
      var len = friends.length;
      $scope.len = len;
      //showing only 20 friends
      len = 20;
      var tmp = new Array()
      var profile_pic;
      for(var i=0;i<len;i++)
      {
        friends[i].pic_src = friends[i].picture.data.url;
        tmp[i] = friends[i];
      }
      
      $scope.friends = tmp;
      $scope.$apply();
    }, 0);

  };

  get_list();
}

function Profile_Ctrl($scope, sharedProperties)
{
  var content = jQuery.parseJSON(sharedProperties.getProperty());
  $scope.user_name = content.name;
  $scope.profile_pic = content.profile;
}

function Connect_Ctrl($scope, sharedProperties)
{
  $scope.connect = function()
  {
    var client_id = '191042334383020'; //YOUR App ID or API Key
    var client_secret = '50a3083a12e0fd435f77ad06900dc371'; //// YOUR App Secret
    var redirect_uri = 'http://www.facebook.com/connect/login_success.html';  //// YOUR CALLBACK URL
    var display = 'touch';
    var authorize_url = "https://graph.facebook.com/v2.0/oauth/authorize?";
        authorize_url += "client_id=" + client_id;
        authorize_url += "&redirect_uri=" + redirect_uri;
        authorize_url += "&display=" + display;
        authorize_url += "&scope=publish_stream,offline_access";

    var ref = window.open(authorize_url, '_blank', 'location=yes');
    ref.addEventListener('loadstart', function(event)
    {
      var loc = event.url;
      if(loc.indexOf(redirect_uri + "?") >= 0)
      {
        var result = loc.split("#")[0];
        var accessToken = result.split("&")[0].split("=")[1];

        var url = 'https://graph.facebook.com/v2.0/oauth/access_token?';
            url += 'client_id=' + client_id;
            url += '&client_secret=' + client_secret;
            url += '&code=' + accessToken;
            url += '&redirect_uri=' + redirect_uri;

        var req = new XMLHttpRequest();
        req.open("post",url,true);
        req.send(null);
        req.onerror = function(){alert("Fail to get access token!");};
        req.onload = function(evt)
        {
          var temp = evt.target.responseText.split('&')[0].split('=')[1];
          accessToken = temp;

          url = 'https://graph.facebook.com/v2.0/me?fields=name,picture&access_token=' + accessToken;
          req = new XMLHttpRequest();
          req.open("get",url,true);
          req.send(null);
          req.onerror = function(){alert("Fail to get the information of the authenticated user!");};
          req.onload = function(evt)
          {
            var json = jQuery.parseJSON(evt.target.responseText);
            var info_obj = new Object();
            info_obj.name = json.name;
            info_obj.profile = json.picture.data.url;

            url = "https://graph.facebook.com/v2.0/me/taggable_friends?access_token=" + accessToken;
            req = new XMLHttpRequest();
            req.open("get",url,true);
            req.send(null);
            req.onerror = function(){alert("Error");};
            req.onload = function(evt)
            {
              var json = jQuery.parseJSON(evt.target.responseText);
              info_obj.friends_list = json;
              var info_json = JSON.stringify(info_obj);
              sharedProperties.setProperty(info_json);
              ref.close();
              $scope.ons.navigator.pushPage('profile.html',{ title: 'Profile' });
              $scope.$apply();
            };
          }
        }
      }
    });
  };
}