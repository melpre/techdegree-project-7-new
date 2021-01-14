import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './index.css';

//Import Components
import Search from './components/Search';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

//Import Flickr API
import apiKey from './config';
const photoApiKey = apiKey;


class App extends Component {

  constructor() {
    super()
    this.state = {
      photos: []
    };
    console.log(this.state.photos);
  }

  componentDidMount() {
    fetch(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoApiKey}&tags=beaches%2C+deserts%2C+mountains&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then (responseData => {
        this.setState({ photos: responseData }); //works now, but in Guil's demo, he uses responseData.data as the new state, don't understand...
        console.log(this.state.photos);
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render () {
    return (
      <BrowserRouter>
        <div className="container">
            <Search />
            <Navigation />
            <Gallery data={this.state.photos }/>
            <Search />
          <Switch>
            <Route path="/beaches" component={Gallery} />
            <Route path="/deserts" component={Gallery} />
            <Route path="/mountains" component={Gallery} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};

export default App;