import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import {Signup, Welcome} from './views'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signup" />} />
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
