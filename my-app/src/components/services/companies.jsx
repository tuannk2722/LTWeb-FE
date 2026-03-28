import { get, patch, post } from "../ultis"

export const GetAllCompany = async () => {
    const result = await get(`api/company/all`);
    return result;
}

export const GetCompanyById = async (id) => {
    const result = await get(`api/company/${id}`)
    return result;
}

export const  CheckExist = async (email, password) => {
    const result = await get(`companies?email=${email}&password=${password}`)
    return result;
}

export const LoginUser = async (data) => {
    const response = await post('api/users/login', data);
    return response;
}

export const CreateUser = async (data) => {
    const response = await post('api/users/register', data);
    return response;
}

export const CreateInfoCompany = async (data) => {
    const result = await post(`companies`, data);
    return result;
}

export const EditInfoCompany = async (id, data) => {
    const result = await patch(`api/company/update/${id}`, data);
    return result;
}