"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantsHeader";
import "./style.css"
import Footer from "../_components/Footer";

const Restaurant = ()=> {
    const [haveAccount,sethaveAccount] = useState(true);
    return (
        <>
            <div className="container">
                <RestaurantHeader/>
                <h1>Restaurants</h1>
                {haveAccount ? <RestaurantLogin/> : <RestaurantSignup/>}
                <div>
                <button className="button-link" onClick={()=> sethaveAccount(!haveAccount)}>
                    {haveAccount?  "Do not have an account? Sign Up ": "Already hae an Account? Login" }</button>       
                </div> 
                <Footer/>
            </div>
        </>
    );
}

export default Restaurant;