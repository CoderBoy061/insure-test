import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import PostPage from "./PostPage";
import "./styles/post.css";
import { Spin, message } from "antd";
import SearchResult from "./SearchResult";

const Post = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [result, setResult] = useState([]);
  const usersPerPage = 20;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);
  const [searchInput, setSearchInput] = useState("");

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //maping the data
  const displayUsers = data
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data, index) => {
      return <PostPage data={data} key={index} />;
    });
  //fetching data before the component load
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setdata(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //code for spinner while loading is true
  if (loading) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ececec",
        }}
      >
        <Spin tip="Loading...."></Spin>
      </div>
    );
  }
  //function for search functionality
  const fetchData = async (e) => {
    if (e.key === "Enter") {
      if (searchInput === "") {
        message.error("Please enter a id", 1.5);
      } else {
        setLoading(true);
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?id=${searchInput}`
        );
        setResult(res.data);
        setLoading(false);
        setSearchInput("");
      }
    }
  };
  return (
    <div className="post">
      <input
        type="text"
        placeholder="Enter id to see particular post"
        className="search"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => fetchData(e)}
      />
      {result.length === 0 ? (
        <>
          <div className="cards_component">{displayUsers}</div>
          <div className="pagination">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </>
      ) : (
        <SearchResult result={result} />
      )}
    </div>
  );
};

export default Post;
