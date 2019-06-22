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

  // Make an API request if needed
  makeApiRequest() {
    console.log('fetch requestedPage: ', this.state.requestedPage);
    let url = config.API_ENDPOINT;
    fetch(url + '?page='+ this.state.requestedPage + '&limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        // Would like to get the link values from the response header
        // for(let header in response.headers) {
        //   console.log(header);
        // }
        return response.json();
      })
      .then(results => {
        this.setState({
          photos: results,
          photoPages: [...this.state.photoPages, {id: this.state.requestedPage, photos: results} ],
          currentPage: this.state.requestedPage,
          maxPage: this.state.requestedPage > this.state.maxPage ? this.state.requestedPage : this.state.maxPage
        });
      }
    )
  }

  calcPageNumbers() {
    // Showing five pages at a time in PageNavigation
    // Current page should be in the middle of the group, show two pages before, two after
    if (this.state.currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    else if (this.state.currentPage - 2 >= 2) { // calculate pages numbers from two less to two more than the current page
      let newPages = [];
      // if (this.state.currentPage + 2 >= this.state.maxPage) {
      //   calculate page numbers from four less than max page number to max page number
      //   for (let i = this.state.maxPage - 4; i <= this.state.maxPage; i++) {
      //     newPages.push(i);
      //   }
      //   return newPages;
      // }
      for (let i = this.state.currentPage - 2; i <= this.state.currentPage + 2; i++) {
        newPages.push(i);
      }
      return newPages;
    }
    else {
      return [];
    }
  }

  // We may already have the results for the requested page in state.photoPages.
  // If so, return that, else make an API call for the requested page.
  getRequestedPage = page => {
    let pageExistsLocally = this.state.photoPages.find(pp => pp.id === page);
    if(pageExistsLocally) {
      this.setState({
        photos: [...pageExistsLocally.photos],
        currentPage: page,
      })
    } else {
      this.makeApiRequest();
    }
  }

  // Update state.requestedPage and invoke a callback when the update is complete
  updateRequestedPageNumber = page => {
    this.setState({
      requestedPage: page,
    }, () => this.getRequestedPage(page));
  }

  render() {
    let pages = this.calcPageNumbers();

    return (
      <>
        <PageNavigation pages={pages} requestPageNumber={this.updateRequestedPageNumber}/>
        <PhotoList photos={this.state.photos} />
      </>
    )
  }
}
