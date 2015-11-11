<li data-key="all" class="item {{=(current === 'all') ? 'active' : ''}}">全部</li>
{{
    categories.each(function (category) {
}}
<li data-key="{{=category.id}}" class="item {{=(current === category.id) ? 'active' : ''}}">{{=category.get('name')}}</li>
{{
    });
}}