(function ($) {
    $(document).ready(function () {
        $('.nav .item').click(function () {
            if ($(this).hasClass('active')) {
                return;
            }
            if ($(this).hasClass('baidu')) {
                activeMap('baidu');
                $('.amap-logo').attr('src','img/baidu_logo.png');
                $('.amap-logo').css({'width':'77px','height':'32px'});
                $('.amap-copyright').text('© 2014 Baidu - Data © NavInfo & CenNavi & 道道通');

                $('.nav .item.active').removeClass('active');
                $(this).addClass('active');
            } else if ($(this).hasClass('gaode')) {return;
                activeMap('gaode');
                $('.amap-logo').attr('src','img/gaode_logo.png');
                $('.amap-logo').css({'width':'67px','height':'16px'});
                $('.amap-copyright').text('地图数据 ©2014 AutoNavi - GS(2014)6002号');

                $('.nav .item.active').removeClass('active');
                $(this).addClass('active');
            }
        });
        var checkLoadedInterval = setInterval(function () {
            if (BMap) {
                clearInterval(checkLoadedInterval);
                $('.nav .item.baidu').trigger('click');
            }
        }, 100);
    });
    var maps = {};
    var baiduDefaultPosition = {
        x: 121.599073,
        y: 31.215088
    };
    var gaodeDefaultPosition = {
        x: 121.472418,
        y: 31.226781
    };
    var activeMap = function (name) {
        var activeMapEl = null;
        switch (name) {
            case 'baidu': {
                if (!maps[name]) {
                    maps[name] = createBaiduMapMobile({
                        id: 'baidu-map',
                        level: 16,
                        position: baiduDefaultPosition
                    });
                }
                activeMapEl = $('#baidu-map');
                break;
            }
            case 'gaode': {
                if (!maps[name]) {
                    maps[name] = createGaodeMap({
                        id: 'gaode-map',
                        level: 16,
                        position: gaodeDefaultPosition
                    });
                }
                activeMapEl = $('#gaode-map');
                break;
            }
        }
        $('.content .map.active').removeClass('active');
        if (activeMapEl) {
            activeMapEl.addClass('active');
        }
    };
    var createGaodeMap = function (options) {
        options = options || {};
        var level = options.level || 16;
        var position = options.position;
        var map = new AMap.Map(options.id, {
            center: new AMap.LngLat(position.x, position.y), //中心点坐标
            level: level  //缩放等级
        });
        //在地图中添加ToolBar插件
        map.plugin(["AMap.ToolBar"], function() {
            var toolBar = new AMap.ToolBar();
            var offset = toolBar.getOffset();
            offset.x = 10;
            offset.y = 150;
            toolBar.setOffset(offset);
            map.addControl(toolBar);
        });
        //比例尺插件
        map.plugin(["AMap.Scale"], function() {
            var scale = new AMap.Scale();
            map.addControl(scale);
        });
        //地形切换插件/路况显示
        map.plugin(["AMap.MapType"], function() {
            //地图类型切换
            var type = new AMap.MapType({
                defaultType: 0
            });
            //初始状态使用2D地图
            map.addControl(type);
        });
        //鹰眼插件
        map.plugin(["AMap.OverView"],function(){
            var overView = new AMap.OverView({
                visible:true
            });
            map.addControl(overView);
        });
        return map;
    };
    var createBaiduMap = function (options) {
        options = options || {};
        var level = options.level || 16;
        var position = options.position;
        var map = new BMap.Map(options.id);

        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(position.x, position.y), level);
        // 添加平移缩放控件
        map.addControl(new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        }));
        // 添加比例尺控件
        map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT}));
        //添加缩略地图控件
        map.addControl(new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT, isOpen:1}));
        //启用滚轮放大缩小
        map.enableScrollWheelZoom();
        // 设置地图显示的城市 此项是必须设置的
        map.setCurrentCity("上海");
        map.disableDragging();     //禁止拖拽
        setTimeout(function(){
            map.enableDragging();   //两秒后开启拖拽
            //map.enableInertialDragging();   //两秒后开启惯性拖拽
        }, 2000);
        window.map = map;
        return map;
    };
    var createBaiduMapMobile = function (options) {
        options = options || {};
        var level = options.level || 16;
        var position = options.position;
        var map = new BMap.Map(options.id);
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(new BMap.Point(position.x, position.y), level);
        //添加地图缩放控件
        map.addControl(new BMap.ZoomControl());
        // 添加比例尺控件
        map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));
        // 设置地图显示的城市 此项是必须设置的
//        map.setCurrentCity("上海");
        window.map = map;
        return map;
    };
}) (jQuery);