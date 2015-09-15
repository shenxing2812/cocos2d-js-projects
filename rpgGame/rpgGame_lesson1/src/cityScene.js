var CityScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new CityLayer();
		this.addChild(layer);
		
//		var windowLayer = new HeroInfoWnd();
//		windowLayer.attr({
//			anchorX: 0,
//			anchorY: 0,
//			x:0,
//			y:0
//		});
//		this.addChild(windowLayer);
		
		layer.npc.setVisible(false);
		var story = new StoryLayer(storyId,function(){
			if(storyId == 1){
				layer.npc.setVisible(true);
			}
			storyId = storyId+1;
		},layer);
	}
});

var CityLayer = cc.Layer.extend({
	sprite:null,
	backGroundLayer:null,
	hero:null,
	camera:null,
	npc:null,
	ctor:function () {
		this._super();
		this.initBg();
		this.createHero();
		this.initTouchEvent();
		this.initNPC();
		this.initCamera();
		this.initCustomEvent();
		this.scheduleUpdate();
		
		
	},
	initCustomEvent:function(){
		var me = this;
		cc.eventManager.addCustomListener("changeZuoqi", function(event){
			heroInfo.isRideTiger = !heroInfo.isRideTiger;
			var stateInfo = [];
			if(heroInfo.isRideTiger){
				stateInfo[STATE.STAND] = {num:10,preFileName:"stand_1/stand",repeatTime:-1};
				stateInfo[STATE.WALK] = {num:10,preFileName:"walk_1/walk",repeatTime:-1};
				me.hero.changeRes(res.Hero_with_tiger_png,res.Hero_with_tiger_plist,heroInfo.walkSpeed*1.5,stateInfo,"#stand_1/stand0.png");
			}else{
				stateInfo[STATE.STAND] = {num:10,preFileName:"stand/stand",repeatTime:-1};
				stateInfo[STATE.WALK] = {num:10,preFileName:"walk/walk",repeatTime:-1};
				me.hero.changeRes(res.Hero_png,res.Hero_plist,heroInfo.walkSpeed,stateInfo,"#stand/stand0.png");
			}
		});
	},
	initCamera:function(){
		this.camera = new Camera(this.hero);
		this.addChild(this.camera);
//		var size = cc.winSize;
//		var label1 = new cc.LabelTTF("飞", "Arial", 24);
//		var label2 = new cc.LabelTTF("主角", "Arial", 24);
//		var me = this;
//		var item1 = new cc.MenuItemLabel(label1,function(){
//			me.camera.flyTo(1, cc.p(1400,200),function(){
//				me.camera.isWatchHero = true;
//			});
//		},this);
//		var item2 = new cc.MenuItemLabel(label2,function(){
//			me.camera.isWatchHero = true;
//		},this);
//		
//		item1.attr({
//			x: size.width/2,
//			y: size.height/2-100,
//			anchorX: 0.5,
//			anchorY: 0.5
//		});
//		item2.attr({
//			x: size.width/2,
//			y: size.height/2+100,
//			anchorX: 0.5,
//			anchorY: 0.5
//		});
//		
//		var menu = new cc.Menu(item1,item2);
//		menu.x = 0;
//		menu.y = 0;
//		this.addChild(menu);
	},
	initBg:function(){
		this.backGroundLayer = new CityBackGroundLayer();
		this.addChild(this.backGroundLayer);
	},
	createHero:function(){
		var stateInfo = [];
		stateInfo[STATE.STAND] = {num:10,preFileName:"stand/stand",repeatTime:-1};
		stateInfo[STATE.WALK] = {num:10,preFileName:"walk/walk",repeatTime:-1};
		
		this.hero = new GamePlayer(heroInfo.name,res.Hero_png,res.Hero_plist,heroInfo.walkSpeed,stateInfo,"#stand/stand0.png");
		this.hero.tag = 9999;
		this.addChild(this.hero);
		this.hero.attr({
			x:100,
			y:100
		});
		this.hero.setDir(DIR.RIGHT);
	},
	initTouchEvent:function(){
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan
		}, this);
	},
	onTouchBegan: function(touch,event){
		var p = touch.getLocation();
		var target = event.getCurrentTarget();
		p = target.convertToNodeSpace(p);
		if(p.x<0 || p.x>target.backGroundLayer.getMapWidth())
			return false;
		if(p.y<0 || p.y>350)
			return false;
		target.hero.moveTo(p);
		return true;
	},
	update:function(dt){
		var centerP = this.camera.getWatchP();
	//	cc.log("cameraX:"+centerP.x);
		var wSize = cc.winSize;
		this.x = wSize.width/2-centerP.x;
		if(this.x >= 0){
			this.x = 0;
		}else if(this.x < wSize.width-this.backGroundLayer.getMapWidth()){
			this.x = wSize.width-this.backGroundLayer.getMapWidth();
		}

		this.y = wSize.height/2-centerP.y;
		if(this.y >= 0){
			this.y = 0;
		}else if(this.y < wSize.height-this.backGroundLayer.getMapHeight()){
			this.y = wSize.height-this.backGroundLayer.getMapHeight();
		}
		
		this.backGroundLayer.updateAlgin(this.x);
	},
	initNPC:function(){
		var stateInfo = [];
		stateInfo[STATE.STAND] = {num:10,preFileName:"stand",repeatTime:-1};
		stateInfo[STATE.WALK] = {num:10,preFileName:"walk",repeatTime:-1};

		var npc = new GamePlayer("NPC",res.Tiger_png,res.Tiger_plist,heroInfo.walkSpeed*1.5,stateInfo,"#stand0.png");
		this.addChild(npc);
		npc.attr({
			x:1700,
			y:50
		});
		npc.setDir(DIR.LEFT);
		
		this.npc = npc;
		
		var me = this;
		
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch,event){
				var target = event.getCurrentTarget();
				var locationInNode = target.convertToNodeSpace(touch.getLocation());
				locationInNode.x += target.getMyWidth()/2;
				locationInNode.y += target.getMyHeight()/2;
				var rect = cc.rect(0, 0, target.getMyWidth(), target.getMyHeight());
		//		cc.log("rectW:"+rect.width+" rectH:"+rect.height+" px:"+locationInNode.x+" py:"+locationInNode.y+"npcW:"+npc.width);
				if (cc.rectContainsPoint(rect, locationInNode)) {
					me.hero.moveTo(npc.getFrontP(),function(){
						me.hero.setDir(-npc.getDir());
					//	cc.log("接受任务");
						me.runAction(cc.sequence([new cc.DelayTime(0.5),new cc.CallFunc(function(){
							cc.log("战斗场景");
							cc.director.pushScene(new FightScene());
						})]));
					});
					return true;
				}
				return false;
			}
		}, npc);
	},
	onExit:function(){
		cc.eventManager.removeAllListeners();
		this.unscheduleUpdate();
		this._super();
	}
});

var CityBackGroundLayer = cc.Layer.extend({
	sprite:null,
	map1:null,
	map2:null,
	map3:null,
	ctor:function () {
		this._super();
		
		this.map1 = new cc.Sprite(res.Map1_1_png);
		this.map1.anchorX = 0;
		this.map1.anchorY = 0;

		this.map3 = new cc.Sprite(res.Map1_3_png);
		this.map3.anchorX = 0;
		this.map3.anchorY = 0;
		this.map3.y = this.map1.height-this.map3.height;
		this.addChild(this.map3);

		this.map2 = new cc.Sprite(res.Map1_2_png);
		this.map2.anchorX = 0;
		this.map2.anchorY = 0;
		this.map2.y = this.map1.height-this.map2.height;
		this.addChild(this.map2);


		this.addChild(this.map1);
	},
	updateAlgin:function(fatherX){
		var per2 = this.map2.width/this.map1.width;
		this.map2.x = per2*fatherX-fatherX;

		var per3 = this.map3.width/this.map1.width;
		this.map3.x = per3*fatherX-fatherX;
	},
	getMapWidth:function(){
		return this.map1.width;
	},
	getMapHeight:function(){
		return this.map1.height;
	}
});