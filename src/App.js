import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { fetchConfiguration } from "./utils/api";
import { ImageConfigContext } from "./utils/context";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

// Stylesheet
import './App.scss';

// Dynamic import view components
const Home = lazy(() => import('./views/home'));
const Movie = lazy(() => import('./views/movie'));
const FourOFour = lazy(() => import('./views/four-o-four'));

// Setup fontawesome icon library
library.add(faArrowLeft, faSearch);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageConfig: {},
    }
  }

  componentDidMount() {
    fetchConfiguration().then((response) => {
      this.setState({
        imageConfig: response.images
      });
    });
  }

  render() {
    return (
      <ImageConfigContext.Provider value={this.state.imageConfig}>
        <BrowserRouter>
          <Suspense fallback={<h5>Loading...</h5>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movie/:id" component={Movie} />
              {/* when none of the above match, <NoMatch> will be rendered */}
              <Route component={FourOFour} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ImageConfigContext.Provider>
    );
  };
}

export default App;
