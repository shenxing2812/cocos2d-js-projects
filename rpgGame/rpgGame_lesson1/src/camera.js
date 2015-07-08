var Camera = cc.Class.extend({
	hero:null,
	watchP:null,
	isWatchHero:true,
	sp:null,
	ctor:function(hero){
		this.hero = hero;
		watchP = cc.p(300, 200);
		this.sp = new cc.Node();
	},
	getWatchP:function(){
		if(this.isWatchHero && this.hero){
			return this.hero.getPosition();
		}
		return sp.getPosition();
	},
	flyTo:function(duration,p){
		isWatchHero = false;
		var action = cc.moveTo(duration, p);
		action.tag = 1;
		
		this.sp.stopActionByTag(1);
		this.sp.runAction(action);
	}
});