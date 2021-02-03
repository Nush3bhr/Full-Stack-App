import React from "react";
import "./App.css";
import Posts from "./Components/Posts";

import BondCalculator from "./Components/BondCalculator";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import RandomNo from "./Components/RandomNo";

function App() {
  return (
    <div>
      <Router>
        <AppBar position="fixed" style={{ backgroundColor: "rgb(59, 23, 14)" }}>
          <Toolbar>
            <Avatar
              alt="Remy Sharp"
              src="https://s3.amazonaws.com/www-inside-design/uploads/2018/01/creativity-quotes.jpg"
            />

            <Typography variant="h6" style={{ flexGrow: "1" }}>
              <Box fontWeight="fontWeightBold" fontSize="h4.fontSize" m={1}>
                PostIt
              </Box>
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {" "}
              <Typography style={{ margin: "10px" }}>Home</Typography>
            </Link>
            <Link
              to="/RandomNo"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <Typography style={{ margin: "10px" }}>Game</Typography>
            </Link>
            <Link
              to="/BondCalculator"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <Typography style={{ margin: "10px" }}>Bond</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/BondCalculator" exact component={BondCalculator} />
          <Route path="/RandomNo" exact component={RandomNo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
