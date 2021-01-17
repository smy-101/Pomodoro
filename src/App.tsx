import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Login} from './views/Login';
import {SignUp} from './views/SignUp';
import {HomePage} from './views/HomePage';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
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
