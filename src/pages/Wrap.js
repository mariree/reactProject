import React from 'react'
import { BrowserRouter as Router, Route ,Switch}  from 'react-router-dom'
import Title from './Title'
import Default from './Default'
import Siderbar from './Sidebar'
import Material from '../componets/Material'
import Area from './Area'
import Task from './Task'
import TaskDetail from './TaskDetail'
import Map from './Map'
import Complex from './Complex'
import EMap from './EMap'

class Wrap extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Router>
                <div className="wrap">
                    <Title></Title>
                    <div className='content'>
                        <Siderbar></Siderbar>
                        <div className="routeWrap">
                                <Switch>
                                    <Route path="/" component={Default} exact />
                                    <Route path='/Index' component = {Default} exact />
                                    <Route path='/Material' component = {Material} exact />
                                    <Route path='/Area' component = {Area} exact />
                                    <Route path='/Task' component = {Task} exact />
                                    <Route path='/TaskDetail' component = {TaskDetail} exact />
                                    <Route path='/Map' component = {Map} exact />
                                    <Route path='/Complex' component = {Complex} exact />
                                    <Route path='/EMap' component = {EMap} exact />
                                </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
export default Wrap