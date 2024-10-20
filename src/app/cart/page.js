"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const cartPage = () => {
  const router = useRouter();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const calculateTotal = () => {
    if (!cartStorage) {
      return 0;
    } else {
      if (cartStorage.length == 1) {
        return cartStorage[0].price;
      } else {
        let sum = 0;
        cartStorage.map((item) => {
          sum = sum + item.price;
        });
        return sum;
      }
    }
  };
  // console.log(cartStorage[0])
  const [total] = useState(() => calculateTotal());

  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };
  return (
    <diiv>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage?.length > 0 ? (
          cartStorage?.map((item) => (
            <div className="list-item">
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.Description}</div>

                <button onClick={() => RemoveCartItem(item._id)}>
                  Remove from cart
                </button>
              </div>
              <div className="list-item-block-3">Price : {item.price} Rs.</div>
            </div>
          ))
        ) : (
          <h1>No Food Item Available</h1>
        )}
      </div>
      <div className="total-wrapper">
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
        <div>
          <button onClick={orderNow}>Order Now!</button>
        </div>
      </div>
      <Footer />
    </diiv>
  );
};
export default cartPage;
