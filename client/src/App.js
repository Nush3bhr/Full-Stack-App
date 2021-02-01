import React from "react";
import "./App.css";
import Posts from "./Components/Posts";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

function App() {
  return (
    <div>
      <Router>
        <AppBar position="fixed">
          <Toolbar>
            <Avatar
              alt="Remy Sharp"
              src="https://s3.amazonaws.com/www-inside-design/uploads/2018/01/creativity-quotes.jpg"
            />

            <Typography variant="h6">
              <Box fontWeight="fontWeightBold" fontSize="h4.fontSize" m={1}>
                PostIt
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>

        <Route path="/" component={Posts} />
      </Router>
    </div>
  );
}

export default App;
