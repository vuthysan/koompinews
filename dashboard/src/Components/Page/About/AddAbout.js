import React, { useState } from 'react';
import {
  Col,
  Row,
  Layout,
  Form,
  Button,
  Input,
  Upload,
  Select,
  Checkbox,
  message,
} from 'antd';
import LeftNavbar from '../../Layout/LeftNavbar';
import Navbar from '../../Layout/Navbar';
import TextEditor from '../../Help/TextEditor';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_ABOUT } from '../../../graphql/mutation';

const { Content } = Layout;
const { Option } = Select;
const AddAbout = () => {
  const [addAbout] = useMutation(ADD_ABOUT);
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (value) => {
    addAbout({
      variables: {
        ...value,
        des: desc,
        avarta: image,
        userId: '5f324067aeef78b4df13ca54',
      },
    }).then(async (res) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      await message.success(res.data.addAbout.message);
    });
    console.log('success', value, desc);
  };
  const onChange = (e) => {
    console.log(e);
  };
  const handleDescChange = (value) => {
    console.log(value);
    setDesc(value);
  };
  const uploadImage = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:8080/upload',
    // listType: 'picture',
    defaultFileList: image,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setImage(info.file.name.replace(/\s+/g, '-').toLowerCase());
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <React.Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <LeftNavbar />
        <Layout className="site-layout">
          <Navbar />
          <Content style={{ margin: '16px 16px', backgroundColor: '#fff' }}>
            <div
              className="site-layout-background"
              style={{ minHeight: 360, padding: 70 }}
            >
              <h1 className="title-top">Add About</h1>
              <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row gutter={[32, 0]}>
                  <Col span={16}>
                    <Form.Item
                      label="Title"
                      // style={{ fontSize: '30px' }}
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Title!',
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      label="Describtion"
                      name="describtion"
                      style={{ marginBottom: '-90px' }}
                    >
                      <TextEditor
                        handleDescChange={handleDescChange}
                        defaultValue={desc}
                      />
                    </Form.Item>
                    <Button
                      style={{ marginTop: '0px', width: '150px' }}
                      size="large"
                      // className="button button-submit"
                      type="primary"
                      htmlType="submit"
                    >
                      SUBMIT
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Avarta">
                      <Upload.Dragger {...uploadImage}>
                        {image === '' ? (
                          <img
                            style={{ width: '270px' }}
                            src="http://localhost:8080/undraw_upload_87y9.svg"
                            alt="avatar"
                          />
                        ) : (
                          <img
                            style={{ width: '270px' }}
                            src={`${'http://localhost:8080/' + image}`}
                            // src="http://localhost:8080/Technology-Images-Wallpapers-027.jpg"
                            alt="avatar"
                          />
                        )}
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default AddAbout;