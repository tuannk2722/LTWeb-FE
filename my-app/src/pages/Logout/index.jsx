import { useNavigate } from "react-router-dom";
import { clearAllCookies } from "../../components/helpers/cookie";
import { useEffect } from "react";

function Logout() {
    const navigate = useNavigate();
    clearAllCookies();

    useEffect(() => {
        navigate("/login");
    }, [])

    return (
        <>
        </>
    )
}
export default Logout;