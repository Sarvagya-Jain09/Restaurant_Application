'use client'
import { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer' 
import UserSignUp from '../_components/UserSignUp'
import UserLogin from '../_components/UserLogin'


const userAuth = (props) =>{
    const [loggedIn,setLoggedIn] = useState(true)
    console.log("order flag", props)
    return (
        <div>
            <CustomerHeader/>
            <div className='container'>
                <h2>{loggedIn?'User Login' : 'User SignUp'}</h2>
                {
                    loggedIn ? <UserLogin redirect={props.searchParams}/>:<UserSignUp redirect={props.searchParams}/>
                }    
                <button className="button-link" onClick={()=>setLoggedIn(!loggedIn)}>
                    {loggedIn? "Do not have an account?" : "Already have an account?"}
                </button> 
            </div>
            <Footer/>
        </div>
    )
}
export default userAuth;