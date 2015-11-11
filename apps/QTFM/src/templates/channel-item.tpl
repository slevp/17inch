<a class="link">
    <h2 class="title">{{=name}}</h2>
    <p class="desc">{{=desc}}</p>
    {{
        if (frequency) {
    }}
    <span class="mark frequency">FM {{=(frequency.indexOf('FM') >= 0 || frequency.indexOf('fm') >= 0) ? frequency.substr(0, 2) : frequency}}</span>
    {{
        }
    }}
</a>