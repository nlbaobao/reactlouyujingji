import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Button, Row, Col, Input, Modal } from "antd";
import { BuilldingItem } from "../../interfaces/model";
import "./style.less";
import store from "../../store";
import loaderService from "../../services/loader";
import buildingservice from "../../services/building";
import InfoComponent from "./info";
import checkRole from "../../services/check-role";

interface Props {
  id?: string;
  lng: number;
  lat: number;
  path: string;
}
interface InfoWindowOptions {
  width?: number;
  height?: number;
  maxWidth?: number;
  offset?: Size;
  title?: string;
  enableAutoPan?: boolean;
  enableCloseOnClick?: boolean;
  enableMessage?: boolean;
  message?: string;
}
interface Size {
  width: number;
  height: number;
}
interface Bubble {
  cancelBubble: boolean;
  stopPropagation: () => void;
}
interface State {
  rows: BuilldingItem[];
  row: BuilldingItem;
}
export default class extends React.Component<
  RouteComponentProps<Props>,
  State
> {
  render() {
    return (
      <div className="map-wrap">
        <div id="map-container" className="map-container" />
        <div className="map-toolbar">
          <Input.Search
            placeholder="搜索关键词"
            onSearch={value => {
              this.SearchBuilding(value);
            }}
            enterButton
          />
        </div>
        <div className="company-bar">
          {this.state.rows.map(item => {
            return (
              <Row key={item.id}>
                <h5 className="bar-title">{item.name}</h5>
                <Col offset={3} span={20}>
                  空置率：{item.vacant_rate}%
                </Col>
                <Col offset={3} span={20}>
                  纳税在地率：{item.taxes_companies_rate}%
                </Col>
                <Col offset={3} span={20}>
                  注册在地率：{item.register_companies_rate}%
                </Col>
                <Button
                  size="small"
                  onClick={() => this.gotoDetail(item)}
                  className="bar-detail"
                >
                  查看详情
                </Button>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
  map: BMap.Map;
  info(lng?: number, lat?: number, id?: string) {
    let unmount = loaderService.mount(
      <InfoComponent
        lng={lng}
        lat={lat}
        id={id}
        afterClose={() => {
          unmount();
        }}
        successLook={() => {
          unmount();
          this.props.history.push(`/home/map/building/${id}`);
        }}
      />
    );
  }
  localSearch: BMap.LocalSearch;
  async SearchBuilding(keyword: string) {
    if (!keyword) {
      if (this.localSearch) {
        this.localSearch.clearResults();
      }
      return;
    }
    this.localSearch = new BMap.LocalSearch(this.map, {
      renderOptions: {
        map: this.map
      }
    });
    this.localSearch.search(keyword);
  }
  initMap(position: BuilldingItem[]) {
    this.map = new BMap.Map("map-container", {
      enableMapClick: false
    });
    this.map.enableScrollWheelZoom();
    let point = new BMap.Point(114.231952, 30.59635);
    this.map.centerAndZoom(point, 14);
    let points: BMap.Point[] = [];
    setTimeout(() => {
      position.forEach(item => {
        let point = new BMap.Point(item.longitude, item.latitude);
        points.push(point);
        let marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
        let flag: boolean = false;
        marker.addEventListener("click", (e: Bubble) => {
          this.stopBubble(e);
          this.props.history.push(`/home/map/building/${item.id}`);
        });

        marker.onmouseover = e => {
          if (flag == true) {
            return;
          }
          const sContent = `
        <div  class = "sContent-wrap">
        <p class = "sContent-p">空置率：${item.vacant_rate}</p>
        <p>纳税在地率：${item.taxes_companies_rate}</p>
        <p>注册在地率：${item.register_companies_rate}</p>
        </div>`;
          let opts: InfoWindowOptions = {
            width: 150,
            height: 110,
            offset: { width: -10, height: -30 },
            title: item.name,
            enableCloseOnClick: false
          };
          let infoWindow = new BMap.InfoWindow(sContent);
          this.map.openInfoWindow(infoWindow, point);
        };

        marker.onmouseout = e => {
          this.map.closeInfoWindow();
        };
      });
      this.map.setViewport(points);
    }, 1000);
  }

  gotoDetail(list: BuilldingItem) {
    this.props.history.push(`/home/map/building/${list.id}`);
  }

  stopBubble(e: Bubble) {
    e = window.event || e;
    if (document.all) {
      //只有ie识别
      e.cancelBubble = true;
    } else {
      e.stopPropagation();
    }
  }
  state: State = {
    rows: [],
    row: {}
  };
  async listFile() {
    try {
      let data = await buildingservice.buildinginfo();
      if (data.stat === "ok") {
        this.setState(
          {
            rows: data.items
          },
          () => {
            this.initMap(this.state.rows);
          }
        );
      } else {
        checkRole.checkerrcode(data.stat);
      }
    } catch (error) {
      Modal.error({
        title: "提示",
        content: "网络错误"
      });
    }
  }
  componentWillMount(){
    console.log("我是map"+"willmount");
  }
  componentDidMount() {
    console.log("我是map"+"我加载了11111");
    store.dispatch({
      type: "SET_MENU",
      menu: "map"
    });
    this.listFile();
  }

  componentWillUnmount() {
    this.map = null;
  }
}
