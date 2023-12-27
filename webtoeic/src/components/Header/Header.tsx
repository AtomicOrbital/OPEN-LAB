import React, { Fragment, useState } from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { Dropdown, Menu, Space, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { history } from '../../util/config';
import { logout } from '../../redux/UserReducer/UserReducer';

const Header: React.FC = () => {
    const role = useSelector((state: RootState) => state.UserReducer.role);
    const email = useSelector((state: RootState) => state.UserReducer.email);
    console.log("role", role);
    const dispatch: DispatchType = useDispatch();

    const handlAdminClick = () => {

        if (role !== "ROLE_ADMIN") {
            message.error('Bạn không có quyền truy cập trang này');
            return;
        }

        history.push("/admin");
    }

    const handLogout = () => {
        dispatch(logout());
    }

    const menu = (
        <Menu>
            <Menu.Item key="admin">
                <span className="text-decoration-none" onClick={handlAdminClick}>Trang Admin</span>
            </Menu.Item>
            <Menu.Item key="chat">
                <a href="/boxchat" target='_blank' className="text-decoration-none">Box Chat</a>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handLogout}>
                <span className="text-decoration-none">Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

    const menuIoTSubItems = (
        <Menu>
            <Menu.Item key="node">
                <a href="/home/IoT/Node" className="text-decoration-none">LỚP THIẾT BỊ (IoT Node)</a>
            </Menu.Item>
            <Menu.Item key="gateway">
                <NavLink to="/iot-gateway" className="text-decoration-none">LỚP MẠNG (IoT Gateway)</NavLink>
            </Menu.Item>
            <Menu.Item key="cloud">
                <NavLink to="/iot-cloud" className="text-decoration-none">LỚP ỨNG DỤNG (IoT Cloud)</NavLink>
            </Menu.Item>
        </Menu>
    );

    const menuHome = (
        <Menu>
            <Menu.Item key="home">
                <a className="text-decoration-none" href="/home">TRANG CHỦ</a>
            </Menu.Item>
            <Menu.SubMenu key="iot" title="THỰC HÀNH CHUYÊN SÂU IoT" popupOffset={[0, 0]}>
                {menuIoTSubItems}
            </Menu.SubMenu>
            <Menu.Item key="ai">
                <NavLink className="text-decoration-none" to="/ai">THỰC HÀNH CHUYÊN SÂU AI</NavLink>
            </Menu.Item>
            <Menu.Item key="5g">
                <NavLink className="text-decoration-none" to="/5g">THỰC HÀNH CHUYÊN SÂU 5G</NavLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <Fragment>
            <div className={styles.headerContainer}>
                <div className={styles.topRow}>
                    <div className={styles.logoLeft}>
                        <img src={require('../../assets/img/logo120.png')} alt="logo_left" />
                        <div className={styles.logoText}>
                            <div className={styles.textDanger}>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</div>
                            <div>Posts and Telecommunications Institute of Technology</div>
                        </div>
                    </div>
                    <div className={styles.logoRight}>
                        <div className="lang" style={{ textAlign: 'center', padding: '5px 12px 0 0' }}>
                            <a className='mr-2 mb-4' href="#">
                                <img src="https://portal.ptit.edu.vn/wp-content/uploads/2016/04/quoc-ky-viet-nam.jpg" title="Tiếng Việt" style={{ textAlign: 'right' }} />
                            </a> &nbsp;<a href="https://portal.ptit.edu.vn/eng/">
                                <img src="https://portal.ptit.edu.vn/wp-content/uploads/2016/04/quoc-ky-anh.jpg" title="Tiếng Anh" style={{ textAlign: 'right' }} />
                            </a>
                        </div>

                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {email}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div className={styles.navigation}>
                    <Dropdown overlay={menuHome}>
                        <a href="/home" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            Trang Chủ <DownOutlined />
                        </a>
                    </Dropdown>
                    <a href="/home/IoT" target='_blank' className={styles.active}>Thực hành chuyên sâu IoT</a>
                    <a href="/home/IoT/Node/source_block" target='_blank' className={styles.active}>Khối nguồn</a>
                    <a href="/home/IoT/Node/sensor_block" target='_blank' className={styles.active}>Khối cảm biến</a>
                    <a href="/home/IoT/Node/controller_block" target='_blank' className={styles.active}>Khối điều khiển</a>
                    <a href="/home/IoT/Node/peripheral_block" target='_blank' className={styles.active}>Khối ngoại vi</a>
                </div>
                <div className={styles.redLine}>

                </div>
            </div>
        </Fragment>

    );
};

export default Header;
