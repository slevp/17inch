<div class="main">
    <ul>
    {{
        var height = Math.floor(length/4) + 1;
        for( var i = 0; i < 3 ; i ++) {
        var m = 4 *(i+1);
    }}
        <li class="column">
            <div class="books">
                {{
                    for(var n = 4 * i; n < m; n ++) {
                        if (n > length - 1) {
                            break;
                        }
                }}
                        <div class="item {{=books[n].img.length <= 0 ? 'no-data' : ''}}" data-key="{{=n}}">
                            <img alt="" src="{{=books[n].cover}}"/>
                            <p class="label">未下载</p>
                        </div>

                {{
                    }
                }}
            </div>
         </li>
{{
    }
}}
            </ul>
    <div class="shop-btn">
        <a href="#/shop">商店</a>
    </div>
</div>
