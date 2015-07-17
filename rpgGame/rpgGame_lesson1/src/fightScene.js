var FightScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new FightLayer();
		this.addChild(layer);
	}
});

var FightLayer = cc.Layer.extend({
	hero:null,
	monster:null,
	fightPlayer:null,
	menu:null,
	labelInfos:null,
	ctor:function(){
		this._super();
		this.initBg();
		this.initPlayers();
		this.initBtns();
		this.initFightPlayer();
		this.scheduleUpdate();
	},
	initFightPlayer:function(){
		this.fightPlayer = new FightPlayer();
		this.addChild(this.fightPlayer);
	},
	initBg:function(){
		var sp = new cc.Sprite(res.Fight_bg_png);
		sp.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(sp);
	},
	initPlayers:function(){
		var stateInfo = [];
		stateInfo[STATE.STAND] = {num:10,preFileName:"stand/stand",repeatTime:-1};
		stateInfo[STATE.WALK] = {num:10,preFileName:"walk/walk",repeatTime:-1};
		stateInfo[STATE.ATTACK] = {num:10,preFileName:"attack/attack",repeatTime:1};
		stateInfo[STATE.BEATTACK] = {num:7,preFileName:"beAttack/beAttack",repeatTime:1};

		this.hero = new GamePlayer(heroInfo.name,res.Hero_png,res.Hero_plist,heroInfo.walkSpeed,stateInfo,"#stand/stand0.png");
		this.addChild(this.hero);
		this.hero.setDir(DIR.RIGHT);
		this.hero.setInitP(cc.p(300, 150));
		
		this.monster = new GamePlayer("怪物1",res.Hero_png,res.Hero_plist,heroInfo.walkSpeed,stateInfo,"#stand/stand0.png");
		this.addChild(this.monster);
		this.monster.setDir(DIR.LEFT);
		this.monster.setInitP(cc.p(900, 150));
		
		this.hero.mp = 200;
		this.hero.hp = 200;
		
		this.monster.mp = 50;
		this.monster.hp = 100;
	},
	initBtns:function(){
		var label1 = new cc.LabelTTF("砍他", "Arial", 24);
		var label2 = new cc.LabelTTF("技能", "Arial", 24);
		var me = this;
		var item1 = new cc.MenuItemLabel(label1,function(){
			if(this.hero.mp<100)
				return;
			this.hero.mp -= 100;
			cc.log("砍他");
			this.fightPlayer.addCommand({"target":this.hero,"time":0.5,"name":"moveToP","p":this.monster.getFrontP()});
			this.fightPlayer.addCommand({"target":this.hero,"time":0.5,"name":"changeState","state":STATE.ATTACK});
			this.fightPlayer.addCommand({"target":this.monster,"time":0.1,"name":"addSkill"});
			this.fightPlayer.addCommand({"target":this.monster,"time":0.5,"name":"changeState","state":STATE.BEATTACK});
			this.fightPlayer.addCommand({"target":this.monster,"time":0.1,"name":"hurt","num":-100});
			this.fightPlayer.addCommand({"target":this.hero,"time":0.1,"name":"moveToP","p":this.hero.getInitP()});
		},this);
		item1.attr({
			x:600,
			y:50,
			anchorX:0,
			anchorY:0
		});
		var item2 = new cc.MenuItemLabel(label2,function(){
			cc.log("技能");
		},this);
		item2.attr({
			x:700,
			y:50,
			anchorX:0,
			anchorY:0
		});
		var menu = new cc.Menu([item1,item2]);
		menu.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(menu);
		
		this.menu = menu;
	},
	update:function(dt){
		this.hero.mp += 1;
		this.monster.mp += 0.1;
		this.checkOver();
		this.monsterAI();
		var s = "heroHp:"+parseInt(this.hero.hp)+"\nheroMp:"+parseInt(this.hero.mp)+"\nmonHp:"+parseInt(this.monster.hp)+"\nmonMp:"+parseInt(this.monster.mp);
		if(!this.labelInfos){
			this.labelInfos = new cc.LabelTTF(s, "Arial", 20);
			this.labelInfos.attr({
				x:300,
				y:500
			});
		//	this.labelInfos.setString("aaa");
			this.addChild(this.labelInfos);
		}
		this.labelInfos.setString(s);
	},
	checkOver:function(){
		var isOver = false;
		if(this.hero.hp <=0){
			isOver = true;
			this.fightPlayer.addCommand({"name":"die","target":this.hero,"time":0.1});
		}else if(this.monster.hp <=0){
			this.fightPlayer.addCommand({"name":"die","target":this.monster,"time":0.1});
			isOver = true;
		}
		if(isOver == true){
			this.menu.removeFromParent();
			this.unscheduleUpdate();
		
			var label1 = new cc.LabelTTF("游戏结束", "Arial", 50);
			
			var size = cc.winSize;
			
			label1.attr({
				x:size.width/2,
				y:size.height/2
			});
			this.addChild(label1);
			
			var label2 = new cc.LabelTTF("确定", "Arial", 60);
			var item1 = new cc.MenuItemLabel(label2,function(){
				cc.director.pushScene(new CityScene());
			});
			item1.attr({
				x:(size.width-item1.width)/2,
				y:size.height/2-100,
				anchorX:0,
				anchorY:0
			});
			var menu = new cc.Menu(item1);
			menu.attr({
				x:0,
				y:0,
				anchorX:0,
				anchorY:0
			});
			this.addChild(menu);
		}
		
	},
	monsterAI:function(){
		if(this.monster.mp > 100){
			this.monster.mp = 0;
			this.fightPlayer.addCommand({"target":this.monster,"time":0.5,"name":"moveToP","p":this.hero.getFrontP()});
			this.fightPlayer.addCommand({"target":this.monster,"time":0.5,"name":"changeState","state":STATE.ATTACK});
			this.fightPlayer.addCommand({"target":this.hero,"time":0.5,"name":"changeState","state":STATE.BEATTACK});
			this.fightPlayer.addCommand({"target":this.hero,"time":0.1,"name":"hurt","num":-30});
			this.fightPlayer.addCommand({"target":this.monster,"time":0.5,"name":"moveToP","p":this.monster.getInitP()});
		}
	}
});
