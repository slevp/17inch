/**
 * Created by liuankang on 14-8-21.
 */
var mapObj,toolBar;
function mapInit(){
    mapObj = new AMap.Map("iCenter",{
        center:new AMap.LngLat(121.462418,31.226781), //中心点坐标
        level:16  //缩放等级
    });
    //在地图中添加ToolBar插件
    mapObj.plugin(["AMap.ToolBar"],function(){
        toolBar = new AMap.ToolBar();
        var offset = toolBar.getOffset();
        offset.x=10; offset.y=150;
        toolBar.setOffset( offset);
        mapObj.addControl(toolBar);
    });
    //比例尺插件
    mapObj.plugin(["AMap.Scale"],function(){
        scale = new AMap.Scale();
        mapObj.addControl(scale);
    });


    //地形切换插件/路况显示
    mapObj.plugin(["AMap.MapType"],function(){
        //地图类型切换
        type= new AMap.MapType({defaultType:0});//初始状态使用2D地图
        mapObj.addControl(type);
    });

    //鹰眼插件
    mapObj.plugin(["AMap.OverView"],function(){
        overView = new AMap.OverView({
            visible:true
        });
        mapObj.addControl(overView);
    });

}

function double_mapinit(){
    mapInit();
    bd_mapinit()
}