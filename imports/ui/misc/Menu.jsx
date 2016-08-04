import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

export default class Menu extends Component {

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  getClassName({menu}) {
    return "menu " + (menu ? "" : "hidden");
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
        <span>
          kontakt
        </span>
      </div>
    );
  }
}
