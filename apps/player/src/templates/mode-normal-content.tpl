<div class="previous block">
    <img class="thumbnail circle" src="{{=previous.thumbnail}}"/>
    <div class="bg circle"></div>
    <p class="name">{{=previous.title}}</p>
    <p class="artists">艺人：{{=previous.artists}}</p>
    <p class="duration">-{{=previous.duration}}</p>
</div>
<div class="current block">
    <div class="playing-progress"></div>
    <img class="thumbnail circle" src="{{=current.thumbnail}}"/>
    <div class="bg circle"></div>
    <div class="play-btn {{=isPlaying ? 'playing' : ''}}"></div>
    <p class="duration">-{{=current.duration}}</p>
</div>
<div class="next block">
    <img class="thumbnail circle" src="{{=next.thumbnail}}"/>
    <div class="bg circle"></div>
    <p class="name">{{=next.title}}</p>
    <p class="artists">艺人：{{=next.artists}}</p>
    <p class="duration">-{{=next.duration}}</p>
</div>