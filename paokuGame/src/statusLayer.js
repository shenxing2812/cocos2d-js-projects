var StatusLayer = cc.Layer.extend({
	_label_coin:null,
	_labelMeter:null,
	_coin:0,
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		this._label_coin = new cc.LabelTTF("Coins:0", "Helvetica", 20);
		this._label_coin.setColor(cc.color(0, 0, 0, 1));
		this._label_coin.setPosition(cc.p(70, size.height - 20));
		this.addChild(this._label_coin);
		
		this._labelMeter = new cc.LabelTTF("0M", "Helvetica", 20);
		this._labelMeter.setColor(cc.color(0, 0, 0, 1));
		this._labelMeter.setPosition(cc.p(size.width - 70, size.height - 20));
		this.addChild(this._labelMeter);
	},
	updateMeter:function(meter){
		this._labelMeter.setString(parseInt(meter)+"M");
	},
	addCoin:function(coin){
		this._coin += coin;
		this._label_coin.setString("Coins:"+this._coin);
	}
	
});