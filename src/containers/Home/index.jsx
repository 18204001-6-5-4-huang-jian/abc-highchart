
import React, { Component } from 'react'
import AbcCandlechart from '../../components/AbcCandlechart';
import Highcharts from 'highcharts'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const chartData ={
          chartTitle:'平安银行历史股价',
          update:{
            text:'2018-05-21'
          },
          id:'111',
          data:{
            config:{
                legend:{
                  enabled:true
                },
                rangeSelector: {
                  selected: 1,
                  inputDateFormat: '%Y-%m-%d'
                },
                title: {
                  text: '平安银行历史股价'
                },
                xAxis: {
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%y-%m',
                    year: '%Y'
                  }
                },
                rangeSelector:{
                  buttonSpacing:20,
                  
                  buttonTheme: { 
                    width:50,
                    fill: 'none',
                    stroke: '#ccc',
                    'stroke-width': 1,
                    r: 0,
                    style: {
                        color: '#4C4C4C',
                        fontWeight: 'bold',
                        lineHeight:30,
                    },
                    states: {
                        hover: {
                        },
                        select: {
                            fill: '#E6EFFF',
                            style: {
                                color: '#4C4C4C'
                            }
                        }
        
                    }
                },
                buttons: [{
                  type: ' day',
                  count:1,
                  text: '天',
                  dataGrouping: {
                      forced: true,
                      units: [['day', [1]]]
                  }
              }, {
                  type: 'week',
                  count:4,
                  text: '周',
                  dataGrouping: {
                      forced: true,
                      units: [['week', [1]]]
                  }
              }, {
                  type: 'month',
                  text: '月',
                  count: 4,
                  dataGrouping: {
                      forced: true,
                      units: [['month', [1]]]
                  }
              } ,
              {
                  type: 'year',
                  text: '年',
                  count:1,
                  dataGrouping: {
                     forced: true,
                     units: [['year', [1]]]
                   }
              } ,{
                  type: 'all',
                  text: 'all',

              }],
                  labelStyle: {
                    visibility: 'hidden'
                  }
                },
                 tooltip:{
                   split:false,
                   shared: true,
                   formatter : function() {
                      var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
                      for(let i = 0;i<this.points.length;i++){
                         if(this.points[i].series.userOptions.type === "candlestick"){
                           s += '<br /><b>' + this.points[i].series.name +'<b/><br />开盘:<b>'
                           +this.points[i].point.open
                           + '</b><br />最高:<b>'
                           + this.points[i].point.high
                           + '</b><br />最低:<b>'
                           + this.points[i].point.low
                           + '</b><br />收盘:<b>'
                           + this.points[i].point.close
                           + '</b><br />';
                      }else{
                        s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
                      }
                    }
                    return s;
                    }
                },
                yAxis: [{
                  labels: {
                    align: 'right',
                    x: -3
                  },
                  title: {
                    text: '股价'
                  },
                  height: '60%',
                  resize: {
                    enabled: true
                  },
                  opposite: false,//y轴位置设置在左边
                  lineWidth: 2
                }, {
                  labels: {
                    align: 'right',
                    x: -3
                  },
                  title: {
                    text: '成交量'
                  },
                  top: '65%',
                  height: '35%',
                  offset: 0,
                  lineWidth: 2,
                  opposite: false,//y轴位置设置在左边
                }],
                series: [{
                  type: 'candlestick',
                  name: '平安银行',
                  color: 'red',
                  lineColor: 'green',
                  upColor: 'red',
                  upLineColor: 'red',
                  tooltip: {
                    formatter : function() {
                                  var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
                                  s += '<br /><b>' + this.points[0].series.name +'<b/><br />开盘:<b>'
                                  +this.points[0].point.open
                                  + '</b><br />最高:<b>'
                                  + this.points[0].point.high
                                  + '</b><br />最低:<b>'
                                  + this.points[0].point.low
                                  + '</b><br />收盘:<b>'
                                  + this.points[0].point.close
                                  + '</b><br />' + this.points[1].series.name + ':<b>' + this.points[1].y + '<b/>';
                      return s;
                      }
                  },
                  navigatorOptions: {
                    color: 'green'
                  },
                  data: [
                    [1416528000000,6.975,7.141,6.891,7.1],
                    [1417132800000,7.426,8.239,7.364,8.239],
                    [1417737600000,9.357,10.176,8.989,9.69],
                    [1418342400000,9.253,9.461,9.1,9.28],
                    [1423008000000,9.322,9.35,9.114,9.12],
                    [1423612800000,9.17,9.218,9.1,9.135]
                  ],
                  id: 'sz'
                },{
                  type: 'column',
                  color:'green',
                  data: [
                    [1416528000000,3565541565],
                    [1417132800000,33245677.9],
                    [1417737600000,744464646.033],
                    [1418342400000,1940530.38],
                    [1423008000000,807623.12],
                    [1423612800000,554349.5]
                  ],
                  name: '成交量',
                  yAxis: 1,
                }],
                credits: {
                  enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            }
          }
        }
        const modalData ={
          chartTitle:'平安银行历史股价',
          update:{
            text:'2018-05-21'
          },
          id:'111',
          data:{
            config:{

                credits:{
                  enabled:false
                },
                legend:{
                  enabled:true
                },
                rangeSelector: {
                  selected: 1,
                  inputDateFormat: '%Y-%m-%d'
                },
                title: {
                  text: '平安银行历史股价'
                },
                xAxis: {
                  dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%y-%m',
                    year: '%Y'
                  }
                },
                rangeSelector:{
                  buttonSpacing:20,
                  buttonTheme: { 
                    width:50,
                    fill: 'none',
                    stroke: '#ccc',
                    'stroke-width': 1,
                    r: 0,
                    style: {
                        color: '#4C4C4C',
                        fontWeight: 'bold',
                        lineHeight:30,
                    },
                    states: {
                        hover: {
                        },
                        select: {
                            fill: '#E6EFFF',
                            style: {
                                color: '#4C4C4C'
                            }
                        }
        
                    }
                },
                buttons: [{
                  type: ' day',
                  count:1,
                  text: '天',
                  dataGrouping: {
                      forced: true,
                      units: [['day', [1]]]
                  }
              }, {
                  type: 'week',
                  count:4,
                  text: '周',
                  dataGrouping: {
                      forced: true,
                      units: [['week', [1]]]
                  }
              }, {
                  type: 'month',
                  text: '月',
                  count: 4,
                  dataGrouping: {
                      forced: true,
                      units: [['month', [1]]]
                  }
              } ,
              {
                  type: 'year',
                  text: '年',
                  count:1,
                  dataGrouping: {
                     forced: true,
                     units: [['year', [1]]]
                   }
              } ,{
                  type: 'all',
                  text: 'all',
              }],
                  labelStyle: {
                    visibility: 'hidden'
                  }
                },
                 tooltip:{
                   split:false,
                   shared: true,
                   formatter : function() {
                      var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
                      for(let i = 0;i<this.points.length;i++){
                         if(this.points[i].series.userOptions.type === "candlestick"){
                           s += '<br /><b>' + this.points[i].series.name +'<b/><br />开盘:<b>'
                           +this.points[i].point.open
                           + '</b><br />最高:<b>'
                           + this.points[i].point.high
                           + '</b><br />最低:<b>'
                           + this.points[i].point.low
                           + '</b><br />收盘:<b>'
                           + this.points[i].point.close
                           + '</b><br />';
                      }else{
                        s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
                      }
                    }
                    return s;
                    }
                },
                yAxis: [{
                  labels: {
                    align: 'right',
                    x: -3
                  },
                  title: {
                    text: '股价'
                  },
                  height: '60%',
                  resize: {
                    enabled: true
                  },
                  opposite: false,//y轴位置设置在左边
                  lineWidth: 2
                }, {
                  labels: {
                    align: 'right',
                    x: -3
                  },
                  title: {
                    text: '成交量'
                  },
                  top: '65%',
                  height: '35%',
                  offset: 0,
                  lineWidth: 2,
                  opposite: false,//y轴位置设置在左边
                }],
                series: [{
                  type: 'candlestick',
                  name: '平安银行',
                  color: 'red',
                  lineColor: 'green',
                  upColor: 'red',
                  upLineColor: 'red',
                  tooltip: {
                    formatter : function() {
                                  var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>',this.x);
                                  s += '<br /><b>' + this.points[0].series.name +'<b/><br />开盘:<b>'
                                  +this.points[0].point.open
                                  + '</b><br />最高:<b>'
                                  + this.points[0].point.high
                                  + '</b><br />最低:<b>'
                                  + this.points[0].point.low
                                  + '</b><br />收盘:<b>'
                                  + this.points[0].point.close
                                  + '</b><br />' + this.points[1].series.name + ':<b>' + this.points[1].y + '<b/>';
                      return s;
                      }
                  },
                  navigatorOptions: {
                    color: 'green'
                  },
                   data: [
                      [1262275200000,6.975,7.141,6.891,7.1],
                      [1293811200000,7.426,8.239,7.364,8.239],
                      [1325347200000,9.357,10.176,8.989,9.69],
                      [1356969600000,9.253,9.461,9.1,9.28],
                      [1388505600000,9.322,9.35,9.114,9.12],
                      [1420041600000,9.17,9.218,9.1,9.135]
                  ],
                  id: 'sz'
                },{
                  type: 'column',
                  color:'green',
                  data: [
                   [1262275200000,3565541565],
                   [1293811200000,33245677.9],
                   [1325347200000,744464646.033],
                   [1356969600000,1940530.38],
                   [1388505600000,807623.12],
                   [1420041600000,554349.5]
                 ],
                  name: '成交量',
                  yAxis: 1,
                }],
                credits: {
                  enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            }
          }
        }
        // chartData和modalData是同一组数据，为了解决弹出框图表样式修改不会影响到原页面中的图表才分了两组，
        // chartData是原页面中图表所用数据
        // modalData是导出模块弹出框图表所用数据
        return (
          <div className="App">
              <AbcCandlechart  chartData={chartData} modalData={modalData}/>
          </div>
        )
    }
}
export default Home