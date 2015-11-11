/**
 * Created by liuankang on 14-7-11.
 */
//给图中每个文字的id添加上替换动作

function refreshTime(){
    setInterval("refreshContent()",1500);
    dateinit();
}

//dummy_down 区域内的转换动作
//分数、急加速、急减速、急转弯每周统计
function changeScoreWeek( number){

     document.getElementById("dummy_down_score_1").innerHTML=number;

};
function changePlusWeek(number){
    document.getElementById("speed_plus_1").innerHTML=number;
};

function changePlusTimeWeek(number){
    document.getElementById("plus_time_1").innerHTML=number;
};

function changeMinusWeek(number){
    document.getElementById("speed_minus_1").innerHTML=number;
};

function changeMinusTimeWeek(number){
    document.getElementById("minus_time_1").innerHTML=number;
};
function changeTurnWeek(number){
    document.getElementById("turn_num").innerHTML=number;
};
function changeTurnTimeWeek(number){
    document.getElementById("turn_time_1").innerHTML=number;
};

//速度和油量的每周统计
function changeSpeedAveWeek(number){
    document.getElementById("speed_ave_week").innerHTML=number;
};
function changeSpeedMaxWeek(number){
    document.getElementById("speed_max_week").innerHTML=number;
};
function changeFuelWeek(number){
    document.getElementById("fuel_ave_week").innerHTML=number;
};

//dummy_Middle区域内的转换动作
function changeScoreAve(number){
    document.getElementById("score_ave").innerHTML=number;
};

//dummy_Right 区域内的转换动作
function changeTotalMile(number){
    document.getElementById("total_mile").innerHTML=number;
};
function changeSpeedAve(number){
    document.getElementById("speed_ave").innerHTML=number;
};
function changeFuelAve(number){
    document.getElementById("fuel_ave").innerHTML=number;
};
function changeSpeedMax(number){
    document.getElementById("speed_max").innerHTML=number;
};

