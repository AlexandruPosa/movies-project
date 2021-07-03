import React, { Component } from "react";
import MovieTab from "./MovieTab";

class HomeContent extends Component {
  state = {};
  render() {
    return (
      <div className="home-content text-light">
        <MovieTab />
        <div className="container"></div>
      </div>
    );
  }
}

export default HomeContent;
