import React from 'react';
import styles from './Header.module.scss'

const Header: React.FC = () => {
    return (
        <div className={styles.logoLeft}>
            <img src={require('../../assets/img/logo120.png')} alt="logo_left" />
            <div className={styles.logoText}>
                <div className={styles.textDanger}>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</div>
                <div>Posts and Telecommunications Institute of Technology</div>
            </div>
        </div>
    );
}

export default Header;
