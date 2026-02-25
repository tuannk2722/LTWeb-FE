import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Space, Switch, Tooltip } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { GetTime } from "../../../components/getTime";
import { getCookieValue } from "../../../components/helpers/cookie";
import { EditInfoJob, GetJob } from "../../../components/services/jobs";

function EditJob({ record, onReload, dataCities, dataTags }) {
    const idCompany = getCookieValue("id");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    // Mở modal
    const handleOpen = () => {
        setIsModalOpen(true);
    };

    // Đóng modal
    const handleClose = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        form.resetFields();
    };

    const converted = {
        ...record,
        requirements: Array.isArray(record.requirements)
            ? record.requirements.join("\n") : record.requirements,
        benefits: Array.isArray(record.benefits)
            ? record.benefits.join("\n") : record.benefits,
    }


    // Submit form
    const handleSubmit = async (values) => {
        try {
            const job = await GetJob("token", record.token);

            const finalData = {
                idCompany: idCompany,
                updateAt: GetTime(),
                token: record.token,
                status: values.status ?? false,
                ...values,
                requirements: values.requirements
                    ?.split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item !== ""),
                benefits: values.benefits
                    ?.split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item !== "")
            };

            const response = await EditInfoJob(job[0].id, finalData);

            if (response) {
                messageApi.success("Cập nhật job thành công!");
                onReload();
                handleClose();
            } else {
                messageApi.error("Cập nhật job thất bại!");
            }
        } catch (error) {
            messageApi.error("Có lỗi xảy ra!");
        }
    };

    return (
        <>
            {contextHolder}

            <Tooltip title="Chỉnh sửa job">
                <Button
                    icon={<EditOutlined />}
                    style={{ marginRight: 5, fontSize: 12, color: "blue" }}
                    onClick={handleOpen}
                />
            </Tooltip>

            <Modal
                title="Chỉnh sửa công việc"
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                width="90%"
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 20
                    }}
                >
                    <Checkbox
                        checked={isEditing}
                        onChange={(e) => setIsEditing(e.target.checked)}
                    >
                        Bật chế độ chỉnh sửa
                    </Checkbox>
                </div>

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                    disabled={!isEditing}
                    initialValues={converted}
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
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Select mode="multiple" allowClear>
                                    {dataTags.map((item) => (
                                        <Select.Option key={item.key} value={item.value}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Thành phố"
                                name="city"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Select mode="multiple" allowClear>
                                    {dataCities.map((item) => (
                                        <Select.Option key={item.key} value={item.value}>
                                            {item.value}
                                        </Select.Option>
                                    ))}
                                </Select>
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
                                name="descriptionDetail"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Yêu cầu công việc"
                                name="requirements"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Phúc lợi"
                                name="benefits"
                                rules={[{ required: true, message: "Bắt buộc" }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Trạng thái Job"
                                name="status"
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="On" unCheckedChildren="Off" />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!isEditing}
                                style={{ marginRight: 10 }}
                            >
                                Lưu thay đổi
                            </Button>
                            <Button onClick={handleClose}>Hủy</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default EditJob;