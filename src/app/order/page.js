"use client";
import { useEffect,useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(null);
    const [cartStorage, setCartStorage] = useState(null);
    const [total, setTotal] = useState(0);
    const [removeCartData,setRemoveCartData] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setUserStorage(JSON.parse(localStorage.getItem("user")));
        setCartStorage(JSON.parse(localStorage.getItem("cart")));
    }, []);

    useEffect(() => {
        if (cartStorage) {
            const calculateTotal = () => {
                return cartStorage.reduce((sum, item) => sum + item.price, 0);
            };
            setTotal(calculateTotal());
        }
    }, [cartStorage]);

  const onderNow = async () => {
    let user_Id = userStorage.data._id
    let user_city = userStorage.data.city
    let resto_Id = cartStorage[0].resto_id;
    let deliveryBoyResponse = await fetch("http://localhost:3000/api/deliverypartners/"+user_city)
    deliveryBoyResponse = await deliveryBoyResponse.json()
    let delivery_ids = deliveryBoyResponse.result.map((item) => item._id)
    let deliveryBoy_Id = delivery_ids[Math.floor(Math.random()*delivery_ids.length)];
    if(!deliveryBoy_Id)
    {
      alert("No delivery partner available!")
      return false
    }
    let Amount = total + (5 * total) / 100 + 50;
    let foodItemIds = cartStorage.map((item) => item._id).toString();
    let status = 'confirm'

    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_Id,resto_Id,deliveryBoy_Id,foodItemIds,Amount,status})
    });
    response = await response.json();
    if (response.success) {
      alert("Order confirmed!");
      setRemoveCartData(true);
      router.push('my-profile')

    } else {
      alert("Order Failed");
    }
  };

  return (
    <diiv>
      <CustomerHeader removeCartData = {removeCartData}/>
      <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
        Order Summary
      </h2>
      <div className="total-wrapper">
        <h3 style={{ textDecoration: "underline" }}>User Details</h3>

        <div className="row">
          <div>Name :</div>
          <div>{userStorage?.data?.name}</div>
        </div>
        <div className="row">
          <div>Contact Number :</div>
          <div>{userStorage?.data?.contact}</div>
        </div>
        <div className="row break">
          <div>Address :</div>
          <div>{userStorage?.data?.Address}</div>
        </div>

        <h3 style={{ textDecoration: "underline" }}>Bill</h3>
        <div className="row">
          <div>Total food charges :</div>
          <div>{total}</div>
        </div>
        <div className="row">
          <div>Tax :</div>
          <div>{(5 * total) / 100}</div>
        </div>
        <div className="row break">
          <div>Delivery Fee :</div>
          <div>50</div>
        </div>
        <div className="row" style={{ paddingTop: "5px" }}>
          <div>Total Paybable amount :</div>
          <div>{total + (5 * total) / 100 + 50}</div>
        </div>

        <h3 style={{ textDecoration: "underline" }}>Payment Method</h3>
        <div className="row">
          <div>Cash on Delivery :</div>
          <div>{total + (5 * total) / 100 + 50}</div>
        </div>

        <div>
          <button onClick={()=>onderNow()}>Confirm Order Now!</button>
        </div>
      </div>
      <Footer />
    </diiv>
  );
};
export default Page;
