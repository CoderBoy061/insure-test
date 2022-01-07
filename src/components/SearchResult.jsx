import { Button } from "antd";
import React from "react";

const SearchResult = ({ result }) => {
  const goback = () => {
    window.location.reload();
  };
  return (
    <div className="search_result">
      {result.map((data, index) => (
        <div className="card" style={{ background: "#FFFFFF" }} key={index}>
          <p className="gender" style={{ color: "black" }}>
            Id : {data.id}
          </p>
          <p className="user_name" style={{ color: "black" }}>
            {data.title}
          </p>
          <p className="user_email" style={{ color: "#E16259" }}>
            {data.body}
          </p>
        </div>
      ))}
      <Button className="button" onClick={goback}>
        Goback
      </Button>
    </div>
  );
};

export default SearchResult;
