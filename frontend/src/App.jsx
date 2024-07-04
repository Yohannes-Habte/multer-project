import { Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage/HomePage";
import ContactPage from "./views/contactPage/ContactPage";
import RegisterPage from "./views/registerPage/RegisterPage";
import LoginPage from "./views/loginPage/LoginPage";
import Header from "./components/header/Header";
import UserPage from "./views/userPage/UserPage";


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
