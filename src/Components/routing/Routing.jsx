import { Route, Routes } from "react-router-dom";
// import Home from "../../Pages/Homepage";
// import CoinDetails from "../../Pages/CoinDetails";
import Mainlayout from "../../Pages/Layout";
import { lazy, Suspense } from "react";

// this is to lazy load the unseen pages by users. but this is not complete yet. Loading time--> react dont know what to render
// to tackle this we use suspense
import { Facebook } from 'react-content-loader'
import { ErrorBoundary } from "react-error-boundary";
import CustomErrorBoundary from "../ErrorBoundary/errorBoundary";

const MyFacebookLoader = () => <Facebook />

const Home=lazy(()=>import('../../Pages/Homepage'));
const CoinDetails=lazy(()=>import('../../Pages/CoinDetails'))

function Routing(){
    return(
        <CustomErrorBoundary>
            <Routes>
                <Route path='/' element={<Mainlayout/>}>
                    {/* index means entry  page of this layout, after mainlayout is rendered
                    and it doent have anything beyond it it searches for index in further pages */}
                        <Route index element={
                            <Suspense fallback={<div>Loading....</div>}>
                                <Home/>
                            </Suspense>
                            }/>
                        <Route path="/details/:coinId" element={
                            <Suspense fallback={MyFacebookLoader()}>
                                <CoinDetails/>
                            </Suspense>
                            
                            }/> 
                                        {/* :coinId is variable part  */}
                                    
                </Route>
            </Routes>
        </CustomErrorBoundary>
        
        
    )

}
export default Routing;