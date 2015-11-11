/**
 * Created by liuankang on 14-7-9.
 */
var speedup = [];    // 急加速
var speeddown =  [1, 2, 5, 15, 10, 7, 4];    // 急减速
var turn =  [3, 5, 9, 6, 10, 15, 18];        // 急转弯

var dummychart = {
    chart: {
            type: '',
            backgroundColor: 'rgba(0,0,0,0)',
            renderTo:'dummy_left_chart1'
        },
        title: {
            text: '',
            verticalAlign: 'top',
            x: -20,//center
            style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize:30
            }
        },
        subtitle: {
            text: ' ',
            x: -20
        },


        xAxis: {
            categories: ['次数', '次数', '次数', '次数 ', '次数 ', '次数 ','次数 '],
            labels: {
                enabled: false// Highcharts学习交流群294191384
            }

        },

        yAxis: {
            title: {
                text: ''
            },
            tickPositions: [0, 5, 10,15, 20,25],
            plotLines: [{
                value: 0,
                width: 1,
                color: '#FFFFFF'
            }],
            style: {
                color: '#ffffff'
            },
            gridLineWidth: 0
        },
        plotOptions: {
            series: {
                lineWidth: 5
            }
        },
        tooltip: {
            valueSuffix: '次',
            backgroundColor:'white',

        },
        legend: {

            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            x:-20,
            y:5,
            style: {
                color: "white"
            }
        },

        series: [{
            name: '急加速',
            data: speedup,
            color: '#FF0000'
        }, {
            name: '急减速',
            data: speeddown,
            color:'#00ccff'
        }, {
            name: '急转弯',
            data: turn,
            color:' #FFFF00'
        }]

}


