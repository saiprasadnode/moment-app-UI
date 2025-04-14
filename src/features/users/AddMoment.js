import React, { useState } from 'react';
import {
    Layout, Menu, Form, Input, Button, Upload, Progress, Avatar, Select,
    Typography
} from 'antd';
import {
    UploadOutlined, FileOutlined, PictureOutlined, DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import logo from '../../app/assets/5DLogo.png';
import './AddMoment.css';
import { useAddMomentMutation } from './momentApi';
import { message } from 'antd';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const AddMoment = () => {
    const [fileList, setFileList] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [selectedKey, setSelectedKey] = useState('add');
    const [collapsed, setCollapsed] = useState(false);

    const [form] = Form.useForm();
    const [addMoment, { isLoading }] = useAddMomentMutation();

    const handleUpload = ({ file, onSuccess }) => {
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                const percent = (prev[file.name] || 0) + 10;
                if (percent >= 100) {
                    clearInterval(interval);
                    onSuccess("ok");
                }
                return { ...prev, [file.name]: percent >= 100 ? 100 : percent };
            });
        }, 300);
    };

    const handleRemove = file => {
        setFileList(prev => prev.filter(f => f.uid !== file.uid));
        setUploadProgress(prev => {
            const copy = { ...prev };
            delete copy[file.name];
            return copy;
        });
    };

    const customRequest = (options) => {
        const { file, onSuccess } = options;
        setFileList(prev => [...prev, file]);
        handleUpload({ file, onSuccess });
    };

    const onFinish = async (values) => {
        const momentData = {
            title: values.title,
            tags: values.tags,
            images: fileList.map(file => file.name), // only file names
        };

        try {
            await addMoment(momentData).unwrap();
            message.success('Moment added successfully!');
            form.resetFields();
            setFileList([]);
            setUploadProgress({});
        } catch (err) {
            console.error('Error adding moment:', err);
            message.error('Failed to add moment.');
        }
    };

    return (
        <Layout style={{ height: '100vh', overflow: "none" }}>
            <Sider
                width={250}
                collapsible
                collapsed={collapsed}
                trigger={null}
                style={{
                    background: '#fff',
                    minHeight: '100vh',
                    transition: 'all 0.2s ease-in-out'
                }}
            >



                <div style={{ textAlign: "center", padding: '16px' }}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo1"
                        style={{
                            width: collapsed ? '40px' : '100px',
                            transition: 'all 0.3s ease'
                        }}
                    />

                </div>

                <Menu
                    mode="inline"
                    theme="light"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => setSelectedKey(key)}
                >
                    <Menu.Item key="profile" className={selectedKey === 'profile' ? 'custom-active' : ''}>
                        Profile
                    </Menu.Item>

                    <Menu.SubMenu
                        key="moments"
                        title="Moments"
                        className={selectedKey === 'add' ? 'submenu-active' : ''}
                    >
                        <div className="submenu-label">Moment List</div>

                        <Menu.Item key="add" className={selectedKey === 'add' ? 'custom-active bullet-item' : 'bullet-item'}>
                            • Add new moment
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>

            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: "3px" }}>
                    {/* Toggle icon */}
                    <div onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '20px', cursor: 'pointer' }}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </div>

                    {/* Profile avatar */}
                    <Avatar src="https://i.pravatar.cc/40" />
                </Header>
                <div style={{ background: "white", height: "50px", marginTop: "4px", marginLeft: "3px", display: "flex", alignItems: "center" }}><strong style={{ marginLeft: "30px" }}>Add new moment</strong></div>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', overflow: "auto" }}>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
                            <Input placeholder="Sample title" />
                        </Form.Item>

                        <Form.Item label="Tags" name="tags">
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags">
                                <Option key="tag1">tag 1</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Uploading">
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    {fileList.map(file => (
                                        <div key={file.uid} style={{ marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                {file.name.endsWith('.png') || file.name.endsWith('.jpg') ? (
                                                    <PictureOutlined />
                                                ) : (
                                                    <FileOutlined />
                                                )}
                                                <div style={{ flexGrow: 1 }}>
                                                    {file.name}
                                                    <Progress percent={uploadProgress[file.name] || 0} size="small" />
                                                </div>
                                                <Button size="small" danger onClick={() => handleRemove(file)}>x</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ flex: 1, minWidth: '250px' }}>
                                    <Upload
                                        customRequest={customRequest}
                                        showUploadList={false}
                                        multiple
                                    >
                                        <div style={{
                                            border: '1px dashed #ccc',
                                            padding: '20px',
                                            textAlign: 'center',
                                        }}>
                                            <UploadOutlined style={{ fontSize: 24 }} />
                                            <p>Drag and drop file</p>
                                            <p><strong>or</strong></p>
                                            <Button style={{ background: "black", color: "white", borderRadius: "18px", width: "100px" }} htmlType="button">Browse</Button>
                                        </div>
                                    </Upload>
                                </div>
                            </div>
                        </Form.Item>

                        <br />
                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    style={{ background: "black", color: "white", borderRadius: "18px", width: "100px" }}
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    <strong>{isLoading ? 'Submitting...' : 'Submit'}</strong>
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Content>            </Layout>
        </Layout>
    );
};

export default AddMoment;
