import { Button, Card, Col, List, Row, Tag } from "antd";
import { EuroOutlined, FieldTimeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { getCookieValue } from "../../../components/helpers/cookie";

function Detail(props) {
    const { dataJob } = props;

    const isLogin = getCookieValue("id");

    const styleIconsJob = { fontSize: 25, marginTop: 10, marginRight: 10 }

    return (
        <>
            <Card
                title={<h3>{dataJob.name}</h3>}
                style={{ width: "100%" }}
            >
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
                            <div><h4>{dataJob.updatedAt}</h4></div>
                        </div>
                    </Col>

                    <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                        <span style={styleIconsJob}>
                            <EnvironmentOutlined />
                        </span>
                        <div>
                            <div>Địa điểm</div>
                            <div>
                                {dataJob.cities?.map(item => (
                                    <Tag key={item._id} color="gold">{item.value}</Tag>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>

                {!isLogin && (
                    <div>
                        <Button type="primary" href="#applicationForm" style={{ width: "70%" }}>Ứng tuyển ngay</Button>
                    </div>
                )}
            </Card>

            <Card title={<h3>Chi tiết tuyển dụng</h3>} >
                <div>
                    {dataJob.tags?.map(item => (
                        <Tag key={item._id}>{item.value}</Tag>
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
        </>
    )
}
export default Detail;