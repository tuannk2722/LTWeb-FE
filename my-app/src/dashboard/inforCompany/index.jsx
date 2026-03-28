import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row } from "antd";
import { getCookieValue } from "../../components/helpers/cookie";
import { useEffect, useState } from "react";
import { EditInfoCompany, GetCompanyById } from "../../components/services/companies";

function InforCompany() {
    const id = getCookieValue("id");
    const [data, setData] = useState({});
    const [edit, setEdit] = useState(true);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);


    const fetchApi = async () => {
        try {
            const result = await GetCompanyById(id);
            setData(result);
            form.setFieldsValue(result);

        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const handleClick = () =>  setEdit(!edit);

    const handleCancel = () => {
        setEdit(!edit);
        fetchApi();
    }

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await EditInfoCompany(id, values);
            setEdit(!edit);
            fetchApi();
            messageApi.success("Update information successful!");

        } catch(e) {
            const errorMsg = e.response?.data?.message || "Update information failed!";
            messageApi.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
            <h2>Thông tin công ty</h2>
            <div>
                <Checkbox onClick={handleClick} style={{ float: "right" }}>Chỉnh sửa thông tin</Checkbox>
            </div>
            {data && (
                <Form 
                    onFinish={onFinish} 
                    disabled={edit} 
                    layout="vertical"
                    initialValues={data}
                    form={form}
                    style={{marginTop: 60}}
                >
                    <Row gutter={[20, 10]}>
                        <Col span={24}>
                            <Form.Item
                                label="Tên công ty"
                                name="companyName"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Số lượng nhân sự"
                                name="quantityPeople"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <InputNumber style={{width: "100%"}} />
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Thời gian làm việc"
                                name="workingTime"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input placeholder="Vd: Mon - Fri (9:00 - 18:00)"/> 
                            </Form.Item>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Link website"
                                name="website"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input.TextArea rows={2} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Chi tiết"
                                name="detail"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Logo"
                                name="logo"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button loading={loading} style={{ width: 150, marginRight: 20 }} type="primary" htmlType="submit">Chỉnh sửa</Button>
                                <Button style={{ width: 100 }} onClick={handleCancel} htmlType="submit">Hủy</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </>
    )
}
export default InforCompany;