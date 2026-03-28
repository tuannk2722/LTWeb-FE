const DO_MAIN = "http://localhost:5000/";

const handleResponse = async (response) => {
    const result = await response.json();

    if (!response.ok) {
        throw {
            response: {
                data: result
            }
        };
    }

    return result;
};

export const get = async (path) => {
    const response = await fetch(DO_MAIN + path, {
        credentials: "include"
    });

    return handleResponse(response);
};

export const post = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return handleResponse(response);
};

export const patch = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "PATCH",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return handleResponse(response);
};

export const del = async (path) => {
    const response = await fetch(DO_MAIN + path, {
        method: "DELETE",
        credentials: "include" // cần thêm
    });

    return handleResponse(response);
};