import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { CreateCV } from "../../../components/services/cv";

const { TextArea } = Input;

function ApplyForm({ dataJob, jobId, companyId }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        try {
            const payload = {
                ...values,
                city: values.city, 
                birthday: values.birthday?.year(),
                jobId: jobId,
                companyId: companyId,
            };

            const response = await CreateCV(payload);
            form.resetFields();
            messageApi.success(response.message);
            
        } catch (err) {
            console.error("Lỗi submit:", err);
            messageApi.error(err);
        }
    };

    return (
        <>
            {contextHolder}

            <Card title={<h3>Đơn ứng tuyển</h3>} id="applicationForm">
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row gutter={[20, 20]}>

                        <Col span={12}>
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input placeholder="VD: Nguyen Van A" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Địa chỉ Email"
                                name="email"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input placeholder="VD: abc123@gmail.com" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input placeholder="VD: 0123456789" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Năm sinh"
                                name="birthday"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <DatePicker picker="year" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="Địa chỉ"
                                name="city"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Select placeholder="Chọn thành phố">
                                    {dataJob?.cities?.map(item => (
                                        <Select.Option key={item._id} value={item.value}>
                                            {item.value}
                                        </Select.Option>
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
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Kinh nghiệm"
                                name="experience"
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Chứng chỉ"
                                name="certificate"
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Hoạt động"
                                name="activity"
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: 200 }}
                                >
                                    Nộp đơn
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default ApplyForm;