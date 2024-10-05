import { useQuery } from "react-query";
import store from "../../Zustand/state";
import { useState } from "react";
import { fetchCoinHistoricData } from "../../Services/fetchHistoricData";
import { Facebook } from "react-content-loader";
import CoinInfo from "./CoinInfo";

function CoinInfoContainer({id}){
    const {currency}=store();
    const [days,setDays] = useState(7)
    const [interval,setCoinInterval] = useState('daily')
    // in this usequery 1st parameter array , any of the parameter changes --> retriggrer the api call
    const {data:historicData,isLoading,isError}=useQuery(['coinHistoricData',id,currency,days],
        ()=>fetchCoinHistoricData(id,interval,days,currency),{
            cacheTime:2*1000*60,
            staleTime:2*1000*60,
        }
    )

    if(isLoading){
        return <Facebook/>
    }

    if(isError){
        return <div>Something went wrong</div> 
    }



    return (
        <CoinInfo 
            historicData={historicData} 
            setDays={setDays} 
            setCoinInterval={setCoinInterval}
            days={days}
            currency={currency}
             />
    )
}
export default  CoinInfoContainer;