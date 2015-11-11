<div class="left">
    <div class="header"><h1 class="title">AUDIO</h1></div>
    <div class="content">
        <div class="previous"></div>
        <div class="current">
            <div class="playing-progress"></div>
            <div class="play-btn {{=isPlaying ? 'playing' : ''}}"></div>
            <p class="duration">-{{=current.duration}}</p>
        </div>
        <div class="next"></div>
    </div>
    <div class="footer">
        <div class="volume"></div>
        <p class="name">{{=current.title}}</p>
        <div class="repeat"></div>
    </div>
</div>
<div class="right">
    <p class="name">{{=current.title}}</p>
    <p class="artists">{{=current.artists}}</p>
    <p class="lyrics-desc">歌词内容</p>
    <div class="lyrics">
        <div class="scroll">
        {{
            for (var i = 0; i < current.lyrics.length; i++) {
        }}
            <p class="line">{{=current.lyrics[i]}}</p>
        {{
            }
        }}
        </div>
    </div>
</div>