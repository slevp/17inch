/**
 * Created by liuankang on 14-8-21.
 */


$(document).ready(function(){
    console.log('aaaaaaaaafffff');


    $("#baidu_navibar").click(function(){
        $("#allmap").show();
        $("#iCenter").hide();
        $("#baidu_navibar").css('background-image','url(img/bd_sel.png)')
        $("#gaode_navibar").css('background-image','url(img/gd_nml.png)')
    })
    $("#gaode_navibar").click(function(){
        $("#allmap").hide();
        $("#iCenter").show();
        $("#gaode_navibar").css('background-image','url(img/gd_sel.png)')
        $("#baidu_navibar").css('background-image','url(img/bd_nml.png)')
    })


})