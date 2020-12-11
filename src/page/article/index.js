import React from "react";
import {
    withRouter,
} from "react-router-dom";
import { Table, Space, Form, Input, Button, Radio } from 'antd';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";
import '../../assets/scss/classify/index.scss';

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <a>上一页</a>;
    }
    if (type === 'next') {
        return <a>下一页</a>;
    }
    return originalElement;
}

const columns = [
    {
        title: '名称',
        dataIndex: 'classifyName',
        key: 'classifyName',
        width: 300,
        render: text => <a>{text}</a>,
    },
    {
        title: '描述',
        dataIndex: 'classifyDes',
        key: 'classifyDes',
    },
    {
        title: '图标',
        dataIndex: 'classifyIcon',
        key: 'classifyIcon',
        width: 160,
        render: (url) => (
            <div>
                <img src={url} width="60"/>
            </div>
        ),
    }
];


const formItemLayout = {
    // labelCol: {
    //     span: 8,
    // },
    // wrapperCol: {
    //     span: 16,
    // },
}

const onFormLayoutChange = ({ layout }) => {

};

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [...columns, ...[{
            title: "操作",
            key: 'action',
            fixed: 'right',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" ghost size="small">编辑</Button>
                    <Button size="small" danger onClick={this.delClassify.bind(this, record.id)}>删除</Button>
                </Space>
            ),
            align: "center",
            width: 150,
        }]];
        this.state = {
            current: 1,
            tableList: [],
            total : 0,
        };

        this.onShowSizeChange = this.onShowSizeChange.bind(this);    // 分页切换
        this.delClassify = this.delClassify.bind(this);   // 删除
        this.addOrEditClassify = this.addOrEditClassify.bind(this);   // 新增或者删除
    }

    // 分页切换
    onShowSizeChange(page) {
        this.setState({
            current: page,
        }, () => {
            this.getList();
        })

    }

    // 获取数据
    getList() {
        const {current } = this.state;
        handleApiResult({
            url: `${Url.GET_CLASSIFY_LIST}`,
            data: {
                pageNum: current,
                pageSize: 10,
            },
            method: "post",
        }).then((res) => {
            console.log(res);
            this.setState({
                tableList: res.data.data || [],
                total: res.data.total,
            })
        }).catch((error) => {
            //alert(JSON.stringify(error))
        })
    }

    // 删除数据
    delClassify(id) {
        handleApiResult({
            url: `${Url.DEL_CLASSIFY}`,
            data: {
                id: id
            },
            method: "post",
        }).then((res) => {
            this.getList();
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

    // 新增或者编辑数据
    addOrEditClassify() {
        const {history} = this.props;
        history.push("/activity/handle");
    }

    componentDidMount() {
        // 初始化数据
        this.getList();
    }

    render() {
        const {current, tableList, total} = this.state;
        return (
            <div>
                {/*查询*/}
                <div>
                    <Form
                        {...formItemLayout}
                        layout="inline"
                        onValuesChange={onFormLayoutChange}
                    >
                        <Form.Item label="名称:">
                            <Input placeholder="请输入名称" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">查询</Button>
                            <Button type="primary" onClick={this.addOrEditClassify}>新增</Button>
                        </Form.Item>
                    </Form>
                </div>
                {/*列表分页*/}
                <div style={{marginTop: "12px"}}></div>
                <Table
                    dataSource={tableList}
                    loading={false}
                    pagination = {{
                        defaultCurrent:1,
                        current: current,
                        total: total,
                        defaultPageSize: 10,
                        pageSize: 10,
                        hideOnSinglePage: true,
                        itemRender: itemRender,
                        // showSizeChanger: true,
                        // showQuickJumper: true,
                        onChange: this.onShowSizeChange
                    }}
                    scroll={{ x: 1000, y: 300 }}
                    columns={this.columns}
                />
            </div>
        );
    }
}

export default withRouter(Lists);