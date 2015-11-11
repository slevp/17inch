
<div class="content">
    <ul class="imgs">
        {{
            for(var i = 0; i< imageData.length; i++ ){
        }}
            <li>
                <img alt="" class="" src="{{=imageData[i].get('src')}}"></img>
            </li>
        {{
            }
        }}
    </ul>
    <div class="progress">
        <div class="progress-line">
            <div class="browsed"></div>
            <div class="browing"></div>
        </div>
        <div class="circle"></div>
    </div>
</div>
<div class="head">
    <p class="title">{{=title}}</p>
    <div class="back-btn active">
        <a href="#"></a>
    </div>
    <div class="bookrack">
        <a href="#">我的书架</a>
    </div>
</div>