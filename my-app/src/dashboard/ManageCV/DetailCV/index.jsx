import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetJobById } from "../../../components/services/jobs";
import { ChangeStatusRead, GetCVById } from "../../../components/services/cv";
import { Row, Col, Card, Tag, List } from "antd";
import { EuroOutlined, FieldTimeOutlined, EnvironmentOutlined } from "@ant-design/icons";

function DetailCV() {
    const { id } = useParams();
    const [dataCV, setDataCV] = useState([]);
    const [dataJob, setDataJob] = useState({});

    const styleIconsJob = { fontSize: 25, marginTop: 10, marginRight: 10 }

    useEffect(() => {
        const fetchApi = async () => {
            const infoCV = await GetCVById(id);
            const infoJob = await GetJobById(infoCV.idJob);
            setDataCV(infoCV);
            setDataJob(infoJob);
            ChangeStatusRead(infoCV.id, { statusRead: true });
        }
        fetchApi()
    }, [])

    return (
        <>
            {dataCV && (
                <Row gutter={[20, 20]}>
                    {/* Thong tin ung vien */}
                    <Col span={24}>
                        <Card title={<h3>Thông tin ứng viên</h3>}>
                            <div style={{marginBottom: 10}} >Họ và tên: <b>{dataCV.fullName}</b></div>
                            <div style={{marginBottom: 10}} >Năm sinh: <b>{dataCV.birthday}</b></div>
                            <div style={{marginBottom: 10}} >Nơi ở: <b>{dataCV.city}</b></div>
                            <div style={{marginBottom: 10}} >Địa chỉ Email: <b>{dataCV.email}</b></div>
                            <div style={{marginBottom: 10}} >Số điện thoại: <b>{dataCV.phone}</b></div>
                            <div style={{marginBottom: 10}} >Mô tả: <b>{dataCV.description}</b></div>
                            <div style={{marginBottom: 10}} >Kinh nghiệm: <b>{dataCV.experience}</b></div>
                            <div style={{marginBottom: 10}} >Chứng chỉ: <b>{dataCV.certificate}</b></div>
                            <div style={{marginBottom: 10}} >Hoạt động: <b>{dataCV.activity}</b></div>
                            <div>Ngày nộp CV: <b>{dataCV.createAt}</b></div>
                        </Card>
                    </Col>

                    {/* Thong tin job ma ung vien da nop don vao */}
                    <Col span={24}>
                        <Card title={<h3>{dataJob.name}</h3>} style={{ width: "100%" }}>
                            <Row gutter={[20, 10]}>
                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <EuroOutlined />
                                    </span>
                                    <div>
                                        <div>Mức lương</div>
                                        <div><h4>{dataJob.salary}</h4></div>
                                    </div>
                                </Col>

                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <FieldTimeOutlined />
                                    </span>
                                    <div>
                                        <div>Ngày cập nhật</div>
                                        <div><h4>{dataJob.updateAt}</h4></div>
                                    </div>
                                </Col>

                                <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                                    <span style={styleIconsJob}>
                                        <EnvironmentOutlined />
                                    </span>
                                    <div>
                                        <div>Địa điểm</div>
                                        <div>
                                            {dataJob.city?.map((item, index) => (
                                                <Tag key={index} color="gold">{item}</Tag>
                                            ))}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>

                        <Card title={<h3>Chi tiết công việc</h3>} >
                            <div>
                                {dataJob.tags?.map((item, index) => (
                                    <Tag key={index}>{item}</Tag>
                                ))}
                            </div>
                            <div>
                                <div><h4>Mô tả công việc</h4></div>
                                <div>{dataJob.descriptionDetail}</div>
                            </div>
                            <div>
                                <List
                                    size="small"
                                    header={<div><h4>Yêu cầu công việc:</h4></div>}
                                    dataSource={dataJob.requirements}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </div>
                            <div>
                                <List
                                    size="small"
                                    header={<div><h4>Phúc lợi:</h4></div>}
                                    dataSource={dataJob.benefits}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}
export default DetailCV;