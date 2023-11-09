import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import IoT from './IoT';
import AI from './AI';
import FiveG from './5G';
import SubMenu from 'antd/es/menu/SubMenu';
import SensorBlock from './SensorBlock';
import ControllerBlockAdmin from './ControllerBlockAdmin';
import PeripheralBlockAdmin from './PeripheralBlockAdmin';
import VideoBaiGrammar from './VideoBaiGrammar';
import UploadFileVideo from './UploadFileVideo';

const { Header, Content, Footer, Sider } = Layout;

const AdminPage: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');

    const handleMenuClick = (item: any) => {
        switch (item.key) {
            case "KhoiNguon":
                setSelectedContent("IoT");
                break;
            case "KhoiCamBien":
                setSelectedContent("SensorBlock");
                break;
            case "KhoiDieuKhien":
                setSelectedContent("ControllerBlock");
                break;
            case "KhoiNgoaiVi":
                setSelectedContent("PeripheralBlock");
                break;
            case "UploadVideo":
                setSelectedContent("UploadVideo");
                break;
            default:
                setSelectedContent(item.key);
                break;
        }
    }


    const contentMap: { [key: string]: React.ReactNode } = {
        IoT: <IoT />,
        SensorBlock: <SensorBlock />,
        ControllerBlock: <ControllerBlockAdmin />,
        PeripheralBlock: <PeripheralBlockAdmin />,
        AI: <AI />,
        '5G': <FiveG />,
        UploadVideo: <UploadFileVideo />
    }
    return (
        <Layout>
            <Sider
                trigger={null} collapsible collapsed={collapsed}
                breakpoint="lg"
                // collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuClick}>
                    <SubMenu key="IoT" icon={<UserOutlined />} title="IoT" >
                        <Menu.Item key="KhoiNguon">Khối nguồn</Menu.Item>
                        <Menu.Item key="KhoiCamBien">Khối cảm biến</Menu.Item>
                        <Menu.Item key="KhoiDieuKhien">Khối điều khiển</Menu.Item>
                        <Menu.Item key="KhoiNgoaiVi">Khối ngoại vi</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="AI" icon={<VideoCameraOutlined />}>
                        AI
                    </Menu.Item>
                    <Menu.Item key="5G" icon={<WifiOutlined />}>
                        5G
                    </Menu.Item>
                    <Menu.Item key="UploadVideo" icon={<UploadOutlined />}>
                        Upload Video
                    </Menu.Item>
                </Menu>


            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, height: '100vh', background: colorBgContainer }}>
                        {contentMap[selectedContent]}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;