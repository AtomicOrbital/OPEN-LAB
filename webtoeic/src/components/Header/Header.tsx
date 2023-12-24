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
    // const [showDropdown, setShowDropdown] = useState(false);

    // const toggleDropdown = () => setShowDropdown(!showDropdown);

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
            {/* <Menu.Item key="email">
                {email}
            </Menu.Item> */}
            {/* <Menu.Divider /> */}
            <Menu.Item key="admin">
                <span className="text-decoration-none" onClick={handlAdminClick}>Trang Admin</span>
            </Menu.Item>
            <Menu.Item key="chat">
                <NavLink to="/boxchat" className="text-decoration-none">Box Chat</NavLink>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handLogout}>
                <span className="text-decoration-none">Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Fragment>
            <div>
                <div className={styles.logoLeft}>
                    <img src={require('../../assets/img/logo120.png')} alt="logo_left" />
                    <div className={styles.logoText}>
                        <div className={styles.textDanger}>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</div>
                        <div>Posts and Telecommunications Institute of Technology</div>
                    </div>
                </div>
            </div>
            <div className={styles.logoRight}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <Space>
                            {email}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Fragment>
    );
};

export default Header;
