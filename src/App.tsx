import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Login} from './views/Login';
import {SignUp} from './views/SignUp';
import {HomePage} from './views/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Index</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact={true} path="/login" component={Login}/>

            <Route exact={true} path="/signup" component={SignUp}/>

            <Route exact={true} path="/" component={HomePage}/>

          </Switch>
        </div>
      </Router>
    </div>
  );
}







export default App;
