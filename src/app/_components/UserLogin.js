import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleLogin = async () => {
    console.log(email, password);
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.success) {
      alert("User logged in successful");
      let result = response.data;
      delete result.password;
      localStorage.setItem("user", JSON.stringify({ data: result }));
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
