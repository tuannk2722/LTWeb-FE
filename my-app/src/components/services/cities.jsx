import { get } from "../ultis"

export const GetAllCities = async () => {
    const result = await get("api/city/all");
    return result;
}