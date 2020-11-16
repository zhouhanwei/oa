import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import imgURL from '../assets/images/login.png';
//首先引入需要的图片路径
import '../assets/scss/login.scss';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

//定义背景样式
class Login extends React.Component {
    constructor(props) {
        super();
        this.state= {
            size: "large",
        };
        const onFinish = values => {
            console.log('Success:', values);
            console.log(this)
        };
        this.onFinish = onFinish.bind(this);
    }
    componentDidMount() {
        this.setState({
            wrapperHeight : document.documentElement.clientHeight,
        })
    }

    render() {
        return (
            <div className="login-box">
                <div style={{width: "400px", margin: "0 auto"}}>
                    <div style={{width: "100%"}} className="logo">
                        <div>
                            <img src={imgURL} width={200}/>
                        </div>
                    </div>
                    <div className="login-content">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住账号</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    忘记密码?
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    立即登录
                                </Button>
                                {/*Or <a href="">立即注册</a>*/}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
