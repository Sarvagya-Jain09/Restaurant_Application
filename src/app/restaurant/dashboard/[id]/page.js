"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditfoodItem = (props)=>{
    // console.log(props.params.id)
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [path,setPath] = useState("");
    const [Description,setDescription] = useState("");
    const [error,setError] = useState(false);
    const router = useRouter()

    useEffect(()=>{
        handLoadFoodItem();
    },[])

    const handLoadFoodItem = async ()=>{
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id)
        response = await response.json();
        if(response.success)
        {
            setName(response.result.name);
            setPrice(response.result.price);  
            setPath(response.result.img_path);  
            setDescription(response.result.Description);  
            setName(response.result.name);  
        }
    }

    const handleEditItem = async ()=>
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
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+props.params.id,{
            method:"PUT",
            body : JSON.stringify({name,price,img_path:path,Description})
        });
        response = await response.json();
        if(response.success)
        {
            alert("details updated successfully!")
            router.push("../dashboard")
        }
        else
        {
            alert("Error in updating details!")   
        }
    }

    return (
    <div className="container">
        <h2>Update Food Item</h2>
        <div className="input-wrapper">
            <input type="text" className="input-field" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder={name}/>
            {
                error && !name && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="number" className="input-field" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder={price}/>
            {
                error && !price && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" value={path} onChange={(e)=>{setPath(e.target.value)}} placeholder={path}/>
            {
                error && !path && <span className="Input-error">Invalid URL</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="textarea" className="input-field" value={Description} onChange={(e)=>{setDescription(e.target.value)}} placeholder={Description}/>
            {
                error && !Description && <span className="Input-error">Invalid Input</span>
            }
        </div>
        <div className="input-wrapper" style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <button className="button" style={{marginBottom:"10px"}} onClick={handleEditItem}>Update Item</button>
            <button className="button" onClick={()=>{router.push("../dashboard")}}>Cancel</button>
        </div>
        
    </div>
)}
export default EditfoodItem;