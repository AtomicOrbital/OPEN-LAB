import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../../../../../components/Header/Header';
import { Line } from '@ant-design/charts';
import { ref, onValue, getDatabase } from 'firebase/database';
import { databaseSecond } from '../../../../../../util/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/configStore';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EvaluationForm from './EvaluateForm';

type GasData = {
    time: string;
    GasValue: number;
};

const PracticeSourceBlock = () => {
    const [gasData, setGasData] = useState<GasData[]>([]);
    const userName = useSelector((state: RootState) => state.UserReducer.email);
    console.log("username", userName);
    useEffect(() => {
        const gasValueRef = ref(databaseSecond, 'GasValue');

        onValue(gasValueRef, (snapshot) => {
            const gasValue = snapshot.val();
            if (gasValue !== null) {
                // Xử lý dữ liệu...
                const now = new Date();
                const timeString = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

                const newDataPoint = {
                    time: timeString,
                    GasValue: gasValue,
                };

                setGasData(currentData => [...currentData, newDataPoint]);
            } else {
                console.log('Không tìm thấy dữ liệu tại đường dẫn GasValue');
            }
        });
    }, []);



    const config = {
        data: gasData,
        height: 700,
        xField: 'time',
        yField: 'GasValue',
        xAsis: {
            title: {
                visible: true,
                text: 'Real Time'
            },
            type: 'timeCat'
        },
        yAxis: {
            title: {
                visible: true,
                text: 'Gas Value'
            }
        },
        point: {
            size: 5,
            shape: 'diamond',
        },
        tooltip: {
            formatter: (datum: any) => {
                return {
                    name: datum.time,
                    value: datum.GasValue,
                };
            },
            customContent: (name: any, items: any) => {
                return `<div>${items?.map((item: any) => {
                    console.log(item.name, item.value)
                    return `<div class="tooltip-chart">
                  <span class="tooltip-item-name">${item.name}</span>
                  <span class="tooltip-item-value">${item.value}</span>
                </div>`;
                }).join('')}</div>`;
            },
            showMarkers: true, // Sửa 'boolean' thành true hoặc false
            showContent: true, // Sửa 'boolean' thành true hoặc false
            // position: 'right', // Sửa 'right | left' thành 'right' hoặc 'left'
            showCrosshairs: true, // Sửa 'boolean' thành true hoặc false
        },
    };

    const exportPDF = () => {
        const container = document.querySelector('.container') as HTMLElement;
        if (container) {
            html2canvas(container).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                pdf.save('download.pdf');
            });
        } else {
            console.error('Element not found');
        }
    };

    return (
        <Fragment>
            <Header />
            <div className='container'
                style={{
                    marginTop: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <h3 className='text-center mb-4'>Họ và tên: <span className='text-danger'>{userName}</span></h3>
                <Line style={{ width: '100%', marginBottom: '50px' }} {...config} />

                <EvaluationForm />
                <Button
                    onClick={exportPDF}
                    className='text-center'
                    style={{
                        marginTop: '50px',
                        marginBottom: '50px',
                        alignSelf: 'center'
                    }}>
                    Nộp bài
                </Button>
            </div>


        </Fragment>
    );
};

export default PracticeSourceBlock;
