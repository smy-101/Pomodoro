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
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}







export default App;
