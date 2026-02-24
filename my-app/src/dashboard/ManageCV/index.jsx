import { useEffect, useState } from "react";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCookieValue } from "../../components/helpers/cookie";
import { GetCVByIdCompany } from "../../components/services/cv";
import NameJob from "./NameJob";
import DeleteCV from "./DeleteCV";

function ManageCV() {
    const id = getCookieValue("id");
    const [data, setData] = useState([]);
    
    const fetchApi = async () => {
        const result = await GetCVByIdCompany(id);
        if (result) {
            setData(result);
        }
    }
    
    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => fetchApi();
    
    const columns = [
        {
            key: "nameJob",
            dataIndex: "nameJob",
            title: "Tên job",
            render: (_, record) => {
                return (
                    <>
                        <NameJob record={record}/>
                    </>
                )
            }
        },
        {
            key: "fullName",
            dataIndex: "fullName",
            title: "Họ và tên",
        },
        {
            key: "email",
            dataIndex: "email",
            title: "Địa chỉ email",
        },
        {
            key: "createAt",
            dataIndex: "createAt",
            title: "Thời gian nộp CV"
        },
        {
            key: "statusRead",
            dataIndex: "statusRead",
            title: "Trạng thái",
            render: (_, record) => {
                return (
                    <>
                        {record.statusRead ? <Tag color="green">Đã đọc</Tag> : <Tag>Chưa đọc</Tag>}
                    </>
                )
            }
        },
        {
            key: "action",
            dataIndex: "action",
            title: "Hành động",
            render: (_, record) => {
                return (
                    <>
                        <Tooltip title="Xem chi tiết CV">
                            <Button style={{ color: "black" }}>
                                <Link to={`detailCV/${record.id}`} ><EyeOutlined /></Link>
                            </Button>
                        </Tooltip>
    
                        <DeleteCV record={record} onReload={handleReload} />
                    </>
                )
            }
        },
    ]
    
    return (
        <>
            <h2>Thông tin CV</h2>
            {data && (
                <Table columns={columns} dataSource={data} rowKey="id" />
            )}
        </>
    )
}
export default ManageCV;