import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

const App = () => {
  const [posts, setPosts] = useState({});

  const getPosts = () => {
    var jsonPosts = localStorage.getItem("post");

    var allPosts = JSON.parse(jsonPosts);
    setPosts(() => allPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-center">
          <h1 className="mx-3">FB Type Post</h1>

          <Navbar />
        </div>
      </nav>

      {posts && (
        <div className="container d-flex justify-content-center mt-4">
          <div className="card ">
            <div className="card-title">
              <p className="mt-3 text-center fs-4">{posts.text}</p>
            </div>
            <div className="card-body">
              <img
                src={posts.gif?.images?.original?.url}
                alt={posts.gif?.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
