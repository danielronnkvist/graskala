
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <header>
        <div class="container">
          <h1
            onClick={ ()=>
              FlowRouter.go('/')
            }
            >
            GRÅSKALA
          </h1>
        </div>
      </header>
    );
  }
}
