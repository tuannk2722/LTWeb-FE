import { get } from "../ultis"

export const GetAllTags = async () => {
    const result = await get("api/tag/all");
    return result;
}