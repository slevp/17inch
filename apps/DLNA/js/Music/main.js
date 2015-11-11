
//全局定义
//音乐播放器
var audioPlayer;
var stopServerSearch;


//程序入口
function init()
{
	if (tizen.mediaserver)
	{
		//Currently no success signal, so continue trying until a server is found.  Once that
		//happens, clear the stopServerSearch interval

		stopServerSearch = setInterval(function(){console.log("MediaPlayer searching for remote media..."); tizen.mediaserver.scanNetwork(foundMediaServer);}, 5000);
	}
	console.log("MediaPlayer in init");
	
	//禁止在页面上拖动。防止图片被拖出
	window.ondragstart = function () {
        return false;
    };
	
	audioPlayer = new MediaPlayer( "audio" );

	//设置默认音量为50%
	audioPlayer.updateVoice( audioPlayer.voiceBarTopTotalSize/2 );
	


	
	//播放器绑定事件 可以播放音频/视频时
	audioPlayer.playerControls.bind("canplay", function() {
		console.log("audio event canplay");

		if( audioPlayer.playerControls[0].paused )
		{
			//变成播放键的名称
			$("#controlKeyPlay").attr("name","play");			
			//将key变成播放键，无反应色
			$("#controlKeyPlay").attr("src","img/DLN/SW/nml/DLN_003_SW_Play_nml.png");
		}
		
		audioPlayer.currentFileLoaded = true;
		
		//音频加载完毕后更新时间与进度条
		audioPlayer.updateTrackTime();
		
    });
	
	//播放器绑定事件 播放事件
	audioPlayer.playerControls.bind("play", function() {
		console.log("audio event play");
		
		//变成暂停键的名称
		$("#controlKeyPlay").attr("name","pause");
		//将key变成暂停键，无反应色
		$("#controlKeyPlay").attr("src","img/DLN/SW/nml/DLN_003_SW_Paush_nml.png");
		
		//记忆播放前当前暂停状态为否
		audioPlayer.isAudioPaused = false;
		
		//开始时间更新
		audioPlayer.clearAudioTimeInterval = setInterval( audioPlayer.updateTrackTime.bind(audioPlayer), 500);

    });

	//播放器绑定事件 暂停事件
	audioPlayer.playerControls.bind("pause", function() {
		console.log("audio event pause");
        
		//变成播放键的名称
		$("#controlKeyPlay").attr("name","play");			
		//将key变成播放键，无反应色
		$("#controlKeyPlay").attr("src","img/DLN/SW/nml/DLN_003_SW_Play_nml.png");
		
		//记忆播放前当前暂停状态为否
		audioPlayer.isAudioPaused = true;
		
		if( audioPlayer.clearAudioTimeInterval && (audioPlayer.clearAudioTimeInterval !== undefined ) )
		{
			//停止时间更新
			clearInterval(audioPlayer.clearAudioTimeInterval);
		}
   });
   
   	//播放器绑定事件 音量已更改时
	audioPlayer.playerControls.bind("volumechange", function() {
		console.log("audio event volumechange");
		//设定Timer
		audioPlayer.setVoiceTimer();
	});
   
   	//播放器绑定事件 当前播放歌曲结束时
	audioPlayer.playerControls.bind("ended", function() {
		console.log("audio event ended");
		audioPlayer.isAudioPaused = false;
		//播放下一首
		audioPlayer.nextAudio();
	});

}


//按键押下变成有反应色
controlKeyDown = function (tpye) {
    console.log("MediaPlayer in controlKeyDown");
    var controlKey = $("#controlKey" + tpye);

    console.log("keyDown  controlKey: controlKey" + tpye);
    switch (tpye) {
        case "Play":
            if (controlKey.attr("name") === "play") {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_003_SW_Play_sel.png");
            }
            else {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_003_SW_Paush_sel.png");
            }
            break;
        case "Random":
            if (controlKey.attr("name") === "random") {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_003_SW_Random_sel.png");
            }
            else {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_003_SW_Cycle_sel.png");
            }
            return;
        default:
            break;
    }
};

controlKeyUp = function (tpye) {
    console.log("MediaPlayer in controlKeyUp");
    var controlKey = $("#controlKey" + tpye);

    console.log("keyUp  controlKey: controlKey" + tpye);

    switch (tpye) {
        //Play 键抬起时
        case "Play":
            audioPlayer.play();
            break;
        //停止 键抬起时
        case "Stop":
            audioPlayer.stopMedia();
            break;
        //上一曲 按键抬起时
        case "Pre":
            audioPlayer.preAudio();
            break;
        //下一曲 按键抬起时
        case "Next":
            audioPlayer.nextAudio();
            break;
        //乱序播放 按键抬起时
        case "Random":
            if (controlKey.attr("name") === "random") {
                //变成播放键的名称
                controlKey.attr("name", "order");
                //将key变成播放键，无反应色
                controlKey.attr("src", "img/DLN/SW/nml/DLN_003_SW_Cycle_nml.png");

                //顺序播放
                audioPlayer.isRandomPlay = false;
            }
            else {
                //变成播放键的名称
                controlKey.attr("name", "random");
                //将key变成播放键，无反应色
                controlKey.attr("src", "img/DLN/SW/nml/DLN_003_SW_Random_nml.png");

                //乱序播放
                audioPlayer.isRandomPlay = true;
            }
            return;
        default:
            break;
    }


};

