import React from 'react'
import { Input, Button,Radio,Table,Checkbox,Row,DatePicker,Select } from 'antd'

class TaskDetail extends React.Component {
    constructor(props) {
        super(props)
        this.generateData = this.generateData.bind(this)
        this.backToList = this.backToList.bind(this)
        console.log(props.location.state.record )
    }
    state = {
        tableData: []
    }

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '节目名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '分辨率',
            dataIndex: 'sharpness',
            key: 'sharpness',
        },
        {
            title: '节目时长',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '总文件大小',
            dataIndex: 'filesize',
            key: 'filesize',
        },
        {
            title: '开播时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '停播时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '循环次数',
            dataIndex: 'cycles',
            key: 'cycles',
        },
        {
            title: '操作选项',
            key: 'operation',
            dataIndex: 'name',
            render: (name)=> (
                <>
                    <span className='_opeBtn'>预览{name}</span>
                    <span className='_opeBtn'>查看素材</span>
                </>
            )
        }
    ]

    generateData() {
        let data = []
        for(let i=0;i<10;i++) {
            data.push({
                id: i,
                name: `(节目)${(~~(Math.random()*999999)).toString().padEnd(6,0)}`,
                sharpness:'1920*1080',
                startTime: '2020-04-27 10:16:22',
                endTime: '2020-04-28 10:16:11',
                cycles: `${(~~((Math.random()*10)).toString())}`,
                duration: `${(~~((Math.random()*100)).toString())}秒`,
                filesize:  `${(~~((Math.random()*100)).toString())}M`
            })
        }
        return data
    }

    backToList() {
        this.props.history.push({
            pathname: '/Task'
        })
    }
    componentDidMount() {
        this.setState({
            tableData: this.generateData()
        })
    }
    render() {
        const {tableData} = this.state
        return (
            <div className="taskDetail-wrap">
                <p className="crumbs">当前位置：任务管理>查看节目</p>
                <div className="task-cont">
                    <div className="task-opes">
                        <Button type="primary" onClick={this.backToList}>返回列表</Button>
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

export default TaskDetail