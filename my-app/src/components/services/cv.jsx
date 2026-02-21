import { del, get, patch, post } from "../ultis"

export const CreateCV = async (data) => {
    const result = await post("cv", data)
    return result;
}

export const GetCVById = async (id) => {
    const result = await get(`cv/${id}`);
    return result;
}

export const GetCVByIdJob = async (id) => {
    const result = await get(`cv?idJob=${id}`);
    return result;
}

export const GetCVByIdCompany = async (id) => {
    const result = await get(`cv?idCompany=${id}`);
    return result;
}

export const DeleteCVById = async (id) => {
    const result = await del(`cv/${id}`);
    return result;
}

export const ChangeStatusRead = async (id, data) => {
    const result =  await patch(`cv/${id}`, data);
    return result;
}