import axios from "axios";
import { Coingecko_api_url } from "./Constants";

const axiosInstance=axios.create({
    baseURL:Coingecko_api_url,
})
export default axiosInstance;