"use client"
import Footer from "../../_components/Footer";
import RestaurantHeader from "../../_components/RestaurantsHeader";
import "./../style.css"
import AddFoodItem from "../../_components/AddFoodItem"
import FoodItemList from "../../_components/FoodItemList"
import { useState } from "react";


const Dashboard = ()=>{
    const [addItem,setAddItem] = useState(false);
    return (
        <div>
            <RestaurantHeader/>
            <div className="input-wrapper">
                <button className="button" style={{marginRight:"10px"}} onClick={()=>setAddItem(true)}>Add new food item</button>
                <button className="button" onClick={()=>setAddItem(false)}>Dashboard</button>
            </div>
            {
                addItem ? <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList/>
            }

            <Footer/>
        </div>
    )
}
export default Dashboard;