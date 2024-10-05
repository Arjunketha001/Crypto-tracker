// shared ui ---> in our case its navbar

import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";


function Mainlayout(){
    return (
        <>
        <Navbar/>
        {/* metion all the shared components before outlet */}
        <Outlet/>
        {/* actual page which will be rendered along with navbar  */}
        </>
    )

}
export default Mainlayout;