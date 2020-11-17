import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    withRouter
} from "react-router-dom";
import Login from "../page/login";
import { Button,  Layout, Breadcrumb, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, LaptopOutlined,  } from '@ant-design/icons';
import imgURL from '../assets/images/login.png';
// page
import Main from "../page/commonPage/main";
import ActivityHandle from "../page/article/handle";
import ActivityLists from "../page/article/index";

const routes = [
    {
        path: "/admin",
        component: Login
    },
    {
        path: "/topics",
        component: Topics
    },
    {
        path: "/activity",
        component: Main,
        routes: [
            {
                path: "/activity/index",  // 列表
                component: ActivityLists,
            },
            {
                path: "/activity/handle",  // 新增与编辑
                component: ActivityHandle,
            },
        ]
    }
];

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>
    );
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

function Home() {
    return (
        <div>21321</div>
    );
}


// function Container ({ routes }) {
//
// }

function Child(props) {
    console.log(props.history)
    return (
        <div>{props.children}</div>
    )
}

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            {/*<h2>Topics</h2>*/}

            {/*<ul>*/}
            {/*    <li>*/}
            {/*        <Link to={`${match.url}/components`}>Components</Link>*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <Link to={`${match.url}/props-v-state`}>*/}
            {/*            Props v. State*/}
            {/*        </Link>*/}
            {/*    </li>*/}
            {/*</ul>*/}

            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}