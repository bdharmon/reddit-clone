import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { SignUp } from './components/Login/SignUp';
import { Main } from './components/Main/Main';
import { SubredditPage } from './components/SubredditPage/SubredditPage';
import { CreateNewPost } from './components/CreateNewPost/CreateNewPost';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <SignUp />
          </Route>

          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/submit">
            <CreateNewPost />
          </Route>

          <Route path="/r/:subreddit">
            <SubredditPage />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
