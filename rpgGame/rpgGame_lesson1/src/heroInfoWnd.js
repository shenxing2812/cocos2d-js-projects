var HeroInfoWnd = cc.Layer.extend({
	txt_name:null,
	txt_level:null,
	btn_tiger:null,
	ctor:function(){
		this._super();
		
		var node = ccs.load(res.HeroInfoWnd_json).node;
		node.attr({
			anchorX: 0,
			anchorY: 0,
			x:0,
			y:0
		});
		this.addChild(node);
		
		this.txt_name = ccui.helper.seekWidgetByName(node,"txt_name");
		this.txt_name.setString(heroInfo.name);
		
		this.txt_level = ccui.helper.seekWidgetByName(node,"txt_level");
		this.txt_level.setString(heroInfo.level);
		
		btn_tiger = ccui.helper.seekWidgetByName(node,"btn_tiger");
		btn_tiger.addClickEventListener(function(){
			cc.eventManager.dispatchCustomEvent("changeZuoqi");
		});
	}
});