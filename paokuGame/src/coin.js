var Coin = cc.Class.extend({
	space:null,
	shape:null,
	mapIndex:null,
	ctor:function(sheetSprite,space,mapIndex,pos){
		this.space = space;
		this.mapIndex = mapIndex;
		
		var frames = [];
		for(var i=0;i<8;i++){
			var name  = "coin"+i+".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(name);
			frames.push(frame);
		}

		var animation =  new cc.Animation(frames,0.1);
		this.runAction = cc.repeatForever(cc.Animate.create(animation));
		
		this.sprite = new cc.PhysicsSprite("#coin0.png");

		// init physics
		var radius = 0.95 * this.sprite.getContentSize().width / 2;
		var body = new cp.StaticBody();
		body.setPos(pos);
		this.sprite.setBody(body);

		this.shape = new cp.CircleShape(body, radius, cp.vzero);
		this.shape.setCollisionType(SpriteTag.coin);
		//Sensors only call collision callbacks, and never generate real collisions
		this.shape.setSensor(true);

		this.space.addStaticShape(this.shape);

		// add sprite to sprite sheet
		this.sprite.runAction(this.runAction);
		sheetSprite.addChild(this.sprite, 1);
	},

	removeFromParent:function () {
		this.space.removeStaticShape(this.shape);
		this.shape = null;
		this.sprite.removeFromParent();
		this.sprite = null;
	},

	getShape:function () {
		return this.shape;
	}
	
});