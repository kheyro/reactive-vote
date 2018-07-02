import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Home from './containers/Home';

import './styles/styles.scss';

const App = () => (
  <Fragment>
    <Header />
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </Fragment>
);

export default App;
