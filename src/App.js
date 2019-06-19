import React from 'react';
import './App.css';
import PhotoList from './PhotoList/PhotoList';
import config from './config';

export default class App extends React.Component {
  state = {
    photos: [],
    page: 1,
  }

  componentDidMount() {
    this.makeApiRequest();
  }

  // take a page and limit param, defaulting to 1 and 10 respectively
  makeApiRequest() {
    let url = config.API_ENDPOINT;
    fetch(url + '?page='+ this.state.page + '&limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(results => {
        console.log(results);
        this.setState({ photos: results });
      }
    )
  }

  render() {
    return (
      <PhotoList photos={this.state.photos} />
    )
  }
}
