import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetSearchJobs } from "../../components/services/jobs";
import { Tag } from "antd";
import ListJob from "../../components/ListJob";

function ListJobFound() {

    const [searchParams] = useSearchParams();

    const industrySearch = searchParams.get("keyword")?.trim() || "";
    const citySearch = searchParams.get("city")?.trim() || "";

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchApi = async () => {

            const response = await GetSearchJobs({
                keyword: industrySearch,
                city: citySearch
            });

            setData(response || []);
        };

        fetchApi();

    }, [industrySearch, citySearch]);

    return (
        <>
            <div style={{ fontSize: 30, margin: 20 }}>
                Kết quả tìm kiếm ({data.length}):

                {industrySearch && (
                    <Tag style={{ color: "blue", backgroundColor: "#ccc", marginLeft: 10 }}>
                        {industrySearch}
                    </Tag>
                )}

                {citySearch && (
                    <Tag style={{ color: "blue", backgroundColor: "#ccc", marginLeft: 10 }}>
                        {citySearch}
                    </Tag>
                )}
            </div>

            {data.length > 0 && (
                <ListJob data={data} />
            )}
        </>
    );
}

export default ListJobFound;