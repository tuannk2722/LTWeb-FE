import { Card } from "antd";
import { useEffect, useState } from "react";
import { getCookieValue } from "../../../components/helpers/cookie";
import { GetJobByCompanyId } from "../../../components/services/jobs";

function Jobs() {
    const id = getCookieValue("id");
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await GetJobByCompanyId(id);
            if (result) {
                let quantity= {
                    total: 0,
                    jobOn: 0,
                    jobOff: 0
                }
                quantity.total = result.length;
                result.forEach(item => {
                    item.status ? quantity.jobOn++ : quantity.jobOff++;
                })
                setData(quantity);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {data && (
                <Card title="Job">
                    <div style={{marginBottom: 10}}>
                        <span>Số lượng công việc: <b>{data.total}</b></span>
                    </div>
                    <div style={{marginBottom: 10}}> 
                        <span>Số lượng job đang tuyển: <b>{data.jobOn}</b></span>
                    </div>
                    <div style={{marginBottom: 10}}>
                        <span>Số lượng job đang tắt: <b>{data.jobOff}</b></span>
                    </div>
                </Card>
            )}
        </>
    )
}
export default Jobs;