import { Layout, Menu } from "antd";
import { LogoutOutlined, LaptopOutlined, CopyOutlined, FormOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../image/logo.jpg";

const { Header, Content, Sider } = Layout;

const items1 = [
    {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <Link to="logout">Đăng xuất</Link>,
        className: "menu__login"
    }
]
const items2 = [
    {
        key: "dashboard",
        label: <Link to="/dashboard">Tổng quan</Link>,
        icon: <LaptopOutlined />
    },
    {
        key: "infoCompany",
        label: <Link to="inforCompany">Thông tin công ty</Link>,
        icon: <SnippetsOutlined />
    },
    {
        key: "statusJobs",
        label: <Link to="statusJobs">Quản lý việc làm</Link>,
        icon: <FormOutlined />
    },
    {
        key: "manageCV",
        label: <Link to="manageCV">Quản lý CV</Link>,
        icon: <CopyOutlined />
    },
]

function LayoutAdmin() {
    const [current, setCurrent] = useState('dashboard')
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setCurrent("dashboard");
        } else {
            setCurrent(location.pathname.replace("/", ""))
        }
    }, [location.pathname])

    return (
        <>
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "#fff" }}>
                    <Link to="/" className="menu__logo">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <Menu
                        mode="horizontal"
                        items={items1}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                </Header>
                <Layout>
                    <Sider width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['dashboard']}
                            selectedKeys={[current]}
                            style={{ height: '100%' }}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutAdmin;