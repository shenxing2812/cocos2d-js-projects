
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;     
        var centerP = cc.p(size.width/2,size.height/2);
        
        var bgSprit = new cc.Sprite(res.HelloBg_png);
        bgSprit.setPosition(centerP);
        this.addChild(bgSprit,0);
        
        cc.MenuItemFont.setFontSize(60);
        
        var startItem = new cc.MenuItemImage(
            res.Start_png,
            res.Start_sel_png,
            function () {
            	cc.director.pushScene(new GameScene())
            }, this);

        var menu = new cc.Menu(startItem);
        menu.setPosition(centerP);
        this.addChild(menu, 1);

        return true;
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

