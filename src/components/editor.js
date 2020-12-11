import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import E from 'wangeditor';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";

class Editor extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {idName, getContent} = this.props;
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
                console.log("http://localhost:8888/" + res.data.data)
                insertImgFn("http://localhost:8888/" + res.data.data);
            }).catch((error) => {
                alert(JSON.stringify(error))
            })
        }
        editor.config.onblur = function (newHtml) {
            // 获取最新的 html 内容
            getContent(newHtml, idName);
        }
        editor.config.onchange = function (newHtml) {
            // 获取最新的 html 内容
            getContent(newHtml, idName);
        }
        editor.create();
    }

    render() {
        const {idName} = this.props;
        return (
            <div id={idName}></div>
        )
    }
}

export default Editor;