

MediaPlayer = function(type)
{
	this.type = type;
	this.isProgressBarPressDwon = false; //进度条是否被押下
	this.progressBarChangeX = 0; //进度条拖动x位置(相对位置)
	this.playerControls = undefined;//多媒体控制
	this.currentFileLoaded = false;//多媒体文件是否加载，可以播放
	this.progressBarTopTotalSize = 247;//进度条总像素点
	this.content = [];//全部歌曲信息、歌曲list
	this.currentIndex = 0;//当前播放歌曲的index
	this.isAudioPaused = true;//当前播放器是否暂停
	this.voiceBarTopTotalSize = 105;//声音控制条总像素点
	this.isVoiceBarPressDwon = false; //声音控制条是否被押下
	this.clearVoiceTimer = undefined;//声音控制器3秒timer
	this.isRandomPlay = false;//是否乱序播放
	
	switch(type)
	{
		case "audio":
			console.log("MediaPlayer creating AudioPlayer");
			var audioPlayer = new AudioPlayer();
			$.extend(this, audioPlayer);
			this.playerControls = $("#mediaIcon_audio");
		break;
        case "video":
            console.log("MediaPlayer creating VideoPlayer");
            var videoPlayer = new VideoPlayer();
            $.extend(this, videoPlayer);
            this.playerControls = $("#media_video");
            break;

        default:
            console.log("MediaPlayer: Trying to make an invalid player type " + type);
            break;
    }
};

//更新播放时间
MediaPlayer.prototype.updateTrackTime = function () {
    console.log("MediaPlayer in updateTrackTime");
    //歌曲当前时间
    var songCurrentTime = this.playerControls[0].currentTime;
    //歌曲总时间
    var songDurationTime = this.playerControls[0].duration;
    //当前播放时间分数，加0.5是为了跟真正时间同步
    var currentTimeMin = Math.floor((songCurrentTime + 0.5) / 60);
    var DurationTimeMin = Math.floor((songDurationTime - songCurrentTime + 0.5) / 60);
    //当前播放时间秒数，加0.5是为了跟真正时间同步
    var currentTimeSec = Math.floor((songCurrentTime + 0.5) % 60);
    var DurationTimeSec = Math.floor((songDurationTime - songCurrentTime + 0.5) % 60);
    //进度条的长度 像素为单位，247为进度条总长度
    var progressBarWidth = Math.floor(songCurrentTime / songDurationTime * this.progressBarTopTotalSize);
    //时间字符串
    var timeText = '';
    var timeText1 = '';


    //获取播放时长
    var songCurrentMin = currentTimeMin > 9 ? currentTimeMin : '0' + currentTimeMin;
    var songCurrentSec = currentTimeSec > 9 ? currentTimeSec : '0' + currentTimeSec;

    if ((songCurrentMin !== undefined && songCurrentSec !== undefined) && (!isNaN(songCurrentMin) && !isNaN(songCurrentSec)))
        timeText += songCurrentMin + ':' + songCurrentSec;
    else
        timeText += "00:00";

    //进度条被押下时，不由系统自动更新时间与进度
    var songDurationMin = DurationTimeMin > 9 ? DurationTimeMin : '0' + DurationTimeMin;
    var songDurationSec = DurationTimeSec > 9 ? DurationTimeSec : '0' + DurationTimeSec;

    if ((songDurationMin !== undefined && songDurationSec !== undefined) && (!isNaN(songDurationMin) && !isNaN(songDurationSec)))
        timeText1 += songDurationMin + ':' + songDurationSec;
    else
        timeText1 += "00:00";

    if (!this.isProgressBarPressDwon) {

        $("#songCurrentTime").text(timeText);
        if(this.type=="audio")
        {
            $("#songDurationTime").text(timeText1);
            $("#progressBarTop").css("width", progressBarWidth + "px");
        }
        if(this.type=="video")
        {
            $("#songDurationTime2").text(timeText1);
            $("#progressBarTop2").css("width", progressBarWidth + "px");
        }
    }

};

