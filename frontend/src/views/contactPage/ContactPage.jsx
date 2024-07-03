import { useState } from "react";
import "./ContactPage.scss";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  message: "",
};

const ContactPage = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({ email: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/comments/new`,
        formData
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-page-container">
        <h1 className="contact-page-title">Contact Us </h1>

        <form onSubmit={handleSubmit} className="contact-form">
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
            <label className="input-label">Message:</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              value={formData.message}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <button className="contact-btn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
