var GamePlayer = cc.Sprite.extend({
	spriteSheep:null,
	standAction:null,
	walkAction:null,
	attackAction:null,
	beAttackAction:null,
	sprite:null,
	moveSpeed:null,
	state:null,
	ctor:function(name,resPng,resPlist,moveSpeed){
		this._super();
		this.moveSpeed = moveSpeed;
		this.anchorX = 0.5;
		this.anchorY = 0;
		
		cc.spriteFrameCache.addSpriteFrames(resPlist);
		this.spriteSheep = new cc.SpriteBatchNode(resPng);
		this.addChild(this.spriteSheep);
		
		this.sprite = new cc.Sprite("#stand/stand0.png");
		this.spriteSheep.addChild(this.sprite);
		this.initActions();
		
		this.stand();
	},
	moveTo:function(p,endFun){
		this.walk();
		var me = this;
		var finish = new cc.CallFunc(function(){
			cc.log("move finish");
			if(endFun)
				endFun();
			me.stand();
		}, this);
		if(p.x > this.getPosition().x){
			this.dir(DIR.RIGHT);
		}else{
			this.dir(DIR.LEFT);
		}
		var distance = cc.pDistance(this.getPosition(), p);
		var time = distance/this.moveSpeed;
		var run = cc.moveTo(time,p);
		var action = cc.sequence([run,finish]);
		action.tag = 1;
		this.stopActionByTag(1);
		this.runAction(action);
	},
	initActions:function(){
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 0; i < 10; i++) {
			var str = "stand/stand" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.standAction = new cc.RepeatForever(new cc.Animate(animation));
		this.standAction.tag = 99;
		this.standAction.retain();
		
		animFrames = [];
		for (i = 0; i < 10; i++) {
			var str = "walk/walk" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.1);
		this.walkAction = new cc.RepeatForever(new cc.Animate(animation));
		this.walkAction.tag = 98;
		this.walkAction.retain();
	},
	onExit:function(){
		this.standAction.release();
		this.walkAction.release();
		this._super();
	},
	stand:function(){
		if(this.state == STATE.STAND)
			return;
		this.state = STATE.STAND;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.standAction);
	},
	walk:function(){
		if(this.state == STATE.WALK)
			return;
		this.state = STATE.WALK;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.walkAction);
	},
	dir:function(_dir){
		if(_dir == DIR.LEFT){
			this.sprite.scaleX = 1;
		}else{
			this.sprite.scaleX = -1;
		}
	}
});