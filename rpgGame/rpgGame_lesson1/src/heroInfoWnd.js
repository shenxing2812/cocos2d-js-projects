var HeroInfoWnd = cc.Layer.extend({
	ctor:function(){
		this._super();
		
		var node = ccs.load(res.HeroInfoWnd_json).node;
		this.addChild(node);
	}
});