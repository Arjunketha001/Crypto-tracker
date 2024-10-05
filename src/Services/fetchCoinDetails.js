import axios from "axios";
import axiosInstance from "../Helpers/axiosInstance";

export async function fetchCoinDetails(id) {
    const perpage=10
    try{
        const response=await axiosInstance.get(`/coins/${id}`);
        // console.log(response);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
    
}