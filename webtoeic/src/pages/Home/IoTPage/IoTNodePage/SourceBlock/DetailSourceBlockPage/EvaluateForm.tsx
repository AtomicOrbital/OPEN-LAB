import React, { useState } from 'react';
import { Form, Input, Button, Table, Col, DatePicker, Row } from 'antd';
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
}

const EvaluationForm = () => {

    const initialCriteria: EvaluationCriteria[] = [
        {
            key: '1',
            order: 1,
            content: 'Làm quen với hệ thống nhúng IoT',
            standardScore: 10,
            requirement: '- Thành thạo',
            note: '',
        },
        {
            key: '2',
            order: 2,
            content: 'Tìm hiểu nắm rõ nguyên lý đấu nối các thiết bị trên Kit IoT STM32',
            standardScore: 20,
            requirement: '- Thành thạo',
            note: '',
        },
        {
            key: '3',
            order: 3,
            content: 'Phần mềm cho hệ thống nhúng IoT',
            standardScore: 10,
            requirement: '- Thành thạo',
            note: '',
        },
        {
            key: '4',
            order: 4,
            content: 'Cách thức nạp code vào Kit IoT STM32 của hệ thống nhúng IoT',
            standardScore: 20,
            requirement: '- Thành thạo',
            note: '',
        },
        {
            key: '5',
            order: 5,
            content: 'Lắp ráp sơ đồ mạch đo và kết nối các thiết bị với máy tính',
            standardScore: 10,
            requirement: '-Đúng sơ đồ, Gọn gàng khoa học',
            note: '',
        },
        {
            key: '6',
            order: 6,
            content: '-Thiết lập thông số thiết bị',
            standardScore: 10,
            requirement: '- Đúng sơ đồ, đúng trình tự nguyên tắc',
            note: '',
        },
        {
            key: '7',
            order: 7,
            content: '-Viết báo cáo ',
            standardScore: 10,
            requirement: '- Gọn gàng khoa học',
            note: '',
        },
        {
            key: '8',
            order: 8,
            content: 'Làm quen với hệ thống nhúng IoT',
            standardScore: 10,
            requirement: 'Thành thạo',
            note: '',
        },


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
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            render: (_, record) => (
                <Input
                    placeholder="Ghi chú"
                    value={record.note}
                    onChange={(e) => handleNoteChange(e, record.key)}
                />
            ),
            align: 'center'
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

        const submissionData = {
            ...values,
            evaluations: data,
        };
        console.log('Received values of form:', submissionData);

    };

    return (
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
    );
};

export default EvaluationForm;
