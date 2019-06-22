import React from 'react';
import './App.css';
import PhotoList from './PhotoList/PhotoList';
import PageNavigation from './PageNavigation/PageNavigation';
import config from './config';

export default class App extends React.Component {
  state = {
    photos: [],
    currentPage: 1,
    maxPage: null,
    requestedPage: 1,
    photoPages: [],
  }

  componentDidMount() {
    this.makeApiRequest();
  }

  // take a page and limit param, defaulting to 1 and 10 respectively
  makeApiRequest() {
    let url = config.API_ENDPOINT;
    fetch(url + '?page='+ this.state.requestedPage + '&limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(results => {
        console.log(results);
        this.setState({
          photos: results,
          photoPages: [...this.state.photoPages, {id: this.state.requestedPage, photos: [results]} ],
          currentPage: this.state.requestedPage,
          maxPage: this.state.requestedPage > this.state.maxPage ? this.state.requestedPage : this.state.maxPage
        });
      }
    )
  }

  calcPageNumbers() {
    // showing five pages at a time in the navigation
    if(this.state.currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (this.state.currentPage - 2 >= 2 || this.state.currentPage + 2 <= this.state.maxPage) {
      // calculate pages numbers from two less to two more than the current page
      // we dont' progress if the condition above is not done with or
      let newPages = [];
      for(let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++ ) {
        let throwAway = newPages.push(i);
      }
      return newPages;
    } else {
      // calculate page numbers from four less than max page number to max page number
      let newPages = [];
      for(let i = this.state.maxPage - 4; i <= this.state.maxPage; i++) {
        let throwAway = newPages.push(i);
      }
      return newPages;
    }
  }

  requestPageNumber = page => {
    this.setState({
      requestedPage: page,
    }, this.makeApiRequest);
  }

  render() {
    let pages = this.calcPageNumbers();

    return (
      <>
        <PageNavigation pages={pages} requestPageNumber={this.requestPageNumber}/>
        <PhotoList photos={this.state.photos} />
      </>
    )
  }
}
