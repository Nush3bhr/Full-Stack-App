import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Posts.css";
const Posts = () => {
  const [post, setPost] = useState("");
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value);
    else {
      setPost(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (post && post.trim() && name && name.trim()) {
      const postedData = await axios.post("http://localhost:5000/api/items/", {
        name: name.trim(),
        post: post.trim(),
      });
      alert(post + " is posted successfully.");
      fetchData();
      console.log("post: ", postedData);
    } else {
      alert("Post can't be empty");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getData = await axios.get("http://localhost:5000/api/items/");
      console.log(getData);
      if (getData && getData.data) {
        setValues(getData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> Posts </h1>
      <form onSubmit={handleSubmit}>
        Type Something:
        <center>
          {" "}
          <input
            name="name"
            value={name}
            placeholder="Write something... "
            onChange={handleChange}
            type="text"
          />
          <br />
          <input
            name="post"
            value={post}
            placeholder="Write something... "
            onChange={handleChange}
            type="text"
          />
        </center>
        <center>
          {" "}
          <input value="Post" type="submit" />
        </center>
      </form>

      {values &&
        values.map((myData, index) => (
          <div key={index}>
            <h3>{myData.name}</h3>
            <p>{myData.post}</p>
          </div>
        ))}
    </div>
  );
};

export default Posts;
