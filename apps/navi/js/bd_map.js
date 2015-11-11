var map;
console.log("ssssssssssss")
//var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
function bd_mapinit(){
map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(121.603857, 31.202331), 16);     // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
map.addControl(new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1}));              //添加缩略地图控件
map.enableScrollWheelZoom();                            //启用滚轮放大缩小
map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的


//    map.addControl(ctrl_ove);

}