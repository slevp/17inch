<div class="item">
    <div class="label">
        <h2 class="flag">{{=key}}<span class="jinhao">#</span></h2>
        <p class="name">{{=name}}</p>
    </div>
    {{
        var parts = value.split('.');
        if (parts.length !== 2) {
            parts = ['00', '00'];
        }
        var ten, bit, ten_, bit_;
        if (parts[0].length === 2) {
            ten = parts[0].substr(0, 1);
            bit = parts[0].substr(1, 1);
        } else {
            ten = 0;
            bit = parts[0];
        }
        if (parts[1].length === 2) {
            bit_ = parts[1].substr(0, 1);
            ten_ = parts[1].substr(1, 1);
        } else {
            ten_ = 0;
            bit_ = parts[1];
        }
    }}
    <div class="value">
        <div class="number" data-value="{{=parseInt(ten) > 0 ? ten : 'none'}}"></div>
        <div class="number" data-value="{{=bit}}"></div>
        <div class="dot"></div>
        <div class="number" data-value="{{=bit_}}"></div>
        <div class="number" data-value="{{=ten_}}"></div>
    </div>
</div>