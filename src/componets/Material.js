import React from 'react'
import axios from 'axios';
import { Input, Row, Col , Popover, Button, Radio ,Modal, message } from 'antd';
import { ProfileOutlined, MenuOutlined, FolderAddOutlined, UnorderedListOutlined, AppstoreOutlined} from '@ant-design/icons';
// import { fileData } from '../json/material'
import FileDataList from '../pages/FileDataList'


const { Search } = Input;

export default class Material extends React.Component {
    constructor() {
        super()
        const chooseFile = (obj)=> {
            this.setState({
                chosedFile: obj
            })
        }
        this.state = {
            sidePart : [{
                name: '文件夹1',
                id: '001',
                showInput: false
            }, {
                name: '文件夹2',
                id: '002',
                showInput: false
            }],
            currentFocus: -1,
            fileFilter: 'all',
            // 0待审 1驳回 2待入库 3合格
            fileData: [],
            // 'table' 'list'
            viewType: 'table',
            chosedFile: {},
            chooseFile,
            addMaterialInfo: {
                "name": '',
                "type": "",
                "size": "",
                "sharpness": "",
                "duration": "",
                "author": "",
                "upTime": "",
                "folder": "",
                "organ": "",
                "status": "0"
            },
            addPopVisible: false,
            initTableData: this.initTableData.bind(this)
        }
        this.initTableData = this.initTableData.bind(this)
        this.addMatrial = this.addMatrial.bind(this)
        this.changeAddPopInfo = this.changeAddPopInfo.bind(this)
        this.addPopFun = this.addPopFun.bind(this)
        this.cancelAddPopFun = this.cancelAddPopFun.bind(this)
    }

