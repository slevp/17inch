<div class="wrapper">
    {{
        if (channel.id) {
    }}
    <a class="show-program-list" href="#{{=pageName}}/program-list/{{=channel.id}}"></a>
    <a class="channel-title" href="#{{=pageName}}/play/{{=channel.id}}">{{=channel.name}}</a>
    {{
        } else {
    }}
    <a class="show-program-list"></a>
    <p class="channel-title"></p>
    {{
        }
    }}
    <div class="play-btn {{=isPlaying ? 'playing' : ''}}"></div>
</div>
<div class="play-progress"></div>