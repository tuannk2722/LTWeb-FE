import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import logo from "../../image/logo.jpg";

const { Header, Content, Footer } = Layout;

function LayoutDefault() {
    const [current, setCurrent] = useState('home')
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/"){
            setCurrent("home");
        } else {
            setCurrent(location.pathname.replace("/", ""))
        }
    }, [location.pathname])

    const items = [
        {
            key: "login",
            label: <Link to="login">Đăng nhập</Link>,
            icon: <LoginOutlined />, 
            className: "menu__login",
        },
        {
            key: "register",
            icon: <LogoutOutlined />,
            label: <Link to="register">Đăng ký</Link>
        }
    ]

    const itemsLogin = [
        {
            key: "dashboard",
            label: <Link to="dashboard">Quản lý</Link>,
            icon: <UserOutlined />, 
            className: "menu__login",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <Link to="logout">Đăng xuất</Link>
        }
    ]

    return (
        <>
            <Layout>
                <Header style={{display: "flex", alignItems: "center", backgroundColor: "#fff", position: "fixed", zIndex: 2, width: "100%"}}>
                    <Link to="/" className="menu__logo">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Menu 
                        items={items}
                        mode="horizontal"
                        selectedKeys={[current]}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </Header>

                <Content style={{marginTop: 64, minHeight: "80vh"}}>
                    <Outlet />
                </Content>

                <Footer style={{display: "flex", justifyContent: "center"}}>
                    Copyright @by Tuan NK
                </Footer>
            </Layout>
        </>
    )
}
export default LayoutDefault;