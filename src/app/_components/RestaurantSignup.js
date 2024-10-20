import { useRouter } from "next/navigation";
import { useState } from "react";
// import { POST } from "../api/restaurant/route";

const RestaurantSignup = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [c_password,setCPassword] = useState("");
    const [name,setName] = useState("");
    const [city,setCity] = useState("");
    const [Address,setAddress] = useState("");
    const [contact,setContact] = useState("");
    const [passerror,setPasserror] = useState(false)
    const [inputerror,setInputerror] = useState(false)
    const router = useRouter()

    const handleSignup = async ()=>{
        // console.log({email,password,c_password,name,city,Address,contact})
        if(c_password!==password)
        {
            setPasserror(true);
            return false;
        }
        else{
            setPasserror(false);
        }
        if(!email || !password || !name || !city || !Address || !contact || !c_password)
        {
            setInputerror(true) 
            return false;
        }
        else{
            setInputerror(false)
        }
        let response = await fetch("http://localhost:3000/api/restaurant",{
            method: "POST",
            body : JSON.stringify({email,password,name,city,Address,contact})
        })
        response = await response.json();
        if(response.success)
        {
            alert("Restaurant Registered successfully")
            const resultUser = response
            delete resultUser.data.password;
            localStorage.setItem("restaurantUser",JSON.stringify(resultUser))
            router.push("/restaurant/dashboard")
        }
    }

    return(
        <>
            <h3>Sign Up </h3>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter Your email" className="input-field" 
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    {
                        inputerror && !email && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="enter password" className="input-field" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    {
                        inputerror && !password && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm password" className="input-field" 
                    value={c_password} onChange={(e)=>{setCPassword(e.target.value)}}
                    />
                    {
                        passerror &&  <span className="Input-error">Password mismatch</span>
                    }
                    {
                        inputerror && !c_password && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Restaurant Name" className="input-field" 
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                    />
                    {
                        inputerror && !name && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter City" className="input-field" 
                    value={city} onChange={(e)=>{setCity(e.target.value)}}
                    />
                    {
                        inputerror && !city && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Full Address" className="input-field" 
                    value={Address} onChange={(e)=>{setAddress(e.target.value)}}
                    />
                    {
                        inputerror && !Address && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="number" placeholder="Enter contact number" className="input-field" 
                    value={contact} maxLength="10" minLength="10" onChange={(e)=>{setContact(e.target.value)}}
                    />
                    {
                        inputerror && !contact && <span className="Input-error">Invalid Input</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </>
    )
}
export default RestaurantSignup;