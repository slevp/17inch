<div id="contact-list">
    <ul>

    </ul>
</div>
<div id="letter-list">
    <ul>
        <li></li><li></li><li></li>
        {{
            var code = 'A'.charCodeAt();
            for (var i = 0; i < 26; i++) {
        }}
            <li class="{{=(i == 0) ? 'bigger': ''}}">{{= String.fromCharCode(code + i)}}</li>
        {{
            }
        }}
        <li></li><li></li><li></li>
    </ul>
    <div class="circle"></div>
</div>