//进度条被押下，获取进度条的相对坐标，改变进度宽度
progress_pressDown = function (e) {
    console.log("MediaPlayer in progress_pressDown");
    //相对位置
    var x = e.pageX - $("#progressBarPanel").offset().left;
    //相对位置修正
    if (x < 0) {
        x = 0;
    }
    //进度条总长247像素
    else if (x > audioPlayer.progressBarTopTotalSize) {
        x = audioPlayer.progressBarTopTotalSize;
    }

    //记忆进度条被压下
    audioPlayer.isProgressBarPressDwon = true;

    audioPlayer.onlyUpdateTimeShow(x);
};


//获取进度条的相对坐标
progress_Move = function (e) {
    //进度条有被押下的场合
    if (false === audioPlayer.isProgressBarPressDwon) {
        return;
    }

    console.log("MediaPlayer in progress_Move");

    //相对位置
    var x = e.pageX - $("#progressBarPanel").offset().left;


    //相对位置修正
    if (x < 0) {
        x = 0;
    }
    //进度条总长247像素
    else if (x > audioPlayer.progressBarTopTotalSize) {
        x = audioPlayer.progressBarTopTotalSize;
    }

    audioPlayer.onlyUpdateTimeShow(x);

};


//进度条被释放，改变进度宽度，播放歌曲
progress_pressUp = function () {
    //进度条有被押下的场合
    if (false === audioPlayer.isProgressBarPressDwon) {
        console.log("progress_pressUp return");
        return;
    }

    console.log("MediaPlayer in progress_pressUp");
    //改变进度条宽度
    $("#progressBarTop").css("width", audioPlayer.progressBarChangeX + "px");

    //记忆进度条未被压下
    audioPlayer.isProgressBarPressDwon = false;

    //指定位置播放歌曲
    audioPlayer.changeTimeToPlay();

};




var preIn = -1;
function ListSelect(i){
    console.log("333333333333333333333333333333333333333333333333333333333333333333333aaa"+i);
    if(preIn == i)
    {
        return
    }
 //   $("#scroller ul").find("div").eq(i).addClass("shadow");
    $("#scroller ul").find("li").eq(i).css('color', '#ffffff');
    $("#scroller ul").find("li").eq(i).addClass("background");
    $("#scroller ul").find("span").eq(i).css('color', '#ffffff');
    if(preIn == -1){
        preIn = i;
    }
    else{
 //       $("#scroller ul").find("div").eq(preIn).removeClass("shadow");
        $("#scroller ul").find("li").eq(preIn).css('color', '#979797');
        $("#scroller ul").find("li").eq(preIn).removeClass("background");
        $("#scroller ul").find("span").eq(preIn).css('color', '#979797');
        preIn = i;
    }
}
function ListPress(event){

        ListSelect(event.data);
        audioPlayer.updateMediaName(event.data);
}


//声音控制条被押下，获取声音控制条的相对坐标，改变控制条高度，设置声音大小

voice_pressDown = function (e) {
    console.log("MediaPlayer in voice_pressDown");

    //控制条高度，110为控制区的高度
    var voiceBarHeight = $("#voiceBarPanel").offset().left + 110 - e.pageX;

    //相对位置修正
    if (voiceBarHeight < 0) {
        voiceBarHeight = 0;
    }
    //进度条总长247像素
    else if (voiceBarHeight > audioPlayer.voiceBarTopTotalSize) {
        voiceBarHeight = audioPlayer.voiceBarTopTotalSize;
    }

    //记忆声音控制条被压下
    audioPlayer.isVoiceBarPressDwon = true;

    audioPlayer.updateVoice(voiceBarHeight);
};


//获取声音控制条的相对坐标,改变控制条高度，设置声音大小
voice_Move = function (e) {
    console.log("MediaPlayer in voice_Move");

    if (false === audioPlayer.isVoiceBarPressDwon) {
        console.log("MediaPlayer in voice_Move return");
        return;
    }

    //更新音量
    voice_pressDown(e);
};


//声音控制条被释放
voice_pressUp = function () {
    console.log("MediaPlayer in voice_pressUp");

    //记忆声音控制条未被压下
    audioPlayer.isVoiceBarPressDwon = false;
};

//显示声音控制条
showVoiceBar = function () {
    $("#voiceBar").css("display", "inherit");
    audioPlayer.setVoiceTimer();
};


