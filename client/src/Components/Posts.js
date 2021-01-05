import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState("");
  const [values, setValues] = useState("");

  const handleChange = (event) => {
    setPosts(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (posts && posts.trim()) {
      const postedData = await axios.post("http://localhost:5000/api/items/", {
        name: posts.trim(),
      });
      alert(posts + " is posted successfully.");
      console.log("post: ", postedData);
    } else {
      alert("Post can't be empty");
    }
  };

  useEffect(() => {
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
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Posts </h1>

        {values.map((myData, index) => (
          <h3 key={index}>{myData.name}</h3>
        ))}

        <form onSubmit={handleSubmit}>
          Type Something:
          <input value={posts} onChange={handleChange} type="text" />
          <input value="Post" type="submit" />
        </form>
      </header>
    </div>
  );
};

export default Posts;
