var images = [];

// This function is fired when the Flickr API is loaded.
function jsonFlickrFeed(result) {
    for (var j in result.items) {
        var img = result.items[j].media.m;
        images.push(img);
    }
    
    // display next photo every 1 second
    setTimeout(displayPicture, 1000);
}

//Display the retrieved photos from Flickr as a slide show
function displayPicture() {
    $("#container").css("visibility", "hidden");
    var $ul = $("<ul>");
    
    for(var j in images) {
        var srcUrl = images[j];
        li = '<li><img src="' + srcUrl + '" id ="list" width="60%"  /></li>';
        $ul.append($(li));
    }
    
    $("#container").append($ul);
    //Setting for photo sliding animation
    $ul.bxSlider({
        auto: true,
        pager: false,
        speed: 500,
        pause: 1800,
        controls: false,
    });
    
    $("#loadSpinner").remove();
    $("#container img").addClass("shadow");
    
    setTimeout(function() {
        $("#container").css("visibility", "visible");
    }, 1000);
}