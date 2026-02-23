import { Card } from "antd";
import { UsergroupAddOutlined, BlockOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { GetCompanyById } from "../../../components/services/companies";
import { getCookieValue } from "../../../components/helpers/cookie";
import { useEffect, useState } from "react";

function Company() {
    const id = getCookieValue("id");
    const [data, setData] = useState([]);

    const styleIconsCompany = { fontSize: 15, marginRight: 5 }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetCompanyById(id);
            if (result) {
                setData(result);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && (
                <Card title="Thông tin công ty" >
                    <div style={{marginBottom: 10}}>
                        <span style={styleIconsCompany}>
                            <UsergroupAddOutlined />
                        </span>
                        <span>Quy mô: <b>{data.quantityPeople} nhân viên</b></span>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <span style={styleIconsCompany}>
                            <BlockOutlined />
                        </span>
                        <span>Ngành nghề: <b>{data.description}</b></span>
                    </div>
                    <div style={{marginBottom: 5}}>
                        <span style={styleIconsCompany}>
                            <EnvironmentOutlined />
                        </span>
                        <span>Địa điểm: <b>{data.address}</b></span>
                    </div>
                </Card>
            )}
        </>
    )
}
export default Company;