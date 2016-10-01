import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

function isAdmin() {
  if(Meteor.userId()) {
    return true;
  } else {
    return false;
  }
}

export default class Menu extends Component {

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  getClassName({menu}) {
    return "menu " + (menu ? "" : "hidden");
  }

  getAdminLinks() {
    if(isAdmin()) {
      return (
        <span
          onClick={ () =>
            this.props.onLinkClick('/admin')
          }>
          admin
        </span>
      );
    }
  }

  render() {
    return (
      <div className={ this.getClassName(this.props) }>
        <span
          onClick={ () =>
            this.props.onLinkClick('/om')
          }>
          om
        </span>
        <span
          onClick={ () =>
            this.props.onLinkClick('/kontakt')
          }>
          kontakt
        </span>
        { this.getAdminLinks() }
      </div>
    );
  }
}
