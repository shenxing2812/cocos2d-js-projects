var g_groundHeight = 57;
var g_runnerStarX = 80;

if(typeof TagOfLayer == "undefined") {
	var TagOfLayer = {};
	TagOfLayer.background = 0;
	TagOfLayer.Animation = 1;
	TagOfLayer.Status = 2;
};

if(typeof SpriteTag == "undefined") {
	var SpriteTag = {};
	SpriteTag.runner = 0;
	SpriteTag.coin = 1;
	SpriteTag.rock = 2;
};

if(typeof VV == "undefined"){
	var VV = {};
	VV.a = 0;
	VV.b = 0;
}