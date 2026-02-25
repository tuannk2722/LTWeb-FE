import { useEffect, useState } from "react";
import { GetJobByCompanyId } from "../../components/services/jobs";
import { getCookieValue } from "../../components/helpers/cookie";
import { Button, Table, Tag, Tooltip } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import { GetAllCities } from "../../components/services/cities";
import { GetAllTags } from "../../components/services/tags";

function ManageJob() {
    const id = getCookieValue("id");
    const [data, setData] = useState([]); // luu data job cua cong ty
    const [dataCities, setDataCities] = useState([]);
    const [dataTags, setDataTags] = useState([]);
    
    const fetchApi = async () => {
        const result = await GetJobByCompanyId(id);
        const resultCities = await GetAllCities();
        const resultTags = await GetAllTags();
        if (result) {
            setData(result);
            setDataCities(resultCities);
            setDataTags(resultTags);
        }
    }
    
    useEffect(() => {
        fetchApi();
    }, [])

    const handleReload = () => fetchApi();
    
    const columns = [
        {
            key: "name",
            dataIndex: "name",
            title: "Tên job"
        },
        {
            key: "tags",
            dataIndex: "tags",
            title: "Tags",
            render: (_, record) => {
                return (
                    <>
                        {record.tags.map(item => (
                            <Tag
                                style={{ marginRight: 10 }}
                                color="blue"
                                key={item}
                            >{item}</Tag>
                        ))}
                    </>
                )
            }
        },
        {
            key: "salary",
            dataIndex: "salary",
            title: "Mức lương"
        },
        {
            key: "time",
            dataIndex: "time",
            title: "Thời gian",
            render: (_, record) => {
                return (
                    <>
                        <div><i>Thời gian tạo:</i> {record.createAt}</div>
                        <div><i>Thời gian cập nhật:</i> {record.updateAt}</div>
                    </>
                )
            }
        },
        {
            key: "status",
            dataIndex: "status",
            title: "Trạng thái",
            render: (_, record) => {
                return (
                    <>
                        {record.status ? <Tag color="green">Đang mở</Tag> : <Tag color="red">Đang đóng</Tag>}
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
                        <Tooltip title="Xem chi tiết job">
                            <Button style={{ marginRight: 5 }}>
                                <Link to={`/jobDetail/${record.id}`} ><EyeOutlined /></Link>
                            </Button>
                        </Tooltip>

                        {dataCities.length > 0 && (
                            <EditJob record={record} onReload={handleReload} dataCities={dataCities} dataTags={dataTags}/>
                        )}
    
                        <DeleteJob record={record} onReload={handleReload} />
                    </>
                )
            }
        },
    ]
    
    return (
        <>
            <h2>Thông tin công việc</h2>
            <div style={{marginBottom: 20}}>
                <Button><Link to="createJob"><PlusOutlined /> Tạo mới công việc</Link></Button>
            </div>
            {data.length > 0 && (
                <Table columns={columns} dataSource={data} rowKey="id" />
            )}
        </>
    )
}
export default ManageJob;