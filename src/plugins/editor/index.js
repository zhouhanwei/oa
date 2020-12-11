/**
 * 功能: ALERT/CORFIRM
 * 开发: 周瀚伟
 * 时间: 2020-02-12
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import E from 'wangeditor';
import './index.scss';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";

class Alert extends Component {
  constructor (props) {
    super(props);
    this.state = {
      idName: "",
    };
  }

  // 打开提示框
  createEditor (idName) {
    this.setState({
      idName,
    })
    const editor = new E("#" + idName);
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      // 上传图片，返回结果，将图片插入到编辑器中
      let Data = new FormData();
      //console.log(resultFiles[0])
      Data.append("file", resultFiles[0])
      handleApiResult({
        url: `${Url.UPLOAD_EDITOR_IMG}`,
        data: Data,
        method: "post",
        isQuery: true,
      }).then((res) => {
        alert(JSON.stringify(res))
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }
    editor.create();
  }

  // 关闭提示框
  done () {

  }

  // 点击确认按钮后执行的代码
  confirm () {
    // 触发callBackName，执行确认后的逻辑
  }

  render () {
    const {idName} = this.state; // 解构
    return (
      <div id={idName}></div>
    );
  }
}
// 创建元素并追加到body
let div = document.createElement('div');
let props = {};
document.body.appendChild(div);

// 渲染
let Install = ReactDOM.render(React.createElement(
  Alert,
  props,
), div);

export default Install;
