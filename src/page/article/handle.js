import React from "react";
import {
    withRouter,
    useParams
} from "react-router-dom";
import { Form, Input, Button, Checkbox, Title, Typography, Divider, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../assets/scss/classify/index.scss';
import Url from "@cf/apiUrl";
import { handleApiResult } from "@cf/publicFun";
const { Title: Htitle } = Typography;

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
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
    // 提交数据
    handleApiResult({
        url: `${Url.SAVE_OR_EDIT_CLASSIFY}`,
        data: values,
        method: "post",
    }).then((res) => {
        //alert(JSON.stringify(res))
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
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
        this.setState({ loading: true });
        getBase64(info.file, imageUrl => {
            handleApiResult({
                url: `${Url.UPLOAD_BASE64}`,
                data: {
                    url: imageUrl,
                },
                method: "post",
            }).then((res) => {
                const {data, code, message} = res.data;
                this.setState({
                    imageUrl: data,
                    loading: false,
                }, () => {
                    // 设置图片
                    this.refs.classifyForm.setFieldsValue({
                        classifyIcon: data,
                    })
                })
            }).catch((error) => {
                alert(JSON.stringify(error))
            })
        })
        return false;
    };

    // ..
    componentDidMount() {
    }

    render() {
        const { loading, imageUrl } = this.state;
        const id = this.props.match.params.id;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上传图标</div>
            </div>
        );
        return (
            <div>
                <Divider orientation="left">
                    <Htitle level={4} style={{margin: 0}}>标题{id}</Htitle>
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
                            label="分类名称"
                            name="classifyName"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名称不能为空!',
                                },
                            ]}
                            // hasFeedback
                            // validateStatus="success"
                            // help="The information is being validated..."
                        >
                            <Input placeholder="请输入分类名称"/>
                        </Form.Item>
                        {imageUrl}
                        <Form.Item
                            label="分类ICON"
                            name="classifyIcon"
                            initialValue={imageUrl}
                            rules={[
                                {
                                    required: true,
                                    message: '分类ICON不能为空!',
                                },
                            ]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                onRemove={() => {}}
                                beforeUpload={beforeUpload}
                                customRequest={this.handleChange}
                                // customRequest={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                            {/*<Input placeholder="请输入"/>*/}
                            {(form) => {
                                return <pre>{JSON.stringify(form.getFieldError("classifyIcon"), null, 2)}</pre>;
                            }}
                        </Form.Item>


                        <Form.Item
                            label="分类描述"
                            name="classifyDes"
                            rules={[
                                {
                                    required: true,
                                    message: '分类描述不能为空!',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="请输入分类描述"/>
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