define("ekai/acn/1.0.0/main",["backbone","ekai/acn/1.0.0/routers/index","ekai/acn/1.0.0/views/mode-normal","jquery","underscore","ekai/acn/1.0.0/models/acn","store","ekai/acn/1.0.0/settings.json"],function(a){var b=a("backbone"),c=a("ekai/acn/1.0.0/routers/index");new c,b.history.start()}),define("ekai/acn/1.0.0/routers/index",["backbone","ekai/acn/1.0.0/views/mode-normal","jquery","underscore","ekai/acn/1.0.0/models/acn","store","ekai/acn/1.0.0/settings.json"],function(a,b,c){var d=a("backbone"),e=a("ekai/acn/1.0.0/views/mode-normal"),f=null;c.exports=d.Router.extend({routes:{"":"modePage","$mode/:mode":"modePage"},modePage:function(a){a=a||"middle",f||(f=new e,d.$("body").prepend(f.render().el)),f.changeMode(a)}})}),define("ekai/acn/1.0.0/views/mode-normal",["backbone","jquery","underscore","ekai/acn/1.0.0/models/acn","store","ekai/acn/1.0.0/settings.json"],function(a,b,c){var d=a("backbone"),e=a("jquery"),f=a("underscore"),g=a("ekai/acn/1.0.0/models/acn"),h=a("ekai/acn/1.0.0/templates/mode-normal.tpl"),i=a("store"),j=a("ekai/acn/1.0.0/settings.json"),k=j.STORAGE_KEYS,l=i.get(k.acn);l=l||{},c.exports=d.View.extend({className:"page",template:f.template(h),events:{"click .btns .item":"centerBtnsClickEvent","swipeup .circle":"windDirectionUp","swipedown .circle":"windDirectionDown","click .circle .item":"windDirectionClickEvent","click .wind .item":"windQuantityClickEvent","swipeup .wind ":"windQuantityUp","swipedown .wind ":"windQuantityDown","swipeleft .temperature .wrapper":"temperatureHigher","swiperight .temperature .wrapper":"temperatureLower","click .temperature .wrapper li":"temperatureItemClickEvent"},constructor:function(){d.View.apply(this,arguments)},initialize:function(){this.model=new g(l),this.listenTo(this.model,"change:left_wind_direction",this.windDirectionChange),this.listenTo(this.model,"change:right_wind_direction",this.windDirectionChange),this.listenTo(this.model,"change:left_wind_quantity",this.windQuantityChange),this.listenTo(this.model,"change:right_wind_quantity",this.windQuantityChange),this.listenTo(this.model,"change:left_temperature",this.temperatureChange),this.listenTo(this.model,"change:right_temperature",this.temperatureChange),this.listenTo(this.model,"change",this.saveAcnInfo)},render:function(){return this.$el.empty(),this.$el.html(this.template(this.model.attributes)),this},changeMode:function(a){switch(a){case"middle":this.$el.attr("data-mode","middle"),this.$el.removeClass("expanded");break;case"footer":this.$el.attr("data-mode","footer"),this.$el.removeClass("expanded");break;case"footer-expanded":this.$el.attr("data-mode","footer"),this.$el.addClass("expanded")}},saveAcnInfo:function(a){i.set(k.acn,a.toJSON())},centerBtnsClickEvent:function(a){var b=e(a.target),c=b.hasClass("active");if(b.hasClass("auto"))this.model.set("is_auto",!c),c?this.showWindDirection():this.hideWindDirection();else{var d={defogging:"is_defogging",ac:"is_ac","air-purifier":"is_air_purifier",pollen:"is_pollen"};for(var f in d)if(b.hasClass(f)){this.model.set(d[f],!c);break}}b.toggleClass("active")},hideWindDirection:function(){this.$el.find(".circle .active").removeClass("active"),this.$el.find(".circle .label").addClass("active")},showWindDirection:function(){var a=this.model.get("left_wind_direction"),b=this.model.get("right_wind_direction");this.$el.find(".circle.left").find("."+a).addClass("active"),this.$el.find(".circle.right").find("."+b).addClass("active"),this.$el.find(".circle .label").removeClass("active")},windDirectionUp:function(a){var b=e(a.target);if(!this.model.get("is_auto")&&b.hasClass("circle")){var c=b.hasClass("left")?"left_wind_direction":"right_wind_direction",d=this.model.get(c);switch(d){case"top":break;case"middle":this.model.set(c,"top",{el:b});break;case"bottom":this.model.set(c,"middle",{el:b})}}},windDirectionDown:function(a){var b=e(a.target);if(!this.model.get("is_auto")&&b.hasClass("circle")){var c=b.hasClass("left")?"left_wind_direction":"right_wind_direction",d=this.model.get(c);switch(d){case"top":this.model.set(c,"middle",{el:b});break;case"middle":this.model.set(c,"bottom",{el:b});break;case"bottom":}}},windDirectionChange:function(a,b,c){var d=c.el,e=d.hasClass("left")?"left_wind_direction":"right_wind_direction",f=a.previous(e);d.find("."+f).removeClass("active"),d.find("."+b).addClass("active")},windDirectionClickEvent:function(a){if(!this.model.get("is_auto")){var b=e(a.target),c=b.parent(),d=c.hasClass("left")?"left_wind_direction":"right_wind_direction";b.hasClass("top")?this.model.set(d,"top",{el:c}):b.hasClass("middle")?this.model.set(d,"middle",{el:c}):b.hasClass("bottom")&&this.model.set(d,"bottom",{el:c})}},windQuantityClickEvent:function(a){var b=e(a.target),c=b.parent(),d=c.hasClass("left")?"left_wind_quantity":"right_wind_quantity",f=parseInt(b.attr("data-quantity"));this.model.set(d,f,{el:c})},windQuantityChange:function(a,b,c){var d=c.el;d.attr("data-quantity",b);for(var e=d.hasClass("left")?"left_wind_quantity":"right_wind_quantity",f=a.previous(e),g=Math.min(b,f),h=Math.max(b,f),i=g+1;h>=i;i++)d.find(".quantity"+i).toggleClass("shown");d.find(".fan").remove(),d.prepend('<div class="fan"></div>')},windQuantityUp:function(a){var b=e(a.target);b.hasClass("wind")||(b=b.parent(".wind"));var c=b.hasClass("left")?"left_wind_quantity":"right_wind_quantity",d=this.model.get(c);d>=7?this.model.set(c,7,{el:b}):this.model.set(c,d+1,{el:b})},windQuantityDown:function(a){var b=e(a.target);b.hasClass("wind")||(b=b.parent(".wind"));var c=b.hasClass("left")?"left_wind_quantity":"right_wind_quantity",d=this.model.get(c);1>=d?this.model.set(c,1,{el:b}):this.model.set(c,d-1,{el:b})},temperatureHigher:function(a){var b=e(a.currentTarget),c=b.hasClass("left")?"left_temperature":"right_temperature",d=this.model.higherTemperature(c,1);this.model.set(c,d,{name:c,el:b})},temperatureLower:function(a){var b=e(a.currentTarget),c=b.hasClass("left")?"left_temperature":"right_temperature",d=this.model.lowerTemperature(c,1);this.model.set(c,d,{name:c,el:b})},temperatureChange:function(a,b,c){var d=c.el,f=c.name,g=this.model.getRelativeTemperature(f);d.find("li").each(function(a,b){e(b).text(g[a])})},temperatureItemClickEvent:function(a){var b=e(a.target),c=parseInt(e.trim(b.text()));if(0/0!=typeof c){var d=b.parent().parent(".wrapper"),f=d.hasClass("left")?"left_temperature":"right_temperature";this.model.set(f,c,{name:f,el:d})}}})}),define("ekai/acn/1.0.0/models/acn",["backbone"],function(a,b,c){var d=a("backbone");c.exports=d.Model.extend({defaults:{is_defogging:!1,is_ac:!0,is_auto:!1,is_air_purifier:!1,is_pollen:!1,left_wind_quantity:5,left_wind_direction:"middle",left_temperature:21,right_wind_quantity:3,right_wind_direction:"top",right_temperature:25,external_temperature:28,max_temperature:32,min_temperature:16},initialize:function(){this.on("change:left_temperature",this.temperatureChanged),this.on("change:right_temperature",this.temperatureChanged),this.temperatureChanged(this,this.get("left_temperature"),{name:"left_temperature"}),this.temperatureChanged(this,this.get("right_temperature"),{name:"right_temperature"})},temperatureChanged:function(a,b,c){var d=c.name;a.get("max_temperature"),a.get("min_temperature"),a.set("_"+d,a.lowerTemperature(d,1)),a.set("__"+d,a.lowerTemperature(d,2)),a.set(d+"_",a.higherTemperature(d,1)),a.set(d+"__",a.higherTemperature(d,2))},higherTemperature:function(a,b){var c=this.get(a);b=b||1;var d=this.get("max_temperature"),e=this.get("min_temperature");return c+b>d?c=c+b-d-1+e:c+=b,c},lowerTemperature:function(a,b){var c=this.get(a);b=b||1;var d=this.get("max_temperature"),e=this.get("min_temperature");return e>c-b?c=d-(e-(c-b)-1):c-=b,c},getRelativeTemperature:function(a){return[this.get("__"+a),this.get("_"+a),this.get(a),this.get(a+"_"),this.get(a+"__")]}})}),define("ekai/acn/1.0.0/templates/mode-normal.tpl",[],'<div class="external-temperature">\n    外部温度：<span class="value">{{=external_temperature}}</span><span>℃</span>\n</div>\n<div class="center-area">\n    <div class="circle left">\n        <div class="top item {{=(!is_auto && left_wind_direction == \'top\') ? \' active\' : \'\'}}"></div>\n        <div class="middle item {{=(!is_auto && left_wind_direction == \'middle\') ? \' active\' : \'\'}}"></div>\n        <div class="bottom item {{=(!is_auto && left_wind_direction == \'bottom\') ? \' active\': \'\'}}"></div>\n        <div class="label {{=is_auto ? \'active\' : \'\'}}">AUTO</div>\n    </div>\n    <div class="btns">\n        <div class="item defogging {{=is_defogging ? \'active\': \'\'}}"></div>\n        <div class="item ac {{=is_ac ? \'active\': \'\'}}"></div>\n        <div class="item auto {{=is_auto ? \'active\': \'\'}}"></div>\n        <div class="item air-purifier {{=is_air_purifier ? \'active\': \'\'}}"></div>\n        <div class="item pollen {{=is_pollen ? \'active\': \'\'}}"></div>\n    </div>\n    <div class="circle right">\n        <div class="top item {{=(!is_auto && right_wind_direction == \'top\') ? \' active\' : \'\'}}"></div>\n        <div class="middle item {{=(!is_auto && right_wind_direction == \'middle\') ? \' active\' : \'\'}}"></div>\n        <div class="bottom item {{=(!is_auto && right_wind_direction == \'bottom\') ? \' active\' : \'\'}}"></div>\n        <div class="label {{=is_auto ? \'active\' : \'\'}}">AUTO</div>\n    </div>\n</div>\n<div class="wind left" data-quantity="{{=left_wind_quantity}}">\n    <div class="fan"></div>\n    {{\n    for (var i = 7; i > 0; i--) {\n    }}\n    <div class="item quantity{{=i}} {{=(left_wind_quantity >= i) ? \'shown\': \'\'}}" data-quantity="{{=i}}"></div>\n    {{\n    }\n    }}\n</div>\n<div class="wind right" data-quantity="{{=right_wind_quantity}}">\n    <div class="fan"></div>\n    {{\n    for (var i = 7; i > 0; i--) {\n    }}\n    <div class="item quantity{{=i}} {{=(right_wind_quantity >= i) ? \'shown\': \'\'}}" data-quantity="{{=i}}"></div>\n    {{\n    }\n    }}\n</div>\n<div class="temperature">\n    <div id="temperature-left" class="wrapper left">\n        <ul>\n            <li>{{=__left_temperature}}</li>\n            <li class="bigger">{{=_left_temperature}}</li>\n            <li class="biggest">{{=left_temperature}}</li>\n            <li class="bigger">{{=left_temperature_}}</li>\n            <li>{{=left_temperature__}}</li>\n        </ul>\n        <div class="circle"></div>\n    </div>\n    <div class="label">℃</div>\n    <div id="temperature-right" class="wrapper right">\n        <ul class="temperature-list">\n            <li>{{=__right_temperature}}</li>\n            <li class="bigger">{{=_right_temperature}}</li>\n            <li class="biggest">{{=right_temperature}}</li>\n            <li class="bigger">{{=right_temperature_}}</li>\n            <li>{{=right_temperature__}}</li>\n        </ul>\n        <div class="circle"></div>\n    </div>\n</div>'),define("ekai/acn/1.0.0/settings.json",[],{STORAGE_KEYS:{acn:"acn_basic_info"}});