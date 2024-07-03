import { useState } from "react";
import "./LoginPage.scss";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initialState);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/users/login`,
        formData
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };
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
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
