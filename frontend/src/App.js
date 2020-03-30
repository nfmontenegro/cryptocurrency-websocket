import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import {Signup, Signin, Welcome, Home, Navbar} from './views'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/signup" />} />
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Signin />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
