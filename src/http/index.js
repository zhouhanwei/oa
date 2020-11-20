/**
 * API
 */
import React from "react";
import Axios from "axios";
import Transers from "@cf/transers";
import queryString from 'querystring';

let instance = Axios.create({
    baseURL: 'http://127.0.0.1:8888'
});
// 超时时间
instance.defaults.timeout = 1000;
// 在实例已创建后修改默认值
//instance.defaults.headers.['Authorization'] = AUTH_TOKEN;
//instance.defaults.headers['Content-Type'] = "application/json;charset=utf-8;";
export default class Https {
    constructor(Obj) {
        const { data, params, headers, method, url, callback, transer, isQuery} = Obj;
        this.url = url;
        this.data = data;
        this.params = params;
        this.headers = headers;
        this.method = method;
        this.callback = callback || null;
        this.transer = this.transer || 0;
        this.isQuery = isQuery;
    }


    getResults() {
        //instance.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8;';
        if (!this.isQuery) {
            this.data = queryString.stringify(this.data);
        }
        return new Promise((resolve, reject) => {
            instance.request({
                url: this.url || "",          // 路径
                data: this.data || {},        // body参数
                method: this.method || "get", // 默认是 get
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': Transers[this.transer] || Transers[1]
                },
                validateStatus: function (status) {
                    return status != 404; // 404
                },
            }).then((res) => {
                if (res.data && res.data.code == 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
