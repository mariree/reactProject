import React from 'react'
import PropTypes from 'prop-types';

class LayoutSide extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        const {sideList} = this.props
        return (
            <div className="layoutSide">
                {
                    sideList.map(item=> (
                        <div key={item.id} className="l-sideItem">
                            {item.icon}
                            <p>{item.text}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

LayoutSide.propTypes = {
    sideList: PropTypes.array.isRequired
  }
export default LayoutSide