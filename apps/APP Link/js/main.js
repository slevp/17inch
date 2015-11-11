/**
 * Created by caiyidi on 14/07/31.
 */
//var timerID = 0;
$(document).ready(function () {
    var timerID = 0;
    var ConnectTimer=setInterval (function () {
        if (timerID == 0) {
            $("#Connect1 .ConnectD").css("display","block");
            $("#pic1 .pictureF").css("display","block");
            $("#Connect1 .ConnectD").animate({top:"485px"},4000);
            $("#pic1 .pictureF").animate({left:"120px"},4000);

            $("#Connect1 .ConnectE").css("display","block");

        }
        else if (timerID == 1) {
            $("#Connect1 .ConnectE").css("display","none");
            $("#Connect1 .ConnectB").css("display","block");

        }

        else if (timerID == 2) {
            $("#Connect1 .ConnectB").css("display","none");
            $("#Connect1 .ConnectC").css("display","block");

        }
        else if (timerID == 3) {
            $("#Connect1 .ConnectC").css("display","none");
            $("#Connect1 .ConnectF").css("display","block");
        }
        else if (timerID == 4) {
            $("#Connect1 .ConnectF").css("display","none");
        }

        timerID++;
        if (timerID > 5) {
            $("#Connect1 .ConnectD").css("display","none");
            $("#pic1 .pictureF").css("display","none");
            $("#Connect1 .ConnectD").animate({top:"566px"},0);
            $("#pic1 .pictureF").animate({left:"0px"},0);
            timerID = 0;
        }

    },1000);


});
var rotating = true ;
var angle = 0;
var progressRotate;
progressRotate = setInterval(function(){
    angle+=2;
    $(".pictureB").rotate(angle);
},50);





