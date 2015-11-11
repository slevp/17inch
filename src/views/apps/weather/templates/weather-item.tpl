<div class="small">
    <div class="top-info">
        <span class="month-date">{{=date.substring(5, date.length)}}</span>
        <span class="day">{{=day}}</span>
    </div>
    <img class="weather-icon" src="{{=iconPathDarker}}"/>
</div>
<div class="big">
    <div class="top-info">
        <div class="left-part">
            <span class="city-icon"></span>
            <span class="city">{{=city}}</span>
        </div>
        <div class="right-part">
            <span class="date">{{=date}}</span>
            <span class="day">周{{=day}}</span>
        </div>
    </div>
    <p class="status">{{=status}}</p>
    <div class="temperature">
        <span class="value">{{=temperature.from}}</span>
        <span class="unit">℃</span>
    </div>
    <img class="weather-icon" src="{{=iconPath}}"/>
    <p class="temperature-interval">
        <span class="temperature-icon"></span>
        {{
            if (temperature.from === temperature.to) {
        }}
            <span class="from">{{=temperature.from}}</span>
            <span class="unit">℃</span>
        {{
            } else {
        }}
            <span class="from">{{=temperature.from}}</span>
            <span class="unit">℃</span>
            <span class="delimiter">/</span>
            <span class="to">{{=temperature.to}}</span>
            <span class="unit">℃</span>
        {{
            }
        }}
    </p>
</div>