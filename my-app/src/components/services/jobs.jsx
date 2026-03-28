import { del, get, patch, post } from "../ultis"

export const GetAllJobs = async () => {
    const result = await get("api/job/all");
    return result;
}

export const GetAllJobs2 = async () => {
    const result = await get("api/job/all2");
    return result;
}

export const GetSearchJobs = async (params) => {
    const query = new URLSearchParams(params).toString();
    const result = await get(`api/job/search?${query}`);
    return result;
}

export const GetJobById = async (id) => {
    const result = await get(`api/job/${id}`);
    return result;
}

export const GetJobByCompanyId = async (id) => {
    const result = await get(`api/job/company/${id}`);
    return result;
}

export const SearchJob = async (id, keyword) => {
    const response = await get(`api/job/search/${id}?keyword=${keyword}`);
    return response;
}

export const CreateNewJob = async (data) => {
    const result = await post("api/job/create", data);
    return result;
}

export const EditInfoJob = async (id, data) => {
    const result = await patch(`api/job/edit/${id}`, data);
    return result;
}

export const DeleteInfoJob = async (id) => {
    const result = await del(`jobs/${id}`);
    return result;
}