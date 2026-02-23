import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetJobById } from "../../components/services/jobs";
import { GetCompanyById } from "../../components/services/companies";
import { Button, Card, Col, DatePicker, Form, Input, List, message, Row, Select, Tag } from "antd";
import { FieldTimeOutlined, EnvironmentOutlined, EuroOutlined, UsergroupAddOutlined, BlockOutlined } from "@ant-design/icons";
import { GetTime } from "../../components/getTime";
import { CreateCV } from "../../components/services/cv";

const { TextArea } = Input;

function JobDetail() {
    const { id } = useParams();
    const [dataJob, setDataJob] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Nộp đơn thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Nộp đơn không thành công!"
        })
    }

    const flexRow = { display: "flex", gap: 8 };
    const styleIconsJob = { fontSize: 25, marginTop: 10, marginRight: 10 }
    const styleIconsCompany = { fontSize: 15, marginRight: 5 }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetJobById(id);
            setDataJob(result)
            const resultCompany = await GetCompanyById(result.idCompany);
            setDataCompany(resultCompany);
        }
        fetchApi();
    }, [])

    const onFinish = async (e) => {
        console.log(e);
        e.city = dataJob.city[e.city]
        e.birthday = e.birthday.$y
        e.idJob = id,
        e.idCompany = dataCompany.id;
        e.createAt = GetTime();
        const response = await CreateCV(e);
        if (response) {
            success();
            form.resetFields();
        } else {
            error();
        }
    }

    return (
        <>
            {contextHolder}
            {dataJob && (
                <Row gutter={[10, 10]}>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Card 
                            title={<h3>{dataJob.name}</h3>} 
                            style={{ width: "100%" }}
                        >
                            <Row gutter={[20, 10]}>
                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <EuroOutlined />
                                    </span>
                                    <div>
                                        <div>Mức lương</div>
                                        <div><h4>{dataJob.salary}</h4></div>
                                    </div>
                                </Col>

                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <FieldTimeOutlined />
                                    </span>
                                    <div>
                                        <div>Ngày cập nhật</div>
                                        <div><h4>{dataJob.updateAt}</h4></div>
                                    </div>
                                </Col>

                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <EnvironmentOutlined />
                                    </span>
                                    <div>
                                        <div>Địa điểm</div>
                                        <div>
                                            {dataJob.city?.map((item, index) => (
                                                <Tag key={index} color="gold">{item}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div>
                                <Button type="primary" href="#applicationForm" style={{ width: "70%" }}>Ứng tuyển ngay</Button>
                            </div>
                        </Card>

                        <Card title={<h3>Chi tiết tuyển dụng</h3>} >
                            <div>
                                {dataJob.tags?.map((item, index) => (
                                    <Tag key={index}>{item}</Tag>
                                ))}
                            </div>
                            <div>
                                <div><h4>Mô tả công việc</h4></div>
                                <div>{dataJob.descriptionDetail}</div>
                            </div>
                            <div>
                                <List
                                    size="small"
                                    header={<div><h4>Yêu cầu công việc:</h4></div>}
                                    dataSource={dataJob.requirements}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </div>
                            <div>
                                <List
                                    size="small"
                                    header={<div><h4>Phúc lợi:</h4></div>}
                                    dataSource={dataJob.benefits}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </div>
                        </Card>

                        <Card title={<h3>Đơn ứng tuyển</h3>} id="applicationForm">
                            <Form form={form} onFinish={onFinish} layout="vertical">
                                <Row gutter={[20, 20]}>
                                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            label="Họ và tên"
                                            name="fullName"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <Input placeholder="VD: Nguyen Van A" />
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            label="Địa chỉ Email"
                                            name="email"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <Input placeholder="VD: abc123@gmail.com" />
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phone"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <Input placeholder="VD: 0123456789" />
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                                        <Form.Item
                                            label="Năm sinh"
                                            name="birthday"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <DatePicker format="YYYY" picker="year" />
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                                        <Form.Item
                                            label="Địa chỉ"
                                            name="city"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <Select>
                                                {dataJob.city?.map((item, index) => (
                                                    <Select.Option key={index}>{item}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Mô tả bản thân"
                                            name="description"
                                            rules={[{ required: true, message: "Bắt buộc" }]}
                                        >
                                            <TextArea rows={5} placeholder="Nhập dữ liệu trên một dòng"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Kinh nghiệm"
                                            name="experience"
                                        >
                                            <TextArea rows={5} placeholder="Nhập dữ liệu trên 1 dòng"/>
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            label="Chứng chỉ"
                                            name="certificate"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                        <Form.Item
                                            label="Hoạt động"
                                            name="activity"
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button style={{ width: 200 }} type="primary" htmlType="submit">Nộp đơn</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>

                        </Card>
                    </Col>

                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Card
                            style={{ width: "100%" }}
                            title={
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <img
                                        src={dataCompany.logo}
                                        alt={dataCompany.companyName}
                                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                                    />
                                    <span>{dataCompany.companyName}</span>
                                </div>
                            }
                            extra={<Link to={`/companyDetail/${dataCompany.id}`}>Xem chi tiết</Link>}
                        >
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <UsergroupAddOutlined />
                                </span>
                                <span>Quy mô: <b>{dataCompany.quantityPeople} nhân viên</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <BlockOutlined />
                                </span>
                                <span>Ngành nghề: <b>{dataCompany.description}</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <EnvironmentOutlined />
                                </span>
                                <span>Địa điểm: <b>{dataCompany.address}</b></span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}
export default JobDetail;