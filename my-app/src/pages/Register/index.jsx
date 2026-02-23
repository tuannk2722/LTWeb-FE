import { Button, Col, Form, Input, message } from "antd";
import { CheckExistValue, CreateInfoCompany } from "../../components/services/companies";
import { GenerateToken } from "../../components/helpers/generateToken";
import { useNavigate } from "react-router-dom";

function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (e) => {
        const isExistEmail = await CheckExistValue("email", e.email);
        const isExistPassword = await CheckExistValue("password", e.password);
        if (isExistEmail.length > 0 && isExistPassword.length > 0) {
            messageApi.open({
                type: "error",
                content: "Tài khoản hoặc mật khẩu đã tồn tại!"
            })
        } else {
            let infoCompany = {
                id: String(Date.now()),
                companyName: "",
                phone: "",
                address: "",
                workingTime: "",
                website: "",
                quantityPeople: 0,
                description: "",
                detail: "",
                logo: "",
                email: e.email,
                password: e.password,
                token: GenerateToken()
            };

            const response = await CreateInfoCompany(infoCompany);

            if (response) {
                messageApi.open({
                    type: "success",
                    content: "Tạo tài khoản thành công!"
                })
                setTimeout(() => {
                    navigate("/login");
                }, 1500)
            }
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
                            <Button type="primary" htmlType="submit" style={{ width: "100%", marginTop: 20 }}>Đăng ký</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        </>
    )
}
export default Register;