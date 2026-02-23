// ham tao cookie va expires cua cookie
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}


// ham lay gia tri cua cookie
export const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null; // Trả về null nếu không tìm thấy cookie
}


// ham doi gia tri cookie (tuong tu ham tao cookie nhung day chi la ghi de gtri moi len thoi)
export const updateCookie = () => {
    document.cookie = 'Email=test@gmail.com';
}

// ham xoa cookie
export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


// Hàm xóa toàn bộ cookie
export const clearAllCookies = () => {
    // Lấy danh sách tất cả cookie
    const cookies = document.cookie.split(";");

    // Lặp qua từng cookie và xóa nó
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

        // Xóa cookie bằng cách đặt ngày hết hạn về quá khứ
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

