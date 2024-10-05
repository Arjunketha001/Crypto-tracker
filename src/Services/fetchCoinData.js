import axios from "axios";
import axiosInstance from "../Helpers/axiosInstance";

export async function fetchCoinData(page,currency='usd') {
    const perpage=10
    try{
        const response=await axiosInstance.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perpage}&page=${page}`);
        // console.log(response);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
    
}