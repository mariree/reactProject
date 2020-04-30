import React from 'react'
import { Tree, Input, Button,Radio,Table,Checkbox,Row} from 'antd';
import { CarryOutOutlined, QrcodeOutlined, ExportOutlined, PrinterOutlined } from '@ant-design/icons';
class Area extends React.Component {
    constructor() {
        super();
        this.state = {
            treeNodes: [{
                key: '000',
                icon: <CarryOutOutlined />,
                title: '根节点',
                children: [{
                    key: '0001',
                    icon: <CarryOutOutlined />,
                    title: '广东',
                    children: [{
                        key: '00011',
                        icon: <CarryOutOutlined />,
                        title: '广东'
                    }, {
                        key: '00012',
                        icon: <CarryOutOutlined />,
                        title: '东莞'
                    }]
                }, {
                    key: '0002',
                    icon: <CarryOutOutlined />,
                    title: '湖北',
                    children: [{
                        key: '00021',
                        icon: <CarryOutOutlined />,
                        title: '武汉',
                        children: [{
                            key: '000211',
                            icon: <CarryOutOutlined />,
                            title: '武昌'
                        }, {
                            key: '000212',
                            icon: <CarryOutOutlined />,
                            title: '汉口'
                        }, {
                            key: '000213',
                            icon: <CarryOutOutlined />,
                            title: '汉阳'
                        }]
                    }, {
                        key: '00022',
                        icon: <CarryOutOutlined />,
                        title: '宜昌'
                    }]
                }, {
                    key: '0003',
                    icon: <CarryOutOutlined />,
                    title: '四川',
                    children: [{
                        key: '00031',
                        icon: <CarryOutOutlined />,
                        title: '成都'
                    }, {
                        key: '00032',
                        icon: <CarryOutOutlined />,
                        title: '绵阳'
                    }]
                }]
            }],
            tableData: [],
            columns : [
                {
                    title: '序号',
                    dataIndex: 'num',
                    key: 'num',
                },
                {
                    title: '设备标识',
                    dataIndex: 'mark',
                    key: 'mark',
                },
                {
                    title: '设备名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '分辨率',
                    dataIndex: 'sharpness',
                    key: 'sharpness',
                },
                {
                    title: '尺寸',
                    dataIndex: 'size',
                    key: 'size',
                },
                {
                    title: '机构代码',
                    dataIndex: 'organization',
                    key: 'organization',
                },
            ],
            curColumns : [
                {
                    title: '序号',
                    dataIndex: 'num',
                    key: 'num',
                },
                {
                    title: '设备标识',
                    dataIndex: 'mark',
                    key: 'mark',
                },
                {
                    title: '设备名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '分辨率',
                    dataIndex: 'sharpness',
                    key: 'sharpness',
                },
                {
                    title: '尺寸',
                    dataIndex: 'size',
                    key: 'size',
                },
                {
                    title: '机构代码',
                    dataIndex: 'organization',
                    key: 'organization',
                },
            ],
            isShowColPop: false,
            changeCol(val) {
                console.log(val)
                // 这个方法要和checkbox、做绑定 
                this.setState((states)=> {
                    let curColumns = states.columns.filter(item => {
                        return val.includes(item.key)
                    })
                    return ({
                        curColumns
                    })
                })
            },
            showColPop(e) {
                this.setState({
                    isShowColPop: true
                })
                e.nativeEvent.stopImmediatePropagation()
            }
        }
        this.generateData = this.generateData.bind(this)
        this.hidePop = this.hidePop.bind(this)
        this.state.changeCol = this.state.changeCol.bind(this)
        this.state.showColPop = this.state.showColPop.bind(this)
    }

    generateData() {
        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                num: i,
                mark: `15072${(~~(Math.random()*999999)).toString().padEnd(6,0)}`,
                name: `hl127${(~~(Math.random()*999999)).toString().padEnd(6,0)}`,
                sharpness: '1920*1080',
                size: '27英寸',
                organization: `zbh${(~~(Math.random()*999999)).toString().padEnd(6,0)}`
            })
        }
        return data
    }

    hidePop() {
        this.setState({
            isShowColPop: false
        })
        // e.nativeEvent.stopImmediatePropagation()
    }

    

    componentDidMount() {
        this.setState({
            tableData: this.generateData()
        })
        // 控制点击其他区域隐藏弹窗
        document.addEventListener('click', this.hidePop)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hidePop)
    }
    render() {
        const onSelect = (selectedKeys, info) => {
            console.log('selected', selectedKeys, info);
        }

        const onChangeRelate = (e) =>{
            console.log(`radio checked:${e.target.value}`);
        }

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
        }

        const {treeNodes, tableData, columns, changeCol, showColPop, isShowColPop, curColumns} = this.state 

        const colKeyList = (()=> {
            let arr = []
            columns.map(item => {
                arr.push(item.key)
            })
            return arr
        })()

        return (
            <div className="areaWrap">
                <div className="ar-tree">
                    <Tree
                        showLine={true}
                        showIcon={true}
                        defaultExpandedKeys={['000']}
                        onSelect={onSelect}
                        treeData={treeNodes}
                    />
                </div>
                <div className="ar-cont">
                    <div className="ar-c-head">
                        <span>设备号</span>
                        <Input style={{ width: 200 }}  placeholder='请输入设备号'/>
                        <span>设备名称</span>
                        <Input style={{ width: 200 }} placeholder='请输入设备名称' />
                        <div style={{float: 'right'}}>
                            <Button type="primary" style={{marginRight: '20px'}}>查询</Button>
                            <Button>重置</Button>
                        </div>
                    </div>
                    <div className="hasBtBorder" style={{marginBottom: '20px'}}>
                        <Radio.Group onChange={onChangeRelate} defaultValue="0">
                            <Radio.Button value="0">已关联机构设备</Radio.Button>
                            <Radio.Button value="1">未关联机构设备</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="ar-tabel-wrap">
                        <div className="ar-t-head">
                            <Button type="primary">取消关联</Button>
                            <Button type="primary">移动</Button>
                            <div className="ar-t-h-flrt">
                                <QrcodeOutlined onClick={showColPop} />
                                <ExportOutlined />
                                <PrinterOutlined />
                                <div className={isShowColPop?"ar-t-h-pop active":"ar-t-h-pop"} onClick={(e)=> {e.nativeEvent.stopImmediatePropagation()}} >
                                    <Checkbox.Group style={{ width: '100%' }} defaultValue={colKeyList} onChange={changeCol}>
                                        {
                                            columns.map(item => (
                                                <Row key={item.key}>
                                                    <Checkbox value={item.key}>{item.title}</Checkbox>
                                                </Row>
                                            ))
                                        }
                                        
                                    </Checkbox.Group>
                                </div>
                            </div>
                        </div>
                        <Table
                            rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                            }}
                            columns={curColumns}
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
export default Area