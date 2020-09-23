import React from 'react'
import { Form, Row, Col, InputNumber, Checkbox } from 'antd';

class LayoutInfo extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <div className="layoutInfo">
                {
                    // this.props.currentItemData.id&&
                    // <Form className="form_pane">
                    //     <h3 className="divider"><span>位置和大小</span></h3>
                    //     <Row gutter={10}>
                    //         <Col span={12}>
                    //             <FormItem label="X"><InputNumber precision={0} disabled={!editable || isTemp} size="small" value={x} onChange={(value) => this.onChange({ x: value })} /></FormItem>
                    //         </Col>
                    //         <Col span={12}>
                    //             <FormItem label="Y"><InputNumber precision={0} disabled={!editable || isTemp} size="small" value={y} onChange={(value) => this.onChange({ y: value })} /></FormItem>
                    //         </Col>
                    //         {
                    //             (type !== 'Time' && type !== 'Dater' && weatherStyle!=='0') &&
                    //             <Fragment>
                    //                 <Col span={12}>
                    //                     <FormItem label="W"><InputNumber precision={0} disabled={isRoot || (!isRoot && !editable) || !resizeAble} size="small" min={0} value={w} onChange={(value) => this.onChange({ w: value })} /></FormItem>
                    //                 </Col>
                    //                 <Col span={12}>
                    //                     <FormItem label="H"><InputNumber precision={0} disabled={isRoot || (!isRoot && !editable) || !resizeAble || autoHeight} size="small" min={0} value={h} onChange={(value) => this.onChange({ h: value })} /></FormItem>
                    //                 </Col>
                    //                 <Col span={12}>
                    //                     <FormItem label="等比"><Checkbox disabled={!editable || isTemp} checked={equalRatio} onChange={(e) => this.onSet({ equalRatio: e.target.checked })} /></FormItem>
                    //                 </Col>
                    //             </Fragment>
                    //         }
                    //         <Col span={12}>
                    //             <FormItem label="层级"><InputNumber precision={0} disabled={isRoot || (!isRoot && !editable)} size="small" min={0} value={zIndex} onChange={(value) => this.onChange({ zIndex: value })} /></FormItem>
                    //         </Col>
                    //         <Col span={12}>
                    //             <FormItem label="锁定"><Checkbox disabled={disabled || isTemp} checked={!editable} onChange={(e) => this.onSet({ editable: !e.target.checked })} /></FormItem>
                    //         </Col>
                    //     </Row>
                    // </Form>
                }
            </div>
        )
    }
}

export default LayoutInfo