import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props)=>{

    const CartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))
    const UserStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    const [user,setUser] = useState(UserStorage)
    const [cartNumber,setCartNumber] = useState(CartStorage?.length);
    const [cartItem,setCartItem] = useState(CartStorage)
    const router = useRouter()

    useEffect(()=>{
        if(props.removeCartData)
        {
            setCartNumber(0)
            setCartItem([])
            localStorage.removeItem('cart')
        }
    },[props.removeCartData])
    
    
    useEffect(()=>{
        if(props.cartData)
        {
            if(cartNumber)
            {
                if(props.cartData.resto_id != cartItem[0].resto_id )
                {
                    setCartNumber(1);
                    localStorage.setItem('cart',JSON.stringify(props.cartData))
                    setCartItem([props.cartData])
                }
                else
                {
                    setCartNumber(cartNumber+1)
                    let localCartItem = cartItem
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
                    setCartItem(localCartItem)
                    localStorage.setItem('cart',JSON.stringify(localCartItem))
                }
            }
            else
            {
                setCartNumber(1);
                localStorage.setItem('cart',JSON.stringify(props.cartData))
                setCartItem([props.cartData])
            }    
        }

    },[props.cartData])

    useEffect(()=>{
        if(props.removedItem)
        {
            let localCartItem = cartItem.filter((item) => {
                return item._id!=props.removedItem
            });
            setCartItem(localCartItem)
            localStorage.setItem('cart',JSON.stringify(cartItem));
            setCartNumber(cartNumber-1)
            if(localCartItem.length===0)
            {
                localStorage.removeItem('cart');    
            }    

        }
    },[props.removedItem])

    const handleLogout = () =>{
        localStorage.removeItem('user')
        setUser(undefined)
        router.push('/user-auth')
    }
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
                {user ? <>
                    <li>
                        <Link href="/my-profile">Welcome {user?.data?.name}</Link>
                    </li>
                    <li>
                        <button onClick={()=>handleLogout()}>Logout</button>
                    </li>
                </> : 
                <>
                    <li>
                        <Link href="/user-auth">Login</Link>
                    </li>
                    <li>
                        <Link href="/user-auth">SignUp</Link>
                    </li>
                </>}
                <li>
                    <Link href={cartNumber?"/cart" : "/"} >Cart ({cartNumber?cartNumber:0})</Link>
                </li>
                <li>
                    <Link href="/restaurant">Serve as a Restaurant?</Link>
                </li>
                <li>
                    <Link href="/deliverypartner">Delivery Partner?</Link>
                </li>
            </ul>
        </div>
    )
}
export default CustomerHeader;