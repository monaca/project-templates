enchant();

function callinit() {
    if(getUa() === false) init();
    else document.addEventListener("deviceready", init, false);
}

var SETTINGS_GRAVITY = 0.18,
    SETTINGS_FPS = 30,
    SETTINGS_BOUND_X = 0.16,
    SETTINGS_BOUND_Y = 1.1,
    SETTINGS_ACCELEROMETER_RELOAD_FREQ = 150,
    SETTINGS_PADDLE_ACCEL = 2.8,
    SETTINGS_INJECTION_SPEED = 13,
    SETTINGS_FONT = '18px/1.2 vt',
    SETTINGS_POINT = 1000,
    SETTINGS_POINT_SILVER = 200,
    SETTINGS_POINT_GOLD = 3000000;

var game = null,
    ball = null,
    paddle = null,
    scoreLabel = null,
    accelerationWatch = null,
    accelText = '0';

var imgPath = {
    'ball' : 'img/ball.png',
    'paddle' : 'img/paddle.png',
    'block_red' : 'img/block_red.png',
    'block_green' : 'img/block_green.png',
    'block_blue' : 'img/block_blue.png',
    'block_silver' : 'img/block_silver.png',
    'block_gold' : 'img/block_gold.png'
};

Monacanoid = Class.create(Core,{
    block: null,
    
    initialize: function() {
        var self = this;
        
        this.screenSize = {
            width: 320,
            height: 480,
            zoom: 1
        };
    
        // Set screen size
        if (getUa() == 'iPhone') {
            this.screenSize.height = window.screen.height - 108; 
        } else if(getUa() == 'iPad') {
            this.screenSize.height = 382;
        } else if(getUa() == 'Android') {
            this.screenSize.zoom = screen.availWidth / this.screenSize.width;
            this.screenSize.height = screen.availHeight ? ~~((screen.availHeight - 76*4) / this.screenSize.zoom) : 420;
        } else this.screenSize.height = 480;

        // Accelerometer
        if (typeof(navigator.accelerometer) !== 'undefined') {
            if (accelerationWatch !== null) {
                navigator.accelerometer.clearWatch(accelerationWatch);
                updateAcceleration({
                    x : "",
                    y : "",
                    z : ""
                });
                accelerationWatch = null;
            } else {
                var options = {};
                options.frequency = SETTINGS_ACCELEROMETER_RELOAD_FREQ;
                accelerationWatch = navigator.accelerometer.watchAcceleration(
                        self.updateAcceleration, function(ex) {
                            alert("accel fail (" + ex.name + ": " + ex.message + ")");
                        }, options);
            }
        }
    
        Core.call(this,this.screenSize.width,this.screenSize.height);
    },

    updateAcceleration: function(a) {
        var self = this.game,
            ac = a.x.toFixed(2);
            
        if(a.x > 0) accelText = '+' + String(ac);
        else accelText = String(ac);

        // Use parameter x to move paddle
        if (paddle !== null) {
          if (paddle.accel / ac > 2.0) {
            ;
          } else if (paddle.accel / ac > 0) {
            paddle.accel += ac * SETTINGS_PADDLE_ACCEL;
          } else {
            paddle.accel = ac * SETTINGS_PADDLE_ACCEL;
          }
        }
        self.updateScoreLabel();
    },
    
    updateScoreLabel: function() {
        if (scoreLabel !== null) scoreLabel.text = accelText + '               ' + game.score;
    },

    setMap: function() {
        var numBlock,blockMap;
        // Delete all existing blocks
        if(this.block !== null) {
            for(i = 0, numBlock = this.block.length; i < numBlock; i++) {
                this.rootScene.removeChild(game.block[i]);
            }
            this.block.length = 0;
        }
        
        if(typeof(blockMap) !== 'undefined') blockMap.length = 0;
        blockMap = [
            [null,      null,       null,       null,       null,       'blue',     null,       null,       null,       null],
            [null,      null,       null,       null,       'red',      'red',      'blue',     null,       null,       null],
            [null,      null,       null,       'red',      'red',      null,       null,       'blue',     null,       null],
            [null,      null,       'red',      'red',      null,       null,       null,       null,       'blue',     null],    
            [null,      'red',      'red',      null,       null,       'gold',     null,       null,       'silver',   'silver'],    
            [null,      null,       'red',      'red',       null,       null,       null,       'silver',   'silver',   null],    
            [null,      null,       null,       'red',      'red',       null,       'silver',   'silver',   null,       null],    
            [null,      null,       null,       null,       'silver',   'silver',   'silver',   null,       null,       null],
            [null,      null,       null,       null,       null,       'silver',   null,       null,       null,       null]
        ];
        
        this.block = [];
        numBlock = 0;
        for(j = 0; j < blockMap.length; j++) {
            for(i = 0; i < blockMap[j].length; i++) {
                if(blockMap[j][i] !== null) {
                    this.block[numBlock] = new Block(30*i, 36+(12*j), blockMap[j][i]);
                    this.rootScene.addChild(this.block[numBlock]);
                    numBlock++;
                }
            }
        }
    },
    defeatBlock : function(num) {
        this.rootScene.removeChild(game.block[num]);
        if(this.block[num].color === 'gold') this.score += SETTINGS_POINT_GOLD;
        if(this.block[num].color === 'silver') this.score += SETTINGS_POINT_SILVER;
        else this.score += SETTINGS_POINT;
        this.updateScoreLabel();
        game.block.splice(num,1); 
    },
    clear: function() {
        setTimeout(function() {
            if(typeof(navigator.notification) !== 'undefined') navigator.notification.alert("Cleared!", function(){}, "Congraturations");
            else alert("Cleared!");
            game.end("Cleared!");
            game.stop();
        }, 100);               
    }
});


