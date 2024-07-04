import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getSingleUser = async (id) => {
    try {
      const { data } = await axios.get(`/users/${id}`);
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSingleUser(id);
  }, [id]);

  return (
    <div className="ml-5">
      {user && (
        <div>
          <h1>{user?.firstName}</h1>
          <h1>{user?.email}</h1>
        </div>
      )}
    </div>
  );
};
export default UserPage;
