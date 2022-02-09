import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { useAppDispatch } from './app/hooks'
import { getLocalUserInfo } from './features/auth/authSlice'

import Header from './features/nav/NavHeader'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NoMatch from './pages/noMatch/NoMatch'
import Signup from './pages/signup/Signup'
import CommunityList from './pages/communityList/CommunityList'
import Community from './pages/community/Community'
import PostPage from './pages/postPage/PostPage'

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
                    <Route path="/p/:postId">
                        <PostPage />
                    </Route>
                    <Route path="/c/:id">
                        <Community />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/communities">
                        <CommunityList />
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
