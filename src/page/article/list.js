import React from "react";
import {
    withRouter
} from "react-router-dom";
import { Table, Tag, Space, Button } from 'antd';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";
import Editor from "../../components/editor";

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
            editorHtml: "",
        };
        // 获取编辑器内容
        this.getContent = this.getContent.bind(this);
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

    getContent(editorHtml) {
        this.setState({
            editorHtml
        })
    }
    componentDidMount() {
    }

    render() {
        const {current, editorHtml} = this.state;
        return (
            <div>
                {editorHtml}
                <Editor idName="myEditor" getContent={this.getContent}/>
                <p onClick={this.getContent.bind(this)}>获取content</p>
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