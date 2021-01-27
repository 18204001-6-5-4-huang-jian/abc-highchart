
/*
  *导出图片弹出框详细内容
  *date 2018-05-21
*/
import React ,{Component} from 'react'
import './index.scss'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { Radio ,Row,Col ,Checkbox ,Popover,Button,Icon} from 'antd'
import ChartColorPanel from './../ChartColorPanel';
import HighchartsExporting  from 'highcharts-exporting';
import OfflineExporting from  'highcharts-offline-exporting';

OfflineExporting( ReactHighstock.Highcharts);
HighchartsExporting( ReactHighstock.Highcharts);


class ChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      installConfig:props.installconfig,
      imgAdditions: ['1','2'],
      imgSize: 1,
      chartType: "image/jpeg",
      activeIndex: "1",
      chartHeight: 900,
      chartWidth:1200,
      title:props.installconfig.title.text,
      visible:false
    };
  }


  //图例  标题
  changeImgAddition(value) {
    let { title, installConfig } = this.state;
    if (value.indexOf("2") !== -1) {
      installConfig.title.text = title;
    } else {
      installConfig.title.text = "";
    }
    if (value.indexOf("1") !== -1) {
      installConfig.legend.enabled = true;
    } else {
      installConfig.legend.enabled = false;
    }
    this.setState({ imgAdditions: value, installConfig: installConfig });
  }


  //图片尺寸
  changeImgScale = event => {
    let imgSize = event && event.target ? event.target.value : 1;
    let height = 900;
    if (imgSize) {
      switch (imgSize) {
        case 2:
          height = 900;
          break;
        case 3:
          height = 800;
          break;
        case 4:
          height = 600;
          break;
        default:
          height = 1200;
          break;
      }
    }
    this.setState({
      imgSize: imgSize,
      chartHeight: height
    });
  };

  //图表类型
  changeImgStyle = e => {
    this.setState({
      imgStyle: e.target.value
    });
  };

  //图表颜色
  changeChartColor(colorSetting) {
    if (colorSetting && colorSetting.hex) {
      let colorCode = colorSetting.hex;
      let chartConf = this.state.installConfig;
      let activeIndex = this.state.activeIndex;
      if (chartConf.series && chartConf.series.length > 0) {
        if (chartConf.series[activeIndex]) {
          chartConf.series[activeIndex].color = colorCode;
        }
      }
      this.setState({
        installConfig: chartConf
      });
    }
  }

  //输入框颜色变化
  ChangeInputColor = item => {
    // console.log(hex);
    let chartConf = this.state.installConfig;
    let activeIndex = this.state.activeIndex;
    if (chartConf.series && chartConf.series.length > 0) {
      if (chartConf.series[activeIndex]) {
        chartConf.series[activeIndex].color = item.hex;
      }
    }
    this.setState({
      installConfig: chartConf
    })
  }

  //选择的图片类型
  changeChartType(event) {
    let type = event && event.target ? event.target.value : "image/jpeg";
    this.setState({ chartType: type });
  }

  //导出图片
  exportImage = () => {
    let { title, chartType, chartWidth, chartHeight } = this.state;
    let options = {
      sourceWidth: chartWidth, //宽
      sourceHeight: chartHeight, //高
      filename: title, //标题
      type: chartType, //图表类型
    }
    const charts = this.refs.charts;
    charts.chart.exportChartLocal(options);
  };
  
  //点击确定和取消按钮，隐藏颜色的popover
  handlePopover() {
    this.setState({
      visible:false
    })
  }
 
  handleVisibleChange(visible){
    this.setState({ visible });
  }

 //取消的话颜色配置选择之前的配置
  handlerepaint() {
    this.setState({
      installConfig:this.props.installconfig
    })
  }


  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const chartColorPanel = (
      <ChartColorPanel
        chartConf={this.props.installconfig}
        activeIndex={this.state.activeIndex}
        onIndexChange={activeKey => {
          this.setState({ activeIndex: activeKey });
        }}
        onChangeChartColor={colorCode => {
          this.changeChartColor(colorCode);
        }}
        onChangeInputColor={hex => {
          this.ChangeInputColor(hex);
        }}
        onHandlePopover={this.handlePopover.bind(this)}
        onRepaint={this.handlerepaint.bind(this)}
      />
    )

    return (
      <div className="detail-trend-modal-content">
        <Row className="detail-trend-modal-content">
          <Col span={17}>
            <div className="trend-modal-content-left">
              <div className="modal-content-left-kong" />
              <ReactHighstock config={this.state.installConfig} ref="charts"></ReactHighstock>
            </div>
          </Col>
          <Col span={7}>
            <div className="trend-modal-content-right">
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">主题颜色</p>
                <Popover
                  placement="bottomLeft"
                  content={chartColorPanel}
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange.bind(this)}
                >
                  <Button>
                    图表色系
                    <Icon type="down" />
                  </Button>
                </Popover>
              </div>

              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">图表设置</p>
                <Checkbox.Group
                  value={this.state.imgAdditions}
                  onChange={value => {
                    this.changeImgAddition(value);
                  }}
                >
                  <Checkbox value="1" >
                    图例
                  </Checkbox>
                  <Checkbox value="2">
                    标题
                  </Checkbox>
                </Checkbox.Group>
              </div>
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">导出尺寸</p>
                <Radio.Group
                  value={this.state.imgSize}
                  style={{ paddingTop: 10 }}
                  onChange={e => {
                    this.changeImgScale(e);
                  }}
                >
                  <Radio style={radioStyle} value={1}>
                    4:3(1200 * 900 px)
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    3:2(1200 * 800 px)
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    2:1(1200 * 600 px)
                  </Radio>
                  <Radio style={radioStyle} value={4}>
                    1:1(1200 * 1200 px)
                  </Radio>
                </Radio.Group>
              </div>
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">图片格式</p>
                <Radio.Group
                  value={this.state.chartType}
                  style={{ paddingTop: 10 }}
                  onChange={event => {
                    this.changeChartType(event);
                  }}
                >
                  <Radio style={radioStyle} value={"image/jpeg"}>
                    JPG
                  </Radio>
                  <Radio style={radioStyle} value={"image/png"}>
                    PNG
                  </Radio>
                  <Radio style={radioStyle} value={"image/svg+xml"}>
                    SVG(支持无限放大)
                  </Radio>
                </Radio.Group>
              </div>
              <p
                className="modal-content-right-exportBtn"
                onClick={this.exportImage}
              >
                导出图片
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ChartModal