import { useEffect, useState } from "react";
import { GetJobByCompanyId, SearchJob } from "../../components/services/jobs";
import { getCookieValue } from "../../components/helpers/cookie";
import { Button, Input, Table, Tag, Tooltip } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditJob from "./EditJob";
import { GetAllCities } from "../../components/services/cities";
import { GetAllTags } from "../../components/services/tags";
import dayjs from "dayjs";

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

function ManageJob() {
  const id = getCookieValue("id");

  const [data, setData] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataTags, setDataTags] = useState([]);

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  // 🔥 fetch ban đầu
  const fetchInitial = async () => {
    try {
      const [jobs, cities, tags] = await Promise.all([
        GetJobByCompanyId(id),
        GetAllCities(),
        GetAllTags()
      ]);

      setData(Array.isArray(jobs) ? jobs : []);
      setDataCities(cities);
      setDataTags(tags);
    } catch (e) {
      console.error(e);
    }
  };

  // 🔥 search từ BE
  const fetchSearch = async (keyword) => {
    try {
      const res = await SearchJob(id, keyword);
      setData(Array.isArray(res.jobs) ? res.jobs : []);
    } catch (e) {
      console.error("Search job error:", e);
      setData([]);
    }
  };

  // load lần đầu
  useEffect(() => {
    fetchInitial();
  }, []);

  // 🔥 mỗi khi keyword thay đổi → call BE
  useEffect(() => {
    if (!debouncedKeyword.trim()) {
      fetchInitial(); // nếu xoá search → load lại toàn bộ
    } else {
      fetchSearch(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  const handleReload = () => {
    if (debouncedKeyword) {
      fetchSearch(debouncedKeyword);
    } else {
      fetchInitial();
    }
  };

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
      width: "30%",
      render: (_, record) => (
        <>
          {(record.tags || []).map(item => (
            <Tag key={item._id} color="blue" style={{ marginRight: 10 }}>
              {item.value}
            </Tag>
          ))}
        </>
      )
    },
    {
      key: "salary",
      dataIndex: "salary",
      title: "Mức lương"
    },
    {
      key: "time",
      title: "Thời gian",
      render: (_, record) => (
        <>
          <div>
            <i>Thời gian tạo:</i>{" "}
            {dayjs(record.createdAt).format("DD/MM/YYYY")}
          </div>
          <div>
            <i>Thời gian cập nhật:</i>{" "}
            {dayjs(record.updatedAt).format("DD/MM/YYYY")}
          </div>
        </>
      )
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Trạng thái",
      render: (_, record) =>
        record.status ? (
          <Tag color="green">Đang mở</Tag>
        ) : (
          <Tag color="red">Đang đóng</Tag>
        )
    },
    {
      key: "action",
      title: "Hành động",
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết job">
            <Button style={{ marginRight: 5 }}>
              <Link to={`/jobDetail/${record._id}`}>
                <EyeOutlined />
              </Link>
            </Button>
          </Tooltip>

          {dataCities.length > 0 && (
            <EditJob
              record={record}
              onReload={handleReload}
              dataCities={dataCities}
              dataTags={dataTags}
            />
          )}
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <Input.Search
          placeholder="Tìm kiếm job (name, tag, city, salary...)"
          allowClear
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />

        <Button type="primary">
          <Link to="createJob">
            <PlusOutlined /> Tạo mới công việc
          </Link>
        </Button>
      </div>

      <h2>Thông tin công việc</h2>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
    </>
  );
}

export default ManageJob;