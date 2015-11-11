
VideoPlayer = function () {
    this.clearAudioTimeInterval = undefined;//更新时间的timerID
};

VideoPlayer.prototype.play = function () {
    console.log("MediaPlayer in VideoPlayer::play");

    //音频文件加载完的场合
    if (this.currentFileLoaded) {
        //播放器在暂停状态
        if (this.playerControls[0].paused) {
            //播放音乐
            this.playerControls[0].play();
            audioPlayer.playerControls[0].pause();
        }
        else {
            //暂停音乐
            this.playerControls[0].pause();
        }
    }
    else
        console.log(" can't play yet, it hasn't loaded");
};

//停止播放
VideoPlayer.prototype.stopMedia = function () {
    console.log("MediaPlayer in VideoPlayer::stop");

    //音频文件加载完的场合
    if (this.currentFileLoaded) {
        //播放器不在暂停状态
        if (!this.playerControls[0].paused) {
            //暂停音乐
            this.playerControls[0].pause();
        }

        //歌曲归0
        this.playerControls[0].currentTime = 0;
    }
    else
        console.log(" can't play yet, it hasn't loaded");

    //时间显示归0
    $("#songCurrentTime2").text("00:00");

    //进度条归0
    $("#progressBarTop2").css("width", "0px");


};


//显示相对应的音频
//参数index为歌曲在数组里的下标
VideoPlayer.prototype.updateMediaName = function (audioIndex) {
    console.log("MediaPlayer in updateMediaName");
    if ((audioIndex === undefined ) || isNaN(audioIndex)) {

        console.log("MediaPlayer  audioIndex type error");
        return;
    }

    var index = parseInt(audioIndex);


    if (index < 0)
        return;
    this.currentIndex = index;


    //音频设置为未加载
    this.currentFileLoaded = false;
    //更新歌曲地址
    this.playerControls.attr("src", this.content[index].contentURI);


    if (!this.isAudioPaused) {
        if (videoPlayer.clearAudioTimeInterval && (videoPlayer.clearAudioTimeInterval !== undefined )) {
            //停止时间更新
            clearInterval(videoPlayer.clearAudioTimeInterval);
        }

        //播放歌曲
        this.playerControls[0].play();
    }

};



//播放前一曲
VideoPlayer.prototype.preAudio = function()
{
	console.log("MediaPlayer in preAudio");
	var preIndex = 0;
	
	if( this.isRandomPlay === false )
	{
		preIndex = this.currentIndex - 1;
	}
	else
	{
		preIndex = this.gerRandomIndex();
	}
	
	if (this.content)
	{
		if ( preIndex < 0 )
		{
			//切换到最后一首
			preIndex =  this.content.length - 1;
		}
        ListSelect2(preIndex);
		//更新播放音频
		this.updateMediaName( preIndex );
	}
    if(this.content.length>7){

        var dis = Math.floor((preIndex / 7)) * 371;
        var a = (Math.floor(this.content.length / 7) - 1) * 371;
        var b = a + this.content.length % 7 * 53;
        if (dis > b) {
            myScroll_Video.scrollTo(0,-b,1000);
        }
        else {
            myScroll_Video.scrollTo(0,-dis,1000);
        }
    }
};

//播放下一曲
VideoPlayer.prototype.nextAudio = function () {
    console.log("MediaPlayer in nextAudio");
    var nextIndex = 0;

    if (this.isRandomPlay === false) {
        nextIndex = this.currentIndex + 1;
    }
    else {
        nextIndex = this.gerRandomIndex();
    }

    if (this.content) {
        if (nextIndex >= this.content.length) {
            //切换到最前一首
            nextIndex = 0;
        }
        ListSelect2(nextIndex);
        //更新播放音频
        this.updateMediaName(nextIndex);
    }
    if(this.content.length>7){

    var dis = Math.floor((nextIndex / 7)) * 371;
    var a = (Math.floor(this.content.length / 7) - 1) * 371;
    var b = a + this.content.length % 7 * 53;
    if (dis > b) {
        myScroll_Video.scrollTo(0,-b,1000);
    }
    else {
        myScroll_Video.scrollTo(0,-dis,1000);
        }
    }
};

//播放下一曲
VideoPlayer.prototype.gerRandomIndex = function () {
    console.log("MediaPlayer in gerRandomIndex");
    var nextIndex = Math.floor(Math.random() * this.content.length);

    if (nextIndex == this.currentIndex) {
        console.log("MediaPlayer in gerRandomIndex nextIndex :" + nextIndex);
        nextIndex = this.gerRandomIndex();
    }

    console.log("MediaPlayer in gerRandomIndex end  nextIndex :" + nextIndex);
    return nextIndex;

};