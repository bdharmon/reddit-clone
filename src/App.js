import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { SignUp } from './components/Login/SignUp';
import { Main } from './components/Main/Main';
import { SubredditPage } from './components/SubredditPage/SubredditPage';
import { CreateNewPost } from './components/CreateNewPost/CreateNewPost';
import { loadUser } from './redux/actions/auth/index';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={SignUp} />

          <Route exact path="/" component={Main} />

          <Route exact path="/submit" component={CreateNewPost} />

          <Route path="/r/:subreddit" component={SubredditPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
