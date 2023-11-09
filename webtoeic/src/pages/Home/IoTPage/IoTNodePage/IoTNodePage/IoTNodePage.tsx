import React, { Fragment } from 'react';
import Header from '../../../../../components/Header/Header';
import styles from './IoTNodePage.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {}

const IoTNodePage = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>THỰC HÀNH LỚP THIẾT BỊ (IoT Node)</h2>
                <div className={styles.contentSection}>
                    <div className={styles.contentText}>
                        <NavLink to="/home/IoT/Node/source_block" className={styles.link}>KHỐI NGUỒN</NavLink><br />
                        <NavLink to="/home/IoT/Node/sensor_block" className={styles.link}>KHỐI CẢM BIẾN</NavLink><br />
                        <NavLink to="/home/IoT/Node/controller_block" className={styles.link}>KHỐI ĐIỀU KHIỂN</NavLink><br />
                        <NavLink to="/home/IoT/Node/peripheral_block" className={styles.link}>KHỐI NGOẠI VI-CHẤP HÀNH</NavLink>
                    </div>
                    <div className={styles.contentImage}>
                        <img className={styles.image} src={require('../../../../../assets/img/IoTNode.png')} alt="IoT Node Image" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IoTNodePage;
