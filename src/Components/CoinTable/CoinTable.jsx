import { useContext, useEffect, useState } from "react";
import { fetchCoinData } from "../../Services/fetchCoinData";
import { useQuery } from "react-query";
import { CurrencyContext } from "../../Context/CurrencyContext";
import store from "../../Zustand/state";
import { useNavigate } from "react-router-dom";

function CoinTable( ){

    const navigate=useNavigate()
    function HandelRedirect(id){
        navigate(`/details/${id}`)

    }


    // const {currency}=useContext(CurrencyContext)
    const {currency}=store();
    const [page,setPage]=useState(1);
    //coins--> name of the query page--> argument u want to pass the callback
    // 2nd argument callback we want to trigger when api call happens
    // 3rd argument is configuration object
    
    const {data,isLoading,isError,error}  =useQuery(["coins",page,currency],()=>fetchCoinData(page,currency),{
        // retry:2,
        // retryDelay:1000,
        cacheTime:1000*60*2,
        staleTime:1000*60*2,//for 2 minutes , the fetched data is considered "fresh."
    })
    // useEffect(()=>{
    //     console.log(data)
    // },[data]);

    
    if(isError){
        return <div>Error: {error.message}</div>
    }
    
    return (
        <>
        
        {/* <button onClick={()=>{setPage(page+1)}}>Click {page} </button> */}
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center" >
                <div className="basis-[35%]">
                    Coin
                </div>
                <div className="basis-[25%]">
                    Price in {currency}
                </div>
                <div className="basis-[20%]">
                    24h Change
                </div>
                <div className="basis-[20%]">
                    Market Cap
                </div>
            </div>

            <div className="flex flex-col w-[80vw] mx-auto">
                {isLoading && <div>Loading....</div>}
                {data && data.map((coin)=>{
                    return (
                        <div onClick={()=>HandelRedirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer">
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="3xl">{coin.name}</div>
                                    <div className="xl">{coin.symbol}</div>

                                </div>
                                </div>

                                <div className="basis-[25%]">
                                    {coin.current_price}
                                </div>
                                <div className="basis-[20%]">
                                    {coin.price_change_24h}
                                </div>
                                <div className="basis-[20%]">
                                    {coin.market_cap}
                                </div>

                            
                            
                        </div>
                    )
                }
                )}
            </div>

            <div className="flex gap-4 justify-center items-center">
                <button 
                    disabled={page===1}
                    onClick={()=>setPage(page-1)}
                    className="btn btn-primary btn-wide text-white text-2xl"> Prev</button>
                <button 
                    onClick={()=>setPage(page+1)}
                    className="btn btn-secondary btn-wide text-white text-2xl"> Next</button>

            </div>

        </div>

        </>
    )
}
export default CoinTable;