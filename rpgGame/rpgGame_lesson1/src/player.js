var GamePlayer = cc.Sprite.extend({
	spriteSheep:null,
	sprite:null,
	moveSpeed:null,
	state:null,
	statesInfos:null,
	alllActions:[],
	ctor:function(name,resPng,resPlist,moveSpeed,statesInfos,defaultSp){
		this._super();
		this.moveSpeed = moveSpeed;
		this.statesInfos = statesInfos;
		this.anchorX = 0.5;
		this.anchorY = 0;
		
		cc.spriteFrameCache.addSpriteFrames(resPlist);
		this.spriteSheep = new cc.SpriteBatchNode(resPng);
		this.addChild(this.spriteSheep);
		
		this.sprite = new cc.Sprite(defaultSp);
		this.spriteSheep.addChild(this.sprite);
		this.initActions();
		
		var lab_name = new cc.LabelTTF();
		lab_name.attr({
			y:this.sprite.height/2,
			anchorY:0
		});
		lab_name.setString(name);
		this.addChild(lab_name);
		
		this.setState(STATE.STAND);
	},
	moveTo:function(p,endFun){
		this.setState(STATE.WALK);
		var me = this;
		var finish = new cc.CallFunc(function(){
			cc.log("move finish");
			if(endFun)
				endFun();
			me.setState(STATE.STAND);
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
		for ( var item in this.statesInfos) {
			var temp = this.statesInfos[item];
			if(!temp)
				continue;
			this.alllActions[item] = this.createAction(temp.num, temp.preFileName, temp.repeatTime);
		}
	},
	onExit:function(){
		for ( var item in this.alllActions) {
			var temp = this.alllActions[item];
			if(!temp)
				continue;
			temp.release();
		}
		this._super();
	},
	dir:function(_dir){
		if(_dir == DIR.LEFT){
			this.sprite.scaleX = 1;
		}else{
			this.sprite.scaleX = -1;
		}
	},
	setState:function(_state){
		if(this.state == _state)
			return;
		this.state = _state;
		this.sprite.stopAllActions();
		var action = this.alllActions[_state];
		if(action)
			this.sprite.runAction(action);
	},
	createAction:function(num,preFileName,repeatTime){
		var animFrames = [];
		for (var i = 0; i < num; i++) {
			var str = preFileName + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.1);
		var action = new cc.RepeatForever(new cc.Animate(animation));
		action.retain();
		return action;
	}
});