'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/deliveryheader";
import { useRouter } from "next/navigation";

const deliveryPartner = ()=>{

    const [loginMobile,setLoginMobile] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const [password,setPassword] = useState("");
    const [c_password,setCPassword] = useState("");
    const [name,setName] = useState("");
    const [city,setCity] = useState("");
    const [contact,setContact] = useState("");
    const router = useRouter()

    useEffect(()=>{
        let delivery = localStorage.getItem('delivery') && JSON.parse(localStorage.getItem('delivery'))
        if(delivery)
        {
            router.push('deliverydashboard')
        }
    },[])
    const HandleSignUp = async () => {
        // console.log({ name, email, password, contact, city, Address });
        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
          method: "POST",
          body: JSON.stringify({ name, password, city, contact}),
        });
        response = await response.json();
        if (response.success) {
          alert("Sign Up successful!");
          const finalUser = response;
          delete finalUser.password;
          localStorage.setItem("delivery", JSON.stringify(finalUser));
          router.push('/deliverydashboard')
        }
        else{
            alert("SignUp failed!")
        }
      };


      
  const handleLogin = async () => {
    let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
      method: "POST",
      body: JSON.stringify({ loginMobile, loginPassword }),
    });
    response = await response.json();
    if (response.success) {
      alert("User logged in successful");
      let result = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push('/deliverydashboard')
    }
    else
    {
        alert("Enter a valid Mobile number and Password")
    }
  };
    return (
        <div>
            <DeliveryHeader/>
        <div className="auth-container">
            <div className="login-wrapper">
            <h2>Delivery Partner Login</h2>
                <div className="input-wrapper">
                    <input type="number" placeholder="Enter Your email" value={loginMobile} onChange={(e)=>{setLoginMobile(e.target.value)}} className="input-field"/>
                    {/* {
                        err && !email && <span className="Input-error">Enter valid email</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="enter password" value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}} className="input-field"/>
                    {/* {
                        err && !password && <span className="Input-error">Enter valid password</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin} >Login</button>
                </div>
            </div>
            <div className="signup-wrapper">
            <h2>Delivery Partner Signup</h2>
                <div className="input-wrapper">
                    <input type="number" placeholder="Enter contact number" className="input-field" 
                    value={contact} maxLength="10" minLength="10" onChange={(e)=>{setContact(e.target.value)}}
                    />
                    {/* {
                        inputerror && !contact && <span className="Input-error">Invalid Input</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Name" className="input-field" 
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                    />
                    {/* {
                        inputerror && !name && <span className="Input-error">Invalid Input</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="enter password" className="input-field" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    {/* {
                        inputerror && !password && <span className="Input-error">Invalid Input</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm password" className="input-field" 
                    value={c_password} onChange={(e)=>{setCPassword(e.target.value)}}
                    />
                    {/* {
                        passerror &&  <span className="Input-error">Password mismatch</span>
                    }
                    {
                        inputerror && !c_password && <span className="Input-error">Invalid Input</span>
                    } */}
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter City" className="input-field" 
                    value={city} onChange={(e)=>{setCity(e.target.value)}}
                    />
                    {/* {
                        inputerror && !city && <span className="Input-error">Invalid Input</span>
                    } */}
                </div>
                
                <div className="input-wrapper">
                    <button className="button" onClick={HandleSignUp} >Sign Up</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default deliveryPartner;