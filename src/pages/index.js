import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = {
    email: email,
    password: password,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post(
        "https://reqres.in/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("REGISTER SUCCESS");
      console.log("REGISTER SUCCESS");
      setTimeout(() => {
        router.push("/user/user");
        setLoading(false);
      }, 3000);
    } catch (error) {
      toast.error("Note: Only defined users succeed registration");
      console.log("REGISTER FAILD", error.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="register template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form-container p-5 rounded bg-white">
        <form onSubmit={handleRegister}>
          <h3 className="text-center mb-4">Register</h3>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Register</button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}
