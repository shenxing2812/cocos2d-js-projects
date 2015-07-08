var CityScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new CityLayer();
		this.addChild(layer);
	}
});

var CityLayer = cc.Layer.extend({
	sprite:null,
	backGroundLayer:null,
	hero:null,
	ctor:function () {
		this._super();
		this.initBg();
		this.createHero();
		this.initTouchEvent();
		this.initNPC();
		this.scheduleUpdate();
	},
	initBg:function(){
		this.backGroundLayer = new CityBackGroundLayer();
		this.addChild(this.backGroundLayer);
	},
	createHero:function(){
		this.hero = new GamePlayer(heroInfo.name,res.Hero_png,res.Hero_plist,heroInfo.walkSpeed);
		this.addChild(this.hero);
		this.hero.attr({
			x:50,
			y:100
		});
		this.hero.dir(DIR.RIGHT);
	},
	initTouchEvent:function(){
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
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
		var wSize = cc.winSize;
		this.x = wSize.width/2-this.hero.x;
		if(this.x >= 0){
			this.x = 0;
		}else if(this.x < wSize.width-this.backGroundLayer.getMapWidth()){
			this.x = wSize.width-this.backGroundLayer.getMapWidth();
		}

		this.y = wSize.height/2-this.hero.y;
		if(this.y >= 0){
			this.y = 0;
		}else if(this.y < wSize.height-this.backGroundLayer.getMapHeight()){
			this.y = wSize.height-this.backGroundLayer.getMapHeight();
		}
		
		this.backGroundLayer.updateAlgin(this.x);
	},
	initNPC:function(){
		
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