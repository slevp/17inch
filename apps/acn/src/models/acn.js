/**
 * @Description: Acn model..
 * @Author: fuwensong
 * @Date: 14-9-22
 * @Company: China EKai
 * @Copyright: All rights Reserved, Designed By EKai
 *               Copyright(C) 2005-2014
 */
define(function(require, exports, module) {
    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        defaults: {
            is_defogging: false,
            is_ac: true,
            is_auto: false,
            is_air_purifier: false,
            is_pollen: false,
            left_wind_quantity: 5,
            left_wind_direction: 'middle',
            left_temperature: 21,
            right_wind_quantity: 3,
            right_wind_direction: 'top',
            right_temperature: 25,
            external_temperature: 28,
            max_temperature: 32,
            min_temperature: 16
        },
        initialize: function() {
            this.on('change:left_temperature', this.temperatureChanged);
            this.on('change:right_temperature', this.temperatureChanged);

            this.temperatureChanged(this, this.get('left_temperature'), {name: 'left_temperature'});
            this.temperatureChanged(this, this.get('right_temperature'), {name: 'right_temperature'});
        },
        temperatureChanged: function(model, value, options) {
            var name = options.name;
            var max = model.get('max_temperature');
            var min = model.get('min_temperature');
            model.set( '_' + name, model.lowerTemperature(name, 1));
            model.set('__' + name, model.lowerTemperature(name, 2));
            model.set(name + '_', model.higherTemperature(name, 1));
            model.set(name + '__', model.higherTemperature(name, 2));
        },
        higherTemperature: function(name, num) {
            var value = this.get(name);
            num = num || 1;
            var max = this.get('max_temperature');
            var min = this.get('min_temperature');
            if (value + num > max) {
                value = (value + num - max - 1) + min
            } else {
                value += num;
            }
            return value;
        },
        lowerTemperature: function(name, num) {
            var value = this.get(name);
            num = num || 1;
            var max = this.get('max_temperature');
            var min = this.get('min_temperature');
            if (value - num < min) {
                value = max - (min - (value - num) - 1);
            } else {
                value -= num;
            }
            return value;
        },
        getRelativeTemperature: function(name) {
            return [
                this.get('__' + name),
                this.get('_' + name),
                this.get(name),
                this.get(name + '_'),
                this.get(name + '__')
            ];
        }
    });
});