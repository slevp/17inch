{{
    var updateTimeDiff = util.parseTimeDiff(program.updatetime);
    var updateTimeDiffStr = '';
    switch (updateTimeDiff.unit) {
        case 's':
            updateTimeDiffStr = updateTimeDiff.num + '秒前更新';
            break;
        case 'm':
            updateTimeDiffStr = updateTimeDiff.num + '分钟前更新';
            break;
        case 'h':
            updateTimeDiffStr = updateTimeDiff.num + '小时前更新';
            break;
        default:
            var date = new Date(program.updatetime * 1000);
            updateTimeDiffStr = (date.getMonth() + 1) + '月' + date.getDate() + '日更新';
            break;
    }
    var duringTimeStr = util.parseTime(program.duration);
}}
<a class="link">
    <h2 class="title">{{=program.name}}</h2>
    <p class="desc update-time">{{=updateTimeDiffStr}}</p>
    <span class="mark duration">
        {{=program.broadcasttime}} / {{=duringTimeStr.h > 0 ? duringTimeStr.h + '小时' : ''}}{{=duringTimeStr.m > 0 || duringTimeStr.s ? duringTimeStr.m + '分' : ''}}{{=duringTimeStr.s > 0 ? duringTimeStr.s + '秒' : ''}}
    </span>
</a>