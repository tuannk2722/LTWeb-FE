import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChangeStatusRead, GetCVById } from "../../../components/services/cv";
import { Row, Col, Card } from "antd";
import Detail from "../../../pages/JobDetail/Detail";
import { GetJobById } from "../../../components/services/jobs";

function DetailCV() {
    const { id } = useParams();
    const [dataCV, setDataCV] = useState([]);
    const [dataJob, setDataJob] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const inforCV = await GetCVById(id);
                setDataCV(inforCV.data);
                const inforJob = await GetJobById(inforCV.data.jobId._id);
                setDataJob(inforJob);
                ChangeStatusRead(inforCV.data._id, { statusRead: true });
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchApi()
    }, [])

    return (
        <>
            {dataCV && dataJob && (
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
                            <div>Ngày nộp CV: <b>{dataCV.createdAt}</b></div>
                        </Card>
                    </Col>

                    {/* Thong tin job ma ung vien da nop don vao */}
                    <Col span={24}>
                        <Detail dataJob={dataJob} />
                    </Col>
                </Row>
            )}
        </>
    )
}
export default DetailCV;