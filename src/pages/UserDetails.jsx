import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = (loading) => {
  const { id } = useParams();
  const [users, setUsers] = useState("");

  //display each user details
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.github.com/user/${id}`
    }).then((res) => setUsers(res.data));
  }, [id]);

  //   if (loading) {
  //     return <h2 className='loader'> Loading ...</h2>;
  //   }
};

export default UserDetails;