    initTableData () {
        let _this = this
        axios.get('http://localhost:3000/getTest1', {
        }).then(function (res) {
            if(res.data.dataStatus === '000000'){
                console.log(res)
                _this.setState({
                    fileData: res.data.data.data
                })
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    addMatrial() {
        let _this = this
        this.setState({
            addPopVisible: true
        })
    }

    componentDidMount() {
        this.initTableData()
    }

    updateSidePart (index, key, value) {
        const sidePart = this.state.sidePart.slice()
        this.setState({
            sidePart: sidePart.map((item, _index) => _index == index ? {...item, [key]: value} : item), 
        })
    }

    changeAddPopInfo (type, e) {
        let obj = {
            [type]: e.target.value
        }
        this.setState((state)=>{
            return ({
                addMaterialInfo: Object.assign({}, state.addMaterialInfo,obj)
            })
        })
    }

    addPopFun() {
        let _this = this
        const info = this.state.addMaterialInfo
        this.setState({
            addPopVisible: false
        })
        axios.post('http://localhost:3000/addData', {...info, "status": "0"}).then(function (res) {
            if(res.data.dataStatus === '000000'){
                message.success('新增成功')
                _this.initTableData()
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    cancelAddPopFun() {
        this.setState({
            addPopVisible: false,
            addMaterialInfo: {
                "name": '',
                "type": "",
                "size": "",
                "sharpness": "",
                "duration": "",
                "author": "",
                "upTime": "",
                "folder": "",
                "organ": "",
                "status": "0"
            }
        })
    }
    render () {
        const {sidePart,currentFocus, chosedFile, addPopVisible} = this.state
        const filesEdit = ()=> {
            let data = sidePart.slice()
            data[currentFocus]&&(data[currentFocus].showInput = true)
            this.setState({sidePart: data})
        }

        const filesDelete = ()=> {
            let data = sidePart.slice()
            data.splice(currentFocus,1)
            this.setState({sidePart: data})
        }
        
        const operateCont = (
            <div>
                <ul className='m-s-pop'>
                    <li onClick={filesEdit}>编辑</li>
                    <li onClick={filesDelete}>删除</li>
                </ul>
            </div>
        )
        
        const filesAdd = ()=> {
            this.setState({
                sidePart: [...sidePart, {
                    name: '文件夹名称',
                    id: Date.now().toString(),
                    showInput: true
                }]
            })
        }

        const onChangeTabs = (e)=> {
            let val = e.target.value
            this.setState({
                fileFilter: val
            })
        }

        const onChangeViewTabs = (e)=> {
            let val = e.target.value
            this.setState({
                viewType: val
            })
        }

        const keysText = [{
            name: '名称',
            key: 'name'
        }, {
            name: '分辨率',
            key: 'sharpness'
        }, {
            name: '大小',
            key: 'size'
        }, {
            name: '时长',
            key: 'duration'
        }, {
            name: '上传人',
            key: 'author'
        }, {
            name: '上传时间',
            key: 'upTime'
        }, {
            name: '所属文件夹',
            key: 'folder'
        }, {
            name: '所属机构',
            key: 'organ'
        }]

        let {name, type, size, sharpness, duration, author, upTime, folder, organ} = this.state.addMaterialInfo
        return (
            <div className='m-wrap'>
                <Row>
                    <Col span={3}>
                        <div className='m-search-wrap'>
                            <Search placeholder="" onSearch={value => console.log(value)} >
                            </Search >
                             <h5>素材分类（全部）<FolderAddOutlined title='新增' onClick={filesAdd} className='m-h5-icon-add' /></h5>
                             <ul className="m-ul">
                                 { sidePart.map((item, index) => {
                                     return (
                                        <li key={item.id}>
                                            <ProfileOutlined style={{marginRight:'5px'}} />
                                            {!item.showInput&&<span className='m-filesname' title={item.name}>{item.name}</span>}
                                            {item.showInput&&(<input type='text' value= {item.name} onChange={(e)=> {
                                                this.updateSidePart(index, 'name', e.target.value)
                                            }} onBlur= {()=> {
                                                this.updateSidePart(index, 'showInput', false)
                                            }} />)}
                                            <Popover content={operateCont} title="" trigger="focus">
                                                <MenuOutlined onClick= {()=> {this.setState({currentFocus:index})}} style={{float:'right',lineHeight:'30px',cursor: 'pointer'}}/>
                                            </Popover>
                                        </li>
                                     )
                                 })}
                             </ul>
                        </div>
                    </Col>
                    <Col span={17}>
                        <div className="m-list-wrap">
                            <h5 className="cur-head">当前位置：素材管理</h5>
                            <div className="botBorder m-addbtn-wrap">
                                <Button type="primary" onClick={this.addMatrial} >添加素材</Button>
                            </div>
                            <div className="botBorder m-c-condition">
                                <span>名称：</span>
                                <Input className='m-c-search'></Input>
                                <span>上传人：</span>
                                <Input className='m-c-search'></Input>
                                <Button type="primary" >查询</Button>
                                <Button type="primary" >重置</Button>
                            </div>
                            <div className="botBorder m-c-tabs">
                                <Radio.Group onChange={onChangeTabs} defaultValue="all">
                                    <Radio.Button value="all">全部</Radio.Button>
                                    <Radio.Button value="video">视频</Radio.Button>
                                    <Radio.Button value="picture">图片</Radio.Button>
                                    <Radio.Button value="text">文档</Radio.Button>
                                </Radio.Group>
                                <div style={{float: 'right'}} >
                                    <Radio.Group onChange={onChangeViewTabs} defaultValue="table">
                                        <Radio.Button value="table"><AppstoreOutlined /></Radio.Button>
                                        <Radio.Button value="list"><UnorderedListOutlined /></Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                            <FileDataList {...this.state}></FileDataList>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="curFileInfo">
                            <h5>详细信息</h5>
                            <ul>
                                {
                                    keysText.map(item => (
                                        <li key={item.key}>
                                            <span className='m-r-label'>{item.name}</span>
                                            <span className='m-r-val'>{chosedFile[item.key]}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="新增素材"
                    visible={addPopVisible}
                    onOk={this.addPopFun}
                    onCancel={this.cancelAddPopFun}
                    >
                    <div>
                        <ul>
                            <li>
                                <span>素材名称</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'name')} value={name}></Input>
                            </li>
                            <li>
                                <span>素材类型</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'type')} value={type}></Input>
                            </li>
                            <li>
                                <span>素材大小</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'size')} value={size}></Input>
                            </li>
                            <li>
                                <span>素材分辨率</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'sharpness')} value={sharpness}></Input>
                            </li>
                            <li>
                                <span>素材时长</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'duration')} value={duration}></Input>
                            </li>
                            <li>
                                <span>素材作者</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'author')} value={author}></Input>
                            </li>
                            <li>
                                <span>素材上传时间</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'upTime')} value={upTime}></Input>
                            </li>
                            <li>
                                <span>素材所属文件夹</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'folder')} value={folder}></Input>
                            </li>
                            <li>
                                <span>素材所属机构</span><Input className='m-c-search' onChange={this.changeAddPopInfo.bind(this,'organ')} value={organ}></Input>
                            </li>
                        </ul>
                    </div>
                </Modal>
            </div>
        )
    }
}