import React from "react";
import {
    withRouter
} from "react-router-dom";
import { Table, Tag, Space, Button } from 'antd';
import E from 'wangeditor';
import Https from "../../http/index";

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

let data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
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
        };
    }
    onShowSizeChange(page) {
        data = [
            {
                key: '1' + page,
                name: 'John Brown' + page,
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2' + page,
                name: 'Jim Green' + page,
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
        ]
        this.setState({
            current: page,
        })

    }
    componentDidMount() {
        const editor = new E('#div1');
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            // 上传图片，返回结果，将图片插入到编辑器中
            let Data = new FormData();
            console.log(resultFiles[0])
            Data.append("file", resultFiles[0])
            new Https({
                url:  "/upload/upload_editor_img",
                data: Data,
                params: {
                    name: 123
                },
                // headers: {
                //     'Content-Type': "application/json; charset=utf-8;"
                // },
                method: "post",
                callback: (res) => {
                    const {url} = res.data;
                    insertImgFn("http://127.0.0.1:8888/" + url)
                }
            }).getResults();
        }
        editor.create()
        // console.log(this.props.history.push("/admin"))
    }

    render() {
        const {current} = this.state;
        return (
            <div>
                <div id="div1"></div>
                <Table
                    dataSource={data}
                    loading={false}
                    pagination = {{
                        defaultCurrent:1,
                        current: current,
                        total: 50,
                        defaultPageSize: 10,
                        pageSize: 2,
                        hideOnSinglePage: true,
                        itemRender: itemRender,
                        // showSizeChanger: true,
                        // showQuickJumper: true,
                        onChange: this.onShowSizeChange.bind(this)
                    }}
                    columns={this.columns}
                />
            </div>
        );
    }
}

export default withRouter(Lists);