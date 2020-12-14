import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import background from "./assets/images/background.jpg";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);

  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        setPage((nextPage) => nextPage + 1);
      }
    });

    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <main>
      <div className="main-img">
        <img src={background} alt="main" />
        <section className="search">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search free high-resolution photos"
              className="form-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              <FaSearch />
            </button>
          </form>
        </section>
      </div>

      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <Spinner />}
      </section>
    </main>
  );
}
export default App;
