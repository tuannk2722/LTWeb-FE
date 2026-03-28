import { Button, Col, Form, Input, message } from "antd";
import { CreateUser } from "../../components/services/companies";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        delete values.password2;
        try {
            await CreateUser(values);

            messageApi.success("Register successful! You'll be redirected to the Login page.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (e) {
            // Lấy message lỗi từ NodeJS trả về (res.status(400).json({message: "..."}))
            const errorMsg = e.response?.data?.message || "Register Failed!";
            messageApi.error(errorMsg);
        } finally {
            setLoading(false); // Kết thúc load dù thành công hay thất bại
        }
    }

    return (
        <>
            {contextHolder}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <Col span={8}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tài khoản"
                            name="email"
                            rules={[{ required: true, message: "Bắt buộc!" }]}
                        >
                            <Input placeholder="VD: abc123@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="password2"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit" style={{ width: "100%", marginTop: 20 }}>Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        </>
    )
}
export default Register;