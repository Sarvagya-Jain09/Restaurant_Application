'use client'
import DeliveryHeader from "../_components/deliveryheader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const deliveryDashboard = ()=>{
    const [myOrders,setMyOrders] = useState([])
    const router = useRouter()

    useEffect(()=>{
        getMyOrders()
    },[])
    const getMyOrders = async ()=>{
        let deliveryStorage = localStorage.getItem('delivery') && JSON.parse(localStorage.getItem('delivery'))
        // console.log(deliveryStorage)
        let response = await fetch('http://localhost:3000/api/deliverypartners/order/'+deliveryStorage.result._id)
        // console.log(response)
        // return false;
        response = await response.json();
        if(response.success)
        {
            setMyOrders(response.result)
        }
    }


    useEffect(()=>{
        let delivery = localStorage.getItem('delivery') && JSON.parse(localStorage.getItem('delivery'))
        if(!delivery)
        {
            router.push('/deliverypartner')
        }
    },[])
    
    return (
        <div>
            <DeliveryHeader/>
            <h2 style={{textAlign:"center"}}>My Orders List</h2>
            {
                myOrders && myOrders.map((item)=>(
                    <div className="restaurant-wrapper" style={{marginLeft:"auto",marginRight:"auto"}}>
                        <div className="name-wrapper">
                            <h3>{item.data.name}</h3>
                            <h5>{item.data.contact}</h5>
                        </div>
                        <div className="address-wrapper">
                            <div>Amount : {item.amount}</div>
                            <div>{item.data.Address} | Email : {item.data.email}</div> 
                            <div>Status : <select>
                                <option>Confirmed</option>
                                <option>Delivered</option>
                                <option>On the way</option>
                                <option>Failed to deliver</option>
                                </select></div> 
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default deliveryDashboard;