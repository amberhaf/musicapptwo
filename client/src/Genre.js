import React, { Component } from "react";
import { Link } from "react-router-dom";

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      downloaded: false,
    };
    this.onGenreChange = this.onGenreChange.bind(this);
    this.play = this.play.bind(this);
  }
  
  onGenreChange(e) {
    this.setState({genre: e.target.value });
  }

  play(e) {
    var _this = this;
    var genre=this.state.genre;
    fetch('/api/chooseGenre' , {
    method: "POST",
    headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({fileName: genre})
  }).then(response => response.json())
  .then(function(data){
    console.log('Success:', data[0].downloaded);
    _this.setState({ downloaded: data[0].downloaded});
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  render() {
      return(
        <div className="App">
          <h1>Choose genre</h1>
          <select value={this.state.genre} onChange= {this.onGenreChange}>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="rap">Rap</option>
          </select>
          <button onClick={this.play}>
            Submit
          </button>
          <br/>
          {(this.state.downloaded===true) &&
        (<button><Link to="/game">Play</Link></button>)}
        </div>
      );
  } 
}

export default Genre;
