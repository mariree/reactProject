import React, { Component } from 'react'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from '../http';
// import { ProfileOutlined, MenuOutlined, FolderAddOutlined, UnorderedListOutlined, AppstoreOutlined} from '@ant-design/icons';
import LayoutSide from '../componets/LayoutSide'

class Increase extends Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <>
                <p onClick={() => { this.props.increase(this.props.number) }}>increase: {this.props.number}</p>
                <span onClick={this.test}>点我发请求</span>
                <div>
                    <p>标题</p>
                    <ul>
                        <li>1</li>
                    </ul>
                </div>
                <span onClick={this.test}>点我发请求1111</span>
            </>
        )
    }

    test() {
        // axios.get('http://localhost:3000/getTest1', {
        // }).then(function (response) {
        //     console.log(response)
        // }).catch(function (error) {
        //     console.log(error);
        // });
        axios.post('/editData', {
            params: {}
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        });
    }
}

// const states = {
//     sideList: [{
//         id: '001',
//         icon: <ProfileOutlined/>,
//         text: '文本'
//     }]
// }






function couterUp(state = { number: 100 }, action) {
    switch (action.type) {
        case 'up':
            return {
                number: state.number + action.payload
            };
        default:
            return state;
    }
}

let store = createStore(couterUp)

function mapStateToProps(state) {
    return {
        number: state.number
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        increase: (num) => dispatch({
            type: 'up',
            payload: num
        })
    };
}

let Content = connect(
    mapStateToProps,
    mapDispatchToProps
)(Increase);

let LayoutSideWrap = connect(state => ({
    sideList: state.sideList
}))(LayoutSide)

export default class Complex extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Provider store={store}>
            <div className="complex">
                {/* <LayoutSideWrap /> */}
                <Content />
            </div>

        </Provider>
    }
}
