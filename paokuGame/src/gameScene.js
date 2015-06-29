var GameScene = cc.Scene.extend({
	space:null,
	gameLayer:null,
	needToRemove:[],
	initPhysics:function(){
		this.space = new cp.Space();
		this.space.gravity = cp.v(0,-350);
		var wall = new cp.SegmentShape(this.space.staticBody, 
				cp.v(0,g_groundHeight),
				cp.v(424967295,g_groundHeight), 
				0);
		this.space.addStaticShape(wall);
		
	},
	
	onEnter:function () {
		this._super();
		
		this.initPhysics();
		
		this.gameLayer = new cc.Layer();
		this.gameLayer.addChild(new GameBackLayer(this.space),0,TagOfLayer.background);
		this.gameLayer.addChild(new AnimationLayer(this.space),1,TagOfLayer.Animation);
		
		
		this.addChild(this.gameLayer);
		this.addChild(new StatusLayer(),2,TagOfLayer.Status);
		
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
				this.collisionCoinBegin.bind(this), null, null, null);
		
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
				this.collisionRockBegin.bind(this), null, null, null);
		
		this.scheduleUpdate();
	},
	
	collisionRockBegin:function(arbiter, space){
		cc.log("touch rock");
		cc.director.pause();
		this.addChild(new GameOverLayer());
	},
	
	collisionCoinBegin:function(arbiter, space){
		var shapes = arbiter.getShapes();
		this.needToRemove.push(shapes[1]);
		
		var statusLayer = this.getChildByTag(TagOfLayer.Status);
		statusLayer.addCoin(1);
	},
	
	update:function(dt){
		this.space.step(dt);
		var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
		var eyeX = animationLayer.getEyeX();
		this.gameLayer.setPosition(cc.p(-eyeX,0));
		
		for(var i = 0; i < this.needToRemove.length; i++) {
			var shape = this.needToRemove[i];
			this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
		}
		this.needToRemove = [];
	}
	
});