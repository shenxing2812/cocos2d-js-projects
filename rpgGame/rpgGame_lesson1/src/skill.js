var Skill = cc.Layer.extend({
	sprite:null,
	spriteSheep:null,
	action:null,
	ctor:function(resPng,resPlist,preFileName,num,defaultSp){
		this._super();
		cc.spriteFrameCache.addSpriteFrames(resPlist);
		this.spriteSheep = new cc.SpriteBatchNode(resPng);
		this.addChild(this.spriteSheep);
		
		this.sprite = new cc.Sprite(defaultSp);
		this.spriteSheep.addChild(this.sprite);
		
		
		var animFrames = [];
		for (var i = 0; i < num; i++) {
			var str = preFileName + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.1);
		var me = this;
		
		this.action = cc.sequence([cc.animate(animation),cc.callFunc(function(){
			me.action.release();
			me.removeFromParent();
		})]);
		this.action.retain();
		this.sprite.runAction(this.action);
	}
});