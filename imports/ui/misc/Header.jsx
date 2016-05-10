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

  toggleMenu() {
    this.setState({
      menu: !this.state.menu
    });
  }

  render() {
    return (
      <header>
        <div className="container">
          <h1
            onClick={ ()=>
              FlowRouter.go('/')
            }
            >
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
            menu={this.state.menu}
          />
        </div>
      </header>
    );
  }
}
