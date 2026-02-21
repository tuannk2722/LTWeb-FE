import { get, patch, post } from "../ultis"

export const GetAllCompany = async () => {
    const result = await get(`companies`)
    return result;
}

export const GetCompanyById = async (id) => {
    const result = await get(`companies/${id}`)
    return result;
}

export const  CheckExist = async (email, password) => {
    const result = await get(`companies?email=${email}&password=${password}`)
    return result;
}

export const CheckExistValue = async (key, value) => {
    const result = await get(`companies?${key}=${value}`);
    return result;
}

export const CreateInfoCompany = async (data) => {
    const result = await post(`companies`, data);
    return result;
}

export const EditInfoCompany = async (id, data) => {
    const result = await patch(`companies/${id}`, data);
    return result;
}