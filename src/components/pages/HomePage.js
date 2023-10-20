import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("science");

  const [loading, setLoading] = useState(true);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    setLoading(true);
    const getArticles = async () => {
      try {
        const res = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${query}`
        );
        const data = res.data;
        setItems(data.hits);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getArticles();
    setLoading(false);
  }, [query]);
  return (
    <div className="card-main">
      <form className="d-flex mt-2" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          // style={inputStyle}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-success " type="button">
          Search
        </button>
      </form>
      {loading ? (
        <div style={style}>
          <TailSpin height="80" color="green" />
        </div>
      ) : (
        items.map(({ author, created_at, title, url, objectID }) => (
          <div className="card" key={objectID}>
            <Link className="text-decoration-none" to={`/details/${objectID}`}>
              <h3>{title}</h3>
              <p>By {author}</p>

              <p className="card-date">
                created at
                {format(new Date(created_at), " dd MMM yyy")}
              </p>
            </Link>
            <Link to={url}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
