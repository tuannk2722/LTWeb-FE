import { useEffect, useState } from "react";
import { GetAllCompany } from "../services/companies";
import { Card, Row, Col } from "antd";
import { UsergroupAddOutlined, BlockOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function CompanyList() {
    const [data, setData] = useState([]);

    const flexRow = { display: "flex", gap: 8 };
    const styleIconsCompany = { fontSize: 15, marginTop: 10, marginRight: 10 }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetAllCompany();
                setData(res);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchApi();
    }, []);

    return (
        <>
            {data.length > 0 && (
                <Row gutter={[20, 20]}>
                    {data.map(item => (
                        <Col key={item._id} xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Card
                                style={{ minHeight: 280 }}
                                title={
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <img
                                            src={item.logo}
                                            alt={item.companyName}
                                            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                                        />
                                        <span>{item.companyName}</span>
                                    </div>
                                }
                                extra={<Link to={`/companyDetail/${item._id}`}>Xem chi tiết</Link>}
                            >
                                <div style={flexRow}>
                                    <span style={styleIconsCompany}>
                                        <UsergroupAddOutlined />
                                    </span>
                                    <span>Quy mô: <b>{item.quantityPeople} nhân viên</b></span>
                                </div>
                                <div style={flexRow}>
                                    <span style={styleIconsCompany}>
                                        <BlockOutlined />
                                    </span>
                                    <span>Ngành nghề: <b>{item.description}</b></span>
                                </div>
                                <div style={flexRow}>
                                    <span style={styleIconsCompany}>
                                        <EnvironmentOutlined />
                                    </span>
                                    <span>Địa điểm: <b>{item.address}</b></span>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default CompanyList;