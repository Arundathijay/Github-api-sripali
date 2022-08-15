import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import UserDetails from "./pages/UserDetails";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);

  // function passed for onclick event

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUsers();
    searchRepos();
    searchFollowers();
  };

  const searchUsers = () => {
    setLoading(true);
    // sending a get request to the API

    axios({
      method: "get",
      url: `https://api.github.com/users/${username}`
    }).then((res) => {
      setLoading(false);
      setUsers(res.data);
    });
  };

  const searchRepos = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`
    }).then((res) => {
      setLoading(false);
      setRepos(res.data);
    });
  };
  const searchFollowers = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/followers`
    }).then((res) => {
      setLoading(false);
      setFollowers(res.data);
    });
  };

  function renderRepos(repo) {
    return (
      <div className='repo-result-container'>
        <h3>{repo.name}</h3>
      </div>
    );
  }

  function renderFollowers(follower) {
    return (
      <div className='followers'>
        <h3>{follower.login}</h3>
      </div>
    );
  }

  return (
    <div className='page'>
      <div className='landing-page-container'>
        <div className='left-side'>
          {/* form to get user input details  */}

          <form className='form'>
            <input
              className='input'
              value={username}
              placeholder='Github username'
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className='button' onClick={handleSubmit}>
              {" "}
              {/* boolean variable to check if the data is loading
              while loading displays 'searching' */}
              {loading ? "Searching.." : "Search"}{" "}
            </button>
          </form>

          {/* display users login name and the avatar */}
          <div className='results-container'>
            <Router>
              <Routes>
                <Route path='/users/:id' element={<UserDetails />} />
              </Routes>
              <img
                className='avatar'
                src={users.avatar_url}
                alt={users.login}
              />
              <div className='user-details'>
                <Link className='user-name' to={`/users/${users.id}`}>
                  {users.login}
                </Link>
              </div>
              <div className='info-container'>
                <div className='container-child'>
                  {followers.map(renderFollowers)}
                </div>
                <div className='container-child repos'>
                  {repos.map(renderRepos)}
                </div>
              </div>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
