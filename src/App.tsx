import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Header from './features/nav/NavHeader'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NoMatch from './pages/noMatch/NoMatch'
import Signup from './pages/signup/Signup'
import { useAppDispatch } from './app/hooks'
import { getLocalUserInfo } from './features/auth/authSlice'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getLocalUserInfo())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Toaster />

            <Header />
            <div className="container mx-auto px-4 pt-2">
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
            </div>
        </BrowserRouter>
    )
}

export default App
