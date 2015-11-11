<div class="header">
    <a class="back-btn"></a>
</div>
<div class="content">
    <div class="wrapper">
        <img class="thumbnail" src="{{=channel.thumbnail || defaultThumbnail}}"/>
        <p class="current-program"></p>
        <div class="program-progress">
            <div class="play-progress">
            </div>
            <div class="text">
                <span class="played">01:10</span>
                <span class="account">04:20</span>
            </div>
        </div>
        <div class="btns">
            <span class="prev"></span>
            <span class="play-btn {{=isPlaying ? 'playing' : ''}}"></span>
            <span class="next"></span>
        </div>
    </div>
</div>
<div class="footer">
    <p class="title">{{=channel.name}}{{
        if (channel.frequency) {
        }}
        <span class="mark frequency">FM {{=(channel.frequency.indexOf('FM') >= 0 || channel.frequency.indexOf('fm') >= 0) ? channel.frequency.substr(0, 2) : channel.frequency}}</span>
        {{
        }
        }}</p>
    <a class="show-program-list" href="#{{=pageName}}/program-list/{{=channel.id}}"></a>
    <span class="add-favorite {{=isFavorite ? 'added' : ''}}"></span>
</div>