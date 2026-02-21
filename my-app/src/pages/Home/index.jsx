import CompanyList from "../../components/CompanyList";
import SearchForm from "../../components/SearchForm";
import bg from "../../image/bg.jpg";

function Home() {

    return (
        <>
            <div style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 150px"
            }}>
                <div className="home__title" style={{ textAlign: "center" }}>
                    <h2>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc</h2>
                    <h3>Tiếp cận 60.000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam</h3>
                </div>
                <SearchForm />
            </div>

            <div style={{margin: 50}}>
                <CompanyList />
            </div>
        </>
    )
}
export default Home;