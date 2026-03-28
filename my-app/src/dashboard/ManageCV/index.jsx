import { useEffect, useState } from "react";
import { Button, Table, Tag, Tooltip, Input, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCookieValue } from "../../components/helpers/cookie";
import NameJob from "./NameJob";
import DeleteCV from "./DeleteCV";
import dayjs from "dayjs";
import { GetCVByIdCompany, SearchCV } from "../../components/services/cv";

// debounce hook
function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

function ManageCV() {
    const companyId = getCookieValue("id");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // search + filter
    const [keyword, setKeyword] = useState("");

    const debouncedKeyword = useDebounce(keyword, 500);

    const fetchApi = async () => {
        try {
            setLoading(true);

            let response;

            if (debouncedKeyword) {
                response = await SearchCV(companyId, debouncedKeyword);
            } else {
                response = await GetCVByIdCompany(companyId);
            }

            setData(response?.cvs);
        } catch (err) {
            console.error("Error fetching CV:", err);
            setData([]); // fallback an toàn
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [debouncedKeyword]);

    const handleReload = () => {
        fetchApi();
    };

    // columns table
    const columns = [
        {
            key: "nameJob",
            title: "Tên job",
            render: (_, record) => <NameJob record={record} />
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
            key: "createdAt",
            dataIndex: "createdAt",
            title: "Thời gian nộp CV",
            render: (value) =>
                dayjs(value).format("DD/MM/YYYY")
        },
        {
            key: "statusRead",
            dataIndex: "statusRead",
            title: "Trạng thái",
            render: (_, record) =>
                record.statusRead ? (
                    <Tag color="green">Đã đọc</Tag>
                ) : (
                    <Tag>Chưa đọc</Tag>
                )
        },
        {
            key: "action",
            title: "Hành động",
            render: (_, record) => (
                <>
                    <Tooltip title="Xem chi tiết CV">
                        <Button style={{ marginRight: 5 }}>
                            <Link to={`detailCV/${record._id}`}>
                                <EyeOutlined />
                            </Link>
                        </Button>
                    </Tooltip>

                    <DeleteCV record={record} onReload={handleReload} />
                </>
            )
        },
    ];

    return (
        <>
            {/* SEARCH + FILTER */}
            <div style={{
                marginBottom: 20,
                display: "flex",
                gap: 10,
                flexWrap: "wrap"
            }}>
                <Input.Search
                    placeholder="Tìm theo tên công việc"
                    allowClear
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: 280 }}
                />
            </div>

            <h2>Thông tin CV</h2>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
            />
        </>
    );
}

export default ManageCV;