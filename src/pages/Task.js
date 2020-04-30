import React from 'react'
import { Input, Button,Radio,Table,Checkbox,Row,DatePicker,Select } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
class Task extends React.Component {
    constructor() {
        super()
        this.onChangeTime = this.onChangeTime.bind(this)
    }
    
    state = {
        tableData: []
    }

    componentDidMount() {
        this.setState({
            tableData: this.generateData()
        })
        console.log(this.props.history)
    }

    toDetail(text, record) {
        console.log(text, record)
        this.props.history.push({pathname:"/TaskDetail",state : { record }})
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record)=> (
                <span className='_opeBtn' onClick={this.toDetail.bind(this,text, record)}>{text}</span>
            )
        },
        {
            title: '生效时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '失效时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (tag)=> (
                <span>{tag=='0'?'通过':'草稿'}</span>
            )
        },
        {
            title: '操作选项',
            key: 'operation',
            dataIndex: 'status',
            render: (tag)=> {
                if(tag=='0'){
                    return <span className='_opeBtn'>审核记录</span>
                } else {
                    return (
                        <>
                            <span className='_opeBtn'>编辑</span>
                            <span className='_opeBtn'>提交审核</span>
                            <span className='_opeBtn'>审核记录</span>
                        </>
                    )
                }
            }
        }
    ]

    generateData() {
        const data = [];
        for (let i = 0; i < 50; i++) {
            data.push({
                key: i,
                id: i,
                name: `(广告)${(~~(Math.random()*999999)).toString().padEnd(6,0)}`,
                startTime: '2020-04-27 10:16:22',
                endTime: '2020-04-28 10:16:11',
                createTime: '2020-04-26 10:16:11',
                status: (Math.random()>0.5?'0':'1')
            })
        }
        return data
    }

    onChangeTime(date, dateString) {
        console.log(date,dateString)
    }
    onChangeStatus(value) {
        console.log(value)
    }
    render() {
        let { tableData } = this.state
        return (
            <div className="taskWrap">
                <p className="crumbs">当前位置：任务管理</p>
                <div className="task-cont">
                    <div className="task-opes">
                        <Button type="primary">创建任务</Button>
                    </div>
                    <div className="task-filter">
                        <span>任务名称</span>
                        <Input style={{ width:"150px" }} />
                        <span>时间段</span>
                        <RangePicker showTime onChange={this.onChangeTime} style={{marginRight: "20px"}} />
                        <span>状态</span>
                        <Select
                            showSearch
                            style={{ width:"150px",marginRight: "20px" }}
                            placeholder="请选择"
                            onChange={this.onChangeStatus}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="0">全部</Option>
                            <Option value="1">草稿</Option>
                            <Option value="2">待审核</Option>
                            <Option value="3">驳回</Option>
                            <Option value="4">通过</Option>
                        </Select>
                        <Button type="primary">查询</Button>
                        <Button>重置</Button>
                    </div>
                    <div className="task-table-wrap">
                        <Table
                            columns={this.columns}
                            dataSource={tableData}
                            bordered
                            size="small"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Task