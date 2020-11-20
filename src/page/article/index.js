import React from "react";
import {
    withRouter
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
        title: 'classifyName',
        dataIndex: 'classifyName',
        key: 'classifyName',
        width: 300,
        render: text => <a>{text}</a>,
    },
    {
        title: 'classifyDes',
        dataIndex: 'classifyDes',
        key: 'classifyDes',
    },
    {
        title: 'classifyIcon',
        dataIndex: 'classifyIcon',
        key: 'classifyIcon',
        width: 160,
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
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" ghost size="small">编辑</Button>
                    <Button size="small" danger onClick={() => props.history.push("/admin")}>删除</Button>
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

        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }
    onShowSizeChange(page) {
        this.setState({
            current: page,
        }, () => {
            this.getList();
        })

    }
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
    componentDidMount() {
        this.getList();
    }

    render() {
        const {current, tableList} = this.state;
        return (
            <div>
                {/*查询*/}
                <div>
                    <Form
                        {...formItemLayout}
                        layout="inline"
                        onValuesChange={onFormLayoutChange}
                    >
                        <Form.Item label="Field AAAAAAAAAs  ">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field Bwew">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
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
                        total: 16,
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