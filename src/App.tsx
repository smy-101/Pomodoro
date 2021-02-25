import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Login} from './views/Login';
import {SignUp} from './views/SignUp';
import HomePage from './views/HomePage';
import TodoHistory from './components/Statistics/TodoHistory/TodoHistory';
import TomatoHistory from './components/Statistics/TomatoHistory/TomatoHistory';
import Charts from './components/Statistics/Charts/Charts';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact={true} path="/login" component={Login}/>

                        <Route exact={true} path="/signup" component={SignUp}/>

                        <Route exact={true} path="/" component={HomePage}/>

                        <Route exact={true} path="/todoHistory" component={TodoHistory}/>

                        <Route exact={true} path="/tomatoHistory" component={TomatoHistory}/>

                        <Route exact={true} path="/charts" component={Charts}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}


export default App;
