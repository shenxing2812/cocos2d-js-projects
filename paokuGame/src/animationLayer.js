if(typeof RunnerStat == "undefined") {
	var RunnerStat = {};
	RunnerStat.running = 0;
	RunnerStat.jumpUp = 1;
	RunnerStat.jumpDown = 2;
};

var AnimationLayer = cc.Layer.extend({
	sprite:null,
	space:null,
	spriteSheet:null,
	body:null,
	shape:null,
	jumpUpAction:null,
	jumpDownAction:null,
	runningAction:null,
	stat:RunnerStat.running,
	ctor:function (space) {
		this.space = space;
		this._super();
		
		var size = cc.winSize;
		cc.spriteFrameCache.addSpriteFrames(res.Runner_plist);
		this.spriteSheet = cc.SpriteBatchNode.create(res.Runner_png);
		this.addChild(this.spriteSheet);
		
		this.initAction();
		
		this.sprite = new cc.PhysicsSprite("#runner0.png");
		var contentSize = this.sprite.getContentSize();
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		this.body.p = cc.p(g_runnerStarX,g_groundHeight + contentSize.height / 2);
		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));
		this.space.addBody(this.body);
		
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		this.space.addShape(this.shape);
		
		this.sprite.setBody(this.body);
		
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
//		this._debugNode = new cc.PhysicsDebugNode(this.space);
//		// Parallax ratio and offset
//		this.addChild(this._debugNode, 10);
		
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
		this.scheduleUpdate();
	},
	initAction:function () {
		// init runningAction
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 0; i < 8; i++) {
			var str = "runner" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
		this.runningAction.retain();

		// init jumpUpAction
		animFrames = [];
		for (var i = 0; i < 4; i++) {
			var str = "runnerJumpUp" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.2);
		this.jumpUpAction = new cc.Animate(animation);
		this.jumpUpAction.retain();

		// init jumpDownAction
		animFrames = [];
		for (var i = 0; i < 2; i++) {
			var str = "runnerJumpDown" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.3);
		this.jumpDownAction = new cc.Animate(animation);
		this.jumpDownAction.retain();
	},
	getEyeX:function(){
		return this.sprite.getPositionX() - g_runnerStarX;
	},
	jump:function (power) {
		cc.log("jump");
		cc.audioEngine.playEffect(res.Jump_mp3);
		this.body.applyImpulse(cp.v(0, power), cp.v(0, 0));
		if (this.stat == RunnerStat.running) {
			this.stat = RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	onExit:function() {
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();

		this._super();
	},
	update:function (dt) {

		// update meter
		var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
		statusLayer.updateMeter(this.getEyeX());

		// check and update runner stat
		var vel = this.body.getVel();
		if (this.stat == RunnerStat.jumpUp) {
			if (vel.y < 0.1) {
				this.stat = RunnerStat.jumpDown;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.stat == RunnerStat.jumpDown) {
			if (vel.y == 0) {
				this.stat = RunnerStat.running;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}

	},
	onTouchBegan:function(touch, event){
		event.getCurrentTarget().jump(Math.random()*500);
		return true;
	},
	onTouchMoved:function(touch, event){

	},
	onTouchEnded:function(touch, event){

	}
});