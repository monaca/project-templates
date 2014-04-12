
window.APP_KEY = "";
window.CLIENT_KEY = "";

NCMB.initialize(APP_KEY, CLIENT_KEY);

$(function() {
    tappable('.tappable', {
        allowClick : true,
        activeClass : 'tap-active',
        onTap : function(e, dom) {
            // trigger a DOM Event manually
            var event = document.createEvent("HTMLEvents");
            event.initEvent('tappable-tap', true, true);
            dom.dispatchEvent(event);
        }
    });
});


function showSpinner(dom) {
    var opts = {
        lines: 11, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 11, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#999', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };

    dom = dom || (function() {
        var screenDom = $('<div class="screen"></div>');
        screenDom.appendTo(document.body);
        return screenDom[0];
    })();

    if (!window.spinner) {
        window.spinner = new Spinner(opts).spin(dom);
    }
}

function hideSpinner() {
    if (window.spinner) {
        window.spinner.stop();
        window.spinner = null;
    }
}
