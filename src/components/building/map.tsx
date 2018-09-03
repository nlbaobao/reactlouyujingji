import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "antd";
import store from "../../store";
import AddBuilding from "./add";
import loaderService from "../../services/loader";
interface Props {
  id: string;
  lng: string;
  lat: string;
  title: string;
}
export default class extends React.Component<RouteComponentProps<Props>> {
  render() {
    return (
      <div className="buildingmap-wrap">
        <div id="building-map" className="building-map" />
        <div className="back-list">
          <Button type="primary" onClick={this.backbuildinglist.bind(this)}>
            返回楼宇列表
          </Button>
        </div>
      </div>
    );
  }

  map: BMap.Map;

  loadMap() {
    if (this.props.match.params.id) {
      this.map = new BMap.Map("building-map", { enableMapClick: false });
      this.map.enableScrollWheelZoom();
      let point = new BMap.Point(
        Number(this.props.match.params.lng),
        Number(this.props.match.params.lat)
      );
      this.map.centerAndZoom(point, 14);
      let marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      let opts = {
        width: 200, // 信息窗口宽度
        height: 100 // 信息窗口高度
      };
      let infoWindow = new BMap.InfoWindow(this.props.match.params.title, opts); // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, point); //开启信息窗口
    } else {
      this.map = new BMap.Map("building-map", { enableMapClick: false });
      this.map.enableScrollWheelZoom();
      let point = new BMap.Point(114.231952, 30.59635);
      this.map.centerAndZoom(point, 14);
      let map = new BMap.Map("container");
      this.map.onclick = e => {
        (e["domEvent"] as Event).stopPropagation();
        let unmount = loaderService.mount(
          <AddBuilding
            lng={e.point.lng + ""}
            lat={e.point.lat + ""}
            afterClose={() => unmount()}
            onSuccess={() => {
              this.props.history.goBack();
              // 保存成功，刷新列表
            }}
          />
        );
      };
    }
  }

  backbuildinglist() {
    this.props.history.goBack();
  }

  componentDidMount() {
    store.dispatch({
      type: "SET_MENU",
      menu: "building"
    });
    this.loadMap();
  }

  componentWillUnmount() {
    this.map = null;
  }
}
