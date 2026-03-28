import { Card } from "antd";
import { GetCompanyById } from "../../../components/services/companies";
import { getCookieValue } from "../../../components/helpers/cookie";
import { useEffect, useState } from "react";

function Company() {
    const id = getCookieValue("id");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await GetCompanyById(id);
                setData(result);

            } catch(e) {
                console.error(e);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && (
                <Card title="Thông tin công ty" >
                    <div style={{marginBottom: 10}}>
                        <span>Tên: <b>{data.companyName}</b></span>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <span>Quy mô: <b>{data.quantityPeople} nhân viên</b></span>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <span>Địa điểm: <b>{data.address}</b></span>
                    </div>
                </Card>
            )}
        </>
    )
}
export default Company;