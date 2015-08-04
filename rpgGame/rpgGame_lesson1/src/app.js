
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        
        var bgSprte = new cc.Sprite(res.WelcomeBg_png);
        bgSprte.x = size.width/2;
        bgSprte.y = size.height/2;
        this.addChild(bgSprte);
        
        var closeItem = new cc.MenuItemImage(
            res.StartNormal_png,
            res.StartNormal_png,
            function () {
            	cc.director.pushScene(new CityScene());
            }, this);
        closeItem.attr({
            x: size.width/2,
            y: size.height/2-100,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        
//        var btn = new ccui.Button(res.StartNormal_png);
//        this.addChild(btn);
//        btn.attr({
//        	x: size.width/2,
//        	y: size.height/2-100
//        });
//        btn.addClickEventListener(function(){
//        	cc.log("btn click");
//        });
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

