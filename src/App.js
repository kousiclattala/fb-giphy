import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const App = () => {
  let cancelToken;

  const url = "https://api.giphy.com/v1/gifs/search";
  const [postText, setPostText] = useState("");
  const [postGif, setGif] = useState({});
  const [gifs, setGifs] = useState([]);
  const [gifstring, setGifstring] = useState("");

  const [posts, setPosts] = useState([]);

  const handleGifSearch = async (e) => {
    setGifstring(e.target.value);

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("cancelling previous request");
    }
    cancelToken = axios.CancelToken.source();

    var gifData = await axios.get(
      `${url}?api_key=${process.env.REACT_APP_GIPHY_KEY}&q=${gifstring}&limit=5`,
      { cancelToken: cancelToken.token }
    );

    setGifs(gifData.data.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      id: nanoid(),
      text: postText,
      gif: postGif,
    };

    setPosts([...posts, post]);
    console.log(posts);
    console.log(Array.isArray(posts));
    setPostText("");
    setGif({});
  };

  const handleClose = () => {
    setPostText("");
    setGif({});
  };

  return (
    <div className="container container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-center">
          <h1 className="mx-3">FB Type Post</h1>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Post
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Post
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                      />
                      <label htmlFor="floatingTextarea2">
                        What's on your mind?
                      </label>
                      {postGif && (
                        <img
                          src={postGif.images?.original?.url}
                          alt={postGif.title}
                          className="mt-3"
                        />
                      )}
                    </div>
                    <p className="mt-3">
                      <a
                        className="btn btn-outline-primary"
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        GIF
                      </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                      <input
                        type="text"
                        className="form-control"
                        value={gifstring}
                        onChange={(e) => handleGifSearch(e)}
                      />
                      {gifs &&
                        gifs.map((gif) => (
                          <div
                            className="card card-body"
                            key={gif.id}
                            onClick={() => {
                              setGif(gif);
                              setGifstring("");
                              setGifs("");
                            }}
                          >
                            <img
                              src={gif.images?.original?.url}
                              alt={gif.title}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {posts.length === 0 ? (
        <>
          <h1 className="text-center">No posts to show</h1>
        </>
      ) : (
        <div className="container d-flex justify-content-center mt-4">
          <div className="row">
            <div className="col">
              {Array.isArray(posts) &&
                posts.map((post) => (
                  <div className="card mb-3 " key={post.id}>
                    <div className="card-title">
                      <p className="mt-3 text-center fs-4">{post.text}</p>
                    </div>
                    <div className="card-body">
                      <img
                        src={post.gif?.images?.original?.url}
                        alt={post.gif?.title}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
