import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

class MovieTab extends Component {
  state = {
    movies: [],
    displayMovies: [],
    movieYear: "",
    newReleases: [],
  };

  getNewRelease = () => {
    const newReleases = [];

    for (let movie of this.state.movies) {
      if (parseInt(movie.Year) > 2015) {
        newReleases.push(movie);
      }
    }
    console.log(newReleases);
    this.setState({
      displayMovies: newReleases.slice(0, 12),
    });
  };

  getTvShows = () => {
    const tvShow = [];
    for (let movie of this.state.movies) {
      if (movie.Type === "series") {
        tvShow.push(movie);
      }
      this.setState({
        displayMovies: tvShow.slice(0, 12),
      });
    }
  };

  getMovies = () => {
    const justMovie = [];
    for (let movie of this.state.movies) {
      if (movie.Type === "movie") {
        justMovie.push(movie);
      }
      this.setState({
        displayMovies: justMovie.slice(0, 12),
      });
    }
  };
  componentDidMount() {
    fetch("https://movies-app-siit.herokuapp.com/movies?take=1000")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        const totalMovies = json.results.filter((movie) => movie.Poster);
        this.setState({
          movies: totalMovies,
          displayMovies: totalMovies.slice(0, 12),
          movieYear: json.results.Year,
        });
      });
  }
  render() {
    return (
      <div className="container">
        <div className="home-content-head mb-5 shadow">
          <div className="container">
            <div className="row">
              <div className="col-12 mt-4 mb-2">
                <h2>New items</h2>
              </div>
              <Nav className="justify-content-start">
                <Nav.Item>
                  <Nav.Link href="#" onClick={this.getNewRelease}>
                    New Releases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#" onClick={this.getMovies}>
                    Movies
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#" onClick={this.getTvShows}>
                    TV Shows
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.displayMovies.map((item) => (
            <div class="col-6 col-sm-12 col-lg-6">
              <div className="custom-card mb-5">
                <div className="row">
                  <div className="col-12 col-sm-4 px-3">
                    <img
                      className="w-100"
                      src={item.Poster}
                      alt=""
                      key={item._id}
                    />
                  </div>
                  <div className="col-12 col-sm-8">
                    <div className="custom-card-content">
                      <h3 className="custom-card-title">{item.Title}</h3>
                      <span>{item.Genre}</span>
                      <div className="custom-card-wrap">
                        <p>{item.imdbRating}</p>
                        <div className="custom-card-year">
                          {item.Year < 2018 ? <p>{item.Year}</p> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MovieTab;
