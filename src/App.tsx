import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NoMatch from './pages/noMatch/NoMatch'
import Signup from './pages/signup/Signup'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
