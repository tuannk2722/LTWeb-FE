import { useEffect, useState } from "react";
import { GetAllCompany } from "../services/companies";
import { Card, Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

function ListJob(props) {
    const { data } = props;
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetAllCompany();
            if (result) {
                const newData = [];
                for (let i = 0; i < data.length; i++) {
                    const infoCompany = result.find(item => item.id == data[i].idCompany);
                    newData.push({
                        ...data[i],
                        infoCompany,
                    })
                }
                setFinalData(newData);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {finalData.length > 0 && (
                <Row gutter={[20, 20]}>
                    {finalData.map(item => (
                        <Col key={item.id} xxl={6} xl={6} lg={8} md={8} sm={12} xs={24}>
                            <Card title={item.name} style={{minHeight: 250}} extra={<Link to={`/jobDetail/${item.id}`}>Xem chi tiết</Link>}>
                                <div>Lương: <b>{item.salary}</b></div>
                                <div>Công ty: <b>{item.infoCompany.companyName}</b></div>
                                <div>
                                    Địa điểm: 
                                    {item.city.map((itemCity, index) => (
                                        <Tag key={index}>{itemCity}</Tag>
                                    ))}
                                </div>
                                <div>
                                    Kỹ năng:
                                    {item.tags.map((itemTags, index) => (
                                        <Tag key={index}>{itemTags}</Tag>
                                    ))}
                                </div>
                                <div>Ngày tạo: <b>{item.createAt}</b></div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}
export default ListJob;