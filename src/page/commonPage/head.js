import React from 'react';
import {Layout} from "antd";
import Logo from "@assets/images/logo.png";
import {withRouter} from "react-router-dom";
const { Header} = Layout;

class Head extends React.Component {
    constructor(props) {
        super();
        this.state= {};
    }
    componentDidMount() {

    }

    render() {
        return (
            <Header style={{ position: 'fixed', display: 'flex', zIndex: 1, width: '100%' }}>
                <div className="logo">
                    {/*<img src={Logo} width={160}/>*/}
                    <img src={""} width={100}/>
                </div>
            </Header>
        );
    }
}

export default withRouter(Head);