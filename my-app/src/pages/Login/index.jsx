import { Button, Col, Form, Input, message, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../components/helpers/cookie";
import { useState } from "react";
import { LoginUser } from "../../components/services/companies";

function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await LoginUser(values);

            messageApi.success(response.message);
            setCookie("token", response.user.role, 1);
            setCookie("id", response.user.companyId, 1);

            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch(e) {
            const errrorMsg = e.response?.data?.message || "Login failed!"
            messageApi.error(errrorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
            <Form 
                style={{display: "flex", justifyContent: "center", marginTop: 50 }}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={24} style={{minWidth: 400}}>
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: "Bắt buộc"}]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="VD: abc123@gmail.com"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: "Bắt buộc"}]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} block type="primary" htmlType="submit" style={{marginBottom: 20}}>Đăng nhập</Button>
                            or <Link to="/register">Đăng ký ngay!</Link>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default Login;

// import { Button, Col, Form, Input, message, Row } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { CheckExist } from "../../components/services/companies";
// import { setCookie } from "../../components/helpers/cookie";

// function Login() {
//     const [messageApi, contextHolder] = message.useMessage();
//     const navigate = useNavigate();

//     const success = () => {
//         messageApi.open({
//             type: "success",
//             content: "Đăng nhập thành công!"
//         })
//     }
//     const error = () => {
//         messageApi.open({
//             type: "error",
//             content: "Tài khoản hoặc mật khẩu không đúng!"
//         })
//     }

//     const onFinish = async (e) => {
//         const isExist = await CheckExist(e.email, e.password);
//         if (isExist.length > 0) {
//             const time = 1;
//             setCookie("id", isExist[0].id, time);
//             setCookie("email", isExist[0].email, time);
//             setCookie("password", isExist[0].password, time);
//             setCookie("token", isExist[0].token, time);
//             success();
//             setTimeout(() => {
//                 navigate("/")
//             }, 1500)
//         } else {
//             error()
//         }
//     }

//     return (
//         <>
//             {contextHolder}
//             <Form 
//                 style={{display: "flex", justifyContent: "center", marginTop: 50 }}
//                 onFinish={onFinish}
//             >
//                 <Row>
//                     <Col span={24} style={{minWidth: 400}}>
//                         <Form.Item
//                             name="email"
//                             rules={[{required: true, message: "Bắt buộc"}]}
//                         >
//                             <Input prefix={<UserOutlined />} placeholder="VD: abc123@gmail.com"/>
//                         </Form.Item>
//                         <Form.Item
//                             name="password"
//                             rules={[{required: true, message: "Bắt buộc"}]}
//                         >
//                             <Input.Password prefix={<LockOutlined />} />
//                         </Form.Item>
//                         <Form.Item>
//                             <Button block type="primary" htmlType="submit" style={{marginBottom: 20}}>Đăng nhập</Button>
//                             or <Link to="/register">Đăng ký ngay!</Link>
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             </Form>
//         </>
//     )
// }
// export default Login;