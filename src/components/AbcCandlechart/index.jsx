/*
  *图表详情页
  *zhzhliu 2018-05-21
*/
import React ,{Component} from 'react'
import {Popover,Modal,Icon} from 'antd'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import './index.scss'
import ChartModal from "./../../components/ChartModal"
import XLSX from 'xlsx'
class AbcCandlechart extends Component{
    constructor(props){
        super(props)
        this.state={
            showImageSetting:false,
            installconfig:this.props.modalData.data.config,
            chartData:this.props.chartData
        }
    }
    
    exportHandle = () => {
         //导出image隐藏图表导出弹出框
         this.setState({
            showImageSetting:false
         })
     }

     downloadData = () => {
      let {installconfig ,chartData} = this.state;
      let downloadData =  this.getImageText(installconfig);
      this.downloadExcel(chartData.chartTitle,downloadData);
   }
    /**
   * 表格信息提取
   */
     getImageText(chartConf) {
        let tableArr = [];
        let series = chartConf.series||[];
        if(series.length <1){
            return tableArr;
        }
        let arr = series[0].data;
        let firstArr = [];
        firstArr.push(chartConf.xAxis.type);
        if(series[0].type === 'candlestick'){
            firstArr.push(series[0].name+'(开盘)');
        }else{
            firstArr.push(series[0].name);
        }
        tableArr.push(firstArr);
        for (let i in arr){
            //遍历第一组数据
            let eleArr = [];
            for (let j in arr[i]){
                eleArr.push(arr[i][j]);
            }
            tableArr.push(eleArr);
        }
        console.log(tableArr)
        for(var m=0; m<series.length; m++) {
                if(series[m].type === 'candlestick') {
                  if(m===0) {
                      tableArr[0].push('最高','最低','收盘');
                  }else {
                    tableArr[0].push(series[m].name+'(开盘)','最高','最低','收盘');
                    var candlelData = series[m].data;
                    console.log(series[m].data)
                    for(let k=0; k < candlelData.length; k++) {
                     for(let j = 1; j<candlelData[k].length; j++) {
                      tableArr[k+1].push(candlelData[k][j]);
                    }
                  }
                }
            }else {
                tableArr[0].push(series[m].name);
                var normalData = series[m].data;
                for(var n=0; n<normalData.length; n++) { 
                    var item = normalData[n][1];
                    tableArr[n+1].push(item);
                }
            }
        }
        return  tableArr;
    }
  /**
   * 下载表格
   */
   downloadExcel(name,data){
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile( wb, name + '.xlsx');
  }

    render(){  
          const { installconfig ,chartData} = this.state;
          chartData.data.config['title']= {
            text: ''
          }
          const content = (
            <div className="selectbox">
              <p className="select-p" onClick={this.downloadData}>导出数据</p>
              <p className="select-p" onClick={() => {this.setState({showImageSetting:true})}}>导出图片</p>
            </div>
          )

        return( 
          <div className="detail-chart">
             <div className="detail-chart-head">
               <div className="iresearch-detail-trend-update">
                 <span>{chartData.update.text}</span>
                 <span>更新</span>
               </div>
               <div className="detail-trend-set">
                 <Popover content={content} trigger="hover" placement="bottom" overlayClassName="selectList">
                 <Icon type="menu-unfold" className='icon'/>
                 </Popover>
               </div>
             </div>
            
             <div className="iresearch-detail-trend-chartContainer">
               <ReactHighstock config={this.props.chartData.data.config}></ReactHighstock>
             </div>
    
            {/* 图表导出模块 */}
             <Modal title='导出设置' width={900} height={600} footer={null}
                    visible={this.state.showImageSetting}
                    onCancel={() => this.setState({showImageSetting: false})}
                    className="detail-chart-modal">
                 <ChartModal installconfig={this.state.installconfig} exports={this.exportHandle}/>
             </Modal>
          </div>
        )
    }
}
export default AbcCandlechart