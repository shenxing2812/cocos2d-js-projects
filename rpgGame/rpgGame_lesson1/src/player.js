var GamePlayer = cc.Sprite.extend({
	spriteSheep:null,
	sprite:null,
	moveSpeed:null,
	state:null,
	statesInfos:null,
	allActions:null,
	myWidth:0,
	myHeight:0,
	_dir:null,
	lab_name:null,
	initP:null,
	hp:100,
	mp:100,
	ctor:function(name,resPng,resPlist,moveSpeed,statesInfos,defaultSp){
		this._super();
		this.moveSpeed = moveSpeed;
		this.statesInfos = statesInfos;
		
		this.allActions = {};
		
		cc.spriteFrameCache.addSpriteFrames(resPlist);
		this.spriteSheep = new cc.SpriteBatchNode(resPng);
		this.addChild(this.spriteSheep);
		
		this.sprite = new cc.Sprite(defaultSp);
		this.spriteSheep.addChild(this.sprite);
		this.initActions();
		this.sprite.attr({
			anchorY : 0
		});
		
		this.myWidth = this.sprite.width;
		this.myHeight = this.sprite.height;
		
		var lab_name = new cc.LabelTTF();
		lab_name.attr({
			y:this.sprite.height,
			anchorY:0
		});
		lab_name.setString(name);
		this.addChild(lab_name);
		_dir = DIR.LEFT;
		this.setState(STATE.STAND);
		this.lab_name = lab_name;
	},
	changeRes:function(resPng,resPlist,moveSpeed,statesInfos,defaultSp){
		this.moveSpeed = moveSpeed;
		this.statesInfos = statesInfos;
		this.sprite.stopAllActions();
		this.clearActions();
		
		if(this.spriteSheep){
			this.spriteSheep.removeFromParent();
		}
		cc.spriteFrameCache.addSpriteFrames(resPlist);
		this.spriteSheep = new cc.SpriteBatchNode(resPng);
		this.addChild(this.spriteSheep);
		this.sprite.attr({
			anchorY : 0
		});
		
		
		this.sprite = new cc.Sprite(defaultSp);
		this.spriteSheep.addChild(this.sprite);
		this.initActions();

		this.myWidth = this.sprite.width;
		this.myHeight = this.sprite.height;
		
		this.lab_name.attr({
			y:this.sprite.height,
			anchorY:0
		});
		
		this.setState(STATE.STAND);
		this.setDir(this.getDir());
	},
	moveTo:function(p,endFun){
		this.setState(STATE.WALK);
		var me = this;
		var finish = new cc.CallFunc(function(){
		//	cc.log("move finish");
			if(endFun)
				endFun();
			me.setState(STATE.STAND);
		}, this);
		if(p.x > this.getPosition().x){
			this.setDir(DIR.RIGHT);
		}else{
			this.setDir(DIR.LEFT);
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
			this.allActions[item] = this.createAction(temp.num, temp.preFileName, temp.repeatTime);
		}
	},
	clearActions:function(){
		for ( var item in this.alllActions) {
			var temp = this.alllActions[item];
			if(!temp)
				continue;
			temp.release();
		}
	},
	onExit:function(){
		this.clearActions();
		this._super();
	},
	setDir:function(_dir){
		this._dir = _dir;
		if(_dir == DIR.LEFT){
			this.sprite.scaleX = 1;
		}else{
			this.sprite.scaleX = -1;
		}
	},
	getDir:function(){
		return this._dir
	},
	setState:function(_state){
		if(this.state == _state)
			return;
		this.state = _state;
		this.sprite.stopAllActions();
		var action = this.allActions[_state];
		if(action)
			this.sprite.runAction(action);
	},
	createAction:function(num,preFileName,repeatTime){
		var animFrames = [];
		for (var i = 0; i < num; i++) {
			var str = preFileName + i + ".png";
		//	cc.log("frame str="+str);
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.1);
		var action;
		if(repeatTime == -1){
			action = new cc.RepeatForever(new cc.Animate(animation));
		}else{
			var me = this;
			action = cc.sequence([new cc.Animate(animation).repeat(repeatTime),cc.callFunc(function(){
				me.setState(STATE.STAND);
			})]);
		}
		action.retain();
		return action;
	},
	getMyWidth:function(){
		return this.myWidth;
	},
	getMyHeight:function(){
		return this.myHeight;
	},
	getFrontP:function(){
		return cc.p(this._dir==DIR.LEFT?this.x-this.getMyWidth()/2:this.x+this.getMyWidth()/2,this.y);
	},
	setInitP:function(p){
		this.initP = p;
		this.setPosition(p);
	},
	getInitP:function(){
		return this.initP;
	}
});