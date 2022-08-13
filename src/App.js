import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUsers();
  };

  const searchUsers = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}`
    }).then((res) => {
      setLoading(false);
      setUsername(res.data);
    });
  };

  const renderName = (user) => {
    return (
      <div className='row' key={user.id}>
        <h2 className='repo-name'>{user.login}</h2>
      </div>
    );
  };

  return (
    <div className='page'>
      <div className='landing-page-container'>
        <div className='left-side'>
          <form className='form'>
            <input
              className='input'
              value={username}
              placeholder='Github username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className='button' onClick={handleSubmit}>
              {" "}
              {loading ? "Searching.." : "Search"}{" "}
            </button>
          </form>
          <div className='result-container'>
            <ul>
              <li key={user.id}>{username.map(renderName)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
