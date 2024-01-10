import React, { Fragment, useState } from 'react';
import { Form, Input, Button, Table, Col, DatePicker, Row, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import dayjs from 'dayjs';

export interface EvaluationCriteria {
    key: string;
    order: number;
    content: string;
    standardScore: number;
    requirement: string;
    note: string;
    score: number;
}

const EvaluationForm = () => {
    const handleScoreChange = (value: number, key: string) => {
        const newCriteria = criteria.map((item) => {
            if (item.key === key) {
                return { ...item, score: value };
            }
            return item;
        });
        setCriteria(newCriteria);
    };


    const initialCriteria: EvaluationCriteria[] = [
        {
            key: '1',
            order: 1,
            content: 'Làm quen với hệ thống nhúng IoT',
            standardScore: 10,
            requirement: '- Thành thạo',
            note: '',
            score: 1,
        },
        {
            key: '2',
            order: 2,
            content: 'Tìm hiểu nắm rõ nguyên lý đấu nối các thiết bị trên Kit IoT STM32',
            standardScore: 20,
            requirement: '- Thành thạo',
            note: '',
            score: 1,
        },
        {
            key: '3',
            order: 3,
            content: 'Phần mềm cho hệ thống nhúng IoT',
            standardScore: 10,
            requirement: '- Thành thạo',
            note: '',
            score: 1,
        },
        {
            key: '4',
            order: 4,
            content: 'Cách thức nạp code vào Kit IoT STM32 của hệ thống nhúng IoT',
            standardScore: 20,
            requirement: '- Thành thạo',
            note: '',
            score: 1,
        },
        {
            key: '5',
            order: 5,
            content: 'Lắp ráp sơ đồ mạch đo và kết nối các thiết bị với máy tính',
            standardScore: 10,
            requirement: '-Đúng sơ đồ, Gọn gàng khoa học',
            note: '',
            score: 1,
        },
        // {
        //     key: '6',
        //     order: 6,
        //     content: '-Thiết lập thông số thiết bị',
        //     standardScore: 10,
        //     requirement: '- Đúng sơ đồ, đúng trình tự nguyên tắc',
        //     note: '',
        //     score: 1,
        // },
        // {
        //     key: '7',
        //     order: 7,
        //     content: '-Viết báo cáo ',
        //     standardScore: 10,
        //     requirement: '- Gọn gàng khoa học',
        //     note: '',
        //     score: 1,
        // },
        // {
        //     key: '8',
        //     order: 8,
        //     content: 'Làm quen với hệ thống nhúng IoT',
        //     standardScore: 10,
        //     requirement: 'Thành thạo',
        //     note: '',
        //     score: 1,
        // },
    ];

    const columns: ColumnsType<EvaluationCriteria> = [
        {
            title: 'Thứ tự',
            dataIndex: 'order',
            key: 'order',
            align: 'center'
        },
        {
            title: 'Nội dung đánh giá',
            dataIndex: 'content',
            key: 'content',
            align: 'center'
        },
        {
            title: 'Điểm chuẩn',
            dataIndex: 'standardScore',
            key: 'standardScore',
            align: 'center'
        },
        {
            title: 'Yêu cầu',
            dataIndex: 'requirement',
            key: 'requirement',
            align: 'center'
        },
        {
            title: 'Điểm',
            dataIndex: 'score',
            key: 'score',
            align: 'center',
            render: (_, record) => (
                <Select
                    defaultValue={1}
                    style={{ width: 60 }}
                    onChange={(value) => handleScoreChange(value, record.key)}
                >
                    {[...Array(10).keys()].map(i => (
                        <Select.Option key={i + 1} value={i + 1}>{i + 1}</Select.Option>
                    ))}
                </Select>
            ),
        },
    ];

    const [data, setData] = useState([
        { key: '1', order: '1', content: 'Làm quen với hệ thống nhúng IoT', standardScore: 10, requirement: 'Thành thạo', note: '' },
    ]);

    const [criteria, setCriteria] = useState(initialCriteria);

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const newCriteria = criteria.map((item) => {
            if (item.key === key) {
                return { ...item, note: e.target.value };
            }
            return item;
        });
        setCriteria(newCriteria);
    };

    const handleSubmit = (values: any) => {

        const totalScore = criteria.reduce((acc, current) => acc + current.score, 0);

        const submissionData = {
            ...values,
            evaluations: criteria,
            totalScore,
        };
        console.log('Received values of form:', submissionData);
    };


    return (
        <Fragment>
            <Form onFinish={handleSubmit} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item name="title" label="Tên bài">
                            <Input placeholder="Nhập tên bài" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="studentName" label="Họ và tên sinh viên">
                            <Input placeholder="Nhập họ và tên sinh viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="studentId" label="Mã sinh viên">
                            <Input placeholder="Nhập mã sinh viên" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="group" label="Nhóm">
                            <Input placeholder="Nhập nhóm" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="class" label="Lớp">
                            <Input placeholder="Nhập lớp" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="date" label="Ngày thực hành">
                            <DatePicker format="DD/MM/YYYY" defaultValue={dayjs()} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="instructor" label="Giảng viên hướng dẫn">
                            <Input placeholder="Nhập tên giảng viên hướng dẫn" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="practiceSession" label="Ca thực tập">
                            <Input placeholder="Nhập ca thực tập" />
                        </Form.Item>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={criteria}
                    pagination={false}
                    rowKey="key"
                />
            </Form>
            <div className="total-score" style={{ marginTop: '20px', fontSize: '16px' }}>
                <strong>Tổng điểm: </strong>
                {criteria.reduce((acc, current) => acc + current.score, 0)}
            </div>
        </Fragment>
    );
};

export default EvaluationForm;
