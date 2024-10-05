import { useState } from "react"
import Navbar from "../Components/NavBar/NavBar";
import Banner from "../Components/Banner/Banner";
import CoinTable from "../Components/CoinTable/CoinTable";

function Home() {
  const [currency,setcurrency]=useState('usd')
  
  return (
    <>
    
    <Banner/>
    <CoinTable />
    </>
  )
}

export default Home;