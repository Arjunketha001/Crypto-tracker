import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../Services/fetchCoinDetails";
// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "react-query";
import parse from 'html-react-parser';
import store from "../Zustand/state";
import { Facebook } from "react-content-loader";
import CoinInfoContainer from "../Components/CoinInfo/CoinInfoContainer";

function CoinDetails(){
    const {coinId}=useParams()
    const {currency}=store()
    const {data,isLoading,isError,error}  =useQuery(["coins",coinId],()=>fetchCoinDetails(coinId),{
        // retry:2,
        // retryDelay:1000,
        cacheTime:1000*60*2,
        staleTime:1000*60*2,//for 2 minutes , the fetched data is considered "fresh."
    })
    if (isLoading){
        return <Facebook/> //facebook style loading
    }
    if (isError){
        return <div>Something Went Wrong .... {error.message}</div>
    }
    console.log(data)
    return(
        <>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 w-full flex flex-col items-center mt-6 md:mt-0 boder-r-2 border-gray-500">
                <img src={data?.image?.large}  alt={data?.name} className="h-52 mb-5"/>
                <h1 className="text-4xl font-bold mb-5 ">{data?.name}</h1>
                <p className="w-full px-6 py-4 text-justify">{parse(data?.description?.en)}</p>
                <div className="w-full flex flex-col md:flex-row md:justify-around">


                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold"> Rank</h2>
                        <span className="ml-3 text-xl"> {data?.market_cap_rank}</span>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="text-xl text-yellow-400 font-bold"> Price in  {currency}:</h2>
                        <span className="ml-3 text-xl"> {data?.market_data.current_price[currency]} </span>
                    </div>


                </div>
            </div>
            <div className="md:w-2/3 w-full ">
                <CoinInfoContainer id={coinId}/>
            </div>
        </div>

        
        
        </>
    )
}
export default CoinDetails;