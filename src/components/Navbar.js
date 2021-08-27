import React, { useState } from "react";
import axios from "axios";

// import Modal from "./Modal";

const Navbar = () => {
  let cancelToken;

  const url = "https://api.giphy.com/v1/gifs/search";
  const [postText, setPostText] = useState("");
  const [postGif, setGif] = useState({});
  const [gifs, setGifs] = useState([]);
  const [gifstring, setGifstring] = useState("");

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
    const post = {
      text: postText,
      gif: postGif,
    };

    var jsonPost = JSON.stringify(post);

    localStorage.setItem("post", jsonPost);
  };

  return (
    <>
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
                {/* <Modal /> */}
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
                        <img src={gif.images?.original?.url} alt={gif.title} />
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
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
    </>
  );
};
export default Navbar;
