
<div class="back">
    <a href="#"></a>
</div>
<div class="content">
<div class="head">
    <ul>
        <li class="tag {{=uptwo.className}}" data-key="{{=uptwo.tagId}}"></li>
        <li class="tag {{=upone.className}}" data-key="{{=upone.tagId}}"></li>
        <li class="tag {{=now.className}}" data-key="{{=now.tagId}}"></li>
        <li class="tag {{=nextone.className}}" data-key="{{=nextone.tagId}}"></li>
        <li class="tag {{=nexttwo.className}}" data-key="{{=nexttwo.tagId}}"></li>
    </ul>
    <div class="box"></div>
</div>
<div class="foot">
    <div class="item">
        <p class="text">上次维修时间</p>
        <p class="semicolon">:</p>
        <p class="textbox">{{=data.latelyTime}}</p>
    </div>
    <div class="item">
        <p class="text">本次维修时间</p>
        <p class="semicolon">:</p>
        <p class="textbox">{{=data.nowTime}}</p>
    </div>
    <div class="item">
        <p class="text">本次保养里程</p>
        <p class="semicolon">:</p>
        <p class="textbox">{{=data.mileage}}</p>
    </div>
    <div class="item">
        <p class="text">剩余保养里程</p>
        <p class="semicolon">:</p>
        <p class="textbox">{{=data.remainMileage}}</p>
    </div>
</div>
</div>