import React, {Fragment} from 'react'

class MyTree extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        let {props} = this.props
        return (
            <div className="mytree">
                <p className="tree-parent"><i className="icon-treeIcon"></i>{props.name}</p>
                {
                    props.children&&props.children.length>0&&
                    props.children.map(item => (
                        <Fragment key={item.id}>
                            <MyTree props={item}></MyTree>
                        </Fragment>
                    ))
                    
                }
            </div>
        )
    }
}

// function MyTree(props) {
//     return 
// }
export default MyTree