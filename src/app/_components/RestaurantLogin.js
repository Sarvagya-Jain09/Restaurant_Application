"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState(false);
    const router = useRouter();

    const handleLogin =async ()=>{
        if(!email || !password)
        {
            setErr(true)
            return false;   
        }
        else
        {
            setErr(false);
        }
        // console.log(email,pass)
        let response = await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email,password,login:true})
        });
        response = await response.json();
        console.log(response)
        if(response.success)
        {
            alert("Logged In succesful")
            let resultUser = response.data;
            delete resultUser.password
            localStorage.setItem("restaurantUser",JSON.stringify(resultUser))
            router.push("/restaurant/dashboard")
        }
        else
        {
            alert("Login Failed !! Invalid credentials")
        }
    }
    return(
        <>
            <h3>Login</h3>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter Your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-field"/>
                    {
                        err && !email && <span className="Input-error">Enter valid email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-field"/>
                    {
                        err && !password && <span className="Input-error">Enter valid password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}
export default RestaurantLogin;