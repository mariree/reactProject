import React from 'react'
import echarts from 'echarts'
import {UserAddOutlined, LaptopOutlined, LogoutOutlined, FundProjectionScreenOutlined} from '@ant-design/icons'
import { Fragment } from 'react'

class Default extends React.Component {
    constructor() {
        super()
        this.state = {
            topLineData: [{
                id: '001',
                name: '注册终端数',
                value: '22',
                icon: <UserAddOutlined/>
            }, {
                id: '002',
                name: '在线终端数',
                value: '0',
                icon: <LaptopOutlined/>
            }, {
                id: '003',
                name: '离线终端数',
                value: '22',
                icon: <LogoutOutlined/>
            }, {
                id: '004',
                name: '待审核终端数',
                value: '22',
                icon: <FundProjectionScreenOutlined/>
            }],
            materialNumbers: [{
                id: '001',
                name: '图片素材',
                value: '45',
                size: '27.00MB'
            }, {
                id: '002',
                name: '视频素材',
                value: '13',
                size: '533MB'
            }, {
                id: '003',
                name: '文档素材',
                value: '3',
                size: '52MB'
            }, {
                id: '004',
                name: '网页素材',
                value: '0',
                size: '0'
            }]
        }
    }

    componentDidMount() {
        this.initChart()
    }

    barOption = {
        title: {
            show: false,
            text: ''
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }

    pieOption = {
        title: {
            show: false,
            text: ''
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data:  [{
                    name: 'Apples',
                    value: 70
                }, {
                    name: 'Strawberries',
                    value: 68
                }, {
                    name: 'Bananas',
                    value: 48
                }, {
                    name: 'Oranges',
                    value: 40
                }, {
                    name: 'Pears',
                    value: 32
                }, {
                    name: 'Pineapples',
                    value: 27
                }, {
                    name: 'Grapes',
                    value: 18
                }],
                animation: false,
                label: {
                    position: 'outer',
                    alignTo: 'none',
                    bleedMargin: 5
                }
            }
        ]
    }
    initChart() {
        var barChart = echarts.init(document.getElementById('d-bar-chart'))
        barChart.setOption(this.barOption)
        var pieChart = echarts.init(document.getElementById('d-pie-chart'))
        pieChart.setOption(this.pieOption)
    }
    render() {
        let {topLineData, materialNumbers} = this.state
        return (
            <div className="default">
                <h5>数据统计</h5>
                <div className="d-linetop">
                    {
                        topLineData.map(item => {
                            return (
                                <div className='d-lineItem' key={item.id}>
                                    <i>{item.icon}</i>
                                    <span className="d-t-l-val">{item.value}</span>
                                    <span className="d-t-l-name">{item.name}</span>
                                </div>
                            )
                        }) 
                    }
                </div>
                <div className="d-linebot">
                    <div className="d-l-bt-item">
                        <h5 className="d-line-t">素材总量统计</h5>
                        <ul className="d-line-ul">
                        {
                            materialNumbers.map(item =>(
                                <Fragment  key={item.id}>
                                    <li>
                                        <span>{item.name}</span>
                                        <label>{item.value}</label>
                                    </li>
                                    <li>
                                        <span>占用</span>
                                        <label>{item.size}</label>
                                    </li>
                                </Fragment>
                            ))
                        }
                        </ul>
                    </div>
                    <div className="d-l-bt-item">
                        <h5 className="d-line-t">日程排期统计</h5>
                        <div className="d-l-bt-chart" id="d-bar-chart"></div>
                    </div>
                    <div className="d-l-bt-item">
                        <h5 className="d-line-t">排期状态统计</h5>
                        <div className="d-l-bt-chart" id="d-pie-chart"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Default