var res = {
    HelloBg_png : "res/helloBG.png",
    Start_png : "res/start_n.png",
    Start_sel_png : "res/start_s.png",
    PlayBg_png:"res/PlayBG.png",
    Runner_png:"res/running.png",
    Runner_plist:"res/running.plist",
    Map_png:"res/map.png",
    Map0_tmx:"res/map00.tmx",
    Map1_tmx:"res/map01.tmx",
    CoinAndRock_png:"res/background.png",
    CoinAndRock_plist:"res/background.plist",
    Restart_png : "res/restart_n.png",
    Restart_sel_png : "res/restart_s.png",
    Background_mp3 : "res/background.mp3",
    Jump_mp3 : "res/jump.mp3",
    Pickup_coin_mp3 : "res/pickup_coin.mp3"
    	
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}