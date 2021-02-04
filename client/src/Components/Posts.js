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
import { TextField, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "aqua",
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
  textField: {
    width: 500,
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
      if (post && post.trim() && name && name.trim()) {
        const postedData = await axios.post(
          "http://localhost:5000/api/items/",
          {
            name: name.trim(),
            post: post.trim(),
            receiver: toName && toName.trim(),
          }
        );
        alert(post + " is posted successfully to   " + toName);
        fetchData();
        setName("");
        setPost("");
        setToName("");

        console.log("postedData: ", postedData);
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
      console.log("getData:", getData);
      if (getData && getData.data) {
        setValues(getData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainDiv">
      <form
        style={{ margin: "20px", width: "50%", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Typography
          style={{
            marginTop: "100px",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          {" "}
          Let ur WORDS add icing to someone's Day!
        </Typography>
        <TextField
          required
          fullWidth
          name="name"
          label="Name"
          value={name}
          onChange={handleChange}
          style={{ margin: "15px" }}
        />

        <TextField
          fullWidth
          name="toName"
          value={toName}
          label="Dedicating To"
          onChange={handleChange}
          style={{ margin: "15px" }}
        />

        <TextField
          required
          multiline
          fullWidth
          name="post"
          label="Quote"
          variant="outlined"
          value={post}
          onChange={handleChange}
          style={{ marginTop: "40px", marginLeft: "10px" }}
        />

        <Button
          style={{
            margin: "20px",
            fontWeight: "bold",
          }}
          variant="outlined"
          color="primary"
          type="submit"
          size="large"
        >
          Post
        </Button>
      </form>

      <div>
        <Grid container spacing={2}>
          {values &&
            values.map((myData, index) => {
              let d = new Date(myData.date);
              return (
                <Grid item lg={8} sm={3} md={4}>
                  <Card
                    key={index}
                    className={classes.root}
                    style={{
                      margin: "20px",
                      padding: "20px",
                      backgroundColor: "rgb(255, 251, 219)",
                      border: "2px black solid",
                      boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        color="textSecondary"
                        style={{ textAlign: "right", fontSize: "15px" }}
                      >
                        {moment(myData.date).fromNow()}
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {(myData.name && myData.name.toUpperCase()) +
                          " dedicated to " +
                          (myData.receiver
                            ? myData.receiver.toUpperCase()
                            : "EVERYONE")}
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                          fontSize: "18px",
                          marginTop: "20px",
                        }}
                      >
                        {myData.post}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default Posts;
