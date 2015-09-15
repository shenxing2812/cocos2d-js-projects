var Camera = cc.Sprite.extend({
	lookObject:null,
	isWatchHero:true,
	sp:null,
	ctor:function(lookObject){
		this._super();
		this.sp = new cc.Sprite();
		this.sp.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.addChild(this.sp);
		this.lookObject = lookObject;
	},
	getWatchP:function(){
		if(this.isWatchHero && this.lookObject){
			return this.lookObject.getPosition();
		}
		return this.sp.getPosition();
	},
	flyTo:function(duration,p,endFun){
		this.isWatchHero = false;
		var me = this;
		var finish = new cc.CallFunc(function(){
			if(endFun)
				endFun();
		}, this);
		var run = cc.moveTo(duration, p);
		var action = cc.sequence([run,finish]);
		action.tag = 1;
		
		this.sp.stopActionByTag(1);
		this.sp.runAction(action);

	},
	setLookAtObject:function(lookObject){
		this.isWatchHero = true;
		this.lookObject = lookObject;
	}
});