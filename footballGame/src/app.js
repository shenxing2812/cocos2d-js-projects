
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    space:null,
    spriteSheet:null,
    hero:null,
    map1:null,
    map2:null,
    map3:null,
    ctor:function () {
        this._super();
        this.initBg();
        this.initPhysic();
        this.initTouchEvent();
        this.createHero();
        this.scheduleUpdate();
        return true;
    },
    createHero:function(){
    	var size = cc.winSize;
    	var p = cc.p(50, 100);
    	
    	var ballSp = new cc.PhysicsSprite(res.FootBall_png);
    	ballSp.attr({
    		x:p.x,
    		y:p.y,
    		anchorX:0.5,
    		anchorY:0
    	});
    	var ballSize = ballSp.getContentSize();

    	var radius = ballSize.width / 2;
    	var mass = 1;
    	var body = new cp.Body(mass, cp.momentForCircle(1, 0, radius,cp.v(0, 0)));
    	body.setPos(cc.p(p.x,p.y));
    	body.applyImpulse(cp.v(300, Math.random()*100), cp.v(0, 0))
    	this.space.addBody(body);

    	var shape = new cp.CircleShape(body, radius, cp.v(0, ballSp.height/2));
    	this.space.addShape(shape);

    	ballSp.setBody(body);

    	if(!this.spriteSheet){
    		this.spriteSheet = cc.SpriteBatchNode.create(res.FootBall_png);
    		this.addChild(this.spriteSheet);
    	}

    	this.spriteSheet.addChild(ballSp);

    	this.hero = ballSp;
    },
    initBg:function(){
    	this.map1 = new cc.Sprite(res.Map2_1_png);
    	this.map1.anchorX = 0;
    	this.map1.anchorY = 0;
    	
    	this.map3 = new cc.Sprite(res.Map2_3_png);
    	this.map3.anchorX = 0;
    	this.map3.anchorY = 0;
    	this.map3.y = this.map1.height-this.map3.height;
    	this.addChild(this.map3);
    	
    	this.map2 = new cc.Sprite(res.Map2_2_png);
    	this.map2.anchorX = 0;
    	this.map2.anchorY = 0;
    	this.map2.y = this.map1.height-this.map2.height;
    	this.addChild(this.map2);
    	
    	
    	this.addChild(this.map1);
    },
    initPhysic:function(){
    	this.space = new cp.Space();
    	this.space.gravity = cp.v(0, 100);
    	this.space.sleepTimeThreshold = 0.5;
    	this.space.collisionSlop = 0.5;
    	var staticBody = this.space.staticBody;
    	var size = cc.size(this.map1.width, this.map1.height);
    	var walls = [
    	             new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, size.height), 2),
    	             new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(size.width, 0), 1),
    	             new cp.SegmentShape(staticBody, cp.v(0, size.height), cp.v(size.width, size.height), 1),
    	             new cp.SegmentShape(staticBody, cp.v(size.width, size.height), cp.v(size.width, 0), 10),
    	             ];
    	
    	for (var i = 0; i < walls.length; i++) {  
    		var wall = walls[i]; 
    		wall.setElasticity(1);//设置弹性系数属性为1
    		wall.setFriction(0);//设置摩擦力系数为1   
    		this.space.addStaticShape(wall);
		}
    	
    	this._debugNode = new cc.PhysicsDebugNode(this.space);
    	this.addChild(this._debugNode, 10);
    	
    	this.hero.addTouch
    },
    initTouchEvent:function(){
    	cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
    },
    onTouchBegan: function(touch,event){
    	var p = touch.getLocationInView();
    	var target = event.getCurrentTarget();
    	if ( cc.rectContainsPoint(target.getBoundingBox(),p)) {
    		cc.log("touched")
    		return true;
    	}
    	return false;
    },
    onTouchMoved: function(touch,event){
    	var p = touch.getLocationInView();
    	var target = event.getCurrentTarget();
    	p = target.convertToWorldSpace(p)
    	target.hero.setPosition(p);
// 	cc.log("onTouchMoved");
    },
    onTouchEnded: function(touch,event){
  //  	cc.log("onTouchEnded");
    },
    update:function(dt){
    	var wSize = cc.winSize;
    	this.x = wSize.width/2-this.hero.x;
    	if(this.x >= 0){
    		this.x = 0;
    	}else if(this.x < wSize.width-this.map1.width){
    		this.x = wSize.width-this.map1.width;
    	}
    	
    	this.y = wSize.height/2-this.hero.y;
    	if(this.y >= 0){
    		this.y = 0;
    	}else if(this.y < wSize.height-this.map1.height){
    		this.y = wSize.height-this.map1.height;
    	}
    	
    	
    	var per2 = this.map2.width/this.map1.width;
    	this.map2.x = per2*this.x-this.x;
    	
    	var per3 = this.map3.width/this.map1.width;
    	this.map3.x = per3*this.x-this.x;
    	
   // 	this.space.step(dt);
    },
    addFootBall:function(p){
    	var ballSp = new cc.PhysicsSprite(res.FootBall_png);
    	ballSp.attr({
    		x:p.x,
    		y:p.y
    	});
    	var ballSize = ballSp.getContentSize();
    	
    	var radius = ballSize.width / 2;
    	var mass = 1;
    	var body = new cp.Body(mass, cp.momentForCircle(1, 0, radius,cp.v(0, 0)));
    	body.setPos(p);
    	body.applyImpulse(cp.v(Math.random()*200, Math.random()*100), cp.v(0, 0))
    	this.space.addBody(body);
    	
    	var shape = new cp.CircleShape(body, radius, cp.v(0, 0));
    	this.space.addShape(shape);
    	
    	ballSp.setBody(body);
    	
    	if(!this.spriteSheet){
    		this.spriteSheet = cc.SpriteBatchNode.create(res.FootBall_png);
    		this.addChild(this.spriteSheet);
    	}
    	
    	this.spriteSheet.addChild(ballSp);
    	
    	return ballSp;
    },
    onEnter:function(){
    	this._super(); 
    },
    onExit:function(){
    	cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    	this._super(); 
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

