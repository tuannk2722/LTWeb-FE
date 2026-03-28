import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetCompanyById } from "../../components/services/companies";
import { Card, Tag, Col, Row, Tooltip } from "antd";
import { UsergroupAddOutlined, BlockOutlined, EnvironmentOutlined, ScheduleOutlined } from "@ant-design/icons";
import { GetJobByCompanyId } from "../../components/services/jobs";

function CompanyDetail() {
    const { id } = useParams();
    const [data, setData] = useState([])
    const [dataJobs, setDataJobs] = useState([]);

    const flexRow = { display: "flex", gap: 8, fontSize: 16 };
    const styleIconsCompany = { fontSize: 20 }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await GetCompanyById(id);
                setData(result);

                const allJobs = await GetJobByCompanyId(id);
                const newDataJob = allJobs.filter(e => {
                    return e.status === true;
                })
                setDataJobs(newDataJob);
                
            } catch(e) {
                console.error(e);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && (
                <Card
                    style={{ marginLeft: 100, marginRight: 100, marginTop: 30 }}
                    title={
                        <div style={{ display: "flex", alignItems: "center", fontSize: 30 }}>
                            <img
                                src={data.logo}
                                alt={data.companyName}
                                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "20%", marginRight: 30 }}
                            />
                            <span>{data.companyName}</span>
                        </div>
                    }
                >
                    <div>
                        <h3>Về chúng tôi</h3>
                    </div>
                    <div style={flexRow}>
                        <span style={styleIconsCompany}>
                            <UsergroupAddOutlined />
                        </span>
                        <span>Quy mô: {data.quantityPeople} nhân viên</span>
                    </div>
                    <div style={flexRow}>
                        <span style={styleIconsCompany}>
                            <BlockOutlined />
                        </span>
                        <span>Ngành nghề: {data.description}</span>
                    </div>
                    <div style={flexRow}>
                        <span style={styleIconsCompany}>
                            <ScheduleOutlined />
                        </span>
                        <span>Giờ làm việc: {data.workingTime}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, fontSize: 16, marginBottom: 20 }}>
                        <span style={styleIconsCompany}>
                            <EnvironmentOutlined />
                        </span>
                        <span>Địa điểm: {data.address}</span>
                    </div>
                    <div style={{ fontSize: 19 }}>{data.description}</div>
                    <div>{data.detail}</div>
                    <div style={{ fontSize: 16, marginBottom: 10 }}>
                        Link website:{" "}
                        <a href={data.website} target="_blank" rel="noopener noreferrer">
                            {data.website}
                        </a>
                    </div>
                    <div>
                        <h3>Vị trí đang tuyển dụng</h3>
                    </div>
                    <div>
                        {dataJobs.length > 0 && (
                            <Row gutter={[5, 5]}>
                                {dataJobs.map(item => (
                                    <Col key={item._id} span={24} style={{ display: "flex", minHeight: 100, borderBottom: "1px solid #ddd" }}>
                                        <div>
                                            <img src={data.logo} alt="Logo" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "20%", marginRight: 30 }} />
                                        </div>
                                        <div>
                                            <Tooltip title="Xem chi tiết công việc">
                                                <div style={{ fontSize: 16 }}>
                                                    <Link to={`/jobDetail/${item._id}`}>
                                                        <b>{item.name}</b>
                                                    </Link>
                                                </div>
                                            </Tooltip>
                                            <div>{item.companyName}</div>
                                            <div>{item.salary}</div>
                                            <div>
                                                Địa điểm:
                                                {item.cities.map(obj => (
                                                    <Tag key={obj._id}>{obj.value}</Tag>
                                                ))}
                                            </div>
                                            <div>Ngày cập nhật: {item.createdAt}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </Card>
            )}
        </>
    )
}
export default CompanyDetail;