
//全局定义
//音乐播放器
var videoPlayer;


//程序入口
function init_video()
{

	//禁止在页面上拖动。防止图片被拖出
	window.ondragstart = function () {
        return false;
    };
	
	videoPlayer = new MediaPlayer( "video" );

	//设置默认音量为50%
	videoPlayer.updateVoice( videoPlayer.voiceBarTopTotalSize/2 );
	


	
	//播放器绑定事件 可以播放音频/视频时
	videoPlayer.playerControls.bind("canplay", function() {
		console.log("video event canplay");

		if( videoPlayer.playerControls[0].paused )
		{
			//变成播放键的名称
			$("#controlKeyPlay2").attr("name","play");
			//将key变成播放键，无反应色
			$("#controlKeyPlay2").attr("src","img/DLN/SW/nml/DLN_003_SW_Play_nml.png");
		}
		
		videoPlayer.currentFileLoaded = true;
		
		//音频加载完毕后更新时间与进度条
		videoPlayer.updateTrackTime();
		
    });
	
	//播放器绑定事件 播放事件
	videoPlayer.playerControls.bind("play", function() {
		console.log("video event play");
		
		//变成暂停键的名称
		$("#controlKeyPlay2").attr("name","pause");
		//将key变成暂停键，无反应色
		$("#controlKeyPlay2").attr("src","img/DLN/SW/nml/DLN_003_SW_Paush_nml.png");
		
		//记忆播放前当前暂停状态为否
		videoPlayer.isAudioPaused = false;
		
		//开始时间更新
		videoPlayer.clearAudioTimeInterval = setInterval( videoPlayer.updateTrackTime.bind(videoPlayer), 500);

    });

	//播放器绑定事件 暂停事件
	videoPlayer.playerControls.bind("pause", function() {
		console.log("video event pause");
        
		//变成播放键的名称
		$("#controlKeyPlay2").attr("name","play");
		//将key变成播放键，无反应色
		$("#controlKeyPlay2").attr("src","img/DLN/SW/nml/DLN_003_SW_Play_nml.png");
		
		//记忆播放前当前暂停状态为否
		videoPlayer.isAudioPaused = true;
		
		if( videoPlayer.clearAudioTimeInterval && (videoPlayer.clearAudioTimeInterval !== undefined ) )
		{
			//停止时间更新
			clearInterval(videoPlayer.clearAudioTimeInterval);
		}
   });
   
   	//播放器绑定事件 音量已更改时
	videoPlayer.playerControls.bind("volumechange", function() {
		console.log("video event volumechange");
		//设定Timer
		videoPlayer.setVoiceTimer();
	});
   
   	//播放器绑定事件 当前播放歌曲结束时
	videoPlayer.playerControls.bind("ended", function() {
		console.log("video event ended");
		videoPlayer.isAudioPaused = false;
		//播放下一首
		videoPlayer.nextAudio();
	});

}


//按键押下变成有反应色
controlKeyDown2 = function (tpye) {
    console.log("VideoPlayer in controlKeyDown");
    var controlKey = $("#controlKey" + tpye+2);

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
        case "Full":
            if (controlKey.attr("name") === "normal") {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_004_SW_FullScreen_sel.png");
            }
            else {
                controlKey.attr("src", "img/DLN/SW/sel/DLN_004_SW_ESC_sel.png");
            }
            return;
        default:
            break;
    }
};

controlKeyUp2 = function (tpye) {
    console.log("VideoPlayer in controlKeyUp");
    var controlKey = $("#controlKey" + tpye+2);

    console.log("keyUp  controlKey: controlKey" + tpye);

    switch (tpye) {
        //Play 键抬起时
        case "Play":
            videoPlayer.play();
            if(isFull){
                setVideoTimer()
            }
            break;
        //停止 键抬起时
        case "Stop":
            videoPlayer.stopMedia();
            if(isFull){
                setVideoTimer()
            }
            break;
        //上一曲 按键抬起时
        case "Pre":
            videoPlayer.preAudio();
            if(isFull){
                setVideoTimer()
            }
            break;
        //下一曲 按键抬起时
        case "Next":
            videoPlayer.nextAudio();
            if(isFull){
                setVideoTimer()
            }
            break;
        //乱序播放 按键抬起时
        case "Full":
            if (controlKey.attr("name") === "normal") {
                //变成播放键的名称
                controlKey.attr("name", "FullSreen");
                //将key变成播放键，无反应色
                controlKey.attr("src", "img/DLN/SW/nml/DLN_004_SW_ESC_nml.png");
                replace(0);
                setVideoTimer();

            }
            else {
                //变成播放键的名称
                controlKey.attr("name", "normal");
                //将key变成播放键，无反应色
                controlKey.attr("src", "img/DLN/SW/nml/DLN_004_SW_FullScreen_nml.png");

                replace(1);
            }
            return;
        default:
            break;
    }


};

//进度条被押下，获取进度条的相对坐标，改变进度宽度
progress_pressDown2 = function (e) {
    console.log("VideoPlayer in progress_pressDown");
    //相对位置
    var x = e.pageX - $("#progressBarPanel2").offset().left;
    //相对位置修正
    if (x < 0) {
        x = 0;
    }
    //进度条总长247像素
    else if (x > videoPlayer.progressBarTopTotalSize) {
        x = videoPlayer.progressBarTopTotalSize;
    }

    //记忆进度条被压下
    videoPlayer.isProgressBarPressDwon = true;

    videoPlayer.onlyUpdateTimeShow(x);
    if(isFull){
        setVideoTimer()
    }
};


