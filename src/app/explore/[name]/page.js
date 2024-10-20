"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../../_components/CustomerHeader";
import Footer from "../../_components/Footer";

const Page = (props) => {
  const name = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [fooditems, setFooditems] = useState();
  const [cartData, setCartData] = useState();
  const [removedItem,setRemovedItem] = useState();

  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  //have to manage cartStoarage when there is only 1 element in localstorage, 
  //therefore cartstorage is an object and not an array
  const [cartIds, setCartIds] = useState(cartStorage ? () => 
    cartStorage.map((item) => {
      return item._id;
    })
   : []);
  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const RemoveCartItem = (id) =>{
    setRemovedItem(id);
    let locatItemIds = cartIds.filter(item => item!=id)
    setCartIds(locatItemIds)
    setCartData()
  }

  const AddToCart = (item) => {
    setCartData(item);
    setRemovedItem()
    let locatCartIds = cartIds
    locatCartIds.push(item._id)
    setCartIds(locatCartIds)
  };

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFooditems(response.foodItems);
    }
  };
  return (
    <diiv>
      <CustomerHeader cartData={cartData} removedItem={removedItem}/>
      <div className="restaurant-page-banner">
        <h1 style={{ textAlign: "center" }}>{decodeURI(name)}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Address : {restaurantDetails?.Address}</h4>
        <h4>City : {restaurantDetails?.city}</h4>
        <h4>Contact : {restaurantDetails?.contact}</h4>
        <h4>Email : {restaurantDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {fooditems?.length > 0 ? (
          fooditems?.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div>
                <div>{item.name}</div>
                <div className="description">{item.Description}</div>
                <div>Price : {item.price} Rs.</div>
                {cartIds?.includes(item._id) ? (
                  <button onClick={()=>RemoveCartItem(item._id)}>Remove from cart</button>
                ) : (
                  <button onClick={() => AddToCart(item)}>Add to cart</button>
                )} 
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Item Available</h1>
        )}
      </div>
      <Footer />
    </diiv>
  );
};

export default Page;