function reset() {
    game.pause();
    game.setMap();
    game.score = 0;
    scoreLabel.text = '0';
    ball.reset();
    paddle.reset();
    game.resume();
}

function init() {    
    game = new Monacanoid();
    game.fps = SETTINGS_FPS;
    game.rootScene.backgroundColor = 'black';
    game.scale = 1;
    game.score = 0;
    
    
    for(var i in imgPath) {
        game.preload(imgPath[i]);
    }

    $("#enchant-stage > div").css('-webkit-transform','none');
    
    game.onload = function(){
        //Header, display the score and so on 
        var label = new Label("ACCEL            SCORE");
        label.font = SETTINGS_FONT;
        label.color = "red";
        label.x = 30;
        label.y = 5;
        game.rootScene.addChild(label);

        //Label for the score
        scoreLabel = new Label("0");
        scoreLabel.font = SETTINGS_FONT;
        scoreLabel.color = "white";
        scoreLabel.textAlign = "left";
        scoreLabel.x = 80;
        scoreLabel.y = 5;
        scoreLabel.width = 240;
        game.rootScene.addChild(scoreLabel);
        
        ball = new Ball();
        game.rootScene.addChild(ball);

        paddle = new Paddle();
        game.rootScene.addChild(paddle);
        
        game.setMap();
        
        // Stick the ball on the paddle...
        game.rootScene.addEventListener(Event.TOUCH_START,function() {
            if(ball.within(paddle, paddle.width * 0.5 + 10)) {
                ball.x = paddle.x + paddle.width*0.5;
                ball.y = paddle.y - paddle.height;
                ball.isSticked = true;
            }
        });
        
        // ...and launch it
        game.rootScene.addEventListener(Event.TOUCH_END,function() {
            if(ball.isSticked == 1) {
                ball.delta.y = SETTINGS_INJECTION_SPEED * -1;
                ball.delta.x = -1 * paddle.accel;
                ball.isSticked = false;
            }   
        });
        
        // Main loop
        game.rootScene.addEventListener(Event.ENTER_FRAME,function() {

            //the paddle
            paddle.x -= paddle.accel;
            if (paddle.x < 0) {
                paddle.accel = 0;
                paddle.x = 0;
            } else if (paddle.x + paddle.width > game.screenSize.width) {
                paddle.accel = 0;
                paddle.x = game.screenSize.width - paddle.width; 
            }
            if(ball.isSticked) ball.x = paddle.x + paddle.width*0.5;
            else {
                ball.x += ball.delta.x;
                if (ball.x + ball.width > game.screenSize.width || ball.x < 0) {
                    ball.delta.x *= -1;
                    // ball.x = game.screenSize.width - (ball.x + ball.width); // make loop
                }
                ball.delta.y += SETTINGS_GRAVITY;
                ball.y += ball.delta.y;
                if (ball.y < 0) {
                    ball.y = 0;
                    ball.delta.y *= -1;
                } else if (ball.y > game.screenSize.height - ball.height) {
                    vibrate();
                    game.stop();
                }
            }           
            if(paddle.intersect(ball)) {
                ball.delta.x += -1 * SETTINGS_BOUND_X * (((paddle.x + paddle.width) - ball.x) - (paddle.width * 0.5));
                ball.delta.y *= -1 * SETTINGS_BOUND_Y;
            }
            //Hit Detection
            for(i = 0; i < game.block.length; i++) {
                if(ball.intersect(game.block[i])) {
                    game.defeatBlock(i);
                    i--;
                    ball.delta.y *= -1;     
                    if(game.block.length === 0) {
                        game.clear();
                    }
                }
            }
        });
    };

    game.start();
}


// Classes
Ball = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this,10,10);    
        this.image = game.assets[imgPath.ball];
        this.frame = 0;
        this.isSticked = false; 
        this.reset();
    },
    reset: function() {
        this.x = game.screenSize.width * 0.5;
        this.y = game.screenSize.height * 0.5;
        this.isSticked = false;
        this.delta = {
            'x' : Math.random() - 0.5,
            'y' : -3.8 
        };
    }
});

Paddle = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this,60,10);    
        this.image = game.assets[imgPath.paddle];
        this.x = game.screenSize.width * 0.4;
        this.y = game.screenSize.height * 0.94;
        this.frame = 0;
        this.accel = 0;
    },
    reset: function() {
        this.x = game.screenSize.width * 0.4;
        this.y = game.screenSize.height * 0.94;
        this.accel = 0;
    }
});

Block = Class.create(Sprite, {
    initialize: function(x, y, color) {
        this.color = color || 'green'; 
        Sprite.call(this,30,12);
        this.image = game.assets[imgPath['block_' + color]];
        this.x = x;
        this.y = y;
        this.frame = 0;
    }
});


// Public functions
function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
}


function vibrate() {
    if(typeof(navigator.notification) !== 'undefined') navigator.notification.vibrate(500);
}

function getUa() {
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ) {
        return 'iPhone'; 
    } else if(navigator.userAgent.indexOf('iPad') > 0) {
        return 'iPad';
    } else if(navigator.userAgent.indexOf('Android') > 0) {
        return 'Android';
    } else return false;
}
