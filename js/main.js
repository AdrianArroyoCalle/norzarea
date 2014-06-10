var gamejs = require('gamejs');
var view = require('./view');
var mixer = require("gamejs/mixer");
var sprite = require("gamejs/sprite");
var event = require("gamejs/event");
var director = require("./director");
var start = require("./scenes/start");

gamejs.preload(["./img/tv.png","./img/start.png","./img/DawnHack/Items/Books.png","./img/DawnHack/Objects/Pits0.png","./img/DawnHack/Items/Potions.png","./img/DawnHack/Items/Money.png","./img/DawnHack/Objects/Foliage.png","./img/DawnHack/Characters/Player0.png","./img/DawnHack/Characters/Felines0.png","./img/DawnHack/Items/ShortWeapons.png",'./img/DawnHack/Objects/Walls.png',"./img/DawnHack/Objects/Floors.png","./img/DawnHack/Objects/Tiles.png","./img/DawnHack/Objects/Furniture0.png","./img/DawnHack/Objects/Effects0.png","./img/DawnHack/GUI/GUI0.png",'./img/DawnHack/Objects/Mountains1.png',"./img/DawnHack/Items/Keys.png","./img/DawnHack/Characters/Insects0.png","./img/DawnHack/Characters/Humanoids0.png","./img/space.jpg"]);

gamejs.ready(function() {
	//var sound=new mixer.Sound("./music/MA_VLAST.ogg");
	//sound.play(true);
	/* Sound system */
	/* Initialization */
	if(parseInt(localStorage.audio)==1)
	{
		var audioList=["./music/MA_VLAST.ogg","./music/DVORAK.ogg","./music/BEETHOVEN.ogg"];
		var audioTrack=0;
		var sound=new Audio();
		sound.src=audioList[audioTrack];
		sound.play();
		sound.addEventListener("ended",function(){
			audioTrack++;
			if(audioTrack==3)
				audioTrack=0;
			sound.src=audioList[audioTrack];
			sound.play();
		});
	}
   gamejs.display.setCaption('Norzarea');
   var gjsCanvas=document.getElementById("gjs-canvas");
   gjsCanvas.style.position="absolute";
   gjsCanvas.style.left="0px";
   gjsCanvas.style.top="0px";
   gjsCanvas.style.width=window.innerWidth+"px";
   gjsCanvas.style.height=window.innerHeight+"px";
   var display = gamejs.display.setMode([800, 400],gamejs.display.POINTERLOCK);
   //var display = gamejs.display.getSurface();
   var dir=new director.Director();
   var scene=new start.StartScene(dir);
   dir.start(scene);
	
   /* Events for every object */
   gamejs.onEvent(function(event) {
		dir.handleEvent(event);
   });
	/* Update and render */
   gamejs.onTick(function(msDuration) {
		dir.update(msDuration);
		dir.draw(display);
   });

   	if("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
	{
GameController.init( { 
    left: {
        position: { left: '25%', bottom: '25%' }, 
        dpad: { 
            up: {width: "15%", height: "15%", touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "UP"
				});
			}}, 
            down: {width: "15%", height: "15%", touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "DOWN"
				});
			}}, 
            left: { width: '15%', height: '15%', touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "LEFT"
				});
			} }, 
            right: { width: '15%', height: '15%', touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "RIGHT"
				});
			} } 
        } 
    }, 
    right: {
		type: "buttons",
		position: { right: "15%", bottom: "25%"},
		buttons: [{
			label: "ATTACK",
			fontSize: 13,
			touchStart: function(){
				event._CALLBACK.trigger({
					type: "TOUCH",
					key: "SPACE"
				});
			}
		},false,false,false]
	}
} );
	}
});
