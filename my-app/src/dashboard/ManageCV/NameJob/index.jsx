import { useEffect, useState } from "react";
import { GetJobById } from "../../../components/services/jobs";

function NameJob(props) {
    const { record } = props;
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchApi = async () => {
            const job = await GetJobById(record.jobId._id);
            if (job) {
                setData(job);
            } else {
                setError(true);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            {error ? (
                <b style={{color: "red"}}>Job đã bị xóa</b>
            ) : (
                <b>{data.name}</b>
            )}
        </>
    )
}
export default NameJob;