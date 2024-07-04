import { useState } from "react";
import "./LoginPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({ email: "", password: "", rememberMe: false });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        formData
      );
      console.log("data =", response);

      if (response.data.success) {
        toast.success(response.data.message);
        setError("");
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });

        handleReset();
        navigate("/");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  // Handle logout
  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   navigate("/login");
  // };
  return (
    <main className="login-page">
      <section className="login-page-container">
        <h1 className="login-page-title"> Log in to your account </h1>

        <form onSubmit={handleSubmit} action="" className="login-form">
          <div className="input-container">
            <label className="input-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="remember-me-container">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="remember-me-checkbox"
            />
            <label>Remember Me</label>
          </div>

          <button className="login-btn">Login</button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
