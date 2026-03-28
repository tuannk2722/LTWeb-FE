import { Card } from "antd";
import { useEffect, useState } from "react";
import { GetCVByIdCompany } from "../../../components/services/cv";
import { getCookieValue } from "../../../components/helpers/cookie";

function CV() {
    const id = getCookieValue("id");
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetCVByIdCompany(id);
            if (result.cvs.length > 0) {
                let quantity= {
                    total: 0,
                    readed: 0,
                    unread: 0
                }
                quantity.total = result.cvs.length;
                result.cvs.forEach(item => {
                    item.statusRead ? quantity.readed++ : quantity.unread++;
                })
                setData(quantity);
            }
        }
        fetchApi();
    }, [])


    return (
        <>
            {data && (
                <Card title="CV">
                    <div style={{marginBottom: 10}}>
                        <span>Số lượng CV: <b>{data.total}</b></span>
                    </div>
                    <div style={{marginBottom: 10}}> 
                        <span>Số lượng CV đã đọc: <b>{data.readed}</b></span>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <span>Số lượng CV chưa đọc: <b>{data.unread}</b></span>
                    </div>
                </Card>
            )}
        </>
    )
}
export default CV;