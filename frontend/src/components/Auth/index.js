import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'

export default ComposedComponent => {
  class Authentication extends Component {
    componentDidUpdate(nextProps) {
      if (!nextProps.user.isAuthenticated) {
        nextProps.history.push('/login')
      }
      return null
    }

    render() {
      return this.props.user.isAuthenticated ? <ComposedComponent {...this.props} /> : <Redirect to="/login" />
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(withRouter(Authentication))
}
