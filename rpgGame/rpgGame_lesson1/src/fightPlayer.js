var FightPlayer = cc.Node.extend({
	commands:null,
	curCommand:null,
	isExcuteing:false,
	ctor:function(){
		this._super();
		this.commands = [];
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
			var time = this.curCommand.time;
			var action = cc.sequence([cc.delayTime(time),cc.callFunc(function(){
				me.excuteCommand();
			})]);
			this.runAction(action);
			
			var commandName = this.curCommand.name;
			if(commandName == "moveToP"){
				this.curCommand.target.setPosition(this.curCommand.p);
			}else if(commandName == "changeState"){
				this.curCommand.target.setState(this.curCommand.state);
			}else if(commandName == "die"){
				var target = this.curCommand.target;
				var move = cc.spawn([cc.scaleTo(0.2, 0.1, 1),cc.moveTo(0.3, this.curCommand.target.x,this.curCommand.target.y+100),cc.fadeTo(1, 0)]);
				var action = cc.sequence([move,cc.callFunc(function(){
					
				})]);
				this.curCommand.target.runAction(action);
			}else if(commandName == "hurt"){
				var label = new cc.LabelTTF(this.curCommand.num);
				label.attr({
					x:this.curCommand.target.x,
					y:this.curCommand.target.y+this.curCommand.target.getMyHeight()+30
				});
				this.addChild(label);
				var move = cc.spawn([cc.moveTo(1, this.curCommand.target.x,this.curCommand.target.y+this.curCommand.target.getMyHeight()+30+50),cc.fadeTo(1, 0.2)]);//,cc.fadeTo(0.3, 0)
				var target = this.curCommand.target;
				var num = this.curCommand.num;
				var action = cc.sequence([move,cc.callFunc(function(){
					label.removeFromParent();
					target.hp += num;
				})]);
				label.runAction(action);
			}
		}else{
			this.isExcuteing = false;
		}
	}
});