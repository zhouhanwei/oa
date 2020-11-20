import React from "react";
import {
    withRouter
} from "react-router-dom";
import { Table, Tag, Space, Button } from 'antd';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";

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
    }
];


class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [...columns, ...[{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" ghost size="small">
                        Invite {record.name}
                    </Button>
                    <Button size="small" danger onClick={() => props.history.push("/admin")}>删除</Button>
                </Space>
            ),
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
                {/*列表分页*/}
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
                    columns={this.columns}
                />
            </div>
        );
    }
}

export default withRouter(Lists);