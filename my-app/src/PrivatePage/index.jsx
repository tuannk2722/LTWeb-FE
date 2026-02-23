import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getCookieValue } from "../components/helpers/cookie";

function PrivatePages() {
    const token = getCookieValue("token");
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (token) {
            setIsLogin(!isLogin);
        }
    }, [])

    return (
        <>
            {isLogin && <Outlet />}
        </>
    )
}
export default PrivatePages;