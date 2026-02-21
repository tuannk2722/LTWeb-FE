import { get } from "../ultis"

export const GetAllTags = async () => {
    const result = await get("tags");
    return result;
}