import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Posts.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "aqua",
  },
}));
const Posts = () => {
  const classes = useStyles();

  const [post, setPost] = useState("");
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const [toName, setToName] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "post") {
      setPost(event.target.value);
    } else {
      setToName(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        post &&
        post.trim() &&
        name &&
        name.trim() &&
        toName &&
        toName.trim()
      ) {
        const postedData = await axios.post(
          "http://localhost:5000/api/items/",
          {
            name: name.trim(),
            post: post.trim(),
            receiver: toName.trim(),
          }
        );
        alert(post + " is posted successfully to   " + toName);
        fetchData();

        console.log("post: ", postedData);
      } else {
        alert("Post can't be empty");
      }
    } catch (err) {
      console.log(err);
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
    <div className="mainDiv">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h1" color="primary">
            PostIt
          </Typography>
        </Toolbar>
      </AppBar>
      <div classes="secondDiv">
        <form onSubmit={handleSubmit}>
          <Typography className={classes.typo}> Type Something:</Typography>
          <center>
            {" "}
            <input
              name="name"
              value={name}
              placeholder="Full Name "
              onChange={handleChange}
              type="text"
            />
            <br />
            <input
              name="post"
              value={post}
              placeholder="Write here.. "
              onChange={handleChange}
              type="text"
            />
          </center>
          <br />
          <center>
            <input
              name="toName"
              value={toName}
              placeholder="Send to "
              onChange={handleChange}
              type="text"
            />
          </center>
          <center>
            {" "}
            <input value="Post" type="submit" />
          </center>
        </form>

        <center>
          <div>
            {values &&
              values.map((myData, index) => (
                <div key={index}>
                  <h3>{myData.name}</h3>
                  <p>{myData.post}</p>
                  <h6>{myData.receiver}</h6>
                  <p>
                    {myData.name} post to {myData.receiver}
                  </p>
                </div>
              ))}
          </div>
        </center>
      </div>
    </div>
  );
};

export default Posts;
