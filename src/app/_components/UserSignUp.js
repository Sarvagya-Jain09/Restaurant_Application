import { useState } from "react";
import { useRouter } from "next/navigation";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [city, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const HandleSignUp = async () => {
    console.log({ name, email, password, contact, city, Address });
    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email, name, password, city, contact, Address }),
    });
    response = await response.json();
    if (response.success) {
      alert("User Sign Up successfully");
      const finalUser = response;
      delete finalUser.data.password;
      localStorage.setItem("user", JSON.stringify(finalUser));
      setLoggedIn(true);
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          className="input-field"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
          value={c_password}
          onChange={(e) => setCPassword(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text-area"
          className="input-field"
          placeholder="Enter Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="number"
          className="input-field"
          placeholder="Enter Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => HandleSignUp()}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
