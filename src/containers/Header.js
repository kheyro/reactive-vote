import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavBarLink, NavBar } from '../styles/ui';

class Header extends Component {
  renderLinks = () => (
    <Fragment>
      <li className="nav-item">
        <NavBarLink to="/url">Link</NavBarLink>
      </li>
      <li className="nav-item">
        <NavBarLink to="/url">Link</NavBarLink>
      </li>
    </Fragment>
  );

  render() {
    return (
      <NavBar className="navbar navbar-expand-lg mb-4 navbar-dark">
        <NavBarLink className="navbar-brand" to="/">
          App Name
        </NavBarLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavBarLink to="/">Home</NavBarLink>
            </li>
            {this.renderLinks()}
          </ul>
        </div>
      </NavBar>
    );
  }
}

export default connect(null, null)(Header);
