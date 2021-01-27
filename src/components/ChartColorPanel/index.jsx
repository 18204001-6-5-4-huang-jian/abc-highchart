/*
  *导出图片--颜色筛选
  *date 2018-05-21
*/

import React from 'react';
import { Icon, Tabs ,Select,Button} from 'antd';
import ColorPick from './../ColorPick'
import { CirclePicker} from 'react-color';
import './index.scss';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ChartColorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorSet: ["#5182e4","#f48122","#9acb66","#51b4f0","#69d4db","#3fb27e","#f8cc4a","#f2f352","#D42D6B","#ce63d6","#8853d4","#5155b7"],
            showColorPick:false,
            inputColor:'#5182e4',
            colorCode:{}
        }
    }

    handleColorGroupChange = (colorGroupCode) => {
        let colorSet = [];
        switch(colorGroupCode)
        {
            case 'green':
                colorSet = ["#0a623d","#149448","#3fb27e","#b7cc42","#d1ea57","#7fad9c","#aecdc3","#b4baa5"];
                this.setState({
                    inputColor:'#0a623d'
                })
                break;
            case 'yellow':
                colorSet = ["#e5592d","#fd9827","#fed44f","#e1d09f","#994d2e","#e29971","#da5546","#dba946"];
                this.setState({
                    inputColor:'#e5592d'
                })
                break;
            case 'deepPurple':
                colorSet = ["#5155b7", "#7260b0", "#a562ab", "#ce63d6", "#8853d4", "#a145c9", "#6e5ce7"];
                this.setState({
                    inputColor:'#5155b7'
                })
                break;
            case 'blue':
                colorSet = ["#5155b7", "#5182e4", "#51b4f0", "#51d2b4", "#fdb730", "#f48122"];
                this.setState({
                    inputColor:'#5155b7'
                })
                break;
            case 'lightgreen':
                colorSet = ["#0a623d", "#149448", "#3fb271", "#87cc42", "#d1ea57", "#7fad9c", "#c7cbab", "#f48122", "#fdb730"];
                this.setState({
                    inputColor:'#0a623d'
                })
                break;
            case 'purple':
                colorSet = ["#5155b7", "#7260b0", "#a562ab", "#d3c2da", "#ce63d6", "#87cc42", "#fdb730"];
                this.setState({
                    inputColor:'#5155b7'
                })
                break;
            case 'gray':
                colorSet =  ["#5a6a7b", "#9eb1bd", "#5c6a86", "#898e94", "#cbd3da", "#5571A5"];
                this.setState({
                    inputColor:'#5a6a7b'
                })
                break;
             case 'gold':
                colorSet = ["#99804D", "#BAA588", "#E1D09F", "#DBA946", "#C3A672", "#E8CD71"];
                this.setState({
                    inputColor:'#99804D'
                })
                break;
            default:
                colorSet = ["#5182e4","#f48122","#9acb66","#51b4f0","#69d4db","#3fb27e","#f8cc4a","#f2f352","#D42D6B","#ce63d6","#8853d4","#5155b7"];
                this.setState({
                    inputColor:'#5182e4'
                })
                break;
        }
        this.setState({
            colorSet: colorSet
        });
    }
    changeInputValue = (colorCode) => {
        // console.log(colorCode);
        this.setState({
            inputColor:colorCode.hex
        })
    }
       
    handleOK(){
        this.props.onChangeChartColor(this.state.colorCode);
        this.props.onHandlePopover();
    }
    handleCancle(){
        this.props.onRepaint();
        this.props.onHandlePopover();
    }

    render() {
        let {chartConf} = this.props;
        return (<div className="abc-chart-colorselect-con">
            <Tabs activeKey={this.props.activeIndex}
                tabPosition={'left'} className="abc-chart-colorselect"
                onChange={(activeKey)=> {this.props.onIndexChange(activeKey)}}>
                <TabPane tab='全部指标' key="all" disabled></TabPane>
                {chartConf && chartConf.series.map((item, index) => {
                    return (
                    item.type != 'candlestick' && 
                    <TabPane tab={
                        <span><Icon type="line-chart" />{item.name}</span>} key={index}>
                            配色方案：
                        <Select defaultValue="default" style={{height: 25}} onChange={(value)=>this.handleColorGroupChange(value)}>
                            <Option value="default">默认色</Option>
                            <Option value="green">经典绿</Option>
                            <Option value="yellow">落叶黄</Option>
                            <Option value="deepPurple">高贵紫</Option>
                            <Option value="blue">对比蓝</Option>
                            <Option value="lightgreen">对比绿</Option>
                            <Option value="purple">对比紫</Option>
                            <Option value="gray">商务灰</Option>
                            <Option value="gold">高端金</Option>
                        </Select>

                        <CirclePicker colors={this.state.colorSet}
                            onChange={(colorCode)=> {
                                //this.props.onChangeChartColor(colorCode);
                                 this.setState({
                                    colorCode:colorCode
                                })
                                this.changeInputValue(colorCode);
                            }}/>
                           自定义颜色：
                        <div>
                        <ColorPick
                             color={this.state.inputColor}
                             onChange={(hex)=> {
                                //this.props.onChangeInputColor(hex);
                                this.setState({
                                    colorCode:hex
                                })
                                this.changeInputValue(hex);
                            }}
                        />
                        </div>
                          <div>
                            <Button onClick={this.handleOK.bind(this)}>确定</Button>
                            <Button onClick={this.handleCancle.bind(this)}>取消</Button>
                         </div>
                    </TabPane>
                        )
                    }
                 )
              }
            </Tabs>
        </div>)
    }
}

export default ChartColorPanel;