import { del, get, patch, post } from "../ultis"

export const CreateCV = async (data) => {
    const result = await post("api/cv/create", data)
    return result;
}

export const GetCVById = async (id) => {
    const result = await get(`api/cv/detail/${id}`);
    return result;
}

export const SearchCV = async (companyId, value) => {
    const result = await get(`api/cv/search/${companyId}?keyword=${value}`);
    return result;
}

export const GetCVByIdCompany = async (id) => {
    const result = await get(`api/cv/${id}`);
    return result;
}

export const DeleteCVById = async (id) => {
    const result = await del(`api/cv/delete/${id}`);
    return result;
}

export const ChangeStatusRead = async (id, data) => {
    const result =  await patch(`api/cv/update/${id}`, data);
    return result;
}