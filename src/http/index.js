/**
 * API
 */
import React from "react";
import Axios from "axios";
import Transers from "../../config1/transers";

let instance = Axios.create({
    baseURL: 'http://127.0.0.1:8888'
});
// 超时时间
instance.defaults.timeout = 1000;
// 在实例已创建后修改默认值
//instance.defaults.headers.['Authorization'] = AUTH_TOKEN;
instance.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8;";
export default class Https {
    constructor(Obj) {
        const { data, params, headers, method, url, callback} = Obj;
        this.url = url;
        this.data = data;
        this.params = params;
        this.headers = headers;
        this.method = method;
        this.callback = callback || null;
    }


    getResults() {
        instance.request({
            url: this.url || "",
            // `method` 是创建请求时使用的方法
            data: this.data || {},
            method: this.method || "get", // 默认是 get  Obj.headers.login_token = login_token;
            validateStatus: function (status) {
                return status != 404; // 404
            },
        }).then((res) => {
            this.callback(res);
        }).catch(() => {
            alert("AAAA")
        })
    }
}
