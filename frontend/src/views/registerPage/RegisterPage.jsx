import { useState } from "react";
import "./RegisterPage.scss";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDate: "",
  gender: "",
  phoneNumber: "",
  image: null,
  profession: "",
  languages: [],
  agree: false,
};

const languageList = ["English", "German", "Tigrigna", "Amharic", "Kiswahili"];
const RegisterPage = () => {
  const [formData, setFormData] = useState(initialState);
  // Handle change function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "agree") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      } else if (name === "languages") {
        setFormData((prevState) => ({
          ...prevState,
          languages: checked
            ? [...prevState.languages, value]
            : prevState.languages.filter((lang) => lang !== value),
        }));
      }
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Reset state variables into initial state
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      gender: "",
      phoneNumber: "",
      image: null,
      profession: "",
      languages: [],
      agree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        formData
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="register-page">
      <section className="register-page-container">
        <h1 className="register-page-title">Create Account for Free </h1>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-container">
            <label className="input-label">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label"> Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label"> Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <p className="gender-label"> Gender:</p>
            <div className="gender-container">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="radio-input"
                />
                Male
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="radio-input"
                />
                Female
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  className="radio-input"
                />
                Other
              </label>
            </div>
          </div>

          <div className="input-container">
            <label className="input-label">Birth Date:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Profession:</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label className="input-label">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-container">
            Languages:
            <div className="languages">
              {languageList.map((lang) => (
                <div key={lang} className="language">
                  <input
                    type="checkbox"
                    name="languages"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                    className="language-checkbox"
                  />
                  <label key={lang}>{lang}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="input-container">
            <label className="input-label">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="checkbox-consent-container">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="input-checkbox"
            />
            <label>Agree to terms:</label>
          </div>

          <button className="register-btn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
