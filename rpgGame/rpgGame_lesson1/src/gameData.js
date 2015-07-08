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