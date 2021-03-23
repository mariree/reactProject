import React from 'react'
import axios from 'axios'
import echarts from 'echarts'

class EMap extends React.Component {
    constructor() {
        super()
    }

    initMap() {
        function randomData() {
            return Math.round(Math.random()*100);
        }
        var _data = [
        
            {
                name: '齐齐哈尔'
            }, {
                name: '盐城'
            }, {
                name: '青岛'
            }, {
                name: '金昌'
            }, {
                name: '泉州'
            }, {
                name: '拉萨'
            }, {
                name: '上海浦东'
            }, {
                name: '攀枝花'
            }, {
                name: '威海'
            }, {
                name: '承德'
            }, {
                name: '汕尾'
            }, {
                name: '克拉玛依'
            }, {
                name: '重庆市'
            },{
                name: '北京市'
            }
        
        ];

        var geoCoordMap = {

            '齐齐哈尔': [123.97, 47.33],
            '盐城': [120.13, 33.38],
            '青岛': [120.33, 36.07],
            '金昌': [102.188043, 38.520089],
            '泉州': [118.58, 24.93],
            '拉萨': [91.11, 29.97],
            '上海浦东': [121.48, 31.22],
            '攀枝花': [101.718637, 26.582347],
            '威海': [122.1, 37.5],
            '承德': [117.93, 40.97],
            '汕尾': [115.375279, 22.786211],
            '克拉玛依': [84.77, 45.59],
            '重庆市': [108.384366, 30.439702],
            '北京市': [116.4551,40.2539]
        
        };

        var convertData = function(data) {
            var res = [];
        
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
        
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
        
            return res;
        };

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var FromCityIndex = 0

        var cityArray = Object.keys(geoCoordMap)

        var linesData = []

        let option = {}

        var timeTicket = null;

        function generateOption() {
            linesData = _data.map(function (dataItem) {
                return {
                    fromName: cityArray[FromCityIndex],
                    toName: dataItem.name,
                    coords: [
                        geoCoordMap[cityArray[FromCityIndex]],
                        geoCoordMap[dataItem.name]
                    ]
                }
            })
            option = {
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    text: '中国大区分布图',
                    subtext: '中国的八大区分布',
                    itemGap: 30,
            
                    left: 'center',
                    textStyle: {
            
                        color: '#1a1b4e',
            
                        fontStyle: 'normal',
            
                        fontWeight: 'bold',
            
                        fontSize: 30
            
                    },
            
                    subtextStyle: {
            
            
                        color: '#58d9df',
            
                        fontStyle: 'normal',
            
                        fontWeight: 'bold',
            
                        fontSize: 16
            
            
                    }
                },
            
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'click'
                },
            
                visualMap: {
                    min: 0,
                    max: 100,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],
                    calculable: true,
                    inRange: {
                        color: ['#ffffff', '#E0DAFF', '#ADBFFF', '#9CB4FF', '#6A9DFF', '#3889FF']
                    }
                },
                toolbox: {
                    show: false,
                },
            
            
                geo: {
                    map: 'china',
                    zoom: 1.2,
                    label: {
                        normal: {
            
                            show: true,
                            color: '#c1c4c8'
                        },
                        emphasis: {
                            show: false,
                            color: '#292929'
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: '#fbfbfb',
                            borderColor: '#b9b4b7'
            
                        },
                        emphasis: {
                            areaColor: '#05ff09'
                        }
                    }
                },
                series: [
                    
                    {
                    name: cityArray[FromCityIndex],
                    type: 'lines',
                    zlevel: 2,
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        symbol: planePath,
                        trailLength: 0,
                        symbolSize: 15
                    
                    },
                    lineStyle: {
                        normal: {
                            color:'#c60fff',
                            width: 2,
                            opacity:0.5,
                            curveness:0.2
                        }
                    },
                    data: linesData
                },{
                    name: '供需占比',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(_data),
                    symbolSize: 8,
                    showEffectOn: 'render',
                    rippleEffect: {
                        scale: 5,
                        brushType: 'stroke'
                    },
                    
                
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c60fff',
                            shadowBlur: 20,
                            shadowColor: '#333'
                        }
                    }
                }, {
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: [{
                        name: '北京',
                        value: randomData()
                    }, {
                        name: '天津',
                        value: randomData()
                    }, {
                        name: '上海',
                        value: randomData()
                    }, {
                        name: '重庆',
                        value: randomData()
                    }, {
                        name: '河北',
                        value: randomData()
                    }, {
                        name: '河南',
                        value: randomData()
                    }, {
                        name: '云南',
                        value: randomData()
                    }, {
                        name: '辽宁',
                        value: randomData()
                    }, {
                        name: '黑龙江',
                        value: randomData()
                    }, {
                        name: '湖南',
                        value: randomData()
                    }, {
                        name: '安徽',
                        value: randomData()
                    }, {
                        name: '山东',
                        value: randomData()
                    }, {
                        name: '新疆',
                        value: randomData()
                    }, {
                        name: '江苏',
                        value: randomData()
                    }, {
                        name: '浙江',
                        value: randomData()
                    }, {
                        name: '江西',
                        value: randomData()
                    }, {
                        name: '湖北',
                        value: randomData()
                    }, {
                        name: '广西',
                        value: randomData()
                    }, {
                        name: '甘肃',
                        value: randomData()
                    }, {
                        name: '山西',
                        value: randomData()
                    }, {
                        name: '内蒙古',
                        value: randomData()
                    }, {
                        name: '陕西',
                        value: randomData()
                    }, {
                        name: '吉林',
                        value: randomData()
                    }, {
                        name: '福建',
                        value: randomData()
                    }, {
                        name: '贵州',
                        value: randomData()
                    }, {
                        name: '广东',
                        value: randomData()
                    }, {
                        name: '青海',
                        value: randomData()
                    }, {
                        name: '西藏',
                        value: randomData()
                    }, {
                        name: '四川',
                        value: randomData()
                    }, {
                        name: '宁夏',
                        value: randomData()
                    }, {
                        name: '海南',
                        value: randomData()
                    }, {
                        name: '台湾',
                        value: randomData()
                    }, {
                        name: '香港',
                        value: randomData()
                    }, {
                        name: '澳门',
                        value: randomData()
                    }]
                }]
            }
            return option
        }
        var chart = echarts.init(document.getElementById('mapChart'))
        axios.get('map/china.json').then(params => {
            echarts.registerMap('china',params.data)
            chart.setOption(generateOption())
            chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 2,
                dataIndex: 0
            });
            chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 2,
                dataIndex: 0
            });
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(() => {
                FromCityIndex++;
                FromCityIndex===cityArray.length&&(FromCityIndex=0)
                chart.setOption(generateOption())
                chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 2,
                    dataIndex: (FromCityIndex) % cityArray.length
                });
                chart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 2,
                    dataIndex: (FromCityIndex) % cityArray.length
                });
            }, 5000);
        })
    }

    // 地图下钻？暂不用做
    // loadMap(mapCode,mapName) {
    //     axios.get('map/china.json').then(params => {
    //         echarts.registerMap('china',params.data)
    //         chart.setOption(generateOption())
    //         chart.dispatchAction({
    //             type: 'highlight',
    //             seriesIndex: 2,
    //             dataIndex: 0
    //         });
    //         chart.dispatchAction({
    //             type: 'showTip',
    //             seriesIndex: 2,
    //             dataIndex: 0
    //         });
    //         timeTicket && clearInterval(timeTicket);
    //         timeTicket = setInterval(() => {
    //             FromCityIndex++;
    //             FromCityIndex===cityArray.length&&(FromCityIndex=0)
    //             chart.setOption(generateOption())
    //             chart.dispatchAction({
    //                 type: 'highlight',
    //                 seriesIndex: 2,
    //                 dataIndex: (FromCityIndex) % cityArray.length
    //             });
    //             chart.dispatchAction({
    //                 type: 'showTip',
    //                 seriesIndex: 2,
    //                 dataIndex: (FromCityIndex) % cityArray.length
    //             });
    //         }, 5000);
    //     })
    // }

    componentDidMount() {
        this.initMap()
    }

    render() {
        return (
            <div className="EMap">
                <div className="map-contain" id="mapChart"></div>
                <div className="map-data"></div>
            </div>
        )
    }
}

export default EMap