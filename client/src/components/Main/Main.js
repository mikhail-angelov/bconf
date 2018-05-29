import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

class Main extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { user } = this.props

    return (
      <div className="Main">
        <div>You've successfully logged in with {user.name} email</div>
        <button onClick={() => this.props.logout()}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => auth
const mapDispatchToProps = {
  logout,
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)