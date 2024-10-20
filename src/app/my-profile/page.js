'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const ProfilePage = ()=>{
    const [myOrders,setMyOrders] = useState([])

    useEffect(()=>{
        getMyOrders()
    },[])
    const getMyOrders = async ()=>{
        const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
        let response = await fetch('http://localhost:3000/api/order?id='+userStorage.data._id)
        response = await response.json();
        if(response.success)
        {
            setMyOrders(response.result)
        }
    }
    console.log(myOrders)
    return (
        <div>
            <CustomerHeader/>
            {
                myOrders && myOrders.map((item)=>(
                    <div className="restaurant-wrapper" style={{marginLeft:"auto",marginRight:"auto"}}>
                        <div className="name-wrapper">
                            <h3>{item.data.name}</h3>
                            <h5>{item.data.contact}</h5>
                        </div>
                        <div className="address-wrapper">
                            <div>Amount : {item.amount}</div>
                            <div>Status : {item.status}</div>
                            <div>{item.data.Address} | Email : {item.data.email}</div>  
                        </div>
                    </div>
                ))
            }
            <Footer/>
        </div>
    )
}

export default ProfilePage;