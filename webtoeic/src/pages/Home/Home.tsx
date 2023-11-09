import React, { Fragment } from 'react';
import styles from './Home.module.scss';
import Header from '../../components/Header/Header';
import { NavLink } from 'react-router-dom';

type Props = {}

export const Home = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                <h2>NỘI DUNG</h2>
                <div className={styles.contentSection}>
                    <div className={styles.contentText}>
                        <NavLink to="IoT">THỰC HÀNH CHUYÊN SÂU IoT</NavLink><br />
                        <NavLink to="AI">THỰC HÀNH CHUYÊN SÂU AI</NavLink><br />
                        <NavLink to="5G">THỰC HÀNH CHUYÊN SÂU 5G</NavLink>
                    </div>
                    <div className={styles.contentImage}>
                        <img src={require('../../assets/img/385482558_340091435075972_4740440796530179440_n.png')} alt="Content Image" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
