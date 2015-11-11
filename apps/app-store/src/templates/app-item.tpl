{{
if (installed) {
}}
<div class="uninstall"></div>
{{
}
}}
<a class="link">
    <div class="download-progress"></div>
    <div class="left">
        <img alt="{{=name}}" class="thumbnail" src="{{=thumbnail}}"/>
        <ul class="rating stars">
          {{
            for (var i = 0; i < rating; i++) {
          }}
            <li class="star active"></li>
          {{
            }
          }}
            {{
            for (var i = rating; i < 5; i++) {
            }}
            <li class="star"></li>
            {{
            }
            }}
        </ul>
    </div>
    <div class="right">
        <h1 class="name">{{=name}}</h1>
        <p class="version-number">版本：<span class="value">{{=version_number}}</span></p>
        <p class="size">大小：<span class="value">{{=size_name}}</span></p>
        <div class="install {{=!is_enabled ? 'disabled' : ''}}">{{=installed ? '打开' : (charge > 0 ? '￥' + charge : '免费')}}</div>
        <div class="btns">
            <div class="small-btn pause"></div>
            <div class="small-btn stop"></div>
        </div>
        <div class="loading"></div>
    </div>
</a>