'use client';
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const RestaurantHeader = ()=>{
    const [details,setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname()

    useEffect(()=>{
        let data = localStorage.getItem("restaurantUser");
        if(!data)
        {
            router.push("/restaurant")
        }
        else if(data && pathName == "/restaurant")
        {
            router.push("/restaurant/dashboard")
        }
        else{
            setDetails(JSON.parse(data))
        }
    },[])

    const handleLogout =()=>{
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant")
    }
    return (
        <div className="header-wrapper">
            <div className="logo" style={{display:"flex",justifyContent:"row"}}>
                <div>
                <img style={{width:100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GVif7UfMcNVKpufdqt6GwX0j7hpxexSWmg&s"/>
                </div>
                <div>
                    <h2>BitExpress!!</h2>
                </div>
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {
                    (details && details.name) ?  <>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    <li><Link href="/">Profile</Link></li>
                    </>
                    :  <li><Link href="/">Login/SignUp</Link></li>
                }
            </ul>
            <Footer/>
        </div>
    )
}

export default RestaurantHeader;