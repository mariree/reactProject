import React from 'react'

const initialState = {
    todoList: [{
        name: 'name1',
        msg: 'msg1',
        date: '1001'
    }, {
        name: 'name2',
        msg: 'msg2',
        date: '1002'
    }, {
        name: 'name3',
        msg: 'msg3',
        date: '1003'
    }]
}
const StoreContext = React.createContext({
    ...initialState
})

export default StoreContext