function onedigit(i) {
    return ("" + i).slice(-1);
}

// (6) Function to obtain the tenth number
function tendigit(i) {
    var str = "0" + i;
    return str.slice(-2, str.length - 1);
}

// (8) Function to obtain the day of the week
function renderDay(i) {
    return ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'][i];
}

// (8) Function to obtain the month
function renderMonth(i) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'][i];
}

// (2) Function that is called every second
function clock() {
    // (3) Obtain "figure" class(image of the number)
    var figures = document.getElementsByClassName('figure');
    // (4) Obtain the "date" ID (Date display area)
    var date = document.getElementById('date');

    // (5) Obtain the current time
    var now = new Date();

    // (6) Set the digits for the hours
    figures[0].src = 'images/figure-' + tendigit(now.getHours()) + '.png';
    figures[1].src = 'images/figure-' + onedigit(now.getHours()) + '.png';

    // (7) Set the digits for the minutes
    figures[2].src = 'images/figure-' + tendigit(now.getMinutes()) + '.png';
    figures[3].src = 'images/figure-' + onedigit(now.getMinutes()) + '.png';

    // (7) Set the digits for the seconds
    figures[4].src = 'images/figure-' + tendigit(now.getSeconds()) + '.png';
    figures[5].src = 'images/figure-' + onedigit(now.getSeconds()) + '.png';

    // (8) Display the date
    date.textContent = renderDay(now.getDay()) + ", " + renderMonth(now.getMonth()) + " " + now.getDate() + ", " + now.getFullYear();
}

// (1) Program that is executed when the app is started
setInterval(clock, 1000);