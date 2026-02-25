import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { getCookieValue } from "../../../components/helpers/cookie";
import { GetAllTags } from "../../../components/services/tags";
import { GetAllCities } from "../../../components/services/cities";
import { GetTime } from "../../../components/getTime";
import { CreateNewJob } from "../../../components/services/jobs";
import { useNavigate } from "react-router-dom";
import { GenerateToken } from "../../../components/helpers/generateToken";

function CreateJob() {
    const id = getCookieValue("id");
    const [dataTags, setDataTags] = useState({});
    const [dataCities, setDataCities] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Tạo mới công việc thành công!"
        })
    }
    const error = () => {
        messageApi.open({
            type: "error",
            content: "Tạo mới công việc thất bại!"
        })
    }

    useEffect(() => {
        const fetchApi = async () => {
            const resultTags = await GetAllTags();
            const resultCities = await GetAllCities();
            if (resultTags) {
                setDataTags(resultTags);
                setDataCities(resultCities);
            }
        }
        fetchApi();
    }, [])

    const onFinish = async (e) => {
        let cities = [];
        e.city.forEach(index => {
            const city = dataCities.find(item => item.key == index)
            cities.push(city.value);
        })
        e.city = cities;

        let categories = [];
        e.tags.forEach(index => {
            const tag = dataTags.find(item => item.key == index)
            categories.push(tag.value);
        })
        e.tags = categories;

        e.requirements = e.requirements
            .split("\n")
            .map(item => item.trim()) // loại bỏ khoảng trắng dư
            .filter(item => item !== ""); // bỏ dòng trống nếu có

        e.benefits = e.benefits
            .split("\n")
            .map(item => item.trim()) // loại bỏ khoảng trắng dư
            .filter(item => item !== ""); // bỏ dòng trống nếu có

        e.salary = e.salary + " Triệu";

        let finalData = {
            idCompany: id,
            createAt: GetTime(),
            ...e,
            token: GenerateToken()
        }

        const response = await CreateNewJob(finalData);
        if (response) {
            success();
            setTimeout(() => {
                navigate("/dashboard/manageJob");
            }, 1500)
        } else {
            error();
        }
    }

    return (
        <>
            {contextHolder}
            <h2>Tạo mới một công việc</h2>
            <Form
                onFinish={onFinish}
                layout="vertical"
                style={{ marginTop: 60 }}
            >
                <Row gutter={[20, 10]}>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Form.Item
                            label="Tên công việc"
                            name="name"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Form.Item
                            label="Mức lương"
                            name="salary"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Space.Compact>
                                <Input />
                                <span style={{ padding: "0 8px", display: "flex", alignItems: "center" }}>
                                    Triệu
                                </span>
                            </Space.Compact>
                        </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        {dataTags.length > 0 && (
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                >
                                    {dataTags.map(item => (
                                        <Select.Option key={item.key}>{item.value}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        {dataCities.length > 0 && (
                            <Form.Item
                                label="Thành phố"
                                name="city"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                >
                                    {dataCities.map(item => (
                                        <Select.Option key={item.key}>{item.value}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.TextArea placeholder="Nhập trên một dòng" rows={2} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Chi tiết"
                            name="descriptionDetail"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.TextArea placeholder="Nhập trên một dòng" rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Yêu cầu công việc"
                            name="requirements"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.TextArea placeholder="Mỗi yêu cầu nhập trên một dòng" rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Phúc lợi"
                            name="benefits"
                            rules={[{ required: true, message: "Bắt buộc" }]}
                        >
                            <Input.TextArea placeholder="Mỗi yêu cầu nhập trên một dòng" rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button style={{ width: 150, marginRight: 20 }} type="primary" htmlType="submit">Tạo mới</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default CreateJob;