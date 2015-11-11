define("ekai/phone/1.0.0/main",["backbone","ekai/phone/1.0.0/routers/index","ekai/phone/1.0.0/views/index","underscore","ekai/phone/1.0.0/views/dial","topivi","ekai/phone/1.0.0/views/dialing","ekai/phone/1.0.0/views/contact","iscroll","ekai/phone/1.0.0/views/contact-item","ekai/phone/1.0.0/views/recent","ekai/phone/1.0.0/views/favorites","ekai/phone/1.0.0/contacts.json","ekai/phone/1.0.0/collections/contact","ekai/phone/1.0.0/models/contact"],function(a){var b=a("backbone");b.$;var c=a("ekai/phone/1.0.0/routers/index");new c,b.history.start()}),define("ekai/phone/1.0.0/routers/index",["backbone","ekai/phone/1.0.0/views/index","underscore","ekai/phone/1.0.0/views/dial","topivi","ekai/phone/1.0.0/views/dialing","ekai/phone/1.0.0/views/contact","iscroll","ekai/phone/1.0.0/views/contact-item","ekai/phone/1.0.0/views/recent","ekai/phone/1.0.0/views/favorites","ekai/phone/1.0.0/contacts.json","ekai/phone/1.0.0/collections/contact","ekai/phone/1.0.0/models/contact"],function(a,b,c){var d=a("backbone"),e=a("ekai/phone/1.0.0/views/index"),f=null;c.exports=d.Router.extend({routes:{"":"homePage"},homePage:function(a){a=a||"all",f||(f=new e),d.$("body").prepend(f.render().el)}})}),define("ekai/phone/1.0.0/views/index",["backbone","underscore","ekai/phone/1.0.0/views/dial","topivi","ekai/phone/1.0.0/views/dialing","ekai/phone/1.0.0/views/contact","iscroll","ekai/phone/1.0.0/views/contact-item","ekai/phone/1.0.0/views/recent","ekai/phone/1.0.0/views/favorites","ekai/phone/1.0.0/contacts.json","ekai/phone/1.0.0/collections/contact","ekai/phone/1.0.0/models/contact"],function(a,b,c){var d=a("backbone"),e=a("underscore"),f=d.$,g=a("ekai/phone/1.0.0/templates/app-phone.tpl"),h=a("ekai/phone/1.0.0/views/dial"),i=a("ekai/phone/1.0.0/views/contact"),j=a("ekai/phone/1.0.0/views/recent"),k=a("ekai/phone/1.0.0/views/favorites"),l=a("ekai/phone/1.0.0/contacts.json"),m=a("ekai/phone/1.0.0/collections/contact");c.exports=d.View.extend({className:"app-phone",template:e.template(g),events:{"click .nav-btns .item":"navItemClickEvent","click .dialing":"dialingClickEvent"},constructor:function(){d.View.apply(this,arguments)},initialize:function(){this.currentPage="dial",this.contactsCollection=new m(l),this.dialView=new h({collection:this.contactsCollection}),this.contactView=new i({collection:this.contactsCollection}),this.contactView.indexView=this,this.currentView=this.dialView,this.on("switchPage",this.switchPage),this.recentView=new j({collection:this.contactsCollection}),this.favoritesView=new k({collection:this.contactsCollection})},render:function(){this.delegateEvents(),this.$el.empty(),this.$el.html(this.template({page:this.currentPage}));var a;switch(this.currentPage){case"dial":this.dialView.$el=this.$el.find(".dial-page"),a=this.dialView;break;case"phone-book":this.contactView.$el=this.$el.find(".phone-book-page"),a=this.contactView;break;case"recent-call":this.recentView.$el=this.$el.find("recent-call-pag"),a=this.recentView;break;case"favorites":this.favoritesView.$el=this.$el.find("favorites-page"),a=this.favoritesView}return a.render(),this.$el.find(".page.active").removeClass("active"),a.$el.addClass("active"),this.currentView=a,this},navItemClickEvent:function(a){var b=f(a.target),c=b.attr("data-page");c!=this.currentPage&&(this.$el.find(".nav-btns .active").removeClass("active"),b.addClass("active"),this.currentPage=c,this.render())},switchPage:function(a){a=a||{page:"dial"},this.currentPage=a.page,this.render(),a.fn&&this.currentView[a.fn].call(this.currentView,a)},saveToRecent:function(){}},{tag:"phone"})}),define("ekai/phone/1.0.0/templates/app-phone.tpl",[],'<div class="nav-btns">\n    <div class="item favorites {{=page == \'favorites\' ? \'active\' : \'\'}}" data-page="favorites"></div>\n    <div class="item recent-call {{=page == \'recent-call\' ? \'active\' : \'\'}}" data-page="recent-call"></div>\n    <div class="item phone-book {{=page == \'phone-book\' ? \'active\' : \'\'}}" data-page="phone-book"></div>\n    <div class="item dial {{=page == \'dial\' ? \'active\' : \'\'}}" data-page="dial"></div>\n</div>\n<div class="favorites-page page">\n</div>\n<div class="recent-call-page page">\n</div>\n<div class="phone-book-page page">\n</div>\n<div class="dial-page page">\n</div>'),define("ekai/phone/1.0.0/views/dial",["backbone","underscore","topivi","ekai/phone/1.0.0/views/dialing"],function(a,b,c){var d=a("backbone"),e=a("underscore"),f=d.$,g=a("topivi"),h=a("ekai/phone/1.0.0/templates/dial-page.tpl"),i=a("ekai/phone/1.0.0/views/dialing");c.exports=d.View.extend({template:e.template(h),events:{"click .dial-btns .numbers>div":"numberClickEvent","click .dial-top .dial-delete":"dialDeleteClickEvent","click .dialing":"dialingClickEvent","taphold .dial-delete":"dialDeleteHoldEvent"},constructor:function(){d.View.apply(this,arguments)},initialize:function(){this.dialingView=new i,this.listenTo(this.dialingView,"hangUp",this.hangUpEvent)},render:function(){var a=this;return this.delegateEvents(),this.$el.empty(),this.$el.html(this.template()),this.dialingView.$el=this.$el.find(".dialing-pad"),this.cursorInterval&&clearInterval(this.cursorInterval),this.cursorInterval=setInterval(function(){a.$el.find(".dial-cursor").toggleClass("hide")},500),this},numberClickEvent:function(a){var b=f(a.target).attr("data-value"),c=this.$el.find(".dial-top .dial-number"),d=c.text();d+=b,c.text(d)},dialDeleteClickEvent:function(){var a=this.$el.find(".dial-top .dial-number"),b=a.text();b&&(b=b.substring(0,b.length-1)),a.text(b)},dialingClickEvent:function(){var a=new g.dialog.normal("",{removeAfterClose:!0,content:"未接入模块，请稍后再试...",useMask:!0,closeGesture:"clickmask swiperight"});a.el.addClass("phone"),a.open()},dialDeleteHoldEvent:function(){this.$el.find(".dial-top .dial-number").text("")},hangUpEvent:function(){this.dialingView.$el.hide(),this.$el.find(".dial-pad").show()}})}),define("ekai/phone/1.0.0/templates/dial-page.tpl",[],'<div class="dial-pad">\n    <div class="dial-top">\n        <div class="dial-number"></div>\n        <div class="dial-delete"></div>\n        <div class="dial-cursor">_</div>\n    </div>\n    <div class="dial-btns">\n        <div class="numbers">\n            <div class="number1" data-value="1"></div>\n            <div class="number2" data-value="2"></div>\n            <div class="number3" data-value="3"></div>\n            <div class="number4" data-value="4"></div>\n            <div class="number5" data-value="5"></div>\n            <div class="number6" data-value="6"></div>\n            <div class="number7" data-value="7"></div>\n            <div class="number8" data-value="8"></div>\n            <div class="number9" data-value="9"></div>\n            <div class="number-mi" data-value="*"></div>\n            <div class="number0" data-value="0"></div>\n            <div class="number-jin" data-value="#"></div>\n        </div>\n        <div class="dialing"></div>\n    </div>\n</div>\n<div class="dialing-pad">\n</div>'),define("ekai/phone/1.0.0/views/dialing",["backbone","underscore"],function(a,b,c){var d=a("backbone"),e=a("underscore");d.$;var f=a("ekai/phone/1.0.0/templates/dial-page-dialing.tpl");c.exports=d.View.extend({className:"app-phone",template:e.template(f),events:{"click .hang-up-btn":"hangUpClickEvent"},constructor:function(){d.View.apply(this,arguments)},initialize:function(){},render:function(){return this.delegateEvents(),this.$el.empty(),this.$el.html(this.template(this.model.attributes)),this.$el.find(".outer").addClass("diffusion"),this.$el.find(".outer-bigger").addClass("diffusion"),this},hangUpClickEvent:function(){this.$el.find(".outer").removeClass("diffusion"),this.trigger("hangUp")}})}),define("ekai/phone/1.0.0/templates/dial-page-dialing.tpl",[],'<div class="dialing-info">\n    <div class="title"><span class="number">{{=number}}</span><span class="connecting">连接中...</span></div>\n    <div class="layers">\n        <div class="layer outer-bigger"></div>\n        <div class="layer outer"></div>\n        <div class="layer inner"></div>\n        <img class="layer avatar" src="{{=avatar}}"/>\n        <div class="layer inner-center">\n            <p class="name">{{=name}}</p>\n        </div>\n    </div>\n    <div class="attribution">{{=attribution}}</div>\n</div>\n<div class="hang-up-btn"></div>\n'),define("ekai/phone/1.0.0/views/contact",["backbone","underscore","iscroll","ekai/phone/1.0.0/views/contact-item"],function(a,b,c){var d=a("backbone"),e=a("underscore"),f=d.$,g=a("iscroll"),h=a("ekai/phone/1.0.0/templates/contact-page.tpl"),i=a("ekai/phone/1.0.0/views/contact-item");c.exports=d.View.extend({template:e.template(h),events:{"click .off-hook":"offHookClick"},constructor:function(){d.View.apply(this,arguments)},initialize:function(){},render:function(){var a=this;this.delegateEvents(),this.$el.empty(),this.$el.html(this.template());var b=this.$el.find("#contact-list ul"),c=this.collection.sortBy("sorter");return e.each(c,function(a,c,d){if(c>0){var e=d[c-1],f=a.get("sorter"),g=e.get("sorter");a.set("is_show_index",!(f==g))}else a.set("is_show_index",!0);var h=new i({model:a});b.append(h.render().el)}),setTimeout(function(){a.scroll=new g("#contact-list",{hScroll:!1,vScrollbar:!1}),a.letterScroll=new g("#letter-list",{hScroll:!1,vScrollbar:!1})},100),this},offHookClick:function(a){var b=f(a.target);this.indexView.trigger("switchPage",{page:"dial",fn:"dialingClickEvent",number:b.prev(".number").text()}),this.indexView.trigger("saveToRecent",{})}})}),define("ekai/phone/1.0.0/templates/contact-page.tpl",[],'<div id="contact-list">\n    <ul>\n\n    </ul>\n</div>\n<div id="letter-list">\n    <ul>\n        <li></li><li></li><li></li>\n        {{\n            var code = \'A\'.charCodeAt();\n            for (var i = 0; i < 26; i++) {\n        }}\n            <li class="{{=(i == 0) ? \'bigger\': \'\'}}">{{= String.fromCharCode(code + i)}}</li>\n        {{\n            }\n        }}\n        <li></li><li></li><li></li>\n    </ul>\n    <div class="circle"></div>\n</div>'),define("ekai/phone/1.0.0/views/contact-item",["backbone","underscore"],function(a,b,c){var d=a("backbone"),e=a("underscore");d.$;var f=a("ekai/phone/1.0.0/templates/contact-page-item.tpl");c.exports=d.View.extend({tagName:"li",template:e.template(f),constructor:function(){d.View.apply(this,arguments)},initialize:function(){},render:function(){return this.$el.html(this.template(this.model.attributes)),this}})}),define("ekai/phone/1.0.0/templates/contact-page-item.tpl",[],'<div class="index">{{=is_show_index ? sorter : \'\'}}</div>\n<div class="info">\n    <div class="name">{{=name}}</div>\n    <div class="number">{{=number}}</div>\n    <div class="off-hook"></div>\n</div>'),define("ekai/phone/1.0.0/views/recent",["backbone","underscore"],function(a,b,c){var d=a("backbone");a("underscore"),d.$,c.exports=d.View.extend({constructor:function(){d.View.apply(this,arguments)},initialize:function(){this.on("hangUp",this.recent)},render:function(){return this},recent:function(){}})}),define("ekai/phone/1.0.0/views/favorites",["backbone","underscore"],function(a,b,c){var d=a("backbone");a("underscore"),d.$,c.exports=d.View.extend({constructor:function(){d.View.apply(this,arguments)},initialize:function(){},render:function(){return this}})}),define("ekai/phone/1.0.0/contacts.json",[],[{id:"1",name:"蔡亦迪",number:"13818812627",attribution:"上海·移动",avatar:"img/linyoujia.jpg",sorter:"C"},{id:"2",name:"傅文松",number:"13167181237",attribution:"上海·联通",avatar:"img/yangzongwei.jpg",sorter:"F"},{id:"3",name:"法律在线",number:"110",attribution:"中国",avatar:"img/110.jpg",sorter:"F"},{id:"4",name:"億凯信息技术",number:"51314558",attribution:"中国·上海",avatar:"img/110.jpg",sorter:"Y"},{id:"5",name:"新国际博览中心",number:"51801133",attribution:"中国·上海",avatar:"img/xinguoji.png",sorter:"X"},{id:"6",name:"中国移动",number:"10086",attribution:"中国移动",sorter:"Z"},{id:"7",name:"联通",number:"10010",attribution:"联通",sorter:"L"},{id:"8",name:"电信",number:"10000",attribution:"电信",sorter:"D"},{id:"9",name:"查询电话号码",number:"114",attribution:"中国·上海",sorter:"C"},{id:"10",name:"天气预报",number:"121",attribution:"中国·上海",sorter:"X"},{id:"11",name:"报时服务",number:"121",attribution:"中国·上海",sorter:"B"},{id:"12",name:"水务热线",number:"84500",attribution:"中国·上海",sorter:"S"},{id:"13",name:"消协热线",number:"12315",attribution:"中国·上海",sorter:"X"},{id:"14",name:"打假热线",number:"63177329",attribution:"中国·上海",sorter:"D"},{id:"15",name:"环卫热线",number:"52901111",attribution:"中国·上海",sorter:"H"},{id:"16",name:"煤气热线",number:"83777",attribution:"中国·上海",sorter:"M"},{id:"17",name:"邮政服务",number:"185",attribution:"中国·上海",sorter:"Y"},{id:"18",name:"公安报警",number:"110",attribution:"中国·上海",sorter:"G"},{id:"19",name:"阿甘",number:"15245691212",attribution:"中国·上海",sorter:"A"}]),define("ekai/phone/1.0.0/collections/contact",["ekai/phone/1.0.0/models/contact","backbone","underscore"],function(a,b,c){var d=a("ekai/phone/1.0.0/models/contact"),e=a("backbone");a("underscore"),e.$,c.exports=e.Collection.extend({model:d,initialize:function(){}})}),define("ekai/phone/1.0.0/models/contact",["backbone","underscore"],function(a,b,c){var d=a("backbone");a("underscore"),d.$,c.exports=d.Model.extend({defaults:{name:"",attribution:"Unknown",avatar:"img/kuaizixiongdi.jpg"},initialize:function(){}})});