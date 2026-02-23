const DO_MAIN = "http://localhost:3001/";

export const get = async (path) => {
    const response = await fetch(DO_MAIN + path);
    const result = await response.json();
    return result;
}

export const post = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export const patch = async (path, data) => {
    const response = await fetch(DO_MAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export const del = async (path) => {
    const response = await fetch(DO_MAIN + path, {method: "DELETE"});
    const result = await response.json();
    return result;
}