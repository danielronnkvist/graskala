import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

export default class Menu extends Component {

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  getClassName() {
    return "menu " + (this.props.menu ? "" : "hidden");
  }

  render() {
    return (
      <div className={ this.getClassName() }>
        <span>om</span>
        <span>kontakt</span>
      </div>
    );
  }
}
