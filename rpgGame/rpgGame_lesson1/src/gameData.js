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
heroInfo.name = "主角";
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
	"";