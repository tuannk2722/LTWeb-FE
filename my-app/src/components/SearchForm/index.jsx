import { useEffect, useState } from "react";
import { Flex, Tag, Col, Form, Input, Row, Select, Button } from "antd";
import { GetAllCities } from "../../components/services/cities";
import { GetAllTags } from "../../components/services/tags";
import { useNavigate } from "react-router-dom"

function SearchForm() {
  const [dataCities, setDataCities] = useState([]);
  const [dataTags, setDataTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resultCities = await GetAllCities();
        setDataCities(resultCities);
        const resultTags = await GetAllTags();
        setDataTags(resultTags);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    }
    fetchApi();
  }, [])

  const options = []
  if (dataCities) {
    for (let i = 0; i < dataCities.length; i++) {
      options.push({
        value: dataCities[i].value,
        label: dataCities[i].value
      })
    }
  }

  // Hàm tìm kiếm theo job tag
  const handleClick = (e) => {
    const industry = e.target.textContent;
    navigate(`/listJobFound?keyword=${industry}&city=`);
  }

  // Hàm tìm kiếm theo ô search
  const onFinish = (e) => {
    navigate(`/listJobFound?keyword=${e.keyword || ""}&city=${e.city || ""}`);
  }

  return (
    <>
      <Form
        onFinish={onFinish}
      >
        <Row gutter={[10, 5]}>
          <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
            <Form.Item
              name="keyword"
            >
              <Input placeholder="Vị trí tuyển dụng, tên công ty" style={{ height: 50, borderRadius: 20 }} />
            </Form.Item>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <Form.Item
              name="city"
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Địa điểm"
                allowClear
                options={options}
              />
            </Form.Item>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit" >Tìm Kiếm</Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="tagsList"
            >
              <Flex gap={4} wrap align="center">
                <span>Gợi ý:</span>
                {dataTags.map(item => (
                  <Tag.CheckableTag
                    key={item.key}
                    style={{ backgroundColor: "white" }}
                    onClick={handleClick}
                  >
                    {item.value}
                  </Tag.CheckableTag>
                ))}
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
export default SearchForm;