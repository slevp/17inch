<div class="basic-info part">
    <div class="left"><img alt="{{=name}}" class="thumbnail" src="{{=thumbnail}}"/></div>
    <div class="right">
        <h1 class="name">{{=name}}</h1>
        <p class="developer">{{=developer}}</p>
        <ul class="rating stars">
            {{
            for (var i = 0; i < rating; i++) {
            }}
            <li class="star active"></li>
            {{
            }
            }}
            {{
            for (var i = rating; i < 5; i++) {
            }}
            <li class="star"></li>
            {{
            }
            }}
        </ul>
        <div class="install {{=!is_enabled ? 'disabled' : ''}}">{{=installed ? '打开' : (charge > 0 ? '￥' + charge : '免费')}}</div>
        <div class="loading"></div>
        <div class="btns">
            <div class="download-progress"></div>
            <div class="small-btn pause"></div>
            <div class="small-btn stop"></div>
        </div>
    </div>
</div>
<div class="previews part">
    {{
    if (previews.length <= 0) {
    }}
        <p class="info">没有预览图</p>
    {{
        } else {
    }}
    <div class="wrapper">
        <ul>
    {{
            for (var i = 0; i < previews.length; i++) {
    }}
            <li class="item"><img alt="预览图{{=i}}" class="preview" src="{{=previews[i]}}"/></li>
    {{
            }
    }}
        </ul>
    </div>
    {{
        }
    }}
</div>
<div class="description part">
    <h2 class="title">内容提要</h2>
    <p class="text">{{=description}}</p>
</div>
<div class="new-feature part">
    <h2 class="title">新功能</h2>
    <p class="text">{{=change_log}}</p>
</div>