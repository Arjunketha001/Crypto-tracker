import { useState } from "react"
import Home from "./Pages/Homepage"
import Navbar from "./Components/NavBar/NavBar"
import { CurrencyContext } from "./Context/CurrencyContext"
import Routing from "./Components/routing/Routing"

function App() {
  // const [currency,setcurrency]=useState('usd')
  
  return (
    <>
    
    
    {/* <CurrencyContext.Provider value={{currency,setcurrency}}> */}
      {/* <Home/> */}
    <Routing/>
    
    {/* </CurrencyContext.Provider> */}
    
    </>
  )
}

export default App
