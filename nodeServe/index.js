const fs = require('fs');
const api = require('./http')
const express = require('express')
// const bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 查询素材列表数据
api.get('/getTest1', (req, res) => {
    res.status(200)
    fs.readFile(__dirname + '/public/material.json', 'utf8', function (err, data) {
        if (err) throw err;
        let list = JSON.parse(data)
        res.json({
            dataStatus:'000000',
            dataMsg: 'success',
            data: list
        })
    })
})

// 新增素材列表数据
api.post('/addData', (req, res) => {
    res.status(200)
    fs.readFile(__dirname + '/public/material.json', 'utf8', function (err, data) {
        console.log('req----------',req.body)
        let list = JSON.parse(data).data
        list.push(Object.assign({},req.body,{"id": Date.now().toString(),"key": Date.now().toString()}))
        let newdata = JSON.stringify({"data":list})
        fs.writeFile(__dirname + '/public/material.json', newdata, 'utf8', (err) => {
            if (err) throw err;
            console.log('新增成功')
            res.json({
                dataStatus:'000000',
                dataMsg: 'success'
            })
        })
    })
})

// 删除素材列表数据
api.post('/deleteData', (req, res) => {
    res.status(200)
    fs.readFile(__dirname + '/public/material.json', 'utf8', function (err, data) {
        console.log('id----',req.body)
        let list = JSON.parse(data).data
        list = list.filter(item=> {
            return Boolean(item.id !== req.body.id)
        })
        let newdata = JSON.stringify({"data":list})
        fs.writeFile(__dirname + '/public/material.json', newdata, 'utf8', (err) => {
            if (err) throw err;
            console.log('删除成功')
            res.json({
                dataStatus:'000000',
                dataMsg: 'success'
            })
        })
    })
})
api.listen(3000)