//获取进度条的相对坐标
progress_Move2 = function (e) {
    //进度条有被押下的场合
    if (false === videoPlayer.isProgressBarPressDwon) {
        return;
    }

    console.log("VideoPlayer in progress_Move");

    //相对位置
    var x = e.pageX - $("#progressBarPanel2").offset().left;


    //相对位置修正
    if (x < 0) {
        x = 0;
    }
    //进度条总长247像素
    else if (x > videoPlayer.progressBarTopTotalSize) {
        x = videoPlayer.progressBarTopTotalSize;
    }

    videoPlayer.onlyUpdateTimeShow(x);
    if(isFull){
        setVideoTimer()
    }

};


//进度条被释放，改变进度宽度，播放歌曲
progress_pressUp2 = function () {
    //进度条有被押下的场合
    if (false === videoPlayer.isProgressBarPressDwon) {
        console.log("progress_pressUp return");
        return;
    }

    console.log("VideoPlayer in progress_pressUp");
    //改变进度条宽度
    $("#progressBarTop2").css("width", videoPlayer.progressBarChangeX + "px");

    //记忆进度条未被压下
    videoPlayer.isProgressBarPressDwon = false;

    //指定位置播放歌曲
    videoPlayer.changeTimeToPlay();

};




var preIn2 = -1;
function ListSelect2(i){
    if(preIn2 == i)
    {
        return
    }
  //  $("#scroller2 ul").find("li").eq(i).addClass("shadow");
    $("#scroller2 ul").find("li").eq(i).css('color', '#ffffff');
    $("#scroller2 ul").find("li").eq(i).addClass("background");

    if(preIn2 == -1){
        preIn2 = i;
    }
    else{
  //      $("#scroller2 ul").find("li").eq(preIn2).removeClass("shadow");
        $("#scroller2 ul").find("li").eq(preIn2).css('color', '#979797');
        $("#scroller2 ul").find("li").eq(preIn2).removeClass("background");
        preIn2 = i;
    }
}
function ListPress2(event){

        ListSelect2(event.data);
        videoPlayer.updateMediaName(event.data);


}


//声音控制条被押下，获取声音控制条的相对坐标，改变控制条高度，设置声音大小

voice_pressDown2 = function (e) {
    console.log("VideoPlayer in voice_pressDown");

    //控制条高度，110为控制区的高度
    var voiceBarHeight = $("#voiceBarPanel2").offset().top + 110 - e.pageY;

    //相对位置修正
    if (voiceBarHeight < 0) {
        voiceBarHeight = 0;
    }
    //进度条总长247像素
    else if (voiceBarHeight > videoPlayer.voiceBarTopTotalSize) {
        voiceBarHeight = videoPlayer.voiceBarTopTotalSize;
    }

    //记忆声音控制条被压下
    videoPlayer.isVoiceBarPressDwon = true;

    videoPlayer.updateVoice(voiceBarHeight);
    if(isFull){
        setVideoTimer()
    }
};


//获取声音控制条的相对坐标,改变控制条高度，设置声音大小
voice_Move2 = function (e) {
    console.log("VideoPlayer in voice_Move");

    if (false === videoPlayer.isVoiceBarPressDwon) {
        console.log("VideoPlayer in voice_Move return");
        return;
    }

    //更新音量
    voice_pressDown2(e);
    if(isFull){
        setVideoTimer()
    }
};


//声音控制条被释放
voice_pressUp2 = function () {
    console.log("VideoPlayer in voice_pressUp");

    //记忆声音控制条未被压下
    videoPlayer.isVoiceBarPressDwon = false;
};

//显示声音控制条
showVoiceBar2 = function () {
    if(isFull){
        setVideoTimer()
    }
    $("#voiceBar2").css("display", "inherit");
    videoPlayer.setVoiceTimer();
};



var isFull=false;
function replace(i){
    $("#DLN_004_BG").toggle(900);;
    $("#Tab_Left").toggle(900);;
    $("#SelectedIcon2").toggle(900);;
    if(i==0)
    {
        $("#media_video").animate({left:"0",top:"0",width:"980",height:"588"},900);
        $("#controlKeyStop2").animate({left:"0"},900);
        $("#controlKeyPre2").animate({left:"102"},900);
        $("#controlKeyPlay2").animate({left:"218"},900);
        $("#controlKeyNext2").animate({left:"367"},900);
        $("#voiceControlImg2").animate({left:"478"},900);
        $("#voiceControl2").animate({left:"515"},900);
        $("#progressBar2").animate({top:"500"},900);
        $("#timeRemain2").animate({top:"510"},900);
        $("#controlKeyFull2").animate({top:"488"},900);
        isFull=true
    }
    else
    {
        clearTimeout( clearVoiceTimer );
        $("#controlKey2").css("display","block");
        $("#media_video").animate({left:"570",top:"77",width:"399",height:"300"},900);
        $("#controlKeyStop2").animate({left:"325"},900);
        $("#controlKeyPre2").animate({left:"457"},900);
        $("#controlKeyPlay2").animate({left:"573"},900);
        $("#controlKeyNext2").animate({left:"722"},900);
        $("#voiceControlImg2").animate({left:"853"},900);
        $("#voiceControl2").animate({left:"890"},900);
        $("#progressBar2").animate({top:"390"},900);
        $("#timeRemain2").animate({top:"400"},900);
        $("#controlKeyFull2").animate({top:"378"},900);
        isFull=false
    }
}