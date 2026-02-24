import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetJobById } from "../../components/services/jobs";
import { GetCompanyById } from "../../components/services/companies";
import { Card, Col, Row } from "antd";
import { EnvironmentOutlined, UsergroupAddOutlined, BlockOutlined } from "@ant-design/icons";
import Detail from "./Detail";
import ApplyForm from "./ApplyForm";


function JobDetail() {
    const { id } = useParams();
    const [dataJob, setDataJob] = useState([]);
    const [dataCompany, setDataCompany] = useState([]);

    const flexRow = { display: "flex", gap: 8 };
    const styleIconsCompany = { fontSize: 15, marginRight: 5 }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetJobById(id);
            setDataJob(result)
            const resultCompany = await GetCompanyById(result.idCompany);
            setDataCompany(resultCompany);
        }
        fetchApi();
    }, [])

    return (
        <>
            {dataJob && (
                <Row gutter={[10, 10]}>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Detail dataJob={dataJob} />

                        <ApplyForm dataJob={dataJob} idJob={id} idCompany={dataCompany.id} />
                    </Col>

                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Card
                            style={{ width: "100%" }}
                            title={
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <img
                                        src={dataCompany.logo}
                                        alt={dataCompany.companyName}
                                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                                    />
                                    <span>{dataCompany.companyName}</span>
                                </div>
                            }
                            extra={<Link to={`/companyDetail/${dataCompany.id}`}>Xem chi tiết</Link>}
                        >
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <UsergroupAddOutlined />
                                </span>
                                <span>Quy mô: <b>{dataCompany.quantityPeople} nhân viên</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <BlockOutlined />
                                </span>
                                <span>Ngành nghề: <b>{dataCompany.description}</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <EnvironmentOutlined />
                                </span>
                                <span>Địa điểm: <b>{dataCompany.address}</b></span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}
export default JobDetail;