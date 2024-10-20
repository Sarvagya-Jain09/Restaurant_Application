import { useState } from "react";

const AddFoodItem = (props)=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [Description,setDescription] = useState("");
    const [error,setError] = useState(false);

    const handleAddItem =async ()=>
    {
        // console.log(name,price,path,Description)
        if(!name||!price||!path||!Description)
        {
            setError(true);
            return false;
        }
        else
        {
            setError(false)
        }
        let resto_id;
        const restaurantUser = JSON.parse(localStorage.getItem("restaurantUser"))
        if(restaurantUser)
        {
            resto_id = restaurantUser._id    
        }
        // console.log(resto_id)
        let response = await fetch("http://localhost:3000/api/restaurant/foods",{
            method : "POST",
            body : JSON.stringify({name,price,img_path:path,Description,resto_id})
        })

        response = await response.json()
 
        if(response.success)
        {
            alert("Food Item Added")  
            props.setAddItem(false)  
        }
        else
        {
            alert("Error in adding food item!")
        }
    }

    return (
    <div className="container">
        <h2>Add Food Item</h2>
        <div className="input-wrapper">
            <input type="text" className="input-field" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter food name"/>
            {
                error && !name && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="number" className="input-field" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter food price"/>
            {
                error && !price && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" value={path} onChange={(e)=>{setPath(e.target.value)}} placeholder="Enter Image URL"/>
            {
                error && !path && <span className="Input-error">Invalid URL</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="textarea" className="input-field" value={Description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter food Description"/>
            {
                error && !Description && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper">
            <button className="button" onClick={handleAddItem}>Add Item</button>
        </div>
        
    </div>
)}
export default AddFoodItem;