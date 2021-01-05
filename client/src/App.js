import React from "react";
import "./App.css";
import Posts from "./Components/Posts";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" component={Posts} />
    </Router>
  );
}

export default App;
