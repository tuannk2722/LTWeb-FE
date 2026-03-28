import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetJobById } from "../../components/services/jobs";
import { Card, Col, Row } from "antd";
import { EnvironmentOutlined, UsergroupAddOutlined, BlockOutlined } from "@ant-design/icons";
import Detail from "./Detail";
import ApplyForm from "./ApplyForm";


function JobDetail() {
    const { id } = useParams();
    const [dataJob, setDataJob] = useState([]);

    const flexRow = { display: "flex", gap: 8 };
    const styleIconsCompany = { fontSize: 15, marginRight: 5 }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await GetJobById(id);
                setDataJob(result);
                
            } catch(err) {
                console.log(err);
            }
        }
        fetchApi();
    }, [])
    

    return (
        <>
            {dataJob && (
                <Row gutter={[10, 10]}>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                        <Detail dataJob={dataJob} />

                        <ApplyForm dataJob={dataJob} jobId={id} companyId={dataJob?.companyId?._id} />
                    </Col>

                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                        <Card
                            style={{ width: "100%" }}
                            title={
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <img
                                        src={dataJob?.companyId?.logo}
                                        alt={dataJob?.companyId?.companyName}
                                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                                    />
                                    <span>{dataJob?.companyId?.companyName}</span>
                                </div>
                            }
                            extra={<Link to={`/companyDetail/${dataJob?.companyId?._id}`}>Xem chi tiết</Link>}
                        >
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <UsergroupAddOutlined />
                                </span>
                                <span>Quy mô: <b>{dataJob?.companyId?.quantityPeople} nhân viên</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <BlockOutlined />
                                </span>
                                <span>Ngành nghề: <b>{dataJob?.companyId?.description}</b></span>
                            </div>
                            <div style={flexRow}>
                                <span style={styleIconsCompany}>
                                    <EnvironmentOutlined />
                                </span>
                                <span>Địa điểm: <b>{dataJob?.companyId?.address}</b></span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}
export default JobDetail;