/**
 * Created by liuankang on 14-7-7.
 */

$(document).ready(function () {
    radomdata();
    var $Para1=$("#dummy_left_chart1");
    $Para1.show();
});

var date_test = new Date(); //日期对象

//初始化chart X轴时间
function dateinit(){
    document.getElementById("timer_1").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();

    var rpid = "timer_";
    for(i=2;i<=7;i++){
        rpid = rpid.slice(0,6);
        rpid = rpid+i;
        date_test.setDate(date_test.getDate()+1);
        document.getElementById(rpid).innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    }

    /*
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_2").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_3").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_4").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_5").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_6").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_7").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    */
}


var date_flg = -1;  //X轴切换用flg

//轴切换下一周
function nextweek(){
    alert(date_test);
    var day = 1;
    if(0 == date_flg){
        day = 7;
    }
    date_test.setDate(date_test.getDate()+day);
    document.getElementById("timer_1").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();

    var rpid = "timer_";
    for(i=2;i<=7;i++){
        rpid = rpid.slice(0,6);
        rpid += i;
        date_test.setDate(date_test.getDate()+1);
        document.getElementById(rpid).innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    }

    /*
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_2").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_3").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_4").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_5").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_6").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()+1);
    document.getElementById("timer_7").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    */

    date_flg =1;
    radomdata();
}

//轴切换上一周
function lastweek(){
    var day = 1;
    if(1 == date_flg){
        day = 7;
    }
    date_test.setDate(date_test.getDate()-day);
    document.getElementById("timer_7").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();

    var rpid = "timer_";
    for(i=6;i>=1;i--){
        rpid = rpid.slice(0,6);
        rpid += i;
        date_test.setDate(date_test.getDate()-1);
        document.getElementById(rpid).innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    }

    /*
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_6").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_5").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_4").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_3").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_2").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    date_test.setDate(date_test.getDate()-1);
    document.getElementById("timer_1").innerHTML = (date_test.getMonth()+1)+"/"+date_test.getDate();
    */

    date_flg =0;

    //随机
    radomdata();
}


































