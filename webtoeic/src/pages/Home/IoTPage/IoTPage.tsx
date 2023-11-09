import React, { Fragment } from 'react';
import Header from '../../../components/Header/Header';
import styles from './IoTPage.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {}

const IoTPage = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                <h2>THỰC HÀNH CHUYÊN SÂU IoT</h2>
                <div className={styles.contentSection}>
                    <div className={styles.contentText}>
                        <NavLink to="/home/IoT/Node">LỚP THIẾT BỊ (IoT Node)</NavLink><br />
                        <NavLink to="/home/IoT/Gateway">LỚP MẠNG (IoT Gateway)</NavLink><br />
                        <NavLink to="/home/IoT/Cloud">LỚP ỨNG DỤNG (IoT Cloud)</NavLink>
                    </div>
                    <div className={styles.contentImage}>
                        <img src={require('../../../assets/img/Screenshot from 2023-10-03 18-47-11.png')} alt="IoT Image" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IoTPage;
