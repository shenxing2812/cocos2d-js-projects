var GameBackLayer = cc.Layer.extend({
	sprite:null,
	mapWidth:null,
	map00:null,
	map01:null,
	mapIndex:null,
	space:null,
	spriteSheet:null,
	objects:[],
	ctor:function (space) {
		this.space = space;
		this.objects = [];
		this._super();
		
		
//		var size = cc.winSize;
//		var centerP = cc.p(size.width/2,size.height/2);
//		var bgSprit = new cc.Sprite(res.PlayBg_png);
//		bgSprit.setPosition(centerP);
//		this.addChild(bgSprit);
		
		this.map00 = new cc.TMXTiledMap(res.Map0_tmx);
		this.addChild(this.map00);
		
		this.mapWidth = this.map00.width;
		
		this.map01 = new cc.TMXTiledMap(res.Map1_tmx);
		this.map01.attr({
			x:this.mapWidth,
			y:0
		});
		this.addChild(this.map01);
		
		cc.spriteFrameCache.addSpriteFrames(res.CoinAndRock_plist);
		this.spriteSheet = cc.SpriteBatchNode.create(res.CoinAndRock_png);
		this.addChild(this.spriteSheet);
		
		this.loadObjects(this.map00, 0);
		this.loadObjects(this.map01, 1);

		
		this.scheduleUpdate();
	},
	loadObjects:function (map, mapIndex) {
		// add coins
		var coinGroup = map.getObjectGroup("coin");
		if(!coinGroup) return;
		var coinArray = coinGroup.getObjects();
		for (var i = 0; i < coinArray.length; i++) {
			var coin = new Coin(this.spriteSheet,
					this.space,
					mapIndex,
					cc.p(coinArray[i]["x"] + this.mapWidth * mapIndex,coinArray[i]["y"]));
			coin.mapIndex = mapIndex;
			this.objects.push(coin);
		}

		// add rock
		var rockGroup = map.getObjectGroup("rock");
		var rockArray = rockGroup.getObjects();
		for (var i = 0; i < rockArray.length; i++) {
			var rock = new Rock(this.spriteSheet,
					this.space,
					rockArray[i]["x"] + this.mapWidth * mapIndex);
			rock.mapIndex = mapIndex;
			this.objects.push(rock);
		}
	},
	removeObjects:function(mapId){
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].mapIndex == mapId) {
				this.objects[i].removeFromParent();
				this.objects.splice(i, 1);
				return true;
			}
		}
	},
	
	removeObjectByShape:function(shape){
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].getShape() == shape) {
				this.objects[i].removeFromParent();
				this.objects.splice(i, 1);
				break;
			}
		}
	},
	
	update:function(dt){
		this.adjustAlign();
	},
	adjustAlign:function(){
		var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();
		var newIndex = parseInt(eyeX/this.mapWidth);
		if(this.mapIndex == newIndex)
			return false;
		if(newIndex % 2 == 0){
			this.map01.setPositionX(this.mapWidth*(newIndex+1));
			this.loadObjects(this.map01, newIndex + 1);
		}else{
			this.map00.setPositionX(this.mapWidth*(newIndex+1));
			this.loadObjects(this.map00, newIndex + 1);
		}
		this.mapIndex = newIndex;
		this.removeObjects(newIndex);
	}
});