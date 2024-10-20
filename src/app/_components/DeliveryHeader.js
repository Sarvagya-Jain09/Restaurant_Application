import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = (props)=>{
    // useEffect(()=>{
    //     if(props.removedItem)
    //     {
    //         let localCartItem = cartItem.filter((item) => {
    //             return item._id!=props.removedItem
    //         });
    //         setCartItem(localCartItem)
    //         localStorage.setItem('cart',JSON.stringify(cartItem));
    //         setCartNumber(cartNumber-1)
    //         if(localCartItem.length===0)
    //         {
    //             localStorage.removeItem('cart');    
    //         }    

    //     }
    // },[props.removedItem])

    // const handleLogout = () =>{
    //     localStorage.removeItem('user')
    //     setUser(undefined)
    //     router.push('/user-auth')
    // }
    return (
        <div className="header-wrapper">
            <div className="logo" style={{display:"flex"}}>
                <img style={{width:100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GVif7UfMcNVKpufdqt6GwX0j7hpxexSWmg&s"/> 
                <h1>BitExpress!!</h1>
            </div>

            <ul style={{marginTop:"30px"}}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {/* {user ? <>
                    <li>
                        <Link href="/my-profile">Welcome {user?.data?.name}</Link>
                    </li>
                    <li>
                        <button onClick={()=>handleLogout()}>Logout</button>
                    </li>
                </> :  */}
                <li>
                    <Link href="/deliverypartner">Login/signup</Link>
                </li>
                <li>
                    <Link href="/restaurant">Serve as a Restaurant?</Link>
                </li>
            </ul>
        </div>
    )
}
export default DeliveryHeader;