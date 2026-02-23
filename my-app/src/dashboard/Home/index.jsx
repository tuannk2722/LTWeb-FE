import { Col, Row } from "antd";
import Company from "./Company";
import Jobs from "./Jobs";
import CV from "./CV";

function HomeAdmin() {

    return (
        <>
            <h2>Tổng quan</h2>
            <Row gutter={[20, 20]}>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Company />
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Jobs />
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <CV />
                </Col>
            </Row>
        </>
    )
}
export default HomeAdmin;