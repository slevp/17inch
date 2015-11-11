/**
 * Created by liuankang on 14-7-15.
 */

var sumplus;
var summinus;
var sumturn;


//急加速，急减速，急转弯随机生成函数
function radomnum(){
    var i = Math.random();          //获得0-1的随机数
    var r = Math.ceil(i*25);       //乘以10并向上去整
    return (r);
}
//每周分数随机生成函数
function radomscore(){
    var i = Math.random();
    var r =60+ Math.ceil(i*39);
    return (r);
}
//每周平均速度随机生成函数
function radomspeedave(){
    var i = Math.random();
    var r =40+ Math.ceil(i*39);
    return (r);
}
//每周最高速度随机生成函数
function radomhighspeed(){
    var i = Math.random();
    var r =100+ Math.ceil(i*50);
    return (r);
}
//每周油耗随机生成函数
function radomfuel(){
    var i = Math.random();
    var r =5+ Math.ceil(i*4);
    return (r);
}

function radomtime(){
    var i = Math.random();
    var r1 = Math.ceil(i*60);
    var r2 = Math.ceil(i*23);
    return (r2+":"+r1);
}


function radomdata(){
    var rdata;

    sumplus=0;
    summinus=0;
    sumturn=0;

    for(i=0;i<7;i++){
        rdata = radomnum();
        speedup[i] = rdata;
        sumplus=sumplus+rdata;
    }
    changePlusWeek(sumplus);         //更改底部急加速次数

    for(i=0;i<7;i++){
        rdata = radomnum();
        speeddown[i] = rdata;
        summinus=summinus+rdata;
    }

    changeMinusWeek(summinus);      //更改底部急减速次数

    for(i=0;i<7;i++){
        rdata = radomnum();
        turn[i] = rdata;
        sumturn=sumturn+rdata;
    }
    changeTurnWeek(sumturn);        //更改底部急转弯次数
    // alert(speedup);

    dummychart.series[0].data = speedup;
    dummychart.series[1].data = speeddown;
    dummychart.series[2].data = turn;
    var chart = new Highcharts.Chart(dummychart);    //生成表格，前面相当于给表格赋值
}
