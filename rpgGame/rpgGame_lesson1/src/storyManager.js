var StoryLayer = cc.Layer.extend({
	commands:null,
	curCommand:null,
	isExcuteing:false,
	storyId:null,
	endFun:null,
	isMouseClick:null,
	mouseLayer:null,
	playerLayer:null,
	listener:null,
	ctor:function(storyId,endFun,playerLayer){
		this._super();
		this.commands = [];
		this.storyId = storyId;
		this.endFun = endFun;
		this.playerLayer = playerLayer;
		playerLayer.addChild(this);
		
		this.setCanMouseClick(false);
		this.loadText();
	},
	addCommand:function(command){
		this.commands.push(command);
		if(this.isExcuteing)
			return;
		this.isExcuteing = true;
		this.excuteCommand();
	},
	excuteCommand:function(){
		this.curCommand = this.commands.shift();
		var me = this;
		if(this.curCommand){
//			var time = this.curCommand.time;
//			var action = cc.sequence([cc.delayTime(time),cc.callFunc(function(){
//				me.excuteCommand();
//			})]);
//			this.runAction(action);
			var cmd = this.curCommand.split(new RegExp(','));

			var commandName = cmd[0];
			cc.log("commandName="+commandName);
			if(commandName == "setPlayerP"){
				var pid = cmd[1];
				var x = cmd[2];
				var y = cmd[3];
				this.setPlayerP(pid, x, y);
			}else if(commandName == "addPlayer"){
				var pid = cmd[1];
				var name = cmd[2];
				var dir = cmd[3];
				var x = cmd[4];
				var y = cmd[5];
				cc.log("pid"+pid);
				cc.log("name"+name);
				cc.log("dir"+dir);
				cc.log("x"+x);
				cc.log("y"+y);
				this.addPlayer(pid, name, dir, x, y);
			}else if(commandName == "wait"){
				var time = cmd[1];
				this.wait(time);
			}else if(commandName == "removePlayer"){
				var pid = cmd[1];
				this.removePlayer(pid);
			}else if(commandName == "playerWalk"){
				var pid = cmd[1];
				var x = cmd[2];
				var y = cmd[3];
				this.playerWalk(pid,x,y);
			}else if(commandName == "changeState"){
				var pid = cmd[1];
				var state = cmd[2];
				this.changePlayerState(pid, state);
			}else if(commandName == "die"){
				var pid = cmd[1];
				this.playerDie(pid);
			}else if(commandName == "cameraLockToPlayer"){
				var pid = cmd[1];
				this.cameraLockToPlayer(pid);
			}else if(commandName == "cameraFlyTo"){
				var x = cmd[1];
				var y = cmd[2];
				this.cameraFlyTo(x,y);
			}else if(commandName == "dialog"){
				var time = cmd[1];
				var headImg = cmd[2];
				var name = cmd[3];
				var dialogText = cmd[4];
				this.dialog(time, headImg, name, dialogText);
			}else if(commandName == "speakAside"){
				var time = cmd[1];
				var text = cmd[2];
				this.speakAside(time,text);
			}else if(commandName == "dispatchEvent"){
				var eventName = cmd[1];
				this.doDispatchEvent(eventName);
			}
			
		}else{
			this.finishCmds();
		}
	},
	setCanMouseClick:function(enable){
		if(this.isMouseClick == enable){
			return;
		}
		this.isMouseClick = enable;
		if(!this.isMouseClick){
			if(!this.mouseLayer){
				this.mouseLayer = new cc.Layer();
			}
			this.addChild(this.mouseLayer);
			this.listener = cc.eventManager.addListener({
				event:cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: function(touch,event){
					return true;
				}
			},this);
		}else{
			if(this.mouseLayer){
				this.mouseLayer.removeFromParent();
			}
			if(this.listener){
				cc.eventManager.removeListener(this.listener);
				this.listener = null;
			}
		}
	},
	loadText:function(){
		//含中文文本无法读取
//		var fileName = "res/"+this.storyId+".txt";
//		fileName = "res/"+2+".txt";
//		cc.log(fileName);
//		var me = this;
//		cc.loader.loadTxt(fileName, function(err, data){
//			if(err || !data){//加载出错
//				cc.log("err="+err);
//				cc.log("data="+data);
//				me.finishCmds();
//				return;
//			}else {
//				cc.log(data);
//				var strsArray=new Array();
//				strsArray=data.split(new RegExp('@'));
//				me.parseCmds(strsArray);
//			}
//		});
		if(this.storyId == 1){
			this.commands=story1.split(new RegExp('@'));
		}else if(this.storyId == 2){
			this.commands=story2.split(new RegExp('@'));
		}
		this.excuteCommand();
	},
	finishCmds:function(){
		this.isExcuteing = false;
		if(this.endFun != null){
			var me = this;
			var action = cc.callFunc(function(){
				me.endFun();
				me.endFun = null;
				me.removeFromParent();
			},this);
			this.runAction(action);
		}else{
			this.removeFromParent();
		}
		
	},
	initBg:function(resName){
		var sp = new cc.Sprite(resName);
		sp.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(sp);
		this.excuteCommand();
	},
	addPlayer:function(pid,name,dir,x,y){
		var stateInfo = [];
		stateInfo[STATE.STAND] = {num:10,preFileName:"stand/stand",repeatTime:-1};
		stateInfo[STATE.WALK] = {num:10,preFileName:"walk/walk",repeatTime:-1};
		
		var p = new GamePlayer(name,res.Hero_png,res.Hero_plist,heroInfo.walkSpeed,stateInfo,"#stand/stand0.png");
		p.setTag(pid);
		this.playerLayer.addChild(p);
		p.attr({
			x:x,
			y:y
		});
		p.setDir(dir);
		this.excuteCommand();
	},
	removePlayer:function(pid){
		this.playerLayer.removeChildByTag(pid, true);
		this.excuteCommand();
	},
	wait:function(seconds){
		var me = this;
		var action = cc.sequence([cc.delayTime(seconds),cc.callFunc(function(){
			me.excuteCommand();
		})]);
		this.runAction(action);
	},
	setPlayerP:function(id,x,y){
		var p = this.playerLayer.getChildByTag(id);
		p.attr({
			x:x,
			y:y
		});
		this.excuteCommand();
	},
	changePlayerState:function(id,state){
		var p = this.playerLayer.getChildByTag(id);
		p.setState(state);
		this.excuteCommand();
	},
	playerWalk:function(id,x,y){
		var p = this.playerLayer.getChildByTag(id);
		p.moveTo(cc.p(x, y), this.excuteCommand());
	},
	playerDie:function(id){
		var me = this;
		var p = this.playerLayer.getChildByTag(id);
		var move = cc.spawn([cc.scaleTo(0.2, 0.1, 1),cc.moveTo(0.3, p.x,p.y+100),cc.fadeTo(0.3, 0)]);
		var action = cc.sequence([move,cc.callFunc(function(){
			p.removeFromParent();
			me.excuteCommand();
		})]);
		p.runAction(action);
	},
	cameraLockToPlayer:function(id){
		var p = this.playerLayer.getChildByTag(id);
		this.playerLayer.camera.setLookAtObject(p);
		this.excuteCommand();
	},
	cameraFlyTo:function(x,y){
		this.playerLayer.camera.flyTo(1,cc.p(x, y),this.excuteCommand());
	},
	dialog:function(time,headImg,name,dialogText){
		var bg = new cc.Sprite(res.Dialog_bg_png);
		bg.attr({
			anchorX: 0,
			anchorY: 0,
			x:0,
			y:-bg.height
		});
		this.playerLayer.parent.addChild(bg);
		
		var label_name = new cc.LabelTTF(name);
		label_name.setColor(cc.color(180,0,180));
		label_name.fontSize = 26;
		label_name.attr({
			x:400,
			y:130,
			anchorX: 0,
			anchorY: 0
		});
		bg.addChild(label_name);
		
		var label_dialog = new cc.LabelTTF(dialogText);
		label_dialog.fontSize = 24;
		label_dialog.attr({
			x:600,
			y:80,
			anchorX: 0,
			anchorY: 0
		});
		bg.addChild(label_dialog);
		
		var actionBgMove = cc.moveTo(0.5, 0, 0);
		bg.runAction(actionBgMove);
		
		var head = new cc.Sprite(headImg);
		head.attr({
			y:0,
			x:-head.width,
			anchorX: 0,
			anchorY: 0
		});
		this.playerLayer.parent.addChild(head);
		var actionHeadMove = cc.moveTo(0.5, 0, 0);
		head.runAction(actionHeadMove);
		
		var me = this;
		var action = cc.sequence([cc.delayTime(time),cc.callFunc(function(){
			bg.removeFromParent();
			head.removeFromParent();
			me.excuteCommand();
		})]);
		this.runAction(action);
	},
	speakAside:function(time,text){
		var bg = new cc.LayerColor(cc.color(0,0,0));
		this.playerLayer.parent.addChild(bg);
		

		var label_dialog = new cc.LabelTTF(text);
		label_dialog.fontSize = 30;
		label_dialog.opacity = 0;
		bg.addChild(label_dialog);
		label_dialog.attr({
			y:bg.height/2,
			x:bg.width/2
		});
		
		var actionFade = cc.fadeIn(1);
		label_dialog.runAction(actionFade);
		
		var me = this;
		var action = cc.sequence([cc.delayTime(time),cc.callFunc(function(){
			bg.removeFromParent();
			me.excuteCommand();
		})]);
		this.runAction(action);
	},
	doDispatchEvent:function(eventName){
		cc.eventManager.dispatchCustomEvent(eventName);
		this.excuteCommand();
	}
});