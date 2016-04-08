
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

export default class Header extends Component {

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

          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    );
  }
}
