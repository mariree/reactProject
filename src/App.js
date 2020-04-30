import React, { Fragment } from 'react';
import './App.css';
import Home from './pages/Home'
import Wrap from './pages/Wrap'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('props',this.props)
    }
    render() {
        let loginInfo = localStorage.getItem('loginInfo')
        return (
        <Fragment>
            {
            //   loginInfo ? (<Wrap></Wrap>) : (<Home></Home>)
            <Wrap></Wrap>
            }
        </Fragment>
        
        )
    }
}

export default App;
