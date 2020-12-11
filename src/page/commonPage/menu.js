import React from 'react';
import {AppstoreOutlined} from "@ant-design/icons";
import {
    Route,
    withRouter
} from "react-router-dom";
import { Button,  Layout, Breadcrumb, Menu } from 'antd';
const { SubMenu } = Menu;


class Menus extends React.Component {
    constructor(props) {
        super();
        this.state= {};
    }
    render() {
        return (
            <Menu
                style={{ width: 200 }}
                defaultSelectedKeys={['5']}
                defaultOpenKeys={['sub2']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="...">
                    <Menu.Item key="1">
                        <div onClick={() => this.props.history.push("/in/index")}>分类列表</div>
                    </Menu.Item>
                    {/*<SubMenu key="sub3" title="Submenu">*/}
                    {/*    <Menu.Item key="7">Option 7</Menu.Item>*/}
                    {/*    <Menu.Item key="8">Option 8</Menu.Item>*/}
                    {/*</SubMenu>*/}
                </SubMenu>
            </Menu>
        );
    }
}

export default withRouter(Menus);