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
  message,
} from 'antd';
import LeftNavbar from '../../Layout/LeftNavbar';
import Navbar from '../../Layout/Navbar';
import TextEditor from '../../Help/TextEditor';
import { UPDATE_COMPANY } from '../../../graphql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COMPANIES, GET_A_COMPANY } from '../../../graphql/query';
import { useParams } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;
const EditCompany = (props) => {
  const { id } = useParams();
  const { refetch } = useQuery(GET_COMPANIES);
  const { loading, data } = useQuery(GET_A_COMPANY, {
    variables: { id },
  });
  //   const { name } = data.aCompany;
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const [loading1, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const handleDescChange = (value) => {
    setDesc(value);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (value) => {
    updateCompany({
      variables: {
        ...value,
        id: id,
        des: desc === '' ? data.aCompany.des : desc,
        image: image === null ? data.aCompany.image : image,
        userId: '5f3e65128c70fe65b27d5c7f',
      },
    }).then(async (res) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      await message.success(res.data.updateCompany.message);
      await refetch();
      await props.history.push('/admin/allcompanies');
      // form.resetFields();
    });
    console.log('success', value);
  };
  const onChange = (e) => {
    console.log(e);
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

  //   function DisplayCompanyName() {

  //   }
  if (loading) {
    return 'Loading....';
  }
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
              <h1 className="title-top">Update Company</h1>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Row gutter={[32, 0]}>
                  <Col span={16}>
                    <Form.Item
                      initialValue={data.aCompany.name}
                      label="Name of Company"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Company Name!',
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          initialValue={data.aCompany.website}
                          label="Website of Company"
                          name="website"
                          rules={[
                            {
                              required: true,
                              message: 'Please input Company Website!',
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item
                          initialValue={data.aCompany.industry}
                          label="Industry"
                          name="industry"
                          rules={[
                            {
                              required: true,
                              message: 'Please input Industry!',
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item
                          initialValue={data.aCompany.revenue}
                          label="Revenue"
                          name="revenue"
                          rules={[
                            {
                              required: true,
                              message: 'Please Company Revenue!',
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      style={{ marginBottom: '-50px' }}
                      initialValue={data.aCompany.des}
                      label="Description"
                      name="des"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'job & requirement is required',
                      //   },
                      // ]}
                    >
                      <TextEditor
                        handleDescChange={handleDescChange}
                        defaultValue={data.aCompany.des}
                      />
                    </Form.Item>

                    <Button
                      style={{ marginTop: '0px', width: '150px' }}
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      SUBMIT
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      initialValue={data.aCompany.globalCompanySize}
                      label="Global Size of Company"
                      name="globalCompanySize"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please input Global size company!',
                      //   },
                      // ]}
                    >
                      <Input
                        defaultValue={data.aCompany.globalCompanySize}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      initialValue={data.aCompany.location}
                      label="Location"
                      name="location"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Location of Company!',
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      initialValue={data.aCompany.type}
                      label="Type of Company"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: 'Please Type of Company!',
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item initialValue={data.aCompany.image} label="Image">
                      <Upload.Dragger {...uploadImage}>
                        {image === null ? (
                          <img
                            style={{ width: '270px' }}
                            sr
                            src={`${
                              'http://localhost:8080/' + data.aCompany.image
                            }`}
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

export default EditCompany;
