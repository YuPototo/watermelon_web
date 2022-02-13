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
import CreatePost from './pages/createPost/CreatePost'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getLocalUserInfo())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Toaster />

            <Header />
            <div className="mx-auto min-h-screen bg-gray-200 px-4 py-4">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/p/:postId">
                        <PostPage />
                    </Route>
                    <Route path="/c/:communityId">
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
                    <Route path="/createPost">
                        <CreatePost />
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
