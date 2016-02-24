/**
 * This is an auto-generated code by Monaca JS/CSS Components.
 * Please do not edit by hand.
 */

/*** <GENERATED> ***/


/*** <Start:monaca-cordova-loader> ***/
/*** <Start:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
(function(){
  function getDeviceObjectForPreview() {
    var raw_values = window.location.search.substring(1).split('&');
    var values = {};
    var device = { platform: "" };
    
    if (raw_values) {
      for (var key in raw_values) {
        var tmp = raw_values[key].split('=');
        values[tmp[0]] = decodeURIComponent(tmp[1]);
      }
      device.platform = values.platform;
    }
    
    return device;
  }
    
  if (/^https:\/\/preview-.+monaca\.(local||mobi)/.test(location.href)) {
    window.device = getDeviceObjectForPreview();
  }
 
  if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
    if (typeof location.href === "string") {
      var relativePath = location.href.split("/www")[1];
      var paths = relativePath.split("/");
      var cordovaJsUrl = ""; 
      for (var i = 0; i < paths.length - 2; i++) {
        cordovaJsUrl += "../";
      }
      document.write("<script src=\"" + cordovaJsUrl+ "cordova.js" + "\"></script>");
    }
  } else if ( ((navigator.userAgent.match(/MSIE\s10.0/)) && (navigator.userAgent.match(/Windows\sNT\s6.2/)) ) || navigator.userAgent.match(/MSAppHost/) ) {
    var elm = document.createElement('script');
    elm.setAttribute("src", "cordova.js");
    document.getElementsByTagName("head")[0].appendChild(elm);
  };
})();
/*** <End:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
/*** <End:monaca-cordova-loader> ***/


/*** <Start:monaca-core-utils> ***/
/*** <Start:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/**
 * Monaca Core Utility Library
 * This library requires cordova.js
 *
 * @version 2.0.4
 * @author  Asial Corporation
 */
window.monaca = window.monaca || {};

(function() {
    /*
     * monaca api queue.
     */
    monaca.apiQueue = monaca.apiQueue || {};
    monaca.apiQueue.paramsArray = [];
    monaca.apiQueue.exec = function(a,b,c,d,e){
        if (!monaca.isDeviceReady) {
            monaca.apiQueue.paramsArray.push([a,b,c,d,e]);
        } else {
            window.cordova.exec(a,b,c,d,e);
        }
    };
    monaca.apiQueue.next = function(){
        var params = monaca.apiQueue.paramsArray.shift();
        if (params) {
            window.cordova.exec(
                function(r) {
                  if (typeof params[0] === 'function') params[0](r); 
                  monaca.apiQueue.next();
                },
                function(r) {
                  if (typeof params[1] === 'function') params[1](r); 
                  monaca.apiQueue.next();
                },
                params[2],
                params[3],
                params[4]
            );
        }
    };

    monaca.isDeviceReady = monaca.isDeviceReady || false;
    document.addEventListener('deviceready', function(){
        window.monaca.isDeviceReady = true;
        monaca.apiQueue.next();
    }, false);

    /**
     * Check User-Agent
     */
    var isAndroid = !!(navigator.userAgent.match(/Android/i));
    var isIOS     = !!(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    monaca.isAndroid = isAndroid;
    monaca.isIOS     = isIOS;

    /**
     * Obtain style property
     */
    monaca.retrieveUIStyle = function() {
        var argsArray = [].slice.apply(arguments);
        monaca.apiQueue.exec(arguments[arguments.length-1], null, "mobi.monaca.nativecomponent", "retrieve", argsArray);
    };

    /**
     * Update style property
     */
    monaca.updateUIStyle = function(id, name, value) {
        if (typeof id == "string") {
            var argsArray = [].slice.apply(arguments);
            monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", argsArray);
        } else {
            for (var i = 0; i < id.length; i++) {
                monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", [id[i], name, value]);
            }
        }
    };
    
    if (isAndroid) {
        monaca.retrieveUIStyle = function(id, name, success, failure) {
            monaca.apiQueue.exec(
                function(style) { success(style[name]); } || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "retrieve", 
                [id]
            );
        };
            
        monaca.updateUIStyle = function(id, name, value, success, failure) {
            var style = {};
            style[name] = value;
            
            monaca.apiQueue.exec(
                success || function() { }, 
                failure || function() { }, 
                "mobi.monaca.nativecomponent",
                "update", 
                [id, style]
            );
        };
    }

    /**
     * Spinner handling
     */
    monaca.showSpinner = function (options) {
        options = options || {};
        var src = options.src ? options.src : null;
        var frames = options.frames != null ? options.frames : null;
        var interval = options.interval != null ? options.interval : null;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : null;
        var backgroundOpacity = options.backgroundOpacity != null ? options.backgroundOpacity : null;
        var title = options.title ? options.title : null;
        var titleColor = options.titleColor ? options.titleColor : null;
        var titleFontScale = options.titleFontScale != null ? options.titleFontScale : null;
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showSpinner', [ src, frames, interval, backgroundColor, backgroundOpacity, title, titleColor, titleFontScale, null ]);
    };

    monaca.hideSpinner = function(){
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideSpinner', []);
    };

    monaca.updateSpinnerTitle = function(newTitle){
        if (!newTitle) newTitle = "";
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'updateSpinnerTitle', [ newTitle ]);
    };

    var transitionPluginName = "Transit";
    
    /**
     * Open new page.
     */
    monaca.pushPage = function(path, options, param) {
        options = options || {};
        var animation = null;
        switch (options.animation) {
        case "lift":
          animation = "modal"; break;
        case "slide":
        case "slideLeft":
          animation = "push"; break;
        case "slideRight":
          animation = "slideRight"; break;
        default:
          animation = "push";
        }
        monaca.apiQueue.exec(null, null, transitionPluginName, animation, [path, options, param]);
    };
    /**
     * Close current page.
     */
    monaca.popPage = function(options) {
        options = options || {};
        var name = options.animation == 'lift' ? 'dismiss' : 'pop';
        monaca.apiQueue.exec(null, null, transitionPluginName, name, [options]);
    };

    /**
     * Open in browser.
     */
    monaca.invokeBrowser = function(url) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "browse", [url]);
    };

    /** 
     * Load in current page.
     */
    monaca.load = function(path, options, param) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "link", [path, options, param]);
    };

    /**
     * return to top page.
     */
    monaca.home = function(options) {
        options = options || {};
        monaca.apiQueue.exec(null, null, transitionPluginName, "home", [options]);
    };

    /**
     * Clear stack
     */
    monaca.clearPageStack = function(clearAll) {
        clearAll = clearAll || false;
        monaca.apiQueue.exec(null, null, transitionPluginName, "clearPageStack", [clearAll]);
    };


    /**
     * Console API from independent PhoneGap.
     */
    window.monaca.console = window.monaca.console || {};

    /**
     * base method for send log.
     */
    monaca.console.sendLog = function(level, url, line, char, arguments) {
        var message;
        for (var i=0; i<arguments.length; i++){
            if (typeof arguments[i] == "string") {
                message = arguments[i];
            } else {
                message = JSON.stringify(arguments[i]);
            }

            if (isIOS) {
                var head = message.substr(0, 5);
                if (window.monaca.isDeviceReady !== true || (head != 'ERROR' && head != 'WARN:')) {
                    var xhr = new XMLHttpRequest();
                    var path = "monaca://log?level=" + encodeURIComponent(level) + "&message=" + encodeURIComponent(message);
                    xhr.open("GET", path);
                    xhr.send();
                }
            } else {
                window.console[level](message);
            }
        }
    }

    /**
     * monaca console methods
     */
    var methods = ["debug", "info", "log", "warn", "error"];
    for (var i=0; i<methods.length; i++) {
        var method = methods[i];
        monaca.console[method] = function(method) {
            return function() {
                monaca.console.sendLog(method, null, null, null, arguments);
            };
        }(method);
    }
    
    /** Replace window.console if iOS **/
    if (isIOS) {
      window.console = window.monaca.console;
    }
    /* Comment out for now
    window.onerror = function (desc, page, line, char) {
      monaca.console.sendLog("error", page, line, char, [desc]);
    };
    */

    window.monaca.splashScreen = window.monaca.splashScreen || {};
    var splashScreenPluginName = "MonacaSplashScreen";

    /**
     * hide SplashScreen.
     */
    monaca.splashScreen.hide = function() {
        if (isAndroid) {
            monaca.apiQueue.exec(null, null, splashScreenPluginName, "hide", []);
        } else {
            navigator.splashscreen.hide();
        }
    };

    // Set monaca.baseUrl
    if (typeof location.href !== "string") {
        console.warn("Cannot find base url");
        monaca.baseUrl = null;
    } else {
        monaca.baseUrl = location.href.split("/www/")[0] + "/www/";
    }

    /**
     * Get device ID
     */
    monaca.getDeviceId = function(callback) {
        monaca.apiQueue.exec(function(result) { callback(result.deviceId); }, null, "Monaca", "getRuntimeConfiguration", []);
    };

})();

/**
 * iOS Status Bar Plugin
 *
 * @author Asial Corporation
 * @date   2014/1/15
 */
window.StatusBar = window.StatusBar || {};

(function() {

  /*
    hideStatusBar
    support : iOS6,iOS7
  */
  StatusBar.hideStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideStatusBar', []);
  }

  /*
    showStatusBar
    support : iOS6,iOS7
  */
  StatusBar.showStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showStatusBar', []);
  }

  /* 
    statusBarStyleDefault
    support : iOS6,iOS7
  */
  StatusBar.statusBarStyleDefault = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleDefault', []);
  }

  /* 
    statusBarStyleLightContent
    support : iOS7
  */
  StatusBar.statusBarStyleLightContent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleLightContent', []);
  }

  /* 
    statusBarStyleBlackOpaque
    support : iOS6
  */
  StatusBar.statusBarStyleBlackOpaque = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackOpaque', []);
  }

  /* 
    statusBarStyleBlackTranslucent
    support : iOS6
  */
  StatusBar.statusBarStyleBlackTranslucent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackTranslucent', []);
  }

})();

/**
 * Monaca Cloud Functions
 *  Version 1.5.0
 *
 * @author Masahiro TANAKA <info@monaca.mobi>
 * @date   2013/03/17
 */
window.monaca = window.monaca || {};
window.monaca.cloud = window.monaca.cloud || {};

(function() {
    /**
     * Push Notification
     */
    monaca.cloud.Push = {};
    monaca.cloud.Push.callback = null;
    monaca.cloud.Push.callbackData = null;

    monaca.cloud.Push.send = function(data) {
        if (typeof monaca.cloud.Push.callback === "function") {
            monaca.cloud.Push.callback(data);
        } else {
            monaca.cloud.Push.callbackData = data;
        }
    };
    monaca.cloud.Push.setHandler = function(fn) {
        if (typeof fn !== "function") {
            console.warn("Push callback must be a function");
        } else {
            monaca.cloud.Push.callback = fn;
            if (monaca.cloud.Push.callbackData) {
                monaca.cloud.Push.callback(monaca.cloud.Push.callbackData);
                monaca.cloud.Push.callbackData = null;
            }
        }
    }; 
    
})();


/*
 * cloud
 */
(function(root) {
  var original$ = root.$;
  var originalZepto = root.Zepto;

  /* Zepto 1.1.3 - zepto event ajax deferred callbacks - zeptojs.com/license */
  var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function L(t){return null!=t&&t==t.window}function D(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==k(t)}function Z(t){return F(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function R(t){return s.call(t,function(t){return null!=t})}function _(t){return t.length>0?n.fn.concat.apply([],t):t}function q(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[q(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(Z(i[e])||A(i[e]))?(Z(i[e])&&!Z(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),Z(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if($(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=R(e);else if(F(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return D(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=L,n.isArray=A,n.isPlainObject=Z,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return _(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return F(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!D(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!D(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(F(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=q(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(q(t))});else for(e in t)t[e]||0===t[e]?a+=q(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(q(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?L(s)?s["inner"+i]:D(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);

  root.$ = original$;
  root.Zepto = originalZepto;
  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};

  monaca.cloud.timeout = 30000;
  monaca.cloud.url = '%%%CLOUD_HOST%%%';
  monaca.cloud.backendId = '%%%BACKEND_ID%%%';
  monaca.cloud.apiKey = '%%%BACKEND_API_KEY%%%';
  monaca.cloud.deviceId = null;
  monaca.cloud.postQueue = [];

  /**
   * @property {jQuery} .
   */
  monaca.cloud.$ = Zepto;

  var MonacaCloudError = (function() {
    function MonacaCloudError(code, message, data) {
      if (typeof data === "undefined") {
        data = {};
      }
      this.code = code;
      this.message = message;
      this.data = data;
    }
    return MonacaCloudError;
  })();

  /**
   * @class
   */
  monaca.cloud.Error = function(code, message, data) {
    return new MonacaCloudError(code, message, data);
  };

  /**
   * @param {Number} msec .
   */
  monaca.cloud.setTimeout = function(msec) {
    this.timeout = msec;
  };

  // Get device id
  document.addEventListener("deviceready", function() {

    cordova.exec(function(result) {
        monaca.cloud.deviceId = new String(result.deviceId);
        monaca.cloud.url = new String(result.url);
        monaca.cloud.backendId = new String(result.backendId);
        monaca.cloud.apiKey = new String(result.apiKey);

        // execute and clear postQueue
        for (var i = 0; i < monaca.cloud.postQueue.length; i++) {
          monaca.cloud._doPost.apply(monaca.cloud, monaca.cloud.postQueue[i]);
        }
        monaca.cloud.postQueue = [];
      }, function(error) {
        console.error(error);
      },

      "Monaca",
      "getRuntimeConfiguration", []
    );

  }, false);

  // Others
  monaca.cloud._post = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    if (monaca.cloud.deviceId == null) {
      monaca.cloud.postQueue.push([method, params, dfd, ajaxOptions, beforeSuccess]);
    } else {
      monaca.cloud._doPost(method, params, dfd, ajaxOptions, beforeSuccess);
    }
  };

  monaca.cloud._doPost = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    var $ = monaca.cloud.$;

    if (typeof(ajaxOptions) === 'undefined') ajaxOptions = {};
    if ((typeof(method) === 'undefined') && (typeof(params) === 'undefined')) {
      throw new Error('Invalid arguments');
    }

    params['__api_key'] = monaca.cloud.apiKey;
    params['__device'] = monaca.cloud.deviceId;
    var sid = monaca.cloud._getSessionId();
    if (sid.length > 0) {
      params['__session'] = sid;
    }
    var data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: '1'
    });

    var o = $.extend(true, {
      url: this.url + this.backendId,
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: this.timeout,
      success: function(jsonResponse, status, xhr) {
        var sessionHeader = xhr.getResponseHeader('X-Set-Monaca-Cloud-Session');
        if (sessionHeader) {
          monaca.cloud._setSessionId(sessionHeader);
        }

        if (typeof(jsonResponse.error) !== 'undefined') {
          // has error code
          dfd.reject(jsonResponse.error);
        } else {
          // success
          if (typeof(jsonResponse.result.loginToken) !== 'undefined') {
            localStorage.monacaCloudLoginToken = jsonResponse.result.loginToken;
          }
          if (typeof(beforeSuccess) !== 'undefined') {
            beforeSuccess(jsonResponse, status, xhr, dfd);
          }
          dfd.resolve(jsonResponse.result);
        }
      },
      error: function(xhr, status) {
        switch (status) {
          case 'timeout':
            var err = monaca.cloud.Error(-11, 'Connection timeout');
            break;
          case 'parsererror':
            var err = monaca.cloud.Error(-12, 'Invalid response');
            break;
          default:
            var err = monaca.cloud.Error(-13, 'Invalid status code');
        }
        dfd.reject(err);
      }
    }, ajaxOptions);

    $.ajax(o);
  };

  var _sessionId = '';

  monaca.cloud._getSessionId = function() {
    return _sessionId;
  };

  monaca.cloud._setSessionId = function(id) {
    if (typeof id != 'string') {
      id = '';
    }
    _sessionId = id;
  };

})(window);
/*
 * CollectionItem
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollectionItem = (function() {

    function MonacaCloudCollectionItem(item, collection) {

      /**
       * @property {String} .
       */
      this._id = item._id;

      /**
       * @property {String} .
       */
      this._ownerUserOid = item._ownerUserOid;

      /**
       * @property {Date} .
       */
      this._createdAt = new Date(item._createdAt);

      /**
       * @property {Date} .
       */
      this._updatedAt = new Date(item._updatedAt);

      /**
       * @property {MonacaCloudCollection} .
       */
      this._collection = collection;


      for (var key in item) {
        if (key.substr(0, 1) != '_') {
          this[key] = item[key];
        }
      }
    }

    MonacaCloudCollectionItem.prototype = {

      /**
       * @return {$.Promise} .
       */
      update: function() {
        var dfd = new $.Deferred();
        var col = this._collection;
        var data = {};

        for (var key in this) {
          if (key.indexOf('_') !== 0) {
            data[key] = this[key];
          }
        }

        monaca.cloud._post('Collection.update', {
          collectionName: col.name,
          itemOid: this._id,
          data: data,
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      getPermission: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.getPermission', {
          collectionName: col.name,
          itemOid: this._id
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(permission, options) {
        var dfd = new $.Deferred();
        var col = this._collection;

        if (typeof(options) === 'undefined') {
          options = {};
        }

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: col.name,
          criteria: '_id == ?',
          bindParams: [this._id],
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      remove: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.delete', {
          collectionName: col.name,
          itemOid: this._id,
        }, dfd, {});

        return dfd.promise();
      },

      'delete': function() {
        return this.remove();
      }

    };


    return MonacaCloudCollectionItem;
  })();

  monaca.cloud.CollectionItem = function(item, collection) {
    return new MonacaCloudCollectionItem(item, collection);
  };

})(window);
/*
 * Collection
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollection = (function() {

    function MonacaCloudCollection(name) {
      this.name = name;
    }

    MonacaCloudCollection.prototype = {

      /**
       * @param {Object|Array} items .
       * @return {Array} result .
       */
      _makeCollectionItem: function(items) {
        var result = [];

        if (items instanceof Array) {
          for (var i = 0; i < items.length; i++) {
            result[i] = monaca.cloud.CollectionItem(items[i], this);
          }
        } else {
          result = monaca.cloud.CollectionItem(items, this);
        }

        return result;
      },

      /**
       * @param {Criteria|Array} criteria .
       */
      _validateCriteria: function(criteria) {
        if ((typeof(criteria) === 'undefined') || (typeof(criteria) === 'null')) {
          criteria = monaca.cloud.Criteria('');
        } else if (typeof(criteria) === 'string') {
          criteria = monaca.cloud.Criteria(criteria);
        }

        return criteria;
      },

      /**
       * @param {Object|Array} orderBy .
       * @param {Object} options .
       */
      _validateOptions: function(orderBy, options) {
        //if orderBy is hash, consider it as "options"
        if ((typeof(orderBy) === 'object') && (typeof(orderBy.length) === 'undefined')) {
          options = orderBy;
          if (typeof(options.orderBy) !== 'undefined') {
            orderBy = orderBy.orderBy;
          } else {
            orderBy = null;
          }
        }

        if (orderBy === '') {
          orderBy = null;
        }

        return {
          orderBy: orderBy,
          options: options
        };
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      find: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOne: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOneMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Object} item .
       * @param {Object} [permission] .
       * @return {$.Promise} .
       */
      insert: function(item, permission) {
        var self = this;
        var dfd = new $.Deferred();

        if (typeof(permission) === 'undefined') {
          permission = {};
        }

        monaca.cloud._post('Collection.insert', {
            collectionName: this.name,
            item: item,
            permission: permission
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var item = self._makeCollectionItem(e.result.item);
            dfd.resolve(item);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(criteria, permission, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: this.name,
          criteria: criteria.query,
          bindParams: criteria.bindParams,
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      }
    };

    return MonacaCloudCollection;
  })();


  monaca.cloud.Collection = function(name) {
    return new MonacaCloudCollection(name);
  };

})(window);
/*
 * Criteria
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCriteria = (function() {

    function MonacaCloudCriteria(query, bindParams) {
      this.query = query;
      this.bindParams = (typeof(bindParams) !== 'undefined') ? bindParams : [];
    }

    return MonacaCloudCriteria;
  })();


  monaca.cloud.Criteria = function(query, bindParams) {
    return new MonacaCloudCriteria(query, bindParams);
  };

})(window);
/*
 * Device
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Device = {

    /**
     * @param {String} name .
     * @return {$.Promise} .
     */
    getProperty: function(name) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: [name]
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties[name]);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {Array} names .
     * @return {$.Promise} .
     */
    getProperties: function(names) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: names
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {String} name .
     * @param {String} value .
     * @return {$.Promise} .
     */
    saveProperty: function(name, value) {
      var dfd = new $.Deferred();
      var param = {};

      if ((typeof(name) !== 'undefined') && (typeof(value) !== 'undefined')) {
        param = {
          properties: {}
        };
        param.properties[name] = value;
      }

      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    },

    /**
     * @param {Object} properties .
     * @return {$.Promise} .
     */
    saveProperties: function(properties) {
      var dfd = new $.Deferred();
      var param = {};

      if (typeof(properties) !== 'undefined') param.properties = properties;
      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    }

  };

})(window);
/*
 * Mailer
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Mailer = {

    /**
     * @param {String} userOid .
     * @param {String} templateName .
     * @param {Object} substituteParams .
     * @param {Object} [options] .
     * @return {$.Promise} .
     */
    sendMail: function(userOid, templateName, substituteParams, options) {
      var dfd = new $.Deferred();

      if (typeof(options) === 'undefined') {
        options = {};
      }

      monaca.cloud._post('Mailer.sendMail', {
        userOid: userOid,
        templateName: templateName,
        substituteParams: substituteParams,
        options: options
      }, dfd);

      return dfd.promise();
    }
  };

})(window);
/*
 * User
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.User = (function() {


    return {

      _oid: null,

      /**
       * @return {Boolean} .
       */
      isAuthenticated: function() {
        return (this._oid === null) ? false : true;
      },


      /**
       * @param {String} username .
       * @param {String} password .
       * @param {Object} [properties] .
       * @return {$.Promise} .
       */
      register: function(username, password, properties) {
        var dfd = new $.Deferred();
        var self = this;

        if (typeof(properties) === 'undefined') properties = {};

        monaca.cloud._post('User.register', {
            username: username,
            password: password,
            properties: properties
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );


        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      validate: function(username, properties) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.validate', {
          username: username,
          properties: properties
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} password .
       * @return {$.Promise} .
       */
      unregister: function(password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.unregister', {
            password: password
          }, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} password .
       * @return {$.Promise} .
       */
      login: function(username, password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.login', {
            username: username,
            password: password
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      autoLogin: function() {
        var dfd = new $.Deferred();
        var token = localStorage.monacaCloudLoginToken || '';
        var self = this;

        monaca.cloud._post('User.autoLogin', {
            loginToken: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      logout: function() {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.logout', {}, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} oldPassword .
       * @param {String} newPassword .
       * @return {$.Promise} .
       */
      updatePassword: function(oldPassword, newPassword) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} options .
       * @return {$.Promise} .
       */
      sendPasswordResetToken: function(username, options) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.sendPasswordResetToken', {
          username: username,
          options: options
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} newPassword .
       * @param {String} token .
       * @return {$.Promise} .
       */
      resetPasswordAndLogin: function(username, newPassword, token) {
        var dfd = new $.Deferred();
        var self = this;

        monaca.cloud._post('User.resetPasswordAndLogin', {
            username: username,
            newPassword: newPassword,
            token: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @return {$.Promise} .
       */
      getProperty: function(name) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: [name]
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties[name]);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {Array} names .
       * @return {$.Promise} .
       */
      getProperties: function(names) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: names
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @param {String} value .
       * @return {$.Promise} .
       */
      saveProperty: function(name, value) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(name) !== 'undefined') {
          param = {
            properties: {}
          };
          param.properties[name] = value;
        }

        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      },

      /**
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      saveProperties: function(properties) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(properties) !== 'undefined') param.properties = properties;
        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      }

    };
  })();

})(window);

/*** <End:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/*** <End:monaca-core-utils> ***/

/*** <Start:monaca-onsenui> ***/
/*** <Start:monaca-onsenui LoadJs:"components/monaca-onsenui/js/onsenui_all.min.js"> ***/
/*! onsenui - v1.3.8 - 2015-07-27 */
!function(){function getAttributes(element){return Node_get_attributes.call(element)}function setAttribute(element,attribute,value){try{Element_setAttribute.call(element,attribute,value)}catch(e){}}function removeAttribute(element,attribute){Element_removeAttribute.call(element,attribute)}function childNodes(element){return Node_get_childNodes.call(element)}function empty(element){for(;element.childNodes.length;)element.removeChild(element.lastChild)}function insertAdjacentHTML(element,position,html){HTMLElement_insertAdjacentHTMLPropertyDescriptor.value.call(element,position,html)}function inUnsafeMode(){var isUnsafe=!0;try{detectionDiv.innerHTML="<test/>"}catch(ex){isUnsafe=!1}return isUnsafe}function cleanse(html,targetElement){function cleanseAttributes(element){var attributes=getAttributes(element);if(attributes&&attributes.length){for(var events,i=0,len=attributes.length;len>i;i++){var attribute=attributes[i],name=attribute.name;"o"!==name[0]&&"O"!==name[0]||"n"!==name[1]&&"N"!==name[1]||(events=events||[],events.push({name:attribute.name,value:attribute.value}))}if(events)for(var i=0,len=events.length;len>i;i++){var attribute=events[i];removeAttribute(element,attribute.name),setAttribute(element,"x-"+attribute.name,attribute.value)}}for(var children=childNodes(element),i=0,len=children.length;len>i;i++)cleanseAttributes(children[i])}var cleaner=document.implementation.createHTMLDocument("cleaner");empty(cleaner.documentElement),MSApp.execUnsafeLocalFunction(function(){insertAdjacentHTML(cleaner.documentElement,"afterbegin",html)});var scripts=cleaner.documentElement.querySelectorAll("script");Array.prototype.forEach.call(scripts,function(script){switch(script.type.toLowerCase()){case"":script.type="text/inert";break;case"text/javascript":case"text/ecmascript":case"text/x-javascript":case"text/jscript":case"text/livescript":case"text/javascript1.1":case"text/javascript1.2":case"text/javascript1.3":script.type="text/inert-"+script.type.slice("text/".length);break;case"application/javascript":case"application/ecmascript":case"application/x-javascript":script.type="application/inert-"+script.type.slice("application/".length)}}),cleanseAttributes(cleaner.documentElement);var cleanedNodes=[];return"HTML"===targetElement.tagName?cleanedNodes=Array.prototype.slice.call(document.adoptNode(cleaner.documentElement).childNodes):(cleaner.head&&(cleanedNodes=cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.head).childNodes))),cleaner.body&&(cleanedNodes=cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.body).childNodes)))),cleanedNodes}function cleansePropertySetter(property,setter){var propertyDescriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,property),originalSetter=propertyDescriptor.set;Object.defineProperty(HTMLElement.prototype,property,{get:propertyDescriptor.get,set:function(value){if(window.WinJS&&window.WinJS._execUnsafe&&inUnsafeMode())originalSetter.call(this,value);else{var that=this,nodes=cleanse(value,that);MSApp.execUnsafeLocalFunction(function(){setter(propertyDescriptor,that,nodes)})}},enumerable:propertyDescriptor.enumerable,configurable:propertyDescriptor.configurable})}if(window.MSApp&&MSApp.execUnsafeLocalFunction){var Element_setAttribute=Object.getOwnPropertyDescriptor(Element.prototype,"setAttribute").value,Element_removeAttribute=Object.getOwnPropertyDescriptor(Element.prototype,"removeAttribute").value,HTMLElement_insertAdjacentHTMLPropertyDescriptor=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"insertAdjacentHTML"),Node_get_attributes=Object.getOwnPropertyDescriptor(Node.prototype,"attributes").get,Node_get_childNodes=Object.getOwnPropertyDescriptor(Node.prototype,"childNodes").get,detectionDiv=document.createElement("div");cleansePropertySetter("innerHTML",function(propertyDescriptor,target,elements){empty(target);for(var i=0,len=elements.length;len>i;i++)target.appendChild(elements[i])}),cleansePropertySetter("outerHTML",function(propertyDescriptor,target,elements){for(var i=0,len=elements.length;len>i;i++)target.insertAdjacentElement("afterend",elements[i]);target.parentNode.removeChild(target)})}}(),function(window,document,undefined){"use strict";function minErr(module,ErrorConstructor){return ErrorConstructor=ErrorConstructor||Error,function(){var paramPrefix,i,SKIP_INDEXES=2,templateArgs=arguments,code=templateArgs[0],message="["+(module?module+":":"")+code+"] ",template=templateArgs[1];for(message+=template.replace(/\{\d+\}/g,function(match){var index=+match.slice(1,-1),shiftedIndex=index+SKIP_INDEXES;return shiftedIndex<templateArgs.length?toDebugString(templateArgs[shiftedIndex]):match}),message+="\nhttp://errors.angularjs.org/1.4.3/"+(module?module+"/":"")+code,i=SKIP_INDEXES,paramPrefix="?";i<templateArgs.length;i++,paramPrefix="&")message+=paramPrefix+"p"+(i-SKIP_INDEXES)+"="+encodeURIComponent(toDebugString(templateArgs[i]));return new ErrorConstructor(message)}}function isArrayLike(obj){if(null==obj||isWindow(obj))return!1;var length="length"in Object(obj)&&obj.length;return obj.nodeType===NODE_TYPE_ELEMENT&&length?!0:isString(obj)||isArray(obj)||0===length||"number"==typeof length&&length>0&&length-1 in obj}function forEach(obj,iterator,context){var key,length;if(obj)if(isFunction(obj))for(key in obj)"prototype"==key||"length"==key||"name"==key||obj.hasOwnProperty&&!obj.hasOwnProperty(key)||iterator.call(context,obj[key],key,obj);else if(isArray(obj)||isArrayLike(obj)){var isPrimitive="object"!=typeof obj;for(key=0,length=obj.length;length>key;key++)(isPrimitive||key in obj)&&iterator.call(context,obj[key],key,obj)}else if(obj.forEach&&obj.forEach!==forEach)obj.forEach(iterator,context,obj);else if(isBlankObject(obj))for(key in obj)iterator.call(context,obj[key],key,obj);else if("function"==typeof obj.hasOwnProperty)for(key in obj)obj.hasOwnProperty(key)&&iterator.call(context,obj[key],key,obj);else for(key in obj)hasOwnProperty.call(obj,key)&&iterator.call(context,obj[key],key,obj);return obj}function forEachSorted(obj,iterator,context){for(var keys=Object.keys(obj).sort(),i=0;i<keys.length;i++)iterator.call(context,obj[keys[i]],keys[i]);return keys}function reverseParams(iteratorFn){return function(value,key){iteratorFn(key,value)}}function nextUid(){return++uid}function setHashKey(obj,h){h?obj.$$hashKey=h:delete obj.$$hashKey}function baseExtend(dst,objs,deep){for(var h=dst.$$hashKey,i=0,ii=objs.length;ii>i;++i){var obj=objs[i];if(isObject(obj)||isFunction(obj))for(var keys=Object.keys(obj),j=0,jj=keys.length;jj>j;j++){var key=keys[j],src=obj[key];deep&&isObject(src)?isDate(src)?dst[key]=new Date(src.valueOf()):(isObject(dst[key])||(dst[key]=isArray(src)?[]:{}),baseExtend(dst[key],[src],!0)):dst[key]=src}}return setHashKey(dst,h),dst}function extend(dst){return baseExtend(dst,slice.call(arguments,1),!1)}function merge(dst){return baseExtend(dst,slice.call(arguments,1),!0)}function toInt(str){return parseInt(str,10)}function inherit(parent,extra){return extend(Object.create(parent),extra)}function noop(){}function identity($){return $}function valueFn(value){return function(){return value}}function hasCustomToString(obj){return isFunction(obj.toString)&&obj.toString!==Object.prototype.toString}function isUndefined(value){return"undefined"==typeof value}function isDefined(value){return"undefined"!=typeof value}function isObject(value){return null!==value&&"object"==typeof value}function isBlankObject(value){return null!==value&&"object"==typeof value&&!getPrototypeOf(value)}function isString(value){return"string"==typeof value}function isNumber(value){return"number"==typeof value}function isDate(value){return"[object Date]"===toString.call(value)}function isFunction(value){return"function"==typeof value}function isRegExp(value){return"[object RegExp]"===toString.call(value)}function isWindow(obj){return obj&&obj.window===obj}function isScope(obj){return obj&&obj.$evalAsync&&obj.$watch}function isFile(obj){return"[object File]"===toString.call(obj)}function isFormData(obj){return"[object FormData]"===toString.call(obj)}function isBlob(obj){return"[object Blob]"===toString.call(obj)}function isBoolean(value){return"boolean"==typeof value}function isPromiseLike(obj){return obj&&isFunction(obj.then)}function isTypedArray(value){return TYPED_ARRAY_REGEXP.test(toString.call(value))}function isElement(node){return!(!node||!(node.nodeName||node.prop&&node.attr&&node.find))}function makeMap(str){var i,obj={},items=str.split(",");for(i=0;i<items.length;i++)obj[items[i]]=!0;return obj}function nodeName_(element){return lowercase(element.nodeName||element[0]&&element[0].nodeName)}function arrayRemove(array,value){var index=array.indexOf(value);return index>=0&&array.splice(index,1),index}function copy(source,destination,stackSource,stackDest){if(isWindow(source)||isScope(source))throw ngMinErr("cpws","Can't copy! Making copies of Window or Scope instances is not supported.");if(isTypedArray(destination))throw ngMinErr("cpta","Can't copy! TypedArray destination cannot be mutated.");if(destination){if(source===destination)throw ngMinErr("cpi","Can't copy! Source and destination are identical.");stackSource=stackSource||[],stackDest=stackDest||[],isObject(source)&&(stackSource.push(source),stackDest.push(destination));var key;if(isArray(source)){destination.length=0;for(var i=0;i<source.length;i++)destination.push(copy(source[i],null,stackSource,stackDest))}else{var h=destination.$$hashKey;if(isArray(destination)?destination.length=0:forEach(destination,function(value,key){delete destination[key]}),isBlankObject(source))for(key in source)destination[key]=copy(source[key],null,stackSource,stackDest);else if(source&&"function"==typeof source.hasOwnProperty)for(key in source)source.hasOwnProperty(key)&&(destination[key]=copy(source[key],null,stackSource,stackDest));else for(key in source)hasOwnProperty.call(source,key)&&(destination[key]=copy(source[key],null,stackSource,stackDest));setHashKey(destination,h)}}else if(destination=source,isObject(source)){var index;if(stackSource&&-1!==(index=stackSource.indexOf(source)))return stackDest[index];if(isArray(source))return copy(source,[],stackSource,stackDest);if(isTypedArray(source))destination=new source.constructor(source);else if(isDate(source))destination=new Date(source.getTime());else{if(!isRegExp(source)){var emptyObject=Object.create(getPrototypeOf(source));return copy(source,emptyObject,stackSource,stackDest)}destination=new RegExp(source.source,source.toString().match(/[^\/]*$/)[0]),destination.lastIndex=source.lastIndex}stackDest&&(stackSource.push(source),stackDest.push(destination))}return destination}function shallowCopy(src,dst){if(isArray(src)){dst=dst||[];for(var i=0,ii=src.length;ii>i;i++)dst[i]=src[i]}else if(isObject(src)){dst=dst||{};for(var key in src)("$"!==key.charAt(0)||"$"!==key.charAt(1))&&(dst[key]=src[key])}return dst||src}function equals(o1,o2){if(o1===o2)return!0;if(null===o1||null===o2)return!1;if(o1!==o1&&o2!==o2)return!0;var length,key,keySet,t1=typeof o1,t2=typeof o2;if(t1==t2&&"object"==t1){if(!isArray(o1)){if(isDate(o1))return isDate(o2)?equals(o1.getTime(),o2.getTime()):!1;if(isRegExp(o1))return isRegExp(o2)?o1.toString()==o2.toString():!1;if(isScope(o1)||isScope(o2)||isWindow(o1)||isWindow(o2)||isArray(o2)||isDate(o2)||isRegExp(o2))return!1;keySet=createMap();for(key in o1)if("$"!==key.charAt(0)&&!isFunction(o1[key])){if(!equals(o1[key],o2[key]))return!1;keySet[key]=!0}for(key in o2)if(!(key in keySet||"$"===key.charAt(0)||o2[key]===undefined||isFunction(o2[key])))return!1;return!0}if(!isArray(o2))return!1;if((length=o1.length)==o2.length){for(key=0;length>key;key++)if(!equals(o1[key],o2[key]))return!1;return!0}}return!1}function concat(array1,array2,index){return array1.concat(slice.call(array2,index))}function sliceArgs(args,startIndex){return slice.call(args,startIndex||0)}function bind(self,fn){var curryArgs=arguments.length>2?sliceArgs(arguments,2):[];return!isFunction(fn)||fn instanceof RegExp?fn:curryArgs.length?function(){return arguments.length?fn.apply(self,concat(curryArgs,arguments,0)):fn.apply(self,curryArgs)}:function(){return arguments.length?fn.apply(self,arguments):fn.call(self)}}function toJsonReplacer(key,value){var val=value;return"string"==typeof key&&"$"===key.charAt(0)&&"$"===key.charAt(1)?val=undefined:isWindow(value)?val="$WINDOW":value&&document===value?val="$DOCUMENT":isScope(value)&&(val="$SCOPE"),val}function toJson(obj,pretty){return"undefined"==typeof obj?undefined:(isNumber(pretty)||(pretty=pretty?2:null),JSON.stringify(obj,toJsonReplacer,pretty))}function fromJson(json){return isString(json)?JSON.parse(json):json}function timezoneToOffset(timezone,fallback){var requestedTimezoneOffset=Date.parse("Jan 01, 1970 00:00:00 "+timezone)/6e4;return isNaN(requestedTimezoneOffset)?fallback:requestedTimezoneOffset}function addDateMinutes(date,minutes){return date=new Date(date.getTime()),date.setMinutes(date.getMinutes()+minutes),date}function convertTimezoneToLocal(date,timezone,reverse){reverse=reverse?-1:1;var timezoneOffset=timezoneToOffset(timezone,date.getTimezoneOffset());return addDateMinutes(date,reverse*(timezoneOffset-date.getTimezoneOffset()))}function startingTag(element){element=jqLite(element).clone();try{element.empty()}catch(e){}var elemHtml=jqLite("<div>").append(element).html();try{return element[0].nodeType===NODE_TYPE_TEXT?lowercase(elemHtml):elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(match,nodeName){return"<"+lowercase(nodeName)})}catch(e){return lowercase(elemHtml)}}function tryDecodeURIComponent(value){try{return decodeURIComponent(value)}catch(e){}}function parseKeyValue(keyValue){var key_value,key,obj={};return forEach((keyValue||"").split("&"),function(keyValue){if(keyValue&&(key_value=keyValue.replace(/\+/g,"%20").split("="),key=tryDecodeURIComponent(key_value[0]),isDefined(key))){var val=isDefined(key_value[1])?tryDecodeURIComponent(key_value[1]):!0;hasOwnProperty.call(obj,key)?isArray(obj[key])?obj[key].push(val):obj[key]=[obj[key],val]:obj[key]=val}}),obj}function toKeyValue(obj){var parts=[];return forEach(obj,function(value,key){isArray(value)?forEach(value,function(arrayValue){parts.push(encodeUriQuery(key,!0)+(arrayValue===!0?"":"="+encodeUriQuery(arrayValue,!0)))}):parts.push(encodeUriQuery(key,!0)+(value===!0?"":"="+encodeUriQuery(value,!0)))}),parts.length?parts.join("&"):""}function encodeUriSegment(val){return encodeUriQuery(val,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,pctEncodeSpaces?"%20":"+")}function getNgAttribute(element,ngAttr){var attr,i,ii=ngAttrPrefixes.length;for(i=0;ii>i;++i)if(attr=ngAttrPrefixes[i]+ngAttr,isString(attr=element.getAttribute(attr)))return attr;return null}function angularInit(element,bootstrap){var appElement,module,config={};forEach(ngAttrPrefixes,function(prefix){var name=prefix+"app";!appElement&&element.hasAttribute&&element.hasAttribute(name)&&(appElement=element,module=element.getAttribute(name))}),forEach(ngAttrPrefixes,function(prefix){var candidate,name=prefix+"app";!appElement&&(candidate=element.querySelector("["+name.replace(":","\\:")+"]"))&&(appElement=candidate,module=candidate.getAttribute(name))}),appElement&&(config.strictDi=null!==getNgAttribute(appElement,"strict-di"),bootstrap(appElement,module?[module]:[],config))}function bootstrap(element,modules,config){isObject(config)||(config={});var defaultConfig={strictDi:!1};config=extend(defaultConfig,config);var doBootstrap=function(){if(element=jqLite(element),element.injector()){var tag=element[0]===document?"document":startingTag(element);throw ngMinErr("btstrpd","App Already Bootstrapped with this Element '{0}'",tag.replace(/</,"&lt;").replace(/>/,"&gt;"))}modules=modules||[],modules.unshift(["$provide",function($provide){$provide.value("$rootElement",element)}]),config.debugInfoEnabled&&modules.push(["$compileProvider",function($compileProvider){$compileProvider.debugInfoEnabled(!0)}]),modules.unshift("ng");var injector=createInjector(modules,config.strictDi);return injector.invoke(["$rootScope","$rootElement","$compile","$injector",function(scope,element,compile,injector){scope.$apply(function(){element.data("$injector",injector),compile(element)(scope)})}]),injector},NG_ENABLE_DEBUG_INFO=/^NG_ENABLE_DEBUG_INFO!/,NG_DEFER_BOOTSTRAP=/^NG_DEFER_BOOTSTRAP!/;return window&&NG_ENABLE_DEBUG_INFO.test(window.name)&&(config.debugInfoEnabled=!0,window.name=window.name.replace(NG_ENABLE_DEBUG_INFO,"")),window&&!NG_DEFER_BOOTSTRAP.test(window.name)?doBootstrap():(window.name=window.name.replace(NG_DEFER_BOOTSTRAP,""),angular.resumeBootstrap=function(extraModules){return forEach(extraModules,function(module){modules.push(module)}),doBootstrap()},isFunction(angular.resumeDeferredBootstrap)&&angular.resumeDeferredBootstrap(),void 0)}function reloadWithDebugInfo(){window.name="NG_ENABLE_DEBUG_INFO!"+window.name,window.location.reload()}function getTestability(rootElement){var injector=angular.element(rootElement).injector();if(!injector)throw ngMinErr("test","no injector found for element argument to getTestability");return injector.get("$$testability")}function snake_case(name,separator){return separator=separator||"_",name.replace(SNAKE_CASE_REGEXP,function(letter,pos){return(pos?separator:"")+letter.toLowerCase()})}function bindJQuery(){var originalCleanData;if(!bindJQueryFired){var jqName=jq();jQuery=window.jQuery,isDefined(jqName)&&(jQuery=null===jqName?undefined:window[jqName]),jQuery&&jQuery.fn.on?(jqLite=jQuery,extend(jQuery.fn,{scope:JQLitePrototype.scope,isolateScope:JQLitePrototype.isolateScope,controller:JQLitePrototype.controller,injector:JQLitePrototype.injector,inheritedData:JQLitePrototype.inheritedData}),originalCleanData=jQuery.cleanData,jQuery.cleanData=function(elems){var events;if(skipDestroyOnNextJQueryCleanData)skipDestroyOnNextJQueryCleanData=!1;else for(var elem,i=0;null!=(elem=elems[i]);i++)events=jQuery._data(elem,"events"),events&&events.$destroy&&jQuery(elem).triggerHandler("$destroy");originalCleanData(elems)}):jqLite=JQLite,angular.element=jqLite,bindJQueryFired=!0}}function assertArg(arg,name,reason){if(!arg)throw ngMinErr("areq","Argument '{0}' is {1}",name||"?",reason||"required");return arg}function assertArgFn(arg,name,acceptArrayAnnotation){return acceptArrayAnnotation&&isArray(arg)&&(arg=arg[arg.length-1]),assertArg(isFunction(arg),name,"not a function, got "+(arg&&"object"==typeof arg?arg.constructor.name||"Object":typeof arg)),arg}function assertNotHasOwnProperty(name,context){if("hasOwnProperty"===name)throw ngMinErr("badname","hasOwnProperty is not a valid {0} name",context)}function getter(obj,path,bindFnToScope){if(!path)return obj;for(var key,keys=path.split("."),lastInstance=obj,len=keys.length,i=0;len>i;i++)key=keys[i],obj&&(obj=(lastInstance=obj)[key]);return!bindFnToScope&&isFunction(obj)?bind(lastInstance,obj):obj}function getBlockNodes(nodes){var node=nodes[0],endNode=nodes[nodes.length-1],blockNodes=[node];do{if(node=node.nextSibling,!node)break;blockNodes.push(node)}while(node!==endNode);return jqLite(blockNodes)}function createMap(){return Object.create(null)}function setupModuleLoader(window){function ensure(obj,name,factory){return obj[name]||(obj[name]=factory())}var $injectorMinErr=minErr("$injector"),ngMinErr=minErr("ng"),angular=ensure(window,"angular",Object);return angular.$$minErr=angular.$$minErr||minErr,ensure(angular,"module",function(){var modules={};return function(name,requires,configFn){var assertNotHasOwnProperty=function(name,context){if("hasOwnProperty"===name)throw ngMinErr("badname","hasOwnProperty is not a valid {0} name",context)};return assertNotHasOwnProperty(name,"module"),requires&&modules.hasOwnProperty(name)&&(modules[name]=null),ensure(modules,name,function(){function invokeLater(provider,method,insertMethod,queue){return queue||(queue=invokeQueue),function(){return queue[insertMethod||"push"]([provider,method,arguments]),moduleInstance}}function invokeLaterAndSetModuleName(provider,method){return function(recipeName,factoryFunction){return factoryFunction&&isFunction(factoryFunction)&&(factoryFunction.$$moduleName=name),invokeQueue.push([provider,method,arguments]),moduleInstance}}if(!requires)throw $injectorMinErr("nomod","Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",name);var invokeQueue=[],configBlocks=[],runBlocks=[],config=invokeLater("$injector","invoke","push",configBlocks),moduleInstance={_invokeQueue:invokeQueue,_configBlocks:configBlocks,_runBlocks:runBlocks,requires:requires,name:name,provider:invokeLaterAndSetModuleName("$provide","provider"),factory:invokeLaterAndSetModuleName("$provide","factory"),service:invokeLaterAndSetModuleName("$provide","service"),value:invokeLater("$provide","value"),constant:invokeLater("$provide","constant","unshift"),decorator:invokeLaterAndSetModuleName("$provide","decorator"),animation:invokeLaterAndSetModuleName("$animateProvider","register"),filter:invokeLaterAndSetModuleName("$filterProvider","register"),controller:invokeLaterAndSetModuleName("$controllerProvider","register"),directive:invokeLaterAndSetModuleName("$compileProvider","directive"),config:config,run:function(block){return runBlocks.push(block),this}};return configFn&&config(configFn),moduleInstance})}})}function serializeObject(obj){var seen=[];return JSON.stringify(obj,function(key,val){if(val=toJsonReplacer(key,val),isObject(val)){if(seen.indexOf(val)>=0)return"<<already seen>>";seen.push(val)}return val})}function toDebugString(obj){return"function"==typeof obj?obj.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof obj?"undefined":"string"!=typeof obj?serializeObject(obj):obj}function publishExternalAPI(angular){extend(angular,{bootstrap:bootstrap,copy:copy,extend:extend,merge:merge,equals:equals,element:jqLite,forEach:forEach,injector:createInjector,noop:noop,bind:bind,toJson:toJson,fromJson:fromJson,identity:identity,isUndefined:isUndefined,isDefined:isDefined,isString:isString,isFunction:isFunction,isObject:isObject,isNumber:isNumber,isElement:isElement,isArray:isArray,version:version,isDate:isDate,lowercase:lowercase,uppercase:uppercase,callbacks:{counter:0},getTestability:getTestability,$$minErr:minErr,$$csp:csp,reloadWithDebugInfo:reloadWithDebugInfo}),angularModule=setupModuleLoader(window);try{angularModule("ngLocale")}catch(e){angularModule("ngLocale",[]).provider("$locale",$LocaleProvider)}angularModule("ng",["ngLocale"],["$provide",function($provide){$provide.provider({$$sanitizeUri:$$SanitizeUriProvider}),$provide.provider("$compile",$CompileProvider).directive({a:htmlAnchorDirective,input:inputDirective,textarea:inputDirective,form:formDirective,script:scriptDirective,select:selectDirective,style:styleDirective,option:optionDirective,ngBind:ngBindDirective,ngBindHtml:ngBindHtmlDirective,ngBindTemplate:ngBindTemplateDirective,ngClass:ngClassDirective,ngClassEven:ngClassEvenDirective,ngClassOdd:ngClassOddDirective,ngCloak:ngCloakDirective,ngController:ngControllerDirective,ngForm:ngFormDirective,ngHide:ngHideDirective,ngIf:ngIfDirective,ngInclude:ngIncludeDirective,ngInit:ngInitDirective,ngNonBindable:ngNonBindableDirective,ngPluralize:ngPluralizeDirective,ngRepeat:ngRepeatDirective,ngShow:ngShowDirective,ngStyle:ngStyleDirective,ngSwitch:ngSwitchDirective,ngSwitchWhen:ngSwitchWhenDirective,ngSwitchDefault:ngSwitchDefaultDirective,ngOptions:ngOptionsDirective,ngTransclude:ngTranscludeDirective,ngModel:ngModelDirective,ngList:ngListDirective,ngChange:ngChangeDirective,pattern:patternDirective,ngPattern:patternDirective,required:requiredDirective,ngRequired:requiredDirective,minlength:minlengthDirective,ngMinlength:minlengthDirective,maxlength:maxlengthDirective,ngMaxlength:maxlengthDirective,ngValue:ngValueDirective,ngModelOptions:ngModelOptionsDirective}).directive({ngInclude:ngIncludeFillContentDirective}).directive(ngAttributeAliasDirectives).directive(ngEventDirectives),$provide.provider({$anchorScroll:$AnchorScrollProvider,$animate:$AnimateProvider,$$animateQueue:$$CoreAnimateQueueProvider,$$AnimateRunner:$$CoreAnimateRunnerProvider,$browser:$BrowserProvider,$cacheFactory:$CacheFactoryProvider,$controller:$ControllerProvider,$document:$DocumentProvider,$exceptionHandler:$ExceptionHandlerProvider,$filter:$FilterProvider,$interpolate:$InterpolateProvider,$interval:$IntervalProvider,$http:$HttpProvider,$httpParamSerializer:$HttpParamSerializerProvider,$httpParamSerializerJQLike:$HttpParamSerializerJQLikeProvider,$httpBackend:$HttpBackendProvider,$location:$LocationProvider,$log:$LogProvider,$parse:$ParseProvider,$rootScope:$RootScopeProvider,$q:$QProvider,$$q:$$QProvider,$sce:$SceProvider,$sceDelegate:$SceDelegateProvider,$sniffer:$SnifferProvider,$templateCache:$TemplateCacheProvider,$templateRequest:$TemplateRequestProvider,$$testability:$$TestabilityProvider,$timeout:$TimeoutProvider,$window:$WindowProvider,$$rAF:$$RAFProvider,$$jqLite:$$jqLiteProvider,$$HashMap:$$HashMapProvider,$$cookieReader:$$CookieReaderProvider})}])}function jqNextId(){return++jqId}function camelCase(name){return name.replace(SPECIAL_CHARS_REGEXP,function(_,separator,letter,offset){return offset?letter.toUpperCase():letter}).replace(MOZ_HACK_REGEXP,"Moz$1")}function jqLiteIsTextNode(html){return!HTML_REGEXP.test(html)}function jqLiteAcceptsData(node){var nodeType=node.nodeType;return nodeType===NODE_TYPE_ELEMENT||!nodeType||nodeType===NODE_TYPE_DOCUMENT}function jqLiteHasData(node){for(var key in jqCache[node.ng339])return!0;return!1}function jqLiteBuildFragment(html,context){var tmp,tag,wrap,i,fragment=context.createDocumentFragment(),nodes=[];if(jqLiteIsTextNode(html))nodes.push(context.createTextNode(html));else{for(tmp=tmp||fragment.appendChild(context.createElement("div")),tag=(TAG_NAME_REGEXP.exec(html)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,tmp.innerHTML=wrap[1]+html.replace(XHTML_TAG_REGEXP,"<$1></$2>")+wrap[2],i=wrap[0];i--;)tmp=tmp.lastChild;nodes=concat(nodes,tmp.childNodes),tmp=fragment.firstChild,tmp.textContent=""}return fragment.textContent="",fragment.innerHTML="",forEach(nodes,function(node){fragment.appendChild(node)}),fragment}function jqLiteParseHTML(html,context){context=context||document;var parsed;return(parsed=SINGLE_TAG_REGEXP.exec(html))?[context.createElement(parsed[1])]:(parsed=jqLiteBuildFragment(html,context))?parsed.childNodes:[]}function JQLite(element){if(element instanceof JQLite)return element;var argIsString;if(isString(element)&&(element=trim(element),argIsString=!0),!(this instanceof JQLite)){if(argIsString&&"<"!=element.charAt(0))throw jqLiteMinErr("nosel","Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");return new JQLite(element)}argIsString?jqLiteAddNodes(this,jqLiteParseHTML(element)):jqLiteAddNodes(this,element)}function jqLiteClone(element){return element.cloneNode(!0)}function jqLiteDealoc(element,onlyDescendants){if(onlyDescendants||jqLiteRemoveData(element),element.querySelectorAll)for(var descendants=element.querySelectorAll("*"),i=0,l=descendants.length;l>i;i++)jqLiteRemoveData(descendants[i])}function jqLiteOff(element,type,fn,unsupported){if(isDefined(unsupported))throw jqLiteMinErr("offargs","jqLite#off() does not support the `selector` argument");var expandoStore=jqLiteExpandoStore(element),events=expandoStore&&expandoStore.events,handle=expandoStore&&expandoStore.handle;if(handle)if(type)forEach(type.split(" "),function(type){if(isDefined(fn)){var listenerFns=events[type];if(arrayRemove(listenerFns||[],fn),listenerFns&&listenerFns.length>0)return}removeEventListenerFn(element,type,handle),delete events[type]});else for(type in events)"$destroy"!==type&&removeEventListenerFn(element,type,handle),delete events[type]}function jqLiteRemoveData(element,name){var expandoId=element.ng339,expandoStore=expandoId&&jqCache[expandoId];if(expandoStore){if(name)return delete expandoStore.data[name],void 0;expandoStore.handle&&(expandoStore.events.$destroy&&expandoStore.handle({},"$destroy"),jqLiteOff(element)),delete jqCache[expandoId],element.ng339=undefined}}function jqLiteExpandoStore(element,createIfNecessary){var expandoId=element.ng339,expandoStore=expandoId&&jqCache[expandoId];return createIfNecessary&&!expandoStore&&(element.ng339=expandoId=jqNextId(),expandoStore=jqCache[expandoId]={events:{},data:{},handle:undefined}),expandoStore}function jqLiteData(element,key,value){if(jqLiteAcceptsData(element)){var isSimpleSetter=isDefined(value),isSimpleGetter=!isSimpleSetter&&key&&!isObject(key),massGetter=!key,expandoStore=jqLiteExpandoStore(element,!isSimpleGetter),data=expandoStore&&expandoStore.data;if(isSimpleSetter)data[key]=value;else{if(massGetter)return data;if(isSimpleGetter)return data&&data[key];extend(data,key)}}}function jqLiteHasClass(element,selector){return element.getAttribute?(" "+(element.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+selector+" ")>-1:!1}function jqLiteRemoveClass(element,cssClasses){cssClasses&&element.setAttribute&&forEach(cssClasses.split(" "),function(cssClass){element.setAttribute("class",trim((" "+(element.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+trim(cssClass)+" "," ")))})}function jqLiteAddClass(element,cssClasses){if(cssClasses&&element.setAttribute){var existingClasses=(" "+(element.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");forEach(cssClasses.split(" "),function(cssClass){cssClass=trim(cssClass),-1===existingClasses.indexOf(" "+cssClass+" ")&&(existingClasses+=cssClass+" ")}),element.setAttribute("class",trim(existingClasses))}}function jqLiteAddNodes(root,elements){if(elements)if(elements.nodeType)root[root.length++]=elements;else{var length=elements.length;if("number"==typeof length&&elements.window!==elements){if(length)for(var i=0;length>i;i++)root[root.length++]=elements[i]}else root[root.length++]=elements}}function jqLiteController(element,name){return jqLiteInheritedData(element,"$"+(name||"ngController")+"Controller")}function jqLiteInheritedData(element,name,value){element.nodeType==NODE_TYPE_DOCUMENT&&(element=element.documentElement);for(var names=isArray(name)?name:[name];element;){for(var i=0,ii=names.length;ii>i;i++)if((value=jqLite.data(element,names[i]))!==undefined)return value;element=element.parentNode||element.nodeType===NODE_TYPE_DOCUMENT_FRAGMENT&&element.host}}function jqLiteEmpty(element){for(jqLiteDealoc(element,!0);element.firstChild;)element.removeChild(element.firstChild)}function jqLiteRemove(element,keepData){keepData||jqLiteDealoc(element);var parent=element.parentNode;parent&&parent.removeChild(element)}function jqLiteDocumentLoaded(action,win){win=win||window,"complete"===win.document.readyState?win.setTimeout(action):jqLite(win).on("load",action)}function getBooleanAttrName(element,name){var booleanAttr=BOOLEAN_ATTR[name.toLowerCase()];return booleanAttr&&BOOLEAN_ELEMENTS[nodeName_(element)]&&booleanAttr}function getAliasedAttrName(element,name){var nodeName=element.nodeName;return("INPUT"===nodeName||"TEXTAREA"===nodeName)&&ALIASED_ATTR[name]}function createEventHandler(element,events){var eventHandler=function(event,type){event.isDefaultPrevented=function(){return event.defaultPrevented};var eventFns=events[type||event.type],eventFnsLength=eventFns?eventFns.length:0;if(eventFnsLength){if(isUndefined(event.immediatePropagationStopped)){var originalStopImmediatePropagation=event.stopImmediatePropagation;event.stopImmediatePropagation=function(){event.immediatePropagationStopped=!0,event.stopPropagation&&event.stopPropagation(),originalStopImmediatePropagation&&originalStopImmediatePropagation.call(event)}}event.isImmediatePropagationStopped=function(){return event.immediatePropagationStopped===!0
},eventFnsLength>1&&(eventFns=shallowCopy(eventFns));for(var i=0;eventFnsLength>i;i++)event.isImmediatePropagationStopped()||eventFns[i].call(element,event)}};return eventHandler.elem=element,eventHandler}function $$jqLiteProvider(){this.$get=function(){return extend(JQLite,{hasClass:function(node,classes){return node.attr&&(node=node[0]),jqLiteHasClass(node,classes)},addClass:function(node,classes){return node.attr&&(node=node[0]),jqLiteAddClass(node,classes)},removeClass:function(node,classes){return node.attr&&(node=node[0]),jqLiteRemoveClass(node,classes)}})}}function hashKey(obj,nextUidFn){var key=obj&&obj.$$hashKey;if(key)return"function"==typeof key&&(key=obj.$$hashKey()),key;var objType=typeof obj;return key="function"==objType||"object"==objType&&null!==obj?obj.$$hashKey=objType+":"+(nextUidFn||nextUid)():objType+":"+obj}function HashMap(array,isolatedUid){if(isolatedUid){var uid=0;this.nextUid=function(){return++uid}}forEach(array,this.put,this)}function anonFn(fn){var fnText=fn.toString().replace(STRIP_COMMENTS,""),args=fnText.match(FN_ARGS);return args?"function("+(args[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function annotate(fn,strictDi,name){var $inject,fnText,argDecl,last;if("function"==typeof fn){if(!($inject=fn.$inject)){if($inject=[],fn.length){if(strictDi)throw isString(name)&&name||(name=fn.name||anonFn(fn)),$injectorMinErr("strictdi","{0} is not using explicit annotation and cannot be invoked in strict mode",name);fnText=fn.toString().replace(STRIP_COMMENTS,""),argDecl=fnText.match(FN_ARGS),forEach(argDecl[1].split(FN_ARG_SPLIT),function(arg){arg.replace(FN_ARG,function(all,underscore,name){$inject.push(name)})})}fn.$inject=$inject}}else isArray(fn)?(last=fn.length-1,assertArgFn(fn[last],"fn"),$inject=fn.slice(0,last)):assertArgFn(fn,"fn",!0);return $inject}function createInjector(modulesToLoad,strictDi){function supportObject(delegate){return function(key,value){return isObject(key)?(forEach(key,reverseParams(delegate)),void 0):delegate(key,value)}}function provider(name,provider_){if(assertNotHasOwnProperty(name,"service"),(isFunction(provider_)||isArray(provider_))&&(provider_=providerInjector.instantiate(provider_)),!provider_.$get)throw $injectorMinErr("pget","Provider '{0}' must define $get factory method.",name);return providerCache[name+providerSuffix]=provider_}function enforceReturnValue(name,factory){return function(){var result=instanceInjector.invoke(factory,this);if(isUndefined(result))throw $injectorMinErr("undef","Provider '{0}' must return a value from $get factory method.",name);return result}}function factory(name,factoryFn,enforce){return provider(name,{$get:enforce!==!1?enforceReturnValue(name,factoryFn):factoryFn})}function service(name,constructor){return factory(name,["$injector",function($injector){return $injector.instantiate(constructor)}])}function value(name,val){return factory(name,valueFn(val),!1)}function constant(name,value){assertNotHasOwnProperty(name,"constant"),providerCache[name]=value,instanceCache[name]=value}function decorator(serviceName,decorFn){var origProvider=providerInjector.get(serviceName+providerSuffix),orig$get=origProvider.$get;origProvider.$get=function(){var origInstance=instanceInjector.invoke(orig$get,origProvider);return instanceInjector.invoke(decorFn,null,{$delegate:origInstance})}}function loadModules(modulesToLoad){var moduleFn,runBlocks=[];return forEach(modulesToLoad,function(module){function runInvokeQueue(queue){var i,ii;for(i=0,ii=queue.length;ii>i;i++){var invokeArgs=queue[i],provider=providerInjector.get(invokeArgs[0]);provider[invokeArgs[1]].apply(provider,invokeArgs[2])}}if(!loadedModules.get(module)){loadedModules.put(module,!0);try{isString(module)?(moduleFn=angularModule(module),runBlocks=runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks),runInvokeQueue(moduleFn._invokeQueue),runInvokeQueue(moduleFn._configBlocks)):isFunction(module)?runBlocks.push(providerInjector.invoke(module)):isArray(module)?runBlocks.push(providerInjector.invoke(module)):assertArgFn(module,"module")}catch(e){throw isArray(module)&&(module=module[module.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),$injectorMinErr("modulerr","Failed to instantiate module {0} due to:\n{1}",module,e.stack||e.message||e)}}}),runBlocks}function createInternalInjector(cache,factory){function getService(serviceName,caller){if(cache.hasOwnProperty(serviceName)){if(cache[serviceName]===INSTANTIATING)throw $injectorMinErr("cdep","Circular dependency found: {0}",serviceName+" <- "+path.join(" <- "));return cache[serviceName]}try{return path.unshift(serviceName),cache[serviceName]=INSTANTIATING,cache[serviceName]=factory(serviceName,caller)}catch(err){throw cache[serviceName]===INSTANTIATING&&delete cache[serviceName],err}finally{path.shift()}}function invoke(fn,self,locals,serviceName){"string"==typeof locals&&(serviceName=locals,locals=null);var length,i,key,args=[],$inject=createInjector.$$annotate(fn,strictDi,serviceName);for(i=0,length=$inject.length;length>i;i++){if(key=$inject[i],"string"!=typeof key)throw $injectorMinErr("itkn","Incorrect injection token! Expected service name as string, got {0}",key);args.push(locals&&locals.hasOwnProperty(key)?locals[key]:getService(key,serviceName))}return isArray(fn)&&(fn=fn[length]),fn.apply(self,args)}function instantiate(Type,locals,serviceName){var instance=Object.create((isArray(Type)?Type[Type.length-1]:Type).prototype||null),returnedValue=invoke(Type,instance,locals,serviceName);return isObject(returnedValue)||isFunction(returnedValue)?returnedValue:instance}return{invoke:invoke,instantiate:instantiate,get:getService,annotate:createInjector.$$annotate,has:function(name){return providerCache.hasOwnProperty(name+providerSuffix)||cache.hasOwnProperty(name)}}}strictDi=strictDi===!0;var INSTANTIATING={},providerSuffix="Provider",path=[],loadedModules=new HashMap([],!0),providerCache={$provide:{provider:supportObject(provider),factory:supportObject(factory),service:supportObject(service),value:supportObject(value),constant:supportObject(constant),decorator:decorator}},providerInjector=providerCache.$injector=createInternalInjector(providerCache,function(serviceName,caller){throw angular.isString(caller)&&path.push(caller),$injectorMinErr("unpr","Unknown provider: {0}",path.join(" <- "))}),instanceCache={},instanceInjector=instanceCache.$injector=createInternalInjector(instanceCache,function(serviceName,caller){var provider=providerInjector.get(serviceName+providerSuffix,caller);return instanceInjector.invoke(provider.$get,provider,undefined,serviceName)});return forEach(loadModules(modulesToLoad),function(fn){fn&&instanceInjector.invoke(fn)}),instanceInjector}function $AnchorScrollProvider(){var autoScrollingEnabled=!0;this.disableAutoScrolling=function(){autoScrollingEnabled=!1},this.$get=["$window","$location","$rootScope",function($window,$location,$rootScope){function getFirstAnchor(list){var result=null;return Array.prototype.some.call(list,function(element){return"a"===nodeName_(element)?(result=element,!0):void 0}),result}function getYOffset(){var offset=scroll.yOffset;if(isFunction(offset))offset=offset();else if(isElement(offset)){var elem=offset[0],style=$window.getComputedStyle(elem);offset="fixed"!==style.position?0:elem.getBoundingClientRect().bottom}else isNumber(offset)||(offset=0);return offset}function scrollTo(elem){if(elem){elem.scrollIntoView();var offset=getYOffset();if(offset){var elemTop=elem.getBoundingClientRect().top;$window.scrollBy(0,elemTop-offset)}}else $window.scrollTo(0,0)}function scroll(hash){hash=isString(hash)?hash:$location.hash();var elm;hash?(elm=document.getElementById(hash))?scrollTo(elm):(elm=getFirstAnchor(document.getElementsByName(hash)))?scrollTo(elm):"top"===hash&&scrollTo(null):scrollTo(null)}var document=$window.document;return autoScrollingEnabled&&$rootScope.$watch(function(){return $location.hash()},function(newVal,oldVal){(newVal!==oldVal||""!==newVal)&&jqLiteDocumentLoaded(function(){$rootScope.$evalAsync(scroll)})}),scroll}]}function mergeClasses(a,b){return a||b?a?b?(isArray(a)&&(a=a.join(" ")),isArray(b)&&(b=b.join(" ")),a+" "+b):a:b:""}function extractElementNode(element){for(var i=0;i<element.length;i++){var elm=element[i];if(elm.nodeType===ELEMENT_NODE)return elm}}function splitClasses(classes){isString(classes)&&(classes=classes.split(" "));var obj=createMap();return forEach(classes,function(klass){klass.length&&(obj[klass]=!0)}),obj}function prepareAnimateOptions(options){return isObject(options)?options:{}}function Browser(window,document,$log,$sniffer){function completeOutstandingRequest(fn){try{fn.apply(null,sliceArgs(arguments,1))}finally{if(outstandingRequestCount--,0===outstandingRequestCount)for(;outstandingRequestCallbacks.length;)try{outstandingRequestCallbacks.pop()()}catch(e){$log.error(e)}}}function getHash(url){var index=url.indexOf("#");return-1===index?"":url.substr(index)}function cacheStateAndFireUrlChange(){cacheState(),fireUrlChange()}function getCurrentState(){try{return history.state}catch(e){}}function cacheState(){cachedState=getCurrentState(),cachedState=isUndefined(cachedState)?null:cachedState,equals(cachedState,lastCachedState)&&(cachedState=lastCachedState),lastCachedState=cachedState}function fireUrlChange(){(lastBrowserUrl!==self.url()||lastHistoryState!==cachedState)&&(lastBrowserUrl=self.url(),lastHistoryState=cachedState,forEach(urlChangeListeners,function(listener){listener(self.url(),cachedState)}))}var self=this,location=(document[0],window.location),history=window.history,setTimeout=window.setTimeout,clearTimeout=window.clearTimeout,pendingDeferIds={};self.isMock=!1;var outstandingRequestCount=0,outstandingRequestCallbacks=[];self.$$completeOutstandingRequest=completeOutstandingRequest,self.$$incOutstandingRequestCount=function(){outstandingRequestCount++},self.notifyWhenNoOutstandingRequests=function(callback){0===outstandingRequestCount?callback():outstandingRequestCallbacks.push(callback)};var cachedState,lastHistoryState,lastBrowserUrl=location.href,baseElement=document.find("base"),reloadLocation=null;cacheState(),lastHistoryState=cachedState,self.url=function(url,replace,state){if(isUndefined(state)&&(state=null),location!==window.location&&(location=window.location),history!==window.history&&(history=window.history),url){var sameState=lastHistoryState===state;if(lastBrowserUrl===url&&(!$sniffer.history||sameState))return self;var sameBase=lastBrowserUrl&&stripHash(lastBrowserUrl)===stripHash(url);return lastBrowserUrl=url,lastHistoryState=state,!$sniffer.history||sameBase&&sameState?((!sameBase||reloadLocation)&&(reloadLocation=url),replace?location.replace(url):sameBase?location.hash=getHash(url):location.href=url):(history[replace?"replaceState":"pushState"](state,"",url),cacheState(),lastHistoryState=cachedState),self}return reloadLocation||location.href.replace(/%27/g,"'")},self.state=function(){return cachedState};var urlChangeListeners=[],urlChangeInit=!1,lastCachedState=null;self.onUrlChange=function(callback){return urlChangeInit||($sniffer.history&&jqLite(window).on("popstate",cacheStateAndFireUrlChange),jqLite(window).on("hashchange",cacheStateAndFireUrlChange),urlChangeInit=!0),urlChangeListeners.push(callback),callback},self.$$applicationDestroyed=function(){jqLite(window).off("hashchange popstate",cacheStateAndFireUrlChange)},self.$$checkUrlChange=fireUrlChange,self.baseHref=function(){var href=baseElement.attr("href");return href?href.replace(/^(https?\:)?\/\/[^\/]*/,""):""},self.defer=function(fn,delay){var timeoutId;return outstandingRequestCount++,timeoutId=setTimeout(function(){delete pendingDeferIds[timeoutId],completeOutstandingRequest(fn)},delay||0),pendingDeferIds[timeoutId]=!0,timeoutId},self.defer.cancel=function(deferId){return pendingDeferIds[deferId]?(delete pendingDeferIds[deferId],clearTimeout(deferId),completeOutstandingRequest(noop),!0):!1}}function $BrowserProvider(){this.$get=["$window","$log","$sniffer","$document",function($window,$log,$sniffer,$document){return new Browser($window,$document,$log,$sniffer)}]}function $CacheFactoryProvider(){this.$get=function(){function cacheFactory(cacheId,options){function refresh(entry){entry!=freshEnd&&(staleEnd?staleEnd==entry&&(staleEnd=entry.n):staleEnd=entry,link(entry.n,entry.p),link(entry,freshEnd),freshEnd=entry,freshEnd.n=null)}function link(nextEntry,prevEntry){nextEntry!=prevEntry&&(nextEntry&&(nextEntry.p=prevEntry),prevEntry&&(prevEntry.n=nextEntry))}if(cacheId in caches)throw minErr("$cacheFactory")("iid","CacheId '{0}' is already taken!",cacheId);var size=0,stats=extend({},options,{id:cacheId}),data={},capacity=options&&options.capacity||Number.MAX_VALUE,lruHash={},freshEnd=null,staleEnd=null;return caches[cacheId]={put:function(key,value){if(!isUndefined(value)){if(capacity<Number.MAX_VALUE){var lruEntry=lruHash[key]||(lruHash[key]={key:key});refresh(lruEntry)}return key in data||size++,data[key]=value,size>capacity&&this.remove(staleEnd.key),value}},get:function(key){if(capacity<Number.MAX_VALUE){var lruEntry=lruHash[key];if(!lruEntry)return;refresh(lruEntry)}return data[key]},remove:function(key){if(capacity<Number.MAX_VALUE){var lruEntry=lruHash[key];if(!lruEntry)return;lruEntry==freshEnd&&(freshEnd=lruEntry.p),lruEntry==staleEnd&&(staleEnd=lruEntry.n),link(lruEntry.n,lruEntry.p),delete lruHash[key]}delete data[key],size--},removeAll:function(){data={},size=0,lruHash={},freshEnd=staleEnd=null},destroy:function(){data=null,stats=null,lruHash=null,delete caches[cacheId]},info:function(){return extend({},stats,{size:size})}}}var caches={};return cacheFactory.info=function(){var info={};return forEach(caches,function(cache,cacheId){info[cacheId]=cache.info()}),info},cacheFactory.get=function(cacheId){return caches[cacheId]},cacheFactory}}function $TemplateCacheProvider(){this.$get=["$cacheFactory",function($cacheFactory){return $cacheFactory("templates")}]}function $CompileProvider($provide,$$sanitizeUriProvider){function parseIsolateBindings(scope,directiveName,isController){var LOCAL_REGEXP=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,bindings={};return forEach(scope,function(definition,scopeName){var match=definition.match(LOCAL_REGEXP);if(!match)throw $compileMinErr("iscp","Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}",directiveName,scopeName,definition,isController?"controller bindings definition":"isolate scope definition");bindings[scopeName]={mode:match[1][0],collection:"*"===match[2],optional:"?"===match[3],attrName:match[4]||scopeName}}),bindings}function parseDirectiveBindings(directive,directiveName){var bindings={isolateScope:null,bindToController:null};if(isObject(directive.scope)&&(directive.bindToController===!0?(bindings.bindToController=parseIsolateBindings(directive.scope,directiveName,!0),bindings.isolateScope={}):bindings.isolateScope=parseIsolateBindings(directive.scope,directiveName,!1)),isObject(directive.bindToController)&&(bindings.bindToController=parseIsolateBindings(directive.bindToController,directiveName,!0)),isObject(bindings.bindToController)){var controller=directive.controller,controllerAs=directive.controllerAs;if(!controller)throw $compileMinErr("noctrl","Cannot bind to controller without directive '{0}'s controller.",directiveName);if(!identifierForController(controller,controllerAs))throw $compileMinErr("noident","Cannot bind to controller without identifier for directive '{0}'.",directiveName)}return bindings}function assertValidDirectiveName(name){var letter=name.charAt(0);if(!letter||letter!==lowercase(letter))throw $compileMinErr("baddir","Directive name '{0}' is invalid. The first character must be a lowercase letter",name);if(name!==name.trim())throw $compileMinErr("baddir","Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces",name)}var hasDirectives={},Suffix="Directive",COMMENT_DIRECTIVE_REGEXP=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,CLASS_DIRECTIVE_REGEXP=/(([\w\-]+)(?:\:([^;]+))?;?)/,ALL_OR_NOTHING_ATTRS=makeMap("ngSrc,ngSrcset,src,srcset"),REQUIRE_PREFIX_REGEXP=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,EVENT_HANDLER_ATTR_REGEXP=/^(on[a-z]+|formaction)$/;this.directive=function registerDirective(name,directiveFactory){return assertNotHasOwnProperty(name,"directive"),isString(name)?(assertValidDirectiveName(name),assertArg(directiveFactory,"directiveFactory"),hasDirectives.hasOwnProperty(name)||(hasDirectives[name]=[],$provide.factory(name+Suffix,["$injector","$exceptionHandler",function($injector,$exceptionHandler){var directives=[];return forEach(hasDirectives[name],function(directiveFactory,index){try{var directive=$injector.invoke(directiveFactory);isFunction(directive)?directive={compile:valueFn(directive)}:!directive.compile&&directive.link&&(directive.compile=valueFn(directive.link)),directive.priority=directive.priority||0,directive.index=index,directive.name=directive.name||name,directive.require=directive.require||directive.controller&&directive.name,directive.restrict=directive.restrict||"EA";var bindings=directive.$$bindings=parseDirectiveBindings(directive,directive.name);isObject(bindings.isolateScope)&&(directive.$$isolateBindings=bindings.isolateScope),directive.$$moduleName=directiveFactory.$$moduleName,directives.push(directive)}catch(e){$exceptionHandler(e)}}),directives}])),hasDirectives[name].push(directiveFactory)):forEach(name,reverseParams(registerDirective)),this},this.aHrefSanitizationWhitelist=function(regexp){return isDefined(regexp)?($$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp),this):$$sanitizeUriProvider.aHrefSanitizationWhitelist()},this.imgSrcSanitizationWhitelist=function(regexp){return isDefined(regexp)?($$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp),this):$$sanitizeUriProvider.imgSrcSanitizationWhitelist()};var debugInfoEnabled=!0;this.debugInfoEnabled=function(enabled){return isDefined(enabled)?(debugInfoEnabled=enabled,this):debugInfoEnabled},this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function($injector,$interpolate,$exceptionHandler,$templateRequest,$parse,$controller,$rootScope,$document,$sce,$animate,$$sanitizeUri){function safeAddClass($element,className){try{$element.addClass(className)}catch(e){}}function compile($compileNodes,transcludeFn,maxPriority,ignoreDirective,previousCompileContext){$compileNodes instanceof jqLite||($compileNodes=jqLite($compileNodes)),forEach($compileNodes,function(node,index){node.nodeType==NODE_TYPE_TEXT&&node.nodeValue.match(/\S+/)&&($compileNodes[index]=jqLite(node).wrap("<span></span>").parent()[0])});var compositeLinkFn=compileNodes($compileNodes,transcludeFn,$compileNodes,maxPriority,ignoreDirective,previousCompileContext);compile.$$addScopeClass($compileNodes);var namespace=null;return function(scope,cloneConnectFn,options){assertArg(scope,"scope"),options=options||{};var parentBoundTranscludeFn=options.parentBoundTranscludeFn,transcludeControllers=options.transcludeControllers,futureParentElement=options.futureParentElement;parentBoundTranscludeFn&&parentBoundTranscludeFn.$$boundTransclude&&(parentBoundTranscludeFn=parentBoundTranscludeFn.$$boundTransclude),namespace||(namespace=detectNamespaceForChildElements(futureParentElement));var $linkNode;if($linkNode="html"!==namespace?jqLite(wrapTemplate(namespace,jqLite("<div>").append($compileNodes).html())):cloneConnectFn?JQLitePrototype.clone.call($compileNodes):$compileNodes,transcludeControllers)for(var controllerName in transcludeControllers)$linkNode.data("$"+controllerName+"Controller",transcludeControllers[controllerName].instance);return compile.$$addScopeInfo($linkNode,scope),cloneConnectFn&&cloneConnectFn($linkNode,scope),compositeLinkFn&&compositeLinkFn(scope,$linkNode,$linkNode,parentBoundTranscludeFn),$linkNode}}function detectNamespaceForChildElements(parentElement){var node=parentElement&&parentElement[0];return node?"foreignobject"!==nodeName_(node)&&node.toString().match(/SVG/)?"svg":"html":"html"}function compileNodes(nodeList,transcludeFn,$rootElement,maxPriority,ignoreDirective,previousCompileContext){function compositeLinkFn(scope,nodeList,$rootElement,parentBoundTranscludeFn){var nodeLinkFn,childLinkFn,node,childScope,i,ii,idx,childBoundTranscludeFn,stableNodeList;if(nodeLinkFnFound){var nodeListLength=nodeList.length;for(stableNodeList=new Array(nodeListLength),i=0;i<linkFns.length;i+=3)idx=linkFns[i],stableNodeList[idx]=nodeList[idx]}else stableNodeList=nodeList;for(i=0,ii=linkFns.length;ii>i;)if(node=stableNodeList[linkFns[i++]],nodeLinkFn=linkFns[i++],childLinkFn=linkFns[i++],nodeLinkFn){if(nodeLinkFn.scope){childScope=scope.$new(),compile.$$addScopeInfo(jqLite(node),childScope);var destroyBindings=nodeLinkFn.$$destroyBindings;destroyBindings&&(nodeLinkFn.$$destroyBindings=null,childScope.$on("$destroyed",destroyBindings))}else childScope=scope;childBoundTranscludeFn=nodeLinkFn.transcludeOnThisElement?createBoundTranscludeFn(scope,nodeLinkFn.transclude,parentBoundTranscludeFn):!nodeLinkFn.templateOnThisElement&&parentBoundTranscludeFn?parentBoundTranscludeFn:!parentBoundTranscludeFn&&transcludeFn?createBoundTranscludeFn(scope,transcludeFn):null,nodeLinkFn(childLinkFn,childScope,node,$rootElement,childBoundTranscludeFn,nodeLinkFn)}else childLinkFn&&childLinkFn(scope,node.childNodes,undefined,parentBoundTranscludeFn)}for(var attrs,directives,nodeLinkFn,childNodes,childLinkFn,linkFnFound,nodeLinkFnFound,linkFns=[],i=0;i<nodeList.length;i++)attrs=new Attributes,directives=collectDirectives(nodeList[i],[],attrs,0===i?maxPriority:undefined,ignoreDirective),nodeLinkFn=directives.length?applyDirectivesToNode(directives,nodeList[i],attrs,transcludeFn,$rootElement,null,[],[],previousCompileContext):null,nodeLinkFn&&nodeLinkFn.scope&&compile.$$addScopeClass(attrs.$$element),childLinkFn=nodeLinkFn&&nodeLinkFn.terminal||!(childNodes=nodeList[i].childNodes)||!childNodes.length?null:compileNodes(childNodes,nodeLinkFn?(nodeLinkFn.transcludeOnThisElement||!nodeLinkFn.templateOnThisElement)&&nodeLinkFn.transclude:transcludeFn),(nodeLinkFn||childLinkFn)&&(linkFns.push(i,nodeLinkFn,childLinkFn),linkFnFound=!0,nodeLinkFnFound=nodeLinkFnFound||nodeLinkFn),previousCompileContext=null;return linkFnFound?compositeLinkFn:null}function createBoundTranscludeFn(scope,transcludeFn,previousBoundTranscludeFn){var boundTranscludeFn=function(transcludedScope,cloneFn,controllers,futureParentElement,containingScope){return transcludedScope||(transcludedScope=scope.$new(!1,containingScope),transcludedScope.$$transcluded=!0),transcludeFn(transcludedScope,cloneFn,{parentBoundTranscludeFn:previousBoundTranscludeFn,transcludeControllers:controllers,futureParentElement:futureParentElement})};return boundTranscludeFn}function collectDirectives(node,directives,attrs,maxPriority,ignoreDirective){var match,className,nodeType=node.nodeType,attrsMap=attrs.$attr;switch(nodeType){case NODE_TYPE_ELEMENT:addDirective(directives,directiveNormalize(nodeName_(node)),"E",maxPriority,ignoreDirective);for(var attr,name,nName,ngAttrName,value,isNgAttr,nAttrs=node.attributes,j=0,jj=nAttrs&&nAttrs.length;jj>j;j++){var attrStartName=!1,attrEndName=!1;attr=nAttrs[j],name=attr.name,value=trim(attr.value),ngAttrName=directiveNormalize(name),(isNgAttr=NG_ATTR_BINDING.test(ngAttrName))&&(name=name.replace(PREFIX_REGEXP,"").substr(8).replace(/_(.)/g,function(match,letter){return letter.toUpperCase()}));var directiveNName=ngAttrName.replace(/(Start|End)$/,"");directiveIsMultiElement(directiveNName)&&ngAttrName===directiveNName+"Start"&&(attrStartName=name,attrEndName=name.substr(0,name.length-5)+"end",name=name.substr(0,name.length-6)),nName=directiveNormalize(name.toLowerCase()),attrsMap[nName]=name,(isNgAttr||!attrs.hasOwnProperty(nName))&&(attrs[nName]=value,getBooleanAttrName(node,nName)&&(attrs[nName]=!0)),addAttrInterpolateDirective(node,directives,value,nName,isNgAttr),addDirective(directives,nName,"A",maxPriority,ignoreDirective,attrStartName,attrEndName)}if(className=node.className,isObject(className)&&(className=className.animVal),isString(className)&&""!==className)for(;match=CLASS_DIRECTIVE_REGEXP.exec(className);)nName=directiveNormalize(match[2]),addDirective(directives,nName,"C",maxPriority,ignoreDirective)&&(attrs[nName]=trim(match[3])),className=className.substr(match.index+match[0].length);break;case NODE_TYPE_TEXT:if(11===msie)for(;node.parentNode&&node.nextSibling&&node.nextSibling.nodeType===NODE_TYPE_TEXT;)node.nodeValue=node.nodeValue+node.nextSibling.nodeValue,node.parentNode.removeChild(node.nextSibling);addTextInterpolateDirective(directives,node.nodeValue);break;case NODE_TYPE_COMMENT:try{match=COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue),match&&(nName=directiveNormalize(match[1]),addDirective(directives,nName,"M",maxPriority,ignoreDirective)&&(attrs[nName]=trim(match[2])))}catch(e){}}return directives.sort(byPriority),directives}function groupScan(node,attrStart,attrEnd){var nodes=[],depth=0;if(attrStart&&node.hasAttribute&&node.hasAttribute(attrStart)){do{if(!node)throw $compileMinErr("uterdir","Unterminated attribute, found '{0}' but no matching '{1}' found.",attrStart,attrEnd);node.nodeType==NODE_TYPE_ELEMENT&&(node.hasAttribute(attrStart)&&depth++,node.hasAttribute(attrEnd)&&depth--),nodes.push(node),node=node.nextSibling}while(depth>0)}else nodes.push(node);return jqLite(nodes)}function groupElementsLinkFnWrapper(linkFn,attrStart,attrEnd){return function(scope,element,attrs,controllers,transcludeFn){return element=groupScan(element[0],attrStart,attrEnd),linkFn(scope,element,attrs,controllers,transcludeFn)}}function applyDirectivesToNode(directives,compileNode,templateAttrs,transcludeFn,jqCollection,originalReplaceDirective,preLinkFns,postLinkFns,previousCompileContext){function addLinkFns(pre,post,attrStart,attrEnd){pre&&(attrStart&&(pre=groupElementsLinkFnWrapper(pre,attrStart,attrEnd)),pre.require=directive.require,pre.directiveName=directiveName,(newIsolateScopeDirective===directive||directive.$$isolateScope)&&(pre=cloneAndAnnotateFn(pre,{isolateScope:!0})),preLinkFns.push(pre)),post&&(attrStart&&(post=groupElementsLinkFnWrapper(post,attrStart,attrEnd)),post.require=directive.require,post.directiveName=directiveName,(newIsolateScopeDirective===directive||directive.$$isolateScope)&&(post=cloneAndAnnotateFn(post,{isolateScope:!0})),postLinkFns.push(post))}function getControllers(directiveName,require,$element,elementControllers){var value;if(isString(require)){var match=require.match(REQUIRE_PREFIX_REGEXP),name=require.substring(match[0].length),inheritType=match[1]||match[3],optional="?"===match[2];if("^^"===inheritType?$element=$element.parent():(value=elementControllers&&elementControllers[name],value=value&&value.instance),!value){var dataName="$"+name+"Controller";value=inheritType?$element.inheritedData(dataName):$element.data(dataName)}if(!value&&!optional)throw $compileMinErr("ctreq","Controller '{0}', required by directive '{1}', can't be found!",name,directiveName)}else if(isArray(require)){value=[];for(var i=0,ii=require.length;ii>i;i++)value[i]=getControllers(directiveName,require[i],$element,elementControllers)}return value||null}function setupControllers($element,attrs,transcludeFn,controllerDirectives,isolateScope,scope){var elementControllers=createMap();for(var controllerKey in controllerDirectives){var directive=controllerDirectives[controllerKey],locals={$scope:directive===newIsolateScopeDirective||directive.$$isolateScope?isolateScope:scope,$element:$element,$attrs:attrs,$transclude:transcludeFn},controller=directive.controller;"@"==controller&&(controller=attrs[directive.name]);var controllerInstance=$controller(controller,locals,!0,directive.controllerAs);elementControllers[directive.name]=controllerInstance,hasElementTranscludeDirective||$element.data("$"+directive.name+"Controller",controllerInstance.instance)}return elementControllers}function nodeLinkFn(childLinkFn,scope,linkNode,$rootElement,boundTranscludeFn,thisLinkFn){function controllersBoundTransclude(scope,cloneAttachFn,futureParentElement){var transcludeControllers;return isScope(scope)||(futureParentElement=cloneAttachFn,cloneAttachFn=scope,scope=undefined),hasElementTranscludeDirective&&(transcludeControllers=elementControllers),futureParentElement||(futureParentElement=hasElementTranscludeDirective?$element.parent():$element),boundTranscludeFn(scope,cloneAttachFn,transcludeControllers,futureParentElement,scopeToChild)}var i,ii,linkFn,controller,isolateScope,elementControllers,transcludeFn,$element,attrs;if(compileNode===linkNode?(attrs=templateAttrs,$element=templateAttrs.$$element):($element=jqLite(linkNode),attrs=new Attributes($element,templateAttrs)),newIsolateScopeDirective&&(isolateScope=scope.$new(!0)),boundTranscludeFn&&(transcludeFn=controllersBoundTransclude,transcludeFn.$$boundTransclude=boundTranscludeFn),controllerDirectives&&(elementControllers=setupControllers($element,attrs,transcludeFn,controllerDirectives,isolateScope,scope)),newIsolateScopeDirective&&(compile.$$addScopeInfo($element,isolateScope,!0,!(templateDirective&&(templateDirective===newIsolateScopeDirective||templateDirective===newIsolateScopeDirective.$$originalDirective))),compile.$$addScopeClass($element,!0),isolateScope.$$isolateBindings=newIsolateScopeDirective.$$isolateBindings,initializeDirectiveBindings(scope,attrs,isolateScope,isolateScope.$$isolateBindings,newIsolateScopeDirective,isolateScope)),elementControllers){var bindings,controllerForBindings,scopeDirective=newIsolateScopeDirective||newScopeDirective;scopeDirective&&elementControllers[scopeDirective.name]&&(bindings=scopeDirective.$$bindings.bindToController,controller=elementControllers[scopeDirective.name],controller&&controller.identifier&&bindings&&(controllerForBindings=controller,thisLinkFn.$$destroyBindings=initializeDirectiveBindings(scope,attrs,controller.instance,bindings,scopeDirective)));for(i in elementControllers){controller=elementControllers[i];var controllerResult=controller();controllerResult!==controller.instance&&(controller.instance=controllerResult,$element.data("$"+i+"Controller",controllerResult),controller===controllerForBindings&&(thisLinkFn.$$destroyBindings(),thisLinkFn.$$destroyBindings=initializeDirectiveBindings(scope,attrs,controllerResult,bindings,scopeDirective)))}}for(i=0,ii=preLinkFns.length;ii>i;i++)linkFn=preLinkFns[i],invokeLinkFn(linkFn,linkFn.isolateScope?isolateScope:scope,$element,attrs,linkFn.require&&getControllers(linkFn.directiveName,linkFn.require,$element,elementControllers),transcludeFn);var scopeToChild=scope;for(newIsolateScopeDirective&&(newIsolateScopeDirective.template||null===newIsolateScopeDirective.templateUrl)&&(scopeToChild=isolateScope),childLinkFn&&childLinkFn(scopeToChild,linkNode.childNodes,undefined,boundTranscludeFn),i=postLinkFns.length-1;i>=0;i--)linkFn=postLinkFns[i],invokeLinkFn(linkFn,linkFn.isolateScope?isolateScope:scope,$element,attrs,linkFn.require&&getControllers(linkFn.directiveName,linkFn.require,$element,elementControllers),transcludeFn)}previousCompileContext=previousCompileContext||{};for(var directive,directiveName,$template,linkFn,directiveValue,terminalPriority=-Number.MAX_VALUE,newScopeDirective=previousCompileContext.newScopeDirective,controllerDirectives=previousCompileContext.controllerDirectives,newIsolateScopeDirective=previousCompileContext.newIsolateScopeDirective,templateDirective=previousCompileContext.templateDirective,nonTlbTranscludeDirective=previousCompileContext.nonTlbTranscludeDirective,hasTranscludeDirective=!1,hasTemplate=!1,hasElementTranscludeDirective=previousCompileContext.hasElementTranscludeDirective,$compileNode=templateAttrs.$$element=jqLite(compileNode),replaceDirective=originalReplaceDirective,childTranscludeFn=transcludeFn,i=0,ii=directives.length;ii>i;i++){directive=directives[i];var attrStart=directive.$$start,attrEnd=directive.$$end;if(attrStart&&($compileNode=groupScan(compileNode,attrStart,attrEnd)),$template=undefined,terminalPriority>directive.priority)break;
if((directiveValue=directive.scope)&&(directive.templateUrl||(isObject(directiveValue)?(assertNoDuplicate("new/isolated scope",newIsolateScopeDirective||newScopeDirective,directive,$compileNode),newIsolateScopeDirective=directive):assertNoDuplicate("new/isolated scope",newIsolateScopeDirective,directive,$compileNode)),newScopeDirective=newScopeDirective||directive),directiveName=directive.name,!directive.templateUrl&&directive.controller&&(directiveValue=directive.controller,controllerDirectives=controllerDirectives||createMap(),assertNoDuplicate("'"+directiveName+"' controller",controllerDirectives[directiveName],directive,$compileNode),controllerDirectives[directiveName]=directive),(directiveValue=directive.transclude)&&(hasTranscludeDirective=!0,directive.$$tlb||(assertNoDuplicate("transclusion",nonTlbTranscludeDirective,directive,$compileNode),nonTlbTranscludeDirective=directive),"element"==directiveValue?(hasElementTranscludeDirective=!0,terminalPriority=directive.priority,$template=$compileNode,$compileNode=templateAttrs.$$element=jqLite(document.createComment(" "+directiveName+": "+templateAttrs[directiveName]+" ")),compileNode=$compileNode[0],replaceWith(jqCollection,sliceArgs($template),compileNode),childTranscludeFn=compile($template,transcludeFn,terminalPriority,replaceDirective&&replaceDirective.name,{nonTlbTranscludeDirective:nonTlbTranscludeDirective})):($template=jqLite(jqLiteClone(compileNode)).contents(),$compileNode.empty(),childTranscludeFn=compile($template,transcludeFn))),directive.template)if(hasTemplate=!0,assertNoDuplicate("template",templateDirective,directive,$compileNode),templateDirective=directive,directiveValue=isFunction(directive.template)?directive.template($compileNode,templateAttrs):directive.template,directiveValue=denormalizeTemplate(directiveValue),directive.replace){if(replaceDirective=directive,$template=jqLiteIsTextNode(directiveValue)?[]:removeComments(wrapTemplate(directive.templateNamespace,trim(directiveValue))),compileNode=$template[0],1!=$template.length||compileNode.nodeType!==NODE_TYPE_ELEMENT)throw $compileMinErr("tplrt","Template for directive '{0}' must have exactly one root element. {1}",directiveName,"");replaceWith(jqCollection,$compileNode,compileNode);var newTemplateAttrs={$attr:{}},templateDirectives=collectDirectives(compileNode,[],newTemplateAttrs),unprocessedDirectives=directives.splice(i+1,directives.length-(i+1));newIsolateScopeDirective&&markDirectivesAsIsolate(templateDirectives),directives=directives.concat(templateDirectives).concat(unprocessedDirectives),mergeTemplateAttributes(templateAttrs,newTemplateAttrs),ii=directives.length}else $compileNode.html(directiveValue);if(directive.templateUrl)hasTemplate=!0,assertNoDuplicate("template",templateDirective,directive,$compileNode),templateDirective=directive,directive.replace&&(replaceDirective=directive),nodeLinkFn=compileTemplateUrl(directives.splice(i,directives.length-i),$compileNode,templateAttrs,jqCollection,hasTranscludeDirective&&childTranscludeFn,preLinkFns,postLinkFns,{controllerDirectives:controllerDirectives,newScopeDirective:newScopeDirective!==directive&&newScopeDirective,newIsolateScopeDirective:newIsolateScopeDirective,templateDirective:templateDirective,nonTlbTranscludeDirective:nonTlbTranscludeDirective}),ii=directives.length;else if(directive.compile)try{linkFn=directive.compile($compileNode,templateAttrs,childTranscludeFn),isFunction(linkFn)?addLinkFns(null,linkFn,attrStart,attrEnd):linkFn&&addLinkFns(linkFn.pre,linkFn.post,attrStart,attrEnd)}catch(e){$exceptionHandler(e,startingTag($compileNode))}directive.terminal&&(nodeLinkFn.terminal=!0,terminalPriority=Math.max(terminalPriority,directive.priority))}return nodeLinkFn.scope=newScopeDirective&&newScopeDirective.scope===!0,nodeLinkFn.transcludeOnThisElement=hasTranscludeDirective,nodeLinkFn.templateOnThisElement=hasTemplate,nodeLinkFn.transclude=childTranscludeFn,previousCompileContext.hasElementTranscludeDirective=hasElementTranscludeDirective,nodeLinkFn}function markDirectivesAsIsolate(directives){for(var j=0,jj=directives.length;jj>j;j++)directives[j]=inherit(directives[j],{$$isolateScope:!0})}function addDirective(tDirectives,name,location,maxPriority,ignoreDirective,startAttrName,endAttrName){if(name===ignoreDirective)return null;var match=null;if(hasDirectives.hasOwnProperty(name))for(var directive,directives=$injector.get(name+Suffix),i=0,ii=directives.length;ii>i;i++)try{directive=directives[i],(maxPriority===undefined||maxPriority>directive.priority)&&-1!=directive.restrict.indexOf(location)&&(startAttrName&&(directive=inherit(directive,{$$start:startAttrName,$$end:endAttrName})),tDirectives.push(directive),match=directive)}catch(e){$exceptionHandler(e)}return match}function directiveIsMultiElement(name){if(hasDirectives.hasOwnProperty(name))for(var directive,directives=$injector.get(name+Suffix),i=0,ii=directives.length;ii>i;i++)if(directive=directives[i],directive.multiElement)return!0;return!1}function mergeTemplateAttributes(dst,src){var srcAttr=src.$attr,dstAttr=dst.$attr,$element=dst.$$element;forEach(dst,function(value,key){"$"!=key.charAt(0)&&(src[key]&&src[key]!==value&&(value+=("style"===key?";":" ")+src[key]),dst.$set(key,value,!0,srcAttr[key]))}),forEach(src,function(value,key){"class"==key?(safeAddClass($element,value),dst["class"]=(dst["class"]?dst["class"]+" ":"")+value):"style"==key?($element.attr("style",$element.attr("style")+";"+value),dst.style=(dst.style?dst.style+";":"")+value):"$"==key.charAt(0)||dst.hasOwnProperty(key)||(dst[key]=value,dstAttr[key]=srcAttr[key])})}function compileTemplateUrl(directives,$compileNode,tAttrs,$rootElement,childTranscludeFn,preLinkFns,postLinkFns,previousCompileContext){var afterTemplateNodeLinkFn,afterTemplateChildLinkFn,linkQueue=[],beforeTemplateCompileNode=$compileNode[0],origAsyncDirective=directives.shift(),derivedSyncDirective=inherit(origAsyncDirective,{templateUrl:null,transclude:null,replace:null,$$originalDirective:origAsyncDirective}),templateUrl=isFunction(origAsyncDirective.templateUrl)?origAsyncDirective.templateUrl($compileNode,tAttrs):origAsyncDirective.templateUrl,templateNamespace=origAsyncDirective.templateNamespace;return $compileNode.empty(),$templateRequest(templateUrl).then(function(content){var compileNode,tempTemplateAttrs,$template,childBoundTranscludeFn;if(content=denormalizeTemplate(content),origAsyncDirective.replace){if($template=jqLiteIsTextNode(content)?[]:removeComments(wrapTemplate(templateNamespace,trim(content))),compileNode=$template[0],1!=$template.length||compileNode.nodeType!==NODE_TYPE_ELEMENT)throw $compileMinErr("tplrt","Template for directive '{0}' must have exactly one root element. {1}",origAsyncDirective.name,templateUrl);tempTemplateAttrs={$attr:{}},replaceWith($rootElement,$compileNode,compileNode);var templateDirectives=collectDirectives(compileNode,[],tempTemplateAttrs);isObject(origAsyncDirective.scope)&&markDirectivesAsIsolate(templateDirectives),directives=templateDirectives.concat(directives),mergeTemplateAttributes(tAttrs,tempTemplateAttrs)}else compileNode=beforeTemplateCompileNode,$compileNode.html(content);for(directives.unshift(derivedSyncDirective),afterTemplateNodeLinkFn=applyDirectivesToNode(directives,compileNode,tAttrs,childTranscludeFn,$compileNode,origAsyncDirective,preLinkFns,postLinkFns,previousCompileContext),forEach($rootElement,function(node,i){node==compileNode&&($rootElement[i]=$compileNode[0])}),afterTemplateChildLinkFn=compileNodes($compileNode[0].childNodes,childTranscludeFn);linkQueue.length;){var scope=linkQueue.shift(),beforeTemplateLinkNode=linkQueue.shift(),linkRootElement=linkQueue.shift(),boundTranscludeFn=linkQueue.shift(),linkNode=$compileNode[0];if(!scope.$$destroyed){if(beforeTemplateLinkNode!==beforeTemplateCompileNode){var oldClasses=beforeTemplateLinkNode.className;previousCompileContext.hasElementTranscludeDirective&&origAsyncDirective.replace||(linkNode=jqLiteClone(compileNode)),replaceWith(linkRootElement,jqLite(beforeTemplateLinkNode),linkNode),safeAddClass(jqLite(linkNode),oldClasses)}childBoundTranscludeFn=afterTemplateNodeLinkFn.transcludeOnThisElement?createBoundTranscludeFn(scope,afterTemplateNodeLinkFn.transclude,boundTranscludeFn):boundTranscludeFn,afterTemplateNodeLinkFn(afterTemplateChildLinkFn,scope,linkNode,$rootElement,childBoundTranscludeFn,afterTemplateNodeLinkFn)}}linkQueue=null}),function(ignoreChildLinkFn,scope,node,rootElement,boundTranscludeFn){var childBoundTranscludeFn=boundTranscludeFn;scope.$$destroyed||(linkQueue?linkQueue.push(scope,node,rootElement,childBoundTranscludeFn):(afterTemplateNodeLinkFn.transcludeOnThisElement&&(childBoundTranscludeFn=createBoundTranscludeFn(scope,afterTemplateNodeLinkFn.transclude,boundTranscludeFn)),afterTemplateNodeLinkFn(afterTemplateChildLinkFn,scope,node,rootElement,childBoundTranscludeFn,afterTemplateNodeLinkFn)))}}function byPriority(a,b){var diff=b.priority-a.priority;return 0!==diff?diff:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function assertNoDuplicate(what,previousDirective,directive,element){function wrapModuleNameIfDefined(moduleName){return moduleName?" (module: "+moduleName+")":""}if(previousDirective)throw $compileMinErr("multidir","Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}",previousDirective.name,wrapModuleNameIfDefined(previousDirective.$$moduleName),directive.name,wrapModuleNameIfDefined(directive.$$moduleName),what,startingTag(element))}function addTextInterpolateDirective(directives,text){var interpolateFn=$interpolate(text,!0);interpolateFn&&directives.push({priority:0,compile:function(templateNode){var templateNodeParent=templateNode.parent(),hasCompileParent=!!templateNodeParent.length;return hasCompileParent&&compile.$$addBindingClass(templateNodeParent),function(scope,node){var parent=node.parent();hasCompileParent||compile.$$addBindingClass(parent),compile.$$addBindingInfo(parent,interpolateFn.expressions),scope.$watch(interpolateFn,function(value){node[0].nodeValue=value})}}})}function wrapTemplate(type,template){switch(type=lowercase(type||"html")){case"svg":case"math":var wrapper=document.createElement("div");return wrapper.innerHTML="<"+type+">"+template+"</"+type+">",wrapper.childNodes[0].childNodes;default:return template}}function getTrustedContext(node,attrNormalizedName){if("srcdoc"==attrNormalizedName)return $sce.HTML;var tag=nodeName_(node);return"xlinkHref"==attrNormalizedName||"form"==tag&&"action"==attrNormalizedName||"img"!=tag&&("src"==attrNormalizedName||"ngSrc"==attrNormalizedName)?$sce.RESOURCE_URL:void 0}function addAttrInterpolateDirective(node,directives,value,name,allOrNothing){var trustedContext=getTrustedContext(node,name);allOrNothing=ALL_OR_NOTHING_ATTRS[name]||allOrNothing;var interpolateFn=$interpolate(value,!0,trustedContext,allOrNothing);if(interpolateFn){if("multiple"===name&&"select"===nodeName_(node))throw $compileMinErr("selmulti","Binding to the 'multiple' attribute is not supported. Element: {0}",startingTag(node));directives.push({priority:100,compile:function(){return{pre:function(scope,element,attr){var $$observers=attr.$$observers||(attr.$$observers={});if(EVENT_HANDLER_ATTR_REGEXP.test(name))throw $compileMinErr("nodomevents","Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");var newValue=attr[name];newValue!==value&&(interpolateFn=newValue&&$interpolate(newValue,!0,trustedContext,allOrNothing),value=newValue),interpolateFn&&(attr[name]=interpolateFn(scope),($$observers[name]||($$observers[name]=[])).$$inter=!0,(attr.$$observers&&attr.$$observers[name].$$scope||scope).$watch(interpolateFn,function(newValue,oldValue){"class"===name&&newValue!=oldValue?attr.$updateClass(newValue,oldValue):attr.$set(name,newValue)}))}}}})}}function replaceWith($rootElement,elementsToRemove,newNode){var i,ii,firstElementToRemove=elementsToRemove[0],removeCount=elementsToRemove.length,parent=firstElementToRemove.parentNode;if($rootElement)for(i=0,ii=$rootElement.length;ii>i;i++)if($rootElement[i]==firstElementToRemove){$rootElement[i++]=newNode;for(var j=i,j2=j+removeCount-1,jj=$rootElement.length;jj>j;j++,j2++)jj>j2?$rootElement[j]=$rootElement[j2]:delete $rootElement[j];$rootElement.length-=removeCount-1,$rootElement.context===firstElementToRemove&&($rootElement.context=newNode);break}parent&&parent.replaceChild(newNode,firstElementToRemove);var fragment=document.createDocumentFragment();fragment.appendChild(firstElementToRemove),jqLite.hasData(firstElementToRemove)&&(jqLite(newNode).data(jqLite(firstElementToRemove).data()),jQuery?(skipDestroyOnNextJQueryCleanData=!0,jQuery.cleanData([firstElementToRemove])):delete jqLite.cache[firstElementToRemove[jqLite.expando]]);for(var k=1,kk=elementsToRemove.length;kk>k;k++){var element=elementsToRemove[k];jqLite(element).remove(),fragment.appendChild(element),delete elementsToRemove[k]}elementsToRemove[0]=newNode,elementsToRemove.length=1}function cloneAndAnnotateFn(fn,annotation){return extend(function(){return fn.apply(null,arguments)},fn,annotation)}function invokeLinkFn(linkFn,scope,$element,attrs,controllers,transcludeFn){try{linkFn(scope,$element,attrs,controllers,transcludeFn)}catch(e){$exceptionHandler(e,startingTag($element))}}function initializeDirectiveBindings(scope,attrs,destination,bindings,directive,newScope){var onNewScopeDestroyed;forEach(bindings,function(definition,scopeName){var lastValue,parentGet,parentSet,compare,attrName=definition.attrName,optional=definition.optional,mode=definition.mode;switch(hasOwnProperty.call(attrs,attrName)||(attrs[attrName]=undefined),mode){case"@":attrs[attrName]||optional||(destination[scopeName]=undefined),attrs.$observe(attrName,function(value){destination[scopeName]=value}),attrs.$$observers[attrName].$$scope=scope,attrs[attrName]&&(destination[scopeName]=$interpolate(attrs[attrName])(scope));break;case"=":if(optional&&!attrs[attrName])return;parentGet=$parse(attrs[attrName]),compare=parentGet.literal?equals:function(a,b){return a===b||a!==a&&b!==b},parentSet=parentGet.assign||function(){throw lastValue=destination[scopeName]=parentGet(scope),$compileMinErr("nonassign","Expression '{0}' used with directive '{1}' is non-assignable!",attrs[attrName],directive.name)},lastValue=destination[scopeName]=parentGet(scope);var parentValueWatch=function(parentValue){return compare(parentValue,destination[scopeName])||(compare(parentValue,lastValue)?parentSet(scope,parentValue=destination[scopeName]):destination[scopeName]=parentValue),lastValue=parentValue};parentValueWatch.$stateful=!0;var unwatch;unwatch=definition.collection?scope.$watchCollection(attrs[attrName],parentValueWatch):scope.$watch($parse(attrs[attrName],parentValueWatch),null,parentGet.literal),onNewScopeDestroyed=onNewScopeDestroyed||[],onNewScopeDestroyed.push(unwatch);break;case"&":if(parentGet=$parse(attrs[attrName]),parentGet===noop&&optional)break;destination[scopeName]=function(locals){return parentGet(scope,locals)}}});var destroyBindings=onNewScopeDestroyed?function(){for(var i=0,ii=onNewScopeDestroyed.length;ii>i;++i)onNewScopeDestroyed[i]()}:noop;return newScope&&destroyBindings!==noop?(newScope.$on("$destroy",destroyBindings),noop):destroyBindings}var Attributes=function(element,attributesToCopy){if(attributesToCopy){var i,l,key,keys=Object.keys(attributesToCopy);for(i=0,l=keys.length;l>i;i++)key=keys[i],this[key]=attributesToCopy[key]}else this.$attr={};this.$$element=element};Attributes.prototype={$normalize:directiveNormalize,$addClass:function(classVal){classVal&&classVal.length>0&&$animate.addClass(this.$$element,classVal)},$removeClass:function(classVal){classVal&&classVal.length>0&&$animate.removeClass(this.$$element,classVal)},$updateClass:function(newClasses,oldClasses){var toAdd=tokenDifference(newClasses,oldClasses);toAdd&&toAdd.length&&$animate.addClass(this.$$element,toAdd);var toRemove=tokenDifference(oldClasses,newClasses);toRemove&&toRemove.length&&$animate.removeClass(this.$$element,toRemove)},$set:function(key,value,writeAttr,attrName){var nodeName,node=this.$$element[0],booleanKey=getBooleanAttrName(node,key),aliasedKey=getAliasedAttrName(node,key),observer=key;if(booleanKey?(this.$$element.prop(key,value),attrName=booleanKey):aliasedKey&&(this[aliasedKey]=value,observer=aliasedKey),this[key]=value,attrName?this.$attr[key]=attrName:(attrName=this.$attr[key],attrName||(this.$attr[key]=attrName=snake_case(key,"-"))),nodeName=nodeName_(this.$$element),"a"===nodeName&&"href"===key||"img"===nodeName&&"src"===key)this[key]=value=$$sanitizeUri(value,"src"===key);else if("img"===nodeName&&"srcset"===key){for(var result="",trimmedSrcset=trim(value),srcPattern=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,pattern=/\s/.test(trimmedSrcset)?srcPattern:/(,)/,rawUris=trimmedSrcset.split(pattern),nbrUrisWith2parts=Math.floor(rawUris.length/2),i=0;nbrUrisWith2parts>i;i++){var innerIdx=2*i;result+=$$sanitizeUri(trim(rawUris[innerIdx]),!0),result+=" "+trim(rawUris[innerIdx+1])}var lastTuple=trim(rawUris[2*i]).split(/\s/);result+=$$sanitizeUri(trim(lastTuple[0]),!0),2===lastTuple.length&&(result+=" "+trim(lastTuple[1])),this[key]=value=result}writeAttr!==!1&&(null===value||value===undefined?this.$$element.removeAttr(attrName):this.$$element.attr(attrName,value));var $$observers=this.$$observers;$$observers&&forEach($$observers[observer],function(fn){try{fn(value)}catch(e){$exceptionHandler(e)}})},$observe:function(key,fn){var attrs=this,$$observers=attrs.$$observers||(attrs.$$observers=createMap()),listeners=$$observers[key]||($$observers[key]=[]);return listeners.push(fn),$rootScope.$evalAsync(function(){!listeners.$$inter&&attrs.hasOwnProperty(key)&&fn(attrs[key])}),function(){arrayRemove(listeners,fn)}}};var startSymbol=$interpolate.startSymbol(),endSymbol=$interpolate.endSymbol(),denormalizeTemplate="{{"==startSymbol||"}}"==endSymbol?identity:function(template){return template.replace(/\{\{/g,startSymbol).replace(/}}/g,endSymbol)},NG_ATTR_BINDING=/^ngAttr[A-Z]/;return compile.$$addBindingInfo=debugInfoEnabled?function($element,binding){var bindings=$element.data("$binding")||[];isArray(binding)?bindings=bindings.concat(binding):bindings.push(binding),$element.data("$binding",bindings)}:noop,compile.$$addBindingClass=debugInfoEnabled?function($element){safeAddClass($element,"ng-binding")}:noop,compile.$$addScopeInfo=debugInfoEnabled?function($element,scope,isolated,noTemplate){var dataName=isolated?noTemplate?"$isolateScopeNoTemplate":"$isolateScope":"$scope";$element.data(dataName,scope)}:noop,compile.$$addScopeClass=debugInfoEnabled?function($element,isolated){safeAddClass($element,isolated?"ng-isolate-scope":"ng-scope")}:noop,compile}]}function directiveNormalize(name){return camelCase(name.replace(PREFIX_REGEXP,""))}function tokenDifference(str1,str2){var values="",tokens1=str1.split(/\s+/),tokens2=str2.split(/\s+/);outer:for(var i=0;i<tokens1.length;i++){for(var token=tokens1[i],j=0;j<tokens2.length;j++)if(token==tokens2[j])continue outer;values+=(values.length>0?" ":"")+token}return values}function removeComments(jqNodes){jqNodes=jqLite(jqNodes);var i=jqNodes.length;if(1>=i)return jqNodes;for(;i--;){var node=jqNodes[i];node.nodeType===NODE_TYPE_COMMENT&&splice.call(jqNodes,i,1)}return jqNodes}function identifierForController(controller,ident){if(ident&&isString(ident))return ident;if(isString(controller)){var match=CNTRL_REG.exec(controller);if(match)return match[3]}}function $ControllerProvider(){var controllers={},globals=!1;this.register=function(name,constructor){assertNotHasOwnProperty(name,"controller"),isObject(name)?extend(controllers,name):controllers[name]=constructor},this.allowGlobals=function(){globals=!0},this.$get=["$injector","$window",function($injector,$window){function addIdentifier(locals,identifier,instance,name){if(!locals||!isObject(locals.$scope))throw minErr("$controller")("noscp","Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",name,identifier);locals.$scope[identifier]=instance}return function(expression,locals,later,ident){var instance,match,constructor,identifier;if(later=later===!0,ident&&isString(ident)&&(identifier=ident),isString(expression)){if(match=expression.match(CNTRL_REG),!match)throw $controllerMinErr("ctrlfmt","Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.",expression);constructor=match[1],identifier=identifier||match[3],expression=controllers.hasOwnProperty(constructor)?controllers[constructor]:getter(locals.$scope,constructor,!0)||(globals?getter($window,constructor,!0):undefined),assertArgFn(expression,constructor,!0)}if(later){var controllerPrototype=(isArray(expression)?expression[expression.length-1]:expression).prototype;instance=Object.create(controllerPrototype||null),identifier&&addIdentifier(locals,identifier,instance,constructor||expression.name);var instantiate;return instantiate=extend(function(){var result=$injector.invoke(expression,instance,locals,constructor);return result!==instance&&(isObject(result)||isFunction(result))&&(instance=result,identifier&&addIdentifier(locals,identifier,instance,constructor||expression.name)),instance},{instance:instance,identifier:identifier})}return instance=$injector.instantiate(expression,locals,constructor),identifier&&addIdentifier(locals,identifier,instance,constructor||expression.name),instance}}]}function $DocumentProvider(){this.$get=["$window",function(window){return jqLite(window.document)}]}function $ExceptionHandlerProvider(){this.$get=["$log",function($log){return function(){$log.error.apply($log,arguments)}}]}function serializeValue(v){return isObject(v)?isDate(v)?v.toISOString():toJson(v):v}function $HttpParamSerializerProvider(){this.$get=function(){return function(params){if(!params)return"";var parts=[];return forEachSorted(params,function(value,key){null===value||isUndefined(value)||(isArray(value)?forEach(value,function(v){parts.push(encodeUriQuery(key)+"="+encodeUriQuery(serializeValue(v)))}):parts.push(encodeUriQuery(key)+"="+encodeUriQuery(serializeValue(value))))}),parts.join("&")}}}function $HttpParamSerializerJQLikeProvider(){this.$get=function(){return function(params){function serialize(toSerialize,prefix,topLevel){null===toSerialize||isUndefined(toSerialize)||(isArray(toSerialize)?forEach(toSerialize,function(value){serialize(value,prefix+"[]")}):isObject(toSerialize)&&!isDate(toSerialize)?forEachSorted(toSerialize,function(value,key){serialize(value,prefix+(topLevel?"":"[")+key+(topLevel?"":"]"))}):parts.push(encodeUriQuery(prefix)+"="+encodeUriQuery(serializeValue(toSerialize))))}if(!params)return"";var parts=[];return serialize(params,"",!0),parts.join("&")}}}function defaultHttpResponseTransform(data,headers){if(isString(data)){var tempData=data.replace(JSON_PROTECTION_PREFIX,"").trim();if(tempData){var contentType=headers("Content-Type");(contentType&&0===contentType.indexOf(APPLICATION_JSON)||isJsonLike(tempData))&&(data=fromJson(tempData))}}return data}function isJsonLike(str){var jsonStart=str.match(JSON_START);return jsonStart&&JSON_ENDS[jsonStart[0]].test(str)}function parseHeaders(headers){function fillInParsed(key,val){key&&(parsed[key]=parsed[key]?parsed[key]+", "+val:val)}var i,parsed=createMap();return isString(headers)?forEach(headers.split("\n"),function(line){i=line.indexOf(":"),fillInParsed(lowercase(trim(line.substr(0,i))),trim(line.substr(i+1)))}):isObject(headers)&&forEach(headers,function(headerVal,headerKey){fillInParsed(lowercase(headerKey),trim(headerVal))}),parsed}function headersGetter(headers){var headersObj;return function(name){if(headersObj||(headersObj=parseHeaders(headers)),name){var value=headersObj[lowercase(name)];return void 0===value&&(value=null),value}return headersObj}}function transformData(data,headers,status,fns){return isFunction(fns)?fns(data,headers,status):(forEach(fns,function(fn){data=fn(data,headers,status)}),data)}function isSuccess(status){return status>=200&&300>status}function $HttpProvider(){var defaults=this.defaults={transformResponse:[defaultHttpResponseTransform],transformRequest:[function(d){return!isObject(d)||isFile(d)||isBlob(d)||isFormData(d)?d:toJson(d)}],headers:{common:{Accept:"application/json, text/plain, */*"},post:shallowCopy(CONTENT_TYPE_APPLICATION_JSON),put:shallowCopy(CONTENT_TYPE_APPLICATION_JSON),patch:shallowCopy(CONTENT_TYPE_APPLICATION_JSON)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},useApplyAsync=!1;this.useApplyAsync=function(value){return isDefined(value)?(useApplyAsync=!!value,this):useApplyAsync};var interceptorFactories=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function($httpBackend,$$cookieReader,$cacheFactory,$rootScope,$q,$injector){function $http(requestConfig){function transformResponse(response){var resp=extend({},response);return resp.data=response.data?transformData(response.data,response.headers,response.status,config.transformResponse):response.data,isSuccess(response.status)?resp:$q.reject(resp)}function executeHeaderFns(headers,config){var headerContent,processedHeaders={};return forEach(headers,function(headerFn,header){isFunction(headerFn)?(headerContent=headerFn(config),null!=headerContent&&(processedHeaders[header]=headerContent)):processedHeaders[header]=headerFn}),processedHeaders}function mergeHeaders(config){var defHeaderName,lowercaseDefHeaderName,reqHeaderName,defHeaders=defaults.headers,reqHeaders=extend({},config.headers);defHeaders=extend({},defHeaders.common,defHeaders[lowercase(config.method)]);defaultHeadersIteration:for(defHeaderName in defHeaders){lowercaseDefHeaderName=lowercase(defHeaderName);for(reqHeaderName in reqHeaders)if(lowercase(reqHeaderName)===lowercaseDefHeaderName)continue defaultHeadersIteration;reqHeaders[defHeaderName]=defHeaders[defHeaderName]}return executeHeaderFns(reqHeaders,shallowCopy(config))}if(!angular.isObject(requestConfig))throw minErr("$http")("badreq","Http request configuration must be an object.  Received: {0}",requestConfig);var config=extend({method:"get",transformRequest:defaults.transformRequest,transformResponse:defaults.transformResponse,paramSerializer:defaults.paramSerializer},requestConfig);config.headers=mergeHeaders(requestConfig),config.method=uppercase(config.method),config.paramSerializer=isString(config.paramSerializer)?$injector.get(config.paramSerializer):config.paramSerializer;var serverRequest=function(config){var headers=config.headers,reqData=transformData(config.data,headersGetter(headers),undefined,config.transformRequest);return isUndefined(reqData)&&forEach(headers,function(value,header){"content-type"===lowercase(header)&&delete headers[header]}),isUndefined(config.withCredentials)&&!isUndefined(defaults.withCredentials)&&(config.withCredentials=defaults.withCredentials),sendReq(config,reqData).then(transformResponse,transformResponse)},chain=[serverRequest,undefined],promise=$q.when(config);for(forEach(reversedInterceptors,function(interceptor){(interceptor.request||interceptor.requestError)&&chain.unshift(interceptor.request,interceptor.requestError),(interceptor.response||interceptor.responseError)&&chain.push(interceptor.response,interceptor.responseError)});chain.length;){var thenFn=chain.shift(),rejectFn=chain.shift();promise=promise.then(thenFn,rejectFn)}return promise.success=function(fn){return assertArgFn(fn,"fn"),promise.then(function(response){fn(response.data,response.status,response.headers,config)}),promise},promise.error=function(fn){return assertArgFn(fn,"fn"),promise.then(null,function(response){fn(response.data,response.status,response.headers,config)}),promise},promise}function createShortMethods(){forEach(arguments,function(name){$http[name]=function(url,config){return $http(extend({},config||{},{method:name,url:url}))}})}function createShortMethodsWithData(){forEach(arguments,function(name){$http[name]=function(url,data,config){return $http(extend({},config||{},{method:name,url:url,data:data}))}})}function sendReq(config,reqData){function done(status,response,headersString,statusText){function resolveHttpPromise(){resolvePromise(response,status,headersString,statusText)}cache&&(isSuccess(status)?cache.put(url,[status,response,parseHeaders(headersString),statusText]):cache.remove(url)),useApplyAsync?$rootScope.$applyAsync(resolveHttpPromise):(resolveHttpPromise(),$rootScope.$$phase||$rootScope.$apply())}function resolvePromise(response,status,headers,statusText){status=Math.max(status,0),(isSuccess(status)?deferred.resolve:deferred.reject)({data:response,status:status,headers:headersGetter(headers),config:config,statusText:statusText})}function resolvePromiseWithResult(result){resolvePromise(result.data,result.status,shallowCopy(result.headers()),result.statusText)}function removePendingReq(){var idx=$http.pendingRequests.indexOf(config);-1!==idx&&$http.pendingRequests.splice(idx,1)}var cache,cachedResp,deferred=$q.defer(),promise=deferred.promise,reqHeaders=config.headers,url=buildUrl(config.url,config.paramSerializer(config.params));if($http.pendingRequests.push(config),promise.then(removePendingReq,removePendingReq),!config.cache&&!defaults.cache||config.cache===!1||"GET"!==config.method&&"JSONP"!==config.method||(cache=isObject(config.cache)?config.cache:isObject(defaults.cache)?defaults.cache:defaultCache),cache&&(cachedResp=cache.get(url),isDefined(cachedResp)?isPromiseLike(cachedResp)?cachedResp.then(resolvePromiseWithResult,resolvePromiseWithResult):isArray(cachedResp)?resolvePromise(cachedResp[1],cachedResp[0],shallowCopy(cachedResp[2]),cachedResp[3]):resolvePromise(cachedResp,200,{},"OK"):cache.put(url,promise)),isUndefined(cachedResp)){var xsrfValue=urlIsSameOrigin(config.url)?$$cookieReader()[config.xsrfCookieName||defaults.xsrfCookieName]:undefined;xsrfValue&&(reqHeaders[config.xsrfHeaderName||defaults.xsrfHeaderName]=xsrfValue),$httpBackend(config.method,url,reqData,done,reqHeaders,config.timeout,config.withCredentials,config.responseType)}return promise}function buildUrl(url,serializedParams){return serializedParams.length>0&&(url+=(-1==url.indexOf("?")?"?":"&")+serializedParams),url}var defaultCache=$cacheFactory("$http");defaults.paramSerializer=isString(defaults.paramSerializer)?$injector.get(defaults.paramSerializer):defaults.paramSerializer;var reversedInterceptors=[];return forEach(interceptorFactories,function(interceptorFactory){reversedInterceptors.unshift(isString(interceptorFactory)?$injector.get(interceptorFactory):$injector.invoke(interceptorFactory))}),$http.pendingRequests=[],createShortMethods("get","delete","head","jsonp"),createShortMethodsWithData("post","put","patch"),$http.defaults=defaults,$http}]}function createXhr(){return new window.XMLHttpRequest}function $HttpBackendProvider(){this.$get=["$browser","$window","$document",function($browser,$window,$document){return createHttpBackend($browser,createXhr,$browser.defer,$window.angular.callbacks,$document[0])}]}function createHttpBackend($browser,createXhr,$browserDefer,callbacks,rawDocument){function jsonpReq(url,callbackId,done){var script=rawDocument.createElement("script"),callback=null;return script.type="text/javascript",script.src=url,script.async=!0,callback=function(event){removeEventListenerFn(script,"load",callback),removeEventListenerFn(script,"error",callback),rawDocument.body.removeChild(script),script=null;var status=-1,text="unknown";event&&("load"!==event.type||callbacks[callbackId].called||(event={type:"error"}),text=event.type,status="error"===event.type?404:200),done&&done(status,text)},addEventListenerFn(script,"load",callback),addEventListenerFn(script,"error",callback),rawDocument.body.appendChild(script),callback}return function(method,url,post,callback,headers,timeout,withCredentials,responseType){function timeoutRequest(){jsonpDone&&jsonpDone(),xhr&&xhr.abort()}function completeRequest(callback,status,response,headersString,statusText){timeoutId!==undefined&&$browserDefer.cancel(timeoutId),jsonpDone=xhr=null,callback(status,response,headersString,statusText),$browser.$$completeOutstandingRequest(noop)
}if($browser.$$incOutstandingRequestCount(),url=url||$browser.url(),"jsonp"==lowercase(method)){var callbackId="_"+(callbacks.counter++).toString(36);callbacks[callbackId]=function(data){callbacks[callbackId].data=data,callbacks[callbackId].called=!0};var jsonpDone=jsonpReq(url.replace("JSON_CALLBACK","angular.callbacks."+callbackId),callbackId,function(status,text){completeRequest(callback,status,callbacks[callbackId].data,"",text),callbacks[callbackId]=noop})}else{var xhr=createXhr();xhr.open(method,url,!0),forEach(headers,function(value,key){isDefined(value)&&xhr.setRequestHeader(key,value)}),xhr.onload=function(){var statusText=xhr.statusText||"",response="response"in xhr?xhr.response:xhr.responseText,status=1223===xhr.status?204:xhr.status;0===status&&(status=response?200:"file"==urlResolve(url).protocol?404:0),completeRequest(callback,status,response,xhr.getAllResponseHeaders(),statusText)};var requestError=function(){completeRequest(callback,-1,null,null,"")};if(xhr.onerror=requestError,xhr.onabort=requestError,withCredentials&&(xhr.withCredentials=!0),responseType)try{xhr.responseType=responseType}catch(e){if("json"!==responseType)throw e}xhr.send(post)}if(timeout>0)var timeoutId=$browserDefer(timeoutRequest,timeout);else isPromiseLike(timeout)&&timeout.then(timeoutRequest)}}function $InterpolateProvider(){var startSymbol="{{",endSymbol="}}";this.startSymbol=function(value){return value?(startSymbol=value,this):startSymbol},this.endSymbol=function(value){return value?(endSymbol=value,this):endSymbol},this.$get=["$parse","$exceptionHandler","$sce",function($parse,$exceptionHandler,$sce){function escape(ch){return"\\\\\\"+ch}function unescapeText(text){return text.replace(escapedStartRegexp,startSymbol).replace(escapedEndRegexp,endSymbol)}function stringify(value){if(null==value)return"";switch(typeof value){case"string":break;case"number":value=""+value;break;default:value=toJson(value)}return value}function $interpolate(text,mustHaveExpression,trustedContext,allOrNothing){function parseStringifyInterceptor(value){try{return value=getValue(value),allOrNothing&&!isDefined(value)?value:stringify(value)}catch(err){$exceptionHandler($interpolateMinErr.interr(text,err))}}allOrNothing=!!allOrNothing;for(var startIndex,endIndex,exp,index=0,expressions=[],parseFns=[],textLength=text.length,concat=[],expressionPositions=[];textLength>index;){if(-1==(startIndex=text.indexOf(startSymbol,index))||-1==(endIndex=text.indexOf(endSymbol,startIndex+startSymbolLength))){index!==textLength&&concat.push(unescapeText(text.substring(index)));break}index!==startIndex&&concat.push(unescapeText(text.substring(index,startIndex))),exp=text.substring(startIndex+startSymbolLength,endIndex),expressions.push(exp),parseFns.push($parse(exp,parseStringifyInterceptor)),index=endIndex+endSymbolLength,expressionPositions.push(concat.length),concat.push("")}if(trustedContext&&concat.length>1&&$interpolateMinErr.throwNoconcat(text),!mustHaveExpression||expressions.length){var compute=function(values){for(var i=0,ii=expressions.length;ii>i;i++){if(allOrNothing&&isUndefined(values[i]))return;concat[expressionPositions[i]]=values[i]}return concat.join("")},getValue=function(value){return trustedContext?$sce.getTrusted(trustedContext,value):$sce.valueOf(value)};return extend(function(context){var i=0,ii=expressions.length,values=new Array(ii);try{for(;ii>i;i++)values[i]=parseFns[i](context);return compute(values)}catch(err){$exceptionHandler($interpolateMinErr.interr(text,err))}},{exp:text,expressions:expressions,$$watchDelegate:function(scope,listener){var lastValue;return scope.$watchGroup(parseFns,function(values,oldValues){var currValue=compute(values);isFunction(listener)&&listener.call(this,currValue,values!==oldValues?lastValue:currValue,scope),lastValue=currValue})}})}}var startSymbolLength=startSymbol.length,endSymbolLength=endSymbol.length,escapedStartRegexp=new RegExp(startSymbol.replace(/./g,escape),"g"),escapedEndRegexp=new RegExp(endSymbol.replace(/./g,escape),"g");return $interpolate.startSymbol=function(){return startSymbol},$interpolate.endSymbol=function(){return endSymbol},$interpolate}]}function $IntervalProvider(){this.$get=["$rootScope","$window","$q","$$q",function($rootScope,$window,$q,$$q){function interval(fn,delay,count,invokeApply){var hasParams=arguments.length>4,args=hasParams?sliceArgs(arguments,4):[],setInterval=$window.setInterval,clearInterval=$window.clearInterval,iteration=0,skipApply=isDefined(invokeApply)&&!invokeApply,deferred=(skipApply?$$q:$q).defer(),promise=deferred.promise;return count=isDefined(count)?count:0,promise.then(null,null,hasParams?function(){fn.apply(null,args)}:fn),promise.$$intervalId=setInterval(function(){deferred.notify(iteration++),count>0&&iteration>=count&&(deferred.resolve(iteration),clearInterval(promise.$$intervalId),delete intervals[promise.$$intervalId]),skipApply||$rootScope.$apply()},delay),intervals[promise.$$intervalId]=deferred,promise}var intervals={};return interval.cancel=function(promise){return promise&&promise.$$intervalId in intervals?(intervals[promise.$$intervalId].reject("canceled"),$window.clearInterval(promise.$$intervalId),delete intervals[promise.$$intervalId],!0):!1},interval}]}function $LocaleProvider(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"¤",posSuf:"",negPre:"(¤",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),SHORTMONTH:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),DAY:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),SHORTDAY:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a",ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"]},pluralCat:function(num){return 1===num?"one":"other"}}}}function encodePath(path){for(var segments=path.split("/"),i=segments.length;i--;)segments[i]=encodeUriSegment(segments[i]);return segments.join("/")}function parseAbsoluteUrl(absoluteUrl,locationObj){var parsedUrl=urlResolve(absoluteUrl);locationObj.$$protocol=parsedUrl.protocol,locationObj.$$host=parsedUrl.hostname,locationObj.$$port=toInt(parsedUrl.port)||DEFAULT_PORTS[parsedUrl.protocol]||null}function parseAppUrl(relativeUrl,locationObj){var prefixed="/"!==relativeUrl.charAt(0);prefixed&&(relativeUrl="/"+relativeUrl);var match=urlResolve(relativeUrl);locationObj.$$path=decodeURIComponent(prefixed&&"/"===match.pathname.charAt(0)?match.pathname.substring(1):match.pathname),locationObj.$$search=parseKeyValue(match.search),locationObj.$$hash=decodeURIComponent(match.hash),locationObj.$$path&&"/"!=locationObj.$$path.charAt(0)&&(locationObj.$$path="/"+locationObj.$$path)}function beginsWith(begin,whole){return 0===whole.indexOf(begin)?whole.substr(begin.length):void 0}function stripHash(url){var index=url.indexOf("#");return-1==index?url:url.substr(0,index)}function trimEmptyHash(url){return url.replace(/(#.+)|#$/,"$1")}function stripFile(url){return url.substr(0,stripHash(url).lastIndexOf("/")+1)}function serverBase(url){return url.substring(0,url.indexOf("/",url.indexOf("//")+2))}function LocationHtml5Url(appBase,basePrefix){this.$$html5=!0,basePrefix=basePrefix||"";var appBaseNoFile=stripFile(appBase);parseAbsoluteUrl(appBase,this),this.$$parse=function(url){var pathUrl=beginsWith(appBaseNoFile,url);if(!isString(pathUrl))throw $locationMinErr("ipthprfx",'Invalid url "{0}", missing path prefix "{1}".',url,appBaseNoFile);parseAppUrl(pathUrl,this),this.$$path||(this.$$path="/"),this.$$compose()},this.$$compose=function(){var search=toKeyValue(this.$$search),hash=this.$$hash?"#"+encodeUriSegment(this.$$hash):"";this.$$url=encodePath(this.$$path)+(search?"?"+search:"")+hash,this.$$absUrl=appBaseNoFile+this.$$url.substr(1)},this.$$parseLinkUrl=function(url,relHref){if(relHref&&"#"===relHref[0])return this.hash(relHref.slice(1)),!0;var appUrl,prevAppUrl,rewrittenUrl;return(appUrl=beginsWith(appBase,url))!==undefined?(prevAppUrl=appUrl,rewrittenUrl=(appUrl=beginsWith(basePrefix,appUrl))!==undefined?appBaseNoFile+(beginsWith("/",appUrl)||appUrl):appBase+prevAppUrl):(appUrl=beginsWith(appBaseNoFile,url))!==undefined?rewrittenUrl=appBaseNoFile+appUrl:appBaseNoFile==url+"/"&&(rewrittenUrl=appBaseNoFile),rewrittenUrl&&this.$$parse(rewrittenUrl),!!rewrittenUrl}}function LocationHashbangUrl(appBase,hashPrefix){var appBaseNoFile=stripFile(appBase);parseAbsoluteUrl(appBase,this),this.$$parse=function(url){function removeWindowsDriveName(path,url,base){var firstPathSegmentMatch,windowsFilePathExp=/^\/[A-Z]:(\/.*)/;return 0===url.indexOf(base)&&(url=url.replace(base,"")),windowsFilePathExp.exec(url)?path:(firstPathSegmentMatch=windowsFilePathExp.exec(path),firstPathSegmentMatch?firstPathSegmentMatch[1]:path)}var withoutHashUrl,withoutBaseUrl=beginsWith(appBase,url)||beginsWith(appBaseNoFile,url);isUndefined(withoutBaseUrl)||"#"!==withoutBaseUrl.charAt(0)?this.$$html5?withoutHashUrl=withoutBaseUrl:(withoutHashUrl="",isUndefined(withoutBaseUrl)&&(appBase=url,this.replace())):(withoutHashUrl=beginsWith(hashPrefix,withoutBaseUrl),isUndefined(withoutHashUrl)&&(withoutHashUrl=withoutBaseUrl)),parseAppUrl(withoutHashUrl,this),this.$$path=removeWindowsDriveName(this.$$path,withoutHashUrl,appBase),this.$$compose()},this.$$compose=function(){var search=toKeyValue(this.$$search),hash=this.$$hash?"#"+encodeUriSegment(this.$$hash):"";this.$$url=encodePath(this.$$path)+(search?"?"+search:"")+hash,this.$$absUrl=appBase+(this.$$url?hashPrefix+this.$$url:"")},this.$$parseLinkUrl=function(url){return stripHash(appBase)==stripHash(url)?(this.$$parse(url),!0):!1}}function LocationHashbangInHtml5Url(appBase,hashPrefix){this.$$html5=!0,LocationHashbangUrl.apply(this,arguments);var appBaseNoFile=stripFile(appBase);this.$$parseLinkUrl=function(url,relHref){if(relHref&&"#"===relHref[0])return this.hash(relHref.slice(1)),!0;var rewrittenUrl,appUrl;return appBase==stripHash(url)?rewrittenUrl=url:(appUrl=beginsWith(appBaseNoFile,url))?rewrittenUrl=appBase+hashPrefix+appUrl:appBaseNoFile===url+"/"&&(rewrittenUrl=appBaseNoFile),rewrittenUrl&&this.$$parse(rewrittenUrl),!!rewrittenUrl},this.$$compose=function(){var search=toKeyValue(this.$$search),hash=this.$$hash?"#"+encodeUriSegment(this.$$hash):"";this.$$url=encodePath(this.$$path)+(search?"?"+search:"")+hash,this.$$absUrl=appBase+hashPrefix+this.$$url}}function locationGetter(property){return function(){return this[property]}}function locationGetterSetter(property,preprocess){return function(value){return isUndefined(value)?this[property]:(this[property]=preprocess(value),this.$$compose(),this)}}function $LocationProvider(){var hashPrefix="",html5Mode={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(prefix){return isDefined(prefix)?(hashPrefix=prefix,this):hashPrefix},this.html5Mode=function(mode){return isBoolean(mode)?(html5Mode.enabled=mode,this):isObject(mode)?(isBoolean(mode.enabled)&&(html5Mode.enabled=mode.enabled),isBoolean(mode.requireBase)&&(html5Mode.requireBase=mode.requireBase),isBoolean(mode.rewriteLinks)&&(html5Mode.rewriteLinks=mode.rewriteLinks),this):html5Mode},this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function($rootScope,$browser,$sniffer,$rootElement,$window){function setBrowserUrlWithFallback(url,replace,state){var oldUrl=$location.url(),oldState=$location.$$state;try{$browser.url(url,replace,state),$location.$$state=$browser.state()}catch(e){throw $location.url(oldUrl),$location.$$state=oldState,e}}function afterLocationChange(oldUrl,oldState){$rootScope.$broadcast("$locationChangeSuccess",$location.absUrl(),oldUrl,$location.$$state,oldState)}var $location,LocationMode,appBase,baseHref=$browser.baseHref(),initialUrl=$browser.url();if(html5Mode.enabled){if(!baseHref&&html5Mode.requireBase)throw $locationMinErr("nobase","$location in HTML5 mode requires a <base> tag to be present!");appBase=serverBase(initialUrl)+(baseHref||"/"),LocationMode=$sniffer.history?LocationHtml5Url:LocationHashbangInHtml5Url}else appBase=stripHash(initialUrl),LocationMode=LocationHashbangUrl;$location=new LocationMode(appBase,"#"+hashPrefix),$location.$$parseLinkUrl(initialUrl,initialUrl),$location.$$state=$browser.state();var IGNORE_URI_REGEXP=/^\s*(javascript|mailto):/i;$rootElement.on("click",function(event){if(html5Mode.rewriteLinks&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&2!=event.which&&2!=event.button){for(var elm=jqLite(event.target);"a"!==nodeName_(elm[0]);)if(elm[0]===$rootElement[0]||!(elm=elm.parent())[0])return;var absHref=elm.prop("href"),relHref=elm.attr("href")||elm.attr("xlink:href");isObject(absHref)&&"[object SVGAnimatedString]"===absHref.toString()&&(absHref=urlResolve(absHref.animVal).href),IGNORE_URI_REGEXP.test(absHref)||!absHref||elm.attr("target")||event.isDefaultPrevented()||$location.$$parseLinkUrl(absHref,relHref)&&(event.preventDefault(),$location.absUrl()!=$browser.url()&&($rootScope.$apply(),$window.angular["ff-684208-preventDefault"]=!0))}}),trimEmptyHash($location.absUrl())!=trimEmptyHash(initialUrl)&&$browser.url($location.absUrl(),!0);var initializing=!0;return $browser.onUrlChange(function(newUrl,newState){$rootScope.$evalAsync(function(){var defaultPrevented,oldUrl=$location.absUrl(),oldState=$location.$$state;$location.$$parse(newUrl),$location.$$state=newState,defaultPrevented=$rootScope.$broadcast("$locationChangeStart",newUrl,oldUrl,newState,oldState).defaultPrevented,$location.absUrl()===newUrl&&(defaultPrevented?($location.$$parse(oldUrl),$location.$$state=oldState,setBrowserUrlWithFallback(oldUrl,!1,oldState)):(initializing=!1,afterLocationChange(oldUrl,oldState)))}),$rootScope.$$phase||$rootScope.$digest()}),$rootScope.$watch(function(){var oldUrl=trimEmptyHash($browser.url()),newUrl=trimEmptyHash($location.absUrl()),oldState=$browser.state(),currentReplace=$location.$$replace,urlOrStateChanged=oldUrl!==newUrl||$location.$$html5&&$sniffer.history&&oldState!==$location.$$state;(initializing||urlOrStateChanged)&&(initializing=!1,$rootScope.$evalAsync(function(){var newUrl=$location.absUrl(),defaultPrevented=$rootScope.$broadcast("$locationChangeStart",newUrl,oldUrl,$location.$$state,oldState).defaultPrevented;$location.absUrl()===newUrl&&(defaultPrevented?($location.$$parse(oldUrl),$location.$$state=oldState):(urlOrStateChanged&&setBrowserUrlWithFallback(newUrl,currentReplace,oldState===$location.$$state?null:$location.$$state),afterLocationChange(oldUrl,oldState)))})),$location.$$replace=!1}),$location}]}function $LogProvider(){var debug=!0,self=this;this.debugEnabled=function(flag){return isDefined(flag)?(debug=flag,this):debug},this.$get=["$window",function($window){function formatError(arg){return arg instanceof Error&&(arg.stack?arg=arg.message&&-1===arg.stack.indexOf(arg.message)?"Error: "+arg.message+"\n"+arg.stack:arg.stack:arg.sourceURL&&(arg=arg.message+"\n"+arg.sourceURL+":"+arg.line)),arg}function consoleLog(type){var console=$window.console||{},logFn=console[type]||console.log||noop,hasApply=!1;try{hasApply=!!logFn.apply}catch(e){}return hasApply?function(){var args=[];return forEach(arguments,function(arg){args.push(formatError(arg))}),logFn.apply(console,args)}:function(arg1,arg2){logFn(arg1,null==arg2?"":arg2)}}return{log:consoleLog("log"),info:consoleLog("info"),warn:consoleLog("warn"),error:consoleLog("error"),debug:function(){var fn=consoleLog("debug");return function(){debug&&fn.apply(self,arguments)}}()}}]}function ensureSafeMemberName(name,fullExpression){if("__defineGetter__"===name||"__defineSetter__"===name||"__lookupGetter__"===name||"__lookupSetter__"===name||"__proto__"===name)throw $parseMinErr("isecfld","Attempting to access a disallowed field in Angular expressions! Expression: {0}",fullExpression);return name}function ensureSafeObject(obj,fullExpression){if(obj){if(obj.constructor===obj)throw $parseMinErr("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",fullExpression);if(obj.window===obj)throw $parseMinErr("isecwindow","Referencing the Window in Angular expressions is disallowed! Expression: {0}",fullExpression);if(obj.children&&(obj.nodeName||obj.prop&&obj.attr&&obj.find))throw $parseMinErr("isecdom","Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}",fullExpression);if(obj===Object)throw $parseMinErr("isecobj","Referencing Object in Angular expressions is disallowed! Expression: {0}",fullExpression)}return obj}function ensureSafeFunction(obj,fullExpression){if(obj){if(obj.constructor===obj)throw $parseMinErr("isecfn","Referencing Function in Angular expressions is disallowed! Expression: {0}",fullExpression);if(obj===CALL||obj===APPLY||obj===BIND)throw $parseMinErr("isecff","Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}",fullExpression)}}function ifDefined(v,d){return"undefined"!=typeof v?v:d}function plusFn(l,r){return"undefined"==typeof l?r:"undefined"==typeof r?l:l+r}function isStateless($filter,filterName){var fn=$filter(filterName);return!fn.$stateful}function findConstantAndWatchExpressions(ast,$filter){var allConstants,argsToWatch;switch(ast.type){case AST.Program:allConstants=!0,forEach(ast.body,function(expr){findConstantAndWatchExpressions(expr.expression,$filter),allConstants=allConstants&&expr.expression.constant}),ast.constant=allConstants;break;case AST.Literal:ast.constant=!0,ast.toWatch=[];break;case AST.UnaryExpression:findConstantAndWatchExpressions(ast.argument,$filter),ast.constant=ast.argument.constant,ast.toWatch=ast.argument.toWatch;break;case AST.BinaryExpression:findConstantAndWatchExpressions(ast.left,$filter),findConstantAndWatchExpressions(ast.right,$filter),ast.constant=ast.left.constant&&ast.right.constant,ast.toWatch=ast.left.toWatch.concat(ast.right.toWatch);break;case AST.LogicalExpression:findConstantAndWatchExpressions(ast.left,$filter),findConstantAndWatchExpressions(ast.right,$filter),ast.constant=ast.left.constant&&ast.right.constant,ast.toWatch=ast.constant?[]:[ast];break;case AST.ConditionalExpression:findConstantAndWatchExpressions(ast.test,$filter),findConstantAndWatchExpressions(ast.alternate,$filter),findConstantAndWatchExpressions(ast.consequent,$filter),ast.constant=ast.test.constant&&ast.alternate.constant&&ast.consequent.constant,ast.toWatch=ast.constant?[]:[ast];break;case AST.Identifier:ast.constant=!1,ast.toWatch=[ast];break;case AST.MemberExpression:findConstantAndWatchExpressions(ast.object,$filter),ast.computed&&findConstantAndWatchExpressions(ast.property,$filter),ast.constant=ast.object.constant&&(!ast.computed||ast.property.constant),ast.toWatch=[ast];break;case AST.CallExpression:allConstants=ast.filter?isStateless($filter,ast.callee.name):!1,argsToWatch=[],forEach(ast.arguments,function(expr){findConstantAndWatchExpressions(expr,$filter),allConstants=allConstants&&expr.constant,expr.constant||argsToWatch.push.apply(argsToWatch,expr.toWatch)}),ast.constant=allConstants,ast.toWatch=ast.filter&&isStateless($filter,ast.callee.name)?argsToWatch:[ast];break;case AST.AssignmentExpression:findConstantAndWatchExpressions(ast.left,$filter),findConstantAndWatchExpressions(ast.right,$filter),ast.constant=ast.left.constant&&ast.right.constant,ast.toWatch=[ast];break;case AST.ArrayExpression:allConstants=!0,argsToWatch=[],forEach(ast.elements,function(expr){findConstantAndWatchExpressions(expr,$filter),allConstants=allConstants&&expr.constant,expr.constant||argsToWatch.push.apply(argsToWatch,expr.toWatch)}),ast.constant=allConstants,ast.toWatch=argsToWatch;break;case AST.ObjectExpression:allConstants=!0,argsToWatch=[],forEach(ast.properties,function(property){findConstantAndWatchExpressions(property.value,$filter),allConstants=allConstants&&property.value.constant,property.value.constant||argsToWatch.push.apply(argsToWatch,property.value.toWatch)}),ast.constant=allConstants,ast.toWatch=argsToWatch;break;case AST.ThisExpression:ast.constant=!1,ast.toWatch=[]}}function getInputs(body){if(1==body.length){var lastExpression=body[0].expression,candidate=lastExpression.toWatch;return 1!==candidate.length?candidate:candidate[0]!==lastExpression?candidate:undefined}}function isAssignable(ast){return ast.type===AST.Identifier||ast.type===AST.MemberExpression}function assignableAST(ast){return 1===ast.body.length&&isAssignable(ast.body[0].expression)?{type:AST.AssignmentExpression,left:ast.body[0].expression,right:{type:AST.NGValueParameter},operator:"="}:void 0}function isLiteral(ast){return 0===ast.body.length||1===ast.body.length&&(ast.body[0].expression.type===AST.Literal||ast.body[0].expression.type===AST.ArrayExpression||ast.body[0].expression.type===AST.ObjectExpression)}function isConstant(ast){return ast.constant}function ASTCompiler(astBuilder,$filter){this.astBuilder=astBuilder,this.$filter=$filter}function ASTInterpreter(astBuilder,$filter){this.astBuilder=astBuilder,this.$filter=$filter}function setter(obj,path,setValue,fullExp){ensureSafeObject(obj,fullExp);for(var key,element=path.split("."),i=0;element.length>1;i++){key=ensureSafeMemberName(element.shift(),fullExp);var propertyObj=ensureSafeObject(obj[key],fullExp);propertyObj||(propertyObj={},obj[key]=propertyObj),obj=propertyObj}return key=ensureSafeMemberName(element.shift(),fullExp),ensureSafeObject(obj[key],fullExp),obj[key]=setValue,setValue}function isPossiblyDangerousMemberName(name){return"constructor"==name}function getValueOf(value){return isFunction(value.valueOf)?value.valueOf():objectValueOf.call(value)}function $ParseProvider(){var cacheDefault=createMap(),cacheExpensive=createMap();this.$get=["$filter","$sniffer",function($filter,$sniffer){function expressionInputDirtyCheck(newValue,oldValueOfValue){return null==newValue||null==oldValueOfValue?newValue===oldValueOfValue:"object"==typeof newValue&&(newValue=getValueOf(newValue),"object"==typeof newValue)?!1:newValue===oldValueOfValue||newValue!==newValue&&oldValueOfValue!==oldValueOfValue}function inputsWatchDelegate(scope,listener,objectEquality,parsedExpression,prettyPrintExpression){var lastResult,inputExpressions=parsedExpression.inputs;if(1===inputExpressions.length){var oldInputValueOf=expressionInputDirtyCheck;return inputExpressions=inputExpressions[0],scope.$watch(function(scope){var newInputValue=inputExpressions(scope);return expressionInputDirtyCheck(newInputValue,oldInputValueOf)||(lastResult=parsedExpression(scope,undefined,undefined,[newInputValue]),oldInputValueOf=newInputValue&&getValueOf(newInputValue)),lastResult},listener,objectEquality,prettyPrintExpression)}for(var oldInputValueOfValues=[],oldInputValues=[],i=0,ii=inputExpressions.length;ii>i;i++)oldInputValueOfValues[i]=expressionInputDirtyCheck,oldInputValues[i]=null;return scope.$watch(function(scope){for(var changed=!1,i=0,ii=inputExpressions.length;ii>i;i++){var newInputValue=inputExpressions[i](scope);(changed||(changed=!expressionInputDirtyCheck(newInputValue,oldInputValueOfValues[i])))&&(oldInputValues[i]=newInputValue,oldInputValueOfValues[i]=newInputValue&&getValueOf(newInputValue))}return changed&&(lastResult=parsedExpression(scope,undefined,undefined,oldInputValues)),lastResult},listener,objectEquality,prettyPrintExpression)}function oneTimeWatchDelegate(scope,listener,objectEquality,parsedExpression){var unwatch,lastValue;return unwatch=scope.$watch(function(scope){return parsedExpression(scope)},function(value,old,scope){lastValue=value,isFunction(listener)&&listener.apply(this,arguments),isDefined(value)&&scope.$$postDigest(function(){isDefined(lastValue)&&unwatch()})},objectEquality)}function oneTimeLiteralWatchDelegate(scope,listener,objectEquality,parsedExpression){function isAllDefined(value){var allDefined=!0;return forEach(value,function(val){isDefined(val)||(allDefined=!1)}),allDefined}var unwatch,lastValue;return unwatch=scope.$watch(function(scope){return parsedExpression(scope)},function(value,old,scope){lastValue=value,isFunction(listener)&&listener.call(this,value,old,scope),isAllDefined(value)&&scope.$$postDigest(function(){isAllDefined(lastValue)&&unwatch()})},objectEquality)}function constantWatchDelegate(scope,listener,objectEquality,parsedExpression){var unwatch;return unwatch=scope.$watch(function(scope){return parsedExpression(scope)},function(){isFunction(listener)&&listener.apply(this,arguments),unwatch()},objectEquality)}function addInterceptor(parsedExpression,interceptorFn){if(!interceptorFn)return parsedExpression;var watchDelegate=parsedExpression.$$watchDelegate,regularWatch=watchDelegate!==oneTimeLiteralWatchDelegate&&watchDelegate!==oneTimeWatchDelegate,fn=regularWatch?function(scope,locals,assign,inputs){var value=parsedExpression(scope,locals,assign,inputs);return interceptorFn(value,scope,locals)}:function(scope,locals,assign,inputs){var value=parsedExpression(scope,locals,assign,inputs),result=interceptorFn(value,scope,locals);return isDefined(value)?result:value};return parsedExpression.$$watchDelegate&&parsedExpression.$$watchDelegate!==inputsWatchDelegate?fn.$$watchDelegate=parsedExpression.$$watchDelegate:interceptorFn.$stateful||(fn.$$watchDelegate=inputsWatchDelegate,fn.inputs=parsedExpression.inputs?parsedExpression.inputs:[parsedExpression]),fn}var $parseOptions={csp:$sniffer.csp,expensiveChecks:!1},$parseOptionsExpensive={csp:$sniffer.csp,expensiveChecks:!0};return function(exp,interceptorFn,expensiveChecks){var parsedExpression,oneTime,cacheKey;switch(typeof exp){case"string":exp=exp.trim(),cacheKey=exp;var cache=expensiveChecks?cacheExpensive:cacheDefault;if(parsedExpression=cache[cacheKey],!parsedExpression){":"===exp.charAt(0)&&":"===exp.charAt(1)&&(oneTime=!0,exp=exp.substring(2));var parseOptions=expensiveChecks?$parseOptionsExpensive:$parseOptions,lexer=new Lexer(parseOptions),parser=new Parser(lexer,$filter,parseOptions);parsedExpression=parser.parse(exp),parsedExpression.constant?parsedExpression.$$watchDelegate=constantWatchDelegate:oneTime?parsedExpression.$$watchDelegate=parsedExpression.literal?oneTimeLiteralWatchDelegate:oneTimeWatchDelegate:parsedExpression.inputs&&(parsedExpression.$$watchDelegate=inputsWatchDelegate),cache[cacheKey]=parsedExpression}return addInterceptor(parsedExpression,interceptorFn);case"function":return addInterceptor(exp,interceptorFn);default:return noop}}}]}function $QProvider(){this.$get=["$rootScope","$exceptionHandler",function($rootScope,$exceptionHandler){return qFactory(function(callback){$rootScope.$evalAsync(callback)},$exceptionHandler)}]}function $$QProvider(){this.$get=["$browser","$exceptionHandler",function($browser,$exceptionHandler){return qFactory(function(callback){$browser.defer(callback)},$exceptionHandler)}]}function qFactory(nextTick,exceptionHandler){function callOnce(self,resolveFn,rejectFn){function wrap(fn){return function(value){called||(called=!0,fn.call(self,value))}}var called=!1;return[wrap(resolveFn),wrap(rejectFn)]}function Promise(){this.$$state={status:0}}function simpleBind(context,fn){return function(value){fn.call(context,value)}}function processQueue(state){var fn,deferred,pending;pending=state.pending,state.processScheduled=!1,state.pending=undefined;for(var i=0,ii=pending.length;ii>i;++i){deferred=pending[i][0],fn=pending[i][state.status];try{isFunction(fn)?deferred.resolve(fn(state.value)):1===state.status?deferred.resolve(state.value):deferred.reject(state.value)}catch(e){deferred.reject(e),exceptionHandler(e)}}}function scheduleProcessQueue(state){!state.processScheduled&&state.pending&&(state.processScheduled=!0,nextTick(function(){processQueue(state)}))}function Deferred(){this.promise=new Promise,this.resolve=simpleBind(this,this.resolve),this.reject=simpleBind(this,this.reject),this.notify=simpleBind(this,this.notify)}function all(promises){var deferred=new Deferred,counter=0,results=isArray(promises)?[]:{};return forEach(promises,function(promise,key){counter++,when(promise).then(function(value){results.hasOwnProperty(key)||(results[key]=value,--counter||deferred.resolve(results))},function(reason){results.hasOwnProperty(key)||deferred.reject(reason)})}),0===counter&&deferred.resolve(results),deferred.promise}var $qMinErr=minErr("$q",TypeError),defer=function(){return new Deferred};Promise.prototype={then:function(onFulfilled,onRejected,progressBack){var result=new Deferred;return this.$$state.pending=this.$$state.pending||[],this.$$state.pending.push([result,onFulfilled,onRejected,progressBack]),this.$$state.status>0&&scheduleProcessQueue(this.$$state),result.promise},"catch":function(callback){return this.then(null,callback)},"finally":function(callback,progressBack){return this.then(function(value){return handleCallback(value,!0,callback)},function(error){return handleCallback(error,!1,callback)},progressBack)}},Deferred.prototype={resolve:function(val){this.promise.$$state.status||(val===this.promise?this.$$reject($qMinErr("qcycle","Expected promise to be resolved with value other than itself '{0}'",val)):this.$$resolve(val))},$$resolve:function(val){var then,fns;fns=callOnce(this,this.$$resolve,this.$$reject);try{(isObject(val)||isFunction(val))&&(then=val&&val.then),isFunction(then)?(this.promise.$$state.status=-1,then.call(val,fns[0],fns[1],this.notify)):(this.promise.$$state.value=val,this.promise.$$state.status=1,scheduleProcessQueue(this.promise.$$state))}catch(e){fns[1](e),exceptionHandler(e)}},reject:function(reason){this.promise.$$state.status||this.$$reject(reason)},$$reject:function(reason){this.promise.$$state.value=reason,this.promise.$$state.status=2,scheduleProcessQueue(this.promise.$$state)},notify:function(progress){var callbacks=this.promise.$$state.pending;this.promise.$$state.status<=0&&callbacks&&callbacks.length&&nextTick(function(){for(var callback,result,i=0,ii=callbacks.length;ii>i;i++){result=callbacks[i][0],callback=callbacks[i][3];try{result.notify(isFunction(callback)?callback(progress):progress)}catch(e){exceptionHandler(e)}}})}};var reject=function(reason){var result=new Deferred;return result.reject(reason),result.promise},makePromise=function(value,resolved){var result=new Deferred;return resolved?result.resolve(value):result.reject(value),result.promise},handleCallback=function(value,isResolved,callback){var callbackOutput=null;try{isFunction(callback)&&(callbackOutput=callback())}catch(e){return makePromise(e,!1)}return isPromiseLike(callbackOutput)?callbackOutput.then(function(){return makePromise(value,isResolved)},function(error){return makePromise(error,!1)}):makePromise(value,isResolved)},when=function(value,callback,errback,progressBack){var result=new Deferred;return result.resolve(value),result.promise.then(callback,errback,progressBack)},resolve=when,$Q=function Q(resolver){function resolveFn(value){deferred.resolve(value)}function rejectFn(reason){deferred.reject(reason)}if(!isFunction(resolver))throw $qMinErr("norslvr","Expected resolverFn, got '{0}'",resolver);if(!(this instanceof Q))return new Q(resolver);var deferred=new Deferred;return resolver(resolveFn,rejectFn),deferred.promise};return $Q.defer=defer,$Q.reject=reject,$Q.when=when,$Q.resolve=resolve,$Q.all=all,$Q}function $$RAFProvider(){this.$get=["$window","$timeout",function($window,$timeout){function flush(){for(var i=0;i<taskQueue.length;i++){var task=taskQueue[i];task&&(taskQueue[i]=null,task())}taskCount=taskQueue.length=0}function queueFn(asyncFn){var index=taskQueue.length;return taskCount++,taskQueue.push(asyncFn),0===index&&(cancelLastRAF=rafFn(flush)),function(){index>=0&&(taskQueue[index]=null,index=null,0===--taskCount&&cancelLastRAF&&(cancelLastRAF(),cancelLastRAF=null,taskQueue.length=0))}}var requestAnimationFrame=$window.requestAnimationFrame||$window.webkitRequestAnimationFrame,cancelAnimationFrame=$window.cancelAnimationFrame||$window.webkitCancelAnimationFrame||$window.webkitCancelRequestAnimationFrame,rafSupported=!!requestAnimationFrame,rafFn=rafSupported?function(fn){var id=requestAnimationFrame(fn);
return function(){cancelAnimationFrame(id)}}:function(fn){var timer=$timeout(fn,16.66,!1);return function(){$timeout.cancel(timer)}};queueFn.supported=rafSupported;var cancelLastRAF,taskCount=0,taskQueue=[];return queueFn}]}function $RootScopeProvider(){function createChildScopeClass(parent){function ChildScope(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null,this.$$listeners={},this.$$listenerCount={},this.$$watchersCount=0,this.$id=nextUid(),this.$$ChildScope=null}return ChildScope.prototype=parent,ChildScope}var TTL=10,$rootScopeMinErr=minErr("$rootScope"),lastDirtyWatch=null,applyAsyncId=null;this.digestTtl=function(value){return arguments.length&&(TTL=value),TTL},this.$get=["$injector","$exceptionHandler","$parse","$browser",function($injector,$exceptionHandler,$parse,$browser){function destroyChildScope($event){$event.currentScope.$$destroyed=!0}function Scope(){this.$id=nextUid(),this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null,this.$root=this,this.$$destroyed=!1,this.$$listeners={},this.$$listenerCount={},this.$$watchersCount=0,this.$$isolateBindings=null}function beginPhase(phase){if($rootScope.$$phase)throw $rootScopeMinErr("inprog","{0} already in progress",$rootScope.$$phase);$rootScope.$$phase=phase}function clearPhase(){$rootScope.$$phase=null}function incrementWatchersCount(current,count){do current.$$watchersCount+=count;while(current=current.$parent)}function decrementListenerCount(current,count,name){do current.$$listenerCount[name]-=count,0===current.$$listenerCount[name]&&delete current.$$listenerCount[name];while(current=current.$parent)}function initWatchVal(){}function flushApplyAsync(){for(;applyAsyncQueue.length;)try{applyAsyncQueue.shift()()}catch(e){$exceptionHandler(e)}applyAsyncId=null}function scheduleApplyAsync(){null===applyAsyncId&&(applyAsyncId=$browser.defer(function(){$rootScope.$apply(flushApplyAsync)}))}Scope.prototype={constructor:Scope,$new:function(isolate,parent){var child;return parent=parent||this,isolate?(child=new Scope,child.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=createChildScopeClass(this)),child=new this.$$ChildScope),child.$parent=parent,child.$$prevSibling=parent.$$childTail,parent.$$childHead?(parent.$$childTail.$$nextSibling=child,parent.$$childTail=child):parent.$$childHead=parent.$$childTail=child,(isolate||parent!=this)&&child.$on("$destroy",destroyChildScope),child},$watch:function(watchExp,listener,objectEquality,prettyPrintExpression){var get=$parse(watchExp);if(get.$$watchDelegate)return get.$$watchDelegate(this,listener,objectEquality,get,watchExp);var scope=this,array=scope.$$watchers,watcher={fn:listener,last:initWatchVal,get:get,exp:prettyPrintExpression||watchExp,eq:!!objectEquality};return lastDirtyWatch=null,isFunction(listener)||(watcher.fn=noop),array||(array=scope.$$watchers=[]),array.unshift(watcher),incrementWatchersCount(this,1),function(){arrayRemove(array,watcher)>=0&&incrementWatchersCount(scope,-1),lastDirtyWatch=null}},$watchGroup:function(watchExpressions,listener){function watchGroupAction(){changeReactionScheduled=!1,firstRun?(firstRun=!1,listener(newValues,newValues,self)):listener(newValues,oldValues,self)}var oldValues=new Array(watchExpressions.length),newValues=new Array(watchExpressions.length),deregisterFns=[],self=this,changeReactionScheduled=!1,firstRun=!0;if(!watchExpressions.length){var shouldCall=!0;return self.$evalAsync(function(){shouldCall&&listener(newValues,newValues,self)}),function(){shouldCall=!1}}return 1===watchExpressions.length?this.$watch(watchExpressions[0],function(value,oldValue,scope){newValues[0]=value,oldValues[0]=oldValue,listener(newValues,value===oldValue?newValues:oldValues,scope)}):(forEach(watchExpressions,function(expr,i){var unwatchFn=self.$watch(expr,function(value,oldValue){newValues[i]=value,oldValues[i]=oldValue,changeReactionScheduled||(changeReactionScheduled=!0,self.$evalAsync(watchGroupAction))});deregisterFns.push(unwatchFn)}),function(){for(;deregisterFns.length;)deregisterFns.shift()()})},$watchCollection:function(obj,listener){function $watchCollectionInterceptor(_value){newValue=_value;var newLength,key,bothNaN,newItem,oldItem;if(!isUndefined(newValue)){if(isObject(newValue))if(isArrayLike(newValue)){oldValue!==internalArray&&(oldValue=internalArray,oldLength=oldValue.length=0,changeDetected++),newLength=newValue.length,oldLength!==newLength&&(changeDetected++,oldValue.length=oldLength=newLength);for(var i=0;newLength>i;i++)oldItem=oldValue[i],newItem=newValue[i],bothNaN=oldItem!==oldItem&&newItem!==newItem,bothNaN||oldItem===newItem||(changeDetected++,oldValue[i]=newItem)}else{oldValue!==internalObject&&(oldValue=internalObject={},oldLength=0,changeDetected++),newLength=0;for(key in newValue)newValue.hasOwnProperty(key)&&(newLength++,newItem=newValue[key],oldItem=oldValue[key],key in oldValue?(bothNaN=oldItem!==oldItem&&newItem!==newItem,bothNaN||oldItem===newItem||(changeDetected++,oldValue[key]=newItem)):(oldLength++,oldValue[key]=newItem,changeDetected++));if(oldLength>newLength){changeDetected++;for(key in oldValue)newValue.hasOwnProperty(key)||(oldLength--,delete oldValue[key])}}else oldValue!==newValue&&(oldValue=newValue,changeDetected++);return changeDetected}}function $watchCollectionAction(){if(initRun?(initRun=!1,listener(newValue,newValue,self)):listener(newValue,veryOldValue,self),trackVeryOldValue)if(isObject(newValue))if(isArrayLike(newValue)){veryOldValue=new Array(newValue.length);for(var i=0;i<newValue.length;i++)veryOldValue[i]=newValue[i]}else{veryOldValue={};for(var key in newValue)hasOwnProperty.call(newValue,key)&&(veryOldValue[key]=newValue[key])}else veryOldValue=newValue}$watchCollectionInterceptor.$stateful=!0;var newValue,oldValue,veryOldValue,self=this,trackVeryOldValue=listener.length>1,changeDetected=0,changeDetector=$parse(obj,$watchCollectionInterceptor),internalArray=[],internalObject={},initRun=!0,oldLength=0;return this.$watch(changeDetector,$watchCollectionAction)},$digest:function(){var watch,value,last,watchers,length,dirty,next,current,logIdx,asyncTask,ttl=TTL,target=this,watchLog=[];beginPhase("$digest"),$browser.$$checkUrlChange(),this===$rootScope&&null!==applyAsyncId&&($browser.defer.cancel(applyAsyncId),flushApplyAsync()),lastDirtyWatch=null;do{for(dirty=!1,current=target;asyncQueue.length;){try{asyncTask=asyncQueue.shift(),asyncTask.scope.$eval(asyncTask.expression,asyncTask.locals)}catch(e){$exceptionHandler(e)}lastDirtyWatch=null}traverseScopesLoop:do{if(watchers=current.$$watchers)for(length=watchers.length;length--;)try{if(watch=watchers[length])if((value=watch.get(current))===(last=watch.last)||(watch.eq?equals(value,last):"number"==typeof value&&"number"==typeof last&&isNaN(value)&&isNaN(last))){if(watch===lastDirtyWatch){dirty=!1;break traverseScopesLoop}}else dirty=!0,lastDirtyWatch=watch,watch.last=watch.eq?copy(value,null):value,watch.fn(value,last===initWatchVal?value:last,current),5>ttl&&(logIdx=4-ttl,watchLog[logIdx]||(watchLog[logIdx]=[]),watchLog[logIdx].push({msg:isFunction(watch.exp)?"fn: "+(watch.exp.name||watch.exp.toString()):watch.exp,newVal:value,oldVal:last}))}catch(e){$exceptionHandler(e)}if(!(next=current.$$watchersCount&&current.$$childHead||current!==target&&current.$$nextSibling))for(;current!==target&&!(next=current.$$nextSibling);)current=current.$parent}while(current=next);if((dirty||asyncQueue.length)&&!ttl--)throw clearPhase(),$rootScopeMinErr("infdig","{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}",TTL,watchLog)}while(dirty||asyncQueue.length);for(clearPhase();postDigestQueue.length;)try{postDigestQueue.shift()()}catch(e){$exceptionHandler(e)}},$destroy:function(){if(!this.$$destroyed){var parent=this.$parent;this.$broadcast("$destroy"),this.$$destroyed=!0,this===$rootScope&&$browser.$$applicationDestroyed(),incrementWatchersCount(this,-this.$$watchersCount);for(var eventName in this.$$listenerCount)decrementListenerCount(this,this.$$listenerCount[eventName],eventName);parent&&parent.$$childHead==this&&(parent.$$childHead=this.$$nextSibling),parent&&parent.$$childTail==this&&(parent.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=noop,this.$on=this.$watch=this.$watchGroup=function(){return noop},this.$$listeners={},this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}},$eval:function(expr,locals){return $parse(expr)(this,locals)},$evalAsync:function(expr,locals){$rootScope.$$phase||asyncQueue.length||$browser.defer(function(){asyncQueue.length&&$rootScope.$digest()}),asyncQueue.push({scope:this,expression:expr,locals:locals})},$$postDigest:function(fn){postDigestQueue.push(fn)},$apply:function(expr){try{return beginPhase("$apply"),this.$eval(expr)}catch(e){$exceptionHandler(e)}finally{clearPhase();try{$rootScope.$digest()}catch(e){throw $exceptionHandler(e),e}}},$applyAsync:function(expr){function $applyAsyncExpression(){scope.$eval(expr)}var scope=this;expr&&applyAsyncQueue.push($applyAsyncExpression),scheduleApplyAsync()},$on:function(name,listener){var namedListeners=this.$$listeners[name];namedListeners||(this.$$listeners[name]=namedListeners=[]),namedListeners.push(listener);var current=this;do current.$$listenerCount[name]||(current.$$listenerCount[name]=0),current.$$listenerCount[name]++;while(current=current.$parent);var self=this;return function(){var indexOfListener=namedListeners.indexOf(listener);-1!==indexOfListener&&(namedListeners[indexOfListener]=null,decrementListenerCount(self,1,name))}},$emit:function(name){var namedListeners,i,length,empty=[],scope=this,stopPropagation=!1,event={name:name,targetScope:scope,stopPropagation:function(){stopPropagation=!0},preventDefault:function(){event.defaultPrevented=!0},defaultPrevented:!1},listenerArgs=concat([event],arguments,1);do{for(namedListeners=scope.$$listeners[name]||empty,event.currentScope=scope,i=0,length=namedListeners.length;length>i;i++)if(namedListeners[i])try{namedListeners[i].apply(null,listenerArgs)}catch(e){$exceptionHandler(e)}else namedListeners.splice(i,1),i--,length--;if(stopPropagation)return event.currentScope=null,event;scope=scope.$parent}while(scope);return event.currentScope=null,event},$broadcast:function(name){var target=this,current=target,next=target,event={name:name,targetScope:target,preventDefault:function(){event.defaultPrevented=!0},defaultPrevented:!1};if(!target.$$listenerCount[name])return event;for(var listeners,i,length,listenerArgs=concat([event],arguments,1);current=next;){for(event.currentScope=current,listeners=current.$$listeners[name]||[],i=0,length=listeners.length;length>i;i++)if(listeners[i])try{listeners[i].apply(null,listenerArgs)}catch(e){$exceptionHandler(e)}else listeners.splice(i,1),i--,length--;if(!(next=current.$$listenerCount[name]&&current.$$childHead||current!==target&&current.$$nextSibling))for(;current!==target&&!(next=current.$$nextSibling);)current=current.$parent}return event.currentScope=null,event}};var $rootScope=new Scope,asyncQueue=$rootScope.$$asyncQueue=[],postDigestQueue=$rootScope.$$postDigestQueue=[],applyAsyncQueue=$rootScope.$$applyAsyncQueue=[];return $rootScope}]}function $$SanitizeUriProvider(){var aHrefSanitizationWhitelist=/^\s*(https?|ftp|mailto|tel|file):/,imgSrcSanitizationWhitelist=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(regexp){return isDefined(regexp)?(aHrefSanitizationWhitelist=regexp,this):aHrefSanitizationWhitelist},this.imgSrcSanitizationWhitelist=function(regexp){return isDefined(regexp)?(imgSrcSanitizationWhitelist=regexp,this):imgSrcSanitizationWhitelist},this.$get=function(){return function(uri,isImage){var normalizedVal,regex=isImage?imgSrcSanitizationWhitelist:aHrefSanitizationWhitelist;return normalizedVal=urlResolve(uri).href,""===normalizedVal||normalizedVal.match(regex)?uri:"unsafe:"+normalizedVal}}}function adjustMatcher(matcher){if("self"===matcher)return matcher;if(isString(matcher)){if(matcher.indexOf("***")>-1)throw $sceMinErr("iwcard","Illegal sequence *** in string matcher.  String: {0}",matcher);return matcher=escapeForRegexp(matcher).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*"),new RegExp("^"+matcher+"$")}if(isRegExp(matcher))return new RegExp("^"+matcher.source+"$");throw $sceMinErr("imatcher",'Matchers may only be "self", string patterns or RegExp objects')}function adjustMatchers(matchers){var adjustedMatchers=[];return isDefined(matchers)&&forEach(matchers,function(matcher){adjustedMatchers.push(adjustMatcher(matcher))}),adjustedMatchers}function $SceDelegateProvider(){this.SCE_CONTEXTS=SCE_CONTEXTS;var resourceUrlWhitelist=["self"],resourceUrlBlacklist=[];this.resourceUrlWhitelist=function(value){return arguments.length&&(resourceUrlWhitelist=adjustMatchers(value)),resourceUrlWhitelist},this.resourceUrlBlacklist=function(value){return arguments.length&&(resourceUrlBlacklist=adjustMatchers(value)),resourceUrlBlacklist},this.$get=["$injector",function($injector){function matchUrl(matcher,parsedUrl){return"self"===matcher?urlIsSameOrigin(parsedUrl):!!matcher.exec(parsedUrl.href)}function isResourceUrlAllowedByPolicy(url){var i,n,parsedUrl=urlResolve(url.toString()),allowed=!1;for(i=0,n=resourceUrlWhitelist.length;n>i;i++)if(matchUrl(resourceUrlWhitelist[i],parsedUrl)){allowed=!0;break}if(allowed)for(i=0,n=resourceUrlBlacklist.length;n>i;i++)if(matchUrl(resourceUrlBlacklist[i],parsedUrl)){allowed=!1;break}return allowed}function generateHolderType(Base){var holderType=function(trustedValue){this.$$unwrapTrustedValue=function(){return trustedValue}};return Base&&(holderType.prototype=new Base),holderType.prototype.valueOf=function(){return this.$$unwrapTrustedValue()},holderType.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()},holderType}function trustAs(type,trustedValue){var Constructor=byType.hasOwnProperty(type)?byType[type]:null;if(!Constructor)throw $sceMinErr("icontext","Attempted to trust a value in invalid context. Context: {0}; Value: {1}",type,trustedValue);if(null===trustedValue||trustedValue===undefined||""===trustedValue)return trustedValue;if("string"!=typeof trustedValue)throw $sceMinErr("itype","Attempted to trust a non-string value in a content requiring a string: Context: {0}",type);return new Constructor(trustedValue)}function valueOf(maybeTrusted){return maybeTrusted instanceof trustedValueHolderBase?maybeTrusted.$$unwrapTrustedValue():maybeTrusted}function getTrusted(type,maybeTrusted){if(null===maybeTrusted||maybeTrusted===undefined||""===maybeTrusted)return maybeTrusted;var constructor=byType.hasOwnProperty(type)?byType[type]:null;if(constructor&&maybeTrusted instanceof constructor)return maybeTrusted.$$unwrapTrustedValue();if(type===SCE_CONTEXTS.RESOURCE_URL){if(isResourceUrlAllowedByPolicy(maybeTrusted))return maybeTrusted;throw $sceMinErr("insecurl","Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}",maybeTrusted.toString())}if(type===SCE_CONTEXTS.HTML)return htmlSanitizer(maybeTrusted);throw $sceMinErr("unsafe","Attempting to use an unsafe value in a safe context.")}var htmlSanitizer=function(){throw $sceMinErr("unsafe","Attempting to use an unsafe value in a safe context.")};$injector.has("$sanitize")&&(htmlSanitizer=$injector.get("$sanitize"));var trustedValueHolderBase=generateHolderType(),byType={};return byType[SCE_CONTEXTS.HTML]=generateHolderType(trustedValueHolderBase),byType[SCE_CONTEXTS.CSS]=generateHolderType(trustedValueHolderBase),byType[SCE_CONTEXTS.URL]=generateHolderType(trustedValueHolderBase),byType[SCE_CONTEXTS.JS]=generateHolderType(trustedValueHolderBase),byType[SCE_CONTEXTS.RESOURCE_URL]=generateHolderType(byType[SCE_CONTEXTS.URL]),{trustAs:trustAs,getTrusted:getTrusted,valueOf:valueOf}}]}function $SceProvider(){var enabled=!0;this.enabled=function(value){return arguments.length&&(enabled=!!value),enabled},this.$get=["$parse","$sceDelegate",function($parse,$sceDelegate){if(enabled&&8>msie)throw $sceMinErr("iequirks","Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");var sce=shallowCopy(SCE_CONTEXTS);sce.isEnabled=function(){return enabled},sce.trustAs=$sceDelegate.trustAs,sce.getTrusted=$sceDelegate.getTrusted,sce.valueOf=$sceDelegate.valueOf,enabled||(sce.trustAs=sce.getTrusted=function(type,value){return value},sce.valueOf=identity),sce.parseAs=function(type,expr){var parsed=$parse(expr);return parsed.literal&&parsed.constant?parsed:$parse(expr,function(value){return sce.getTrusted(type,value)})};var parse=sce.parseAs,getTrusted=sce.getTrusted,trustAs=sce.trustAs;return forEach(SCE_CONTEXTS,function(enumValue,name){var lName=lowercase(name);sce[camelCase("parse_as_"+lName)]=function(expr){return parse(enumValue,expr)},sce[camelCase("get_trusted_"+lName)]=function(value){return getTrusted(enumValue,value)},sce[camelCase("trust_as_"+lName)]=function(value){return trustAs(enumValue,value)}}),sce}]}function $SnifferProvider(){this.$get=["$window","$document",function($window,$document){var vendorPrefix,match,eventSupport={},android=toInt((/android (\d+)/.exec(lowercase(($window.navigator||{}).userAgent))||[])[1]),boxee=/Boxee/i.test(($window.navigator||{}).userAgent),document=$document[0]||{},vendorRegex=/^(Moz|webkit|ms)(?=[A-Z])/,bodyStyle=document.body&&document.body.style,transitions=!1,animations=!1;if(bodyStyle){for(var prop in bodyStyle)if(match=vendorRegex.exec(prop)){vendorPrefix=match[0],vendorPrefix=vendorPrefix.substr(0,1).toUpperCase()+vendorPrefix.substr(1);break}vendorPrefix||(vendorPrefix="WebkitOpacity"in bodyStyle&&"webkit"),transitions=!!("transition"in bodyStyle||vendorPrefix+"Transition"in bodyStyle),animations=!!("animation"in bodyStyle||vendorPrefix+"Animation"in bodyStyle),!android||transitions&&animations||(transitions=isString(bodyStyle.webkitTransition),animations=isString(bodyStyle.webkitAnimation))}return{history:!(!$window.history||!$window.history.pushState||4>android||boxee),hasEvent:function(event){if("input"===event&&11>=msie)return!1;if(isUndefined(eventSupport[event])){var divElm=document.createElement("div");eventSupport[event]="on"+event in divElm}return eventSupport[event]},csp:csp(),vendorPrefix:vendorPrefix,transitions:transitions,animations:animations,android:android}}]}function $TemplateRequestProvider(){this.$get=["$templateCache","$http","$q","$sce",function($templateCache,$http,$q,$sce){function handleRequestFn(tpl,ignoreRequestError){function handleError(resp){if(!ignoreRequestError)throw $compileMinErr("tpload","Failed to load template: {0} (HTTP status: {1} {2})",tpl,resp.status,resp.statusText);return $q.reject(resp)}handleRequestFn.totalPendingRequests++,isString(tpl)&&$templateCache.get(tpl)||(tpl=$sce.getTrustedResourceUrl(tpl));var transformResponse=$http.defaults&&$http.defaults.transformResponse;isArray(transformResponse)?transformResponse=transformResponse.filter(function(transformer){return transformer!==defaultHttpResponseTransform}):transformResponse===defaultHttpResponseTransform&&(transformResponse=null);var httpOptions={cache:$templateCache,transformResponse:transformResponse};return $http.get(tpl,httpOptions)["finally"](function(){handleRequestFn.totalPendingRequests--}).then(function(response){return $templateCache.put(tpl,response.data),response.data},handleError)}return handleRequestFn.totalPendingRequests=0,handleRequestFn}]}function $$TestabilityProvider(){this.$get=["$rootScope","$browser","$location",function($rootScope,$browser,$location){var testability={};return testability.findBindings=function(element,expression,opt_exactMatch){var bindings=element.getElementsByClassName("ng-binding"),matches=[];return forEach(bindings,function(binding){var dataBinding=angular.element(binding).data("$binding");dataBinding&&forEach(dataBinding,function(bindingName){if(opt_exactMatch){var matcher=new RegExp("(^|\\s)"+escapeForRegexp(expression)+"(\\s|\\||$)");matcher.test(bindingName)&&matches.push(binding)}else-1!=bindingName.indexOf(expression)&&matches.push(binding)})}),matches},testability.findModels=function(element,expression,opt_exactMatch){for(var prefixes=["ng-","data-ng-","ng\\:"],p=0;p<prefixes.length;++p){var attributeEquals=opt_exactMatch?"=":"*=",selector="["+prefixes[p]+"model"+attributeEquals+'"'+expression+'"]',elements=element.querySelectorAll(selector);if(elements.length)return elements}},testability.getLocation=function(){return $location.url()},testability.setLocation=function(url){url!==$location.url()&&($location.url(url),$rootScope.$digest())},testability.whenStable=function(callback){$browser.notifyWhenNoOutstandingRequests(callback)},testability}]}function $TimeoutProvider(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function($rootScope,$browser,$q,$$q,$exceptionHandler){function timeout(fn,delay,invokeApply){isFunction(fn)||(invokeApply=delay,delay=fn,fn=noop);var timeoutId,args=sliceArgs(arguments,3),skipApply=isDefined(invokeApply)&&!invokeApply,deferred=(skipApply?$$q:$q).defer(),promise=deferred.promise;return timeoutId=$browser.defer(function(){try{deferred.resolve(fn.apply(null,args))}catch(e){deferred.reject(e),$exceptionHandler(e)}finally{delete deferreds[promise.$$timeoutId]}skipApply||$rootScope.$apply()},delay),promise.$$timeoutId=timeoutId,deferreds[timeoutId]=deferred,promise}var deferreds={};return timeout.cancel=function(promise){return promise&&promise.$$timeoutId in deferreds?(deferreds[promise.$$timeoutId].reject("canceled"),delete deferreds[promise.$$timeoutId],$browser.defer.cancel(promise.$$timeoutId)):!1},timeout}]}function urlResolve(url){var href=url;return msie&&(urlParsingNode.setAttribute("href",href),href=urlParsingNode.href),urlParsingNode.setAttribute("href",href),{href:urlParsingNode.href,protocol:urlParsingNode.protocol?urlParsingNode.protocol.replace(/:$/,""):"",host:urlParsingNode.host,search:urlParsingNode.search?urlParsingNode.search.replace(/^\?/,""):"",hash:urlParsingNode.hash?urlParsingNode.hash.replace(/^#/,""):"",hostname:urlParsingNode.hostname,port:urlParsingNode.port,pathname:"/"===urlParsingNode.pathname.charAt(0)?urlParsingNode.pathname:"/"+urlParsingNode.pathname}}function urlIsSameOrigin(requestUrl){var parsed=isString(requestUrl)?urlResolve(requestUrl):requestUrl;return parsed.protocol===originUrl.protocol&&parsed.host===originUrl.host}function $WindowProvider(){this.$get=valueFn(window)}function $$CookieReader($document){function safeDecodeURIComponent(str){try{return decodeURIComponent(str)}catch(e){return str}}var rawDocument=$document[0]||{},lastCookies={},lastCookieString="";return function(){var cookieArray,cookie,i,index,name,currentCookieString=rawDocument.cookie||"";if(currentCookieString!==lastCookieString)for(lastCookieString=currentCookieString,cookieArray=lastCookieString.split("; "),lastCookies={},i=0;i<cookieArray.length;i++)cookie=cookieArray[i],index=cookie.indexOf("="),index>0&&(name=safeDecodeURIComponent(cookie.substring(0,index)),lastCookies[name]===undefined&&(lastCookies[name]=safeDecodeURIComponent(cookie.substring(index+1))));return lastCookies}}function $$CookieReaderProvider(){this.$get=$$CookieReader}function $FilterProvider($provide){function register(name,factory){if(isObject(name)){var filters={};return forEach(name,function(filter,key){filters[key]=register(key,filter)}),filters}return $provide.factory(name+suffix,factory)}var suffix="Filter";this.register=register,this.$get=["$injector",function($injector){return function(name){return $injector.get(name+suffix)}}],register("currency",currencyFilter),register("date",dateFilter),register("filter",filterFilter),register("json",jsonFilter),register("limitTo",limitToFilter),register("lowercase",lowercaseFilter),register("number",numberFilter),register("orderBy",orderByFilter),register("uppercase",uppercaseFilter)}function filterFilter(){return function(array,expression,comparator){if(!isArrayLike(array)){if(null==array)return array;throw minErr("filter")("notarray","Expected array but received: {0}",array)}var predicateFn,matchAgainstAnyProp,expressionType=getTypeForFilter(expression);switch(expressionType){case"function":predicateFn=expression;break;case"boolean":case"null":case"number":case"string":matchAgainstAnyProp=!0;case"object":predicateFn=createPredicateFn(expression,comparator,matchAgainstAnyProp);break;default:return array}return Array.prototype.filter.call(array,predicateFn)}}function createPredicateFn(expression,comparator,matchAgainstAnyProp){var predicateFn,shouldMatchPrimitives=isObject(expression)&&"$"in expression;return comparator===!0?comparator=equals:isFunction(comparator)||(comparator=function(actual,expected){return isUndefined(actual)?!1:null===actual||null===expected?actual===expected:isObject(expected)||isObject(actual)&&!hasCustomToString(actual)?!1:(actual=lowercase(""+actual),expected=lowercase(""+expected),-1!==actual.indexOf(expected))}),predicateFn=function(item){return shouldMatchPrimitives&&!isObject(item)?deepCompare(item,expression.$,comparator,!1):deepCompare(item,expression,comparator,matchAgainstAnyProp)}}function deepCompare(actual,expected,comparator,matchAgainstAnyProp,dontMatchWholeObject){var actualType=getTypeForFilter(actual),expectedType=getTypeForFilter(expected);if("string"===expectedType&&"!"===expected.charAt(0))return!deepCompare(actual,expected.substring(1),comparator,matchAgainstAnyProp);if(isArray(actual))return actual.some(function(item){return deepCompare(item,expected,comparator,matchAgainstAnyProp)});switch(actualType){case"object":var key;if(matchAgainstAnyProp){for(key in actual)if("$"!==key.charAt(0)&&deepCompare(actual[key],expected,comparator,!0))return!0;return dontMatchWholeObject?!1:deepCompare(actual,expected,comparator,!1)}if("object"===expectedType){for(key in expected){var expectedVal=expected[key];if(!isFunction(expectedVal)&&!isUndefined(expectedVal)){var matchAnyProperty="$"===key,actualVal=matchAnyProperty?actual:actual[key];if(!deepCompare(actualVal,expectedVal,comparator,matchAnyProperty,matchAnyProperty))return!1}}return!0}return comparator(actual,expected);case"function":return!1;default:return comparator(actual,expected)}}function getTypeForFilter(val){return null===val?"null":typeof val}function currencyFilter($locale){var formats=$locale.NUMBER_FORMATS;return function(amount,currencySymbol,fractionSize){return isUndefined(currencySymbol)&&(currencySymbol=formats.CURRENCY_SYM),isUndefined(fractionSize)&&(fractionSize=formats.PATTERNS[1].maxFrac),null==amount?amount:formatNumber(amount,formats.PATTERNS[1],formats.GROUP_SEP,formats.DECIMAL_SEP,fractionSize).replace(/\u00A4/g,currencySymbol)}}function numberFilter($locale){var formats=$locale.NUMBER_FORMATS;return function(number,fractionSize){return null==number?number:formatNumber(number,formats.PATTERNS[0],formats.GROUP_SEP,formats.DECIMAL_SEP,fractionSize)}}function formatNumber(number,pattern,groupSep,decimalSep,fractionSize){if(isObject(number))return"";var isNegative=0>number;number=Math.abs(number);var isInfinity=1/0===number;if(!isInfinity&&!isFinite(number))return"";var numStr=number+"",formatedText="",hasExponent=!1,parts=[];if(isInfinity&&(formatedText="∞"),!isInfinity&&-1!==numStr.indexOf("e")){var match=numStr.match(/([\d\.]+)e(-?)(\d+)/);match&&"-"==match[2]&&match[3]>fractionSize+1?number=0:(formatedText=numStr,hasExponent=!0)}if(isInfinity||hasExponent)fractionSize>0&&1>number&&(formatedText=number.toFixed(fractionSize),number=parseFloat(formatedText));else{var fractionLen=(numStr.split(DECIMAL_SEP)[1]||"").length;isUndefined(fractionSize)&&(fractionSize=Math.min(Math.max(pattern.minFrac,fractionLen),pattern.maxFrac)),number=+(Math.round(+(number.toString()+"e"+fractionSize)).toString()+"e"+-fractionSize);var fraction=(""+number).split(DECIMAL_SEP),whole=fraction[0];fraction=fraction[1]||"";var i,pos=0,lgroup=pattern.lgSize,group=pattern.gSize;if(whole.length>=lgroup+group)for(pos=whole.length-lgroup,i=0;pos>i;i++)(pos-i)%group===0&&0!==i&&(formatedText+=groupSep),formatedText+=whole.charAt(i);for(i=pos;i<whole.length;i++)(whole.length-i)%lgroup===0&&0!==i&&(formatedText+=groupSep),formatedText+=whole.charAt(i);for(;fraction.length<fractionSize;)fraction+="0";fractionSize&&"0"!==fractionSize&&(formatedText+=decimalSep+fraction.substr(0,fractionSize))}return 0===number&&(isNegative=!1),parts.push(isNegative?pattern.negPre:pattern.posPre,formatedText,isNegative?pattern.negSuf:pattern.posSuf),parts.join("")}function padNumber(num,digits,trim){var neg="";for(0>num&&(neg="-",num=-num),num=""+num;num.length<digits;)num="0"+num;return trim&&(num=num.substr(num.length-digits)),neg+num}function dateGetter(name,size,offset,trim){return offset=offset||0,function(date){var value=date["get"+name]();return(offset>0||value>-offset)&&(value+=offset),0===value&&-12==offset&&(value=12),padNumber(value,size,trim)}}function dateStrGetter(name,shortForm){return function(date,formats){var value=date["get"+name](),get=uppercase(shortForm?"SHORT"+name:name);return formats[get][value]}}function timeZoneGetter(date,formats,offset){var zone=-1*offset,paddedZone=zone>=0?"+":"";return paddedZone+=padNumber(Math[zone>0?"floor":"ceil"](zone/60),2)+padNumber(Math.abs(zone%60),2)}function getFirstThursdayOfYear(year){var dayOfWeekOnFirst=new Date(year,0,1).getDay();return new Date(year,0,(4>=dayOfWeekOnFirst?5:12)-dayOfWeekOnFirst)}function getThursdayThisWeek(datetime){return new Date(datetime.getFullYear(),datetime.getMonth(),datetime.getDate()+(4-datetime.getDay()))}function weekGetter(size){return function(date){var firstThurs=getFirstThursdayOfYear(date.getFullYear()),thisThurs=getThursdayThisWeek(date),diff=+thisThurs-+firstThurs,result=1+Math.round(diff/6048e5);return padNumber(result,size)}}function ampmGetter(date,formats){return date.getHours()<12?formats.AMPMS[0]:formats.AMPMS[1]}function eraGetter(date,formats){return date.getFullYear()<=0?formats.ERAS[0]:formats.ERAS[1]}function longEraGetter(date,formats){return date.getFullYear()<=0?formats.ERANAMES[0]:formats.ERANAMES[1]}function dateFilter($locale){function jsonStringToDate(string){var match;if(match=string.match(R_ISO8601_STR)){var date=new Date(0),tzHour=0,tzMin=0,dateSetter=match[8]?date.setUTCFullYear:date.setFullYear,timeSetter=match[8]?date.setUTCHours:date.setHours;match[9]&&(tzHour=toInt(match[9]+match[10]),tzMin=toInt(match[9]+match[11])),dateSetter.call(date,toInt(match[1]),toInt(match[2])-1,toInt(match[3]));var h=toInt(match[4]||0)-tzHour,m=toInt(match[5]||0)-tzMin,s=toInt(match[6]||0),ms=Math.round(1e3*parseFloat("0."+(match[7]||0)));return timeSetter.call(date,h,m,s,ms),date}return string}var R_ISO8601_STR=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(date,format,timezone){var fn,match,text="",parts=[];if(format=format||"mediumDate",format=$locale.DATETIME_FORMATS[format]||format,isString(date)&&(date=NUMBER_STRING.test(date)?toInt(date):jsonStringToDate(date)),isNumber(date)&&(date=new Date(date)),!isDate(date)||!isFinite(date.getTime()))return date;for(;format;)match=DATE_FORMATS_SPLIT.exec(format),match?(parts=concat(parts,match,1),format=parts.pop()):(parts.push(format),format=null);var dateTimezoneOffset=date.getTimezoneOffset();return timezone&&(dateTimezoneOffset=timezoneToOffset(timezone,date.getTimezoneOffset()),date=convertTimezoneToLocal(date,timezone,!0)),forEach(parts,function(value){fn=DATE_FORMATS[value],text+=fn?fn(date,$locale.DATETIME_FORMATS,dateTimezoneOffset):value.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),text}}function jsonFilter(){return function(object,spacing){return isUndefined(spacing)&&(spacing=2),toJson(object,spacing)
}}function limitToFilter(){return function(input,limit,begin){return limit=1/0===Math.abs(Number(limit))?Number(limit):toInt(limit),isNaN(limit)?input:(isNumber(input)&&(input=input.toString()),isArray(input)||isString(input)?(begin=!begin||isNaN(begin)?0:toInt(begin),begin=0>begin&&begin>=-input.length?input.length+begin:begin,limit>=0?input.slice(begin,begin+limit):0===begin?input.slice(limit,input.length):input.slice(Math.max(0,begin+limit),begin)):input)}}function orderByFilter($parse){function processPredicates(sortPredicate,reverseOrder){return reverseOrder=reverseOrder?-1:1,sortPredicate.map(function(predicate){var descending=1,get=identity;if(isFunction(predicate))get=predicate;else if(isString(predicate)&&(("+"==predicate.charAt(0)||"-"==predicate.charAt(0))&&(descending="-"==predicate.charAt(0)?-1:1,predicate=predicate.substring(1)),""!==predicate&&(get=$parse(predicate),get.constant))){var key=get();get=function(value){return value[key]}}return{get:get,descending:descending*reverseOrder}})}function isPrimitive(value){switch(typeof value){case"number":case"boolean":case"string":return!0;default:return!1}}function objectValue(value,index){return"function"==typeof value.valueOf&&(value=value.valueOf(),isPrimitive(value))?value:hasCustomToString(value)&&(value=value.toString(),isPrimitive(value))?value:index}function getPredicateValue(value,index){var type=typeof value;return null===value?(type="string",value="null"):"string"===type?value=value.toLowerCase():"object"===type&&(value=objectValue(value,index)),{value:value,type:type}}function compare(v1,v2){var result=0;return v1.type===v2.type?v1.value!==v2.value&&(result=v1.value<v2.value?-1:1):result=v1.type<v2.type?-1:1,result}return function(array,sortPredicate,reverseOrder){function getComparisonObject(value,index){return{value:value,predicateValues:predicates.map(function(predicate){return getPredicateValue(predicate.get(value),index)})}}function doComparison(v1,v2){for(var result=0,index=0,length=predicates.length;length>index&&!(result=compare(v1.predicateValues[index],v2.predicateValues[index])*predicates[index].descending);++index);return result}if(!isArrayLike(array))return array;isArray(sortPredicate)||(sortPredicate=[sortPredicate]),0===sortPredicate.length&&(sortPredicate=["+"]);var predicates=processPredicates(sortPredicate,reverseOrder),compareValues=Array.prototype.map.call(array,getComparisonObject);return compareValues.sort(doComparison),array=compareValues.map(function(item){return item.value})}}function ngDirective(directive){return isFunction(directive)&&(directive={link:directive}),directive.restrict=directive.restrict||"AC",valueFn(directive)}function nullFormRenameControl(control,name){control.$name=name}function FormController(element,attrs,$scope,$animate,$interpolate){var form=this,controls=[],parentForm=form.$$parentForm=element.parent().controller("form")||nullFormCtrl;form.$error={},form.$$success={},form.$pending=undefined,form.$name=$interpolate(attrs.name||attrs.ngForm||"")($scope),form.$dirty=!1,form.$pristine=!0,form.$valid=!0,form.$invalid=!1,form.$submitted=!1,parentForm.$addControl(form),form.$rollbackViewValue=function(){forEach(controls,function(control){control.$rollbackViewValue()})},form.$commitViewValue=function(){forEach(controls,function(control){control.$commitViewValue()})},form.$addControl=function(control){assertNotHasOwnProperty(control.$name,"input"),controls.push(control),control.$name&&(form[control.$name]=control)},form.$$renameControl=function(control,newName){var oldName=control.$name;form[oldName]===control&&delete form[oldName],form[newName]=control,control.$name=newName},form.$removeControl=function(control){control.$name&&form[control.$name]===control&&delete form[control.$name],forEach(form.$pending,function(value,name){form.$setValidity(name,null,control)}),forEach(form.$error,function(value,name){form.$setValidity(name,null,control)}),forEach(form.$$success,function(value,name){form.$setValidity(name,null,control)}),arrayRemove(controls,control)},addSetValidityMethod({ctrl:this,$element:element,set:function(object,property,controller){var list=object[property];if(list){var index=list.indexOf(controller);-1===index&&list.push(controller)}else object[property]=[controller]},unset:function(object,property,controller){var list=object[property];list&&(arrayRemove(list,controller),0===list.length&&delete object[property])},parentForm:parentForm,$animate:$animate}),form.$setDirty=function(){$animate.removeClass(element,PRISTINE_CLASS),$animate.addClass(element,DIRTY_CLASS),form.$dirty=!0,form.$pristine=!1,parentForm.$setDirty()},form.$setPristine=function(){$animate.setClass(element,PRISTINE_CLASS,DIRTY_CLASS+" "+SUBMITTED_CLASS),form.$dirty=!1,form.$pristine=!0,form.$submitted=!1,forEach(controls,function(control){control.$setPristine()})},form.$setUntouched=function(){forEach(controls,function(control){control.$setUntouched()})},form.$setSubmitted=function(){$animate.addClass(element,SUBMITTED_CLASS),form.$submitted=!0,parentForm.$setSubmitted()}}function stringBasedInputType(ctrl){ctrl.$formatters.push(function(value){return ctrl.$isEmpty(value)?value:value.toString()})}function textInputType(scope,element,attr,ctrl,$sniffer,$browser){baseInputType(scope,element,attr,ctrl,$sniffer,$browser),stringBasedInputType(ctrl)}function baseInputType(scope,element,attr,ctrl,$sniffer,$browser){var type=lowercase(element[0].type);if(!$sniffer.android){var composing=!1;element.on("compositionstart",function(){composing=!0}),element.on("compositionend",function(){composing=!1,listener()})}var listener=function(ev){if(timeout&&($browser.defer.cancel(timeout),timeout=null),!composing){var value=element.val(),event=ev&&ev.type;"password"===type||attr.ngTrim&&"false"===attr.ngTrim||(value=trim(value)),(ctrl.$viewValue!==value||""===value&&ctrl.$$hasNativeValidators)&&ctrl.$setViewValue(value,event)}};if($sniffer.hasEvent("input"))element.on("input",listener);else{var timeout,deferListener=function(ev,input,origValue){timeout||(timeout=$browser.defer(function(){timeout=null,input&&input.value===origValue||listener(ev)}))};element.on("keydown",function(event){var key=event.keyCode;91===key||key>15&&19>key||key>=37&&40>=key||deferListener(event,this,this.value)}),$sniffer.hasEvent("paste")&&element.on("paste cut",deferListener)}element.on("change",listener),ctrl.$render=function(){element.val(ctrl.$isEmpty(ctrl.$viewValue)?"":ctrl.$viewValue)}}function weekParser(isoWeek,existingDate){if(isDate(isoWeek))return isoWeek;if(isString(isoWeek)){WEEK_REGEXP.lastIndex=0;var parts=WEEK_REGEXP.exec(isoWeek);if(parts){var year=+parts[1],week=+parts[2],hours=0,minutes=0,seconds=0,milliseconds=0,firstThurs=getFirstThursdayOfYear(year),addDays=7*(week-1);return existingDate&&(hours=existingDate.getHours(),minutes=existingDate.getMinutes(),seconds=existingDate.getSeconds(),milliseconds=existingDate.getMilliseconds()),new Date(year,0,firstThurs.getDate()+addDays,hours,minutes,seconds,milliseconds)}}return 0/0}function createDateParser(regexp,mapping){return function(iso,date){var parts,map;if(isDate(iso))return iso;if(isString(iso)){if('"'==iso.charAt(0)&&'"'==iso.charAt(iso.length-1)&&(iso=iso.substring(1,iso.length-1)),ISO_DATE_REGEXP.test(iso))return new Date(iso);if(regexp.lastIndex=0,parts=regexp.exec(iso))return parts.shift(),map=date?{yyyy:date.getFullYear(),MM:date.getMonth()+1,dd:date.getDate(),HH:date.getHours(),mm:date.getMinutes(),ss:date.getSeconds(),sss:date.getMilliseconds()/1e3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},forEach(parts,function(part,index){index<mapping.length&&(map[mapping[index]]=+part)}),new Date(map.yyyy,map.MM-1,map.dd,map.HH,map.mm,map.ss||0,1e3*map.sss||0)}return 0/0}}function createDateInputType(type,regexp,parseDate,format){return function(scope,element,attr,ctrl,$sniffer,$browser,$filter){function isValidDate(value){return value&&!(value.getTime&&value.getTime()!==value.getTime())}function parseObservedDateValue(val){return isDefined(val)?isDate(val)?val:parseDate(val):undefined}badInputChecker(scope,element,attr,ctrl),baseInputType(scope,element,attr,ctrl,$sniffer,$browser);var previousDate,timezone=ctrl&&ctrl.$options&&ctrl.$options.timezone;if(ctrl.$$parserName=type,ctrl.$parsers.push(function(value){if(ctrl.$isEmpty(value))return null;if(regexp.test(value)){var parsedDate=parseDate(value,previousDate);return timezone&&(parsedDate=convertTimezoneToLocal(parsedDate,timezone)),parsedDate}return undefined}),ctrl.$formatters.push(function(value){if(value&&!isDate(value))throw $ngModelMinErr("datefmt","Expected `{0}` to be a date",value);return isValidDate(value)?(previousDate=value,previousDate&&timezone&&(previousDate=convertTimezoneToLocal(previousDate,timezone,!0)),$filter("date")(value,format,timezone)):(previousDate=null,"")}),isDefined(attr.min)||attr.ngMin){var minVal;ctrl.$validators.min=function(value){return!isValidDate(value)||isUndefined(minVal)||parseDate(value)>=minVal},attr.$observe("min",function(val){minVal=parseObservedDateValue(val),ctrl.$validate()})}if(isDefined(attr.max)||attr.ngMax){var maxVal;ctrl.$validators.max=function(value){return!isValidDate(value)||isUndefined(maxVal)||parseDate(value)<=maxVal},attr.$observe("max",function(val){maxVal=parseObservedDateValue(val),ctrl.$validate()})}}}function badInputChecker(scope,element,attr,ctrl){var node=element[0],nativeValidation=ctrl.$$hasNativeValidators=isObject(node.validity);nativeValidation&&ctrl.$parsers.push(function(value){var validity=element.prop(VALIDITY_STATE_PROPERTY)||{};return validity.badInput&&!validity.typeMismatch?undefined:value})}function numberInputType(scope,element,attr,ctrl,$sniffer,$browser){if(badInputChecker(scope,element,attr,ctrl),baseInputType(scope,element,attr,ctrl,$sniffer,$browser),ctrl.$$parserName="number",ctrl.$parsers.push(function(value){return ctrl.$isEmpty(value)?null:NUMBER_REGEXP.test(value)?parseFloat(value):undefined}),ctrl.$formatters.push(function(value){if(!ctrl.$isEmpty(value)){if(!isNumber(value))throw $ngModelMinErr("numfmt","Expected `{0}` to be a number",value);value=value.toString()}return value}),isDefined(attr.min)||attr.ngMin){var minVal;ctrl.$validators.min=function(value){return ctrl.$isEmpty(value)||isUndefined(minVal)||value>=minVal},attr.$observe("min",function(val){isDefined(val)&&!isNumber(val)&&(val=parseFloat(val,10)),minVal=isNumber(val)&&!isNaN(val)?val:undefined,ctrl.$validate()})}if(isDefined(attr.max)||attr.ngMax){var maxVal;ctrl.$validators.max=function(value){return ctrl.$isEmpty(value)||isUndefined(maxVal)||maxVal>=value},attr.$observe("max",function(val){isDefined(val)&&!isNumber(val)&&(val=parseFloat(val,10)),maxVal=isNumber(val)&&!isNaN(val)?val:undefined,ctrl.$validate()})}}function urlInputType(scope,element,attr,ctrl,$sniffer,$browser){baseInputType(scope,element,attr,ctrl,$sniffer,$browser),stringBasedInputType(ctrl),ctrl.$$parserName="url",ctrl.$validators.url=function(modelValue,viewValue){var value=modelValue||viewValue;return ctrl.$isEmpty(value)||URL_REGEXP.test(value)}}function emailInputType(scope,element,attr,ctrl,$sniffer,$browser){baseInputType(scope,element,attr,ctrl,$sniffer,$browser),stringBasedInputType(ctrl),ctrl.$$parserName="email",ctrl.$validators.email=function(modelValue,viewValue){var value=modelValue||viewValue;return ctrl.$isEmpty(value)||EMAIL_REGEXP.test(value)}}function radioInputType(scope,element,attr,ctrl){isUndefined(attr.name)&&element.attr("name",nextUid());var listener=function(ev){element[0].checked&&ctrl.$setViewValue(attr.value,ev&&ev.type)};element.on("click",listener),ctrl.$render=function(){var value=attr.value;element[0].checked=value==ctrl.$viewValue},attr.$observe("value",ctrl.$render)}function parseConstantExpr($parse,context,name,expression,fallback){var parseFn;if(isDefined(expression)){if(parseFn=$parse(expression),!parseFn.constant)throw minErr("ngModel")("constexpr","Expected constant expression for `{0}`, but saw `{1}`.",name,expression);return parseFn(context)}return fallback}function checkboxInputType(scope,element,attr,ctrl,$sniffer,$browser,$filter,$parse){var trueValue=parseConstantExpr($parse,scope,"ngTrueValue",attr.ngTrueValue,!0),falseValue=parseConstantExpr($parse,scope,"ngFalseValue",attr.ngFalseValue,!1),listener=function(ev){ctrl.$setViewValue(element[0].checked,ev&&ev.type)};element.on("click",listener),ctrl.$render=function(){element[0].checked=ctrl.$viewValue},ctrl.$isEmpty=function(value){return value===!1},ctrl.$formatters.push(function(value){return equals(value,trueValue)}),ctrl.$parsers.push(function(value){return value?trueValue:falseValue})}function classDirective(name,selector){return name="ngClass"+name,["$animate",function($animate){function arrayDifference(tokens1,tokens2){var values=[];outer:for(var i=0;i<tokens1.length;i++){for(var token=tokens1[i],j=0;j<tokens2.length;j++)if(token==tokens2[j])continue outer;values.push(token)}return values}function arrayClasses(classVal){var classes=[];return isArray(classVal)?(forEach(classVal,function(v){classes=classes.concat(arrayClasses(v))}),classes):isString(classVal)?classVal.split(" "):isObject(classVal)?(forEach(classVal,function(v,k){v&&(classes=classes.concat(k.split(" ")))}),classes):classVal}return{restrict:"AC",link:function(scope,element,attr){function addClasses(classes){var newClasses=digestClassCounts(classes,1);attr.$addClass(newClasses)}function removeClasses(classes){var newClasses=digestClassCounts(classes,-1);attr.$removeClass(newClasses)}function digestClassCounts(classes,count){var classCounts=element.data("$classCounts")||createMap(),classesToUpdate=[];return forEach(classes,function(className){(count>0||classCounts[className])&&(classCounts[className]=(classCounts[className]||0)+count,classCounts[className]===+(count>0)&&classesToUpdate.push(className))}),element.data("$classCounts",classCounts),classesToUpdate.join(" ")}function updateClasses(oldClasses,newClasses){var toAdd=arrayDifference(newClasses,oldClasses),toRemove=arrayDifference(oldClasses,newClasses);toAdd=digestClassCounts(toAdd,1),toRemove=digestClassCounts(toRemove,-1),toAdd&&toAdd.length&&$animate.addClass(element,toAdd),toRemove&&toRemove.length&&$animate.removeClass(element,toRemove)}function ngClassWatchAction(newVal){if(selector===!0||scope.$index%2===selector){var newClasses=arrayClasses(newVal||[]);if(oldVal){if(!equals(newVal,oldVal)){var oldClasses=arrayClasses(oldVal);updateClasses(oldClasses,newClasses)}}else addClasses(newClasses)}oldVal=shallowCopy(newVal)}var oldVal;scope.$watch(attr[name],ngClassWatchAction,!0),attr.$observe("class",function(){ngClassWatchAction(scope.$eval(attr[name]))}),"ngClass"!==name&&scope.$watch("$index",function($index,old$index){var mod=1&$index;if(mod!==(1&old$index)){var classes=arrayClasses(scope.$eval(attr[name]));mod===selector?addClasses(classes):removeClasses(classes)}})}}}]}function addSetValidityMethod(context){function setValidity(validationErrorKey,state,controller){state===undefined?createAndSet("$pending",validationErrorKey,controller):unsetAndCleanup("$pending",validationErrorKey,controller),isBoolean(state)?state?(unset(ctrl.$error,validationErrorKey,controller),set(ctrl.$$success,validationErrorKey,controller)):(set(ctrl.$error,validationErrorKey,controller),unset(ctrl.$$success,validationErrorKey,controller)):(unset(ctrl.$error,validationErrorKey,controller),unset(ctrl.$$success,validationErrorKey,controller)),ctrl.$pending?(cachedToggleClass(PENDING_CLASS,!0),ctrl.$valid=ctrl.$invalid=undefined,toggleValidationCss("",null)):(cachedToggleClass(PENDING_CLASS,!1),ctrl.$valid=isObjectEmpty(ctrl.$error),ctrl.$invalid=!ctrl.$valid,toggleValidationCss("",ctrl.$valid));var combinedState;combinedState=ctrl.$pending&&ctrl.$pending[validationErrorKey]?undefined:ctrl.$error[validationErrorKey]?!1:ctrl.$$success[validationErrorKey]?!0:null,toggleValidationCss(validationErrorKey,combinedState),parentForm.$setValidity(validationErrorKey,combinedState,ctrl)}function createAndSet(name,value,controller){ctrl[name]||(ctrl[name]={}),set(ctrl[name],value,controller)}function unsetAndCleanup(name,value,controller){ctrl[name]&&unset(ctrl[name],value,controller),isObjectEmpty(ctrl[name])&&(ctrl[name]=undefined)}function cachedToggleClass(className,switchValue){switchValue&&!classCache[className]?($animate.addClass($element,className),classCache[className]=!0):!switchValue&&classCache[className]&&($animate.removeClass($element,className),classCache[className]=!1)}function toggleValidationCss(validationErrorKey,isValid){validationErrorKey=validationErrorKey?"-"+snake_case(validationErrorKey,"-"):"",cachedToggleClass(VALID_CLASS+validationErrorKey,isValid===!0),cachedToggleClass(INVALID_CLASS+validationErrorKey,isValid===!1)}var ctrl=context.ctrl,$element=context.$element,classCache={},set=context.set,unset=context.unset,parentForm=context.parentForm,$animate=context.$animate;classCache[INVALID_CLASS]=!(classCache[VALID_CLASS]=$element.hasClass(VALID_CLASS)),ctrl.$setValidity=setValidity}function isObjectEmpty(obj){if(obj)for(var prop in obj)if(obj.hasOwnProperty(prop))return!1;return!0}var REGEX_STRING_REGEXP=/^\/(.+)\/([a-z]*)$/,VALIDITY_STATE_PROPERTY="validity",lowercase=function(string){return isString(string)?string.toLowerCase():string},hasOwnProperty=Object.prototype.hasOwnProperty,uppercase=function(string){return isString(string)?string.toUpperCase():string},manualLowercase=function(s){return isString(s)?s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(32|ch.charCodeAt(0))}):s},manualUppercase=function(s){return isString(s)?s.replace(/[a-z]/g,function(ch){return String.fromCharCode(-33&ch.charCodeAt(0))}):s};"i"!=="I".toLowerCase()&&(lowercase=manualLowercase,uppercase=manualUppercase);var msie,jqLite,jQuery,angularModule,slice=[].slice,splice=[].splice,push=[].push,toString=Object.prototype.toString,getPrototypeOf=Object.getPrototypeOf,ngMinErr=minErr("ng"),angular=window.angular||(window.angular={}),uid=0;msie=document.documentMode,noop.$inject=[],identity.$inject=[];var skipDestroyOnNextJQueryCleanData,isArray=Array.isArray,TYPED_ARRAY_REGEXP=/^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,trim=function(value){return isString(value)?value.trim():value},escapeForRegexp=function(s){return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},csp=function(){if(isDefined(csp.isActive_))return csp.isActive_;var active=!(!document.querySelector("[ng-csp]")&&!document.querySelector("[data-ng-csp]"));if(!active)try{new Function("")}catch(e){active=!0}return csp.isActive_=active},jq=function(){if(isDefined(jq.name_))return jq.name_;var el,i,prefix,name,ii=ngAttrPrefixes.length;for(i=0;ii>i;++i)if(prefix=ngAttrPrefixes[i],el=document.querySelector("["+prefix.replace(":","\\:")+"jq]")){name=el.getAttribute(prefix+"jq");break}return jq.name_=name},ngAttrPrefixes=["ng-","data-ng-","ng:","x-ng-"],SNAKE_CASE_REGEXP=/[A-Z]/g,bindJQueryFired=!1,NODE_TYPE_ELEMENT=1,NODE_TYPE_ATTRIBUTE=2,NODE_TYPE_TEXT=3,NODE_TYPE_COMMENT=8,NODE_TYPE_DOCUMENT=9,NODE_TYPE_DOCUMENT_FRAGMENT=11,version={full:"1.4.3",major:1,minor:4,dot:3,codeName:"foam-acceleration"};JQLite.expando="ng339";var jqCache=JQLite.cache={},jqId=1,addEventListenerFn=function(element,type,fn){element.addEventListener(type,fn,!1)},removeEventListenerFn=function(element,type,fn){element.removeEventListener(type,fn,!1)};JQLite._data=function(node){return this.cache[node[this.expando]]||{}};var SPECIAL_CHARS_REGEXP=/([\:\-\_]+(.))/g,MOZ_HACK_REGEXP=/^moz([A-Z])/,MOUSE_EVENT_MAP={mouseleave:"mouseout",mouseenter:"mouseover"},jqLiteMinErr=minErr("jqLite"),SINGLE_TAG_REGEXP=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,HTML_REGEXP=/<|&#?\w+;/,TAG_NAME_REGEXP=/<([\w:]+)/,XHTML_TAG_REGEXP=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,wrapMap={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option,wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead,wrapMap.th=wrapMap.td;var JQLitePrototype=JQLite.prototype={ready:function(fn){function trigger(){fired||(fired=!0,fn())}var fired=!1;"complete"===document.readyState?setTimeout(trigger):(this.on("DOMContentLoaded",trigger),JQLite(window).on("load",trigger))},toString:function(){var value=[];return forEach(this,function(e){value.push(""+e)}),"["+value.join(", ")+"]"},eq:function(index){return index>=0?jqLite(this[index]):jqLite(this[this.length+index])},length:0,push:push,sort:[].sort,splice:[].splice},BOOLEAN_ATTR={};forEach("multiple,selected,checked,disabled,readOnly,required,open".split(","),function(value){BOOLEAN_ATTR[lowercase(value)]=value});var BOOLEAN_ELEMENTS={};forEach("input,select,option,textarea,button,form,details".split(","),function(value){BOOLEAN_ELEMENTS[value]=!0});var ALIASED_ATTR={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};forEach({data:jqLiteData,removeData:jqLiteRemoveData,hasData:jqLiteHasData},function(fn,name){JQLite[name]=fn}),forEach({data:jqLiteData,inheritedData:jqLiteInheritedData,scope:function(element){return jqLite.data(element,"$scope")||jqLiteInheritedData(element.parentNode||element,["$isolateScope","$scope"])},isolateScope:function(element){return jqLite.data(element,"$isolateScope")||jqLite.data(element,"$isolateScopeNoTemplate")},controller:jqLiteController,injector:function(element){return jqLiteInheritedData(element,"$injector")},removeAttr:function(element,name){element.removeAttribute(name)},hasClass:jqLiteHasClass,css:function(element,name,value){return name=camelCase(name),isDefined(value)?(element.style[name]=value,void 0):element.style[name]},attr:function(element,name,value){var nodeType=element.nodeType;if(nodeType!==NODE_TYPE_TEXT&&nodeType!==NODE_TYPE_ATTRIBUTE&&nodeType!==NODE_TYPE_COMMENT){var lowercasedName=lowercase(name);if(BOOLEAN_ATTR[lowercasedName]){if(!isDefined(value))return element[name]||(element.attributes.getNamedItem(name)||noop).specified?lowercasedName:undefined;value?(element[name]=!0,element.setAttribute(name,lowercasedName)):(element[name]=!1,element.removeAttribute(lowercasedName))}else if(isDefined(value))element.setAttribute(name,value);else if(element.getAttribute){var ret=element.getAttribute(name,2);return null===ret?undefined:ret}}},prop:function(element,name,value){return isDefined(value)?(element[name]=value,void 0):element[name]},text:function(){function getText(element,value){if(isUndefined(value)){var nodeType=element.nodeType;return nodeType===NODE_TYPE_ELEMENT||nodeType===NODE_TYPE_TEXT?element.textContent:""}element.textContent=value}return getText.$dv="",getText}(),val:function(element,value){if(isUndefined(value)){if(element.multiple&&"select"===nodeName_(element)){var result=[];return forEach(element.options,function(option){option.selected&&result.push(option.value||option.text)}),0===result.length?null:result}return element.value}element.value=value},html:function(element,value){return isUndefined(value)?element.innerHTML:(jqLiteDealoc(element,!0),element.innerHTML=value,void 0)},empty:jqLiteEmpty},function(fn,name){JQLite.prototype[name]=function(arg1,arg2){var i,key,nodeCount=this.length;if(fn!==jqLiteEmpty&&(2==fn.length&&fn!==jqLiteHasClass&&fn!==jqLiteController?arg1:arg2)===undefined){if(isObject(arg1)){for(i=0;nodeCount>i;i++)if(fn===jqLiteData)fn(this[i],arg1);else for(key in arg1)fn(this[i],key,arg1[key]);return this}for(var value=fn.$dv,jj=value===undefined?Math.min(nodeCount,1):nodeCount,j=0;jj>j;j++){var nodeValue=fn(this[j],arg1,arg2);value=value?value+nodeValue:nodeValue}return value}for(i=0;nodeCount>i;i++)fn(this[i],arg1,arg2);return this}}),forEach({removeData:jqLiteRemoveData,on:function jqLiteOn(element,type,fn,unsupported){if(isDefined(unsupported))throw jqLiteMinErr("onargs","jqLite#on() does not support the `selector` or `eventData` parameters");if(jqLiteAcceptsData(element)){var expandoStore=jqLiteExpandoStore(element,!0),events=expandoStore.events,handle=expandoStore.handle;handle||(handle=expandoStore.handle=createEventHandler(element,events));for(var types=type.indexOf(" ")>=0?type.split(" "):[type],i=types.length;i--;){type=types[i];var eventFns=events[type];eventFns||(events[type]=[],"mouseenter"===type||"mouseleave"===type?jqLiteOn(element,MOUSE_EVENT_MAP[type],function(event){var target=this,related=event.relatedTarget;(!related||related!==target&&!target.contains(related))&&handle(event,type)}):"$destroy"!==type&&addEventListenerFn(element,type,handle),eventFns=events[type]),eventFns.push(fn)}}},off:jqLiteOff,one:function(element,type,fn){element=jqLite(element),element.on(type,function onFn(){element.off(type,fn),element.off(type,onFn)}),element.on(type,fn)},replaceWith:function(element,replaceNode){var index,parent=element.parentNode;jqLiteDealoc(element),forEach(new JQLite(replaceNode),function(node){index?parent.insertBefore(node,index.nextSibling):parent.replaceChild(node,element),index=node})},children:function(element){var children=[];return forEach(element.childNodes,function(element){element.nodeType===NODE_TYPE_ELEMENT&&children.push(element)}),children},contents:function(element){return element.contentDocument||element.childNodes||[]},append:function(element,node){var nodeType=element.nodeType;if(nodeType===NODE_TYPE_ELEMENT||nodeType===NODE_TYPE_DOCUMENT_FRAGMENT){node=new JQLite(node);for(var i=0,ii=node.length;ii>i;i++){var child=node[i];element.appendChild(child)}}},prepend:function(element,node){if(element.nodeType===NODE_TYPE_ELEMENT){var index=element.firstChild;forEach(new JQLite(node),function(child){element.insertBefore(child,index)})}},wrap:function(element,wrapNode){wrapNode=jqLite(wrapNode).eq(0).clone()[0];var parent=element.parentNode;parent&&parent.replaceChild(wrapNode,element),wrapNode.appendChild(element)},remove:jqLiteRemove,detach:function(element){jqLiteRemove(element,!0)},after:function(element,newElement){var index=element,parent=element.parentNode;newElement=new JQLite(newElement);for(var i=0,ii=newElement.length;ii>i;i++){var node=newElement[i];parent.insertBefore(node,index.nextSibling),index=node}},addClass:jqLiteAddClass,removeClass:jqLiteRemoveClass,toggleClass:function(element,selector,condition){selector&&forEach(selector.split(" "),function(className){var classCondition=condition;isUndefined(classCondition)&&(classCondition=!jqLiteHasClass(element,className)),(classCondition?jqLiteAddClass:jqLiteRemoveClass)(element,className)})},parent:function(element){var parent=element.parentNode;return parent&&parent.nodeType!==NODE_TYPE_DOCUMENT_FRAGMENT?parent:null},next:function(element){return element.nextElementSibling},find:function(element,selector){return element.getElementsByTagName?element.getElementsByTagName(selector):[]},clone:jqLiteClone,triggerHandler:function(element,event,extraParameters){var dummyEvent,eventFnsCopy,handlerArgs,eventName=event.type||event,expandoStore=jqLiteExpandoStore(element),events=expandoStore&&expandoStore.events,eventFns=events&&events[eventName];eventFns&&(dummyEvent={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return this.defaultPrevented===!0},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return this.immediatePropagationStopped===!0},stopPropagation:noop,type:eventName,target:element},event.type&&(dummyEvent=extend(dummyEvent,event)),eventFnsCopy=shallowCopy(eventFns),handlerArgs=extraParameters?[dummyEvent].concat(extraParameters):[dummyEvent],forEach(eventFnsCopy,function(fn){dummyEvent.isImmediatePropagationStopped()||fn.apply(element,handlerArgs)}))}},function(fn,name){JQLite.prototype[name]=function(arg1,arg2,arg3){for(var value,i=0,ii=this.length;ii>i;i++)isUndefined(value)?(value=fn(this[i],arg1,arg2,arg3),isDefined(value)&&(value=jqLite(value))):jqLiteAddNodes(value,fn(this[i],arg1,arg2,arg3));return isDefined(value)?value:this},JQLite.prototype.bind=JQLite.prototype.on,JQLite.prototype.unbind=JQLite.prototype.off}),HashMap.prototype={put:function(key,value){this[hashKey(key,this.nextUid)]=value},get:function(key){return this[hashKey(key,this.nextUid)]},remove:function(key){var value=this[key=hashKey(key,this.nextUid)];return delete this[key],value}};var $$HashMapProvider=[function(){this.$get=[function(){return HashMap}]}],FN_ARGS=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,FN_ARG_SPLIT=/,/,FN_ARG=/^\s*(_?)(\S+?)\1\s*$/,STRIP_COMMENTS=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,$injectorMinErr=minErr("$injector");createInjector.$$annotate=annotate;var $animateMinErr=minErr("$animate"),ELEMENT_NODE=1,NG_ANIMATE_CLASSNAME="ng-animate",$$CoreAnimateRunnerProvider=function(){this.$get=["$q","$$rAF",function($q,$$rAF){function AnimateRunner(){}return AnimateRunner.all=noop,AnimateRunner.chain=noop,AnimateRunner.prototype={end:noop,cancel:noop,resume:noop,pause:noop,complete:noop,then:function(pass,fail){return $q(function(resolve){$$rAF(function(){resolve()})}).then(pass,fail)}},AnimateRunner}]},$$CoreAnimateQueueProvider=function(){var postDigestQueue=new HashMap,postDigestElements=[];this.$get=["$$AnimateRunner","$rootScope",function($$AnimateRunner,$rootScope){function addRemoveClassesPostDigest(element,add,remove){var data=postDigestQueue.get(element);data||(postDigestQueue.put(element,data={}),postDigestElements.push(element)),add&&forEach(add.split(" "),function(className){className&&(data[className]=!0)}),remove&&forEach(remove.split(" "),function(className){className&&(data[className]=!1)}),postDigestElements.length>1||$rootScope.$$postDigest(function(){forEach(postDigestElements,function(element){var data=postDigestQueue.get(element);if(data){var existing=splitClasses(element.attr("class")),toAdd="",toRemove="";forEach(data,function(status,className){var hasClass=!!existing[className];status!==hasClass&&(status?toAdd+=(toAdd.length?" ":"")+className:toRemove+=(toRemove.length?" ":"")+className)}),forEach(element,function(elm){toAdd&&jqLiteAddClass(elm,toAdd),toRemove&&jqLiteRemoveClass(elm,toRemove)}),postDigestQueue.remove(element)}}),postDigestElements.length=0})}return{enabled:noop,on:noop,off:noop,pin:noop,push:function(element,event,options,domOperation){return domOperation&&domOperation(),options=options||{},options.from&&element.css(options.from),options.to&&element.css(options.to),(options.addClass||options.removeClass)&&addRemoveClassesPostDigest(element,options.addClass,options.removeClass),new $$AnimateRunner}}}]},$AnimateProvider=["$provide",function($provide){var provider=this;this.$$registeredAnimations=Object.create(null),this.register=function(name,factory){if(name&&"."!==name.charAt(0))throw $animateMinErr("notcsel","Expecting class selector starting with '.' got '{0}'.",name);var key=name+"-animation";provider.$$registeredAnimations[name.substr(1)]=key,$provide.factory(key,factory)},this.classNameFilter=function(expression){if(1===arguments.length&&(this.$$classNameFilter=expression instanceof RegExp?expression:null,this.$$classNameFilter)){var reservedRegex=new RegExp("(\\s+|\\/)"+NG_ANIMATE_CLASSNAME+"(\\s+|\\/)");if(reservedRegex.test(this.$$classNameFilter.toString()))throw $animateMinErr("nongcls",'$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.',NG_ANIMATE_CLASSNAME)}return this.$$classNameFilter},this.$get=["$$animateQueue",function($$animateQueue){function domInsert(element,parentElement,afterElement){if(afterElement){var afterNode=extractElementNode(afterElement);!afterNode||afterNode.parentNode||afterNode.previousElementSibling||(afterElement=null)}afterElement?afterElement.after(element):parentElement.prepend(element)}return{on:$$animateQueue.on,off:$$animateQueue.off,pin:$$animateQueue.pin,enabled:$$animateQueue.enabled,cancel:function(runner){runner.end&&runner.end()
},enter:function(element,parent,after,options){return parent=parent&&jqLite(parent),after=after&&jqLite(after),parent=parent||after.parent(),domInsert(element,parent,after),$$animateQueue.push(element,"enter",prepareAnimateOptions(options))},move:function(element,parent,after,options){return parent=parent&&jqLite(parent),after=after&&jqLite(after),parent=parent||after.parent(),domInsert(element,parent,after),$$animateQueue.push(element,"move",prepareAnimateOptions(options))},leave:function(element,options){return $$animateQueue.push(element,"leave",prepareAnimateOptions(options),function(){element.remove()})},addClass:function(element,className,options){return options=prepareAnimateOptions(options),options.addClass=mergeClasses(options.addclass,className),$$animateQueue.push(element,"addClass",options)},removeClass:function(element,className,options){return options=prepareAnimateOptions(options),options.removeClass=mergeClasses(options.removeClass,className),$$animateQueue.push(element,"removeClass",options)},setClass:function(element,add,remove,options){return options=prepareAnimateOptions(options),options.addClass=mergeClasses(options.addClass,add),options.removeClass=mergeClasses(options.removeClass,remove),$$animateQueue.push(element,"setClass",options)},animate:function(element,from,to,className,options){return options=prepareAnimateOptions(options),options.from=options.from?extend(options.from,from):from,options.to=options.to?extend(options.to,to):to,className=className||"ng-inline-animate",options.tempClasses=mergeClasses(options.tempClasses,className),$$animateQueue.push(element,"animate",options)}}}]}],$compileMinErr=minErr("$compile");$CompileProvider.$inject=["$provide","$$sanitizeUriProvider"];var PREFIX_REGEXP=/^((?:x|data)[\:\-_])/i,$controllerMinErr=minErr("$controller"),CNTRL_REG=/^(\S+)(\s+as\s+(\w+))?$/,APPLICATION_JSON="application/json",CONTENT_TYPE_APPLICATION_JSON={"Content-Type":APPLICATION_JSON+";charset=utf-8"},JSON_START=/^\[|^\{(?!\{)/,JSON_ENDS={"[":/]$/,"{":/}$/},JSON_PROTECTION_PREFIX=/^\)\]\}',?\n/,$interpolateMinErr=angular.$interpolateMinErr=minErr("$interpolate");$interpolateMinErr.throwNoconcat=function(text){throw $interpolateMinErr("noconcat","Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce",text)},$interpolateMinErr.interr=function(text,err){return $interpolateMinErr("interr","Can't interpolate: {0}\n{1}",text,err.toString())};var PATH_MATCH=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,DEFAULT_PORTS={http:80,https:443,ftp:21},$locationMinErr=minErr("$location"),locationPrototype={$$html5:!1,$$replace:!1,absUrl:locationGetter("$$absUrl"),url:function(url){if(isUndefined(url))return this.$$url;var match=PATH_MATCH.exec(url);return(match[1]||""===url)&&this.path(decodeURIComponent(match[1])),(match[2]||match[1]||""===url)&&this.search(match[3]||""),this.hash(match[5]||""),this},protocol:locationGetter("$$protocol"),host:locationGetter("$$host"),port:locationGetter("$$port"),path:locationGetterSetter("$$path",function(path){return path=null!==path?path.toString():"","/"==path.charAt(0)?path:"/"+path}),search:function(search,paramValue){switch(arguments.length){case 0:return this.$$search;case 1:if(isString(search)||isNumber(search))search=search.toString(),this.$$search=parseKeyValue(search);else{if(!isObject(search))throw $locationMinErr("isrcharg","The first argument of the `$location#search()` call must be a string or an object.");search=copy(search,{}),forEach(search,function(value,key){null==value&&delete search[key]}),this.$$search=search}break;default:isUndefined(paramValue)||null===paramValue?delete this.$$search[search]:this.$$search[search]=paramValue}return this.$$compose(),this},hash:locationGetterSetter("$$hash",function(hash){return null!==hash?hash.toString():""}),replace:function(){return this.$$replace=!0,this}};forEach([LocationHashbangInHtml5Url,LocationHashbangUrl,LocationHtml5Url],function(Location){Location.prototype=Object.create(locationPrototype),Location.prototype.state=function(state){if(!arguments.length)return this.$$state;if(Location!==LocationHtml5Url||!this.$$html5)throw $locationMinErr("nostate","History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");return this.$$state=isUndefined(state)?null:state,this}});var $parseMinErr=minErr("$parse"),CALL=Function.prototype.call,APPLY=Function.prototype.apply,BIND=Function.prototype.bind,OPERATORS=createMap();forEach("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(operator){OPERATORS[operator]=!0});var ESCAPE={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},Lexer=function(options){this.options=options};Lexer.prototype={constructor:Lexer,lex:function(text){for(this.text=text,this.index=0,this.tokens=[];this.index<this.text.length;){var ch=this.text.charAt(this.index);if('"'===ch||"'"===ch)this.readString(ch);else if(this.isNumber(ch)||"."===ch&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(ch))this.readIdent();else if(this.is(ch,"(){}[].,;:?"))this.tokens.push({index:this.index,text:ch}),this.index++;else if(this.isWhitespace(ch))this.index++;else{var ch2=ch+this.peek(),ch3=ch2+this.peek(2),op1=OPERATORS[ch],op2=OPERATORS[ch2],op3=OPERATORS[ch3];if(op1||op2||op3){var token=op3?ch3:op2?ch2:ch;this.tokens.push({index:this.index,text:token,operator:!0}),this.index+=token.length}else this.throwError("Unexpected next character ",this.index,this.index+1)}}return this.tokens},is:function(ch,chars){return-1!==chars.indexOf(ch)},peek:function(i){var num=i||1;return this.index+num<this.text.length?this.text.charAt(this.index+num):!1},isNumber:function(ch){return ch>="0"&&"9">=ch&&"string"==typeof ch},isWhitespace:function(ch){return" "===ch||"\r"===ch||"	"===ch||"\n"===ch||""===ch||" "===ch},isIdent:function(ch){return ch>="a"&&"z">=ch||ch>="A"&&"Z">=ch||"_"===ch||"$"===ch},isExpOperator:function(ch){return"-"===ch||"+"===ch||this.isNumber(ch)},throwError:function(error,start,end){end=end||this.index;var colStr=isDefined(start)?"s "+start+"-"+this.index+" ["+this.text.substring(start,end)+"]":" "+end;throw $parseMinErr("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",error,colStr,this.text)},readNumber:function(){for(var number="",start=this.index;this.index<this.text.length;){var ch=lowercase(this.text.charAt(this.index));if("."==ch||this.isNumber(ch))number+=ch;else{var peekCh=this.peek();if("e"==ch&&this.isExpOperator(peekCh))number+=ch;else if(this.isExpOperator(ch)&&peekCh&&this.isNumber(peekCh)&&"e"==number.charAt(number.length-1))number+=ch;else{if(!this.isExpOperator(ch)||peekCh&&this.isNumber(peekCh)||"e"!=number.charAt(number.length-1))break;this.throwError("Invalid exponent")}}this.index++}this.tokens.push({index:start,text:number,constant:!0,value:Number(number)})},readIdent:function(){for(var start=this.index;this.index<this.text.length;){var ch=this.text.charAt(this.index);if(!this.isIdent(ch)&&!this.isNumber(ch))break;this.index++}this.tokens.push({index:start,text:this.text.slice(start,this.index),identifier:!0})},readString:function(quote){var start=this.index;this.index++;for(var string="",rawString=quote,escape=!1;this.index<this.text.length;){var ch=this.text.charAt(this.index);if(rawString+=ch,escape){if("u"===ch){var hex=this.text.substring(this.index+1,this.index+5);hex.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+hex+"]"),this.index+=4,string+=String.fromCharCode(parseInt(hex,16))}else{var rep=ESCAPE[ch];string+=rep||ch}escape=!1}else if("\\"===ch)escape=!0;else{if(ch===quote)return this.index++,this.tokens.push({index:start,text:rawString,constant:!0,value:string}),void 0;string+=ch}this.index++}this.throwError("Unterminated quote",start)}};var AST=function(lexer,options){this.lexer=lexer,this.options=options};AST.Program="Program",AST.ExpressionStatement="ExpressionStatement",AST.AssignmentExpression="AssignmentExpression",AST.ConditionalExpression="ConditionalExpression",AST.LogicalExpression="LogicalExpression",AST.BinaryExpression="BinaryExpression",AST.UnaryExpression="UnaryExpression",AST.CallExpression="CallExpression",AST.MemberExpression="MemberExpression",AST.Identifier="Identifier",AST.Literal="Literal",AST.ArrayExpression="ArrayExpression",AST.Property="Property",AST.ObjectExpression="ObjectExpression",AST.ThisExpression="ThisExpression",AST.NGValueParameter="NGValueParameter",AST.prototype={ast:function(text){this.text=text,this.tokens=this.lexer.lex(text);var value=this.program();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),value},program:function(){for(var body=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&body.push(this.expressionStatement()),!this.expect(";"))return{type:AST.Program,body:body}},expressionStatement:function(){return{type:AST.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var token,left=this.expression();token=this.expect("|");)left=this.filter(left);return left},expression:function(){return this.assignment()},assignment:function(){var result=this.ternary();return this.expect("=")&&(result={type:AST.AssignmentExpression,left:result,right:this.assignment(),operator:"="}),result},ternary:function(){var alternate,consequent,test=this.logicalOR();return this.expect("?")&&(alternate=this.expression(),this.consume(":"))?(consequent=this.expression(),{type:AST.ConditionalExpression,test:test,alternate:alternate,consequent:consequent}):test},logicalOR:function(){for(var left=this.logicalAND();this.expect("||");)left={type:AST.LogicalExpression,operator:"||",left:left,right:this.logicalAND()};return left},logicalAND:function(){for(var left=this.equality();this.expect("&&");)left={type:AST.LogicalExpression,operator:"&&",left:left,right:this.equality()};return left},equality:function(){for(var token,left=this.relational();token=this.expect("==","!=","===","!==");)left={type:AST.BinaryExpression,operator:token.text,left:left,right:this.relational()};return left},relational:function(){for(var token,left=this.additive();token=this.expect("<",">","<=",">=");)left={type:AST.BinaryExpression,operator:token.text,left:left,right:this.additive()};return left},additive:function(){for(var token,left=this.multiplicative();token=this.expect("+","-");)left={type:AST.BinaryExpression,operator:token.text,left:left,right:this.multiplicative()};return left},multiplicative:function(){for(var token,left=this.unary();token=this.expect("*","/","%");)left={type:AST.BinaryExpression,operator:token.text,left:left,right:this.unary()};return left},unary:function(){var token;return(token=this.expect("+","-","!"))?{type:AST.UnaryExpression,operator:token.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var primary;this.expect("(")?(primary=this.filterChain(),this.consume(")")):this.expect("[")?primary=this.arrayDeclaration():this.expect("{")?primary=this.object():this.constants.hasOwnProperty(this.peek().text)?primary=copy(this.constants[this.consume().text]):this.peek().identifier?primary=this.identifier():this.peek().constant?primary=this.constant():this.throwError("not a primary expression",this.peek());for(var next;next=this.expect("(","[",".");)"("===next.text?(primary={type:AST.CallExpression,callee:primary,arguments:this.parseArguments()},this.consume(")")):"["===next.text?(primary={type:AST.MemberExpression,object:primary,property:this.expression(),computed:!0},this.consume("]")):"."===next.text?primary={type:AST.MemberExpression,object:primary,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return primary},filter:function(baseExpression){for(var args=[baseExpression],result={type:AST.CallExpression,callee:this.identifier(),arguments:args,filter:!0};this.expect(":");)args.push(this.expression());return result},parseArguments:function(){var args=[];if(")"!==this.peekToken().text)do args.push(this.expression());while(this.expect(","));return args},identifier:function(){var token=this.consume();return token.identifier||this.throwError("is not a valid identifier",token),{type:AST.Identifier,name:token.text}},constant:function(){return{type:AST.Literal,value:this.consume().value}},arrayDeclaration:function(){var elements=[];if("]"!==this.peekToken().text)do{if(this.peek("]"))break;elements.push(this.expression())}while(this.expect(","));return this.consume("]"),{type:AST.ArrayExpression,elements:elements}},object:function(){var property,properties=[];if("}"!==this.peekToken().text)do{if(this.peek("}"))break;property={type:AST.Property,kind:"init"},this.peek().constant?property.key=this.constant():this.peek().identifier?property.key=this.identifier():this.throwError("invalid key",this.peek()),this.consume(":"),property.value=this.expression(),properties.push(property)}while(this.expect(","));return this.consume("}"),{type:AST.ObjectExpression,properties:properties}},throwError:function(msg,token){throw $parseMinErr("syntax","Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",token.text,msg,token.index+1,this.text,this.text.substring(token.index))},consume:function(e1){if(0===this.tokens.length)throw $parseMinErr("ueoe","Unexpected end of expression: {0}",this.text);var token=this.expect(e1);return token||this.throwError("is unexpected, expecting ["+e1+"]",this.peek()),token},peekToken:function(){if(0===this.tokens.length)throw $parseMinErr("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},peek:function(e1,e2,e3,e4){return this.peekAhead(0,e1,e2,e3,e4)},peekAhead:function(i,e1,e2,e3,e4){if(this.tokens.length>i){var token=this.tokens[i],t=token.text;if(t===e1||t===e2||t===e3||t===e4||!e1&&!e2&&!e3&&!e4)return token}return!1},expect:function(e1,e2,e3,e4){var token=this.peek(e1,e2,e3,e4);return token?(this.tokens.shift(),token):!1},constants:{"true":{type:AST.Literal,value:!0},"false":{type:AST.Literal,value:!1},"null":{type:AST.Literal,value:null},undefined:{type:AST.Literal,value:undefined},"this":{type:AST.ThisExpression}}},ASTCompiler.prototype={compile:function(expression,expensiveChecks){var self=this,ast=this.astBuilder.ast(expression);this.state={nextId:0,filters:{},expensiveChecks:expensiveChecks,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]},findConstantAndWatchExpressions(ast,self.$filter);var assignable,extra="";if(this.stage="assign",assignable=assignableAST(ast)){this.state.computing="assign";var result=this.nextId();this.recurse(assignable,result),extra="fn.assign="+this.generateFunction("assign","s,v,l")}var toWatch=getInputs(ast.body);self.stage="inputs",forEach(toWatch,function(watch,key){var fnKey="fn"+key;self.state[fnKey]={vars:[],body:[],own:{}},self.state.computing=fnKey;var intoId=self.nextId();self.recurse(watch,intoId),self.return_(intoId),self.state.inputs.push(fnKey),watch.watchId=key}),this.state.computing="fn",this.stage="main",this.recurse(ast);var fnString='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+extra+this.watchFns()+"return fn;",fn=new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","ifDefined","plus","text",fnString)(this.$filter,ensureSafeMemberName,ensureSafeObject,ensureSafeFunction,ifDefined,plusFn,expression);return this.state=this.stage=undefined,fn.literal=isLiteral(ast),fn.constant=isConstant(ast),fn},USE:"use",STRICT:"strict",watchFns:function(){var result=[],fns=this.state.inputs,self=this;return forEach(fns,function(name){result.push("var "+name+"="+self.generateFunction(name,"s"))}),fns.length&&result.push("fn.inputs=["+fns.join(",")+"];"),result.join("")},generateFunction:function(name,params){return"function("+params+"){"+this.varsPrefix(name)+this.body(name)+"};"},filterPrefix:function(){var parts=[],self=this;return forEach(this.state.filters,function(id,filter){parts.push(id+"=$filter("+self.escape(filter)+")")}),parts.length?"var "+parts.join(",")+";":""},varsPrefix:function(section){return this.state[section].vars.length?"var "+this.state[section].vars.join(",")+";":""},body:function(section){return this.state[section].body.join("")},recurse:function(ast,intoId,nameId,recursionFn,create,skipWatchIdCheck){var left,right,args,expression,self=this;if(recursionFn=recursionFn||noop,!skipWatchIdCheck&&isDefined(ast.watchId))return intoId=intoId||this.nextId(),this.if_("i",this.lazyAssign(intoId,this.computedMember("i",ast.watchId)),this.lazyRecurse(ast,intoId,nameId,recursionFn,create,!0)),void 0;switch(ast.type){case AST.Program:forEach(ast.body,function(expression,pos){self.recurse(expression.expression,undefined,undefined,function(expr){right=expr}),pos!==ast.body.length-1?self.current().body.push(right,";"):self.return_(right)});break;case AST.Literal:expression=this.escape(ast.value),this.assign(intoId,expression),recursionFn(expression);break;case AST.UnaryExpression:this.recurse(ast.argument,undefined,undefined,function(expr){right=expr}),expression=ast.operator+"("+this.ifDefined(right,0)+")",this.assign(intoId,expression),recursionFn(expression);break;case AST.BinaryExpression:this.recurse(ast.left,undefined,undefined,function(expr){left=expr}),this.recurse(ast.right,undefined,undefined,function(expr){right=expr}),expression="+"===ast.operator?this.plus(left,right):"-"===ast.operator?this.ifDefined(left,0)+ast.operator+this.ifDefined(right,0):"("+left+")"+ast.operator+"("+right+")",this.assign(intoId,expression),recursionFn(expression);break;case AST.LogicalExpression:intoId=intoId||this.nextId(),self.recurse(ast.left,intoId),self.if_("&&"===ast.operator?intoId:self.not(intoId),self.lazyRecurse(ast.right,intoId)),recursionFn(intoId);break;case AST.ConditionalExpression:intoId=intoId||this.nextId(),self.recurse(ast.test,intoId),self.if_(intoId,self.lazyRecurse(ast.alternate,intoId),self.lazyRecurse(ast.consequent,intoId)),recursionFn(intoId);break;case AST.Identifier:intoId=intoId||this.nextId(),nameId&&(nameId.context="inputs"===self.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",ast.name)+"?l:s"),nameId.computed=!1,nameId.name=ast.name),ensureSafeMemberName(ast.name),self.if_("inputs"===self.stage||self.not(self.getHasOwnProperty("l",ast.name)),function(){self.if_("inputs"===self.stage||"s",function(){create&&1!==create&&self.if_(self.not(self.nonComputedMember("s",ast.name)),self.lazyAssign(self.nonComputedMember("s",ast.name),"{}")),self.assign(intoId,self.nonComputedMember("s",ast.name))})},intoId&&self.lazyAssign(intoId,self.nonComputedMember("l",ast.name))),(self.state.expensiveChecks||isPossiblyDangerousMemberName(ast.name))&&self.addEnsureSafeObject(intoId),recursionFn(intoId);break;case AST.MemberExpression:left=nameId&&(nameId.context=this.nextId())||this.nextId(),intoId=intoId||this.nextId(),self.recurse(ast.object,left,undefined,function(){self.if_(self.notNull(left),function(){ast.computed?(right=self.nextId(),self.recurse(ast.property,right),self.addEnsureSafeMemberName(right),create&&1!==create&&self.if_(self.not(self.computedMember(left,right)),self.lazyAssign(self.computedMember(left,right),"{}")),expression=self.ensureSafeObject(self.computedMember(left,right)),self.assign(intoId,expression),nameId&&(nameId.computed=!0,nameId.name=right)):(ensureSafeMemberName(ast.property.name),create&&1!==create&&self.if_(self.not(self.nonComputedMember(left,ast.property.name)),self.lazyAssign(self.nonComputedMember(left,ast.property.name),"{}")),expression=self.nonComputedMember(left,ast.property.name),(self.state.expensiveChecks||isPossiblyDangerousMemberName(ast.property.name))&&(expression=self.ensureSafeObject(expression)),self.assign(intoId,expression),nameId&&(nameId.computed=!1,nameId.name=ast.property.name))},function(){self.assign(intoId,"undefined")}),recursionFn(intoId)},!!create);break;case AST.CallExpression:intoId=intoId||this.nextId(),ast.filter?(right=self.filter(ast.callee.name),args=[],forEach(ast.arguments,function(expr){var argument=self.nextId();self.recurse(expr,argument),args.push(argument)}),expression=right+"("+args.join(",")+")",self.assign(intoId,expression),recursionFn(intoId)):(right=self.nextId(),left={},args=[],self.recurse(ast.callee,right,left,function(){self.if_(self.notNull(right),function(){self.addEnsureSafeFunction(right),forEach(ast.arguments,function(expr){self.recurse(expr,self.nextId(),undefined,function(argument){args.push(self.ensureSafeObject(argument))})}),left.name?(self.state.expensiveChecks||self.addEnsureSafeObject(left.context),expression=self.member(left.context,left.name,left.computed)+"("+args.join(",")+")"):expression=right+"("+args.join(",")+")",expression=self.ensureSafeObject(expression),self.assign(intoId,expression)},function(){self.assign(intoId,"undefined")}),recursionFn(intoId)}));break;case AST.AssignmentExpression:if(right=this.nextId(),left={},!isAssignable(ast.left))throw $parseMinErr("lval","Trying to assing a value to a non l-value");this.recurse(ast.left,undefined,left,function(){self.if_(self.notNull(left.context),function(){self.recurse(ast.right,right),self.addEnsureSafeObject(self.member(left.context,left.name,left.computed)),expression=self.member(left.context,left.name,left.computed)+ast.operator+right,self.assign(intoId,expression),recursionFn(intoId||expression)})},1);break;case AST.ArrayExpression:args=[],forEach(ast.elements,function(expr){self.recurse(expr,self.nextId(),undefined,function(argument){args.push(argument)})}),expression="["+args.join(",")+"]",this.assign(intoId,expression),recursionFn(expression);break;case AST.ObjectExpression:args=[],forEach(ast.properties,function(property){self.recurse(property.value,self.nextId(),undefined,function(expr){args.push(self.escape(property.key.type===AST.Identifier?property.key.name:""+property.key.value)+":"+expr)})}),expression="{"+args.join(",")+"}",this.assign(intoId,expression),recursionFn(expression);break;case AST.ThisExpression:this.assign(intoId,"s"),recursionFn("s");break;case AST.NGValueParameter:this.assign(intoId,"v"),recursionFn("v")}},getHasOwnProperty:function(element,property){var key=element+"."+property,own=this.current().own;return own.hasOwnProperty(key)||(own[key]=this.nextId(!1,element+"&&("+this.escape(property)+" in "+element+")")),own[key]},assign:function(id,value){return id?(this.current().body.push(id,"=",value,";"),id):void 0},filter:function(filterName){return this.state.filters.hasOwnProperty(filterName)||(this.state.filters[filterName]=this.nextId(!0)),this.state.filters[filterName]},ifDefined:function(id,defaultValue){return"ifDefined("+id+","+this.escape(defaultValue)+")"},plus:function(left,right){return"plus("+left+","+right+")"},return_:function(id){this.current().body.push("return ",id,";")},if_:function(test,alternate,consequent){if(test===!0)alternate();else{var body=this.current().body;body.push("if(",test,"){"),alternate(),body.push("}"),consequent&&(body.push("else{"),consequent(),body.push("}"))}},not:function(expression){return"!("+expression+")"},notNull:function(expression){return expression+"!=null"},nonComputedMember:function(left,right){return left+"."+right},computedMember:function(left,right){return left+"["+right+"]"},member:function(left,right,computed){return computed?this.computedMember(left,right):this.nonComputedMember(left,right)},addEnsureSafeObject:function(item){this.current().body.push(this.ensureSafeObject(item),";")},addEnsureSafeMemberName:function(item){this.current().body.push(this.ensureSafeMemberName(item),";")},addEnsureSafeFunction:function(item){this.current().body.push(this.ensureSafeFunction(item),";")},ensureSafeObject:function(item){return"ensureSafeObject("+item+",text)"},ensureSafeMemberName:function(item){return"ensureSafeMemberName("+item+",text)"},ensureSafeFunction:function(item){return"ensureSafeFunction("+item+",text)"},lazyRecurse:function(ast,intoId,nameId,recursionFn,create,skipWatchIdCheck){var self=this;return function(){self.recurse(ast,intoId,nameId,recursionFn,create,skipWatchIdCheck)}},lazyAssign:function(id,value){var self=this;return function(){self.assign(id,value)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(c){return"\\u"+("0000"+c.charCodeAt(0).toString(16)).slice(-4)},escape:function(value){if(isString(value))return"'"+value.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(isNumber(value))return value.toString();if(value===!0)return"true";if(value===!1)return"false";if(null===value)return"null";if("undefined"==typeof value)return"undefined";throw $parseMinErr("esc","IMPOSSIBLE")},nextId:function(skip,init){var id="v"+this.state.nextId++;return skip||this.current().vars.push(id+(init?"="+init:"")),id},current:function(){return this.state[this.state.computing]}},ASTInterpreter.prototype={compile:function(expression,expensiveChecks){var self=this,ast=this.astBuilder.ast(expression);this.expression=expression,this.expensiveChecks=expensiveChecks,findConstantAndWatchExpressions(ast,self.$filter);var assignable,assign;(assignable=assignableAST(ast))&&(assign=this.recurse(assignable));var inputs,toWatch=getInputs(ast.body);toWatch&&(inputs=[],forEach(toWatch,function(watch,key){var input=self.recurse(watch);watch.input=input,inputs.push(input),watch.watchId=key}));var expressions=[];forEach(ast.body,function(expression){expressions.push(self.recurse(expression.expression))});var fn=0===ast.body.length?function(){}:1===ast.body.length?expressions[0]:function(scope,locals){var lastValue;return forEach(expressions,function(exp){lastValue=exp(scope,locals)}),lastValue};return assign&&(fn.assign=function(scope,value,locals){return assign(scope,locals,value)}),inputs&&(fn.inputs=inputs),fn.literal=isLiteral(ast),fn.constant=isConstant(ast),fn},recurse:function(ast,context,create){var left,right,args,self=this;if(ast.input)return this.inputs(ast.input,ast.watchId);switch(ast.type){case AST.Literal:return this.value(ast.value,context);case AST.UnaryExpression:return right=this.recurse(ast.argument),this["unary"+ast.operator](right,context);case AST.BinaryExpression:return left=this.recurse(ast.left),right=this.recurse(ast.right),this["binary"+ast.operator](left,right,context);case AST.LogicalExpression:return left=this.recurse(ast.left),right=this.recurse(ast.right),this["binary"+ast.operator](left,right,context);case AST.ConditionalExpression:return this["ternary?:"](this.recurse(ast.test),this.recurse(ast.alternate),this.recurse(ast.consequent),context);case AST.Identifier:return ensureSafeMemberName(ast.name,self.expression),self.identifier(ast.name,self.expensiveChecks||isPossiblyDangerousMemberName(ast.name),context,create,self.expression);case AST.MemberExpression:return left=this.recurse(ast.object,!1,!!create),ast.computed||(ensureSafeMemberName(ast.property.name,self.expression),right=ast.property.name),ast.computed&&(right=this.recurse(ast.property)),ast.computed?this.computedMember(left,right,context,create,self.expression):this.nonComputedMember(left,right,self.expensiveChecks,context,create,self.expression);case AST.CallExpression:return args=[],forEach(ast.arguments,function(expr){args.push(self.recurse(expr))}),ast.filter&&(right=this.$filter(ast.callee.name)),ast.filter||(right=this.recurse(ast.callee,!0)),ast.filter?function(scope,locals,assign,inputs){for(var values=[],i=0;i<args.length;++i)values.push(args[i](scope,locals,assign,inputs));var value=right.apply(undefined,values,inputs);return context?{context:undefined,name:undefined,value:value}:value}:function(scope,locals,assign,inputs){var value,rhs=right(scope,locals,assign,inputs);if(null!=rhs.value){ensureSafeObject(rhs.context,self.expression),ensureSafeFunction(rhs.value,self.expression);for(var values=[],i=0;i<args.length;++i)values.push(ensureSafeObject(args[i](scope,locals,assign,inputs),self.expression));value=ensureSafeObject(rhs.value.apply(rhs.context,values),self.expression)}return context?{value:value}:value};case AST.AssignmentExpression:return left=this.recurse(ast.left,!0,1),right=this.recurse(ast.right),function(scope,locals,assign,inputs){var lhs=left(scope,locals,assign,inputs),rhs=right(scope,locals,assign,inputs);return ensureSafeObject(lhs.value,self.expression),lhs.context[lhs.name]=rhs,context?{value:rhs}:rhs};case AST.ArrayExpression:return args=[],forEach(ast.elements,function(expr){args.push(self.recurse(expr))}),function(scope,locals,assign,inputs){for(var value=[],i=0;i<args.length;++i)value.push(args[i](scope,locals,assign,inputs));return context?{value:value}:value};case AST.ObjectExpression:return args=[],forEach(ast.properties,function(property){args.push({key:property.key.type===AST.Identifier?property.key.name:""+property.key.value,value:self.recurse(property.value)})}),function(scope,locals,assign,inputs){for(var value={},i=0;i<args.length;++i)value[args[i].key]=args[i].value(scope,locals,assign,inputs);return context?{value:value}:value};case AST.ThisExpression:return function(scope){return context?{value:scope}:scope};case AST.NGValueParameter:return function(scope,locals,assign){return context?{value:assign}:assign}}},"unary+":function(argument,context){return function(scope,locals,assign,inputs){var arg=argument(scope,locals,assign,inputs);return arg=isDefined(arg)?+arg:0,context?{value:arg}:arg}},"unary-":function(argument,context){return function(scope,locals,assign,inputs){var arg=argument(scope,locals,assign,inputs);return arg=isDefined(arg)?-arg:0,context?{value:arg}:arg}},"unary!":function(argument,context){return function(scope,locals,assign,inputs){var arg=!argument(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary+":function(left,right,context){return function(scope,locals,assign,inputs){var lhs=left(scope,locals,assign,inputs),rhs=right(scope,locals,assign,inputs),arg=plusFn(lhs,rhs);return context?{value:arg}:arg}},"binary-":function(left,right,context){return function(scope,locals,assign,inputs){var lhs=left(scope,locals,assign,inputs),rhs=right(scope,locals,assign,inputs),arg=(isDefined(lhs)?lhs:0)-(isDefined(rhs)?rhs:0);return context?{value:arg}:arg}},"binary*":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)*right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary/":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)/right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary%":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)%right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary===":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)===right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary!==":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)!==right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary==":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)==right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary!=":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)!=right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary<":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)<right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary>":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)>right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary<=":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)<=right(scope,locals,assign,inputs);
return context?{value:arg}:arg}},"binary>=":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)>=right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary&&":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)&&right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"binary||":function(left,right,context){return function(scope,locals,assign,inputs){var arg=left(scope,locals,assign,inputs)||right(scope,locals,assign,inputs);return context?{value:arg}:arg}},"ternary?:":function(test,alternate,consequent,context){return function(scope,locals,assign,inputs){var arg=test(scope,locals,assign,inputs)?alternate(scope,locals,assign,inputs):consequent(scope,locals,assign,inputs);return context?{value:arg}:arg}},value:function(value,context){return function(){return context?{context:undefined,name:undefined,value:value}:value}},identifier:function(name,expensiveChecks,context,create,expression){return function(scope,locals){var base=locals&&name in locals?locals:scope;create&&1!==create&&base&&!base[name]&&(base[name]={});var value=base?base[name]:undefined;return expensiveChecks&&ensureSafeObject(value,expression),context?{context:base,name:name,value:value}:value}},computedMember:function(left,right,context,create,expression){return function(scope,locals,assign,inputs){var rhs,value,lhs=left(scope,locals,assign,inputs);return null!=lhs&&(rhs=right(scope,locals,assign,inputs),ensureSafeMemberName(rhs,expression),create&&1!==create&&lhs&&!lhs[rhs]&&(lhs[rhs]={}),value=lhs[rhs],ensureSafeObject(value,expression)),context?{context:lhs,name:rhs,value:value}:value}},nonComputedMember:function(left,right,expensiveChecks,context,create,expression){return function(scope,locals,assign,inputs){var lhs=left(scope,locals,assign,inputs);create&&1!==create&&lhs&&!lhs[right]&&(lhs[right]={});var value=null!=lhs?lhs[right]:undefined;return(expensiveChecks||isPossiblyDangerousMemberName(right))&&ensureSafeObject(value,expression),context?{context:lhs,name:right,value:value}:value}},inputs:function(input,watchId){return function(scope,value,locals,inputs){return inputs?inputs[watchId]:input(scope,value,locals)}}};var Parser=function(lexer,$filter,options){this.lexer=lexer,this.$filter=$filter,this.options=options,this.ast=new AST(this.lexer),this.astCompiler=options.csp?new ASTInterpreter(this.ast,$filter):new ASTCompiler(this.ast,$filter)};Parser.prototype={constructor:Parser,parse:function(text){return this.astCompiler.compile(text,this.options.expensiveChecks)}};var objectValueOf=(createMap(),createMap(),Object.prototype.valueOf),$sceMinErr=minErr("$sce"),SCE_CONTEXTS={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},$compileMinErr=minErr("$compile"),urlParsingNode=document.createElement("a"),originUrl=urlResolve(window.location.href);$$CookieReader.$inject=["$document"],$FilterProvider.$inject=["$provide"],currencyFilter.$inject=["$locale"],numberFilter.$inject=["$locale"];var DECIMAL_SEP=".",DATE_FORMATS={yyyy:dateGetter("FullYear",4),yy:dateGetter("FullYear",2,0,!0),y:dateGetter("FullYear",1),MMMM:dateStrGetter("Month"),MMM:dateStrGetter("Month",!0),MM:dateGetter("Month",2,1),M:dateGetter("Month",1,1),dd:dateGetter("Date",2),d:dateGetter("Date",1),HH:dateGetter("Hours",2),H:dateGetter("Hours",1),hh:dateGetter("Hours",2,-12),h:dateGetter("Hours",1,-12),mm:dateGetter("Minutes",2),m:dateGetter("Minutes",1),ss:dateGetter("Seconds",2),s:dateGetter("Seconds",1),sss:dateGetter("Milliseconds",3),EEEE:dateStrGetter("Day"),EEE:dateStrGetter("Day",!0),a:ampmGetter,Z:timeZoneGetter,ww:weekGetter(2),w:weekGetter(1),G:eraGetter,GG:eraGetter,GGG:eraGetter,GGGG:longEraGetter},DATE_FORMATS_SPLIT=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,NUMBER_STRING=/^\-?\d+$/;dateFilter.$inject=["$locale"];var lowercaseFilter=valueFn(lowercase),uppercaseFilter=valueFn(uppercase);orderByFilter.$inject=["$parse"];var htmlAnchorDirective=valueFn({restrict:"E",compile:function(element,attr){return attr.href||attr.xlinkHref?void 0:function(scope,element){if("a"===element[0].nodeName.toLowerCase()){var href="[object SVGAnimatedString]"===toString.call(element.prop("href"))?"xlink:href":"href";element.on("click",function(event){element.attr(href)||event.preventDefault()})}}}}),ngAttributeAliasDirectives={};forEach(BOOLEAN_ATTR,function(propName,attrName){function defaultLinkFn(scope,element,attr){scope.$watch(attr[normalized],function(value){attr.$set(attrName,!!value)})}if("multiple"!=propName){var normalized=directiveNormalize("ng-"+attrName),linkFn=defaultLinkFn;"checked"===propName&&(linkFn=function(scope,element,attr){attr.ngModel!==attr[normalized]&&defaultLinkFn(scope,element,attr)}),ngAttributeAliasDirectives[normalized]=function(){return{restrict:"A",priority:100,link:linkFn}}}}),forEach(ALIASED_ATTR,function(htmlAttr,ngAttr){ngAttributeAliasDirectives[ngAttr]=function(){return{priority:100,link:function(scope,element,attr){if("ngPattern"===ngAttr&&"/"==attr.ngPattern.charAt(0)){var match=attr.ngPattern.match(REGEX_STRING_REGEXP);if(match)return attr.$set("ngPattern",new RegExp(match[1],match[2])),void 0}scope.$watch(attr[ngAttr],function(value){attr.$set(ngAttr,value)})}}}}),forEach(["src","srcset","href"],function(attrName){var normalized=directiveNormalize("ng-"+attrName);ngAttributeAliasDirectives[normalized]=function(){return{priority:99,link:function(scope,element,attr){var propName=attrName,name=attrName;"href"===attrName&&"[object SVGAnimatedString]"===toString.call(element.prop("href"))&&(name="xlinkHref",attr.$attr[name]="xlink:href",propName=null),attr.$observe(normalized,function(value){return value?(attr.$set(name,value),msie&&propName&&element.prop(propName,attr[name]),void 0):("href"===attrName&&attr.$set(name,null),void 0)})}}}});var nullFormCtrl={$addControl:noop,$$renameControl:nullFormRenameControl,$removeControl:noop,$setValidity:noop,$setDirty:noop,$setPristine:noop,$setSubmitted:noop},SUBMITTED_CLASS="ng-submitted";FormController.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var formDirectiveFactory=function(isNgForm){return["$timeout",function($timeout){var formDirective={name:"form",restrict:isNgForm?"EAC":"E",controller:FormController,compile:function(formElement,attr){formElement.addClass(PRISTINE_CLASS).addClass(VALID_CLASS);var nameAttr=attr.name?"name":isNgForm&&attr.ngForm?"ngForm":!1;return{pre:function(scope,formElement,attr,controller){if(!("action"in attr)){var handleFormSubmission=function(event){scope.$apply(function(){controller.$commitViewValue(),controller.$setSubmitted()}),event.preventDefault()};addEventListenerFn(formElement[0],"submit",handleFormSubmission),formElement.on("$destroy",function(){$timeout(function(){removeEventListenerFn(formElement[0],"submit",handleFormSubmission)},0,!1)})}var parentFormCtrl=controller.$$parentForm;nameAttr&&(setter(scope,controller.$name,controller,controller.$name),attr.$observe(nameAttr,function(newValue){controller.$name!==newValue&&(setter(scope,controller.$name,undefined,controller.$name),parentFormCtrl.$$renameControl(controller,newValue),setter(scope,controller.$name,controller,controller.$name))})),formElement.on("$destroy",function(){parentFormCtrl.$removeControl(controller),nameAttr&&setter(scope,attr[nameAttr],undefined,controller.$name),extend(controller,nullFormCtrl)})}}}};return formDirective}]},formDirective=formDirectiveFactory(),ngFormDirective=formDirectiveFactory(!0),ISO_DATE_REGEXP=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,URL_REGEXP=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,EMAIL_REGEXP=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,NUMBER_REGEXP=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,DATE_REGEXP=/^(\d{4})-(\d{2})-(\d{2})$/,DATETIMELOCAL_REGEXP=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,WEEK_REGEXP=/^(\d{4})-W(\d\d)$/,MONTH_REGEXP=/^(\d{4})-(\d\d)$/,TIME_REGEXP=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,inputType={text:textInputType,date:createDateInputType("date",DATE_REGEXP,createDateParser(DATE_REGEXP,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":createDateInputType("datetimelocal",DATETIMELOCAL_REGEXP,createDateParser(DATETIMELOCAL_REGEXP,["yyyy","MM","dd","HH","mm","ss","sss"]),"yyyy-MM-ddTHH:mm:ss.sss"),time:createDateInputType("time",TIME_REGEXP,createDateParser(TIME_REGEXP,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:createDateInputType("week",WEEK_REGEXP,weekParser,"yyyy-Www"),month:createDateInputType("month",MONTH_REGEXP,createDateParser(MONTH_REGEXP,["yyyy","MM"]),"yyyy-MM"),number:numberInputType,url:urlInputType,email:emailInputType,radio:radioInputType,checkbox:checkboxInputType,hidden:noop,button:noop,submit:noop,reset:noop,file:noop},inputDirective=["$browser","$sniffer","$filter","$parse",function($browser,$sniffer,$filter,$parse){return{restrict:"E",require:["?ngModel"],link:{pre:function(scope,element,attr,ctrls){ctrls[0]&&(inputType[lowercase(attr.type)]||inputType.text)(scope,element,attr,ctrls[0],$sniffer,$browser,$filter,$parse)}}}}],CONSTANT_VALUE_REGEXP=/^(true|false|\d+)$/,ngValueDirective=function(){return{restrict:"A",priority:100,compile:function(tpl,tplAttr){return CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)?function(scope,elm,attr){attr.$set("value",scope.$eval(attr.ngValue))}:function(scope,elm,attr){scope.$watch(attr.ngValue,function(value){attr.$set("value",value)})}}}},ngBindDirective=["$compile",function($compile){return{restrict:"AC",compile:function(templateElement){return $compile.$$addBindingClass(templateElement),function(scope,element,attr){$compile.$$addBindingInfo(element,attr.ngBind),element=element[0],scope.$watch(attr.ngBind,function(value){element.textContent=value===undefined?"":value})}}}}],ngBindTemplateDirective=["$interpolate","$compile",function($interpolate,$compile){return{compile:function(templateElement){return $compile.$$addBindingClass(templateElement),function(scope,element,attr){var interpolateFn=$interpolate(element.attr(attr.$attr.ngBindTemplate));$compile.$$addBindingInfo(element,interpolateFn.expressions),element=element[0],attr.$observe("ngBindTemplate",function(value){element.textContent=value===undefined?"":value})}}}}],ngBindHtmlDirective=["$sce","$parse","$compile",function($sce,$parse,$compile){return{restrict:"A",compile:function(tElement,tAttrs){var ngBindHtmlGetter=$parse(tAttrs.ngBindHtml),ngBindHtmlWatch=$parse(tAttrs.ngBindHtml,function(value){return(value||"").toString()});return $compile.$$addBindingClass(tElement),function(scope,element,attr){$compile.$$addBindingInfo(element,attr.ngBindHtml),scope.$watch(ngBindHtmlWatch,function(){element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope))||"")})}}}}],ngChangeDirective=valueFn({restrict:"A",require:"ngModel",link:function(scope,element,attr,ctrl){ctrl.$viewChangeListeners.push(function(){scope.$eval(attr.ngChange)})}}),ngClassDirective=classDirective("",!0),ngClassOddDirective=classDirective("Odd",0),ngClassEvenDirective=classDirective("Even",1),ngCloakDirective=ngDirective({compile:function(element,attr){attr.$set("ngCloak",undefined),element.removeClass("ng-cloak")}}),ngControllerDirective=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],ngEventDirectives={},forceAsyncEvents={blur:!0,focus:!0};forEach("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(eventName){var directiveName=directiveNormalize("ng-"+eventName);ngEventDirectives[directiveName]=["$parse","$rootScope",function($parse,$rootScope){return{restrict:"A",compile:function($element,attr){var fn=$parse(attr[directiveName],null,!0);return function(scope,element){element.on(eventName,function(event){var callback=function(){fn(scope,{$event:event})};forceAsyncEvents[eventName]&&$rootScope.$$phase?scope.$evalAsync(callback):scope.$apply(callback)})}}}}]});var ngIfDirective=["$animate",function($animate){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function($scope,$element,$attr,ctrl,$transclude){var block,childScope,previousElements;$scope.$watch($attr.ngIf,function(value){value?childScope||$transclude(function(clone,newScope){childScope=newScope,clone[clone.length++]=document.createComment(" end ngIf: "+$attr.ngIf+" "),block={clone:clone},$animate.enter(clone,$element.parent(),$element)}):(previousElements&&(previousElements.remove(),previousElements=null),childScope&&(childScope.$destroy(),childScope=null),block&&(previousElements=getBlockNodes(block.clone),$animate.leave(previousElements).then(function(){previousElements=null}),block=null))})}}}],ngIncludeDirective=["$templateRequest","$anchorScroll","$animate",function($templateRequest,$anchorScroll,$animate){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:angular.noop,compile:function(element,attr){var srcExp=attr.ngInclude||attr.src,onloadExp=attr.onload||"",autoScrollExp=attr.autoscroll;return function(scope,$element,$attr,ctrl,$transclude){var currentScope,previousElement,currentElement,changeCounter=0,cleanupLastIncludeContent=function(){previousElement&&(previousElement.remove(),previousElement=null),currentScope&&(currentScope.$destroy(),currentScope=null),currentElement&&($animate.leave(currentElement).then(function(){previousElement=null}),previousElement=currentElement,currentElement=null)};scope.$watch(srcExp,function(src){var afterAnimation=function(){!isDefined(autoScrollExp)||autoScrollExp&&!scope.$eval(autoScrollExp)||$anchorScroll()},thisChangeId=++changeCounter;src?($templateRequest(src,!0).then(function(response){if(thisChangeId===changeCounter){var newScope=scope.$new();ctrl.template=response;var clone=$transclude(newScope,function(clone){cleanupLastIncludeContent(),$animate.enter(clone,null,$element).then(afterAnimation)});currentScope=newScope,currentElement=clone,currentScope.$emit("$includeContentLoaded",src),scope.$eval(onloadExp)}},function(){thisChangeId===changeCounter&&(cleanupLastIncludeContent(),scope.$emit("$includeContentError",src))}),scope.$emit("$includeContentRequested",src)):(cleanupLastIncludeContent(),ctrl.template=null)})}}}}],ngIncludeFillContentDirective=["$compile",function($compile){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(scope,$element,$attr,ctrl){return/SVG/.test($element[0].toString())?($element.empty(),$compile(jqLiteBuildFragment(ctrl.template,document).childNodes)(scope,function(clone){$element.append(clone)},{futureParentElement:$element}),void 0):($element.html(ctrl.template),$compile($element.contents())(scope),void 0)}}}],ngInitDirective=ngDirective({priority:450,compile:function(){return{pre:function(scope,element,attrs){scope.$eval(attrs.ngInit)}}}}),ngListDirective=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(scope,element,attr,ctrl){var ngList=element.attr(attr.$attr.ngList)||", ",trimValues="false"!==attr.ngTrim,separator=trimValues?trim(ngList):ngList,parse=function(viewValue){if(!isUndefined(viewValue)){var list=[];return viewValue&&forEach(viewValue.split(separator),function(value){value&&list.push(trimValues?trim(value):value)}),list}};ctrl.$parsers.push(parse),ctrl.$formatters.push(function(value){return isArray(value)?value.join(ngList):undefined}),ctrl.$isEmpty=function(value){return!value||!value.length}}}},VALID_CLASS="ng-valid",INVALID_CLASS="ng-invalid",PRISTINE_CLASS="ng-pristine",DIRTY_CLASS="ng-dirty",UNTOUCHED_CLASS="ng-untouched",TOUCHED_CLASS="ng-touched",PENDING_CLASS="ng-pending",$ngModelMinErr=new minErr("ngModel"),NgModelController=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function($scope,$exceptionHandler,$attr,$element,$parse,$animate,$timeout,$rootScope,$q,$interpolate){this.$viewValue=Number.NaN,this.$modelValue=Number.NaN,this.$$rawModelValue=undefined,this.$validators={},this.$asyncValidators={},this.$parsers=[],this.$formatters=[],this.$viewChangeListeners=[],this.$untouched=!0,this.$touched=!1,this.$pristine=!0,this.$dirty=!1,this.$valid=!0,this.$invalid=!1,this.$error={},this.$$success={},this.$pending=undefined,this.$name=$interpolate($attr.name||"",!1)($scope);var parserValid,parsedNgModel=$parse($attr.ngModel),parsedNgModelAssign=parsedNgModel.assign,ngModelGet=parsedNgModel,ngModelSet=parsedNgModelAssign,pendingDebounce=null,ctrl=this;this.$$setOptions=function(options){if(ctrl.$options=options,options&&options.getterSetter){var invokeModelGetter=$parse($attr.ngModel+"()"),invokeModelSetter=$parse($attr.ngModel+"($$$p)");ngModelGet=function($scope){var modelValue=parsedNgModel($scope);return isFunction(modelValue)&&(modelValue=invokeModelGetter($scope)),modelValue},ngModelSet=function($scope){isFunction(parsedNgModel($scope))?invokeModelSetter($scope,{$$$p:ctrl.$modelValue}):parsedNgModelAssign($scope,ctrl.$modelValue)}}else if(!parsedNgModel.assign)throw $ngModelMinErr("nonassign","Expression '{0}' is non-assignable. Element: {1}",$attr.ngModel,startingTag($element))},this.$render=noop,this.$isEmpty=function(value){return isUndefined(value)||""===value||null===value||value!==value};var parentForm=$element.inheritedData("$formController")||nullFormCtrl,currentValidationRunId=0;addSetValidityMethod({ctrl:this,$element:$element,set:function(object,property){object[property]=!0},unset:function(object,property){delete object[property]},parentForm:parentForm,$animate:$animate}),this.$setPristine=function(){ctrl.$dirty=!1,ctrl.$pristine=!0,$animate.removeClass($element,DIRTY_CLASS),$animate.addClass($element,PRISTINE_CLASS)},this.$setDirty=function(){ctrl.$dirty=!0,ctrl.$pristine=!1,$animate.removeClass($element,PRISTINE_CLASS),$animate.addClass($element,DIRTY_CLASS),parentForm.$setDirty()},this.$setUntouched=function(){ctrl.$touched=!1,ctrl.$untouched=!0,$animate.setClass($element,UNTOUCHED_CLASS,TOUCHED_CLASS)},this.$setTouched=function(){ctrl.$touched=!0,ctrl.$untouched=!1,$animate.setClass($element,TOUCHED_CLASS,UNTOUCHED_CLASS)},this.$rollbackViewValue=function(){$timeout.cancel(pendingDebounce),ctrl.$viewValue=ctrl.$$lastCommittedViewValue,ctrl.$render()},this.$validate=function(){if(!isNumber(ctrl.$modelValue)||!isNaN(ctrl.$modelValue)){var viewValue=ctrl.$$lastCommittedViewValue,modelValue=ctrl.$$rawModelValue,prevValid=ctrl.$valid,prevModelValue=ctrl.$modelValue,allowInvalid=ctrl.$options&&ctrl.$options.allowInvalid;ctrl.$$runValidators(modelValue,viewValue,function(allValid){allowInvalid||prevValid===allValid||(ctrl.$modelValue=allValid?modelValue:undefined,ctrl.$modelValue!==prevModelValue&&ctrl.$$writeModelToScope())})}},this.$$runValidators=function(modelValue,viewValue,doneCallback){function processParseErrors(){var errorKey=ctrl.$$parserName||"parse";return parserValid!==undefined?(parserValid||(forEach(ctrl.$validators,function(v,name){setValidity(name,null)}),forEach(ctrl.$asyncValidators,function(v,name){setValidity(name,null)})),setValidity(errorKey,parserValid),parserValid):(setValidity(errorKey,null),!0)}function processSyncValidators(){var syncValidatorsValid=!0;return forEach(ctrl.$validators,function(validator,name){var result=validator(modelValue,viewValue);syncValidatorsValid=syncValidatorsValid&&result,setValidity(name,result)}),syncValidatorsValid?!0:(forEach(ctrl.$asyncValidators,function(v,name){setValidity(name,null)}),!1)}function processAsyncValidators(){var validatorPromises=[],allValid=!0;forEach(ctrl.$asyncValidators,function(validator,name){var promise=validator(modelValue,viewValue);if(!isPromiseLike(promise))throw $ngModelMinErr("$asyncValidators","Expected asynchronous validator to return a promise but got '{0}' instead.",promise);setValidity(name,undefined),validatorPromises.push(promise.then(function(){setValidity(name,!0)},function(){allValid=!1,setValidity(name,!1)}))}),validatorPromises.length?$q.all(validatorPromises).then(function(){validationDone(allValid)},noop):validationDone(!0)}function setValidity(name,isValid){localValidationRunId===currentValidationRunId&&ctrl.$setValidity(name,isValid)}function validationDone(allValid){localValidationRunId===currentValidationRunId&&doneCallback(allValid)}currentValidationRunId++;var localValidationRunId=currentValidationRunId;return processParseErrors()?processSyncValidators()?(processAsyncValidators(),void 0):(validationDone(!1),void 0):(validationDone(!1),void 0)},this.$commitViewValue=function(){var viewValue=ctrl.$viewValue;$timeout.cancel(pendingDebounce),(ctrl.$$lastCommittedViewValue!==viewValue||""===viewValue&&ctrl.$$hasNativeValidators)&&(ctrl.$$lastCommittedViewValue=viewValue,ctrl.$pristine&&this.$setDirty(),this.$$parseAndValidate())},this.$$parseAndValidate=function(){function writeToModelIfNeeded(){ctrl.$modelValue!==prevModelValue&&ctrl.$$writeModelToScope()}var viewValue=ctrl.$$lastCommittedViewValue,modelValue=viewValue;if(parserValid=isUndefined(modelValue)?undefined:!0)for(var i=0;i<ctrl.$parsers.length;i++)if(modelValue=ctrl.$parsers[i](modelValue),isUndefined(modelValue)){parserValid=!1;break}isNumber(ctrl.$modelValue)&&isNaN(ctrl.$modelValue)&&(ctrl.$modelValue=ngModelGet($scope));var prevModelValue=ctrl.$modelValue,allowInvalid=ctrl.$options&&ctrl.$options.allowInvalid;ctrl.$$rawModelValue=modelValue,allowInvalid&&(ctrl.$modelValue=modelValue,writeToModelIfNeeded()),ctrl.$$runValidators(modelValue,ctrl.$$lastCommittedViewValue,function(allValid){allowInvalid||(ctrl.$modelValue=allValid?modelValue:undefined,writeToModelIfNeeded())})},this.$$writeModelToScope=function(){ngModelSet($scope,ctrl.$modelValue),forEach(ctrl.$viewChangeListeners,function(listener){try{listener()}catch(e){$exceptionHandler(e)}})},this.$setViewValue=function(value,trigger){ctrl.$viewValue=value,(!ctrl.$options||ctrl.$options.updateOnDefault)&&ctrl.$$debounceViewValueCommit(trigger)},this.$$debounceViewValueCommit=function(trigger){var debounce,debounceDelay=0,options=ctrl.$options;options&&isDefined(options.debounce)&&(debounce=options.debounce,isNumber(debounce)?debounceDelay=debounce:isNumber(debounce[trigger])?debounceDelay=debounce[trigger]:isNumber(debounce["default"])&&(debounceDelay=debounce["default"])),$timeout.cancel(pendingDebounce),debounceDelay?pendingDebounce=$timeout(function(){ctrl.$commitViewValue()},debounceDelay):$rootScope.$$phase?ctrl.$commitViewValue():$scope.$apply(function(){ctrl.$commitViewValue()})},$scope.$watch(function(){var modelValue=ngModelGet($scope);if(modelValue!==ctrl.$modelValue&&(ctrl.$modelValue===ctrl.$modelValue||modelValue===modelValue)){ctrl.$modelValue=ctrl.$$rawModelValue=modelValue,parserValid=undefined;for(var formatters=ctrl.$formatters,idx=formatters.length,viewValue=modelValue;idx--;)viewValue=formatters[idx](viewValue);ctrl.$viewValue!==viewValue&&(ctrl.$viewValue=ctrl.$$lastCommittedViewValue=viewValue,ctrl.$render(),ctrl.$$runValidators(modelValue,viewValue,noop))}return modelValue})}],ngModelDirective=["$rootScope",function($rootScope){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:NgModelController,priority:1,compile:function(element){return element.addClass(PRISTINE_CLASS).addClass(UNTOUCHED_CLASS).addClass(VALID_CLASS),{pre:function(scope,element,attr,ctrls){var modelCtrl=ctrls[0],formCtrl=ctrls[1]||nullFormCtrl;modelCtrl.$$setOptions(ctrls[2]&&ctrls[2].$options),formCtrl.$addControl(modelCtrl),attr.$observe("name",function(newValue){modelCtrl.$name!==newValue&&formCtrl.$$renameControl(modelCtrl,newValue)}),scope.$on("$destroy",function(){formCtrl.$removeControl(modelCtrl)})},post:function(scope,element,attr,ctrls){var modelCtrl=ctrls[0];modelCtrl.$options&&modelCtrl.$options.updateOn&&element.on(modelCtrl.$options.updateOn,function(ev){modelCtrl.$$debounceViewValueCommit(ev&&ev.type)}),element.on("blur",function(){modelCtrl.$touched||($rootScope.$$phase?scope.$evalAsync(modelCtrl.$setTouched):scope.$apply(modelCtrl.$setTouched))})}}}}}],DEFAULT_REGEXP=/(\s+|^)default(\s+|$)/,ngModelOptionsDirective=function(){return{restrict:"A",controller:["$scope","$attrs",function($scope,$attrs){var that=this;this.$options=copy($scope.$eval($attrs.ngModelOptions)),this.$options.updateOn!==undefined?(this.$options.updateOnDefault=!1,this.$options.updateOn=trim(this.$options.updateOn.replace(DEFAULT_REGEXP,function(){return that.$options.updateOnDefault=!0," "}))):this.$options.updateOnDefault=!0}]}},ngNonBindableDirective=ngDirective({terminal:!0,priority:1e3}),ngOptionsMinErr=minErr("ngOptions"),NG_OPTIONS_REGEXP=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,ngOptionsDirective=["$compile","$parse",function($compile,$parse){function parseOptionsExpression(optionsExp,selectElement,scope){function Option(selectValue,viewValue,label,group,disabled){this.selectValue=selectValue,this.viewValue=viewValue,this.label=label,this.group=group,this.disabled=disabled}function getOptionValuesKeys(optionValues){var optionValuesKeys;if(!keyName&&isArrayLike(optionValues))optionValuesKeys=optionValues;else{optionValuesKeys=[];for(var itemKey in optionValues)optionValues.hasOwnProperty(itemKey)&&"$"!==itemKey.charAt(0)&&optionValuesKeys.push(itemKey)}return optionValuesKeys}var match=optionsExp.match(NG_OPTIONS_REGEXP);if(!match)throw ngOptionsMinErr("iexp","Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}",optionsExp,startingTag(selectElement));var valueName=match[5]||match[7],keyName=match[6],selectAs=/ as /.test(match[0])&&match[1],trackBy=match[9],valueFn=$parse(match[2]?match[1]:valueName),selectAsFn=selectAs&&$parse(selectAs),viewValueFn=selectAsFn||valueFn,trackByFn=trackBy&&$parse(trackBy),getTrackByValueFn=trackBy?function(value,locals){return trackByFn(scope,locals)}:function(value){return hashKey(value)},getTrackByValue=function(value,key){return getTrackByValueFn(value,getLocals(value,key))},displayFn=$parse(match[2]||match[1]),groupByFn=$parse(match[3]||""),disableWhenFn=$parse(match[4]||""),valuesFn=$parse(match[8]),locals={},getLocals=keyName?function(value,key){return locals[keyName]=key,locals[valueName]=value,locals}:function(value){return locals[valueName]=value,locals};return{trackBy:trackBy,getTrackByValue:getTrackByValue,getWatchables:$parse(valuesFn,function(optionValues){var watchedArray=[];optionValues=optionValues||[];for(var optionValuesKeys=getOptionValuesKeys(optionValues),optionValuesLength=optionValuesKeys.length,index=0;optionValuesLength>index;index++){var key=optionValues===optionValuesKeys?index:optionValuesKeys[index],locals=(optionValues[key],getLocals(optionValues[key],key)),selectValue=getTrackByValueFn(optionValues[key],locals);if(watchedArray.push(selectValue),match[2]||match[1]){var label=displayFn(scope,locals);watchedArray.push(label)}if(match[4]){var disableWhen=disableWhenFn(scope,locals);watchedArray.push(disableWhen)}}return watchedArray}),getOptions:function(){for(var optionItems=[],selectValueMap={},optionValues=valuesFn(scope)||[],optionValuesKeys=getOptionValuesKeys(optionValues),optionValuesLength=optionValuesKeys.length,index=0;optionValuesLength>index;index++){var key=optionValues===optionValuesKeys?index:optionValuesKeys[index],value=optionValues[key],locals=getLocals(value,key),viewValue=viewValueFn(scope,locals),selectValue=getTrackByValueFn(viewValue,locals),label=displayFn(scope,locals),group=groupByFn(scope,locals),disabled=disableWhenFn(scope,locals),optionItem=new Option(selectValue,viewValue,label,group,disabled);optionItems.push(optionItem),selectValueMap[selectValue]=optionItem}return{items:optionItems,selectValueMap:selectValueMap,getOptionFromViewValue:function(value){return selectValueMap[getTrackByValue(value)]},getViewValueFromOption:function(option){return trackBy?angular.copy(option.viewValue):option.viewValue}}}}}var optionTemplate=document.createElement("option"),optGroupTemplate=document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:function(scope,selectElement,attr,ctrls){function updateOptionElement(option,element){option.element=element,element.disabled=option.disabled,option.value!==element.value&&(element.value=option.selectValue),option.label!==element.label&&(element.label=option.label,element.textContent=option.label)}function addOrReuseElement(parent,current,type,templateElement){var element;return current&&lowercase(current.nodeName)===type?element=current:(element=templateElement.cloneNode(!1),current?parent.insertBefore(element,current):parent.appendChild(element)),element}function removeExcessElements(current){for(var next;current;)next=current.nextSibling,jqLiteRemove(current),current=next}function skipEmptyAndUnknownOptions(current){var emptyOption_=emptyOption&&emptyOption[0],unknownOption_=unknownOption&&unknownOption[0];if(emptyOption_||unknownOption_)for(;current&&(current===emptyOption_||current===unknownOption_);)current=current.nextSibling;return current}function updateOptions(){var previousValue=options&&selectCtrl.readValue();options=ngOptions.getOptions();var groupMap={},currentElement=selectElement[0].firstChild;if(providedEmptyOption&&selectElement.prepend(emptyOption),currentElement=skipEmptyAndUnknownOptions(currentElement),options.items.forEach(function(option){var group,groupElement,optionElement;option.group?(group=groupMap[option.group],group||(groupElement=addOrReuseElement(selectElement[0],currentElement,"optgroup",optGroupTemplate),currentElement=groupElement.nextSibling,groupElement.label=option.group,group=groupMap[option.group]={groupElement:groupElement,currentOptionElement:groupElement.firstChild}),optionElement=addOrReuseElement(group.groupElement,group.currentOptionElement,"option",optionTemplate),updateOptionElement(option,optionElement),group.currentOptionElement=optionElement.nextSibling):(optionElement=addOrReuseElement(selectElement[0],currentElement,"option",optionTemplate),updateOptionElement(option,optionElement),currentElement=optionElement.nextSibling)}),Object.keys(groupMap).forEach(function(key){removeExcessElements(groupMap[key].currentOptionElement)}),removeExcessElements(currentElement),ngModelCtrl.$render(),!ngModelCtrl.$isEmpty(previousValue)){var nextValue=selectCtrl.readValue();(ngOptions.trackBy?equals(previousValue,nextValue):previousValue===nextValue)||(ngModelCtrl.$setViewValue(nextValue),ngModelCtrl.$render())}}var ngModelCtrl=ctrls[1];if(ngModelCtrl){for(var emptyOption,selectCtrl=ctrls[0],multiple=attr.multiple,i=0,children=selectElement.children(),ii=children.length;ii>i;i++)if(""===children[i].value){emptyOption=children.eq(i);break}var providedEmptyOption=!!emptyOption,unknownOption=jqLite(optionTemplate.cloneNode(!1));unknownOption.val("?");var options,ngOptions=parseOptionsExpression(attr.ngOptions,selectElement,scope),renderEmptyOption=function(){providedEmptyOption||selectElement.prepend(emptyOption),selectElement.val(""),emptyOption.prop("selected",!0),emptyOption.attr("selected",!0)},removeEmptyOption=function(){providedEmptyOption||emptyOption.remove()},renderUnknownOption=function(){selectElement.prepend(unknownOption),selectElement.val("?"),unknownOption.prop("selected",!0),unknownOption.attr("selected",!0)},removeUnknownOption=function(){unknownOption.remove()};multiple?(ngModelCtrl.$isEmpty=function(value){return!value||0===value.length},selectCtrl.writeValue=function(value){options.items.forEach(function(option){option.element.selected=!1}),value&&value.forEach(function(item){var option=options.getOptionFromViewValue(item);option&&!option.disabled&&(option.element.selected=!0)
})},selectCtrl.readValue=function(){var selectedValues=selectElement.val()||[],selections=[];return forEach(selectedValues,function(value){var option=options.selectValueMap[value];option.disabled||selections.push(options.getViewValueFromOption(option))}),selections},ngOptions.trackBy&&scope.$watchCollection(function(){return isArray(ngModelCtrl.$viewValue)?ngModelCtrl.$viewValue.map(function(value){return ngOptions.getTrackByValue(value)}):void 0},function(){ngModelCtrl.$render()})):(selectCtrl.writeValue=function(value){var option=options.getOptionFromViewValue(value);option&&!option.disabled?selectElement[0].value!==option.selectValue&&(removeUnknownOption(),removeEmptyOption(),selectElement[0].value=option.selectValue,option.element.selected=!0,option.element.setAttribute("selected","selected")):null===value||providedEmptyOption?(removeUnknownOption(),renderEmptyOption()):(removeEmptyOption(),renderUnknownOption())},selectCtrl.readValue=function(){var selectedOption=options.selectValueMap[selectElement.val()];return selectedOption&&!selectedOption.disabled?(removeEmptyOption(),removeUnknownOption(),options.getViewValueFromOption(selectedOption)):null},ngOptions.trackBy&&scope.$watch(function(){return ngOptions.getTrackByValue(ngModelCtrl.$viewValue)},function(){ngModelCtrl.$render()})),providedEmptyOption?(emptyOption.remove(),$compile(emptyOption)(scope),emptyOption.removeClass("ng-scope")):emptyOption=jqLite(optionTemplate.cloneNode(!1)),updateOptions(),scope.$watchCollection(ngOptions.getWatchables,updateOptions)}}}}],ngPluralizeDirective=["$locale","$interpolate","$log",function($locale,$interpolate,$log){var BRACE=/{}/g,IS_WHEN=/^when(Minus)?(.+)$/;return{link:function(scope,element,attr){function updateElementText(newText){element.text(newText||"")}var lastCount,numberExp=attr.count,whenExp=attr.$attr.when&&element.attr(attr.$attr.when),offset=attr.offset||0,whens=scope.$eval(whenExp)||{},whensExpFns={},startSymbol=$interpolate.startSymbol(),endSymbol=$interpolate.endSymbol(),braceReplacement=startSymbol+numberExp+"-"+offset+endSymbol,watchRemover=angular.noop;forEach(attr,function(expression,attributeName){var tmpMatch=IS_WHEN.exec(attributeName);if(tmpMatch){var whenKey=(tmpMatch[1]?"-":"")+lowercase(tmpMatch[2]);whens[whenKey]=element.attr(attr.$attr[attributeName])}}),forEach(whens,function(expression,key){whensExpFns[key]=$interpolate(expression.replace(BRACE,braceReplacement))}),scope.$watch(numberExp,function(newVal){var count=parseFloat(newVal),countIsNaN=isNaN(count);if(countIsNaN||count in whens||(count=$locale.pluralCat(count-offset)),count!==lastCount&&!(countIsNaN&&isNumber(lastCount)&&isNaN(lastCount))){watchRemover();var whenExpFn=whensExpFns[count];isUndefined(whenExpFn)?(null!=newVal&&$log.debug("ngPluralize: no rule defined for '"+count+"' in "+whenExp),watchRemover=noop,updateElementText()):watchRemover=scope.$watch(whenExpFn,updateElementText),lastCount=count}})}}}],ngRepeatDirective=["$parse","$animate",function($parse,$animate){var NG_REMOVED="$$NG_REMOVED",ngRepeatMinErr=minErr("ngRepeat"),updateScope=function(scope,index,valueIdentifier,value,keyIdentifier,key,arrayLength){scope[valueIdentifier]=value,keyIdentifier&&(scope[keyIdentifier]=key),scope.$index=index,scope.$first=0===index,scope.$last=index===arrayLength-1,scope.$middle=!(scope.$first||scope.$last),scope.$odd=!(scope.$even=0===(1&index))},getBlockStart=function(block){return block.clone[0]},getBlockEnd=function(block){return block.clone[block.clone.length-1]};return{restrict:"A",multiElement:!0,transclude:"element",priority:1e3,terminal:!0,$$tlb:!0,compile:function($element,$attr){var expression=$attr.ngRepeat,ngRepeatEndComment=document.createComment(" end ngRepeat: "+expression+" "),match=expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!match)throw ngRepeatMinErr("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",expression);var lhs=match[1],rhs=match[2],aliasAs=match[3],trackByExp=match[4];if(match=lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/),!match)throw ngRepeatMinErr("iidexp","'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",lhs);var valueIdentifier=match[3]||match[1],keyIdentifier=match[2];if(aliasAs&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs)))throw ngRepeatMinErr("badident","alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.",aliasAs);var trackByExpGetter,trackByIdExpFn,trackByIdArrayFn,trackByIdObjFn,hashFnLocals={$id:hashKey};return trackByExp?trackByExpGetter=$parse(trackByExp):(trackByIdArrayFn=function(key,value){return hashKey(value)},trackByIdObjFn=function(key){return key}),function($scope,$element,$attr,ctrl,$transclude){trackByExpGetter&&(trackByIdExpFn=function(key,value,index){return keyIdentifier&&(hashFnLocals[keyIdentifier]=key),hashFnLocals[valueIdentifier]=value,hashFnLocals.$index=index,trackByExpGetter($scope,hashFnLocals)});var lastBlockMap=createMap();$scope.$watchCollection(rhs,function(collection){var index,length,nextNode,collectionLength,key,value,trackById,trackByIdFn,collectionKeys,block,nextBlockOrder,elementsToRemove,previousNode=$element[0],nextBlockMap=createMap();if(aliasAs&&($scope[aliasAs]=collection),isArrayLike(collection))collectionKeys=collection,trackByIdFn=trackByIdExpFn||trackByIdArrayFn;else{trackByIdFn=trackByIdExpFn||trackByIdObjFn,collectionKeys=[];for(var itemKey in collection)collection.hasOwnProperty(itemKey)&&"$"!==itemKey.charAt(0)&&collectionKeys.push(itemKey)}for(collectionLength=collectionKeys.length,nextBlockOrder=new Array(collectionLength),index=0;collectionLength>index;index++)if(key=collection===collectionKeys?index:collectionKeys[index],value=collection[key],trackById=trackByIdFn(key,value,index),lastBlockMap[trackById])block=lastBlockMap[trackById],delete lastBlockMap[trackById],nextBlockMap[trackById]=block,nextBlockOrder[index]=block;else{if(nextBlockMap[trackById])throw forEach(nextBlockOrder,function(block){block&&block.scope&&(lastBlockMap[block.id]=block)}),ngRepeatMinErr("dupes","Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}",expression,trackById,value);nextBlockOrder[index]={id:trackById,scope:undefined,clone:undefined},nextBlockMap[trackById]=!0}for(var blockKey in lastBlockMap){if(block=lastBlockMap[blockKey],elementsToRemove=getBlockNodes(block.clone),$animate.leave(elementsToRemove),elementsToRemove[0].parentNode)for(index=0,length=elementsToRemove.length;length>index;index++)elementsToRemove[index][NG_REMOVED]=!0;block.scope.$destroy()}for(index=0;collectionLength>index;index++)if(key=collection===collectionKeys?index:collectionKeys[index],value=collection[key],block=nextBlockOrder[index],block.scope){nextNode=previousNode;do nextNode=nextNode.nextSibling;while(nextNode&&nextNode[NG_REMOVED]);getBlockStart(block)!=nextNode&&$animate.move(getBlockNodes(block.clone),null,jqLite(previousNode)),previousNode=getBlockEnd(block),updateScope(block.scope,index,valueIdentifier,value,keyIdentifier,key,collectionLength)}else $transclude(function(clone,scope){block.scope=scope;var endNode=ngRepeatEndComment.cloneNode(!1);clone[clone.length++]=endNode,$animate.enter(clone,null,jqLite(previousNode)),previousNode=endNode,block.clone=clone,nextBlockMap[block.id]=block,updateScope(block.scope,index,valueIdentifier,value,keyIdentifier,key,collectionLength)});lastBlockMap=nextBlockMap})}}}}],NG_HIDE_CLASS="ng-hide",NG_HIDE_IN_PROGRESS_CLASS="ng-hide-animate",ngShowDirective=["$animate",function($animate){return{restrict:"A",multiElement:!0,link:function(scope,element,attr){scope.$watch(attr.ngShow,function(value){$animate[value?"removeClass":"addClass"](element,NG_HIDE_CLASS,{tempClasses:NG_HIDE_IN_PROGRESS_CLASS})})}}}],ngHideDirective=["$animate",function($animate){return{restrict:"A",multiElement:!0,link:function(scope,element,attr){scope.$watch(attr.ngHide,function(value){$animate[value?"addClass":"removeClass"](element,NG_HIDE_CLASS,{tempClasses:NG_HIDE_IN_PROGRESS_CLASS})})}}}],ngStyleDirective=ngDirective(function(scope,element,attr){scope.$watch(attr.ngStyle,function(newStyles,oldStyles){oldStyles&&newStyles!==oldStyles&&forEach(oldStyles,function(val,style){element.css(style,"")}),newStyles&&element.css(newStyles)},!0)}),ngSwitchDirective=["$animate",function($animate){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(scope,element,attr,ngSwitchController){var watchExpr=attr.ngSwitch||attr.on,selectedTranscludes=[],selectedElements=[],previousLeaveAnimations=[],selectedScopes=[],spliceFactory=function(array,index){return function(){array.splice(index,1)}};scope.$watch(watchExpr,function(value){var i,ii;for(i=0,ii=previousLeaveAnimations.length;ii>i;++i)$animate.cancel(previousLeaveAnimations[i]);for(previousLeaveAnimations.length=0,i=0,ii=selectedScopes.length;ii>i;++i){var selected=getBlockNodes(selectedElements[i].clone);selectedScopes[i].$destroy();var promise=previousLeaveAnimations[i]=$animate.leave(selected);promise.then(spliceFactory(previousLeaveAnimations,i))}selectedElements.length=0,selectedScopes.length=0,(selectedTranscludes=ngSwitchController.cases["!"+value]||ngSwitchController.cases["?"])&&forEach(selectedTranscludes,function(selectedTransclude){selectedTransclude.transclude(function(caseElement,selectedScope){selectedScopes.push(selectedScope);var anchor=selectedTransclude.element;caseElement[caseElement.length++]=document.createComment(" end ngSwitchWhen: ");var block={clone:caseElement};selectedElements.push(block),$animate.enter(caseElement,anchor.parent(),anchor)})})})}}}],ngSwitchWhenDirective=ngDirective({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(scope,element,attrs,ctrl,$transclude){ctrl.cases["!"+attrs.ngSwitchWhen]=ctrl.cases["!"+attrs.ngSwitchWhen]||[],ctrl.cases["!"+attrs.ngSwitchWhen].push({transclude:$transclude,element:element})}}),ngSwitchDefaultDirective=ngDirective({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(scope,element,attr,ctrl,$transclude){ctrl.cases["?"]=ctrl.cases["?"]||[],ctrl.cases["?"].push({transclude:$transclude,element:element})}}),ngTranscludeDirective=ngDirective({restrict:"EAC",link:function($scope,$element,$attrs,controller,$transclude){if(!$transclude)throw minErr("ngTransclude")("orphan","Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}",startingTag($element));$transclude(function(clone){$element.empty(),$element.append(clone)})}}),scriptDirective=["$templateCache",function($templateCache){return{restrict:"E",terminal:!0,compile:function(element,attr){if("text/ng-template"==attr.type){var templateUrl=attr.id,text=element[0].text;$templateCache.put(templateUrl,text)}}}}],noopNgModelController={$setViewValue:noop,$render:noop},SelectController=["$element","$scope","$attrs",function($element,$scope){var self=this,optionsMap=new HashMap;self.ngModelCtrl=noopNgModelController,self.unknownOption=jqLite(document.createElement("option")),self.renderUnknownOption=function(val){var unknownVal="? "+hashKey(val)+" ?";self.unknownOption.val(unknownVal),$element.prepend(self.unknownOption),$element.val(unknownVal)},$scope.$on("$destroy",function(){self.renderUnknownOption=noop}),self.removeUnknownOption=function(){self.unknownOption.parent()&&self.unknownOption.remove()},self.readValue=function(){return self.removeUnknownOption(),$element.val()},self.writeValue=function(value){self.hasOption(value)?(self.removeUnknownOption(),$element.val(value),""===value&&self.emptyOption.prop("selected",!0)):null==value&&self.emptyOption?(self.removeUnknownOption(),$element.val("")):self.renderUnknownOption(value)},self.addOption=function(value,element){assertNotHasOwnProperty(value,'"option value"'),""===value&&(self.emptyOption=element);var count=optionsMap.get(value)||0;optionsMap.put(value,count+1)},self.removeOption=function(value){var count=optionsMap.get(value);count&&(1===count?(optionsMap.remove(value),""===value&&(self.emptyOption=undefined)):optionsMap.put(value,count-1))},self.hasOption=function(value){return!!optionsMap.get(value)}}],selectDirective=function(){return{restrict:"E",require:["select","?ngModel"],controller:SelectController,link:function(scope,element,attr,ctrls){var ngModelCtrl=ctrls[1];if(ngModelCtrl){var selectCtrl=ctrls[0];if(selectCtrl.ngModelCtrl=ngModelCtrl,ngModelCtrl.$render=function(){selectCtrl.writeValue(ngModelCtrl.$viewValue)},element.on("change",function(){scope.$apply(function(){ngModelCtrl.$setViewValue(selectCtrl.readValue())})}),attr.multiple){selectCtrl.readValue=function(){var array=[];return forEach(element.find("option"),function(option){option.selected&&array.push(option.value)}),array},selectCtrl.writeValue=function(value){var items=new HashMap(value);forEach(element.find("option"),function(option){option.selected=isDefined(items.get(option.value))})};var lastView,lastViewRef=0/0;scope.$watch(function(){lastViewRef!==ngModelCtrl.$viewValue||equals(lastView,ngModelCtrl.$viewValue)||(lastView=shallowCopy(ngModelCtrl.$viewValue),ngModelCtrl.$render()),lastViewRef=ngModelCtrl.$viewValue}),ngModelCtrl.$isEmpty=function(value){return!value||0===value.length}}}}}},optionDirective=["$interpolate",function($interpolate){function chromeHack(optionElement){optionElement[0].hasAttribute("selected")&&(optionElement[0].selected=!0)}return{restrict:"E",priority:100,compile:function(element,attr){if(isUndefined(attr.value)){var interpolateFn=$interpolate(element.text(),!0);interpolateFn||attr.$set("value",element.text())}return function(scope,element,attr){var selectCtrlName="$selectController",parent=element.parent(),selectCtrl=parent.data(selectCtrlName)||parent.parent().data(selectCtrlName);selectCtrl&&selectCtrl.ngModelCtrl&&(interpolateFn?scope.$watch(interpolateFn,function(newVal,oldVal){attr.$set("value",newVal),oldVal!==newVal&&selectCtrl.removeOption(oldVal),selectCtrl.addOption(newVal,element),selectCtrl.ngModelCtrl.$render(),chromeHack(element)}):(selectCtrl.addOption(attr.value,element),selectCtrl.ngModelCtrl.$render(),chromeHack(element)),element.on("$destroy",function(){selectCtrl.removeOption(attr.value),selectCtrl.ngModelCtrl.$render()}))}}}}],styleDirective=valueFn({restrict:"E",terminal:!1}),requiredDirective=function(){return{restrict:"A",require:"?ngModel",link:function(scope,elm,attr,ctrl){ctrl&&(attr.required=!0,ctrl.$validators.required=function(modelValue,viewValue){return!attr.required||!ctrl.$isEmpty(viewValue)},attr.$observe("required",function(){ctrl.$validate()}))}}},patternDirective=function(){return{restrict:"A",require:"?ngModel",link:function(scope,elm,attr,ctrl){if(ctrl){var regexp,patternExp=attr.ngPattern||attr.pattern;attr.$observe("pattern",function(regex){if(isString(regex)&&regex.length>0&&(regex=new RegExp("^"+regex+"$")),regex&&!regex.test)throw minErr("ngPattern")("noregexp","Expected {0} to be a RegExp but was {1}. Element: {2}",patternExp,regex,startingTag(elm));regexp=regex||undefined,ctrl.$validate()}),ctrl.$validators.pattern=function(value){return ctrl.$isEmpty(value)||isUndefined(regexp)||regexp.test(value)}}}}},maxlengthDirective=function(){return{restrict:"A",require:"?ngModel",link:function(scope,elm,attr,ctrl){if(ctrl){var maxlength=-1;attr.$observe("maxlength",function(value){var intVal=toInt(value);maxlength=isNaN(intVal)?-1:intVal,ctrl.$validate()}),ctrl.$validators.maxlength=function(modelValue,viewValue){return 0>maxlength||ctrl.$isEmpty(viewValue)||viewValue.length<=maxlength}}}}},minlengthDirective=function(){return{restrict:"A",require:"?ngModel",link:function(scope,elm,attr,ctrl){if(ctrl){var minlength=0;attr.$observe("minlength",function(value){minlength=toInt(value)||0,ctrl.$validate()}),ctrl.$validators.minlength=function(modelValue,viewValue){return ctrl.$isEmpty(viewValue)||viewValue.length>=minlength}}}}};return window.angular.bootstrap?(console.log("WARNING: Tried to load angular more than once."),void 0):(bindJQuery(),publishExternalAPI(angular),jqLite(document).ready(function(){angularInit(document,bootstrap)}),void 0)}(window,document),!window.angular.$$csp()&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'),function(){var initializing=!1,fnTest=/xyz/.test(function(){})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(prop){function Class(){!initializing&&this.init&&this.init.apply(this,arguments)}var _super=this.prototype;initializing=!0;var prototype=new this;initializing=!1;for(var name in prop)prototype[name]="function"==typeof prop[name]&&"function"==typeof _super[name]&&fnTest.test(prop[name])?function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);return this._super=tmp,ret}}(name,prop[name]):prop[name];return Class.prototype=prototype,Class.prototype.constructor=Class,Class.extend=arguments.callee,Class}}(),function(){"use strict";function FastClick(layer,options){function bind(method,context){return function(){return method.apply(context,arguments)}}var oldOnClick;if(options=options||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=options.touchBoundary||10,this.layer=layer,this.tapDelay=options.tapDelay||200,this.tapTimeout=options.tapTimeout||700,!FastClick.notNeeded(layer)){for(var methods=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],context=this,i=0,l=methods.length;l>i;i++)context[methods[i]]=bind(context[methods[i]],context);deviceIsAndroid&&(layer.addEventListener("mouseover",this.onMouse,!0),layer.addEventListener("mousedown",this.onMouse,!0),layer.addEventListener("mouseup",this.onMouse,!0)),layer.addEventListener("click",this.onClick,!0),layer.addEventListener("touchstart",this.onTouchStart,!1),layer.addEventListener("touchmove",this.onTouchMove,!1),layer.addEventListener("touchend",this.onTouchEnd,!1),layer.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;"click"===type?rmv.call(layer,type,callback.hijacked||callback,capture):rmv.call(layer,type,callback,capture)},layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;"click"===type?adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){event.propagationStopped||callback(event)}),capture):adv.call(layer,type,callback,capture)}),"function"==typeof layer.onclick&&(oldOnClick=layer.onclick,layer.addEventListener("click",function(event){oldOnClick(event)},!1),layer.onclick=null)}}var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0,deviceIsAndroid=navigator.userAgent.indexOf("Android")>0&&!deviceIsWindowsPhone,deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone,deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),deviceIsIOSWithBadTarget=deviceIsIOS&&/OS [6-7]_\d/.test(navigator.userAgent),deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(target.disabled)return!0;break;case"input":if(deviceIsIOS&&"file"===target.type||target.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(target.className)},FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!deviceIsAndroid;case"input":switch(target.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!target.disabled&&!target.readOnly;default:return/\bneedsfocus\b/.test(target.className)}},FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;document.activeElement&&document.activeElement!==targetElement&&document.activeElement.blur(),touch=event.changedTouches[0],clickEvent=document.createEvent("MouseEvents"),clickEvent.initMouseEvent(this.determineEventType(targetElement),!0,!0,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,!1,!1,!1,!1,0,null),clickEvent.forwardedTouchEvent=!0,targetElement.dispatchEvent(clickEvent)},FastClick.prototype.determineEventType=function(targetElement){return deviceIsAndroid&&"select"===targetElement.tagName.toLowerCase()?"mousedown":"click"},FastClick.prototype.focus=function(targetElement){var length;deviceIsIOS&&targetElement.setSelectionRange&&0!==targetElement.type.indexOf("date")&&"time"!==targetElement.type&&"month"!==targetElement.type?(length=targetElement.value.length,targetElement.setSelectionRange(length,length)):targetElement.focus()},FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;if(scrollParent=targetElement.fastClickScrollParent,!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement,targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}scrollParent&&(scrollParent.fastClickLastScrollTop=scrollParent.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){return eventTarget.nodeType===Node.TEXT_NODE?eventTarget.parentNode:eventTarget},FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1)return!0;if(targetElement=this.getTargetElementFromEventTarget(event.target),touch=event.targetTouches[0],deviceIsIOS){if(selection=window.getSelection(),selection.rangeCount&&!selection.isCollapsed)return!0;if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier)return event.preventDefault(),!1;this.lastTouchIdentifier=touch.identifier,this.updateScrollParent(targetElement)}}return this.trackingClick=!0,this.trackingClickStart=event.timeStamp,this.targetElement=targetElement,this.touchStartX=touch.pageX,this.touchStartY=touch.pageY,event.timeStamp-this.lastClickTime<this.tapDelay&&event.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;return Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary?!0:!1},FastClick.prototype.onTouchMove=function(event){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},FastClick.prototype.findControl=function(labelElement){return void 0!==labelElement.control?labelElement.control:labelElement.htmlFor?document.getElementById(labelElement.htmlFor):labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick)return!0;if(event.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(event.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=event.timeStamp,trackingClickStart=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,deviceIsIOSWithBadTarget&&(touch=event.changedTouches[0],targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement,targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent),targetTagName=targetElement.tagName.toLowerCase(),"label"===targetTagName){if(forElement=this.findControl(targetElement)){if(this.focus(targetElement),deviceIsAndroid)return!1;targetElement=forElement}}else if(this.needsFocus(targetElement))return event.timeStamp-trackingClickStart>100||deviceIsIOS&&window.top!==window&&"input"===targetTagName?(this.targetElement=null,!1):(this.focus(targetElement),this.sendClick(targetElement,event),deviceIsIOS&&"select"===targetTagName||(this.targetElement=null,event.preventDefault()),!1);return deviceIsIOS&&!deviceIsIOS4&&(scrollParent=targetElement.fastClickScrollParent,scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop)?!0:(this.needsClick(targetElement)||(event.preventDefault(),this.sendClick(targetElement,event)),!1)},FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(event){return this.targetElement?event.forwardedTouchEvent?!0:event.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(event.stopImmediatePropagation?event.stopImmediatePropagation():event.propagationStopped=!0,event.stopPropagation(),event.preventDefault(),!1):!0:!0:!0},FastClick.prototype.onClick=function(event){var permitted;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===event.target.type&&0===event.detail?!0:(permitted=this.onMouse(event),permitted||(this.targetElement=null),permitted)},FastClick.prototype.destroy=function(){var layer=this.layer;deviceIsAndroid&&(layer.removeEventListener("mouseover",this.onMouse,!0),layer.removeEventListener("mousedown",this.onMouse,!0),layer.removeEventListener("mouseup",this.onMouse,!0)),layer.removeEventListener("click",this.onClick,!0),layer.removeEventListener("touchstart",this.onTouchStart,!1),layer.removeEventListener("touchmove",this.onTouchMove,!1),layer.removeEventListener("touchend",this.onTouchEnd,!1),layer.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(layer){var metaViewport,chromeVersion,blackberryVersion,firefoxVersion;if("undefined"==typeof window.ontouchstart)return!0;if(chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!deviceIsAndroid)return!0;if(metaViewport=document.querySelector("meta[name=viewport]")){if(-1!==metaViewport.content.indexOf("user-scalable=no"))return!0;if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(deviceIsBlackBerry10&&(blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),blackberryVersion[1]>=10&&blackberryVersion[2]>=3&&(metaViewport=document.querySelector("meta[name=viewport]")))){if(-1!==metaViewport.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===layer.style.msTouchAction||"manipulation"===layer.style.touchAction?!0:(firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],firefoxVersion>=27&&(metaViewport=document.querySelector("meta[name=viewport]"),metaViewport&&(-1!==metaViewport.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===layer.style.touchAction||"manipulation"===layer.style.touchAction?!0:!1)},FastClick.attach=function(layer,options){return new FastClick(layer,options)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick}(),function(window,undefined){"use strict";function setup(){Hammer.READY||(Event.determineEventTypes(),Utils.each(Hammer.gestures,function(gesture){Detection.register(gesture)}),Event.onTouch(Hammer.DOCUMENT,EVENT_MOVE,Detection.detect),Event.onTouch(Hammer.DOCUMENT,EVENT_END,Detection.detect),Hammer.READY=!0)}var Hammer=function Hammer(element,options){return new Hammer.Instance(element,options||{})};Hammer.VERSION="1.1.3",Hammer.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},Hammer.DOCUMENT=document,Hammer.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,Hammer.HAS_TOUCHEVENTS="ontouchstart"in window,Hammer.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),Hammer.NO_MOUSEEVENTS=Hammer.HAS_TOUCHEVENTS&&Hammer.IS_MOBILE||Hammer.HAS_POINTEREVENTS,Hammer.CALCULATE_INTERVAL=25;var EVENT_TYPES={},DIRECTION_DOWN=Hammer.DIRECTION_DOWN="down",DIRECTION_LEFT=Hammer.DIRECTION_LEFT="left",DIRECTION_UP=Hammer.DIRECTION_UP="up",DIRECTION_RIGHT=Hammer.DIRECTION_RIGHT="right",POINTER_MOUSE=Hammer.POINTER_MOUSE="mouse",POINTER_TOUCH=Hammer.POINTER_TOUCH="touch",POINTER_PEN=Hammer.POINTER_PEN="pen",EVENT_START=Hammer.EVENT_START="start",EVENT_MOVE=Hammer.EVENT_MOVE="move",EVENT_END=Hammer.EVENT_END="end",EVENT_RELEASE=Hammer.EVENT_RELEASE="release",EVENT_TOUCH=Hammer.EVENT_TOUCH="touch";Hammer.READY=!1,Hammer.plugins=Hammer.plugins||{},Hammer.gestures=Hammer.gestures||{};var Utils=Hammer.utils={extend:function(dest,src,merge){for(var key in src)!src.hasOwnProperty(key)||dest[key]!==undefined&&merge||(dest[key]=src[key]);return dest},on:function(element,type,handler){element.addEventListener(type,handler,!1)},off:function(element,type,handler){element.removeEventListener(type,handler,!1)},each:function(obj,iterator,context){var i,len;if("forEach"in obj)obj.forEach(iterator,context);else if(obj.length!==undefined){for(i=0,len=obj.length;len>i;i++)if(iterator.call(context,obj[i],i,obj)===!1)return}else for(i in obj)if(obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj)===!1)return},inStr:function(src,find){return src.indexOf(find)>-1},inArray:function(src,find){if(src.indexOf){var index=src.indexOf(find);return-1===index?!1:index}for(var i=0,len=src.length;len>i;i++)if(src[i]===find)return i;return!1},toArray:function(obj){return Array.prototype.slice.call(obj,0)},hasParent:function(node,parent){for(;node;){if(node==parent)return!0;node=node.parentNode}return!1},getCenter:function(touches){var pageX=[],pageY=[],clientX=[],clientY=[],min=Math.min,max=Math.max;return 1===touches.length?{pageX:touches[0].pageX,pageY:touches[0].pageY,clientX:touches[0].clientX,clientY:touches[0].clientY}:(Utils.each(touches,function(touch){pageX.push(touch.pageX),pageY.push(touch.pageY),clientX.push(touch.clientX),clientY.push(touch.clientY)}),{pageX:(min.apply(Math,pageX)+max.apply(Math,pageX))/2,pageY:(min.apply(Math,pageY)+max.apply(Math,pageY))/2,clientX:(min.apply(Math,clientX)+max.apply(Math,clientX))/2,clientY:(min.apply(Math,clientY)+max.apply(Math,clientY))/2})},getVelocity:function(deltaTime,deltaX,deltaY){return{x:Math.abs(deltaX/deltaTime)||0,y:Math.abs(deltaY/deltaTime)||0}},getAngle:function(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return 180*Math.atan2(y,x)/Math.PI},getDirection:function(touch1,touch2){var x=Math.abs(touch1.clientX-touch2.clientX),y=Math.abs(touch1.clientY-touch2.clientY);return x>=y?touch1.clientX-touch2.clientX>0?DIRECTION_LEFT:DIRECTION_RIGHT:touch1.clientY-touch2.clientY>0?DIRECTION_UP:DIRECTION_DOWN},getDistance:function(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return Math.sqrt(x*x+y*y)},getScale:function(start,end){return start.length>=2&&end.length>=2?this.getDistance(end[0],end[1])/this.getDistance(start[0],start[1]):1},getRotation:function(start,end){return start.length>=2&&end.length>=2?this.getAngle(end[1],end[0])-this.getAngle(start[1],start[0]):0},isVertical:function(direction){return direction==DIRECTION_UP||direction==DIRECTION_DOWN
},setPrefixedCss:function(element,prop,value,toggle){var prefixes=["","Webkit","Moz","O","ms"];prop=Utils.toCamelCase(prop);for(var i=0;i<prefixes.length;i++){var p=prop;if(prefixes[i]&&(p=prefixes[i]+p.slice(0,1).toUpperCase()+p.slice(1)),p in element.style){element.style[p]=(null==toggle||toggle)&&value||"";break}}},toggleBehavior:function(element,props,toggle){if(props&&element&&element.style){Utils.each(props,function(value,prop){Utils.setPrefixedCss(element,prop,value,toggle)});var falseFn=toggle&&function(){return!1};"none"==props.userSelect&&(element.onselectstart=falseFn),"none"==props.userDrag&&(element.ondragstart=falseFn)}},toCamelCase:function(str){return str.replace(/[_-]([a-z])/g,function(s){return s[1].toUpperCase()})}},Event=Hammer.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(element,type,handler,hook){var types=type.split(" ");Utils.each(types,function(type){Utils.on(element,type,handler),hook&&hook(type)})},off:function(element,type,handler,hook){var types=type.split(" ");Utils.each(types,function(type){Utils.off(element,type,handler),hook&&hook(type)})},onTouch:function(element,eventType,handler){var self=this,onTouchHandler=function(ev){var triggerType,srcType=ev.type.toLowerCase(),isPointer=Hammer.HAS_POINTEREVENTS,isMouse=Utils.inStr(srcType,"mouse");isMouse&&self.preventMouseEvents||(isMouse&&eventType==EVENT_START&&0===ev.button?(self.preventMouseEvents=!1,self.shouldDetect=!0):isPointer&&eventType==EVENT_START?self.shouldDetect=1===ev.buttons||PointerEvent.matchType(POINTER_TOUCH,ev):isMouse||eventType!=EVENT_START||(self.preventMouseEvents=!0,self.shouldDetect=!0),isPointer&&eventType!=EVENT_END&&PointerEvent.updatePointer(eventType,ev),self.shouldDetect&&(triggerType=self.doDetect.call(self,ev,eventType,element,handler)),triggerType==EVENT_END&&(self.preventMouseEvents=!1,self.shouldDetect=!1,PointerEvent.reset()),isPointer&&eventType==EVENT_END&&PointerEvent.updatePointer(eventType,ev))};return this.on(element,EVENT_TYPES[eventType],onTouchHandler),onTouchHandler},doDetect:function(ev,eventType,element,handler){var touchList=this.getTouchList(ev,eventType),touchListLength=touchList.length,triggerType=eventType,triggerChange=touchList.trigger,changedLength=touchListLength;eventType==EVENT_START?triggerChange=EVENT_TOUCH:eventType==EVENT_END&&(triggerChange=EVENT_RELEASE,changedLength=touchList.length-(ev.changedTouches?ev.changedTouches.length:1)),changedLength>0&&this.started&&(triggerType=EVENT_MOVE),this.started=!0;var evData=this.collectEventData(element,triggerType,touchList,ev);return eventType!=EVENT_END&&handler.call(Detection,evData),triggerChange&&(evData.changedLength=changedLength,evData.eventType=triggerChange,handler.call(Detection,evData),evData.eventType=triggerType,delete evData.changedLength),triggerType==EVENT_END&&(handler.call(Detection,evData),this.started=!1),triggerType},determineEventTypes:function(){var types;return types=Hammer.HAS_POINTEREVENTS?window.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:Hammer.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],EVENT_TYPES[EVENT_START]=types[0],EVENT_TYPES[EVENT_MOVE]=types[1],EVENT_TYPES[EVENT_END]=types[2],EVENT_TYPES},getTouchList:function(ev,eventType){if(Hammer.HAS_POINTEREVENTS)return PointerEvent.getTouchList();if(ev.touches){if(eventType==EVENT_MOVE)return ev.touches;var identifiers=[],concat=[].concat(Utils.toArray(ev.touches),Utils.toArray(ev.changedTouches)),touchList=[];return Utils.each(concat,function(touch){Utils.inArray(identifiers,touch.identifier)===!1&&touchList.push(touch),identifiers.push(touch.identifier)}),touchList}return ev.identifier=1,[ev]},collectEventData:function(element,eventType,touches,ev){var pointerType=POINTER_TOUCH;return Utils.inStr(ev.type,"mouse")||PointerEvent.matchType(POINTER_MOUSE,ev)?pointerType=POINTER_MOUSE:PointerEvent.matchType(POINTER_PEN,ev)&&(pointerType=POINTER_PEN),{center:Utils.getCenter(touches),timeStamp:Date.now(),target:ev.target,touches:touches,eventType:eventType,pointerType:pointerType,srcEvent:ev,preventDefault:function(){var srcEvent=this.srcEvent;srcEvent.preventManipulation&&srcEvent.preventManipulation(),srcEvent.preventDefault&&srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return Detection.stopDetect()}}}},PointerEvent=Hammer.PointerEvent={pointers:{},getTouchList:function(){var touchlist=[];return Utils.each(this.pointers,function(pointer){touchlist.push(pointer)}),touchlist},updatePointer:function(eventType,pointerEvent){eventType==EVENT_END||eventType!=EVENT_END&&1!==pointerEvent.buttons?delete this.pointers[pointerEvent.pointerId]:(pointerEvent.identifier=pointerEvent.pointerId,this.pointers[pointerEvent.pointerId]=pointerEvent)},matchType:function(pointerType,ev){if(!ev.pointerType)return!1;var pt=ev.pointerType,types={};return types[POINTER_MOUSE]=pt===(ev.MSPOINTER_TYPE_MOUSE||POINTER_MOUSE),types[POINTER_TOUCH]=pt===(ev.MSPOINTER_TYPE_TOUCH||POINTER_TOUCH),types[POINTER_PEN]=pt===(ev.MSPOINTER_TYPE_PEN||POINTER_PEN),types[pointerType]},reset:function(){this.pointers={}}},Detection=Hammer.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(inst,eventData){this.current||(this.stopped=!1,this.current={inst:inst,startEvent:Utils.extend({},eventData),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(eventData))},detect:function(eventData){if(this.current&&!this.stopped){eventData=this.extendEventData(eventData);var inst=this.current.inst,instOptions=inst.options;return Utils.each(this.gestures,function(gesture){!this.stopped&&inst.enabled&&instOptions[gesture.name]&&gesture.handler.call(gesture,eventData,inst)},this),this.current&&(this.current.lastEvent=eventData),eventData.eventType==EVENT_END&&this.stopDetect(),eventData}},stopDetect:function(){this.previous=Utils.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(ev,center,deltaTime,deltaX,deltaY){var cur=this.current,recalc=!1,calcEv=cur.lastCalcEvent,calcData=cur.lastCalcData;calcEv&&ev.timeStamp-calcEv.timeStamp>Hammer.CALCULATE_INTERVAL&&(center=calcEv.center,deltaTime=ev.timeStamp-calcEv.timeStamp,deltaX=ev.center.clientX-calcEv.center.clientX,deltaY=ev.center.clientY-calcEv.center.clientY,recalc=!0),(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE)&&(cur.futureCalcEvent=ev),(!cur.lastCalcEvent||recalc)&&(calcData.velocity=Utils.getVelocity(deltaTime,deltaX,deltaY),calcData.angle=Utils.getAngle(center,ev.center),calcData.direction=Utils.getDirection(center,ev.center),cur.lastCalcEvent=cur.futureCalcEvent||ev,cur.futureCalcEvent=ev),ev.velocityX=calcData.velocity.x,ev.velocityY=calcData.velocity.y,ev.interimAngle=calcData.angle,ev.interimDirection=calcData.direction},extendEventData:function(ev){var cur=this.current,startEv=cur.startEvent,lastEv=cur.lastEvent||startEv;(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE)&&(startEv.touches=[],Utils.each(ev.touches,function(touch){startEv.touches.push({clientX:touch.clientX,clientY:touch.clientY})}));var deltaTime=ev.timeStamp-startEv.timeStamp,deltaX=ev.center.clientX-startEv.center.clientX,deltaY=ev.center.clientY-startEv.center.clientY;return this.getCalculatedData(ev,lastEv.center,deltaTime,deltaX,deltaY),Utils.extend(ev,{startEvent:startEv,deltaTime:deltaTime,deltaX:deltaX,deltaY:deltaY,distance:Utils.getDistance(startEv.center,ev.center),angle:Utils.getAngle(startEv.center,ev.center),direction:Utils.getDirection(startEv.center,ev.center),scale:Utils.getScale(startEv.touches,ev.touches),rotation:Utils.getRotation(startEv.touches,ev.touches)}),ev},register:function(gesture){var options=gesture.defaults||{};return options[gesture.name]===undefined&&(options[gesture.name]=!0),Utils.extend(Hammer.defaults,options,!0),gesture.index=gesture.index||1e3,this.gestures.push(gesture),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};Hammer.Instance=function(element,options){var self=this;setup(),this.element=element,this.enabled=!0,Utils.each(options,function(value,name){delete options[name],options[Utils.toCamelCase(name)]=value}),this.options=Utils.extend(Utils.extend({},Hammer.defaults),options||{}),this.options.behavior&&Utils.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=Event.onTouch(element,EVENT_START,function(ev){self.enabled&&ev.eventType==EVENT_START?Detection.startDetect(self,ev):ev.eventType==EVENT_TOUCH&&Detection.detect(ev)}),this.eventHandlers=[]},Hammer.Instance.prototype={on:function(gestures,handler){var self=this;return Event.on(self.element,gestures,handler,function(type){self.eventHandlers.push({gesture:type,handler:handler})}),self},off:function(gestures,handler){var self=this;return Event.off(self.element,gestures,handler,function(type){var index=Utils.inArray({gesture:type,handler:handler});index!==!1&&self.eventHandlers.splice(index,1)}),self},trigger:function(gesture,eventData){eventData||(eventData={});var event=Hammer.DOCUMENT.createEvent("Event");event.initEvent(gesture,!0,!0),event.gesture=eventData;var element=this.element;return Utils.hasParent(eventData.target,element)&&(element=eventData.target),element.dispatchEvent(event),this},enable:function(state){return this.enabled=state,this},dispose:function(){var i,eh;for(Utils.toggleBehavior(this.element,this.options.behavior,!1),i=-1;eh=this.eventHandlers[++i];)Utils.off(this.element,eh.gesture,eh.handler);return this.eventHandlers=[],Event.off(this.element,EVENT_TYPES[EVENT_START],this.eventStartHandler),null}},function(name){function dragGesture(ev,inst){var cur=Detection.current;if(!(inst.options.dragMaxTouches>0&&ev.touches.length>inst.options.dragMaxTouches))switch(ev.eventType){case EVENT_START:triggered=!1;break;case EVENT_MOVE:if(ev.distance<inst.options.dragMinDistance&&cur.name!=name)return;var startCenter=cur.startEvent.center;if(cur.name!=name&&(cur.name=name,inst.options.dragDistanceCorrection&&ev.distance>0)){var factor=Math.abs(inst.options.dragMinDistance/ev.distance);startCenter.pageX+=ev.deltaX*factor,startCenter.pageY+=ev.deltaY*factor,startCenter.clientX+=ev.deltaX*factor,startCenter.clientY+=ev.deltaY*factor,ev=Detection.extendEventData(ev)}(cur.lastEvent.dragLockToAxis||inst.options.dragLockToAxis&&inst.options.dragLockMinDistance<=ev.distance)&&(ev.dragLockToAxis=!0);var lastDirection=cur.lastEvent.direction;ev.dragLockToAxis&&lastDirection!==ev.direction&&(ev.direction=Utils.isVertical(lastDirection)?ev.deltaY<0?DIRECTION_UP:DIRECTION_DOWN:ev.deltaX<0?DIRECTION_LEFT:DIRECTION_RIGHT),triggered||(inst.trigger(name+"start",ev),triggered=!0),inst.trigger(name,ev),inst.trigger(name+ev.direction,ev);var isVertical=Utils.isVertical(ev.direction);(inst.options.dragBlockVertical&&isVertical||inst.options.dragBlockHorizontal&&!isVertical)&&ev.preventDefault();break;case EVENT_RELEASE:triggered&&ev.changedLength<=inst.options.dragMaxTouches&&(inst.trigger(name+"end",ev),triggered=!1);break;case EVENT_END:triggered=!1}}var triggered=!1;Hammer.gestures.Drag={name:name,index:50,handler:dragGesture,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),Hammer.gestures.Gesture={name:"gesture",index:1337,handler:function(ev,inst){inst.trigger(this.name,ev)}},function(name){function holdGesture(ev,inst){var options=inst.options,current=Detection.current;switch(ev.eventType){case EVENT_START:clearTimeout(timer),current.name=name,timer=setTimeout(function(){current&&current.name==name&&inst.trigger(name,ev)},options.holdTimeout);break;case EVENT_MOVE:ev.distance>options.holdThreshold&&clearTimeout(timer);break;case EVENT_RELEASE:clearTimeout(timer)}}var timer;Hammer.gestures.Hold={name:name,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:holdGesture}}("hold"),Hammer.gestures.Release={name:"release",index:1/0,handler:function(ev,inst){ev.eventType==EVENT_RELEASE&&inst.trigger(this.name,ev)}},Hammer.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(ev,inst){if(ev.eventType==EVENT_RELEASE){var touches=ev.touches.length,options=inst.options;if(touches<options.swipeMinTouches||touches>options.swipeMaxTouches)return;(ev.velocityX>options.swipeVelocityX||ev.velocityY>options.swipeVelocityY)&&(inst.trigger(this.name,ev),inst.trigger(this.name+ev.direction,ev))}}},function(name){function tapGesture(ev,inst){var sincePrev,didDoubleTap,options=inst.options,current=Detection.current,prev=Detection.previous;switch(ev.eventType){case EVENT_START:hasMoved=!1;break;case EVENT_MOVE:hasMoved=hasMoved||ev.distance>options.tapMaxDistance;break;case EVENT_END:!Utils.inStr(ev.srcEvent.type,"cancel")&&ev.deltaTime<options.tapMaxTime&&!hasMoved&&(sincePrev=prev&&prev.lastEvent&&ev.timeStamp-prev.lastEvent.timeStamp,didDoubleTap=!1,prev&&prev.name==name&&sincePrev&&sincePrev<options.doubleTapInterval&&ev.distance<options.doubleTapDistance&&(inst.trigger("doubletap",ev),didDoubleTap=!0),(!didDoubleTap||options.tapAlways)&&(current.name=name,inst.trigger(current.name,ev)))}}var hasMoved=!1;Hammer.gestures.Tap={name:name,index:100,handler:tapGesture,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),Hammer.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(ev,inst){return inst.options.preventMouse&&ev.pointerType==POINTER_MOUSE?(ev.stopDetect(),void 0):(inst.options.preventDefault&&ev.preventDefault(),ev.eventType==EVENT_TOUCH&&inst.trigger("touch",ev),void 0)}},function(name){function transformGesture(ev,inst){switch(ev.eventType){case EVENT_START:triggered=!1;break;case EVENT_MOVE:if(ev.touches.length<2)return;var scaleThreshold=Math.abs(1-ev.scale),rotationThreshold=Math.abs(ev.rotation);if(scaleThreshold<inst.options.transformMinScale&&rotationThreshold<inst.options.transformMinRotation)return;Detection.current.name=name,triggered||(inst.trigger(name+"start",ev),triggered=!0),inst.trigger(name,ev),rotationThreshold>inst.options.transformMinRotation&&inst.trigger("rotate",ev),scaleThreshold>inst.options.transformMinScale&&(inst.trigger("pinch",ev),inst.trigger("pinch"+(ev.scale<1?"in":"out"),ev));break;case EVENT_RELEASE:triggered&&ev.changedLength<2&&(inst.trigger(name+"end",ev),triggered=!1)}}var triggered=!1;Hammer.gestures.Transform={name:name,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:transformGesture}}("transform"),"function"==typeof define&&define.amd?define(function(){return Hammer}):"undefined"!=typeof module&&module.exports?module.exports=Hammer:window.Hammer=Hammer}(window);var IScroll=function(window,document,Math){function IScroll(el,options){this.wrapper="string"==typeof el?document.querySelector(el):el,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0};for(var i in options)this.options[i]=options[i];this.translateZ=this.options.HWCompositing&&utils.hasPerspective?" translateZ(0)":"",this.options.useTransition=utils.hasTransition&&this.options.useTransition,this.options.useTransform=utils.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY="vertical"==this.options.eventPassthrough?!1:this.options.scrollY,this.options.scrollX="horizontal"==this.options.eventPassthrough?!1:this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?utils.ease[this.options.bounceEasing]||utils.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}var rAF=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)},utils=function(){function _prefixStyle(style){return _vendor===!1?!1:""===_vendor?style:_vendor+style.charAt(0).toUpperCase()+style.substr(1)}var me={},_elementStyle=document.createElement("div").style,_vendor=function(){for(var transform,vendors=["t","webkitT","MozT","msT","OT"],i=0,l=vendors.length;l>i;i++)if(transform=vendors[i]+"ransform",transform in _elementStyle)return vendors[i].substr(0,vendors[i].length-1);return!1}();me.getTime=Date.now||function(){return(new Date).getTime()},me.extend=function(target,obj){for(var i in obj)target[i]=obj[i]},me.addEvent=function(el,type,fn,capture){el.addEventListener(type,fn,!!capture)},me.removeEvent=function(el,type,fn,capture){el.removeEventListener(type,fn,!!capture)},me.momentum=function(current,start,time,lowerMargin,wrapperSize){var destination,duration,distance=current-start,speed=Math.abs(distance)/time,deceleration=6e-4;return destination=current+speed*speed/(2*deceleration)*(0>distance?-1:1),duration=speed/deceleration,lowerMargin>destination?(destination=wrapperSize?lowerMargin-wrapperSize/2.5*(speed/8):lowerMargin,distance=Math.abs(destination-current),duration=distance/speed):destination>0&&(destination=wrapperSize?wrapperSize/2.5*(speed/8):0,distance=Math.abs(current)+destination,duration=distance/speed),{destination:Math.round(destination),duration:duration}};var _transform=_prefixStyle("transform");return me.extend(me,{hasTransform:_transform!==!1,hasPerspective:_prefixStyle("perspective")in _elementStyle,hasTouch:"ontouchstart"in window,hasPointer:navigator.msPointerEnabled,hasTransition:_prefixStyle("transition")in _elementStyle}),me.isAndroidBrowser=/Android/.test(window.navigator.appVersion)&&/Version\/\d/.test(window.navigator.appVersion),me.extend(me.style={},{transform:_transform,transitionTimingFunction:_prefixStyle("transitionTimingFunction"),transitionDuration:_prefixStyle("transitionDuration"),transformOrigin:_prefixStyle("transformOrigin")}),me.hasClass=function(e,c){var re=new RegExp("(^|\\s)"+c+"(\\s|$)");return re.test(e.className)},me.addClass=function(e,c){if(!me.hasClass(e,c)){var newclass=e.className.split(" ");newclass.push(c),e.className=newclass.join(" ")}},me.removeClass=function(e,c){if(me.hasClass(e,c)){var re=new RegExp("(^|\\s)"+c+"(\\s|$)","g");e.className=e.className.replace(re," ")}},me.offset=function(el){for(var left=-el.offsetLeft,top=-el.offsetTop;el=el.offsetParent;)left-=el.offsetLeft,top-=el.offsetTop;return{left:left,top:top}},me.preventDefaultException=function(el,exceptions){for(var i in exceptions)if(exceptions[i].test(el[i]))return!0;return!1},me.extend(me.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),me.extend(me.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(k){return k*(2-k)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(k){return Math.sqrt(1- --k*k)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(k){var b=4;return(k-=1)*k*((b+1)*k+b)+1}},bounce:{style:"",fn:function(k){return(k/=1)<1/2.75?7.5625*k*k:2/2.75>k?7.5625*(k-=1.5/2.75)*k+.75:2.5/2.75>k?7.5625*(k-=2.25/2.75)*k+.9375:7.5625*(k-=2.625/2.75)*k+.984375}},elastic:{style:"",fn:function(k){var f=.22,e=.4;return 0===k?0:1==k?1:e*Math.pow(2,-10*k)*Math.sin(2*(k-f/4)*Math.PI/f)+1}}}),me.tap=function(e,eventName){var ev=document.createEvent("Event");ev.initEvent(eventName,!0,!0),ev.pageX=e.pageX,ev.pageY=e.pageY,e.target.dispatchEvent(ev)},me.click=function(e){var ev,target=e.target;"SELECT"!=target.tagName&&"INPUT"!=target.tagName&&"TEXTAREA"!=target.tagName&&(ev=document.createEvent("MouseEvents"),ev.initMouseEvent("click",!0,!0,e.view,1,target.screenX,target.screenY,target.clientX,target.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),ev._constructed=!0,target.dispatchEvent(ev))},me}();return IScroll.prototype={version:"5.0.6",_init:function(){this._initEvents()},destroy:function(){this._initEvents(!0),this._execEvent("destroy")},_transitionEnd:function(e){e.target==this.scroller&&(this._transitionTime(0),this.resetPosition(this.options.bounceTime)||this._execEvent("scrollEnd"))},_start:function(e){if(!(1!=utils.eventType[e.type]&&0!==e.button||!this.enabled||this.initiated&&utils.eventType[e.type]!==this.initiated)){!this.options.preventDefault||utils.isAndroidBrowser||utils.preventDefaultException(e.target,this.options.preventDefaultException)||e.preventDefault();var pos,point=e.touches?e.touches[0]:e;this.initiated=utils.eventType[e.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this._transitionTime(),this.isAnimating=!1,this.startTime=utils.getTime(),this.options.useTransition&&this.isInTransition&&(pos=this.getComputedPosition(),this._translate(Math.round(pos.x),Math.round(pos.y)),this._execEvent("scrollEnd"),this.isInTransition=!1),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=point.pageX,this.pointY=point.pageY,this._execEvent("beforeScrollStart")}},_move:function(e){if(this.enabled&&utils.eventType[e.type]===this.initiated){this.options.preventDefault&&e.preventDefault();var newX,newY,absDistX,absDistY,point=e.touches?e.touches[0]:e,deltaX=point.pageX-this.pointX,deltaY=point.pageY-this.pointY,timestamp=utils.getTime();if(this.pointX=point.pageX,this.pointY=point.pageY,this.distX+=deltaX,this.distY+=deltaY,absDistX=Math.abs(this.distX),absDistY=Math.abs(this.distY),!(timestamp-this.endTime>300&&10>absDistX&&10>absDistY)){if(this.directionLocked||this.options.freeScroll||(this.directionLocked=absDistX>absDistY+this.options.directionLockThreshold?"h":absDistY>=absDistX+this.options.directionLockThreshold?"v":"n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)e.preventDefault();else if("horizontal"==this.options.eventPassthrough)return this.initiated=!1,void 0;deltaY=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)e.preventDefault();else if("vertical"==this.options.eventPassthrough)return this.initiated=!1,void 0;deltaX=0}deltaX=this.hasHorizontalScroll?deltaX:0,deltaY=this.hasVerticalScroll?deltaY:0,newX=this.x+deltaX,newY=this.y+deltaY,(newX>0||newX<this.maxScrollX)&&(newX=this.options.bounce?this.x+deltaX/3:newX>0?0:this.maxScrollX),(newY>0||newY<this.maxScrollY)&&(newY=this.options.bounce?this.y+deltaY/3:newY>0?0:this.maxScrollY),this.directionX=deltaX>0?-1:0>deltaX?1:0,this.directionY=deltaY>0?-1:0>deltaY?1:0,this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(newX,newY),timestamp-this.startTime>300&&(this.startTime=timestamp,this.startX=this.x,this.startY=this.y)}}},_end:function(e){if(this.enabled&&utils.eventType[e.type]===this.initiated){this.options.preventDefault&&!utils.preventDefaultException(e.target,this.options.preventDefaultException)&&e.preventDefault();var momentumX,momentumY,duration=(e.changedTouches?e.changedTouches[0]:e,utils.getTime()-this.startTime),newX=Math.round(this.x),newY=Math.round(this.y),distanceX=Math.abs(newX-this.startX),distanceY=Math.abs(newY-this.startY),time=0,easing="";if(this.scrollTo(newX,newY),this.isInTransition=0,this.initiated=0,this.endTime=utils.getTime(),!this.resetPosition(this.options.bounceTime))return this.moved?this._events.flick&&200>duration&&100>distanceX&&100>distanceY?(this._execEvent("flick"),void 0):(this.options.momentum&&300>duration&&(momentumX=this.hasHorizontalScroll?utils.momentum(this.x,this.startX,duration,this.maxScrollX,this.options.bounce?this.wrapperWidth:0):{destination:newX,duration:0},momentumY=this.hasVerticalScroll?utils.momentum(this.y,this.startY,duration,this.maxScrollY,this.options.bounce?this.wrapperHeight:0):{destination:newY,duration:0},newX=momentumX.destination,newY=momentumY.destination,time=Math.max(momentumX.duration,momentumY.duration),this.isInTransition=1),newX!=this.x||newY!=this.y?((newX>0||newX<this.maxScrollX||newY>0||newY<this.maxScrollY)&&(easing=utils.ease.quadratic),this.scrollTo(newX,newY,time,easing),void 0):(this._execEvent("scrollEnd"),void 0)):(this.options.tap&&utils.tap(e,this.options.tap),this.options.click&&utils.click(e),void 0)}},_resize:function(){var that=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){that.refresh()},this.options.resizePolling)},resetPosition:function(time){var x=this.x,y=this.y;return time=time||0,!this.hasHorizontalScroll||this.x>0?x=0:this.x<this.maxScrollX&&(x=this.maxScrollX),!this.hasVerticalScroll||this.y>0?y=0:this.y<this.maxScrollY&&(y=this.maxScrollY),x==this.x&&y==this.y?!1:(this.scrollTo(x,y,time,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){this.wrapper.offsetHeight;this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerWidth=this.scroller.offsetWidth,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=utils.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition()},on:function(type,fn){this._events[type]||(this._events[type]=[]),this._events[type].push(fn)},_execEvent:function(type){if(this._events[type]){var i=0,l=this._events[type].length;if(l)for(;l>i;i++)this._events[type][i].call(this)}},scrollBy:function(x,y,time,easing){x=this.x+x,y=this.y+y,time=time||0,this.scrollTo(x,y,time,easing)},scrollTo:function(x,y,time,easing){easing=easing||utils.ease.circular,!time||this.options.useTransition&&easing.style?(this._transitionTimingFunction(easing.style),this._transitionTime(time),this._translate(x,y)):this._animate(x,y,time,easing.fn)},scrollToElement:function(el,time,offsetX,offsetY,easing){if(el=el.nodeType?el:this.scroller.querySelector(el)){var pos=utils.offset(el);pos.left-=this.wrapperOffset.left,pos.top-=this.wrapperOffset.top,offsetX===!0&&(offsetX=Math.round(el.offsetWidth/2-this.wrapper.offsetWidth/2)),offsetY===!0&&(offsetY=Math.round(el.offsetHeight/2-this.wrapper.offsetHeight/2)),pos.left-=offsetX||0,pos.top-=offsetY||0,pos.left=pos.left>0?0:pos.left<this.maxScrollX?this.maxScrollX:pos.left,pos.top=pos.top>0?0:pos.top<this.maxScrollY?this.maxScrollY:pos.top,time=void 0===time||null===time||"auto"===time?Math.max(Math.abs(this.x-pos.left),Math.abs(this.y-pos.top)):time,this.scrollTo(pos.left,pos.top,time,easing)}},_transitionTime:function(time){time=time||0,this.scrollerStyle[utils.style.transitionDuration]=time+"ms"},_transitionTimingFunction:function(easing){this.scrollerStyle[utils.style.transitionTimingFunction]=easing},_translate:function(x,y){this.options.useTransform?this.scrollerStyle[utils.style.transform]="translate("+x+"px,"+y+"px)"+this.translateZ:(x=Math.round(x),y=Math.round(y),this.scrollerStyle.left=x+"px",this.scrollerStyle.top=y+"px"),this.x=x,this.y=y},_initEvents:function(remove){var eventType=remove?utils.removeEvent:utils.addEvent,target=this.options.bindToWrapper?this.wrapper:window;eventType(window,"orientationchange",this),eventType(window,"resize",this),this.options.click&&eventType(this.wrapper,"click",this,!0),this.options.disableMouse||(eventType(this.wrapper,"mousedown",this),eventType(target,"mousemove",this),eventType(target,"mousecancel",this),eventType(target,"mouseup",this)),utils.hasPointer&&!this.options.disablePointer&&(eventType(this.wrapper,"MSPointerDown",this),eventType(target,"MSPointerMove",this),eventType(target,"MSPointerCancel",this),eventType(target,"MSPointerUp",this)),utils.hasTouch&&!this.options.disableTouch&&(eventType(this.wrapper,"touchstart",this),eventType(target,"touchmove",this),eventType(target,"touchcancel",this),eventType(target,"touchend",this)),eventType(this.scroller,"transitionend",this),eventType(this.scroller,"webkitTransitionEnd",this),eventType(this.scroller,"oTransitionEnd",this),eventType(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var x,y,matrix=window.getComputedStyle(this.scroller,null);return this.options.useTransform?(matrix=matrix[utils.style.transform].split(")")[0].split(", "),x=+(matrix[12]||matrix[4]),y=+(matrix[13]||matrix[5])):(x=+matrix.left.replace(/[^-\d]/g,""),y=+matrix.top.replace(/[^-\d]/g,"")),{x:x,y:y}},_animate:function(destX,destY,duration,easingFn){function step(){var newX,newY,easing,now=utils.getTime();return now>=destTime?(that.isAnimating=!1,that._translate(destX,destY),that.resetPosition(that.options.bounceTime)||that._execEvent("scrollEnd"),void 0):(now=(now-startTime)/duration,easing=easingFn(now),newX=(destX-startX)*easing+startX,newY=(destY-startY)*easing+startY,that._translate(newX,newY),that.isAnimating&&rAF(step),void 0)}var that=this,startX=this.x,startY=this.y,startTime=utils.getTime(),destTime=startTime+duration;this.isAnimating=!0,step()},handleEvent:function(e){switch(e.type){case"touchstart":case"MSPointerDown":case"mousedown":this._start(e);break;case"touchmove":case"MSPointerMove":case"mousemove":this._move(e);break;case"touchend":case"MSPointerUp":case"mouseup":case"touchcancel":case"MSPointerCancel":case"mousecancel":this._end(e);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(e);break;case"DOMMouseScroll":case"mousewheel":this._wheel(e);break;case"keydown":this._key(e);break;case"click":e._constructed||(e.preventDefault(),e.stopPropagation())}}},IScroll.ease=utils.ease,IScroll}(window,document,Math),MicroEvent=function(){};MicroEvent.prototype={on:function(event,fct){this._events=this._events||{},this._events[event]=this._events[event]||[],this._events[event].push(fct)},once:function(event,fct){var self=this,wrapper=function(){return self.off(event,wrapper),fct.apply(null,arguments)};this.on(event,wrapper)},off:function(event,fct){this._events=this._events||{},event in this._events!=!1&&this._events[event].splice(this._events[event].indexOf(fct),1)},emit:function(event){if(this._events=this._events||{},event in this._events!=!1)for(var i=0;i<this._events[event].length;i++)this._events[event][i].apply(this,Array.prototype.slice.call(arguments,1))}},MicroEvent.mixin=function(destObject){for(var props=["on","once","off","emit"],i=0;i<props.length;i++)"function"==typeof destObject?destObject.prototype[props[i]]=MicroEvent.prototype[props[i]]:destObject[props[i]]=MicroEvent.prototype[props[i]]},"undefined"!=typeof module&&"exports"in module&&(module.exports=MicroEvent),window.Modernizr=function(window,document,undefined){function setCss(str){mStyle.cssText=str
}function is(obj,type){return typeof obj===type}function contains(str,substr){return!!~(""+str).indexOf(substr)}function testProps(props,prefixed){for(var i in props){var prop=props[i];if(!contains(prop,"-")&&mStyle[prop]!==undefined)return"pfx"==prefixed?prop:!0}return!1}function testDOMProps(props,obj,elem){for(var i in props){var item=obj[props[i]];if(item!==undefined)return elem===!1?props[i]:is(item,"function")?item.bind(elem||obj):item}return!1}function testPropsAll(prop,prefixed,elem){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+" "+cssomPrefixes.join(ucProp+" ")+ucProp).split(" ");return is(prefixed,"string")||is(prefixed,"undefined")?testProps(props,prefixed):(props=(prop+" "+domPrefixes.join(ucProp+" ")+ucProp).split(" "),testDOMProps(props,prefixed,elem))}var inputElem,featureName,hasOwnProp,version="2.6.2",Modernizr={},enableClasses=!0,docElement=document.documentElement,mod="modernizr",modElem=document.createElement(mod),mStyle=modElem.style,prefixes=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),omPrefixes="Webkit Moz O ms",cssomPrefixes=omPrefixes.split(" "),domPrefixes=omPrefixes.toLowerCase().split(" "),ns={svg:"http://www.w3.org/2000/svg"},tests={},classes=[],slice=classes.slice,injectElementWithStyles=function(rule,callback,nodes,testnames){var style,ret,node,docOverflow,div=document.createElement("div"),body=document.body,fakeBody=body||document.createElement("body");if(parseInt(nodes,10))for(;nodes--;)node=document.createElement("div"),node.id=testnames?testnames[nodes]:mod+(nodes+1),div.appendChild(node);return style=["&#173;",'<style id="s',mod,'">',rule,"</style>"].join(""),div.id=mod,(body?div:fakeBody).innerHTML+=style,fakeBody.appendChild(div),body||(fakeBody.style.background="",fakeBody.style.overflow="hidden",docOverflow=docElement.style.overflow,docElement.style.overflow="hidden",docElement.appendChild(fakeBody)),ret=callback(div,rule),body?div.parentNode.removeChild(div):(fakeBody.parentNode.removeChild(fakeBody),docElement.style.overflow=docOverflow),!!ret},_hasOwnProperty={}.hasOwnProperty;hasOwnProp=is(_hasOwnProperty,"undefined")||is(_hasOwnProperty.call,"undefined")?function(object,property){return property in object&&is(object.constructor.prototype[property],"undefined")}:function(object,property){return _hasOwnProperty.call(object,property)},Function.prototype.bind||(Function.prototype.bind=function(that){var target=this;if("function"!=typeof target)throw new TypeError;var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var F=function(){};F.prototype=target.prototype;var self=new F,result=target.apply(self,args.concat(slice.call(arguments)));return Object(result)===result?result:self}return target.apply(that,args.concat(slice.call(arguments)))};return bound}),tests.canvas=function(){var elem=document.createElement("canvas");return!(!elem.getContext||!elem.getContext("2d"))},tests.borderradius=function(){return testPropsAll("borderRadius")},tests.boxshadow=function(){return testPropsAll("boxShadow")},tests.cssanimations=function(){return testPropsAll("animationName")},tests.csstransforms=function(){return!!testPropsAll("transform")},tests.csstransforms3d=function(){var ret=!!testPropsAll("perspective");return ret&&"webkitPerspective"in docElement.style&&injectElementWithStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(node){ret=9===node.offsetLeft&&3===node.offsetHeight}),ret},tests.csstransitions=function(){return testPropsAll("transition")},tests.svg=function(){return!!document.createElementNS&&!!document.createElementNS(ns.svg,"svg").createSVGRect};for(var feature in tests)hasOwnProp(tests,feature)&&(featureName=feature.toLowerCase(),Modernizr[featureName]=tests[feature](),classes.push((Modernizr[featureName]?"":"no-")+featureName));return Modernizr.addTest=function(feature,test){if("object"==typeof feature)for(var key in feature)hasOwnProp(feature,key)&&Modernizr.addTest(key,feature[key]);else{if(feature=feature.toLowerCase(),Modernizr[feature]!==undefined)return Modernizr;test="function"==typeof test?test():test,"undefined"!=typeof enableClasses&&enableClasses&&(docElement.className+=" "+(test?"":"no-")+feature),Modernizr[feature]=test}return Modernizr},setCss(""),modElem=inputElem=null,function(window,document){function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement("p"),parent=ownerDocument.getElementsByTagName("head")[0]||ownerDocument.documentElement;return p.innerHTML="x<style>"+cssText+"</style>",parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return"string"==typeof elements?elements.split(" "):elements}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];return data||(data={},expanID++,ownerDocument[expando]=expanID,expandoData[expanID]=data),data}function createElement(nodeName,ownerDocument,data){if(ownerDocument||(ownerDocument=document),supportsUnknownElements)return ownerDocument.createElement(nodeName);data||(data=getExpandoData(ownerDocument));var node;return node=data.cache[nodeName]?data.cache[nodeName].cloneNode():saveClones.test(nodeName)?(data.cache[nodeName]=data.createElem(nodeName)).cloneNode():data.createElem(nodeName),node.canHaveChildren&&!reSkip.test(nodeName)?data.frag.appendChild(node):node}function createDocumentFragment(ownerDocument,data){if(ownerDocument||(ownerDocument=document),supportsUnknownElements)return ownerDocument.createDocumentFragment();data=data||getExpandoData(ownerDocument);for(var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;l>i;i++)clone.createElement(elems[i]);return clone}function shivMethods(ownerDocument,data){data.cache||(data.cache={},data.createElem=ownerDocument.createElement,data.createFrag=ownerDocument.createDocumentFragment,data.frag=data.createFrag()),ownerDocument.createElement=function(nodeName){return html5.shivMethods?createElement(nodeName,ownerDocument,data):data.createElem(nodeName)},ownerDocument.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+getElements().join().replace(/\w+/g,function(nodeName){return data.createElem(nodeName),data.frag.createElement(nodeName),'c("'+nodeName+'")'})+");return n}")(html5,data.frag)}function shivDocument(ownerDocument){ownerDocument||(ownerDocument=document);var data=getExpandoData(ownerDocument);return!html5.shivCSS||supportsHtml5Styles||data.hasCSS||(data.hasCSS=!!addStyleSheet(ownerDocument,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),supportsUnknownElements||shivMethods(ownerDocument,data),ownerDocument}var supportsHtml5Styles,supportsUnknownElements,options=window.html5||{},reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,expando="_html5shiv",expanID=0,expandoData={};!function(){try{var a=document.createElement("a");a.innerHTML="<xyz></xyz>",supportsHtml5Styles="hidden"in a,supportsUnknownElements=1==a.childNodes.length||function(){document.createElement("a");var frag=document.createDocumentFragment();return"undefined"==typeof frag.cloneNode||"undefined"==typeof frag.createDocumentFragment||"undefined"==typeof frag.createElement}()}catch(e){supportsHtml5Styles=!0,supportsUnknownElements=!0}}();var html5={elements:options.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:options.shivCSS!==!1,supportsUnknownElements:supportsUnknownElements,shivMethods:options.shivMethods!==!1,type:"default",shivDocument:shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5,shivDocument(document)}(this,document),Modernizr._version=version,Modernizr._prefixes=prefixes,Modernizr._domPrefixes=domPrefixes,Modernizr._cssomPrefixes=cssomPrefixes,Modernizr.testProp=function(prop){return testProps([prop])},Modernizr.testAllProps=testPropsAll,Modernizr.testStyles=injectElementWithStyles,docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(enableClasses?" js "+classes.join(" "):""),Modernizr}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var A,B,l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}};B=function(a){function b(a){var e,f,g,a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a};for(f=0;d>f;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;b>f;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var c,b=0;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var m,n,h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var l,o,k=b.createElement("script"),e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var j,e=b.createElement("link"),c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},function(global,undefined){"use strict";function addFromSetImmediateArguments(args){return tasksByHandle[nextHandle]=partiallyApplied.apply(undefined,args),nextHandle++}function partiallyApplied(handler){var args=[].slice.call(arguments,1);return function(){"function"==typeof handler?handler.apply(undefined,args):new Function(""+handler)()}}function runIfPresent(handle){if(currentlyRunningATask)setTimeout(partiallyApplied(runIfPresent,handle),0);else{var task=tasksByHandle[handle];if(task){currentlyRunningATask=!0;try{task()}finally{clearImmediate(handle),currentlyRunningATask=!1}}}}function clearImmediate(handle){delete tasksByHandle[handle]}function installNextTickImplementation(){setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return process.nextTick(partiallyApplied(runIfPresent,handle)),handle}}function canUsePostMessage(){if(global.postMessage&&!global.importScripts){var postMessageIsAsynchronous=!0,oldOnMessage=global.onmessage;return global.onmessage=function(){postMessageIsAsynchronous=!1},global.postMessage("","*"),global.onmessage=oldOnMessage,postMessageIsAsynchronous}}function installPostMessageImplementation(){var messagePrefix="setImmediate$"+Math.random()+"$",onGlobalMessage=function(event){event.source===global&&"string"==typeof event.data&&0===event.data.indexOf(messagePrefix)&&runIfPresent(+event.data.slice(messagePrefix.length))};global.addEventListener?global.addEventListener("message",onGlobalMessage,!1):global.attachEvent("onmessage",onGlobalMessage),setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return global.postMessage(messagePrefix+handle,"*"),handle}}function installMessageChannelImplementation(){var channel=new MessageChannel;channel.port1.onmessage=function(event){var handle=event.data;runIfPresent(handle)},setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return channel.port2.postMessage(handle),handle}}function installReadyStateChangeImplementation(){var html=doc.documentElement;setImmediate=function(){var handle=addFromSetImmediateArguments(arguments),script=doc.createElement("script");return script.onreadystatechange=function(){runIfPresent(handle),script.onreadystatechange=null,html.removeChild(script),script=null},html.appendChild(script),handle}}function installSetTimeoutImplementation(){setImmediate=function(){var handle=addFromSetImmediateArguments(arguments);return setTimeout(partiallyApplied(runIfPresent,handle),0),handle}}if(!global.setImmediate){var setImmediate,nextHandle=1,tasksByHandle={},currentlyRunningATask=!1,doc=global.document,attachTo=Object.getPrototypeOf&&Object.getPrototypeOf(global);attachTo=attachTo&&attachTo.setTimeout?attachTo:global,"[object process]"==={}.toString.call(global.process)?installNextTickImplementation():canUsePostMessage()?installPostMessageImplementation():global.MessageChannel?installMessageChannelImplementation():doc&&"onreadystatechange"in doc.createElement("script")?installReadyStateChangeImplementation():installSetTimeoutImplementation(),attachTo.setImmediate=setImmediate,attachTo.clearImmediate=clearImmediate}}(new Function("return this")()),function(){function Viewport(){return this.PRE_IOS7_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.IOS7_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.DEFAULT_VIEWPORT="initial-scale=1, maximum-scale=1, user-scalable=no",this.ensureViewportElement(),this.platform={},this.platform.name=this.getPlatformName(),this.platform.version=this.getPlatformVersion(),this}Viewport.prototype.ensureViewportElement=function(){this.viewportElement=document.querySelector("meta[name=viewport]"),this.viewportElement||(this.viewportElement=document.createElement("meta"),this.viewportElement.name="viewport",document.head.appendChild(this.viewportElement))},Viewport.prototype.setup=function(){function isWebView(){return!!(window.cordova||window.phonegap||window.PhoneGap)}this.viewportElement&&"true"!=this.viewportElement.getAttribute("data-no-adjust")&&("ios"==this.platform.name?this.platform.version>=7&&isWebView()?this.viewportElement.setAttribute("content",this.IOS7_VIEWPORT):this.viewportElement.setAttribute("content",this.PRE_IOS7_VIEWPORT):this.viewportElement.setAttribute("content",this.DEFAULT_VIEWPORT))},Viewport.prototype.getPlatformName=function(){return navigator.userAgent.match(/Android/i)?"android":navigator.userAgent.match(/iPhone|iPad|iPod/i)?"ios":void 0},Viewport.prototype.getPlatformVersion=function(){var start=window.navigator.userAgent.indexOf("OS ");return window.Number(window.navigator.userAgent.substr(start+3,3).replace("_","."))},window.Viewport=Viewport}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/back_button.tpl",'<span \n  class="toolbar-button--quiet {{modifierTemplater(\'toolbar-button--*\')}}" \n  ng-click="$root.ons.findParentComponentUntil(\'ons-navigator\', $event).popPage({cancelIfRunning: true})"\n  ng-show="showBackButton"\n  style="height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;">\n  \n  <i \n    class="ion-ios-arrow-back ons-back-button__icon" \n    style="vertical-align: top; background-color: transparent; height: 44px; line-height: 44px; font-size: 36px; margin-left: 8px; margin-right: 2px; width: 16px; display: inline-block; padding-top: 1px;"></i>\n\n  <span \n    style="vertical-align: top; display: inline-block; line-height: 44px; height: 44px;" \n    class="back-button__label"></span>\n</span>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/button.tpl",'<span class="label ons-button-inner"></span>\n<span class="spinner button__spinner {{modifierTemplater(\'button--*__spinner\')}}"></span>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/dialog.tpl",'<div class="dialog-mask"></div>\n<div class="dialog {{ modifierTemplater(\'dialog--*\') }}"></div>\n</div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/icon.tpl",'<i class="fa fa-{{icon}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}" ng-class="sizeClass" ng-style="style"></i>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/popover.tpl",'<div class="popover-mask"></div>\n<div class="popover popover--{{ direction }} {{ modifierTemplater(\'popover--*\') }}">\n  <div class="popover__content {{ modifierTemplater(\'popover__content--*\') }}"></div>\n  <div class="popover__{{ arrowPosition }}-arrow"></div>\n</div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/row.tpl",'<div class="row row-{{align}} ons-row-inner"></div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/sliding_menu.tpl",'<div class="onsen-sliding-menu__menu ons-sliding-menu-inner"></div>\n<div class="onsen-sliding-menu__main ons-sliding-menu-inner"></div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/split_view.tpl",'<div class="onsen-split-view__secondary full-screen ons-split-view-inner"></div>\n<div class="onsen-split-view__main full-screen ons-split-view-inner"></div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/switch.tpl",'<label class="switch {{modifierTemplater(\'switch--*\')}}">\n  <input type="checkbox" class="switch__input {{modifierTemplater(\'switch--*__input\')}}" ng-model="model">\n  <div class="switch__toggle {{modifierTemplater(\'switch--*__toggle\')}}"></div>\n</label>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/tab.tpl",'<input type="radio" name="tab-bar-{{tabbarId}}" style="display: none">\n<button class="tab-bar__button tab-bar-inner {{tabbarModifierTemplater(\'tab-bar--*__button\')}} {{modifierTemplater(\'tab-bar__button--*\')}}" ng-click="tryToChange()">\n</button>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/tab_bar.tpl",'<div class="ons-tab-bar__content tab-bar__content"></div>\n<div ng-hide="hideTabs" class="tab-bar ons-tab-bar__footer {{modifierTemplater(\'tab-bar--*\')}} ons-tabbar-inner"></div>\n')}])}(),function(module){try{module=angular.module("templates-main")}catch(err){module=angular.module("templates-main",[])}module.run(["$templateCache",function($templateCache){"use strict";$templateCache.put("templates/toolbar_button.tpl","<span class=\"toolbar-button {{modifierTemplater('toolbar-button--*')}} navigation-bar__line-height\" ng-transclude></span>\n")}])}(),window.DoorLock=function(){var DoorLock=function(options){options=options||{},this._lockList=[],this._waitList=[],this._log=options.log||function(){}};return DoorLock.generateId=function(){var i=0;return function(){return i++}}(),DoorLock.prototype={lock:function(){var self=this,unlock=function(){self._unlock(unlock)};return unlock.id=DoorLock.generateId(),this._lockList.push(unlock),this._log("lock: "+unlock.id),unlock},_unlock:function(fn){var index=this._lockList.indexOf(fn);if(-1===index)throw new Error("This function is not registered in the lock list.");this._lockList.splice(index,1),this._log("unlock: "+fn.id),this._tryToFreeWaitList()},_tryToFreeWaitList:function(){for(;!this.isLocked()&&this._waitList.length>0;)this._waitList.shift()()},waitUnlock:function(callback){if(!(callback instanceof Function))throw new Error("The callback param must be a function.");this.isLocked()?this._waitList.push(callback):callback()},isLocked:function(){return this._lockList.length>0}},DoorLock}(),window.ons=function(){"use strict";function waitDeviceReady(){var unlockDeviceReady=ons._readyLock.lock();window.addEventListener("DOMContentLoaded",function(){ons.isWebView()?window.document.addEventListener("deviceready",unlockDeviceReady,!1):unlockDeviceReady()},!1)}function waitOnsenUILoad(){var unlockOnsenUI=ons._readyLock.lock();module.run(["$compile","$rootScope","$onsen",function($compile,$rootScope){if("loading"===document.readyState||"uninitialized"==document.readyState)window.addEventListener("DOMContentLoaded",function(){document.body.appendChild(document.createElement("ons-dummy-for-init"))});else{if(!document.body)throw new Error("Invalid initialization state.");document.body.appendChild(document.createElement("ons-dummy-for-init"))}$rootScope.$on("$ons-ready",unlockOnsenUI)}])}function initAngularModule(){module.value("$onsGlobal",ons),module.run(["$compile","$rootScope","$onsen","$q",function($compile,$rootScope,$onsen,$q){ons._onsenService=$onsen,ons._qService=$q,$rootScope.ons=window.ons,$rootScope.console=window.console,$rootScope.alert=window.alert,ons.$compile=$compile}])}function initKeyboardEvents(){ons.softwareKeyboard=new MicroEvent,ons.softwareKeyboard._visible=!1;var onShow=function(){ons.softwareKeyboard._visible=!0,ons.softwareKeyboard.emit("show")},onHide=function(){ons.softwareKeyboard._visible=!1,ons.softwareKeyboard.emit("hide")},bindEvents=function(){return"undefined"!=typeof Keyboard?(Keyboard.onshow=onShow,Keyboard.onhide=onHide,ons.softwareKeyboard.emit("init",{visible:Keyboard.isVisible}),!0):"undefined"!=typeof cordova.plugins&&"undefined"!=typeof cordova.plugins.Keyboard?(window.addEventListener("native.keyboardshow",onShow),window.addEventListener("native.keyboardhide",onHide),ons.softwareKeyboard.emit("init",{visible:cordova.plugins.Keyboard.isVisible}),!0):!1},noPluginError=function(){console.warn("ons-keyboard: Cordova Keyboard plugin is not present.")};document.addEventListener("deviceready",function(){bindEvents()||((document.querySelector("[ons-keyboard-active]")||document.querySelector("[ons-keyboard-inactive]"))&&noPluginError(),ons.softwareKeyboard.on=noPluginError)})}function createOnsenFacade(){var ons={_readyLock:new DoorLock,_onsenService:null,_config:{autoStatusBarFill:!0},_unlockersDict:{},componentBase:window,bootstrap:function(name,deps){angular.isArray(name)&&(deps=name,name=void 0),name||(name="myOnsenApp"),deps=["onsen"].concat(angular.isArray(deps)?deps:[]);var module=angular.module(name,deps),doc=window.document;if("loading"==doc.readyState||"uninitialized"==doc.readyState||"interactive"==doc.readyState)doc.addEventListener("DOMContentLoaded",function(){angular.bootstrap(doc.documentElement,[name])},!1);else{if(!doc.documentElement)throw new Error("Invalid state");angular.bootstrap(doc.documentElement,[name])}return module},enableAutoStatusBarFill:function(){if(this.isReady())throw new Error("This method must be called before ons.isReady() is true.");this._config.autoStatusBarFill=!0},disableAutoStatusBarFill:function(){if(this.isReady())throw new Error("This method must be called before ons.isReady() is true.");this._config.autoStatusBarFill=!1},findParentComponentUntil:function(name,dom){var element;return dom instanceof HTMLElement?element=angular.element(dom):dom instanceof angular.element?element=dom:dom.target&&(element=angular.element(dom.target)),element.inheritedData(name)},setDefaultDeviceBackButtonListener:function(listener){this._getOnsenService().getDefaultDeviceBackButtonHandler().setListener(listener)},disableDeviceBackButtonHandler:function(){this._getOnsenService().DeviceBackButtonHandler.disable()},enableDeviceBackButtonHandler:function(){this._getOnsenService().DeviceBackButtonHandler.enable()},findComponent:function(selector,dom){var target=(dom?dom:document).querySelector(selector);return target?angular.element(target).data(target.nodeName.toLowerCase())||null:null},isReady:function(){return!ons._readyLock.isLocked()},compile:function(dom){if(!ons.$compile)throw new Error("ons.$compile() is not ready. Wait for initialization with ons.ready().");if(!(dom instanceof HTMLElement))throw new Error("First argument must be an instance of HTMLElement.");var scope=angular.element(dom).scope();if(!scope)throw new Error("AngularJS Scope is null. Argument DOM element must be attached in DOM document.");ons.$compile(dom)(scope)},_getOnsenService:function(){if(!this._onsenService)throw new Error("$onsen is not loaded, wait for ons.ready().");return this._onsenService},ready:function(callback){if(callback instanceof Function)ons.isReady()?callback():ons._readyLock.waitUnlock(callback);else if(angular.isArray(callback)&&arguments[1]instanceof Function){var dependencies=callback;callback=arguments[1],ons.ready(function(){var $onsen=ons._getOnsenService();$onsen.waitForVariables(dependencies,callback)})}},isWebView:function(){if("loading"===document.readyState||"uninitialized"==document.readyState)throw new Error("isWebView() method is available after dom contents loaded.");return!!(window.cordova||window.phonegap||window.PhoneGap)},createAlertDialog:function(page,options){if(options=options||{},!page)throw new Error("Page url must be defined.");var alertDialog=angular.element("<ons-alert-dialog>"),$onsen=this._getOnsenService();return angular.element(document.body).append(angular.element(alertDialog)),$onsen.getPageHTMLAsync(page).then(function(html){var div=document.createElement("div");div.innerHTML=html;for(var el=angular.element(div.querySelector("ons-alert-dialog")),attrs=el.prop("attributes"),i=0,l=attrs.length;l>i;i++)alertDialog.attr(attrs[i].name,attrs[i].value);alertDialog.html(el.html());var parentScope;return options.parentScope?(parentScope=options.parentScope.$new(),ons.$compile(alertDialog)(parentScope)):ons.compile(alertDialog[0]),el.attr("disabled")&&alertDialog.attr("disabled","disabled"),parentScope&&(alertDialog.data("ons-alert-dialog")._parentScope=parentScope),alertDialog.data("ons-alert-dialog")})},createDialog:function(page,options){if(options=options||{},!page)throw new Error("Page url must be defined.");var dialog=angular.element("<ons-dialog>"),$onsen=this._getOnsenService();return angular.element(document.body).append(angular.element(dialog)),$onsen.getPageHTMLAsync(page).then(function(html){var div=document.createElement("div");div.innerHTML=html;for(var el=angular.element(div.querySelector("ons-dialog")),attrs=el.prop("attributes"),i=0,l=attrs.length;l>i;i++)dialog.attr(attrs[i].name,attrs[i].value);dialog.html(el.html());var parentScope;options.parentScope?(parentScope=options.parentScope.$new(),ons.$compile(dialog)(parentScope)):ons.compile(dialog[0]),el.attr("disabled")&&dialog.attr("disabled","disabled");var deferred=ons._qService.defer();return dialog.on("ons-dialog:init",function(e){var child=dialog[0].querySelector(".dialog");if(el[0].hasAttribute("style")){var parentStyle=el[0].getAttribute("style"),childStyle=child.getAttribute("style"),newStyle=function(a,b){var c=(";"===a.substr(-1)?a:a+";")+(";"===b.substr(-1)?b:b+";");return c}(parentStyle,childStyle);child.setAttribute("style",newStyle)}parentScope&&(e.component._parentScope=parentScope),deferred.resolve(e.component)}),deferred.promise})},createPopover:function(page,options){if(options=options||{},!page)throw new Error("Page url must be defined.");var popover=angular.element("<ons-popover>"),$onsen=this._getOnsenService();return angular.element(document.body).append(angular.element(popover)),$onsen.getPageHTMLAsync(page).then(function(html){var div=document.createElement("div");div.innerHTML=html;for(var el=angular.element(div.querySelector("ons-popover")),attrs=el.prop("attributes"),i=0,l=attrs.length;l>i;i++)popover.attr(attrs[i].name,attrs[i].value);popover.html(el.html());var parentScope;options.parentScope?(parentScope=options.parentScope.$new(),ons.$compile(popover)(parentScope)):ons.compile(popover[0]),el.attr("disabled")&&popover.attr("disabled","disabled");var deferred=ons._qService.defer();return popover.on("ons-popover:init",function(e){var child=popover[0].querySelector(".popover");if(el[0].hasAttribute("style")){var parentStyle=el[0].getAttribute("style"),childStyle=child.getAttribute("style"),newStyle=function(a,b){var c=(";"===a.substr(-1)?a:a+";")+(";"===b.substr(-1)?b:b+";");return c}(parentStyle,childStyle);child.setAttribute("style",newStyle)}parentScope&&(e.component._parentScope=parentScope),deferred.resolve(e.component)}),deferred.promise})}};return ons}var module=angular.module("onsen",["templates-main"]);angular.module("onsen.directives",["onsen"]);var ons=createOnsenFacade();return initKeyboardEvents(),waitDeviceReady(),waitOnsenUILoad(),initAngularModule(),ons
}(),function(){"use strict";var module=angular.module("onsen");module.factory("AlertDialogView",["$onsen","DialogAnimator","SlideDialogAnimator","AndroidAlertDialogAnimator","IOSAlertDialogAnimator",function($onsen,DialogAnimator,SlideDialogAnimator,AndroidAlertDialogAnimator,IOSAlertDialogAnimator){var AlertDialogView=Class.extend({init:function(scope,element,attrs){if(this._scope=scope,this._element=element,this._attrs=attrs,this._element.css({display:"none",zIndex:20001}),this._dialog=element,this._visible=!1,this._doorLock=new DoorLock,this._animation=AlertDialogView._animatorDict["undefined"!=typeof attrs.animation?attrs.animation:"default"],!this._animation)throw new Error("No such animation: "+attrs.animation);this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)),this._createMask(attrs.maskColor),this._scope.$on("$destroy",this._destroy.bind(this))},show:function(options){options=options||{};var cancel=!1,callback=options.callback||function(){};this.emit("preshow",{alertDialog:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;this._mask.css("display","block"),this._mask.css("opacity",1),this._element.css("display","block"),options.animation&&(animation=AlertDialogView._animatorDict[options.animation]),animation.show(this,function(){this._visible=!0,unlock(),this.emit("postshow",{alertDialog:this}),callback()}.bind(this))}.bind(this))},hide:function(options){options=options||{};var cancel=!1,callback=options.callback||function(){};this.emit("prehide",{alertDialog:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;options.animation&&(animation=AlertDialogView._animatorDict[options.animation]),animation.hide(this,function(){this._element.css("display","none"),this._mask.css("display","none"),this._visible=!1,unlock(),this.emit("posthide",{alertDialog:this}),callback()}.bind(this))}.bind(this))},isShown:function(){return this._visible},destroy:function(){this._parentScope?(this._parentScope.$destroy(),this._parentScope=null):this._scope.$destroy()},_destroy:function(){this.emit("destroy"),this._mask.off(),this._element.remove(),this._mask.remove(),this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=this._scope=this._attrs=this._element=this._mask=null},setDisabled:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this._element.attr("disabled",!0):this._element.removeAttr("disabled")},isDisabled:function(){return this._element[0].hasAttribute("disabled")},setCancelable:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this._element.attr("cancelable",!0):this._element.removeAttr("cancelable")},isCancelable:function(){return this._element[0].hasAttribute("cancelable")},_cancel:function(){this.isCancelable()&&this.hide({callback:function(){this.emit("cancel")}.bind(this)})},_onDeviceBackButton:function(event){this.isCancelable()?this._cancel.bind(this)():event.callParentHandler()},_createMask:function(color){this._mask=angular.element("<div>").addClass("alert-dialog-mask").css({zIndex:2e4,display:"none"}),this._mask.on("click",this._cancel.bind(this)),color&&this._mask.css("background-color",color),angular.element(document.body).append(this._mask)}});return AlertDialogView._animatorDict={"default":$onsen.isAndroid()?new AndroidAlertDialogAnimator:new IOSAlertDialogAnimator,fade:$onsen.isAndroid()?new AndroidAlertDialogAnimator:new IOSAlertDialogAnimator,slide:new SlideDialogAnimator,none:new DialogAnimator},AlertDialogView.registerAnimator=function(name,animator){if(!(animator instanceof DialogAnimator))throw new Error('"animator" param must be an instance of DialogAnimator');this._animatorDict[name]=animator},MicroEvent.mixin(AlertDialogView),AlertDialogView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("AndroidAlertDialogAnimator",["DialogAnimator",function(DialogAnimator){var AndroidAlertDialogAnimator=DialogAnimator.extend({timing:"cubic-bezier(.1, .7, .4, 1)",duration:.2,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)",opacity:0},duration:0}).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:0}).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)",opacity:0},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return AndroidAlertDialogAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("AndroidDialogAnimator",["DialogAnimator",function(DialogAnimator){var AndroidDialogAnimator=DialogAnimator.extend({timing:"ease-in-out",duration:.3,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -60%, 0)",opacity:0},duration:0}).queue({css:{transform:"translate3d(-50%, -50%, 0)",opacity:1},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -50%, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3d(-50%, -60%, 0)",opacity:0},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return AndroidDialogAnimator}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("ButtonView",["$onsen",function(){var ButtonView=Class.extend({init:function(scope,element,attrs){this._element=element,this._scope=scope,this._attrs=attrs},startSpin:function(){this._attrs.$set("shouldSpin","true")},stopSpin:function(){this._attrs.$set("shouldSpin","false")},isSpinning:function(){return"true"===this._attrs.shouldSpin},setSpinAnimation:function(animation){this._scope.$apply(function(){var animations=["slide-left","slide-right","slide-up","slide-down","expand-left","expand-right","expand-up","expand-down","zoom-out","zoom-in"];animations.indexOf(animation)<0&&(console.warn("Animation "+animation+"doesn't exist."),animation="slide-left"),this._scope.animation=animation}.bind(this))},isDisabled:function(){return this._element[0].hasAttribute("disabled")},setDisabled:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this._element[0].setAttribute("disabled",""):this._element[0].removeAttribute("disabled")}});return MicroEvent.mixin(ButtonView),ButtonView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("CarouselView",["$onsen",function(){var VerticalModeTrait={_getScrollDelta:function(event){return event.gesture.deltaY},_getScrollVelocity:function(event){return event.gesture.velocityY},_getElementSize:function(){return this._currentElementSize||(this._currentElementSize=this._element[0].getBoundingClientRect().height),this._currentElementSize},_generateScrollTransform:function(scroll){return"translate3d(0px, "+-scroll+"px, 0px)"},_layoutCarouselItems:function(){for(var children=this._getCarouselItemElements(),sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),i=0;i<children.length;i++)angular.element(children[i]).css({position:"absolute",height:sizeAttr,width:"100%",visibility:"visible",left:"0px",top:i*sizeInfo.number+sizeInfo.unit})}},HorizontalModeTrait={_getScrollDelta:function(event){return event.gesture.deltaX},_getScrollVelocity:function(event){return event.gesture.velocityX},_getElementSize:function(){return this._currentElementSize||(this._currentElementSize=this._element[0].getBoundingClientRect().width),this._currentElementSize},_generateScrollTransform:function(scroll){return"translate3d("+-scroll+"px, 0px, 0px)"},_layoutCarouselItems:function(){for(var children=this._getCarouselItemElements(),sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),i=0;i<children.length;i++)angular.element(children[i]).css({position:"absolute",width:sizeAttr,height:"100%",top:"0px",visibility:"visible",left:i*sizeInfo.number+sizeInfo.unit})}},CarouselView=Class.extend({_element:void 0,_scope:void 0,_doorLock:void 0,_scroll:void 0,init:function(scope,element,attrs){this._element=element,this._scope=scope,this._attrs=attrs,this._doorLock=new DoorLock,this._scroll=0,this._lastActiveIndex=0,this._bindedOnDrag=this._onDrag.bind(this),this._bindedOnDragEnd=this._onDragEnd.bind(this),this._bindedOnResize=this._onResize.bind(this),this._mixin(this._isVertical()?VerticalModeTrait:HorizontalModeTrait),this._prepareEventListeners(),this._layoutCarouselItems(),this._setupInitialIndex(),this._attrs.$observe("direction",this._onDirectionChange.bind(this)),this._scope.$on("$destroy",this._destroy.bind(this)),this._saveLastState()},_onResize:function(){this.refresh()},_onDirectionChange:function(){this._isVertical()?this._element.css({overflowX:"auto",overflowY:""}):this._element.css({overflowX:"",overflowY:"auto"})},_saveLastState:function(){this._lastState={elementSize:this._getCarouselItemSize(),carouselElementCount:this._getCarouselItemCount(),width:this._getCarouselItemSize()*this._getCarouselItemCount()}},_getCarouselItemSize:function(){var sizeAttr=this._getCarouselItemSizeAttr(),sizeInfo=this._decomposeSizeString(sizeAttr),elementSize=this._getElementSize();if("%"===sizeInfo.unit)return Math.round(sizeInfo.number/100*elementSize);if("px"===sizeInfo.unit)return sizeInfo.number;throw new Error("Invalid state")},_getInitialIndex:function(){var index=parseInt(this._element.attr("initial-index"),10);return"number"!=typeof index||isNaN(index)?0:Math.max(Math.min(index,this._getCarouselItemCount()-1),0)},_getCarouselItemSizeAttr:function(){var attrName="item-"+(this._isVertical()?"height":"width"),itemSizeAttr=(""+this._element.attr(attrName)).trim();return itemSizeAttr.match(/^\d+(px|%)$/)?itemSizeAttr:"100%"},_decomposeSizeString:function(size){var matches=size.match(/^(\d+)(px|%)/);return{number:parseInt(matches[1],10),unit:matches[2]}},_setupInitialIndex:function(){this._scroll=this._getCarouselItemSize()*this._getInitialIndex(),this._lastActiveIndex=this._getInitialIndex(),this._scrollTo(this._scroll)},setSwipeable:function(swipeable){swipeable?this._element[0].setAttribute("swipeable",""):this._element[0].removeAttribute("swipeable")},isSwipeable:function(){return this._element[0].hasAttribute("swipeable")},setAutoScrollRatio:function(ratio){if(0>ratio||ratio>1)throw new Error("Invalid ratio.");this._element[0].setAttribute("auto-scroll-ratio",ratio)},getAutoScrollRatio:function(){var attr=this._element[0].getAttribute("auto-scroll-ratio");if(!attr)return.5;var scrollRatio=parseFloat(attr);if(0>scrollRatio||scrollRatio>1)throw new Error("Invalid ratio.");return isNaN(scrollRatio)?.5:scrollRatio},setActiveCarouselItemIndex:function(index,options){options=options||{},index=Math.max(0,Math.min(index,this._getCarouselItemCount()-1));var scroll=this._getCarouselItemSize()*index,max=this._calculateMaxScroll();this._scroll=Math.max(0,Math.min(max,scroll)),this._scrollTo(this._scroll,{animate:"none"!==options.animation,callback:options.callback}),this._tryFirePostChangeEvent()},getActiveCarouselItemIndex:function(){var scroll=this._scroll,count=this._getCarouselItemCount(),size=this._getCarouselItemSize();if(0>scroll)return 0;for(var i=0;count>i;i++)if(scroll>=size*i&&size*(i+1)>scroll)return i;return i},next:function(options){this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex()+1,options)},prev:function(options){this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex()-1,options)},setAutoScrollEnabled:function(enabled){enabled?this._element[0].setAttribute("auto-scroll",""):this._element[0].removeAttribute("auto-scroll")},isAutoScrollEnabled:function(){return this._element[0].hasAttribute("auto-scroll")},setDisabled:function(disabled){disabled?this._element[0].setAttribute("disabled",""):this._element[0].removeAttribute("disabled")},isDisabled:function(){return this._element[0].hasAttribute("disabled")},setOverscrollable:function(scrollable){scrollable?this._element[0].setAttribute("overscrollable",""):this._element[0].removeAttribute("overscrollable")},_mixin:function(trait){Object.keys(trait).forEach(function(key){this[key]=trait[key]}.bind(this))},_isEnabledChangeEvent:function(){var elementSize=this._getElementSize(),carouselItemSize=this._getCarouselItemSize();return this.isAutoScrollEnabled()&&elementSize===carouselItemSize},_isVertical:function(){return"vertical"===this._element.attr("direction")},_prepareEventListeners:function(){this._hammer=new Hammer(this._element[0],{dragMinDistance:1}),this._hammer.on("drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown",this._bindedOnDrag),this._hammer.on("dragend",this._bindedOnDragEnd),angular.element(window).on("resize",this._bindedOnResize)},_tryFirePostChangeEvent:function(){var currentIndex=this.getActiveCarouselItemIndex();if(this._lastActiveIndex!==currentIndex){var lastActiveIndex=this._lastActiveIndex;this._lastActiveIndex=currentIndex,this.emit("postchange",{carousel:this,activeIndex:currentIndex,lastActiveIndex:lastActiveIndex})}},_onDrag:function(event){if(this.isSwipeable()){var direction=event.gesture.direction;if((!this._isVertical()||"left"!==direction&&"right"!==direction)&&(this._isVertical()||"up"!==direction&&"down"!==direction)){event.stopPropagation(),this._lastDragEvent=event;var scroll=this._scroll-this._getScrollDelta(event);this._scrollTo(scroll),event.gesture.preventDefault(),this._tryFirePostChangeEvent()}}},_onDragEnd:function(event){if(this._currentElementSize=void 0,this._carouselItemElements=void 0,this.isSwipeable()){if(this._scroll=this._scroll-this._getScrollDelta(event),0!==this._getScrollDelta(event)&&event.stopPropagation(),this._isOverScroll(this._scroll)){var waitForAction=!1;this.emit("overscroll",{carousel:this,activeIndex:this.getActiveCarouselItemIndex(),direction:this._getOverScrollDirection(),waitToReturn:function(promise){waitForAction=!0,promise.then(function(){this._scrollToKillOverScroll()}.bind(this))}.bind(this)}),waitForAction||this._scrollToKillOverScroll()}else this._startMomemtumScroll(event);this._lastDragEvent=null,event.gesture.preventDefault()}},_getTouchEvents:function(){var EVENTS=["drag","dragstart","dragend","dragup","dragdown","dragleft","dragright","swipe","swipeup","swipedown","swipeleft","swiperight"];return EVENTS.join(" ")},isOverscrollable:function(){return this._element[0].hasAttribute("overscrollable")},_startMomemtumScroll:function(){if(this._lastDragEvent){var velocity=this._getScrollVelocity(this._lastDragEvent),duration=.3,scrollDelta=100*duration*velocity,scroll=this._scroll+(this._getScrollDelta(this._lastDragEvent)>0?-scrollDelta:scrollDelta);scroll=this._normalizeScrollPosition(scroll),this._scroll=scroll,animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(this._scroll)},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){done(),this._tryFirePostChangeEvent()}.bind(this)).play()}},_normalizeScrollPosition:function(scroll){var max=this._calculateMaxScroll();if(this.isAutoScrollEnabled()){for(var arr=[],size=this._getCarouselItemSize(),i=0;i<this._getCarouselItemCount();i++)max>=i*size&&arr.push(i*size);arr.push(max),arr.sort(function(left,right){return left=Math.abs(left-scroll),right=Math.abs(right-scroll),left-right}),arr=arr.filter(function(item,pos){return!pos||item!=arr[pos-1]});var lastScroll=this._lastActiveIndex*size,scrollRatio=Math.abs(scroll-lastScroll)/size;return scrollRatio<=this.getAutoScrollRatio()?lastScroll:scrollRatio>this.getAutoScrollRatio()&&1>scrollRatio&&arr[0]===lastScroll&&arr.length>1?arr[1]:arr[0]}return Math.max(0,Math.min(max,scroll))},_getCarouselItemElements:function(){for(var nodeList=this._element[0].querySelectorAll("ons-carousel-item"),rv=[],i=nodeList.length;i--;)rv.unshift(nodeList[i]);return rv},_scrollTo:function(scroll,options){function normalizeScroll(scroll){var ratio=.35;if(0>scroll)return isOverscrollable?Math.round(scroll*ratio):0;var maxScroll=self._calculateMaxScroll();return scroll>maxScroll?isOverscrollable?maxScroll+Math.round((scroll-maxScroll)*ratio):maxScroll:scroll}options=options||{};var self=this,isOverscrollable=this.isOverscrollable();options.animate?animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(normalizeScroll(scroll))},{duration:.3,timing:"cubic-bezier(.1, .7, .1, 1)"}).play(options.callback):animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(normalizeScroll(scroll))}).play(options.callback)},_calculateMaxScroll:function(){var max=this._getCarouselItemCount()*this._getCarouselItemSize()-this._getElementSize();return Math.ceil(0>max?0:max)},_isOverScroll:function(scroll){return 0>scroll||scroll>this._calculateMaxScroll()?!0:!1},_getOverScrollDirection:function(){return this._isVertical()?this._scroll<=0?"up":"down":this._scroll<=0?"left":"right"},_scrollToKillOverScroll:function(){var duration=.4;if(this._scroll<0)return animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(0)},{duration:duration,timing:"cubic-bezier(.1, .4, .1, 1)"}).play(),this._scroll=0,void 0;var maxScroll=this._calculateMaxScroll();return maxScroll<this._scroll?(animit(this._getCarouselItemElements()).queue({transform:this._generateScrollTransform(maxScroll)},{duration:duration,timing:"cubic-bezier(.1, .4, .1, 1)"}).play(),this._scroll=maxScroll,void 0):void 0},_getCarouselItemCount:function(){return this._getCarouselItemElements().length},refresh:function(){if(0!==this._getCarouselItemSize()){if(this._mixin(this._isVertical()?VerticalModeTrait:HorizontalModeTrait),this._layoutCarouselItems(),this._lastState&&this._lastState.width>0){var scroll=this._scroll;this._isOverScroll(scroll)?this._scrollToKillOverScroll():(this.isAutoScrollEnabled()&&(scroll=this._normalizeScrollPosition(scroll)),this._scrollTo(scroll))}this._saveLastState(),this.emit("refresh",{carousel:this})}},first:function(){this.setActiveCarouselItemIndex(0)},last:function(){this.setActiveCarouselItemIndex(Math.max(this._getCarouselItemCount()-1,0))},_destroy:function(){this.emit("destroy"),this._hammer.off("drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown",this._bindedOnDrag),this._hammer.off("dragend",this._bindedOnDragEnd),angular.element(window).off("resize",this._bindedOnResize),this._element=this._scope=this._attrs=null}});return MicroEvent.mixin(CarouselView),CarouselView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("DialogView",["$onsen","DialogAnimator","IOSDialogAnimator","AndroidDialogAnimator","SlideDialogAnimator",function($onsen,DialogAnimator,IOSDialogAnimator,AndroidDialogAnimator,SlideDialogAnimator){var DialogView=Class.extend({init:function(scope,element,attrs){if(this._scope=scope,this._element=element,this._attrs=attrs,this._element.css("display","none"),this._dialog=angular.element(element[0].querySelector(".dialog")),this._mask=angular.element(element[0].querySelector(".dialog-mask")),this._dialog.css("z-index",20001),this._mask.css("z-index",2e4),this._mask.on("click",this._cancel.bind(this)),this._visible=!1,this._doorLock=new DoorLock,this._animation=DialogView._animatorDict["undefined"!=typeof attrs.animation?attrs.animation:"default"],!this._animation)throw new Error("No such animation: "+attrs.animation);this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)),this._scope.$on("$destroy",this._destroy.bind(this))},getDeviceBackButtonHandler:function(){return this._deviceBackButtonHandler},show:function(options){options=options||{};var cancel=!1,callback=options.callback||function(){};this.emit("preshow",{dialog:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;this._element.css("display","block"),this._mask.css("opacity",1),options.animation&&(animation=DialogView._animatorDict[options.animation]),animation.show(this,function(){this._visible=!0,unlock(),this.emit("postshow",{dialog:this}),callback()}.bind(this))}.bind(this))},hide:function(options){options=options||{};var cancel=!1,callback=options.callback||function(){};this.emit("prehide",{dialog:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;options.animation&&(animation=DialogView._animatorDict[options.animation]),animation.hide(this,function(){this._element.css("display","none"),this._visible=!1,unlock(),this.emit("posthide",{dialog:this}),callback()}.bind(this))}.bind(this))},isShown:function(){return this._visible},destroy:function(){this._parentScope?(this._parentScope.$destroy(),this._parentScope=null):this._scope.$destroy()},_destroy:function(){this.emit("destroy"),this._element.remove(),this._deviceBackButtonHandler.destroy(),this._mask.off(),this._deviceBackButtonHandler=this._scope=this._attrs=this._element=this._dialog=this._mask=null},setDisabled:function(disabled){if("boolean"!=typeof disabled)throw new Error("Argument must be a boolean.");disabled?this._element.attr("disabled",!0):this._element.removeAttr("disabled")},isDisabled:function(){return this._element[0].hasAttribute("disabled")},setCancelable:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this._element.attr("cancelable",!0):this._element.removeAttr("cancelable")},isCancelable:function(){return this._element[0].hasAttribute("cancelable")},_cancel:function(){this.isCancelable()&&this.hide({callback:function(){this.emit("cancel")}.bind(this)})},_onDeviceBackButton:function(event){this.isCancelable()?this._cancel.bind(this)():event.callParentHandler()}});return DialogView._animatorDict={"default":$onsen.isAndroid()?new AndroidDialogAnimator:new IOSDialogAnimator,fade:$onsen.isAndroid()?new AndroidDialogAnimator:new IOSDialogAnimator,slide:new SlideDialogAnimator,none:new DialogAnimator},DialogView.registerAnimator=function(name,animator){if(!(animator instanceof DialogAnimator))throw new Error('"animator" param must be an instance of DialogAnimator');this._animatorDict[name]=animator},MicroEvent.mixin(DialogView),DialogView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("DialogAnimator",function(){var DialogAnimator=Class.extend({show:function(dialog,callback){callback()},hide:function(dialog,callback){callback()}});return DialogAnimator})}(),function(){"use strict";var module=angular.module("onsen");module.factory("FadePopoverAnimator",["PopoverAnimator",function(PopoverAnimator){var FadePopoverAnimator=PopoverAnimator.extend({timing:"cubic-bezier(.1, .7, .4, 1)",duration:.2,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(popover,callback){var pop=popover._element[0].querySelector(".popover"),mask=popover._element[0].querySelector(".popover-mask");animit.runAll(animit(mask).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(pop).queue({transform:"scale3d(1.3, 1.3, 1.0)",opacity:0}).queue({transform:"scale3d(1.0, 1.0,  1.0)",opacity:1},{duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(popover,callback){var pop=popover._element[0].querySelector(".popover"),mask=popover._element[0].querySelector(".popover-mask");animit.runAll(animit(mask).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(pop).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return FadePopoverAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("FadeTransitionAnimator",["NavigatorTransitionAnimator",function(NavigatorTransitionAnimator){var FadeTransitionAnimator=NavigatorTransitionAnimator.extend({push:function(enterPage,leavePage,callback){animit.runAll(animit([enterPage.getPageView().getContentElement(),enterPage.getPageView().getBackgroundElement()]).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:.4,timing:"linear"}).resetStyle().queue(function(done){callback(),done()}),animit(enterPage.getPageView().getToolbarElement()).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:.4,timing:"linear"}).resetStyle())},pop:function(enterPage,leavePage,callback){animit.runAll(animit([leavePage.getPageView().getContentElement(),leavePage.getPageView().getBackgroundElement()]).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:.4,timing:"linear"}).queue(function(done){callback(),done()}),animit(leavePage.getPageView().getToolbarElement()).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)",opacity:0},duration:.4,timing:"linear"}))}});return FadeTransitionAnimator}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("GenericView",["$onsen",function(){var GenericView=Class.extend({init:function(scope,element){this._element=element,this._scope=scope}});return MicroEvent.mixin(GenericView),GenericView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("IOSAlertDialogAnimator",["DialogAnimator",function(DialogAnimator){var IOSAlertDialogAnimator=DialogAnimator.extend({timing:"cubic-bezier(.1, .7, .4, 1)",duration:.2,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.3, 1.3, 1.0)",opacity:0},duration:0}).queue({css:{transform:"translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)",opacity:1},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{opacity:1},duration:0}).queue({css:{opacity:0},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return IOSAlertDialogAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("IOSDialogAnimator",["DialogAnimator",function(DialogAnimator){var IOSDialogAnimator=DialogAnimator.extend({timing:"ease-in-out",duration:.3,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, 300%, 0)"},duration:0}).queue({css:{transform:"translate3d(-50%, -50%, 0)"},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3d(-50%, -50%, 0)"},duration:0}).queue({css:{transform:"translate3d(-50%, 300%, 0)"},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return IOSDialogAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("IOSSlideTransitionAnimator",["NavigatorTransitionAnimator","PageView",function(NavigatorTransitionAnimator){var IOSSlideTransitionAnimator=NavigatorTransitionAnimator.extend({backgroundMask:angular.element('<div style="position: absolute; width: 100%;height: 100%; background-color: black; opacity: 0;"></div>'),_decompose:function(page){function excludeBackButtonLabel(elements){for(var result=[],i=0;i<elements.length;i++)"ons-back-button"===elements[i].nodeName.toLowerCase()?result.push(elements[i].querySelector(".ons-back-button__icon")):result.push(elements[i]);return result}var left=page.getPageView().getToolbarLeftItemsElement(),right=page.getPageView().getToolbarRightItemsElement(),other=[].concat(0===left.children.length?left:excludeBackButtonLabel(left.children)).concat(0===right.children.length?right:excludeBackButtonLabel(right.children)),pageLabels=[page.getPageView().getToolbarCenterItemsElement(),page.getPageView().getToolbarBackButtonLabelElement()];return{pageLabels:pageLabels,other:other,content:page.getPageView().getContentElement(),background:page.getPageView().getBackgroundElement(),toolbar:page.getPageView().getToolbarElement(),bottomToolbar:page.getPageView().getBottomToolbarElement()}},_shouldAnimateToolbar:function(enterPage,leavePage){var bothPageHasToolbar=enterPage.getPageView().hasToolbarElement()&&leavePage.getPageView().hasToolbarElement(),noAndroidLikeToolbar=!angular.element(enterPage.getPageView().getToolbarElement()).hasClass("navigation-bar--android")&&!angular.element(leavePage.getPageView().getToolbarElement()).hasClass("navigation-bar--android");return bothPageHasToolbar&&noAndroidLikeToolbar},push:function(enterPage,leavePage,callback){var mask=this.backgroundMask.remove();leavePage.element[0].parentNode.insertBefore(mask[0],leavePage.element[0].nextSibling);var enterPageDecomposition=this._decompose(enterPage),leavePageDecomposition=this._decompose(leavePage),delta=function(){var rect=leavePage.element[0].getBoundingClientRect();return Math.round((rect.right-rect.left)/2*.6)}(),maskClear=animit(mask[0]).queue({opacity:0,transform:"translate3d(0, 0, 0)"}).queue({opacity:.1},{duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle().queue(function(done){mask.remove(),done()}),shouldAnimateToolbar=this._shouldAnimateToolbar(enterPage,leavePage);
shouldAnimateToolbar?(enterPage.element.css({zIndex:"auto"}),leavePage.element.css({zIndex:"auto"}),animit.runAll(maskClear,animit([enterPageDecomposition.content,enterPageDecomposition.bottomToolbar,enterPageDecomposition.background]).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:0}).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(enterPageDecomposition.toolbar).queue({css:{background:"none",backgroundColor:"rgba(0, 0, 0, 0)",borderColor:"rgba(0, 0, 0, 0)"},duration:0}).wait(.3).resetStyle({duration:.1,transition:"background-color 0.1s linear, border-color 0.1s linear"}),animit(enterPageDecomposition.pageLabels).queue({css:{transform:"translate3d("+delta+"px, 0, 0)",opacity:0},duration:0}).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(enterPageDecomposition.other).queue({css:{opacity:0},duration:0}).queue({css:{opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit([leavePageDecomposition.content,leavePageDecomposition.bottomToolbar,leavePageDecomposition.background]).queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).queue({css:{transform:"translate3D(-25%, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle().queue(function(done){enterPage.element.css({zIndex:""}),leavePage.element.css({zIndex:""}),callback(),done()}),animit(leavePageDecomposition.pageLabels).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3d(-"+delta+"px, 0, 0)",opacity:0},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(leavePageDecomposition.other).queue({css:{opacity:1},duration:0}).queue({css:{opacity:0},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle())):animit.runAll(maskClear,animit(enterPage.element[0]).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:0}).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).queue({css:{transform:"translate3D(-25%, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle().queue(function(done){callback(),done()}))},pop:function(enterPage,leavePage,done){var mask=this.backgroundMask.remove();enterPage.element[0].parentNode.insertBefore(mask[0],enterPage.element[0].nextSibling);var enterPageDecomposition=this._decompose(enterPage),leavePageDecomposition=this._decompose(leavePage),delta=function(){var rect=leavePage.element[0].getBoundingClientRect();return Math.round((rect.right-rect.left)/2*.6)}(),maskClear=animit(mask[0]).queue({opacity:.1,transform:"translate3d(0, 0, 0)"}).queue({opacity:0},{duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle().queue(function(done){mask.remove(),done()}),shouldAnimateToolbar=this._shouldAnimateToolbar(enterPage,leavePage);shouldAnimateToolbar?(enterPage.element.css({zIndex:"auto"}),leavePage.element.css({zIndex:"auto"}),animit.runAll(maskClear,animit([enterPageDecomposition.content,enterPageDecomposition.bottomToolbar,enterPageDecomposition.background]).queue({css:{transform:"translate3D(-25%, 0px, 0px)",opacity:.9},duration:0}).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(enterPageDecomposition.pageLabels).queue({css:{transform:"translate3d(-"+delta+"px, 0, 0)",opacity:0},duration:0}).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(enterPageDecomposition.toolbar).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(enterPageDecomposition.other).queue({css:{opacity:0},duration:0}).queue({css:{opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit([leavePageDecomposition.content,leavePageDecomposition.bottomToolbar,leavePageDecomposition.background]).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).wait(0).queue(function(finish){enterPage.element.css({zIndex:""}),leavePage.element.css({zIndex:""}),done(),finish()}),animit(leavePageDecomposition.other).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3d(0, 0, 0)",opacity:0},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}),animit(leavePageDecomposition.toolbar).queue({css:{background:"none",backgroundColor:"rgba(0, 0, 0, 0)",borderColor:"rgba(0, 0, 0, 0)"},duration:0}),animit(leavePageDecomposition.pageLabels).queue({css:{transform:"translate3d(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3d("+delta+"px, 0, 0)",opacity:0},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}))):animit.runAll(maskClear,animit(enterPage.element[0]).queue({css:{transform:"translate3D(-25%, 0px, 0px)",opacity:.9},duration:0}).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle(),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(finish){done(),finish()}))}});return IOSSlideTransitionAnimator}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("LazyRepeatView",["$onsen","$document","$compile",function($onsen,$document,$compile){var LazyRepeatView=Class.extend({init:function(scope,element,attrs,linker){if(this._element=element,this._scope=scope,this._attrs=attrs,this._linker=linker,this._parentElement=element.parent(),this._pageContent=this._findPageContent(),!this._pageContent)throw new Error("ons-lazy-repeat must be a descendant of an <ons-page> object.");this._itemHeightSum=[],this._maxIndex=0,this._delegate=this._getDelegate(),this._renderedElements={},this._addEventListeners(),this._scope.$watch(this._countItems.bind(this),this._onChange.bind(this)),this._scope.$on("$destroy",this._destroy.bind(this)),this._onChange()},_getDelegate:function(){var delegate=this._scope.$eval(this._attrs.onsLazyRepeat);return"undefined"==typeof delegate&&(delegate=eval(this._attrs.onsLazyRepeat)),delegate},_countItems:function(){return this._delegate.countItems()},_getItemHeight:function(i){return this._delegate.calculateItemHeight(i)},_getTopOffset:function(){return this._parentElement[0].getBoundingClientRect().top},_render:function(){var items=this._getItemsInView(),keep={};this._parentElement.css("height",this._itemHeightSum[this._maxIndex]+"px");for(var i=0,l=items.length;l>i;i++){var _item=items[i];this._renderElement(_item),keep[_item.index]=!0}for(var key in this._renderedElements)this._renderedElements.hasOwnProperty(key)&&!keep.hasOwnProperty(key)&&this._removeElement(key)},_isRendered:function(i){return this._renderedElements.hasOwnProperty(i)},_renderElement:function(item){if(this._isRendered(item.index)){var currentItem=this._renderedElements[item.index];this._delegate.configureItemScope&&this._delegate.configureItemScope(item.index,currentItem.scope);var element=this._renderedElements[item.index].element;return element[0].style.top=item.top+"px",void 0}var childScope=this._scope.$new();this._addSpecialProperties(item.index,childScope),this._linker(childScope,function(clone){this._delegate.configureItemScope?this._delegate.configureItemScope(item.index,childScope):this._delegate.createItemContent&&(clone.append(this._delegate.createItemContent(item.index)),$compile(clone[0].firstChild)(childScope)),this._parentElement.append(clone),clone.css({position:"absolute",top:item.top+"px",left:"0px",right:"0px",display:"none"});var element={element:clone,scope:childScope};this._scope.$evalAsync(function(){clone.css("display","block")}),this._renderedElements[item.index]=element}.bind(this))},_removeElement:function(i){if(this._isRendered(i)){var element=this._renderedElements[i];this._delegate.destroyItemScope?this._delegate.destroyItemScope(i,element.scope):this._delegate.destroyItemContent&&this._delegate.destroyItemContent(i,element.element.children()[0]),element.element.remove(),element.scope.$destroy(),element.element=element.scope=null,delete this._renderedElements[i]}},_removeAllElements:function(){for(var key in this._renderedElements)this._removeElement.hasOwnProperty(key)&&this._removeElement(key)},_calculateStartIndex:function(current){for(var start=0,end=this._maxIndex;;){var middle=Math.floor((start+end)/2),value=current+this._itemHeightSum[middle];if(start>end)return 0;if(value>=0&&value-this._getItemHeight(middle)<0)return middle;isNaN(value)||value>=0?end=middle-1:start=middle+1}},_recalculateItemHeightSum:function(){for(var sums=this._itemHeightSum,i=0,sum=0;i<Math.min(sums.length,this._countItems());i++)sum+=this._getItemHeight(i),sums[i]=sum},_getItemsInView:function(){var topOffset=this._getTopOffset(),topPosition=topOffset,cnt=this._countItems();cnt!==this._itemCount&&(this._recalculateItemHeightSum(),this._maxIndex=cnt-1),this._itemCount=cnt;var startIndex=this._calculateStartIndex(topPosition);startIndex=Math.max(startIndex-30,0),startIndex>0&&(topPosition+=this._itemHeightSum[startIndex-1]);for(var items=[],i=startIndex;cnt>i&&topPosition<4*window.innerHeight;i++){var h=this._getItemHeight(i);i>=this._itemHeightSum.length&&(this._itemHeightSum=this._itemHeightSum.concat(new Array(100))),this._itemHeightSum[i]=i>0?this._itemHeightSum[i-1]+h:h,this._maxIndex=Math.max(i,this._maxIndex),items.push({index:i,top:topPosition-topOffset}),topPosition+=h}return items},_addSpecialProperties:function(i,scope){scope.$index=i,scope.$first=0===i,scope.$last=i===this._countItems()-1,scope.$middle=!scope.$first&&!scope.$last,scope.$even=i%2===0,scope.$odd=!scope.$even},_onChange:function(){this._render()},_findPageContent:function(){for(var e=this._element[0];e.parentNode&&(e=e.parentNode,!(e.className&&e.className.split(/\s+/).indexOf("page__content")>=0)););return e},_addEventListeners:function(){this._boundOnChange=this._onChange.bind(this),this._pageContent.addEventListener("scroll",this._boundOnChange,!0),$document[0].addEventListener("resize",this._boundOnChange,!0)},_removeEventListeners:function(){this._pageContent.removeEventListener("scroll",this._boundOnChange,!0),$document[0].removeEventListener("resize",this._boundOnChange,!0)},_destroy:function(){this._removeEventListeners(),this._removeAllElements(),this._parentElement=this._renderedElements=this._element=this._scope=this._attrs=null}});return LazyRepeatView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("LiftTransitionAnimator",["NavigatorTransitionAnimator",function(NavigatorTransitionAnimator){var LiftTransitionAnimator=NavigatorTransitionAnimator.extend({backgroundMask:angular.element('<div style="position: absolute; width: 100%;height: 100%; background-color: black;"></div>'),push:function(enterPage,leavePage,callback){var mask=this.backgroundMask.remove();leavePage.element[0].parentNode.insertBefore(mask[0],leavePage.element[0]);var maskClear=animit(mask[0]).wait(.6).queue(function(done){mask.remove(),done()});animit.runAll(maskClear,animit(enterPage.element[0]).queue({css:{transform:"translate3D(0, 100%, 0)"},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).wait(.2).resetStyle().queue(function(done){callback(),done()}),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:0}).queue({css:{transform:"translate3D(0, -10%, 0)",opacity:.9},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}))},pop:function(enterPage,leavePage,callback){var mask=this.backgroundMask.remove();enterPage.element[0].parentNode.insertBefore(mask[0],enterPage.element[0]),animit.runAll(animit(mask[0]).wait(.4).queue(function(done){mask.remove(),done()}),animit(enterPage.element[0]).queue({css:{transform:"translate3D(0, -10%, 0)",opacity:.9},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)",opacity:1},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}).resetStyle().wait(.4).queue(function(done){callback(),done()}),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).queue({css:{transform:"translate3D(0, 100%, 0)"},duration:.4,timing:"cubic-bezier(.1, .7, .1, 1)"}))}});return LiftTransitionAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("ModalView",["$onsen","$rootScope",function($onsen,$rootScope){var ModalView=Class.extend({_element:void 0,_scope:void 0,init:function(scope,element){this._scope=scope,this._element=element;var pageView=$rootScope.ons.findParentComponentUntil("ons-page",this._element);pageView&&(this._pageContent=angular.element(pageView._element[0].querySelector(".page__content"))),this._scope.$on("$destroy",this._destroy.bind(this)),this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)),this.hide()},getDeviceBackButtonHandler:function(){return this._deviceBackButtonHandler},show:function(){this._element.css("display","table")},_isVisible:function(){return this._element[0].clientWidth>0},_onDeviceBackButton:function(){},hide:function(){this._element.css("display","none")},toggle:function(){return this._isVisible()?this.hide.apply(this,arguments):this.show.apply(this,arguments)},_destroy:function(){this.emit("destroy",{page:this}),this._deviceBackButtonHandler.destroy(),this._element=this._scope=null}});return MicroEvent.mixin(ModalView),ModalView}])}(),function(){"use strict;";var module=angular.module("onsen"),NavigatorPageObject=Class.extend({init:function(params){this.page=params.page,this.name=params.page,this.element=params.element,this.pageScope=params.pageScope,this.options=params.options,this.navigator=params.navigator,this._blockEvents=function(event){(this.navigator._isPopping||this.navigator._isPushing)&&(event.preventDefault(),event.stopPropagation())}.bind(this),this.element.on(this._pointerEvents,this._blockEvents)},_pointerEvents:"touchstart touchend touchmove click",getPageView:function(){if(!this._pageView&&(this._pageView=this.element.inheritedData("ons-page"),!this._pageView))throw new Error("Fail to fetch PageView from ons-page element.");return this._pageView},destroy:function(){this.pageScope.$destroy(),this.element.off(this._pointerEvents,this._blockEvents),this.element.remove(),this.element=null,this._pageView=null,this.pageScope=null,this.options=null;var index=this.navigator.pages.indexOf(this);-1!==index&&this.navigator.pages.splice(index,1),this.navigator=null}});module.factory("NavigatorView",["$http","$parse","$templateCache","$compile","$onsen","$timeout","SimpleSlideTransitionAnimator","NavigatorTransitionAnimator","LiftTransitionAnimator","NullTransitionAnimator","IOSSlideTransitionAnimator","FadeTransitionAnimator",function($http,$parse,$templateCache,$compile,$onsen,$timeout,SimpleSlideTransitionAnimator,NavigatorTransitionAnimator,LiftTransitionAnimator,NullTransitionAnimator,IOSSlideTransitionAnimator,FadeTransitionAnimator){var NavigatorView=Class.extend({_element:void 0,_attrs:void 0,pages:void 0,_scope:void 0,_doorLock:void 0,_profiling:!1,init:function(scope,element,attrs){this._element=element||angular.element(window.document.body),this._scope=scope||this._element.scope(),this._attrs=attrs,this._doorLock=new DoorLock,this.pages=[],this._isPopping=this._isPushing=!1,this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)),this._scope.$on("$destroy",this._destroy.bind(this))},_destroy:function(){this.emit("destroy"),this.pages.forEach(function(page){page.destroy()}),this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null,this._element=this._scope=this._attrs=null},_onDeviceBackButton:function(event){this.pages.length>1?this._scope.$evalAsync(this.popPage.bind(this)):event.callParentHandler()},_normalizePageElement:function(element){for(var i=0;i<element.length;i++)if(1===element[i].nodeType)return angular.element(element[i]);throw new Error("invalid state")},_createPageElementAndLinkFunction:function(templateHTML,pageScope){function safeApply(scope){var phase=scope.$root.$$phase;"$apply"!==phase&&"$digest"!==phase&&scope.$apply()}var div=document.createElement("div");div.innerHTML=templateHTML.trim();var pageElement=angular.element(div),hasPage=1===div.childElementCount&&"ons-page"===div.childNodes[0].nodeName.toLowerCase();if(!hasPage)throw new Error('You can not supply no "ons-page" element to "ons-navigator".');pageElement=angular.element(div.childNodes[0]);var link=$compile(pageElement);return{element:pageElement,link:function(){link(pageScope),safeApply(pageScope)}}},insertPage:function(index,page,options){if(options=options||{},options&&"object"!=typeof options)throw new Error("options must be an object. You supplied "+options);if(index===this.pages.length)return this.pushPage.apply(this,[].slice.call(arguments,1));this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock();$onsen.getPageHTMLAsync(page).then(function(templateHTML){var pageScope=this._createPageScope(),object=this._createPageElementAndLinkFunction(templateHTML,pageScope),element=object.element,link=object.link;element=this._normalizePageElement(element);var pageObject=this._createPageObject(page,element,pageScope,options);this.pages.length>0?(index=normalizeIndex(index),this._element[0].insertBefore(element[0],this.pages[index]?this.pages[index].element[0]:null),this.pages.splice(index,0,pageObject),link(),setTimeout(function(){this.getCurrentPage()!==pageObject&&element.css("display","none"),unlock(),element=null}.bind(this),1e3/60)):(this._element.append(element),this.pages.push(pageObject),link(),unlock(),element=null)}.bind(this),function(){throw unlock(),new Error("Page is not found: "+page)})}.bind(this));var normalizeIndex=function(index){return 0>index&&(index=this.pages.length+index),index}.bind(this)},pushPage:function(page,options){if(this._profiling&&console.time("pushPage"),options=options||{},!options.cancelIfRunning||!this._isPushing){if(options&&"object"!=typeof options)throw new Error("options must be an object. You supplied "+options);this._emitPrePushEvent()||this._doorLock.waitUnlock(function(){this._pushPage(page,options)}.bind(this))}},_pushPage:function(page,options){var unlock=this._doorLock.lock(),done=function(){unlock(),this._profiling&&console.timeEnd("pushPage")};$onsen.getPageHTMLAsync(page).then(function(templateHTML){var pageScope=this._createPageScope(),object=this._createPageElementAndLinkFunction(templateHTML,pageScope);setImmediate(function(){this._pushPageDOM(page,object.element,object.link,pageScope,options,done),object=null}.bind(this))}.bind(this),function(){throw done(),new Error("Page is not found: "+page)}.bind(this))},getDeviceBackButtonHandler:function(){return this._deviceBackButtonHandler},_getAnimatorOption:function(options,defaultAnimator){var animator=null;if(options.animation instanceof NavigatorTransitionAnimator)return options.animation;if("string"==typeof options.animation&&(animator=NavigatorView._transitionAnimatorDict[options.animation]),!animator&&this._element.attr("animation")&&(animator=NavigatorView._transitionAnimatorDict[this._element.attr("animation")]),animator||(animator=defaultAnimator||NavigatorView._transitionAnimatorDict["default"]),!(animator instanceof NavigatorTransitionAnimator))throw new Error('"animator" is not an instance of NavigatorTransitionAnimator.');return animator},_createPageScope:function(){return this._scope.$new()},_createPageObject:function(page,element,pageScope,options){return options.animator=this._getAnimatorOption(options),new NavigatorPageObject({page:page,element:element,pageScope:pageScope,options:options,navigator:this})},_pushPageDOM:function(page,element,link,pageScope,options,unlock){this._profiling&&console.time("pushPageDOM"),unlock=unlock||function(){},options=options||{},element=this._normalizePageElement(element);var pageObject=this._createPageObject(page,element,pageScope,options),event={enterPage:pageObject,leavePage:this.pages[this.pages.length-1],navigator:this};this.pages.push(pageObject);var done=function(){this.pages[this.pages.length-2]&&this.pages[this.pages.length-2].element.css("display","none"),this._profiling&&console.timeEnd("pushPageDOM"),this._isPushing=!1,unlock(),this.emit("postpush",event),"function"==typeof options.onTransitionEnd&&options.onTransitionEnd(),element=null}.bind(this);if(this._isPushing=!0,this.pages.length>1){var leavePage=this.pages.slice(-2)[0],enterPage=this.pages.slice(-1)[0];this._element.append(element),link(),options.animator.push(enterPage,leavePage,done),element=null}else this._element.append(element),link(),done(),element=null},_emitPrePushEvent:function(){var isCanceled=!1,prePushEvent={navigator:this,currentPage:this.getCurrentPage(),cancel:function(){isCanceled=!0}};return this.emit("prepush",prePushEvent),isCanceled},_emitPrePopEvent:function(){var isCanceled=!1,leavePage=this.getCurrentPage(),prePopEvent={navigator:this,currentPage:leavePage,leavePage:leavePage,enterPage:this.pages[this.pages.length-2],cancel:function(){isCanceled=!0}};return this.emit("prepop",prePopEvent),isCanceled},popPage:function(options){options=options||{},options.cancelIfRunning&&this._isPopping||this._doorLock.waitUnlock(function(){if(this.pages.length<=1)throw new Error("NavigatorView's page stack is empty.");this._emitPrePopEvent()||this._popPage(options)}.bind(this))},_popPage:function(options){var unlock=this._doorLock.lock(),leavePage=this.pages.pop();this.pages[this.pages.length-1]&&this.pages[this.pages.length-1].element.css("display","block");var enterPage=this.pages[this.pages.length-1],event={leavePage:leavePage,enterPage:this.pages[this.pages.length-1],navigator:this},callback=function(){leavePage.destroy(),this._isPopping=!1,unlock(),this.emit("postpop",event),event.leavePage=null,"function"==typeof options.onTransitionEnd&&options.onTransitionEnd()}.bind(this);this._isPopping=!0;var animator=this._getAnimatorOption(options,leavePage.options.animator);animator.pop(enterPage,leavePage,callback)},replacePage:function(page,options){options=options||{};var onTransitionEnd=options.onTransitionEnd||function(){};options.onTransitionEnd=function(){this.pages.length>1&&this.pages[this.pages.length-2].destroy(),onTransitionEnd()}.bind(this),this.pushPage(page,options)},resetToPage:function(page,options){options=options||{},options.animator||options.animation||(options.animation="none");var onTransitionEnd=options.onTransitionEnd||function(){},self=this;options.onTransitionEnd=function(){for(;self.pages.length>1;)self.pages.shift().destroy();onTransitionEnd()},this.pushPage(page,options)},getCurrentPage:function(){return this.pages[this.pages.length-1]},getPages:function(){return this.pages},canPopPage:function(){return this.pages.length>1}});return NavigatorView._transitionAnimatorDict={"default":$onsen.isAndroid()?new SimpleSlideTransitionAnimator:new IOSSlideTransitionAnimator,slide:$onsen.isAndroid()?new SimpleSlideTransitionAnimator:new IOSSlideTransitionAnimator,simpleslide:new SimpleSlideTransitionAnimator,lift:new LiftTransitionAnimator,fade:new FadeTransitionAnimator,none:new NullTransitionAnimator},NavigatorView.registerTransitionAnimator=function(name,animator){if(!(animator instanceof NavigatorTransitionAnimator))throw new Error('"animator" param must be an instance of NavigatorTransitionAnimator');this._transitionAnimatorDict[name]=animator},MicroEvent.mixin(NavigatorView),NavigatorView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("NavigatorTransitionAnimator",function(){var NavigatorTransitionAnimator=Class.extend({push:function(enterPage,leavePage,callback){callback()},pop:function(enterPage,leavePage,callback){callback()}});return NavigatorTransitionAnimator})}(),function(){"use strict;";var module=angular.module("onsen");module.factory("NullTransitionAnimator",["NavigatorTransitionAnimator",function(NavigatorTransitionAnimator){var NullTransitionAnimator=NavigatorTransitionAnimator.extend({});return NullTransitionAnimator}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("OverlaySlidingMenuAnimator",["SlidingMenuAnimator",function(SlidingMenuAnimator){var OverlaySlidingMenuAnimator=SlidingMenuAnimator.extend({_blackMask:void 0,_isRight:!1,_element:!1,_menuPage:!1,_mainPage:!1,_width:!1,_duration:!1,setup:function(element,mainPage,menuPage,options){options=options||{},this._width=options.width||"90%",this._isRight=!!options.isRight,this._element=element,this._mainPage=mainPage,this._menuPage=menuPage,this._duration=.4,menuPage.css("box-shadow","0px 0 10px 0px rgba(0, 0, 0, 0.2)"),menuPage.css({width:options.width,display:"none",zIndex:2}),menuPage.css("-webkit-transform","translate3d(0px, 0px, 0px)"),mainPage.css({zIndex:1}),this._isRight?menuPage.css({right:"-"+options.width,left:"auto"}):menuPage.css({right:"auto",left:"-"+options.width}),this._blackMask=angular.element("<div></div>").css({backgroundColor:"black",top:"0px",left:"0px",right:"0px",bottom:"0px",position:"absolute",display:"none",zIndex:0}),element.prepend(this._blackMask)},onResized:function(options){if(this._menuPage.css("width",options.width),this._isRight?this._menuPage.css({right:"-"+options.width,left:"auto"}):this._menuPage.css({right:"auto",left:"-"+options.width}),options.isOpened){var max=this._menuPage[0].clientWidth,menuStyle=this._generateMenuPageStyle(max);animit(this._menuPage[0]).queue(menuStyle).play()}},destroy:function(){this._blackMask&&(this._blackMask.remove(),this._blackMask=null),this._mainPage.removeAttr("style"),this._menuPage.removeAttr("style"),this._element=this._mainPage=this._menuPage=null},openMenu:function(callback,instant){var duration=instant===!0?0:this._duration;this._menuPage.css("display","block"),this._blackMask.css("display","block");var max=this._menuPage[0].clientWidth,menuStyle=this._generateMenuPageStyle(max),mainPageStyle=this._generateMainPageStyle(max);setTimeout(function(){animit(this._mainPage[0]).queue(mainPageStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){callback(),done()}).play(),animit(this._menuPage[0]).queue(menuStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).play()}.bind(this),1e3/60)},closeMenu:function(callback,instant){var duration=instant===!0?0:this._duration;this._blackMask.css({display:"block"});var menuPageStyle=this._generateMenuPageStyle(0),mainPageStyle=this._generateMainPageStyle(0);setTimeout(function(){animit(this._mainPage[0]).queue(mainPageStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){this._menuPage.css("display","none"),callback(),done()}.bind(this)).play(),animit(this._menuPage[0]).queue(menuPageStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).play()}.bind(this),1e3/60)},translateMenu:function(options){this._menuPage.css("display","block"),this._blackMask.css({display:"block"});var menuPageStyle=this._generateMenuPageStyle(Math.min(options.maxDistance,options.distance)),mainPageStyle=this._generateMainPageStyle(Math.min(options.maxDistance,options.distance));delete mainPageStyle.opacity,animit(this._menuPage[0]).queue(menuPageStyle).play(),Object.keys(mainPageStyle).length>0&&animit(this._mainPage[0]).queue(mainPageStyle).play()},_generateMenuPageStyle:function(distance){var x=(this._menuPage[0].clientWidth,this._isRight?-distance:distance),transform="translate3d("+x+"px, 0, 0)";return{transform:transform,"box-shadow":0===distance?"none":"0px 0 10px 0px rgba(0, 0, 0, 0.2)"}},_generateMainPageStyle:function(distance){var max=this._menuPage[0].clientWidth,opacity=1-.1*distance/max;return{opacity:opacity}},copy:function(){return new OverlaySlidingMenuAnimator}});return OverlaySlidingMenuAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("PageView",["$onsen","$parse",function($onsen,$parse){var PageView=Class.extend({_registeredToolbarElement:!1,_registeredBottomToolbarElement:!1,_nullElement:window.document.createElement("div"),_toolbarElement:null,_bottomToolbarElement:null,init:function(scope,element,attrs){this._scope=scope,this._element=element,this._attrs=attrs,this._registeredToolbarElement=!1,this._registeredBottomToolbarElement=!1,this._nullElement=window.document.createElement("div"),this._toolbarElement=angular.element(this._nullElement),this._bottomToolbarElement=angular.element(this._nullElement),this._clearListener=scope.$on("$destroy",this._destroy.bind(this)),this._userDeviceBackButtonListener=angular.noop,(this._attrs.ngDeviceBackbutton||this._attrs.onDeviceBackbutton)&&(this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)))},_onDeviceBackButton:function($event){if(this._userDeviceBackButtonListener($event),this._attrs.ngDeviceBackbutton&&$parse(this._attrs.ngDeviceBackbutton)(this._scope,{$event:$event}),this._attrs.onDeviceBackbutton){var lastEvent=window.$event;window.$event=$event,new Function(this._attrs.onDeviceBackbutton)(),window.$event=lastEvent}},setDeviceBackButtonHandler:function(callback){this._deviceBackButtonHandler||(this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this))),this._userDeviceBackButtonListener=callback},getDeviceBackButtonHandler:function(){return this._deviceBackButtonHandler||null},registerToolbar:function(element){if(this._registeredToolbarElement)throw new Error("This page's toolbar is already registered.");angular.element(this.getContentElement()).attr("no-status-bar-fill",""),element.remove();var statusFill=this._element[0].querySelector(".page__status-bar-fill");statusFill?angular.element(statusFill).after(element):this._element.prepend(element),this._toolbarElement=element,this._registeredToolbarElement=!0},registerBottomToolbar:function(element){if(this._registeredBottomToolbarElement)throw new Error("This page's bottom-toolbar is already registered.");element.remove(),this._bottomToolbarElement=element,this._registeredBottomToolbarElement=!0;var fill=angular.element(document.createElement("div"));fill.addClass("page__bottom-bar-fill"),fill.css({width:"0px",height:"0px"}),this._element.prepend(fill),this._element.append(element)},registerExtraElement:function(element){this._extraElement||(this._extraElement=angular.element("<div></div>"),this._extraElement.addClass("page__extra"),this._extraElement.css({"z-index":"10001"}),this._element.append(this._extraElement)),this._extraElement.append(element.remove())},hasToolbarElement:function(){return!!this._registeredToolbarElement},hasBottomToolbarElement:function(){return!!this._registeredBottomToolbarElement},getContentElement:function(){for(var i=0;i<this._element.length;i++)if(this._element[i].querySelector){var content=this._element[i].querySelector(".page__content");if(content)return content}throw Error('fail to get ".page__content" element.')},getBackgroundElement:function(){for(var i=0;i<this._element.length;i++)if(this._element[i].querySelector){var content=this._element[i].querySelector(".page__background");if(content)return content}throw Error('fail to get ".page__background" element.')},getToolbarElement:function(){return this._toolbarElement[0]||this._nullElement},getBottomToolbarElement:function(){return this._bottomToolbarElement[0]||this._nullElement},getToolbarLeftItemsElement:function(){return this._toolbarElement[0].querySelector(".left")||this._nullElement},getToolbarCenterItemsElement:function(){return this._toolbarElement[0].querySelector(".center")||this._nullElement
},getToolbarRightItemsElement:function(){return this._toolbarElement[0].querySelector(".right")||this._nullElement},getToolbarBackButtonLabelElement:function(){return this._toolbarElement[0].querySelector("ons-back-button .back-button__label")||this._nullElement},_destroy:function(){this.emit("destroy",{page:this}),this._deviceBackButtonHandler&&(this._deviceBackButtonHandler.destroy(),this._deviceBackButtonHandler=null),this._element=null,this._toolbarElement=null,this._nullElement=null,this._bottomToolbarElement=null,this._extraElement=null,this._scope=null,this._clearListener()}});return MicroEvent.mixin(PageView),PageView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("PopoverView",["$onsen","PopoverAnimator","FadePopoverAnimator",function($onsen,PopoverAnimator,FadePopoverAnimator){var PopoverView=Class.extend({init:function(scope,element,attrs){if(this._element=element,this._scope=scope,this._attrs=attrs,this._mask=angular.element(this._element[0].querySelector(".popover-mask")),this._popover=angular.element(this._element[0].querySelector(".popover")),this._mask.css("z-index",2e4),this._popover.css("z-index",20001),this._element.css("display","none"),attrs.maskColor&&this._mask.css("background-color",attrs.maskColor),this._mask.on("click",this._cancel.bind(this)),this._visible=!1,this._doorLock=new DoorLock,this._animation=PopoverView._animatorDict["undefined"!=typeof attrs.animation?attrs.animation:"fade"],!this._animation)throw new Error("No such animation: "+attrs.animation);this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this)),this._onChange=function(){setImmediate(function(){this._currentTarget&&this._positionPopover(this._currentTarget)}.bind(this))}.bind(this),this._popover[0].addEventListener("DOMNodeInserted",this._onChange,!1),this._popover[0].addEventListener("DOMNodeRemoved",this._onChange,!1),window.addEventListener("resize",this._onChange,!1),this._scope.$on("$destroy",this._destroy.bind(this))},_onDeviceBackButton:function(event){this.isCancelable()?this._cancel.bind(this)():event.callParentHandler()},_setDirection:function(direction){if("up"===direction)this._scope.direction=direction,this._scope.arrowPosition="bottom";else if("left"===direction)this._scope.direction=direction,this._scope.arrowPosition="right";else if("down"===direction)this._scope.direction=direction,this._scope.arrowPosition="top";else{if("right"!=direction)throw new Error("Invalid direction.");this._scope.direction=direction,this._scope.arrowPosition="left"}this._scope.$$phase||this._scope.$apply()},_positionPopoverByDirection:function(target,direction){var el=angular.element(this._element[0].querySelector(".popover")),pos=target.getBoundingClientRect(),own=el[0].getBoundingClientRect(),arrow=angular.element(el.children()[1]),offset=14,margin=6,radius=parseInt(window.getComputedStyle(el[0].querySelector(".popover__content")).borderRadius);arrow.css({top:"",left:""});var diff=function(x){return x/2*Math.sqrt(2)-x/2}(parseInt(window.getComputedStyle(arrow[0]).width)),limit=margin+radius+diff;this._setDirection(direction),["left","right"].indexOf(direction)>-1?("left"==direction?el.css("left",pos.right-pos.width-own.width-offset+"px"):el.css("left",pos.right+offset+"px"),el.css("top",pos.bottom-pos.height/2-own.height/2+"px")):("up"==direction?el.css("top",pos.bottom-pos.height-own.height-offset+"px"):el.css("top",pos.bottom+offset+"px"),el.css("left",pos.right-pos.width/2-own.width/2+"px")),own=el[0].getBoundingClientRect(),["left","right"].indexOf(direction)>-1?own.top<margin?(arrow.css("top",Math.max(own.height/2+own.top-margin,limit)+"px"),el.css("top",margin+"px")):own.bottom>window.innerHeight-margin&&(arrow.css("top",Math.min(own.height/2-(window.innerHeight-own.bottom)+margin,own.height-limit)+"px"),el.css("top",window.innerHeight-own.height-margin+"px")):own.left<margin?(arrow.css("left",Math.max(own.width/2+own.left-margin,limit)+"px"),el.css("left",margin+"px")):own.right>window.innerWidth-margin&&(arrow.css("left",Math.min(own.width/2-(window.innerWidth-own.right)+margin,own.width-limit)+"px"),el.css("left",window.innerWidth-own.width-margin+"px"))},_positionPopover:function(target){var directions;directions=this._element.attr("direction")?this._element.attr("direction").split(/\s+/):["up","down","left","right"];for(var position=target.getBoundingClientRect(),scores={left:position.left,right:window.innerWidth-position.right,up:position.top,down:window.innerHeight-position.bottom},orderedDirections=Object.keys(scores).sort(function(a,b){return-(scores[a]-scores[b])}),i=0,l=orderedDirections.length;l>i;i++){var direction=orderedDirections[i];if(directions.indexOf(direction)>-1)return this._positionPopoverByDirection(target,direction),void 0}},show:function(target,options){if("string"==typeof target?target=document.querySelector(target):target instanceof Event&&(target=target.target),!target)throw new Error("Target undefined");options=options||{};var cancel=!1;this.emit("preshow",{popover:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;this._element.css("display","block"),this._currentTarget=target,this._positionPopover(target),options.animation&&(animation=PopoverView._animatorDict[options.animation]),animation.show(this,function(){this._visible=!0,this._positionPopover(target),unlock(),this.emit("postshow",{popover:this})}.bind(this))}.bind(this))},hide:function(options){options=options||{};var cancel=!1;this.emit("prehide",{popover:this,cancel:function(){cancel=!0}}),cancel||this._doorLock.waitUnlock(function(){var unlock=this._doorLock.lock(),animation=this._animation;options.animation&&(animation=PopoverView._animatorDict[options.animation]),animation.hide(this,function(){this._element.css("display","none"),this._visible=!1,unlock(),this.emit("posthide",{popover:this})}.bind(this))}.bind(this))},isShown:function(){return this._visible},destroy:function(){this._parentScope?(this._parentScope.$destroy(),this._parentScope=null):this._scope.$destroy()},_destroy:function(){this.emit("destroy"),this._deviceBackButtonHandler.destroy(),this._popover[0].removeEventListener("DOMNodeInserted",this._onChange,!1),this._popover[0].removeEventListener("DOMNodeRemoved",this._onChange,!1),window.removeEventListener("resize",this._onChange,!1),this._mask.off(),this._mask.remove(),this._popover.remove(),this._element.remove(),this._onChange=this._deviceBackButtonHandler=this._mask=this._popover=this._element=this._scope=null},setCancelable:function(cancelable){if("boolean"!=typeof cancelable)throw new Error("Argument must be a boolean.");cancelable?this._element.attr("cancelable",!0):this._element.removeAttr("cancelable")},isCancelable:function(){return this._element[0].hasAttribute("cancelable")},_cancel:function(){this.isCancelable()&&this.hide()}});return PopoverView._animatorDict={fade:new FadePopoverAnimator,none:new PopoverAnimator},PopoverView.registerAnimator=function(name,animator){if(!(animator instanceof PopoverAnimator))throw new Error('"animator" param must be an instance of PopoverAnimator');this._animatorDict[name]=animator},MicroEvent.mixin(PopoverView),PopoverView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("PopoverAnimator",function(){var PopoverAnimator=Class.extend({show:function(popover,callback){callback()},hide:function(popover,callback){callback()}});return PopoverAnimator})}(),function(){"use strict";var module=angular.module("onsen");module.factory("PullHookView",["$onsen","$parse",function($onsen,$parse){var PullHookView=Class.extend({STATE_INITIAL:"initial",STATE_PREACTION:"preaction",STATE_ACTION:"action",init:function(scope,element,attrs){if(this._element=element,this._scope=scope,this._attrs=attrs,this._scrollElement=this._createScrollElement(),this._pageElement=this._scrollElement.parent(),!this._pageElement.hasClass("page__content")&&!this._pageElement.hasClass("ons-scroller__content"))throw new Error("<ons-pull-hook> must be a direct descendant of an <ons-page> or an <ons-scroller> element.");this._currentTranslation=0,this._createEventListeners(),this._setState(this.STATE_INITIAL,!0),this._setStyle(),this._scope.$on("$destroy",this._destroy.bind(this))},_createScrollElement:function(){var scrollElement=angular.element("<div>").addClass("scroll"),pageElement=this._element.parent(),children=pageElement.children();return pageElement.append(scrollElement),scrollElement.append(children),scrollElement},_setStyle:function(){var h=this._getHeight();this._element.css({top:"-"+h+"px",height:h+"px",lineHeight:h+"px"})},_onScroll:function(){var el=this._pageElement[0];el.scrollTop<0&&(el.scrollTop=0)},_generateTranslationTransform:function(scroll){return"translate3d(0px, "+scroll+"px, 0px)"},_onDrag:function(event){if(!this.isDisabled()&&"left"!==event.gesture.direction&&"right"!==event.gesture.direction){var el=this._pageElement[0];if(el.scrollTop=this._startScroll-event.gesture.deltaY,el.scrollTop<window.innerHeight&&"up"!==event.gesture.direction&&event.gesture.preventDefault(),0===this._currentTranslation&&0===this._getCurrentScroll()){this._transitionDragLength=event.gesture.deltaY;var direction=event.gesture.interimDirection;"down"===direction?this._transitionDragLength-=1:this._transitionDragLength+=1}var scroll=event.gesture.deltaY-this._startScroll;scroll=Math.max(scroll,0),this._thresholdHeightEnabled()&&scroll>=this._getThresholdHeight()?(event.gesture.stopDetect(),setImmediate(function(){this._setState(this.STATE_ACTION),this._translateTo(this._getHeight(),{animate:!0}),this._waitForAction(this._onDone.bind(this))}.bind(this))):scroll>=this._getHeight()?this._setState(this.STATE_PREACTION):this._setState(this.STATE_INITIAL),event.stopPropagation(),this._translateTo(scroll)}},_onDragStart:function(){this.isDisabled()||(this._startScroll=this._getCurrentScroll())},_onDragEnd:function(){if(!this.isDisabled()&&this._currentTranslation>0){var scroll=this._currentTranslation;scroll>this._getHeight()?(this._setState(this.STATE_ACTION),this._translateTo(this._getHeight(),{animate:!0}),this._waitForAction(this._onDone.bind(this))):this._translateTo(0,{animate:!0})}},_waitForAction:function(done){this._attrs.ngAction?this._scope.$eval(this._attrs.ngAction,{$done:done}):this._attrs.onAction?eval(this._attrs.onAction):done()},_onDone:function(){this._element&&(this._translateTo(0,{animate:!0}),this._setState(this.STATE_INITIAL))},_getHeight:function(){return parseInt(this._element[0].getAttribute("height")||"64",10)},setHeight:function(height){this._element[0].setAttribute("height",height+"px"),this._setStyle()},setThresholdHeight:function(thresholdHeight){this._element[0].setAttribute("threshold-height",thresholdHeight+"px")},_getThresholdHeight:function(){return parseInt(this._element[0].getAttribute("threshold-height")||"96",10)},_thresholdHeightEnabled:function(){var th=this._getThresholdHeight();return th>0&&th>=this._getHeight()},_setState:function(state,noEvent){var oldState=this._getState();this._scope.$evalAsync(function(){this._element[0].setAttribute("state",state),noEvent||oldState===this._getState()||this.emit("changestate",{state:state,pullHook:this})}.bind(this))},_getState:function(){return this._element[0].getAttribute("state")},getCurrentState:function(){return this._getState()},_getCurrentScroll:function(){return this._pageElement[0].scrollTop},isDisabled:function(){return this._element[0].hasAttribute("disabled")},setDisabled:function(disabled){disabled?this._element[0].setAttribute("disabled",""):this._element[0].removeAttribute("disabled")},_translateTo:function(scroll,options){options=options||{},this._currentTranslation=scroll,options.animate?animit(this._scrollElement[0]).queue({transform:this._generateTranslationTransform(scroll)},{duration:.3,timing:"cubic-bezier(.1, .7, .1, 1)"}).play(options.callback):animit(this._scrollElement[0]).queue({transform:this._generateTranslationTransform(scroll)}).play(options.callback)},_getMinimumScroll:function(){var scrollHeight=this._scrollElement[0].getBoundingClientRect().height,pageHeight=this._pageElement[0].getBoundingClientRect().height;return scrollHeight>pageHeight?-(scrollHeight-pageHeight):0},_createEventListeners:function(){var element=this._scrollElement.parent();this._hammer=new Hammer(element[0],{dragMinDistance:1,dragDistanceCorrection:!1}),this._bindedOnDrag=this._onDrag.bind(this),this._bindedOnDragStart=this._onDragStart.bind(this),this._bindedOnDragEnd=this._onDragEnd.bind(this),this._bindedOnScroll=this._onScroll.bind(this),this._hammer.on("drag",this._bindedOnDrag),this._hammer.on("dragstart",this._bindedOnDragStart),this._hammer.on("dragend",this._bindedOnDragEnd),element.on("scroll",this._bindedOnScroll)},_destroyEventListeners:function(){var element=this._scrollElement.parent();this._hammer.off("drag",this._bindedOnDrag),this._hammer.off("dragstart",this._bindedOnDragStart),this._hammer.off("dragend",this._bindedOnDragEnd),element.off("scroll",this._bindedOnScroll)},_destroy:function(){this.emit("destroy"),this._destroyEventListeners(),this._element=this._scope=this._attrs=null}});return MicroEvent.mixin(PullHookView),PullHookView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("PushSlidingMenuAnimator",["SlidingMenuAnimator",function(SlidingMenuAnimator){var PushSlidingMenuAnimator=SlidingMenuAnimator.extend({_isRight:!1,_element:void 0,_menuPage:void 0,_mainPage:void 0,_width:void 0,_duration:!1,setup:function(element,mainPage,menuPage,options){options=options||{},this._element=element,this._mainPage=mainPage,this._menuPage=menuPage,this._isRight=!!options.isRight,this._width=options.width||"90%",this._duration=.4,menuPage.css({width:options.width,display:"none"}),this._isRight?menuPage.css({right:"-"+options.width,left:"auto"}):menuPage.css({right:"auto",left:"-"+options.width})},onResized:function(options){if(this._menuPage.css("width",options.width),this._isRight?this._menuPage.css({right:"-"+options.width,left:"auto"}):this._menuPage.css({right:"auto",left:"-"+options.width}),options.isOpened){var max=this._menuPage[0].clientWidth,mainPageTransform=this._generateAbovePageTransform(max),menuPageStyle=this._generateBehindPageStyle(max);animit(this._mainPage[0]).queue({transform:mainPageTransform}).play(),animit(this._menuPage[0]).queue(menuPageStyle).play()}},destroy:function(){this._mainPage.removeAttr("style"),this._menuPage.removeAttr("style"),this._element=this._mainPage=this._menuPage=null},openMenu:function(callback,instant){var duration=instant===!0?0:this._duration;this._menuPage.css("display","block");var max=this._menuPage[0].clientWidth,aboveTransform=this._generateAbovePageTransform(max),behindStyle=this._generateBehindPageStyle(max);setTimeout(function(){animit(this._mainPage[0]).queue({transform:aboveTransform},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){callback(),done()}).play(),animit(this._menuPage[0]).queue(behindStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).play()}.bind(this),1e3/60)},closeMenu:function(callback,instant){var duration=instant===!0?0:this._duration,aboveTransform=this._generateAbovePageTransform(0),behindStyle=this._generateBehindPageStyle(0);setTimeout(function(){animit(this._mainPage[0]).queue({transform:aboveTransform},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue({transform:"translate3d(0, 0, 0)"}).queue(function(done){this._menuPage.css("display","none"),callback(),done()}.bind(this)).play(),animit(this._menuPage[0]).queue(behindStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){done()}).play()}.bind(this),1e3/60)},translateMenu:function(options){this._menuPage.css("display","block");var aboveTransform=this._generateAbovePageTransform(Math.min(options.maxDistance,options.distance)),behindStyle=this._generateBehindPageStyle(Math.min(options.maxDistance,options.distance));animit(this._mainPage[0]).queue({transform:aboveTransform}).play(),animit(this._menuPage[0]).queue(behindStyle).play()},_generateAbovePageTransform:function(distance){var x=this._isRight?-distance:distance,aboveTransform="translate3d("+x+"px, 0, 0)";return aboveTransform},_generateBehindPageStyle:function(distance){var behindX=(this._menuPage[0].clientWidth,this._isRight?-distance:distance),behindTransform="translate3d("+behindX+"px, 0, 0)";return{transform:behindTransform}},copy:function(){return new PushSlidingMenuAnimator}});return PushSlidingMenuAnimator}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("RevealSlidingMenuAnimator",["SlidingMenuAnimator",function(SlidingMenuAnimator){var RevealSlidingMenuAnimator=SlidingMenuAnimator.extend({_blackMask:void 0,_isRight:!1,_menuPage:void 0,_element:void 0,_mainPage:void 0,_duration:void 0,setup:function(element,mainPage,menuPage,options){this._element=element,this._menuPage=menuPage,this._mainPage=mainPage,this._isRight=!!options.isRight,this._width=options.width||"90%",this._duration=.4,mainPage.css({boxShadow:"0px 0 10px 0px rgba(0, 0, 0, 0.2)"}),menuPage.css({width:options.width,opacity:.9,display:"none"}),this._isRight?menuPage.css({right:"0px",left:"auto"}):menuPage.css({right:"auto",left:"0px"}),this._blackMask=angular.element("<div></div>").css({backgroundColor:"black",top:"0px",left:"0px",right:"0px",bottom:"0px",position:"absolute",display:"none"}),element.prepend(this._blackMask),animit(mainPage[0]).queue({transform:"translate3d(0, 0, 0)"}).play()},onResized:function(options){if(this._width=options.width,this._menuPage.css("width",this._width),options.isOpened){var max=this._menuPage[0].clientWidth,aboveTransform=this._generateAbovePageTransform(max),behindStyle=this._generateBehindPageStyle(max);animit(this._mainPage[0]).queue({transform:aboveTransform}).play(),animit(this._menuPage[0]).queue(behindStyle).play()}},destroy:function(){this._blackMask&&(this._blackMask.remove(),this._blackMask=null),this._mainPage&&this._mainPage.attr("style",""),this._menuPage&&this._menuPage.attr("style",""),this._mainPage=this._menuPage=this._element=void 0},openMenu:function(callback,instant){var duration=instant===!0?0:this._duration;this._menuPage.css("display","block"),this._blackMask.css("display","block");var max=this._menuPage[0].clientWidth,aboveTransform=this._generateAbovePageTransform(max),behindStyle=this._generateBehindPageStyle(max);setTimeout(function(){animit(this._mainPage[0]).queue({transform:aboveTransform},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){callback(),done()}).play(),animit(this._menuPage[0]).queue(behindStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).play()}.bind(this),1e3/60)},closeMenu:function(callback,instant){var duration=instant===!0?0:this._duration;this._blackMask.css("display","block");var aboveTransform=this._generateAbovePageTransform(0),behindStyle=this._generateBehindPageStyle(0);setTimeout(function(){animit(this._mainPage[0]).queue({transform:aboveTransform},{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue({transform:"translate3d(0, 0, 0)"}).queue(function(done){this._menuPage.css("display","none"),callback(),done()}.bind(this)).play(),animit(this._menuPage[0]).queue(behindStyle,{duration:duration,timing:"cubic-bezier(.1, .7, .1, 1)"}).queue(function(done){done()}).play()}.bind(this),1e3/60)},translateMenu:function(options){this._menuPage.css("display","block"),this._blackMask.css("display","block");var aboveTransform=this._generateAbovePageTransform(Math.min(options.maxDistance,options.distance)),behindStyle=this._generateBehindPageStyle(Math.min(options.maxDistance,options.distance));delete behindStyle.opacity,animit(this._mainPage[0]).queue({transform:aboveTransform}).play(),animit(this._menuPage[0]).queue(behindStyle).play()},_generateAbovePageTransform:function(distance){var x=this._isRight?-distance:distance,aboveTransform="translate3d("+x+"px, 0, 0)";return aboveTransform},_generateBehindPageStyle:function(distance){var max=this._menuPage[0].getBoundingClientRect().width,behindDistance=(distance-max)/max*10;behindDistance=isNaN(behindDistance)?0:Math.max(Math.min(behindDistance,0),-10);var behindX=this._isRight?-behindDistance:behindDistance,behindTransform="translate3d("+behindX+"%, 0, 0)",opacity=1+behindDistance/100;return{transform:behindTransform,opacity:opacity}},copy:function(){return new RevealSlidingMenuAnimator}});return RevealSlidingMenuAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("SimpleSlideTransitionAnimator",["NavigatorTransitionAnimator",function(NavigatorTransitionAnimator){var SimpleSlideTransitionAnimator=NavigatorTransitionAnimator.extend({backgroundMask:angular.element('<div style="z-index: 2; position: absolute; width: 100%;height: 100%; background-color: black; opacity: 0;"></div>'),timing:"cubic-bezier(.1, .7, .4, 1)",duration:.3,blackMaskOpacity:.4,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},push:function(enterPage,leavePage,callback){var mask=this.backgroundMask.remove();leavePage.element[0].parentNode.insertBefore(mask[0],leavePage.element[0].nextSibling),animit.runAll(animit(mask[0]).queue({opacity:0,transform:"translate3d(0, 0, 0)"}).queue({opacity:this.blackMaskOpacity},{duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){mask.remove(),done()}),animit(enterPage.element[0]).queue({css:{transform:"translate3D(100%, 0, 0)"},duration:0}).queue({css:{transform:"translate3D(0, 0, 0)"},duration:this.duration,timing:this.timing}).resetStyle(),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0, 0, 0)"},duration:0}).queue({css:{transform:"translate3D(-45%, 0px, 0px)"},duration:this.duration,timing:this.timing}).resetStyle().wait(.2).queue(function(done){callback(),done()}))},pop:function(enterPage,leavePage,done){var mask=this.backgroundMask.remove();enterPage.element[0].parentNode.insertBefore(mask[0],enterPage.element[0].nextSibling),animit.runAll(animit(mask[0]).queue({opacity:this.blackMaskOpacity,transform:"translate3d(0, 0, 0)"}).queue({opacity:0},{duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){mask.remove(),done()}),animit(enterPage.element[0]).queue({css:{transform:"translate3D(-45%, 0px, 0px)",opacity:.9},duration:0}).queue({css:{transform:"translate3D(0px, 0px, 0px)",opacity:1},duration:this.duration,timing:this.timing}).resetStyle(),animit(leavePage.element[0]).queue({css:{transform:"translate3D(0px, 0px, 0px)"},duration:0}).queue({css:{transform:"translate3D(100%, 0px, 0px)"},duration:this.duration,timing:this.timing}).wait(.2).queue(function(finish){done(),finish()}))}});return SimpleSlideTransitionAnimator}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("SlideDialogAnimator",["DialogAnimator",function(DialogAnimator){var SlideDialogAnimator=DialogAnimator.extend({timing:"cubic-bezier(.1, .7, .4, 1)",duration:.2,init:function(options){options=options||{},this.timing=options.timing||this.timing,this.duration=void 0!==options.duration?options.duration:this.duration},show:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:0}).queue({opacity:1},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3D(-50%, -350%, 0)"},duration:0}).queue({css:{transform:"translate3D(-50%, -50%, 0)"},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))},hide:function(dialog,callback){callback=callback?callback:function(){},animit.runAll(animit(dialog._mask[0]).queue({opacity:1}).queue({opacity:0},{duration:this.duration,timing:this.timing}),animit(dialog._dialog[0]).queue({css:{transform:"translate3D(-50%, -50%, 0)"},duration:0}).queue({css:{transform:"translate3D(-50%, -350%, 0)"},duration:this.duration,timing:this.timing}).resetStyle().queue(function(done){callback(),done()}))}});return SlideDialogAnimator}])}(),function(){"use strict";var module=angular.module("onsen"),SlidingMenuViewModel=Class.extend({_distance:0,_maxDistance:void 0,init:function(options){if(!angular.isNumber(options.maxDistance))throw new Error("options.maxDistance must be number");this.setMaxDistance(options.maxDistance)},setMaxDistance:function(maxDistance){if(0>=maxDistance)throw new Error("maxDistance must be greater then zero.");this.isOpened()&&(this._distance=maxDistance),this._maxDistance=maxDistance},shouldOpen:function(){return!this.isOpened()&&this._distance>=this._maxDistance/2},shouldClose:function(){return!this.isClosed()&&this._distance<this._maxDistance/2},openOrClose:function(options){this.shouldOpen()?this.open(options):this.shouldClose()&&this.close(options)},close:function(options){var callback=options.callback||function(){};this.isClosed()?callback():(this._distance=0,this.emit("close",options))},open:function(options){var callback=options.callback||function(){};this.isOpened()?callback():(this._distance=this._maxDistance,this.emit("open",options))},isClosed:function(){return 0===this._distance},isOpened:function(){return this._distance===this._maxDistance},getX:function(){return this._distance},getMaxDistance:function(){return this._maxDistance},translate:function(x){this._distance=Math.max(1,Math.min(this._maxDistance-1,x));var options={distance:this._distance,maxDistance:this._maxDistance};this.emit("translate",options)},toggle:function(){this.isClosed()?this.open():this.close()}});MicroEvent.mixin(SlidingMenuViewModel),module.factory("SlidingMenuView",["$onsen","$compile","SlidingMenuAnimator","RevealSlidingMenuAnimator","PushSlidingMenuAnimator","OverlaySlidingMenuAnimator",function($onsen,$compile,SlidingMenuAnimator,RevealSlidingMenuAnimator,PushSlidingMenuAnimator,OverlaySlidingMenuAnimator){var SlidingMenuView=Class.extend({_scope:void 0,_attrs:void 0,_element:void 0,_menuPage:void 0,_mainPage:void 0,_doorLock:void 0,_isRightMenu:!1,init:function(scope,element,attrs){this._scope=scope,this._attrs=attrs,this._element=element,this._menuPage=angular.element(element[0].querySelector(".onsen-sliding-menu__menu")),this._mainPage=angular.element(element[0].querySelector(".onsen-sliding-menu__main")),this._doorLock=new DoorLock,this._isRightMenu="right"===attrs.side,this._mainPageHammer=new Hammer(this._mainPage[0]),this._bindedOnTap=this._onTap.bind(this);var maxDistance=this._normalizeMaxSlideDistanceAttr();this._logic=new SlidingMenuViewModel({maxDistance:Math.max(maxDistance,1)}),this._logic.on("translate",this._translate.bind(this)),this._logic.on("open",function(options){this._open(options)}.bind(this)),this._logic.on("close",function(options){this._close(options)}.bind(this)),attrs.$observe("maxSlideDistance",this._onMaxSlideDistanceChanged.bind(this)),attrs.$observe("swipeable",this._onSwipeableChanged.bind(this)),this._bindedOnWindowResize=this._onWindowResize.bind(this),window.addEventListener("resize",this._bindedOnWindowResize),this._boundHandleEvent=this._handleEvent.bind(this),this._bindEvents(),attrs.mainPage&&this.setMainPage(attrs.mainPage),attrs.menuPage&&this.setMenuPage(attrs.menuPage),this._deviceBackButtonHandler=$onsen.DeviceBackButtonHandler.create(this._element,this._onDeviceBackButton.bind(this));var unlock=this._doorLock.lock();window.setTimeout(function(){var maxDistance=this._normalizeMaxSlideDistanceAttr();this._logic.setMaxDistance(maxDistance),this._menuPage.css({opacity:1}),this._animator=this._getAnimatorOption(),this._animator.setup(this._element,this._mainPage,this._menuPage,{isRight:this._isRightMenu,width:this._attrs.maxSlideDistance||"90%"}),unlock()}.bind(this),400),scope.$on("$destroy",this._destroy.bind(this)),attrs.swipeable||this.setSwipeable(!0)},getDeviceBackButtonHandler:function(){return this._deviceBackButtonHandler},_onDeviceBackButton:function(event){this.isMenuOpened()?this.closeMenu():event.callParentHandler()},_onTap:function(){this.isMenuOpened()&&this.closeMenu()},_refreshMenuPageWidth:function(){var width="maxSlideDistance"in this._attrs?this._attrs.maxSlideDistance:"90%";this._animator&&this._animator.onResized({isOpened:this._logic.isOpened(),width:width})},_destroy:function(){this.emit("destroy"),this._deviceBackButtonHandler.destroy(),window.removeEventListener("resize",this._bindedOnWindowResize),this._mainPageHammer.off("tap",this._bindedOnTap),this._element=this._scope=this._attrs=null},_getAnimatorOption:function(){var animator=SlidingMenuView._animatorDict[this._attrs.type];return animator instanceof SlidingMenuAnimator||(animator=SlidingMenuView._animatorDict["default"]),animator.copy()},_onSwipeableChanged:function(swipeable){swipeable=""===swipeable||void 0===swipeable||"true"==swipeable,this.setSwipeable(swipeable)},setSwipeable:function(enabled){enabled?this._activateHammer():this._deactivateHammer()},_onWindowResize:function(){this._recalculateMAX(),this._refreshMenuPageWidth()},_onMaxSlideDistanceChanged:function(){this._recalculateMAX(),this._refreshMenuPageWidth()},_normalizeMaxSlideDistanceAttr:function(){var maxDistance=this._attrs.maxSlideDistance;if("maxSlideDistance"in this._attrs){if("string"!=typeof maxDistance)throw new Error("invalid state");-1!==maxDistance.indexOf("px",maxDistance.length-2)?maxDistance=parseInt(maxDistance.replace("px",""),10):maxDistance.indexOf("%",maxDistance.length-1)>0&&(maxDistance=maxDistance.replace("%",""),maxDistance=parseFloat(maxDistance)/100*this._mainPage[0].clientWidth)}else maxDistance=.9*this._mainPage[0].clientWidth;return maxDistance},_recalculateMAX:function(){var maxDistance=this._normalizeMaxSlideDistanceAttr();maxDistance&&this._logic.setMaxDistance(parseInt(maxDistance,10))},_activateHammer:function(){this._hammertime.on("touch dragleft dragright swipeleft swiperight release",this._boundHandleEvent)},_deactivateHammer:function(){this._hammertime.off("touch dragleft dragright swipeleft swiperight release",this._boundHandleEvent)},_bindEvents:function(){this._hammertime=new Hammer(this._element[0],{dragMinDistance:1})},_appendMainPage:function(pageUrl,templateHTML){var pageScope=this._scope.$new(),pageContent=angular.element(templateHTML),link=$compile(pageContent);this._mainPage.append(pageContent),this._currentPageElement&&(this._currentPageElement.remove(),this._currentPageScope.$destroy()),link(pageScope),this._currentPageElement=pageContent,this._currentPageScope=pageScope,this._currentPageUrl=pageUrl},_appendMenuPage:function(templateHTML){var pageScope=this._scope.$new(),pageContent=angular.element(templateHTML),link=$compile(pageContent);this._menuPage.append(pageContent),this._currentMenuPageScope&&(this._currentMenuPageScope.$destroy(),this._currentMenuPageElement.remove()),link(pageScope),this._currentMenuPageElement=pageContent,this._currentMenuPageScope=pageScope},setMenuPage:function(page,options){if(!page)throw new Error("cannot set undefined page");options=options||{},options.callback=options.callback||function(){};var self=this;$onsen.getPageHTMLAsync(page).then(function(html){self._appendMenuPage(angular.element(html)),options.closeMenu&&self.close(),options.callback()},function(){throw new Error("Page is not found: "+page)})},setMainPage:function(pageUrl,options){options=options||{},options.callback=options.callback||function(){};var done=function(){options.closeMenu&&this.close(),options.callback()}.bind(this);if(this.currentPageUrl===pageUrl)return done(),void 0;if(!pageUrl)throw new Error("cannot set undefined page");var self=this;$onsen.getPageHTMLAsync(pageUrl).then(function(html){self._appendMainPage(pageUrl,html),done()},function(){throw new Error("Page is not found: "+page)})},_handleEvent:function(event){if(!this._doorLock.isLocked())switch(this._isInsideIgnoredElement(event.target)&&event.gesture.stopDetect(),event.type){case"dragleft":case"dragright":if(this._logic.isClosed()&&!this._isInsideSwipeTargetArea(event))return;
event.gesture.preventDefault();var deltaX=event.gesture.deltaX,deltaDistance=this._isRightMenu?-deltaX:deltaX,startEvent=event.gesture.startEvent;if("isOpened"in startEvent||(startEvent.isOpened=this._logic.isOpened()),0>deltaDistance&&this._logic.isClosed())break;if(deltaDistance>0&&this._logic.isOpened())break;var distance=startEvent.isOpened?deltaDistance+this._logic.getMaxDistance():deltaDistance;this._logic.translate(distance);break;case"swipeleft":if(event.gesture.preventDefault(),this._logic.isClosed()&&!this._isInsideSwipeTargetArea(event))return;this._isRightMenu?this.open():this.close(),event.gesture.stopDetect();break;case"swiperight":if(event.gesture.preventDefault(),this._logic.isClosed()&&!this._isInsideSwipeTargetArea(event))return;this._isRightMenu?this.close():this.open(),event.gesture.stopDetect();break;case"release":this._lastDistance=null,this._logic.shouldOpen()?this.open():this._logic.shouldClose()&&this.close()}},_isInsideIgnoredElement:function(element){do{if(element.getAttribute&&element.getAttribute("sliding-menu-ignore"))return!0;element=element.parentNode}while(element);return!1},_isInsideSwipeTargetArea:function(event){var x=event.gesture.center.pageX;"_swipeTargetWidth"in event.gesture.startEvent||(event.gesture.startEvent._swipeTargetWidth=this._getSwipeTargetWidth());var targetWidth=event.gesture.startEvent._swipeTargetWidth;return this._isRightMenu?this._mainPage[0].clientWidth-x<targetWidth:targetWidth>x},_getSwipeTargetWidth:function(){var targetWidth=this._attrs.swipeTargetWidth;"string"==typeof targetWidth&&(targetWidth=targetWidth.replace("px",""));var width=parseInt(targetWidth,10);return 0>width||!targetWidth?this._mainPage[0].clientWidth:width},closeMenu:function(){return this.close.apply(this,arguments)},close:function(options){options=options||{},options="function"==typeof options?{callback:options}:options,this._logic.isClosed()||(this.emit("preclose",{slidingMenu:this}),this._doorLock.waitUnlock(function(){this._logic.close(options)}.bind(this)))},_close:function(options){var callback=options.callback||function(){},unlock=this._doorLock.lock(),instant="none"==options.animation;this._animator.closeMenu(function(){unlock(),this._mainPage.children().css("pointer-events",""),this._mainPageHammer.off("tap",this._bindedOnTap),this.emit("postclose",{slidingMenu:this}),callback()}.bind(this),instant)},openMenu:function(){return this.open.apply(this,arguments)},open:function(options){options=options||{},options="function"==typeof options?{callback:options}:options,this.emit("preopen",{slidingMenu:this}),this._doorLock.waitUnlock(function(){this._logic.open(options)}.bind(this))},_open:function(options){var callback=options.callback||function(){},unlock=this._doorLock.lock(),instant="none"==options.animation;this._animator.openMenu(function(){unlock(),this._mainPage.children().css("pointer-events","none"),this._mainPageHammer.on("tap",this._bindedOnTap),this.emit("postopen",{slidingMenu:this}),callback()}.bind(this),instant)},toggle:function(options){this._logic.isClosed()?this.open(options):this.close(options)},toggleMenu:function(){return this.toggle.apply(this,arguments)},isMenuOpened:function(){return this._logic.isOpened()},_translate:function(event){this._animator.translateMenu(event)}});return SlidingMenuView._animatorDict={"default":new RevealSlidingMenuAnimator,overlay:new OverlaySlidingMenuAnimator,reveal:new RevealSlidingMenuAnimator,push:new PushSlidingMenuAnimator},SlidingMenuView.registerSlidingMenuAnimator=function(name,animator){if(!(animator instanceof SlidingMenuAnimator))throw new Error('"animator" param must be an instance of SlidingMenuAnimator');this._animatorDict[name]=animator},MicroEvent.mixin(SlidingMenuView),SlidingMenuView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("SlidingMenuAnimator",function(){return Class.extend({setup:function(){},onResized:function(){},openMenu:function(){},closeClose:function(){},destroy:function(){},translateMenu:function(){},copy:function(){throw new Error("Override copy method.")}})})}(),function(){"use strict";var module=angular.module("onsen");module.factory("SplitView",["$compile","RevealSlidingMenuAnimator","$onsen","$onsGlobal",function($compile,RevealSlidingMenuAnimator,$onsen,$onsGlobal){function isNumber(n){return!isNaN(parseFloat(n))&&isFinite(n)}var SPLIT_MODE=0,COLLAPSE_MODE=1,MAIN_PAGE_RATIO=.9,SplitView=Class.extend({init:function(scope,element,attrs){element.addClass("onsen-sliding-menu"),this._element=element,this._scope=scope,this._attrs=attrs,this._mainPage=angular.element(element[0].querySelector(".onsen-split-view__main")),this._secondaryPage=angular.element(element[0].querySelector(".onsen-split-view__secondary")),this._max=this._mainPage[0].clientWidth*MAIN_PAGE_RATIO,this._mode=SPLIT_MODE,this._doorLock=new DoorLock,this._doSplit=!1,this._doCollapse=!1,$onsGlobal.orientation.on("change",this._onResize.bind(this)),this._animator=new RevealSlidingMenuAnimator,this._element.css("display","none"),attrs.mainPage&&this.setMainPage(attrs.mainPage),attrs.secondaryPage&&this.setSecondaryPage(attrs.secondaryPage);var unlock=this._doorLock.lock();this._considerChangingCollapse(),this._setSize(),setTimeout(function(){this._element.css("display","block"),unlock()}.bind(this),1e3/60*2),scope.$on("$destroy",this._destroy.bind(this))},_appendSecondPage:function(templateHTML){var pageScope=this._scope.$new(),pageContent=$compile(templateHTML)(pageScope);this._secondaryPage.append(pageContent),this._currentSecondaryPageElement&&(this._currentSecondaryPageElement.remove(),this._currentSecondaryPageScope.$destroy()),this._currentSecondaryPageElement=pageContent,this._currentSecondaryPageScope=pageScope},_appendMainPage:function(templateHTML){var pageScope=this._scope.$new(),pageContent=$compile(templateHTML)(pageScope);this._mainPage.append(pageContent),this._currentPage&&(this._currentPage.remove(),this._currentPageScope.$destroy()),this._currentPage=pageContent,this._currentPageScope=pageScope},setSecondaryPage:function(page){if(!page)throw new Error("cannot set undefined page");$onsen.getPageHTMLAsync(page).then(function(html){this._appendSecondPage(angular.element(html.trim()))}.bind(this),function(){throw new Error("Page is not found: "+page)})},setMainPage:function(page){if(!page)throw new Error("cannot set undefined page");$onsen.getPageHTMLAsync(page).then(function(html){this._appendMainPage(angular.element(html.trim()))}.bind(this),function(){throw new Error("Page is not found: "+page)})},_onResize:function(){var lastMode=this._mode;this._considerChangingCollapse(),lastMode===COLLAPSE_MODE&&this._mode===COLLAPSE_MODE&&this._animator.onResized({isOpened:!1,width:"90%"}),this._max=this._mainPage[0].clientWidth*MAIN_PAGE_RATIO},_considerChangingCollapse:function(){var should=this._shouldCollapse();should&&this._mode!==COLLAPSE_MODE?(this._fireUpdateEvent(),this._doSplit?this._activateSplitMode():this._activateCollapseMode()):should||this._mode!==COLLAPSE_MODE||(this._fireUpdateEvent(),this._doCollapse?this._activateCollapseMode():this._activateSplitMode()),this._doCollapse=this._doSplit=!1},update:function(){this._fireUpdateEvent();var should=this._shouldCollapse();this._doSplit?this._activateSplitMode():this._doCollapse?this._activateCollapseMode():should?this._activateCollapseMode():should||this._activateSplitMode(),this._doSplit=this._doCollapse=!1},_getOrientation:function(){return $onsGlobal.orientation.isPortrait()?"portrait":"landscape"},getCurrentMode:function(){return this._mode===COLLAPSE_MODE?"collapse":"split"},_shouldCollapse:function(){var c="portrait";if("string"==typeof this._attrs.collapse&&(c=this._attrs.collapse.trim()),"portrait"==c)return $onsGlobal.orientation.isPortrait();if("landscape"==c)return $onsGlobal.orientation.isLandscape();if("width"==c.substr(0,5)){var num=c.split(" ")[1];num.indexOf("px")>=0&&(num=num.substr(0,num.length-2));var width=window.innerWidth;return isNumber(num)&&num>width}var mq=window.matchMedia(c);return mq.matches},_setSize:function(){if(this._mode===SPLIT_MODE){this._attrs.mainPageWidth||(this._attrs.mainPageWidth="70");var secondarySize=100-this._attrs.mainPageWidth.replace("%","");this._secondaryPage.css({width:secondarySize+"%",opacity:1}),this._mainPage.css({width:this._attrs.mainPageWidth+"%"}),this._mainPage.css("left",secondarySize+"%")}},_fireEvent:function(name){this.emit(name,{splitView:this,width:window.innerWidth,orientation:this._getOrientation()})},_fireUpdateEvent:function(){var that=this;this.emit("update",{splitView:this,shouldCollapse:this._shouldCollapse(),currentMode:this.getCurrentMode(),split:function(){that._doSplit=!0,that._doCollapse=!1},collapse:function(){that._doSplit=!1,that._doCollapse=!0},width:window.innerWidth,orientation:this._getOrientation()})},_activateCollapseMode:function(){this._mode!==COLLAPSE_MODE&&(this._fireEvent("precollapse"),this._secondaryPage.attr("style",""),this._mainPage.attr("style",""),this._mode=COLLAPSE_MODE,this._animator.setup(this._element,this._mainPage,this._secondaryPage,{isRight:!1,width:"90%"}),this._fireEvent("postcollapse"))},_activateSplitMode:function(){this._mode!==SPLIT_MODE&&(this._fireEvent("presplit"),this._animator.destroy(),this._secondaryPage.attr("style",""),this._mainPage.attr("style",""),this._mode=SPLIT_MODE,this._setSize(),this._fireEvent("postsplit"))},_destroy:function(){this.emit("destroy"),this._element=null,this._scope=null}});return MicroEvent.mixin(SplitView),SplitView}])}(),function(){"use strict";var module=angular.module("onsen");module.factory("SwitchView",["$onsen",function(){var SwitchView=Class.extend({init:function(element,scope,attrs){this._element=element,this._checkbox=angular.element(element[0].querySelector("input[type=checkbox]")),this._scope=scope,attrs.$observe("disabled",function(){element.attr("disabled")?this._checkbox.attr("disabled","disabled"):this._checkbox.removeAttr("disabled")}.bind(this)),this._checkbox.on("change",function(){this.emit("change",{"switch":this,value:this._checkbox[0].checked,isInteractive:!0})}.bind(this))},isChecked:function(){return this._checkbox[0].checked},setChecked:function(isChecked){isChecked=!!isChecked,this._checkbox[0].checked!=isChecked&&(this._scope.model=isChecked,this._checkbox[0].checked=isChecked,this._scope.$evalAsync(),this.emit("change",{"switch":this,value:isChecked,isInteractive:!1}))},getCheckboxElement:function(){return this._checkbox[0]}});return MicroEvent.mixin(SwitchView),SwitchView}])}(),function(){"use strict;";var module=angular.module("onsen");module.factory("TabbarAnimator",function(){var TabbarAnimator=Class.extend({apply:function(){throw new Error("This method must be implemented.")}});return TabbarAnimator}),module.factory("TabbarNoneAnimator",["TabbarAnimator",function(TabbarAnimator){var TabbarNoneAnimator=TabbarAnimator.extend({apply:function(enterPage,leavePage,done){done()}});return TabbarNoneAnimator}]),module.factory("TabbarFadeAnimator",["TabbarAnimator",function(TabbarAnimator){var TabbarFadeAnimator=TabbarAnimator.extend({apply:function(enterPage,leavePage,done){animit.runAll(animit(enterPage[0]).queue({transform:"translate3D(0, 0, 0)",opacity:0}).queue({transform:"translate3D(0, 0, 0)",opacity:1},{duration:.4,timing:"linear"}).resetStyle().queue(function(callback){done(),callback()}),animit(leavePage[0]).queue({transform:"translate3D(0, 0, 0)",opacity:1}).queue({transform:"translate3D(0, 0, 0)",opacity:0},{duration:.4,timing:"linear"}))}});return TabbarFadeAnimator}]),module.factory("TabbarView",["$onsen","$compile","TabbarAnimator","TabbarNoneAnimator","TabbarFadeAnimator",function($onsen,$compile,TabbarAnimator,TabbarNoneAnimator,TabbarFadeAnimator){var TabbarView=Class.extend({_tabbarId:void 0,_tabItems:void 0,init:function(scope,element,attrs){this._scope=scope,this._element=element,this._attrs=attrs,this._tabbarId=Date.now(),this._tabItems=[],this._contentElement=angular.element(element[0].querySelector(".ons-tab-bar__content")),this._tabbarElement=angular.element(element[0].querySelector(".ons-tab-bar__footer")),this._scope.$on("$destroy",this._destroy.bind(this)),this._hasTopTabbar()&&this._prepareForTopTabbar()},_prepareForTopTabbar:function(){this._contentElement.attr("no-status-bar-fill",""),setImmediate(function(){this._contentElement.addClass("tab-bar--top__content"),this._tabbarElement.addClass("tab-bar--top")}.bind(this));var page=ons.findParentComponentUntil("ons-page",this._element[0]);if(page&&this._element.css("top",window.getComputedStyle(page.getContentElement(),null).getPropertyValue("padding-top")),$onsen.shouldFillStatusBar(this._element[0])){var fill=angular.element(document.createElement("div"));fill.addClass("tab-bar__status-bar-fill"),fill.css({width:"0px",height:"0px"}),this._element.prepend(fill)}},_hasTopTabbar:function(){return"top"===this._attrs.position},setActiveTab:function(index,options){options=options||{};var previousTabItem=this._tabItems[this.getActiveTabIndex()],selectedTabItem=this._tabItems[index];if(("undefined"!=typeof selectedTabItem.noReload||selectedTabItem.isPersistent())&&index===this.getActiveTabIndex())return this.emit("reactive",{index:index,tabItem:selectedTabItem}),!1;var needLoad=selectedTabItem.page&&!options.keepPage;if(!selectedTabItem)return!1;var canceled=!1;if(this.emit("prechange",{index:index,tabItem:selectedTabItem,cancel:function(){canceled=!0}}),canceled)return selectedTabItem.setInactive(),previousTabItem&&previousTabItem.setActive(),!1;if(selectedTabItem.setActive(),needLoad){var removeElement=!0;previousTabItem&&previousTabItem.isPersistent()&&(removeElement=!1,previousTabItem._pageElement=this._currentPageElement);var params={callback:function(){this.emit("postchange",{index:index,tabItem:selectedTabItem})}.bind(this),_removeElement:removeElement};options.animation&&(params.animation=options.animation),selectedTabItem.isPersistent()&&selectedTabItem._pageElement?this._loadPersistentPageDOM(selectedTabItem._pageElement,params):this._loadPage(selectedTabItem.page,params)}for(var i=0;i<this._tabItems.length;i++)this._tabItems[i]!=selectedTabItem?this._tabItems[i].setInactive():needLoad||this.emit("postchange",{index:index,tabItem:selectedTabItem});return!0},setTabbarVisibility:function(visible){this._scope.hideTabs=!visible,this._onTabbarVisibilityChanged()},_onTabbarVisibilityChanged:function(){this._hasTopTabbar()?this._scope.hideTabs?this._contentElement.css("top","0px"):this._contentElement.css("top",""):this._scope.hideTabs?this._contentElement.css("bottom","0px"):this._contentElement.css("bottom","")},addTabItem:function(tabItem){this._tabItems.push(tabItem)},getActiveTabIndex:function(){for(var tabItem,i=0;i<this._tabItems.length;i++)if(tabItem=this._tabItems[i],tabItem.isActive())return i;return-1},loadPage:function(page,options){return this._loadPage(page,options)},_loadPage:function(page,options){$onsen.getPageHTMLAsync(page).then(function(html){var pageElement=angular.element(html.trim());this._loadPageDOM(pageElement,options)}.bind(this),function(){throw new Error("Page is not found: "+page)})},_switchPage:function(element,scope,options){if(this._currentPageElement){var oldPageElement=this._currentPageElement,oldPageScope=this._currentPageScope;this._currentPageElement=element,this._currentPageScope=scope,this._getAnimatorOption(options).apply(element,oldPageElement,function(){options._removeElement?(oldPageElement.remove(),oldPageScope.$destroy()):oldPageElement.css("display","none"),options.callback instanceof Function&&options.callback()})}else this._currentPageElement=element,this._currentPageScope=scope,options.callback instanceof Function&&options.callback()},_loadPageDOM:function(element,options){options=options||{};var pageScope=this._scope.$new(),link=$compile(element);this._contentElement.append(element);var pageContent=link(pageScope);pageScope.$evalAsync(),this._switchPage(pageContent,pageScope,options)},_loadPersistentPageDOM:function(element,options){options=options||{},element.css("display","block"),this._switchPage(element,element.scope(),options)},_getAnimatorOption:function(options){var animationAttr=this._element.attr("animation")||"default";return TabbarView._animatorDict[options.animation||animationAttr]||TabbarView._animatorDict["default"]},_destroy:function(){this.emit("destroy"),this._element=this._scope=this._attrs=null}});return MicroEvent.mixin(TabbarView),TabbarView._animatorDict={"default":new TabbarNoneAnimator,none:new TabbarNoneAnimator,fade:new TabbarFadeAnimator},TabbarView.registerAnimator=function(name,animator){if(!(animator instanceof TabbarAnimator))throw new Error('"animator" param must be an instance of TabbarAnimator');this._animatorDict[name]=animator},TabbarView}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsAlertDialog",["$onsen","AlertDialogView",function($onsen,AlertDialogView){return{restrict:"E",replace:!1,scope:!0,transclude:!1,compile:function(element,attrs){var modifierTemplater=$onsen.generateModifierTemplater(attrs);element.addClass("alert-dialog "+modifierTemplater("alert-dialog--*"));var titleElement=angular.element(element[0].querySelector(".alert-dialog-title")),contentElement=angular.element(element[0].querySelector(".alert-dialog-content"));return titleElement.length&&titleElement.addClass(modifierTemplater("alert-dialog-title--*")),contentElement.length&&contentElement.addClass(modifierTemplater("alert-dialog-content--*")),{pre:function(scope,element,attrs){var alertDialog=new AlertDialogView(scope,element,attrs);$onsen.declareVarAttribute(attrs,alertDialog),$onsen.registerEventHandlers(alertDialog,"preshow prehide postshow posthide destroy"),$onsen.addModifierMethods(alertDialog,"alert-dialog--*",element),titleElement.length&&$onsen.addModifierMethods(alertDialog,"alert-dialog-title--*",titleElement),contentElement.length&&$onsen.addModifierMethods(alertDialog,"alert-dialog-content--*",contentElement),$onsen.isAndroid()&&alertDialog.addModifier("android"),element.data("ons-alert-dialog",alertDialog),scope.$on("$destroy",function(){alertDialog._events=void 0,$onsen.removeModifierMethods(alertDialog),element.data("ons-alert-dialog",void 0),element=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsBackButton",["$onsen","$compile","GenericView","ComponentCleaner",function($onsen,$compile,GenericView,ComponentCleaner){return{restrict:"E",replace:!1,templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/back_button.tpl",transclude:!0,scope:!0,link:{pre:function(scope,element,attrs,controller,transclude){var backButton=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,backButton),element.data("ons-back-button",backButton),scope.$on("$destroy",function(){backButton._events=void 0,$onsen.removeModifierMethods(backButton),element.data("ons-back-button",void 0),element=null}),scope.modifierTemplater=$onsen.generateModifierTemplater(attrs);var navigator=ons.findParentComponentUntil("ons-navigator",element);scope.$watch(function(){return navigator.pages.length},function(nbrOfPages){scope.showBackButton=nbrOfPages>1}),$onsen.addModifierMethods(backButton,"toolbar-button--*",element.children()),transclude(scope,function(clonedElement){clonedElement[0]&&element[0].querySelector(".back-button__label").appendChild(clonedElement[0])}),ComponentCleaner.onDestroy(scope,function(){ComponentCleaner.destroyScope(scope),ComponentCleaner.destroyAttributes(attrs),element=null,scope=null,attrs=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsBottomToolbar",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",replace:!1,transclude:!1,scope:!1,compile:function(element,attrs){var modifierTemplater=$onsen.generateModifierTemplater(attrs),inline="undefined"!=typeof attrs.inline;return element.addClass("bottom-bar"),element.addClass(modifierTemplater("bottom-bar--*")),element.css({"z-index":0}),inline&&element.css("position","static"),{pre:function(scope,element,attrs){var bottomToolbar=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,bottomToolbar),element.data("ons-bottomToolbar",bottomToolbar),scope.$on("$destroy",function(){bottomToolbar._events=void 0,$onsen.removeModifierMethods(bottomToolbar),element.data("ons-bottomToolbar",void 0),element=null}),$onsen.addModifierMethods(bottomToolbar,"bottom-bar--*",element);var pageView=element.inheritedData("ons-page");pageView&&!inline&&pageView.registerBottomToolbar(element)},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsButton",["$onsen","ButtonView",function($onsen,ButtonView){return{restrict:"E",replace:!1,transclude:!0,scope:{animation:"@"},templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/button.tpl",link:function(scope,element,attrs,_,transclude){var button=new ButtonView(scope,element,attrs);$onsen.declareVarAttribute(attrs,button),element.data("ons-button",button),scope.$on("$destroy",function(){button._events=void 0,$onsen.removeModifierMethods(button),element.data("ons-button",void 0),element=null});var initialAnimation="slide-left";if(scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),element.addClass("button effeckt-button"),element.addClass(scope.modifierTemplater("button--*")),element.addClass(initialAnimation),$onsen.addModifierMethods(button,"button--*",element),transclude(scope.$parent,function(cloned){angular.element(element[0].querySelector(".ons-button-inner")).append(cloned)}),attrs.ngController)throw new Error("This element can't accept ng-controller directive.");scope.item={},scope.item.animation=initialAnimation,scope.$watch("animation",function(newAnimation){newAnimation&&(scope.item.animation&&element.removeClass(scope.item.animation),scope.item.animation=newAnimation,element.addClass(scope.item.animation))}),attrs.$observe("shouldSpin",function(shouldSpin){"true"===shouldSpin?element.attr("data-loading",!0):element.removeAttr("data-loading")}),$onsen.cleaner.onDestroy(scope,function(){$onsen.clearComponent({scope:scope,attrs:attrs,element:element}),scope=element=attrs=null}),$onsen.fireComponentEvent(element[0],"init")}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsCarousel",["$onsen","CarouselView",function($onsen,CarouselView){return{restrict:"E",replace:!1,scope:!1,transclude:!1,compile:function(element,attrs){var templater=$onsen.generateModifierTemplater(attrs);return element.addClass(templater("carousel--*")),function(scope,element,attrs){var carousel=new CarouselView(scope,element,attrs);element.data("ons-carousel",carousel),$onsen.registerEventHandlers(carousel,"postchange refresh overscroll destroy"),$onsen.declareVarAttribute(attrs,carousel),scope.$on("$destroy",function(){carousel._events=void 0,element.data("ons-carousel",void 0),element=null}),element[0].hasAttribute("auto-refresh")&&scope.$watch(function(){return element[0].childNodes.length},function(){setImmediate(function(){carousel.refresh()})}),setImmediate(function(){carousel.refresh()}),$onsen.fireComponentEvent(element[0],"init")}}}}]),module.directive("onsCarouselItem",["$onsen",function($onsen){return{restrict:"E",replace:!1,scope:!1,transclude:!1,compile:function(element,attrs){var templater=$onsen.generateModifierTemplater(attrs);return element.addClass(templater("carousel-item--*")),element.css("width","100%"),function(){}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsCol",["$timeout","$onsen",function($timeout,$onsen){return{restrict:"E",replace:!1,transclude:!1,scope:!1,compile:function(element){return element.addClass("col ons-col-inner"),function(scope,element,attrs){function updateAlign(align){"top"===align||"center"===align||"bottom"===align?(element.removeClass("col-top col-center col-bottom"),element.addClass("col-"+align)):element.removeClass("col-top col-center col-bottom")}function updateWidth(width){"string"==typeof width?(width=(""+width).trim(),width=width.match(/^\d+$/)?width+"%":width,element.css({"-webkit-box-flex":"0","-webkit-flex":"0 0 "+width,"-moz-box-flex":"0","-moz-flex":"0 0 "+width,"-ms-flex":"0 0 "+width,flex:"0 0 "+width,"max-width":width})):element.removeAttr("style")}attrs.$observe("align",function(align){updateAlign(align)}),attrs.$observe("width",function(width){updateWidth(width)}),attrs.$observe("size",function(size){attrs.width||updateWidth(size)}),updateAlign(attrs.align),attrs.size&&!attrs.width?updateWidth(attrs.size):updateWidth(attrs.width),$onsen.cleaner.onDestroy(scope,function(){$onsen.clearComponent({scope:scope,element:element,attrs:attrs}),element=attrs=scope=null}),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsDialog",["$onsen","DialogView",function($onsen,DialogView){return{restrict:"E",replace:!1,scope:!0,transclude:!0,templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/dialog.tpl",compile:function(element,attrs,transclude){return element[0].setAttribute("no-status-bar-fill",""),{pre:function(scope,element,attrs){transclude(scope,function(clone){angular.element(element[0].querySelector(".dialog")).append(clone)});var dialog=new DialogView(scope,element,attrs);scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),$onsen.addModifierMethods(dialog,"dialog--*",angular.element(element[0].querySelector(".dialog"))),$onsen.declareVarAttribute(attrs,dialog),$onsen.registerEventHandlers(dialog,"preshow prehide postshow posthide destroy"),element.data("ons-dialog",dialog),scope.$on("$destroy",function(){dialog._events=void 0,$onsen.removeModifierMethods(dialog),element.data("ons-dialog",void 0),element=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsDummyForInit",["$rootScope",function($rootScope){var isReady=!1;return{restrict:"E",replace:!1,link:{post:function(scope,element){isReady||(isReady=!0,$rootScope.$broadcast("$ons-ready")),element.remove()}}}}])}(),function(){"use strict";var EVENTS="drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate".split(/ +/);angular.module("onsen").directive("onsGestureDetector",["$onsen",function($onsen){function titlize(str){return str.charAt(0).toUpperCase()+str.slice(1)}var scopeDef=EVENTS.reduce(function(dict,name){return dict["ng"+titlize(name)]="&",dict},{});return{restrict:"E",scope:scopeDef,replace:!1,transclude:!0,compile:function(){return function(scope,element,attrs,controller,transclude){function handleEvent(event){var attr="ng"+titlize(event.type);attr in scopeDef&&scope[attr]({$event:event})}transclude(scope.$parent,function(cloned){element.append(cloned)});var hammer=new Hammer(element[0]);hammer.on(EVENTS.join(" "),handleEvent),$onsen.cleaner.onDestroy(scope,function(){hammer.off(EVENTS.join(" "),handleEvent),$onsen.clearComponent({scope:scope,element:element,attrs:attrs}),hammer.element=scope=element=attrs=null}),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";function cleanClassAttribute(element){var classList=(""+element.attr("class")).split(/ +/).filter(function(classString){return"fa"!==classString&&"fa-"!==classString.substring(0,3)&&"ion-"!==classString.substring(0,4)});element.attr("class",classList.join(" "))}function buildClassAndStyle(attrs){var classList=["ons-icon"],style={};0===attrs.icon.indexOf("ion-")?(classList.push(attrs.icon),classList.push("ons-icon--ion")):0===attrs.icon.indexOf("fa-")?(classList.push(attrs.icon),classList.push("fa")):(classList.push("fa"),classList.push("fa-"+attrs.icon));var size=""+attrs.size;return size.match(/^[1-5]x|lg$/)?classList.push("fa-"+size):"string"==typeof attrs.size?style["font-size"]=size:classList.push("fa-lg"),{"class":classList.join(" "),style:style}}var module=angular.module("onsen");module.directive("onsIcon",["$onsen",function($onsen){return{restrict:"E",replace:!1,transclude:!1,link:function(scope,element,attrs){if(attrs.ngController)throw new Error("This element can't accept ng-controller directive.");var update=function(){cleanClassAttribute(element);var builded=buildClassAndStyle(attrs);element.css(builded.style),element.addClass(builded["class"])},builded=buildClassAndStyle(attrs);element.css(builded.style),element.addClass(builded["class"]),attrs.$observe("icon",update),attrs.$observe("size",update),attrs.$observe("fixedWidth",update),attrs.$observe("rotate",update),attrs.$observe("flip",update),attrs.$observe("spin",update),$onsen.cleaner.onDestroy(scope,function(){$onsen.clearComponent({scope:scope,element:element,attrs:attrs}),element=scope=attrs=null}),$onsen.fireComponentEvent(element[0],"init")}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsIfOrientation",["$onsen","$onsGlobal",function($onsen,$onsGlobal){return{restrict:"A",replace:!1,transclude:!1,scope:!1,compile:function(element){return element.css("display","none"),function(scope,element,attrs){function update(){var userOrientation=(""+attrs.onsIfOrientation).toLowerCase(),orientation=getLandscapeOrPortrait();("portrait"===userOrientation||"landscape"===userOrientation)&&(userOrientation===orientation?element.css("display",""):element.css("display","none"))}function getLandscapeOrPortrait(){return $onsGlobal.orientation.isPortrait()?"portrait":"landscape"}element.addClass("ons-if-orientation-inner"),attrs.$observe("onsIfOrientation",update),$onsGlobal.orientation.on("change",update),update(),$onsen.cleaner.onDestroy(scope,function(){$onsGlobal.orientation.off("change",update),$onsen.clearComponent({element:element,scope:scope,attrs:attrs}),element=scope=attrs=null})}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsIfPlatform",["$onsen",function($onsen){return{restrict:"A",replace:!1,transclude:!1,scope:!1,compile:function(element){function getPlatformString(){if(navigator.userAgent.match(/Android/i))return"android";if(navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/RIM Tablet OS/i)||navigator.userAgent.match(/BB10/i))return"blackberry";if(navigator.userAgent.match(/iPhone|iPad|iPod/i))return"ios";if(navigator.userAgent.match(/IEMobile/i))return"windows";var isOpera=!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0;if(isOpera)return"opera";var isFirefox="undefined"!=typeof InstallTrigger;if(isFirefox)return"firefox";var isSafari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0;if(isSafari)return"safari";var isChrome=!!window.chrome&&!isOpera;if(isChrome)return"chrome";var isIE=!1||!!document.documentMode;return isIE?"ie":"unknown"}element.addClass("ons-if-platform-inner"),element.css("display","none");var platform=getPlatformString();return function(scope,element,attrs){function update(){attrs.onsIfPlatform.toLowerCase()===platform.toLowerCase()?element.css("display","block"):element.css("display","none")}attrs.$observe("onsIfPlatform",function(userPlatform){userPlatform&&update()}),update(),$onsen.cleaner.onDestroy(scope,function(){$onsen.clearComponent({element:element,scope:scope,attrs:attrs}),element=scope=attrs=null})}}}}])}(),function(){"use strict";var module=angular.module("onsen"),compileFunction=function(show,$onsen){return function(){return function(scope,element,attrs){var dispShow=show?"block":"none",dispHide=show?"none":"block",onShow=function(){element.css("display",dispShow)},onHide=function(){element.css("display",dispHide)},onInit=function(e){e.visible?onShow():onHide()};ons.softwareKeyboard.on("show",onShow),ons.softwareKeyboard.on("hide",onHide),ons.softwareKeyboard.on("init",onInit),ons.softwareKeyboard._visible?onShow():onHide(),$onsen.cleaner.onDestroy(scope,function(){ons.softwareKeyboard.off("show",onShow),ons.softwareKeyboard.off("hide",onHide),ons.softwareKeyboard.off("init",onInit),$onsen.clearComponent({element:element,scope:scope,attrs:attrs}),element=scope=attrs=null
})}}};module.directive("onsKeyboardActive",["$onsen",function($onsen){return{restrict:"A",replace:!1,transclude:!1,scope:!1,compile:compileFunction(!0,$onsen)}}]),module.directive("onsKeyboardInactive",["$onsen",function($onsen){return{restrict:"A",replace:!1,transclude:!1,scope:!1,compile:compileFunction(!1,$onsen)}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsLazyRepeat",["$onsen","LazyRepeatView",function($onsen,LazyRepeatView){return{restrict:"A",replace:!1,priority:1e3,transclude:"element",compile:function(element,attrs,linker){return function(scope,element,attrs){new LazyRepeatView(scope,element,attrs,linker);scope.$on("$destroy",function(){scope=element=attrs=linker=null})}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsList",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",scope:!1,replace:!1,transclude:!1,compile:function(){return function(scope,element,attrs){var list=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,list),element.data("ons-list",list),scope.$on("$destroy",function(){list._events=void 0,$onsen.removeModifierMethods(list),element.data("ons-list",void 0),element=null});var templater=$onsen.generateModifierTemplater(attrs);element.addClass("list ons-list-inner"),element.addClass(templater("list--*")),$onsen.addModifierMethods(list,"list--*",element),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsListHeader",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",replace:!1,transclude:!1,compile:function(){return function(scope,element,attrs){var listHeader=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,listHeader),element.data("ons-listHeader",listHeader),scope.$on("$destroy",function(){listHeader._events=void 0,$onsen.removeModifierMethods(listHeader),element.data("ons-listHeader",void 0),element=null});var templater=$onsen.generateModifierTemplater(attrs);element.addClass("list__header ons-list-header-inner"),element.addClass(templater("list__header--*")),$onsen.addModifierMethods(listHeader,"list__header--*",element),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsListItem",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",replace:!1,transclude:!1,compile:function(){return function(scope,element,attrs){var listItem=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,listItem),element.data("ons-list-item",listItem),scope.$on("$destroy",function(){listItem._events=void 0,$onsen.removeModifierMethods(listItem),element.data("ons-list-item",void 0),element=null});var templater=$onsen.generateModifierTemplater(attrs);element.addClass("list__item ons-list-item-inner"),element.addClass(templater("list__item--*")),$onsen.addModifierMethods(listItem,"list__item--*",element),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsLoadingPlaceholder",["$onsen","$compile",function($onsen){return{restrict:"A",replace:!1,transclude:!1,scope:!1,compile:function(element,attrs){if(!attrs.onsLoadingPlaceholder.length)throw Error("Must define page to load.");setImmediate(function(){$onsen.getPageHTMLAsync(attrs.onsLoadingPlaceholder).then(function(html){html=html.trim().replace(/^<ons-page>/,"").replace(/<\/ons-page>$/,"");var div=document.createElement("div");div.innerHTML=html;var newElement=angular.element(div);newElement.css("display","none"),element.append(newElement),ons.compile(newElement[0]);for(var i=element[0].childNodes.length-1;i>=0;i--){var e=element[0].childNodes[i];e!==div&&element[0].removeChild(e)}newElement.css("display","block")})})}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsModal",["$onsen","ModalView",function($onsen,ModalView){function compile(element,attrs){var modifierTemplater=$onsen.generateModifierTemplater(attrs),html=element[0].innerHTML;element[0].innerHTML="";var wrapper=angular.element("<div></div>");wrapper.addClass("modal__content"),wrapper.addClass(modifierTemplater("modal--*__content")),element.css("display","none"),element.addClass("modal"),element.addClass(modifierTemplater("modal--*")),wrapper[0].innerHTML=html,element.append(wrapper)}return{restrict:"E",replace:!1,scope:!1,transclude:!1,compile:function(element,attrs){return compile(element,attrs),{pre:function(scope,element,attrs){var page=element.inheritedData("ons-page");page&&page.registerExtraElement(element);var modal=new ModalView(scope,element);$onsen.addModifierMethods(modal,"modal--*",element),$onsen.addModifierMethods(modal,"modal--*__content",element.children()),$onsen.declareVarAttribute(attrs,modal),element.data("ons-modal",modal),scope.$on("$destroy",function(){modal._events=void 0,$onsen.removeModifierMethods(modal),element.data("ons-modal",void 0)})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsNavigator",["$compile","NavigatorView","$onsen",function($compile,NavigatorView,$onsen){return{restrict:"E",transclude:!1,scope:!0,compile:function(element){var html=$onsen.normalizePageHTML(element.html());return element.contents().remove(),{pre:function(scope,element,attrs){var navigator=new NavigatorView(scope,element,attrs);if($onsen.declareVarAttribute(attrs,navigator),$onsen.registerEventHandlers(navigator,"prepush prepop postpush postpop destroy"),attrs.page)navigator.pushPage(attrs.page,{});else{var pageScope=navigator._createPageScope(),pageElement=angular.element(html),linkScope=$compile(pageElement),link=function(){linkScope(pageScope)};navigator._pushPageDOM("",pageElement,link,pageScope,{}),pageElement=null}element.data("ons-navigator",navigator),scope.$on("$destroy",function(){navigator._events=void 0,element.data("ons-navigator",void 0),element=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsPage",["$onsen","PageView",function($onsen,PageView){function firePageInitEvent(element){var i=0,f=function(){if(!(i++<5))throw new Error('Fail to fire "pageinit" event. Attach "ons-page" element to the document after initialization.');isAttached(element)?(fillStatusBar(element),$onsen.fireComponentEvent(element,"init"),fireActualPageInitEvent(element)):setImmediate(f)};f()}function fireActualPageInitEvent(element){var event=document.createEvent("HTMLEvents");event.initEvent("pageinit",!0,!0),element.dispatchEvent(event)}function fillStatusBar(element){if($onsen.shouldFillStatusBar(element)){var fill=angular.element(document.createElement("div"));fill.addClass("page__status-bar-fill"),fill.css({width:"0px",height:"0px"}),angular.element(element).prepend(fill)}}function isAttached(element){return document.documentElement===element?!0:element.parentNode?isAttached(element.parentNode):!1}function preLink(scope,element,attrs){var page=new PageView(scope,element,attrs);$onsen.declareVarAttribute(attrs,page),element.data("ons-page",page);var modifierTemplater=$onsen.generateModifierTemplater(attrs),template="page--*";element.addClass("page "+modifierTemplater(template)),$onsen.addModifierMethods(page,template,element);var pageContent=angular.element(element[0].querySelector(".page__content"));pageContent.addClass(modifierTemplater("page--*__content")),pageContent=null;var pageBackground=angular.element(element[0].querySelector(".page__background"));pageBackground.addClass(modifierTemplater("page--*__background")),pageBackground=null,$onsen.cleaner.onDestroy(scope,function(){page._events=void 0,$onsen.removeModifierMethods(page),element.data("ons-page",void 0),$onsen.clearComponent({element:element,scope:scope,attrs:attrs}),scope=element=attrs=null})}function postLink(scope,element){firePageInitEvent(element[0])}return{restrict:"E",transclude:!1,scope:!1,compile:function(element){var children=element.children().remove(),content=angular.element('<div class="page__content ons-page-inner"></div>').append(children),background=angular.element('<div class="page__background"></div>');if(element.attr("style")&&(background.attr("style",element.attr("style")),element.attr("style","")),element.append(background),Modernizr.csstransforms3d)element.append(content);else{content.css("overflow","visible");var wrapper=angular.element("<div></div>");wrapper.append(children),content.append(wrapper),element.append(content),wrapper=null;var scroller=new IScroll(content[0],{momentum:!0,bounce:!0,hScrollbar:!1,vScrollbar:!1,preventDefault:!1}),offset=10;scroller.on("scrollStart",function(){var scrolled=scroller.y-offset;scrolled<scroller.maxScrollY+40&&scroller.refresh()})}return content=null,background=null,children=null,{pre:preLink,post:postLink}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsPopover",["$onsen","PopoverView",function($onsen,PopoverView){return{restrict:"E",replace:!1,transclude:!0,scope:!0,templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/popover.tpl",compile:function(element,attrs,transclude){return{pre:function(scope,element,attrs){transclude(scope,function(clone){angular.element(element[0].querySelector(".popover__content")).append(clone)});var popover=new PopoverView(scope,element,attrs);$onsen.declareVarAttribute(attrs,popover),$onsen.registerEventHandlers(popover,"preshow prehide postshow posthide destroy"),element.data("ons-popover",popover),scope.$on("$destroy",function(){popover._events=void 0,$onsen.removeModifierMethods(popover),element.data("ons-popover",void 0),element=null}),scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),$onsen.addModifierMethods(popover,"popover--*",angular.element(element[0].querySelector(".popover"))),$onsen.addModifierMethods(popover,"popover__content--*",angular.element(element[0].querySelector(".popover__content"))),$onsen.isAndroid()&&setImmediate(function(){popover.addModifier("android")}),scope.direction="up",scope.arrowPosition="bottom"},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsPullHook",["$onsen","PullHookView",function($onsen,PullHookView){return{restrict:"E",replace:!1,scope:!0,compile:function(){return{pre:function(scope,element,attrs){var pullHook=new PullHookView(scope,element,attrs);$onsen.declareVarAttribute(attrs,pullHook),$onsen.registerEventHandlers(pullHook,"changestate destroy"),element.data("ons-pull-hook",pullHook),scope.$on("$destroy",function(){pullHook._events=void 0,element.data("ons-pull-hook",void 0),scope=element=attrs=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsRow",["$onsen","$timeout",function($onsen){return{restrict:"E",replace:!1,transclude:!1,scope:!1,compile:function(element){return element.addClass("row ons-row-inner"),function(scope,element,attrs){function update(){var align=(""+attrs.align).trim();("top"===align||"center"===align||"bottom"===align)&&(element.removeClass("row-bottom row-center row-top"),element.addClass("row-"+align))}attrs.$observe("align",function(){update()}),update(),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsScroller",["$onsen","$timeout",function($onsen,$timeout){return{restrict:"E",replace:!1,transclude:!0,scope:{onScrolled:"&",infinitScrollEnable:"="},compile:function(element){element.addClass("ons-scroller").children().remove();return function(scope,element,attrs,controller,transclude){if(attrs.ngController)throw new Error('"ons-scroller" can\'t accept "ng-controller" directive.');var wrapper=angular.element("<div></div>");wrapper.addClass("ons-scroller__content ons-scroller-inner"),element.append(wrapper),transclude(scope.$parent,function(cloned){wrapper.append(cloned),wrapper=null});var scrollWrapper;scrollWrapper=element[0];var offset=parseInt(attrs.threshold)||10;scope.onScrolled&&scrollWrapper.addEventListener("scroll",function(){if(scope.infinitScrollEnable){var scrollTopAndOffsetHeight=scrollWrapper.scrollTop+scrollWrapper.offsetHeight,scrollHeightMinusOffset=scrollWrapper.scrollHeight-offset;scrollTopAndOffsetHeight>=scrollHeightMinusOffset&&scope.onScrolled()}}),Modernizr.csstransforms3d||$timeout(function(){var iScroll=new IScroll(scrollWrapper,{momentum:!0,bounce:!0,hScrollbar:!1,vScrollbar:!1,preventDefault:!1});iScroll.on("scrollStart",function(){var scrolled=iScroll.y-offset;scrolled<iScroll.maxScrollY+40&&iScroll.refresh()}),scope.onScrolled&&iScroll.on("scrollEnd",function(){var scrolled=iScroll.y-offset;scrolled<iScroll.maxScrollY&&scope.onScrolled()})},500),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsSlidingMenu",["$compile","SlidingMenuView","$onsen",function($compile,SlidingMenuView,$onsen){return{restrict:"E",replace:!1,transclude:!1,scope:!0,compile:function(element){var main=element[0].querySelector(".main"),menu=element[0].querySelector(".menu");if(main)var mainHtml=angular.element(main).remove().html().trim();if(menu)var menuHtml=angular.element(menu).remove().html().trim();return function(scope,element,attrs){if(attrs.ngController)throw new Error("This element can't accept ng-controller directive.");element.append(angular.element("<div></div>").addClass("onsen-sliding-menu__menu ons-sliding-menu-inner")),element.append(angular.element("<div></div>").addClass("onsen-sliding-menu__main ons-sliding-menu-inner"));var slidingMenu=new SlidingMenuView(scope,element,attrs);$onsen.registerEventHandlers(slidingMenu,"preopen preclose postopen postclose destroy"),mainHtml&&!attrs.mainPage&&slidingMenu._appendMainPage(null,mainHtml),menuHtml&&!attrs.menuPage&&slidingMenu._appendMenuPage(menuHtml),$onsen.declareVarAttribute(attrs,slidingMenu),element.data("ons-sliding-menu",slidingMenu),scope.$on("$destroy",function(){slidingMenu._events=void 0,element.data("ons-sliding-menu",void 0)}),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsSplitView",["$compile","SplitView","$onsen",function($compile,SplitView,$onsen){return{restrict:"E",replace:!1,transclude:!1,scope:!0,compile:function(element){var mainPage=element[0].querySelector(".main-page"),secondaryPage=element[0].querySelector(".secondary-page");if(mainPage)var mainHtml=angular.element(mainPage).remove().html().trim();if(secondaryPage)var secondaryHtml=angular.element(secondaryPage).remove().html().trim();return function(scope,element,attrs){if(attrs.ngController)throw new Error("This element can't accept ng-controller directive.");element.append(angular.element("<div></div>").addClass("onsen-split-view__secondary full-screen ons-split-view-inner")),element.append(angular.element("<div></div>").addClass("onsen-split-view__main full-screen ons-split-view-inner"));var splitView=new SplitView(scope,element,attrs);mainHtml&&!attrs.mainPage&&splitView._appendMainPage(mainHtml),secondaryHtml&&!attrs.secondaryPage&&splitView._appendSecondPage(secondaryHtml),$onsen.declareVarAttribute(attrs,splitView),$onsen.registerEventHandlers(splitView,"update presplit precollapse postsplit postcollapse destroy"),element.data("ons-split-view",splitView),scope.$on("$destroy",function(){splitView._events=void 0,element.data("ons-split-view",void 0)}),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsSwitch",["$onsen","$parse","SwitchView",function($onsen,$parse,SwitchView){return{restrict:"E",replace:!1,transclude:!1,scope:!0,templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/switch.tpl",compile:function(){return function(scope,element,attrs){if(attrs.ngController)throw new Error("This element can't accept ng-controller directive.");var switchView=new SwitchView(element,scope,attrs),checkbox=angular.element(element[0].querySelector("input[type=checkbox]"));scope.modifierTemplater=$onsen.generateModifierTemplater(attrs);var label=element.children(),input=angular.element(label.children()[0]),toggle=angular.element(label.children()[1]);if($onsen.addModifierMethods(switchView,"switch--*",label),$onsen.addModifierMethods(switchView,"switch--*__input",input),$onsen.addModifierMethods(switchView,"switch--*__toggle",toggle),attrs.$observe("checked",function(){scope.model=!!element.attr("checked")}),attrs.$observe("name",function(name){element.attr("name")&&checkbox.attr("name",name)}),attrs.ngModel){var set=$parse(attrs.ngModel).assign;scope.$parent.$watch(attrs.ngModel,function(value){scope.model=value}),scope.$watch("model",function(to,from){set(scope.$parent,to),to!==from&&scope.$eval(attrs.ngChange)})}$onsen.declareVarAttribute(attrs,switchView),element.data("ons-switch",switchView),$onsen.cleaner.onDestroy(scope,function(){switchView._events=void 0,$onsen.removeModifierMethods(switchView),element.data("ons-switch",void 0),$onsen.clearComponent({element:element,scope:scope,attrs:attrs}),checkbox=element=attrs=scope=null}),$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";function tab($onsen,$compile){return{restrict:"E",transclude:!0,scope:{page:"@",active:"@",icon:"@",activeIcon:"@",label:"@",noReload:"@",persistent:"@"},templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/tab.tpl",compile:function(element){return element.addClass("tab-bar__item"),function(scope,element,attrs,controller,transclude){var tabbarView=element.inheritedData("ons-tabbar");if(!tabbarView)throw new Error("This ons-tab element is must be child of ons-tabbar element.");element.addClass(tabbarView._scope.modifierTemplater("tab-bar--*__item")),element.addClass(tabbarView._scope.modifierTemplater("tab-bar__item--*")),transclude(scope.$parent,function(cloned){var wrapper=angular.element(element[0].querySelector(".tab-bar-inner"));if(attrs.icon||attrs.label||!cloned[0]){var innerElement=angular.element("<div>"+defaultInnerTemplate+"</div>").children();wrapper.append(innerElement),$compile(innerElement)(scope)}else wrapper.append(cloned)});var radioButton=element[0].querySelector("input");scope.tabbarModifierTemplater=tabbarView._scope.modifierTemplater,scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),scope.tabbarId=tabbarView._tabbarId,scope.tabIcon=scope.icon,tabbarView.addTabItem(scope),scope.setActive=function(){element.addClass("active"),radioButton.checked=!0,scope.activeIcon&&(scope.tabIcon=scope.activeIcon),angular.element(element[0].querySelectorAll("[ons-tab-inactive]")).css("display","none"),angular.element(element[0].querySelectorAll("[ons-tab-active]")).css("display","inherit")},scope.setInactive=function(){element.removeClass("active"),radioButton.checked=!1,scope.tabIcon=scope.icon,angular.element(element[0].querySelectorAll("[ons-tab-inactive]")).css("display","inherit"),angular.element(element[0].querySelectorAll("[ons-tab-active]")).css("display","none")},scope.isPersistent=function(){return"undefined"!=typeof scope.persistent},scope.isActive=function(){return element.hasClass("active")},scope.tryToChange=function(){tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope))},scope.active&&tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope)),$onsen.fireComponentEvent(element[0],"init")}}}}var module=angular.module("onsen");module.directive("onsTab",tab),module.directive("onsTabbarItem",tab);var defaultInnerTemplate='<div ng-if="icon != undefined" class="tab-bar__icon"><ons-icon icon="{{tabIcon}}" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon></div><div ng-if="label" class="tab-bar__label">{{label}}</div>';tab.$inject=["$onsen","$compile"]}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsTabbar",["$onsen","$compile","TabbarView",function($onsen,$compile,TabbarView){return{restrict:"E",replace:!1,transclude:!0,scope:!0,templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/tab_bar.tpl",link:function(scope,element,attrs,controller,transclude){scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),scope.selectedTabItem={source:""},attrs.$observe("hideTabs",function(hide){var visible="true"!==hide;tabbarView.setTabbarVisibility(visible)});var tabbarView=new TabbarView(scope,element,attrs);$onsen.addModifierMethods(tabbarView,"tab-bar--*",angular.element(element.children()[1])),$onsen.registerEventHandlers(tabbarView,"reactive prechange postchange destroy"),scope.tabbarId=tabbarView._tabbarId,element.data("ons-tabbar",tabbarView),$onsen.declareVarAttribute(attrs,tabbarView),transclude(scope,function(cloned){angular.element(element[0].querySelector(".ons-tabbar-inner")).append(cloned)}),scope.$on("$destroy",function(){tabbarView._events=void 0,$onsen.removeModifierMethods(tabbarView),element.data("ons-tabbar",void 0)}),$onsen.fireComponentEvent(element[0],"init")}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsTemplate",["$onsen","$templateCache",function($onsen,$templateCache){return{restrict:"E",transclude:!1,priority:1e3,terminal:!0,compile:function(element){$templateCache.put(element.attr("id"),element.remove().html()),$onsen.fireComponentEvent(element[0],"init")}}}])}(),function(){"use strict";function ensureLeftContainer(element,modifierTemplater){var container=element[0].querySelector(".left");return container||(container=document.createElement("div"),container.setAttribute("class","left"),container.innerHTML="&nbsp;"),""===container.innerHTML.trim()&&(container.innerHTML="&nbsp;"),angular.element(container).addClass("navigation-bar__left").addClass(modifierTemplater("navigation-bar--*__left")),container}function ensureCenterContainer(element,modifierTemplater){var container=element[0].querySelector(".center");return container||(container=document.createElement("div"),container.setAttribute("class","center")),""===container.innerHTML.trim()&&(container.innerHTML="&nbsp;"),angular.element(container).addClass("navigation-bar__title navigation-bar__center").addClass(modifierTemplater("navigation-bar--*__center")),container}function ensureRightContainer(element,modifierTemplater){var container=element[0].querySelector(".right");return container||(container=document.createElement("div"),container.setAttribute("class","right"),container.innerHTML="&nbsp;"),""===container.innerHTML.trim()&&(container.innerHTML="&nbsp;"),angular.element(container).addClass("navigation-bar__right").addClass(modifierTemplater("navigation-bar--*__right")),container}function hasCenterClassElementOnly(element){for(var child,hasCenter=!1,hasOther=!1,children=element.contents(),i=0;i<children.length;i++)child=angular.element(children[i]),child.hasClass("center")?hasCenter=!0:(child.hasClass("left")||child.hasClass("right"))&&(hasOther=!0);return hasCenter&&!hasOther}function ensureToolbarItemElements(element,modifierTemplater){var center;if(hasCenterClassElementOnly(element))center=ensureCenterContainer(element,modifierTemplater),element.contents().remove(),element.append(center);else{center=ensureCenterContainer(element,modifierTemplater);var left=ensureLeftContainer(element,modifierTemplater),right=ensureRightContainer(element,modifierTemplater);element.contents().remove(),element.append(angular.element([left,center,right]))}}var module=angular.module("onsen");module.directive("onsToolbar",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",replace:!1,scope:!1,transclude:!1,compile:function(element,attrs){var shouldAppendAndroidModifier=ons.platform.isAndroid()&&!element[0].hasAttribute("fixed-style"),modifierTemplater=$onsen.generateModifierTemplater(attrs,shouldAppendAndroidModifier?["android"]:[]),inline="undefined"!=typeof attrs.inline;return element.addClass("navigation-bar"),element.addClass(modifierTemplater("navigation-bar--*")),inline||element.css({position:"absolute","z-index":"10000",left:"0px",right:"0px",top:"0px"}),ensureToolbarItemElements(element,modifierTemplater),{pre:function(scope,element,attrs){var toolbar=new GenericView(scope,element,attrs);$onsen.declareVarAttribute(attrs,toolbar),scope.$on("$destroy",function(){toolbar._events=void 0,$onsen.removeModifierMethods(toolbar),element.data("ons-toolbar",void 0),element=null}),$onsen.addModifierMethods(toolbar,"navigation-bar--*",element),angular.forEach(["left","center","right"],function(position){var el=element[0].querySelector(".navigation-bar__"+position);el&&$onsen.addModifierMethods(toolbar,"navigation-bar--*__"+position,angular.element(el))});var pageView=element.inheritedData("ons-page");pageView&&!inline&&pageView.registerToolbar(element),element.data("ons-toolbar",toolbar)},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}}])}(),function(){"use strict";var module=angular.module("onsen");module.directive("onsToolbarButton",["$onsen","GenericView",function($onsen,GenericView){return{restrict:"E",transclude:!0,scope:{},templateUrl:$onsen.DIRECTIVE_TEMPLATE_URL+"/toolbar_button.tpl",link:{pre:function(scope,element,attrs){var toolbarButton=new GenericView(scope,element,attrs),innerElement=element[0].querySelector(".toolbar-button");$onsen.declareVarAttribute(attrs,toolbarButton),element.data("ons-toolbar-button",toolbarButton),scope.$on("$destroy",function(){toolbarButton._events=void 0,$onsen.removeModifierMethods(toolbarButton),element.data("ons-toolbar-button",void 0),element=null});var modifierTemplater=$onsen.generateModifierTemplater(attrs);if(attrs.ngController)throw new Error("This element can't accept ng-controller directive.");attrs.$observe("disabled",function(value){value===!1||"undefined"==typeof value?innerElement.removeAttribute("disabled"):innerElement.setAttribute("disabled","disabled")}),scope.modifierTemplater=$onsen.generateModifierTemplater(attrs),$onsen.addModifierMethods(toolbarButton,"toolbar-button--*",element.children()),element.children("span").addClass(modifierTemplater("toolbar-button--*")),$onsen.cleaner.onDestroy(scope,function(){$onsen.clearComponent({scope:scope,attrs:attrs,element:element}),scope=element=attrs=null})},post:function(scope,element){$onsen.fireComponentEvent(element[0],"init")}}}}])}(),function(){"use strict";var module=angular.module("onsen"),ComponentCleaner={decomposeNode:function(element){for(var children=element.remove().children(),i=0;i<children.length;i++)ComponentCleaner.decomposeNode(angular.element(children[i]))},destroyAttributes:function(attrs){attrs.$$element=null,attrs.$$observers=null},destroyElement:function(element){element.remove()},destroyScope:function(scope){scope.$$listeners={},scope.$$watchers=null,scope=null},onDestroy:function(scope,fn){var clear=scope.$on("$destroy",function(){clear(),fn.apply(null,arguments)})}};module.factory("ComponentCleaner",function(){return ComponentCleaner}),function(){var ngEventDirectives={};"click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" ").forEach(function(name){function directiveNormalize(name){return name.replace(/-([a-z])/g,function(matches){return matches[1].toUpperCase()})}var directiveName=directiveNormalize("ng-"+name);ngEventDirectives[directiveName]=["$parse",function($parse){return{compile:function($element,attr){var fn=$parse(attr[directiveName]);return function(scope,element,attr){var listener=function(event){scope.$apply(function(){fn(scope,{$event:event})})};element.on(name,listener),ComponentCleaner.onDestroy(scope,function(){element.off(name,listener),element=null,ComponentCleaner.destroyScope(scope),scope=null,ComponentCleaner.destroyAttributes(attr),attr=null})}}}}]}),module.config(["$provide",function($provide){var shift=function($delegate){return $delegate.shift(),$delegate};Object.keys(ngEventDirectives).forEach(function(directiveName){$provide.decorator(directiveName+"Directive",["$delegate",shift])})}]),Object.keys(ngEventDirectives).forEach(function(directiveName){module.directive(directiveName,ngEventDirectives[directiveName])})}()}(),function(){"use strict";var util={init:function(){this.ready=!1},addBackButtonListener:function(fn){this._ready?window.document.addEventListener("backbutton",fn,!1):window.document.addEventListener("deviceready",function(){window.document.addEventListener("backbutton",fn,!1)})},removeBackButtonListener:function(fn){this._ready?window.document.removeEventListener("backbutton",fn,!1):window.document.addEventListener("deviceready",function(){window.document.removeEventListener("backbutton",fn,!1)})}};util.init(),angular.module("onsen").service("DeviceBackButtonHandler",function(){this._init=function(){window.ons.isWebView()?window.document.addEventListener("deviceready",function(){util._ready=!0},!1):util._ready=!0,this._bindedCallback=this._callback.bind(this),this.enable()},this._isEnabled=!1,this.enable=function(){this._isEnabled||(util.addBackButtonListener(this._bindedCallback),this._isEnabled=!0)},this.disable=function(){this._isEnabled&&(util.removeBackButtonListener(this._bindedCallback),this._isEnabled=!1)},this.fireDeviceBackButtonEvent=function(){var event=document.createEvent("Event");event.initEvent("backbutton",!0,!0),document.dispatchEvent(event)},this._callback=function(){this._dispatchDeviceBackButtonEvent()},this.create=function(element,callback){if(!(element instanceof angular.element().constructor))throw new Error("element must be an instance of jqLite");if(!(callback instanceof Function))throw new Error("callback must be an instance of Function");var handler={_callback:callback,_element:element,disable:function(){this._element.data("device-backbutton-handler",null)},setListener:function(callback){this._callback=callback},enable:function(){this._element.data("device-backbutton-handler",this)},isEnabled:function(){return this._element.data("device-backbutton-handler")===this},destroy:function(){this._element.data("device-backbutton-handler",null),this._callback=this._element=null}};return handler.enable(),handler},this._dispatchDeviceBackButtonEvent=function(){function createEvent(element){return{_element:element,callParentHandler:function(){for(var parent=this._element.parent();parent[0];){if(handler=parent.data("device-backbutton-handler"))return handler._callback(createEvent(parent));parent=parent.parent()}}}}var tree=this._captureTree(),element=this._findHandlerLeafElement(tree),handler=element.data("device-backbutton-handler");handler._callback(createEvent(element))},this._dumpParents=function(element){for(;element[0];)console.log(element[0].nodeName.toLowerCase()+"."+element.attr("class")),element=element.parent()},this._captureTree=function(){function createTree(element){return{element:element,children:Array.prototype.concat.apply([],Array.prototype.map.call(element.children(),function(child){if(child=angular.element(child),"none"===child[0].style.display)return[];if(0===child.children().length&&!child.data("device-backbutton-handler"))return[];var result=createTree(child);return 0!==result.children.length||child.data("device-backbutton-handler")?[result]:[]}))}}return createTree(angular.element(document.body))},this._dumpTree=function(node){function _dump(node,level){var pad=new Array(level+1).join("  ");console.log(pad+node.element[0].nodeName.toLowerCase()),node.children.forEach(function(node){_dump(node,level+1)})}_dump(node,0)},this._findHandlerLeafElement=function(tree){function find(node){return 0===node.children.length?node.element:1===node.children.length?find(node.children[0]):node.children.map(function(childNode){return childNode.element}).reduce(function(left,right){if(null===left)return right;
var leftZ=parseInt(window.getComputedStyle(left[0],"").zIndex,10),rightZ=parseInt(window.getComputedStyle(right[0],"").zIndex,10);if(!isNaN(leftZ)&&!isNaN(rightZ))return leftZ>rightZ?left:right;throw new Error("Capturing backbutton-handler is failure.")},null)}return find(tree)},this._init()})}(),function(){"use strict";var module=angular.module("onsen");module.factory("$onsen",["$rootScope","$window","$cacheFactory","$document","$templateCache","$http","$q","$onsGlobal","ComponentCleaner","DeviceBackButtonHandler",function($rootScope,$window,$cacheFactory,$document,$templateCache,$http,$q,$onsGlobal,ComponentCleaner,DeviceBackButtonHandler){function createOnsenService(){return{DIRECTIVE_TEMPLATE_URL:"templates",cleaner:ComponentCleaner,DeviceBackButtonHandler:DeviceBackButtonHandler,_defaultDeviceBackButtonHandler:DeviceBackButtonHandler.create(angular.element(document.body),function(){navigator.app.exitApp()}),getDefaultDeviceBackButtonHandler:function(){return this._defaultDeviceBackButtonHandler},isEnabledAutoStatusBarFill:function(){return!!$onsGlobal._config.autoStatusBarFill},shouldFillStatusBar:function(element){if(this.isEnabledAutoStatusBarFill()&&this.isWebView()&&this.isIOS7Above()){if(!(element instanceof HTMLElement))throw new Error("element must be an instance of HTMLElement");for(var debug="ONS-TABBAR"===element.tagName?console.log.bind(console):angular.noop;;){if(element.hasAttribute("no-status-bar-fill"))return!1;if(element=element.parentNode,debug(element),!element||!element.hasAttribute)return!0}}return!1},clearComponent:function(params){params.scope&&ComponentCleaner.destroyScope(params.scope),params.attrs&&ComponentCleaner.destroyAttributes(params.attrs),params.element&&ComponentCleaner.destroyElement(params.element),params.elements&&params.elements.forEach(function(element){ComponentCleaner.destroyElement(element)})},upTo:function(el,tagName){tagName=tagName.toLowerCase();do{if(!el)return null;if(el=el.parentNode,el.tagName.toLowerCase()==tagName)return el}while(el.parentNode);return null},waitForVariables:function(dependencies,callback){unlockerDict.addCallback(dependencies,callback)},findElementeObject:function(element,name){return element.inheritedData(name)},getPageHTMLAsync:function(page){var cache=$templateCache.get(page);if(cache){var deferred=$q.defer(),html="string"==typeof cache?cache:cache[1];return deferred.resolve(this.normalizePageHTML(html)),deferred.promise}return $http({url:page,method:"GET"}).then(function(response){var html=response.data;return this.normalizePageHTML(html)}.bind(this))},normalizePageHTML:function(html){return html=(""+html).trim(),html.match(/^<(ons-page|ons-navigator|ons-tabbar|ons-sliding-menu|ons-split-view)/)||(html="<ons-page>"+html+"</ons-page>"),html},generateModifierTemplater:function(attrs,modifiers){var attrModifiers=attrs&&"string"==typeof attrs.modifier?attrs.modifier.trim().split(/ +/):[];return modifiers=angular.isArray(modifiers)?attrModifiers.concat(modifiers):attrModifiers,function(template){return modifiers.map(function(modifier){return template.replace("*",modifier)}).join(" ")}},addModifierMethods:function(view,template,element){var _tr=function(modifier){return template.replace("*",modifier)},fns={hasModifier:function(modifier){return element.hasClass(_tr(modifier))},removeModifier:function(modifier){element.removeClass(_tr(modifier))},addModifier:function(modifier){element.addClass(_tr(modifier))},setModifier:function(modifier){for(var classes=element.attr("class").split(/\s+/),patt=template.replace("*","."),i=0;i<classes.length;i++){var cls=classes[i];cls.match(patt)&&element.removeClass(cls)}element.addClass(_tr(modifier))},toggleModifier:function(modifier){var cls=_tr(modifier);element.hasClass(cls)?element.removeClass(cls):element.addClass(cls)}},append=function(oldFn,newFn){return"undefined"!=typeof oldFn?function(){return oldFn.apply(null,arguments)||newFn.apply(null,arguments)}:newFn};view.hasModifier=append(view.hasModifier,fns.hasModifier),view.removeModifier=append(view.removeModifier,fns.removeModifier),view.addModifier=append(view.addModifier,fns.addModifier),view.setModifier=append(view.setModifier,fns.setModifier),view.toggleModifier=append(view.toggleModifier,fns.toggleModifier)},removeModifierMethods:function(view){view.hasModifier=view.removeModifier=view.addModifier=view.setModifier=view.toggleModifier=void 0},declareVarAttribute:function(attrs,object){if("string"==typeof attrs["var"]){var varName=attrs["var"];this._defineVar(varName,object),unlockerDict.unlockVarName(varName)}},_registerEventHandler:function(component,eventName){var capitalizedEventName=eventName.charAt(0).toUpperCase()+eventName.slice(1);component.on(eventName,function(event){$onsen.fireComponentEvent(component._element[0],eventName,event);var handler=component._attrs["ons"+capitalizedEventName];handler&&(component._scope.$eval(handler,{$event:event}),component._scope.$evalAsync())})},registerEventHandlers:function(component,eventNames){eventNames=eventNames.trim().split(/\s+/);for(var i=0,l=eventNames.length;l>i;i++){var eventName=eventNames[i];this._registerEventHandler(component,eventName)}},isAndroid:function(){return!!window.navigator.userAgent.match(/android/i)},isIOS:function(){return!!window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i)},isWebView:function(){return window.ons.isWebView()},isIOS7Above:function(){var ua=window.navigator.userAgent,match=ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i),result=match?parseFloat(match[2]+"."+match[3])>=7:!1;return function(){return result}}(),fireComponentEvent:function(dom,eventName,data){data=data||{};var event=document.createEvent("HTMLEvents");for(var key in data)data.hasOwnProperty(key)&&(event[key]=data[key]);event.component=dom?angular.element(dom).data(dom.nodeName.toLowerCase())||null:null,event.initEvent(dom.nodeName.toLowerCase()+":"+eventName,!0,!0),dom.dispatchEvent(event)},_defineVar:function(name,object){function set(container,names,object){for(var name,i=0;i<names.length-1;i++)name=names[i],(void 0===container[name]||null===container[name])&&(container[name]={}),container=container[name];if(container[names[names.length-1]]=object,container[names[names.length-1]]!==object)throw new Error('Cannot set var="'+object._attrs.var+'" because it will overwrite a read-only variable.')}var names=name.split(/\./);ons.componentBase&&set(ons.componentBase,names,object),set($rootScope,names,object)}}}function createUnlockerDict(){return{_unlockersDict:{},_unlockedVarDict:{},_addVarLock:function(name,unlocker){if(!(unlocker instanceof Function))throw new Error("unlocker argument must be an instance of Function.");this._unlockersDict[name]?this._unlockersDict[name].push(unlocker):this._unlockersDict[name]=[unlocker]},unlockVarName:function(varName){var unlockers=this._unlockersDict[varName];unlockers&&unlockers.forEach(function(unlock){unlock()}),this._unlockedVarDict[varName]=!0},addCallback:function(dependencies,callback){if(!(callback instanceof Function))throw new Error("callback argument must be an instance of Function.");var doorLock=new DoorLock,self=this;dependencies.forEach(function(varName){if(!self._unlockedVarDict[varName]){var unlock=doorLock.lock();self._addVarLock(varName,unlock)}}),doorLock.isLocked()?doorLock.waitUnlock(callback):callback()}}}var unlockerDict=createUnlockerDict(),$onsen=createOnsenService();return $onsen}])}(),window.animit=function(){"use strict";var Animit=function(element){if(!(this instanceof Animit))return new Animit(element);if(element instanceof HTMLElement)this.elements=[element];else{if("[object Array]"!==Object.prototype.toString.call(element))throw new Error("First argument must be an array or an instance of HTMLElement.");this.elements=element}this.transitionQueue=[],this.lastStyleAttributeDict=[];var self=this;this.elements.forEach(function(element,index){element.hasAttribute("data-animit-orig-style")?self.lastStyleAttributeDict[index]=element.getAttribute("data-animit-orig-style"):(self.lastStyleAttributeDict[index]=element.getAttribute("style"),element.setAttribute("data-animit-orig-style",self.lastStyleAttributeDict[index]||""))})};Animit.prototype={transitionQueue:void 0,element:void 0,play:function(callback){return"function"==typeof callback&&this.transitionQueue.push(function(done){callback(),done()}),this.startAnimation(),this},queue:function(transition,options){var queue=this.transitionQueue;if(transition&&options&&(options.css=transition,transition=new Animit.Transition(options)),transition instanceof Function||transition instanceof Animit.Transition||(transition=transition.css?new Animit.Transition(transition):new Animit.Transition({css:transition})),transition instanceof Function)queue.push(transition);else{if(!(transition instanceof Animit.Transition))throw new Error("Invalid arguments");queue.push(transition.build())}return this},wait:function(seconds){return this.transitionQueue.push(function(done){setTimeout(done,1e3*seconds)}),this},resetStyle:function(options){function reset(){self.elements.forEach(function(element,index){element.style[Animit.prefix+"Transition"]="none",element.style.transition="none",self.lastStyleAttributeDict[index]?element.setAttribute("style",self.lastStyleAttributeDict[index]):(element.setAttribute("style",""),element.removeAttribute("style"))})}options=options||{};var self=this;if(options.transition&&!options.duration)throw new Error('"options.duration" is required when "options.transition" is enabled.');if(options.transition||options.duration&&options.duration>0){var transitionValue=options.transition||"all "+options.duration+"s "+(options.timing||"linear"),transitionStyle="transition: "+transitionValue+"; -"+Animit.prefix+"-transition: "+transitionValue+";";this.transitionQueue.push(function(done){var elements=this.elements;elements.forEach(function(element,index){element.style[Animit.prefix+"Transition"]=transitionValue,element.style.transition=transitionValue;var styleValue=(self.lastStyleAttributeDict[index]?self.lastStyleAttributeDict[index]+"; ":"")+transitionStyle;element.setAttribute("style",styleValue)});var removeListeners=util.addOnTransitionEnd(elements[0],function(){clearTimeout(timeoutId),reset(),done()}),timeoutId=setTimeout(function(){removeListeners(),reset(),done()},1e3*options.duration*1.4)})}else this.transitionQueue.push(function(done){reset(),done()});return this},startAnimation:function(){return this._dequeueTransition(),this},_dequeueTransition:function(){var transition=this.transitionQueue.shift();if(this._currentTransition)throw new Error("Current transition exists.");this._currentTransition=transition;var self=this,called=!1,done=function(){if(called)throw new Error("Invalid state: This callback is called twice.");called=!0,self._currentTransition=void 0,self._dequeueTransition()};transition&&transition.call(this,done)}},Animit.cssPropertyDict=function(){var styles=window.getComputedStyle(document.documentElement,""),dict={},a="A".charCodeAt(0),z="z".charCodeAt(0);for(var key in styles)if(styles.hasOwnProperty(key)){{key.charCodeAt(0)}a<=key.charCodeAt(0)&&z>=key.charCodeAt(0)&&"cssText"!==key&&"parentText"!==key&&"length"!==key&&(dict[key]=!0)}return dict}(),Animit.hasCssProperty=function(name){return!!Animit.cssPropertyDict[name]},Animit.prefix=function(){var styles=window.getComputedStyle(document.documentElement,""),pre=(Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)||""===styles.OLink&&["","o"])[1];return pre}(),Animit.runAll=function(){for(var i=0;i<arguments.length;i++)arguments[i].play()},Animit.Transition=function(options){this.options=options||{},this.options.duration=this.options.duration||0,this.options.timing=this.options.timing||"linear",this.options.css=this.options.css||{},this.options.property=this.options.property||"all"},Animit.Transition.prototype={build:function(){function createActualCssProps(css){var result={};return Object.keys(css).forEach(function(name){var value=css[name];name=util.normalizeStyleName(name);var prefixed=Animit.prefix+util.capitalize(name);Animit.cssPropertyDict[name]?result[name]=value:Animit.cssPropertyDict[prefixed]?result[prefixed]=value:(result[prefixed]=value,result[name]=value)}),result}if(0===Object.keys(this.options.css).length)throw new Error("options.css is required.");var css=createActualCssProps(this.options.css);if(this.options.duration>0){var transitionValue=util.buildTransitionValue(this.options),self=this;return function(callback){var elements=this.elements,timeout=1e3*self.options.duration*1.4,removeListeners=util.addOnTransitionEnd(elements[0],function(){clearTimeout(timeoutId),callback()}),timeoutId=setTimeout(function(){removeListeners(),callback()},timeout);elements.forEach(function(element){element.style[Animit.prefix+"Transition"]=transitionValue,element.style.transition=transitionValue,Object.keys(css).forEach(function(name){element.style[name]=css[name]})})}}return this.options.duration<=0?function(callback){var elements=this.elements;elements.forEach(function(element){element.style[Animit.prefix+"Transition"]="none",element.transition="none",Object.keys(css).forEach(function(name){element.style[name]=css[name]})}),elements.length&&elements[0].offsetHeight,window.requestAnimationFrame?requestAnimationFrame(callback):setTimeout(callback,1e3/30)}:void 0}};var util={normalizeStyleName:function(name){return name=name.replace(/-[a-zA-Z]/g,function(all){return all.slice(1).toUpperCase()}),name.charAt(0).toLowerCase()+name.slice(1)},capitalize:function(str){return str.charAt(0).toUpperCase()+str.slice(1)},buildTransitionValue:function(params){params.property=params.property||"all",params.duration=params.duration||.4,params.timing=params.timing||"linear";var props=params.property.split(/ +/);return props.map(function(prop){return prop+" "+params.duration+"s "+params.timing}).join(", ")},addOnTransitionEnd:function(element,callback){if(!element)return function(){};var fn=function(event){element==event.target&&(event.stopPropagation(),removeListeners(),callback())},removeListeners=function(){util._transitionEndEvents.forEach(function(eventName){element.removeEventListener(eventName,fn)})};return util._transitionEndEvents.forEach(function(eventName){element.addEventListener(eventName,fn,!1)}),removeListeners},_transitionEndEvents:function(){return"webkit"===Animit.prefix||"o"===Animit.prefix||"moz"===Animit.prefix||"ms"===Animit.prefix?[Animit.prefix+"TransitionEnd","transitionend"]:["transitionend"]}()};return Animit}(),window.ons.notification=function(){var createAlertDialog=function(title,message,buttonLabels,primaryButtonIndex,modifier,animation,callback,messageIsHTML,cancelable,promptDialog,autofocus,placeholder){var inputEl,dialogEl=angular.element("<ons-alert-dialog>"),titleEl=angular.element("<div>").addClass("alert-dialog-title").text(title),messageEl=angular.element("<div>").addClass("alert-dialog-content"),footerEl=angular.element("<div>").addClass("alert-dialog-footer");modifier&&dialogEl.attr("modifier",modifier),dialogEl.attr("animation",animation),messageIsHTML?messageEl.html(message):messageEl.text(message),dialogEl.append(titleEl).append(messageEl),promptDialog&&(inputEl=angular.element("<input>").addClass("text-input").attr("placeholder",placeholder).css({width:"100%",marginTop:"10px"}),messageEl.append(inputEl)),dialogEl.append(footerEl),angular.element(document.body).append(dialogEl),ons.compile(dialogEl[0]);var alertDialog=dialogEl.data("ons-alert-dialog");buttonLabels.length<=2&&footerEl.addClass("alert-dialog-footer--one");for(var createButton=function(i){var buttonEl=angular.element("<button>").addClass("alert-dialog-button").text(buttonLabels[i]);i==primaryButtonIndex&&buttonEl.addClass("alert-dialog-button--primal"),buttonLabels.length<=2&&buttonEl.addClass("alert-dialog-button--one"),buttonEl.on("click",function(){buttonEl.off("click"),alertDialog.hide({callback:function(){promptDialog?callback(inputEl.val()):callback(i),alertDialog.destroy(),alertDialog=inputEl=buttonEl=null}})}),footerEl.append(buttonEl)},i=0;i<buttonLabels.length;i++)createButton(i);cancelable&&(alertDialog.setCancelable(cancelable),alertDialog.on("cancel",function(){promptDialog?callback(null):callback(-1),setTimeout(function(){alertDialog.destroy(),alertDialog=null,inputEl=null})})),alertDialog.show({callback:function(){promptDialog&&autofocus&&inputEl[0].focus()}}),dialogEl=titleEl=messageEl=footerEl=null};return{alert:function(options){var defaults={buttonLabel:"OK",animation:"default",title:"Alert",callback:function(){}};if(options=angular.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Alert dialog must contain a message.");createAlertDialog(options.title,options.message||options.messageHTML,[options.buttonLabel],0,options.modifier,options.animation,options.callback,options.message?!1:!0,!1,!1,!1)},confirm:function(options){var defaults={buttonLabels:["Cancel","OK"],primaryButtonIndex:1,animation:"default",title:"Confirm",callback:function(){},cancelable:!1};if(options=angular.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Confirm dialog must contain a message.");createAlertDialog(options.title,options.message||options.messageHTML,options.buttonLabels,options.primaryButtonIndex,options.modifier,options.animation,options.callback,options.message?!1:!0,options.cancelable,!1,!1)},prompt:function(options){var defaults={buttonLabel:"OK",animation:"default",title:"Alert",placeholder:"",callback:function(){},cancelable:!1,autofocus:!0};if(options=angular.extend({},defaults,options),!options.message&&!options.messageHTML)throw new Error("Prompt dialog must contain a message.");createAlertDialog(options.title,options.message||options.messageHTML,[options.buttonLabel],0,options.modifier,options.animation,options.callback,options.message?!1:!0,options.cancelable,!0,options.autofocus,options.placeholder)}}}(),window.ons.orientation=function(){function create(){var obj={_isPortrait:!1,isPortrait:function(){return this._isPortrait()},isLandscape:function(){return!this.isPortrait()},_init:function(){return document.addEventListener("DOMContentLoaded",this._onDOMContentLoaded.bind(this),!1),"orientation"in window?window.addEventListener("orientationchange",this._onOrientationChange.bind(this),!1):window.addEventListener("resize",this._onResize.bind(this),!1),this._isPortrait=function(){return window.innerHeight>window.innerWidth},this},_onDOMContentLoaded:function(){this._installIsPortraitImplementation(),this.emit("change",{isPortrait:this.isPortrait()})},_installIsPortraitImplementation:function(){var isPortrait=window.innerWidth<window.innerHeight;this._isPortrait="orientation"in window?window.orientation%180===0?function(){return 0===Math.abs(window.orientation%180)?isPortrait:!isPortrait}:function(){return 90===Math.abs(window.orientation%180)?isPortrait:!isPortrait}:function(){return window.innerHeight>window.innerWidth}},_onOrientationChange:function(){var isPortrait=this._isPortrait(),nIter=0,interval=setInterval(function(){nIter++;var w=window.innerWidth,h=window.innerHeight;isPortrait&&h>=w||!isPortrait&&w>=h?(this.emit("change",{isPortrait:isPortrait}),clearInterval(interval)):50===nIter&&(this.emit("change",{isPortrait:isPortrait}),clearInterval(interval))}.bind(this),20)},_onResize:function(){this.emit("change",{isPortrait:this.isPortrait()})}};return MicroEvent.mixin(obj),obj}return create()._init()}(),function(){"use strict";window.ons.platform={isWebView:function(){return ons.isWebView()},isIOS:function(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)},isAndroid:function(){return/Android/i.test(navigator.userAgent)},isIPhone:function(){return/iPhone/i.test(navigator.userAgent)},isIPad:function(){return/iPad/i.test(navigator.userAgent)},isBlackBerry:function(){return/BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent)},isOpera:function(){return!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0},isFirefox:function(){return"undefined"!=typeof InstallTrigger},isSafari:function(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0},isChrome:function(){return!!window.chrome&&!(window.opera||navigator.userAgent.indexOf(" OPR/")>=0)},isIE:function(){return!1||!!document.documentMode},isIOS7above:function(){if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){var ver=(navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)||[""])[0].replace(/_/g,".");return parseInt(ver.split(".")[0])>=7}return!1}}}(),function(){"use strict";window.addEventListener("load",function(){FastClick.attach(document.body)},!1),(new Viewport).setup(),Modernizr.testStyles("#modernizr { -webkit-overflow-scrolling:touch }",function(elem){Modernizr.addTest("overflowtouch",window.getComputedStyle&&"touch"==window.getComputedStyle(elem).getPropertyValue("-webkit-overflow-scrolling"))}),window.jQuery&&angular.element===window.jQuery&&console.warn("Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.")}(),function(){"use strict";angular.module("onsen").run(["$templateCache",function($templateCache){for(var templates=window.document.querySelectorAll('script[type="text/ons-template"]'),i=0;i<templates.length;i++){var template=angular.element(templates[i]),id=template.attr("id");"string"==typeof id&&$templateCache.put(id,template.text())}}])}();
/*** <End:monaca-onsenui LoadJs:"components/monaca-onsenui/js/onsenui_all.min.js"> ***/
/*** <End:monaca-onsenui> ***/

/*** <Start:monaca-jquery> ***/
/*** <Start:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );

/*** <End:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*** <End:monaca-jquery> ***/












