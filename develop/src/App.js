import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link,Route,Router,Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import GamesPage from './GamesPages';
import GamesForm from './GamesForm';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui three item menu">
          <Link to="/" className="item" activeClassName="active" activeOnlyWhenExtract>Home</Link>
          <Link to="/games" className="item" activeClassName="active" activeOnlyWhenExtract>Games</Link>
          <Link to="/games/new" className="item" activeClassName="active" activeOnlyWhenExtract>Games Form</Link>
        </div>
          <Switch>
            <Route exact path="/games" component={GamesPage}/>
            <Route path="/games/new" component={GamesForm}/>
            <Route path="/games/:id" component={GamesForm}/>
          </Switch>
            
        
      </div>
    );
  }
}

export default App;
