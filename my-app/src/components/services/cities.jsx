import { get } from "../ultis"

export const GetAllCities = async () => {
    const result = await get("cities");
    return result;
}