/**
 * Created by caiyidi on 14/07/14.
 */

$(document).ready(function () {
    init();
    init_video();
    var i=0;
    var ConnectTimer=setInterval(function(){
        $(".Dot").eq(i).css("display","block");
        i++;
        if(i>5){
            $(".Dot").css("display","none");
            i=0
        }
    },500);

//    audioPlayer.updateContent(Testdata,true);
//    videoPlayer.updateContent(Testdata2,true);
//    UpdateImages(Testdata3)
});
var myScroll;
var myScroll_Video;
//Testdata=
//    [
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:1000
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:20000
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        },
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'userMusic/hanige.mp4',
//            duration:10
//        }
//
//
//    ];
//Testdata2=
//    [
//        {
//            title: '星星的妈妈',
//            artists: ['华子,周子琰,张楚,回音哥,侯磊'],
//            album: '星星的妈妈',
//            contentURI: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
//
//        },
//        {
//            title: '卷珠帘',
//            artists: ['霍尊'],
//            album: '中国好歌曲 第1期',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: '倍儿爽',
//            artists: ['大张伟'],
//            album: '倍儿爽',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: '滴答',
//            artists: ['侃侃'],
//            album: '《那些年 DSD》',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: 'Dvorak - Serenade for Strings Op22 in E Major larghetto',
//            artists: ['Advent Chamber Orchestra'],
//            album: 'Selections from the November 2006 Concert',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: 'Beethoven, Symphony No. 1, Menuetto',
//            artists: ['Bruno Walter'],
//            album: 'Bruno Walter in Concert',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: '要死就一定要死在你手里',
//            artists: ['莫西子诗'],
//            album: '中国好歌曲 总决赛',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: '滴答',
//            artists: ['侃侃'],
//            album: '《那些年 DSD》',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: 'Dvorak - Serenade for Strings Op22 in E Major larghetto',
//            artists: ['Advent Chamber Orchestra'],
//            album: 'Selections from the November 2006 Concert',
//            contentURI: 'userMusic/hanige.mp4'
//        },
//        {
//            title: 'Beethoven, Symphony No. 1, Menuetto',
//            artists: ['Bruno Walter'],
//            album: 'Bruno Walter in Concert',
//            contentURI: 'userMusic/hanige.mp4'
//        }
//
//
//    ];
//Testdata3=
//    [
//        {
//            contentURI: 'images/bp1.jpg'
//        },
//        {
//            contentURI: 'images/bp2.jpg'
//        },
//        {
//            contentURI: 'images/bp4.jpg'
//        },
//        {
//            contentURI: 'images/bp7.jpg'
//        },
//        {
//            contentURI: 'images/bp14.jpg'
//        },
//        {
//            contentURI: 'images/bp26.jpg'
//        },
//        {
//            contentURI: 'images/bp27.jpg'
//        },
//        {
//            contentURI: 'images/bp28.jpg'
//        },
//        {
//            contentURI: 'images/bp41.jpg'
//        },
//        {
//            contentURI: 'images/bp49.jpg'
//        },
//        {
//            contentURI: 'images/bp52.jpg'
//        },
//        {
//            contentURI: 'images/bp53.jpg'
//        },
//        {
//            contentURI: 'images/bp54.jpg'
//        }
//
//    ];

var angle;
var Timer=undefined;

function Tab_Click(type){
    var ScreenType = $("#Screen" + type);
    ScreenType.css("display","block");
    $("#ScreenHome").css("display","none");
    if (Timer) {
        clearInterval(Timer);
    }

        angle = 0 ;
        Timer = setInterval(function(){
            angle+=2;
            $("#"+type+"_sel img").rotate(angle);
        },50);




//    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    switch (type) {
        case "Music":
            $("#ScreenVideo").css("display","none");
            $("#ScreenPicture").css("display","none");
            myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });


            break;
        case "Video":
            $("#ScreenPicture").css("display","none");
            $("#ScreenMusic").css("display","none");
            myScroll_Video=new IScroll('#wrapper2', { mouseWheel: true, click: true });
            break;
        case "Picture":
            $("#ScreenVideo").css("display","none");
            $("#ScreenMusic").css("display","none");
            $.fn.galleryView.defaults.panel_width = 739;
            $.fn.galleryView.defaults.panel_height = 533;
            $('#myGallery').galleryView();
            break;

        default:
            break;
    }
}

function UpdateImages(content){

    $("#myGallery").empty();
    for ( var i = 0,j=1; i < content.length; i++)
    {
        $("#myGallery").append("<li><img/></li>");
        $("#myGallery").find("img").eq(i).attr("src",content[i].contentURI);

    }


}

var clearVoiceTimer=undefined;
var setVideoTimer = function( )
{

    console.log("11111111111111111111111111111111111111111111111111111111111");
    if( clearVoiceTimer != undefined )
    {
        //消去timer
        console.log("MediaPlayer in clearTimeout timeID:"+clearVoiceTimer);
        clearTimeout( clearVoiceTimer );

        clearVoiceTimer = undefined;
    }

    clearVoiceTimer = setTimeout(
        function()
        {
            console.log("MediaPlayer in setVoiceTimer timeout");

            clearVoiceTimer = undefined;
            $("#controlKey2").css("display","none");


        }.bind(this)
        ,3000);
    console.log("MediaPlayer in setVoiceTimer set time:"+clearVoiceTimer);

}

function VideoOnclick()
{
    if(isFull){
        $("#controlKey2").css("display","inherit");
        setVideoTimer();
    }

}