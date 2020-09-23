import React, { Fragment } from 'react'
import {FileTextTwoTone} from '@ant-design/icons'
import { Button, Table, message  } from 'antd';
import axios from '../http';

class FileDataList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileData: []
        }
        this.deleteMat = this.deleteMat.bind(this)
    }
    componentWillReceiveProps (nextProps) {
        const {fileData} = nextProps
        this.setState({
            fileData
        })
    }
    deleteMat(info) {
        console.log(info)
        let _this = this
        axios.post('/deleteData', info).then(function (res) {
            if(res.data.dataStatus === '000000'){
                message.success('删除成功')
                _this.props.initTableData()
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
    render () {
        let { viewType, chooseFile , chosedFile} = this.props
        let { fileData } = this.state
        let _this = this
        const judgeOpe = (status)=> {
            // 0待审 1驳回 2待入库 3合格
            switch (status) {
                case '0':{
                    return ({
                        status: '待审',
                        btn: '审核'
                    })
                }
                case '1':{
                    return ({
                        status: '驳回',
                        btn: '审核'
                    })
                }
                case '2':{
                    return ({
                        status: '待入库',
                        btn: '入库'
                    })
                }
                case '3':{
                    return ({
                        status: '合格',
                        btn: ''
                    })
                }
            }

        }

        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            dataIndex:"id",
            align: 'center',
            key: 'id'
        }, {
            title: '名称',
            dataIndex: 'name',
            align: 'center',
            dataIndex:"name",
            key: 'name'

        }, {
            title: '类型',
            dataIndex: 'type',
            align: 'center',
            dataIndex:"type",
            key: 'type'
        }, {
            title: '大小',
            dataIndex: 'size',
            align: 'center',
            dataIndex:"size",
            key: 'size'
        }, {
            title: '上传日期',
            dataIndex: 'upTime',
            align: 'center',
            dataIndex:"upTime",
            key: 'upTime'
        }, {
            title: '分辨率',
            dataIndex: 'sharpness',
            align: 'center',
            dataIndex:"sharpness",
            key: 'sharpness'
        }, {
            title: '节目时长',
            dataIndex: 'duration',
            align: 'center',
            dataIndex:"duration",
            key: 'duration'
        }, {
            title: '上传人',
            dataIndex: 'author',
            align: 'center',
            dataIndex:"author",
            key: 'author'
        }, {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            dataIndex:"status",
            key: 'status',
            render: e=> {
                return judgeOpe(e).status
            }
        }, {
            title: '操作选项',
            align: 'center',
            dataIndex:"operation",
            key: 'operation',
            width: 180,
            render: (text, record)=> {
                return (
                    <div className='f-l-col-ope'>
                        <span className="_opeBtn" onClick={_this.deleteMat.bind(_this,record)}>删除</span>
                        <span className="_opeBtn">审核</span>
                        <span className="_opeBtn">审核记录</span>
                    </div>
                )
            }
        }]

        return (
            <Fragment>
                {
                    (viewType==='table')&&
                    <div className='fileListWrap-t'>
                        {
                            fileData.map(item => (
                                <div className={`fileListItem-t`}  key={item.id} onClick={()=> {chooseFile(item)}}>
                                    <div className={`f-l-t-cont ${(chosedFile.id===item.id)?'selected':''}`}>
                                        <div className="f-l-t-rtip">00:00:30</div>
                                        <FileTextTwoTone className='f-l-t-icon' style={{ fontSize: '42px' }}/>
                                        <Button type="primary">{judgeOpe(item.status).status}</Button>
                                    </div>
                                    <span className='f-l-t-bot'>{item.name}</span>
                                    <span className='f-l-t-bot-btn'>{judgeOpe(item.status).btn}</span>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    (viewType==='list')&&
                    <div className='fileListWrap-l'>
                        <Table dataSource={fileData}  columns={columns} rowKey={(r, i) => (r.id)} scroll></Table>
                    </div>
                }
            </Fragment>
        )
    }
}
export default FileDataList