import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

import Menu from './Menu.jsx';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  toggleMenu(state) {
    this.setState({
      menu: state !== undefined ? state : !this.state.menu
    });
  }

  onLinkClick(slug) {
    this.toggleMenu(false);
    FlowRouter.go(slug);
  }

  render() {
    return (
      <header>
        <div className="container">
          <h1 onClick={ this.onLinkClick.bind(this, '/') }>
            GRÅSKALA
          </h1>

          <div
            onClick={ this.toggleMenu.bind(this) }
            className="hamburger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Menu
            menu={ this.state.menu }
            onLinkClick={ this.onLinkClick.bind(this) }
          />
        </div>
      </header>
    );
  }
}
