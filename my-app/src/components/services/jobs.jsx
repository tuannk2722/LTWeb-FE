import { del, get, patch, post } from "../ultis"

export const GetAllJobs = async () => {
    const result = await get(`jobs`)
    return result;
}

export const GetJob = async (key, value) => {
    const result = await get(`jobs?${key}=${value}`);
    return result;
}

export const GetJobById = async (id) => {
    const result = await get(`jobs/${id}`);
    return result;
}

export const GetJobByCompanyId = async (id) => {
    const result = await get(`jobs?idCompany=${id}`);
    return result;
}

export const CreateNewJob = async (data) => {
    const result = await post("jobs", data);
    return result;
}

export const EditInfoJob = async (id, data) => {
    const result = await patch(`jobs/${id}`, data);
    return result;
}

export const DeleteInfoJob = async (id) => {
    const result = await del(`jobs/${id}`);
    return result;
}