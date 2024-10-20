import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList =()=>{
    const [items,setItems] = useState();
    const router = useRouter()

    useEffect(()=>{
        fetchFoodItems();
    },[])

    const fetchFoodItems = async ()=>{
        const restaurantData = localStorage.getItem('restaurantUser') && JSON.parse(localStorage.getItem('restaurantUser'))
        let resto_id=restaurantData._id
        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+resto_id)
        response = await response.json()

        if(response.success)
        {
            setItems(response.result)
        }
        else
        {
            alert("NO food items available")
        }
    }
    const deleteFoodItem = async (id)=>{
        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+id,{
            method:'delete'
        });
        console.log(response)
        response = await response.json();
        if(response.success)
        {
            fetchFoodItems();    
        }
        else
        {
            alert("No food item deleted")
        }
    }
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <td>S. NO.</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        items && items.map((item,key)=>(<tr key={key}>
                            <td>{key+1}</td>
                            <td><img src={item.img_path}/></td>
                            <td>{item.name}</td>
                            <td>{item.Description}</td>
                            <td>{item.price}</td>
                            <td><button onClick={()=>deleteFoodItem(item._id)}>Delete</button>
                            <button onClick={()=>{router.push("dashboard/"+item._id)}}>Edit</button></td>
                        </tr>)              
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}
export default FoodItemList;