import React, { useState } from "react";
import "./styles/postdetails.css";

const PostPage = ({ data }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="main_div">
      <div
        className="card"
        style={{ background: selected ? "#A259FF" : "#FFFFFF" }}
        onClick={() => setSelected(!selected)}
      >
        <p className="gender" style={{ color: selected ? "white" : "black" }}>
          Id : {data.id}
        </p>
        <p
          className="user_name"
          style={{ color: selected ? "white" : "black" }}
        >
          {data.title}
        </p>
        <p
          className="user_email"
          style={{ color: selected ? "white" : "#E16259" }}
        >
          {data.body}
        </p>
      </div>
    </div>
  );
};

export default PostPage;
