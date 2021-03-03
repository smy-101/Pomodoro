import React from 'react';
import {
    Router,
    // Switch,
    Route,
} from 'react-router-dom';
import {Login} from './views/Login';
import {SignUp} from './views/SignUp';
import HomePage from './views/HomePage';
import TodoHistory from './components/Statistics/TodoHistory/TodoHistory';
import TomatoHistory from './components/Statistics/TomatoHistory/TomatoHistory';
import Charts from './components/Statistics/Charts/Charts';
import history from './config/history'


function App() {
    return (
            <Router history={history}>
                <div>
                        <Route exact={true} path="/login" component={Login}/>

                        <Route exact={true} path="/signup" component={SignUp}/>

                        <Route exact={true} path="/" component={HomePage}/>

                        <Route exact={true} path="/todoHistory" component={TodoHistory}/>

                        <Route exact={true} path="/tomatoHistory" component={TomatoHistory}/>

                        <Route exact={true} path="/charts" component={Charts}/>
                </div>
            </Router>
    );
}


export default App;
