if(typeof DIR == "undefined"){
	var DIR = {};
	DIR.LEFT = 1;
	DIR.RIGHT = -1;
}

if(typeof STATE == "undefined"){
	var STATE = {};
	STATE.STAND = 1;
	STATE.WALK = 2;
	STATE.ATTACK = 3;
	STATE.BEATTACK = 4;
}

var heroInfo = {};
heroInfo.name = "啊星";
heroInfo.level = 1;
heroInfo.walkSpeed = 300;
heroInfo.isRideTiger = false;

var storyId = 1;

var story1 = 
	"speakAside,3,今天星期四，又到了讲师分享的时间了。。。@"+
	"speakAside,3,终于轮到我了，我很迷茫。。。@"+
	"speakAside,3,我该讲些什么东东好呢。。。@"+
	"wait,1@"+
	"addPlayer,99,阿春,1,1500,150@" +
	"cameraFlyTo,1500,150@"+
	"wait,1@"+
	"cameraLockToPlayer,99@"+
	"wait,1@"+
	"playerWalk,99,500,150@"+
	"wait,4@"+
	"cameraLockToPlayer,9999@"+
	"dialog,3,res/heroHead.png,阿春:,啊星，到点讲课了！@"+
	"dialog,3,res/heroHead.png,啊星:,好的，马上来！@"+
	"removePlayer,99@"+
	"speakAside,5,为了赶时间，我骑上了我心爱的交通工具。。。@"+
	"wait,1@"+
	"dialog,2,res/heroHead.png,啊星:,妈咪妈咪哄～～@"+
	"wait,1@"+
	"dispatchEvent,changeZuoqi@"+
	"wait,2@"+
	"dialog,2,res/heroHead.png,啊星:,小虎子，加速，走起来！@"+
	"wait,1@"+
	"playerWalk,9999,1300,150@"+
	"wait,2@"+
	"dialog,2,res/heroHead.png,啊星:,虎子，看，又一个cosplay你的@"+
	"";

var story2 = 
	"cameraFlyTo,1500,150@"+
	"speakAside,4,得图技术部成员大介绍开始@"+
	"playMusic,res/yue bing.mp3@"+
	"speakAside,4,ios组成员介绍@"+
	"addPlayer,90,杜蒙,1,1200,150@" +
	"addPlayer,89,李洋浩,1,1350,150@" +
	"addPlayer,88,刘同德,1,1500,150@" +
	"addPlayer,87,吴泽,1,1650,150@" +
	"addPlayer,86,沈星,1,1800,150@" +
	"wait,2@"+
	"changeState,90,3@"+
	"changeState,89,3@"+
	"changeState,88,3@"+
	"changeState,87,3@"+
	"changeState,86,3@"+
	"wait,3@"+
	"removePlayer,90@"+
	"removePlayer,89@"+
	"removePlayer,88@"+
	"removePlayer,87@"+
	"removePlayer,86@"+
	"speakAside,4,android组成员介绍@"+
	"addPlayer,90,董文武,1,1300,150@" +
	"addPlayer,89,马智杰,1,1500,150@" +
	"addPlayer,88,王超,1,1700,150@" +
	"wait,2@"+
	"changeState,90,4@"+
	"changeState,89,4@"+
	"changeState,88,4@"+
	"wait,3@"+
	"removePlayer,90@"+
	"removePlayer,89@"+
	"removePlayer,88@"+
	"speakAside,4,php组成员介绍@"+
	"addPlayer,90,韩迎春,1,1200,150@" +
	"addPlayer,89,宋亮,1,1350,150@" +
	"addPlayer,88,潜凯,1,1500,150@" +
	"addPlayer,87,徐斌,1,1650,150@" +
	"wait,2@"+
	"changeState,90,2@"+
	"changeState,89,2@"+
	"changeState,88,2@"+
	"changeState,87,2@"+
	"wait,3@"+
	"removePlayer,90@"+
	"removePlayer,89@"+
	"removePlayer,88@"+
	"removePlayer,87@"+
	"speakAside,4,图形处理和硬件组成员介绍@"+
	"addPlayer,90,孙奇瑞,1,1300,150@" +
	"addPlayer,89,王涛,1,1500,150@" +
	"addPlayer,88,张静,1,1700,150@" +
	"wait,2@"+
	"changeState,90,3@"+
	"changeState,89,3@"+
	"changeState,88,3@"+
	"wait,3@"+
	"removePlayer,90@"+
	"removePlayer,89@"+
	"removePlayer,88@"+
	"speakAside,4,测试组成员介绍@"+
	"addPlayer,90,叶跃旦,1,1300,150@" +
	"addPlayer,89,刘潮,1,1500,150@" +
	"addPlayer,88,刘冰冰,1,1700,150@" +
	"wait,2@"+
	"changeState,90,4@"+
	"changeState,89,4@"+
	"changeState,88,4@"+
	"wait,3@"+
	"removePlayer,90@"+
	"removePlayer,89@"+
	"removePlayer,88@"+
	"speakAside,4,如有遗漏，请买好奶茶联系作者。。。@"+
	"speakAside,4,最后无耻的拉一下票，请大家投我一票，我不要鼠标，我要电瓶车...@"+
	"speakAside,50,得图加油!!@"+
	"";