//更新播放时间显示，真实时间不变
//参数为鼠标相对x坐标
MediaPlayer.prototype.onlyUpdateTimeShow = function (coordinateX) {
    console.log("MediaPlayer in onlyUpdateTimeShow");

    //记忆进度被拖至x点
    this.progressBarChangeX = coordinateX;

    //歌曲拖至时间 相对坐标/进度条总长*歌曲总长
    var songDragTime = coordinateX / this.progressBarTopTotalSize * this.playerControls[0].duration;

    //当前播放时间分数
    var dragTimeMin = Math.floor(songDragTime / 60);
    //当前播放时间秒数
    var dragTimeSec = Math.floor(songDragTime % 60);
    //时间字符串
    var timeText = '';
    var timeText1 = '';

    var songCurrentTime = this.playerControls[0].currentTime;
    //歌曲总时间
    var songDurationTime = this.playerControls[0].duration;
    //当前播放时间分数，加0.5是为了跟真正时间同步
    var DurationTimeMin = Math.floor((songDurationTime - songDragTime) / 60);
    //当前播放时间秒数，加0.5是为了跟真正时间同步
    var DurationTimeSec = Math.floor((songDurationTime - songDragTime) % 60);
    var songDurationMin = DurationTimeMin > 9 ? DurationTimeMin : '0' + DurationTimeMin;
    var songDurationSec = DurationTimeSec > 9 ? DurationTimeSec : '0' + DurationTimeSec;
    //获取播放时长
    var songDragMin = dragTimeMin > 9 ? dragTimeMin : '0' + dragTimeMin;
    var songDragSec = dragTimeSec > 9 ? dragTimeSec : '0' + dragTimeSec;

    if ((songDragMin !== undefined && songDragSec !== undefined) && (!isNaN(songDragMin) && !isNaN(songDragSec))) {
        timeText += songDragMin + ':' + songDragSec;
        timeText1 += songDurationMin + ':' + songDurationSec;
    }
    else
        return;

    //进度条被押下时，手动更新时间与进度
    if (this.isProgressBarPressDwon) {
        $("#songCurrentTime").text(timeText);
        if(this.type=="audio")
        {
            $("#songDurationTime").text(timeText1);
            $("#progressBarTop").css("width", coordinateX + "px");
        }
        if(this.type=="video")
        {
            $("#songDurationTime2").text(timeText1);
            $("#progressBarTop2").css("width", coordinateX + "px");
        }

    }
};

//跳至指定时间播放
MediaPlayer.prototype.changeTimeToPlay = function()
{
	//进度条的百分比 247为进度条总像素
	var percentAge = this.progressBarChangeX / this.progressBarTopTotalSize;
    this.playerControls[0].currentTime = this.playerControls[0].duration * percentAge;
}

MediaPlayer.prototype.clearContent = function()
{
	console.log("MediaPlayer: clearing content for " + this.type);
	this.content.length = 0;
}

//添加多媒体文件信息
MediaPlayer.prototype.updateContent = function(newContent, append)
{


	console.log("MediaPlayer: updating content for " + this.type);
	var index = 0;
	for( index in newContent )
	{
		if( ( newContent[index].contentURI === undefined ) || ( newContent[index].contentURI === ''))
		{
			newContent.splice(index,1);
			continue;
		}
		if( newContent[index].artists.length === 0 )
		{
			newContent[index].artists = [''];
		}
//		if( ( newContent[index].thumbnailURIs  === undefined ) || ( newContent[index].thumbnailURIs  === '' ) )
//		{
//			newContent[index].thumbnailURIs  = 'images/demo/musicButton.png'
//		}
	}
	
	if (newContent && newContent !== undefined && newContent.length > 0)
	{
		if (append)
		{
            if(this.type=="audio")
            {
                this.content=[];
                console.log("MediaPlayer: updating content for concat");
                this.content = this.content.concat(newContent);
                $("#scroller ul").empty();
                for ( var i = 0,j=1; i < this.content.length; i++)
                {
                    $("#scroller ul").append("<div><li></li><span></span></div>");
                    if(this.content[i].title)
                    {
                        $("#scroller ul").find("li").eq(i).text(this.content[i].title);
                    }
                    else
                    {
                        $("#scroller ul").find("li").eq(i).text("未知曲目"+j);
                        j++;
                    }
                    var songDurationTime = this.content[i].duration;
                    var DurationTimeMin = Math.floor(songDurationTime / 60);
                    var DurationTimeSec = Math.floor(songDurationTime % 60);
                    var timeText = '';
                    var songDurationMin = DurationTimeMin > 9 ? DurationTimeMin : '0' + DurationTimeMin;
                    var songDurationSec = DurationTimeSec > 9 ? DurationTimeSec : '0' + DurationTimeSec;

                    if ((songDurationMin !== undefined && songDurationSec !== undefined) && (!isNaN(songDurationMin) && !isNaN(songDurationSec)))
                        timeText += songDurationMin + ':' + songDurationSec;
                    else
                        timeText += "00:00";

                    $("#scroller ul").find("span").eq(i).text(timeText);

                    $("#scroller ul").find("li").eq(i).bind("click", i, ListPress);
                    $("#scroller ul").find("span").eq(i).bind("click", i, ListPress);
                }
            }
            if(this.type=="video")
            {
                this.content=[];
                console.log("VideoPlayer: updating content for concat");
                this.content = this.content.concat(newContent);
                $("#scroller2 ul").empty();
                for ( var m = 0,n=1; m < this.content.length; m++)
                {
                    $("#scroller2 ul").append("<li></li>");
                    if(this.content[m].title)
                    {
                        $("#scroller2 ul").find("li").eq(m).text(this.content[m].title);
                    }
                    else
                    {
                        $("#scroller2 ul").find("li").eq(m).text("未知视频"+n);
                        n++;
                    }

                    $("#scroller2 ul").find("li").eq(m).bind("click", m, ListPress2);

                }
            }


		}
		else
		{
			console.log("MediaPlayer: updating content for new");
			this.content.length = 0;
			this.content = newContent;
		}
	}
	else
		console.log("MediaPlayer: invalid content update for " + this.type);

}

