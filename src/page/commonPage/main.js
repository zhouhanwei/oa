import React from 'react';
import {Breadcrumb, Layout, Menu} from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import {Route, Switch} from "react-router-dom";
import Menus from "./menu.js";
const { Header, Content, Footer, Sider } = Layout;

function Child(props) {
    console.log(props.history)
    return (
        <div>{props.children}</div>
    )
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

class Main extends React.Component {
    constructor(props) {
        super();
        this.state= {};
    }
    render() {
        return (
            <div className='main-layout'>
                <Layout>
                    <Header style={{ position: 'fixed', display: 'flex', zIndex: 1, width: '100%' }}>
                        <div className="logo">
                            {/*<img src={imgURL} width={100}/>*/}
                            <img src={""} width={100}/>
                        </div>
                    </Header>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0',  }}>
                            <Breadcrumb.Item>
                                <a href="/about">...</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>...</Breadcrumb.Item>
                            <Breadcrumb.Item>...</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menus/>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <div>
                                    <Child>
                                        <Switch>
                                            {this.props.routes.map((route, i) => (
                                                <RouteWithSubRoutes key={i} {...route} />
                                            ))}
                                        </Switch>
                                    </Child>
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created Hanwei Zhou</Footer>
                </Layout>
            </div>
        );
    }
}

export default Main;
