import React from "react";
import {
    withRouter
} from "react-router-dom";
import { Form, Input, Button, Checkbox, Title, Typography, Divider, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../assets/scss/classify/index.scss';
const { Title: Htitle } = Typography;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class ActivityHandle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //
    handleChange(info) {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }, () => {
                    this.refs.classifyForm.setFieldsValue({
                        classifyIcon: imageUrl,
                    })
                }),
            );
        }
    };

    // ..
    componentDidMount() {
    }

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Divider orientation="left">
                    <Htitle level={4} style={{margin: 0}}>标题</Htitle>
                </Divider>
                <div style={{width: "600px", margin: "0 auto"}}>
                    <Form
                        {...layout}
                        layout="horizontal"
                        name="basic"
                        ref="classifyForm"
                        initialValues={{

                        }}
                        size="large"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="classifyName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            // hasFeedback
                            // validateStatus="success"
                            // help="The information is being validated..."
                        >
                            <Input placeholder="请输入"/>
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="classifyIcon"
                            initialValue={imageUrl}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                            {/*<Input placeholder="请输入"/>*/}
                            {(form) => {
                                return <pre>{JSON.stringify(form.getFieldError("classifyIcon"), null, 2)}</pre>;
                            }}
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="classifyDes"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="请输入"/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(ActivityHandle);