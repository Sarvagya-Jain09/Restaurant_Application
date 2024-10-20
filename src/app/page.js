"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../app/_components/CustomerHeader"
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations,setLocations] = useState()
  const [selectedLoc,setSelectedLoc] = useState()
  const [showloclist,setShowLocList] = useState(false)
  const [restaurants,setRestaurants] = useState()
  const router = useRouter()


  useEffect(()=>{
    loadLocations();
    loadRestaurants();
  },[])
  
  const loadLocations = async ()=>{
    let response = await fetch("http://localhost:3000/api/customer/locations")
    response = await response.json()
    if(response.success)
      {
        setLocations(response.result)
      }
  }
  const loadRestaurants = async (params)=>{
    let url = "http://localhost:3000/api/customer";
    if(params?.location)
    {
      url = url+"?location="+params.location
    }    
    else if(params?.restaurant)
    {
      url = url+"?restaurant="+params.restaurant
    }
    let response = await fetch(url)
    response = await response.json()
    if(response.success)
      {
        setRestaurants(response.result)
      }
  }

  const handleListItem=  (item)=>{
    setSelectedLoc(item)
    setShowLocList(false)
    loadRestaurants({location:item})
  }

  return (
    <main>
      <CustomerHeader/>
      <div className="main-page-banner">
      <h1 style={{textAlign:"center"}}>Food delivery App</h1>
      <div className="input-wrap">
        <input type="text" className="select-input" onClick={()=>setShowLocList(true)} value={selectedLoc} placeholder="Select Place"/>
        <ul className="location-list">
          {
              showloclist && locations && locations.map((item)=>(
              <li onClick={()=>handleListItem(item)}>{item}</li>
            ))
          }
        </ul>
        <input type="text" className="search-input" 
        onChange={(e) => loadRestaurants({restaurant : e.target.value})}
        placeholder="Enter food or Restaurant name"/>
      </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants && restaurants.map((item) => (
            <div className="restaurant-wrapper" onClick={()=>{router.push("/explore/"+item.name+'?id='+item._id)}}>
              <div className="name-wrapper">
                <h3>{item.name}</h3>
                <h5>{item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city}</div>
                <div>{item.Address} | Email : {item.email}</div>  
              </div>
            </div>  
          ))
        }
      </div>
      <Footer/>
    </main>
  );
}
