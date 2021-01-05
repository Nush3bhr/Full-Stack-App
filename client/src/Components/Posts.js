import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Posts.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "aqua",
  },
  root: {
    minWidth: 275,
    marginBottom: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
        setName("");
        setPost("");
        setToName("");

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
        <form style={{ margin: "20px" }} onSubmit={handleSubmit}>
          <Typography className={classes.typo}> Type Something:</Typography>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <TextField
            name="toName"
            value={toName}
            label="To Whom"
            onChange={handleChange}
          />
          <br />
          <TextField
            name="post"
            label="Quotes"
            value={post}
            onChange={handleChange}
          />

          <Button
            style={{ marginLeft: "50px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Post
          </Button>
        </form>

        <div>
          {values &&
            values.map((myData, index) => (
              <Card key={index} className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {index +
                      1 +
                      ". " +
                      myData.name +
                      " posted to " +
                      myData.receiver}
                  </Typography>
                  {myData.post}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
