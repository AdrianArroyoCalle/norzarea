var gamejs = require('gamejs');
var view = require('../view');
var sprite = require("gamejs/sprite");
var history = require("../history");
var spritesheet = require("../spritesheet");
var collision = require("../collision");
var text = require("../text");
var ratasillo = require("./ratasillo");

var CityScene = exports.CityScene = function(director)
{
	localStorage.progress="2";
	var sceneProgress={
		talkWithGenie: false,
		isClosed: false,
		talkWithPablo: false,
		talkWithAlguno: false,
		talkWithThomas: false,
		talkWithTonti: false,
		haveKey: false,
		persecution: 0,
		persecutionPos: [[24,2],[23,2],[22,2],[22,3],[22,4],[21,4],[20,4],[20,5],[20,6],[20,7],[20,8],[20,9],[20,10],[19,10],[18,10],[17,10],[16,10],[15,10],[15,9],[15,8],[16,8],[17,8],[17,7],[16,7],[15,7],[14,7],[13,7],[13,8],[14,8]],
		lastMovement: gamejs.event.K_LEFT
	};
	var his=new history.History(50,50);
	/* History */
	his.register(14,10,function(){
		new text.TextSurface(["generic.cartel","city.king","city.kingTimetables"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			new text.TextSurface(["generic.void"],characters.get(0),"characters.vadrix").put(director,2000);
		});
	});
	his.register(23,10,function(){
		new text.TextSurface(["generic.cartel","city.biblio"],characters.get(0),"characters.vadrix").put(director,2000,function(){
		
		});
	});
	his.register(29,10,function(){
		new text.TextSurface(["generic.cartel","city.taberna"],characters.get(0),"characters.vadrix").put(director,2000,function(){
		
		});
	});
	his.register(37,9,function(){
		new text.TextSurface(["generic.cartel","city.monasterio"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			new text.TextSurface(["city.circulos"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			
			});
		});
	});
	his.register(18,4,function(){
		new text.TextSurface(["generic.cartel","city.electric"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			
		});
	});
	/* Puerta cerrada */
	his.register(20,3,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["city.pegando"],characters.get(0),"characters.vadrix").put(director,2500,function(){
			
			});
		}else if(sceneProgress.isClosed===false){
			new text.TextSurface(["generic.closed"],characters.get(0),"characters.vadrix").put(director,2500,function(){
				sceneProgress.isClosed=true;
			});
		}else if(sceneProgress.haveKey===true)
		{
			new text.TextSurface(["city.open"],characters.get(0),"characters.vadrix").put(director,3500,function(){
				//LOAD NEW SCENE
				director.replaceScene(new ratasillo.RatasilloScene(director));
			});
		}
	});
	/* Puerta cerrada */
	his.register(40,4,function(){
		new text.TextSurface(["city.secretDoor"],characters.get(0),"characters.vadrix").put(director,2500,function(){
		
		});
	});
	/* Mystic genie */
	his.register(29,2,function(){
		if(!sceneProgress.talkWithGenie)
		{
			new text.TextSurface(["city.genieAppears"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
				new text.TextSurface(["city.vadrixAskGenie0"],characters.get(0),"characters.vadrix").put(director,3000,function(){
					new text.TextSurface(["city.genieResponse0"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
						new text.TextSurface(["city.vadrixAskGenie"],characters.get(0),"characters.vadrix").put(director,3000,function(){
							new text.TextSurface(["city.genieResponse"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
								new text.TextSurface(["city.vadrixAskGenie2"],characters.get(0),"characters.vadrix").put(director,3000,function(){
									new text.TextSurface(["city.genieResponse2"],characters.get(17),"characters.amatulfo").put(director,3000,function(){
										new text.TextSurface(["city.vadrixAskGenie3"],characters.get(0),"characters.vadrix").put(director,3000,function(){
											new text.TextSurface(["city.genieResponse3","city.genieResponse3b","city.genieResponse3c"],characters.get(17),"characters.amatulfo").put(director,6000,function(){
												new text.TextSurface(["city.vadrixAskGenie4"],characters.get(0),"characters.vadrix").put(director,3000,function(){
													new text.TextSurface(["city.genieResponse4","city.genieResponse4b"],characters.get(17),"characters.amatulfo").put(director,4000,function(){
														sceneProgress.talkWithGenie=true;
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		}else{
			new text.TextSurface(["city.genieWelcomeBack","city.genieWelcomeBack2"],characters.get(17),"characters.amatulfo").put(director,4000,function(){
				var money=parseInt(localStorage.money);
				if(money>=50)
				{
					money-=50;
					localStorage.money=money+"";
					var random=Math.floor(Math.random() * 6) +1;
					var phrase="city.geniePhrase"+random;
					new text.TextSurface([phrase],characters.get(17),"characters.amatulfo").put(director,5000,function(){
						new text.TextSurface(["generic.correct"],characters.get(0),"characters.vadrix").put(director,2500,function(){
						
						});
					});
				}else{
					new text.TextSurface(["generic.notEnough"],characters.get(17),"characters.amatulfo").put(director,2500,function(){
					
					});
				}
				
			});
		}
	});
	/* Monje Raul */
	his.register(40,10,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["city.meHasPegado","city.excomulgation"],players.get(41),"characters.raul").put(director,3500,function(){
			
			});
		}else{
			new text.TextSurface(["city.raul0","city.raul1","city.raul2"],players.get(41),"characters.raul").put(director,5000,function(){
				new text.TextSurface(["city.vadrixRaul0"],characters.get(0),"characters.vadrix").put(director,3500,function(){
					new text.TextSurface(["city.raul3","city.raul4","city.raul5"],players.get(41),"characters.raul").put(director,5000,function(){
					
					});
				});
			});
		}
	});
	/* Tonti Tontito */
	his.register(24,2,function(data){
		if(data.type=="attack" && sceneProgress.persecution==0)
		{
			new text.TextSurface(["city.meHasPegado"],characters.get(45),"characters.tonti").put(director,2500,function(){
				new text.TextSurface(["city.sorry"],characters.get(0),"characters.vadrix").put(director,2500,function(){
					new text.TextSurface(["city.nplogasto"],characters.get(45),"characters.tonti").put(director,2500,function(){
					
					});
				});
			});
		}else{
			if(sceneProgress.talkWithThomas===true){
				new text.TextSurface(["city.vadrixTonti0"],characters.get(0),"characters.vadrix").put(director,3000,function(){
					var id=setInterval(function(){
						tonti.rect=new gamejs.Rect([sceneProgress.persecutionPos[sceneProgress.persecution][0]*16,sceneProgress.persecutionPos[sceneProgress.persecution][1]*16],[16,16]);
						sceneProgress.persecution++;
						if(sceneProgress.persecution>4)
						{
						clearInterval(id);
						}
					},1000);
					new text.TextSurface(["city.tonti0","city.tonti1"],characters.get(45),"characters.tonti").put(director,5000,function(){
						his.unregister(24,2);
						his.register(22,4,function(){
							var id2=setInterval(function(){
								his.unregister(sceneProgress.persecutionPos[sceneProgress.persecution-1][0],sceneProgress.persecutionPos[sceneProgress.persecution-1][1]);
								tonti.rect=new gamejs.Rect([sceneProgress.persecutionPos[sceneProgress.persecution][0]*16,sceneProgress.persecutionPos[sceneProgress.persecution][1]*16],[16,16]);
								his.register(sceneProgress.persecutionPos[sceneProgress.persecution][0],sceneProgress.persecutionPos[sceneProgress.persecution][1],function(){
									clearInterval(id2);
									new text.TextSurface(["city.tonti3"],characters.get(45),"characters.tonti").put(director,3500,function(){
										sceneProgress.talkWithTonti=true;
										new text.TextSurface(["city.vadrixTonti1"],characters.get(0),"characters.vadrix").put(director,3500,function(){
											new text.TextSurface(["city.tonti4","city.tonti5"],characters.get(45),"characters.tonti").put(director,4500,function(){
											
											});
										});
									});
								});
								sceneProgress.persecution++;
								if(sceneProgress.persecution>28)
								{
									sceneProgress.persecution=19;
								}
							},250);
							new text.TextSurface(["city.tonti2"],characters.get(45),"characters.tonti").put(director,3500,function(){
							});
						});
					});
				});
			}else if(sceneProgress.persecution==0){
				new text.TextSurface(["city.nplogasto"],characters.get(45),"characters.tonti").put(director,3500,function(){

				});
			}
		}
	});
	/* Tabernero Pablo */
	his.register(29,6,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["city.meHasPegado"],characters.get(8),"characters.pablo").put(director,2500,function(){
				new text.TextSurface(["city.sorry"],characters.get(0),"characters.vadrix").put(director,2500,function(){

				});
			});
		}else{
			new text.TextSurface(["city.pablo0","city.pablo1","city.pablo2"],characters.get(8),"characters.pablo").put(director,5500,function(){
				if(sceneProgress.isClosed==true && sceneProgress.talkWithAlguno==false)
				{
					new text.TextSurface(["city.vadrixPablo0"],characters.get(0),"characters.vadrix").put(director,3000,function(){
						new text.TextSurface(["city.pablo3","city.pablo4","city.pablo5"],characters.get(8),"characters.pablo").put(director,5500,function(){
							sceneProgress.talkWithPablo=true;
						});
					});
				}
			});
		}
	});
	/* Alguno */
	his.register(24,7,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["city.meHasPegado"],players.get(8),"characters.alguno").put(director,2500,function(){
				new text.TextSurface(["city.sorry"],characters.get(0),"characters.vadrix").put(director,2500,function(){

				});
			});
		}else{
			if(sceneProgress.talkWithPablo==true && sceneProgress.talkWithThomas==false)
			{
				new text.TextSurface(["city.alguno0","city.alguno1"],players.get(8),"characters.alguno").put(director,4500,function(){
					new text.TextSurface(["city.vadrixAlguno0","city.vadrixAlguno1"],characters.get(0),"characters.vadrix").put(director,4500,function(){
						new text.TextSurface(["city.alguno2","city.alguno3"],players.get(8),"characters.alguno").put(director,4500,function(){
							sceneProgress.talkWithAlguno=true;
						});
					});
				});
			}
		}
	});
	/* Moje Thomas */
	his.register(46,6,function(data){
		if(data.type=="attack")
		{
			new text.TextSurface(["city.meHasPegado"],players.get(31),"characters.thomas").put(director,2500,function(){
				new text.TextSurface(["city.sorry"],characters.get(0),"characters.vadrix").put(director,2500,function(){

				});
			});
		}else{
			if(sceneProgress.talkWithAlguno==true && sceneProgress.talkWithTonti==false)
			{
				new text.TextSurface(["city.thomas0","city.thomas1","city.thomas2"],players.get(31),"characters.thomas").put(director,5500,function(){
					new text.TextSurface(["city.vadrixThomas0","city.vadrixThomas1","city.vadrixThomas2"],characters.get(0),"characters.vadrix").put(director,5500,function(){
						new text.TextSurface(["city.thomas3","city.thomas4","city.thomas5"],players.get(31),"characters.thomas").put(director,5500,function(){
							sceneProgress.talkWithThomas=true;
						});
					});
				});
			}
		
		}
	});
	/* Jarron */
	his.register(28,2,function(data){
		if(data.type=="attack" && sceneProgress.talkWithTonti===true && sceneProgress.haveKey===false)
		{
			people.remove(jarron);
			new text.TextSurface(["generic.obtained","city.key0"],keys.get(0),"characters.object").put(director,4500,function(){
				sceneProgress.haveKey=true;
				new text.TextSurface(["city.goToWall"],characters.get(0),"characters.vadrix").put(director,2500,function(){
					
				});
			});
		}
	});
	/* SpriteSheets */
	var characters=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Humanoids0.png",{width: 16, height: 16});
	var effectsImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Effects0.png",{width: 16, height: 16});
	var moneyImage=new spritesheet.SpriteSheet("./img/DawnHack/Items/Money.png",{width: 16, height: 16});
	var players=new spritesheet.SpriteSheet("./img/DawnHack/Characters/Player0.png",{width: 16, height: 16});
	var furnitureImage=new spritesheet.SpriteSheet("./img/DawnHack/Objects/Furniture0.png",{width: 16, height: 16});
	var keys=new spritesheet.SpriteSheet("./img/DawnHack/Items/Keys.png",{width: 16, height: 16});
	
	var vadrix=new sprite.Sprite();
	vadrix.xpos=0;
	vadrix.ypos=10;
	vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	vadrix.image=characters.get(0);
	vadrix.update=function(){
		vadrix.rect=new gamejs.Rect([vadrix.xpos*16,vadrix.ypos*16],[16,16]);
	}
	
	var weapons=new sprite.Group();
	var effects=new sprite.Group();
	var furniture=new sprite.Group();
	var people=new sprite.Group();
	
	var pablo=new sprite.Sprite();
	pablo.rect=new gamejs.Rect([29*16,6*16],[16,16]);
	pablo.image=characters.get(8);
	people.add(pablo);
	
	var tonti=new sprite.Sprite();
	tonti.rect=new gamejs.Rect([24*16,2*16],[16,16]);
	tonti.image=characters.get(45);
	people.add(tonti);
	
	var monjeThomas=new sprite.Sprite();
	monjeThomas.rect=new gamejs.Rect([46*16,6*16],[16,16]);
	monjeThomas.image=players.get(31);
	people.add(monjeThomas);
	
	var monjeRaul=new sprite.Sprite();
	monjeRaul.rect=new gamejs.Rect([40*16,10*16],[16,16]);
	monjeRaul.image=players.get(41);
	people.add(monjeRaul);
	
	var alguno=new sprite.Sprite();
	alguno.rect=new gamejs.Rect([24*16,7*16],[16,16]);
	alguno.image=players.get(8);
	people.add(alguno);
	
	var jarron=new sprite.Sprite();
	jarron.rect=new gamejs.Rect([28*16,2*16],[16,16]);
	jarron.image=furnitureImage.get(7);
	furniture.add(jarron);
	
	/* TMX Map */
	var map = new view.Map('./maps/city.tmx');
	var coll=new collision.CollisionMap(map.getMap());
	
	this.handleEvent= function(event)
	{
		map.handle(event);
		if (!director.isShowingText() && event.type === gamejs.event.KEY_DOWN || event.type == "TOUCH") {
			//DO THINGS BUT TEXT BLOCKS EVENTS
			var tempX=vadrix.xpos, tempY=vadrix.ypos;
			if (event.key === gamejs.event.K_LEFT || event.key == "LEFT") {
				tempX --;
				sceneProgress.lastMovement=gamejs.event.K_LEFT;
			} else if (event.key === gamejs.event.K_RIGHT || event.key == "RIGHT") {
				tempX ++;
				sceneProgress.lastMovement=gamejs.event.K_RIGHT;
			} else if (event.key === gamejs.event.K_DOWN || event.key == "DOWN") {
				tempY ++;
				sceneProgress.lastMovement=gamejs.event.K_DOWN;
			}else if (event.key === gamejs.event.K_UP || event.key == "UP") {
				tempY --;
				sceneProgress.lastMovement=gamejs.event.K_UP;
			}
			if(event.key === gamejs.event.K_SPACE || event.key == "SPACE")
			{
				var weaponEffect=new sprite.Sprite();
				var newX = vadrix.xpos, newY = vadrix.ypos;
				if(sceneProgress.lastMovement===gamejs.event.K_LEFT)
					newX-=1;
				else if(sceneProgress.lastMovement===gamejs.event.K_RIGHT)
					newX+=1;
				else if(sceneProgress.lastMovement===gamejs.event.K_DOWN)
					newY+=1
				else if(sceneProgress.lastMovement===gamejs.event.K_UP)
					newY-=1;
				weaponEffect.rect=new gamejs.Rect([newX*16,newY*16],[16,16]);	
				weaponEffect.image=effectsImage.get(18);
				effects.add(weaponEffect);
				if(his.has(newX,newY))
				{
					his.execute(newX,newY,{type: "attack"});
				}
				setTimeout(function(){
					effects.remove(weaponEffect);
				},250);
			}
			if(coll.moveTest([vadrix.xpos, vadrix.ypos],[tempX, tempY]))
			{
				vadrix.xpos=tempX;
				vadrix.ypos=tempY;
			}
			if(his.has(vadrix.xpos, vadrix.ypos))
			{
				his.execute(vadrix.xpos, vadrix.ypos, {type: "talk"});
			}
      }
	}
	this.update=function(msDuration)
	{
		vadrix.update();
		map.update(msDuration);
	}
	this.draw=function(display)
	{
		display.clear();
		map.draw(display);
		weapons.draw(display);
		furniture.draw(display);
		effects.draw(display);
		people.draw(display);
		vadrix.draw(display);
	}
	return this;
}