import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './configs/routes';
import pages from './components/Pages';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={routes.HOME()} component={pages.Example} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
