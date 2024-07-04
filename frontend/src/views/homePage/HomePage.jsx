import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data.users);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main>
      <section>
        <h1>Landing Page</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {users?.length > 0 ? (
          users.map((user) => (
            <div key={user._id}>
              <Link to={`/users/${user._id}`} className="ml-5 text-blue-500">
                {user.firstName}
              </Link>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
