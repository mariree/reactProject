import React from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'

class Map extends React.Component {
    constructor() {
        super()
        this.initMap = this.initMap.bind(this)
    }

    initMap() {
        AMapLoader.load({
            "key": "8f818d025cd07c99400067ea8bd77857",
            "version": "2.0"
        }).then((AMap)=>{
            let map = new AMap.Map('mapContainer', {
                center: [114.41404742333984, 30.479122071745326],
                zoom: 18,
                resizeEnable: true,
                rotateEnable:true,
                pitchEnable:true,
                pitch:30, // 地图俯仰角度，有效范围 0 度- 83 度
		        viewMode:'3D' // 地图模式

            })
            map.addControl(new AMap.ControlBar({
                showZoomBar:false,
                showControlButton:true,
                position:{
                    right:'10px',
                    top:'10px'
                }
            }))





        }).catch(e => {
            console.log(e);
        })
    }

    componentDidMount() {
        this.initMap()
    }

    render() {
        return (
            <div className='mapWrap'>
                <p className="crumbs">当前位置: 终端管理 > 终端位置</p>
                <div className="mapContainer" id="mapContainer"></div>
            </div>
        )
    }
}

export default Map