//声音控制条与声音大小的更新
MediaPlayer.prototype.updateVoice = function( voiceBarHeight )
{
	console.log("MediaPlayer in updateVoice");
	var voiceControlHeight;
	//参数检查
	if (voiceBarHeight == undefined  || isNaN(voiceBarHeight))
	{
		return;
	}
	
	if( voiceBarHeight < 0 )
	{
		voiceControlHeight = 0;
	}
	else if( voiceBarHeight > this.voiceBarTopTotalSize )
	{
		voiceControlHeight = this.voiceBarTopTotalSize;
	}
	else
	{
		voiceControlHeight = voiceBarHeight;
	}
	
	//保留小数点后两位数
	voiceControlHeight = Math.round(voiceControlHeight*100)/100;
	
	console.log("MediaPlayer in voiceControlHeight :"+voiceControlHeight);
	//计算声音控制条表示起点，7为控制区与表示区的像素差
    var voiceBarTop = this.voiceBarTopTotalSize - voiceControlHeight +7 ;


    var voiceBarTop_Icon = this.voiceBarTopTotalSize - voiceControlHeight -7 ;
    //计算音量




    //更新控制条显示
    if(this.type=="audio")
    {
        var voiceVolume = (105-voiceControlHeight)/this.voiceBarTopTotalSize;
        $("#voiceBarTop_Icon").css("left",voiceBarTop_Icon);
        $("#voiceBarTop").css("width",voiceBarTop);
    }
    if(this.type=="video")
    {
        var voiceVolume = voiceControlHeight/this.voiceBarTopTotalSize;
        $("#voiceBarTop2").css("top",voiceBarTop);
        $("#voiceBarTop_Icon2").css("top",voiceBarTop_Icon);
        $("#voiceBarTop2").css("height",voiceControlHeight);
    }


	//更新音量
	this.playerControls[0].volume = voiceVolume;



};

//设定声音控制面板消去timer
MediaPlayer.prototype.setVoiceTimer = function( )
{
    var self=this;
	console.log("MediaPlayer in setVoiceTimer");
	if( this.clearVoiceTimer != undefined )
	{
		//消去timer
		console.log("MediaPlayer in clearTimeout timeID:"+this.clearVoiceTimer);
		clearTimeout( this.clearVoiceTimer );
		
		this.clearVoiceTimer = undefined;
	}
	
	this.clearVoiceTimer = setTimeout(
		function()
		{
			console.log("MediaPlayer in setVoiceTimer timeout");
			
			this.clearVoiceTimer = undefined;
            if(self.type=="audio")
            {
                $("#voiceBar").css("display","none");
            }
            if(self.type=="video")
            {
                $("#voiceBar2").css("display","none");
            }

		}.bind(this)
		,3000);
	console.log("MediaPlayer in setVoiceTimer set time:"+this.clearVoiceTimer);

}
