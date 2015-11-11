<div class="external-temperature">
    外部温度：<span class="value">{{=external_temperature}}</span><span>℃</span>
</div>
<div class="center-area">
    <div class="circle left">
        <div class="top item {{=(!is_auto && left_wind_direction == 'top') ? ' active' : ''}}"></div>
        <div class="middle item {{=(!is_auto && left_wind_direction == 'middle') ? ' active' : ''}}"></div>
        <div class="bottom item {{=(!is_auto && left_wind_direction == 'bottom') ? ' active': ''}}"></div>
        <div class="label {{=is_auto ? 'active' : ''}}">AUTO</div>
    </div>
    <div class="btns">
        <div class="item defogging {{=is_defogging ? 'active': ''}}"></div>
        <div class="item ac {{=is_ac ? 'active': ''}}"></div>
        <div class="item auto {{=is_auto ? 'active': ''}}"></div>
        <div class="item air-purifier {{=is_air_purifier ? 'active': ''}}"></div>
        <div class="item pollen {{=is_pollen ? 'active': ''}}"></div>
    </div>
    <div class="circle right">
        <div class="top item {{=(!is_auto && right_wind_direction == 'top') ? ' active' : ''}}"></div>
        <div class="middle item {{=(!is_auto && right_wind_direction == 'middle') ? ' active' : ''}}"></div>
        <div class="bottom item {{=(!is_auto && right_wind_direction == 'bottom') ? ' active' : ''}}"></div>
        <div class="label {{=is_auto ? 'active' : ''}}">AUTO</div>
    </div>
</div>
<div class="wind left" data-quantity="{{=left_wind_quantity}}">
    <div class="fan"></div>
    {{
    for (var i = 7; i > 0; i--) {
    }}
    <div class="item quantity{{=i}} {{=(left_wind_quantity >= i) ? 'shown': ''}}" data-quantity="{{=i}}"></div>
    {{
    }
    }}
</div>
<div class="wind right" data-quantity="{{=right_wind_quantity}}">
    <div class="fan"></div>
    {{
    for (var i = 7; i > 0; i--) {
    }}
    <div class="item quantity{{=i}} {{=(right_wind_quantity >= i) ? 'shown': ''}}" data-quantity="{{=i}}"></div>
    {{
    }
    }}
</div>
<div class="temperature">
    <div id="temperature-left" class="wrapper left">
        <ul>
            <li>{{=__left_temperature}}</li>
            <li class="bigger">{{=_left_temperature}}</li>
            <li class="biggest">{{=left_temperature}}</li>
            <li class="bigger">{{=left_temperature_}}</li>
            <li>{{=left_temperature__}}</li>
        </ul>
        <div class="circle"></div>
    </div>
    <div class="label">℃</div>
    <div id="temperature-right" class="wrapper right">
        <ul class="temperature-list">
            <li>{{=__right_temperature}}</li>
            <li class="bigger">{{=_right_temperature}}</li>
            <li class="biggest">{{=right_temperature}}</li>
            <li class="bigger">{{=right_temperature_}}</li>
            <li>{{=right_temperature__}}</li>
        </ul>
        <div class="circle"></div>
    </div>
</div>