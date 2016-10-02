import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

export default class Login extends Component {

  render() {
    const {panel} = this.props;
    Tracker.autorun(function(){
      if(Meteor.user()){
        FlowRouter.go('/admin')
      } else if(panel) {
        FlowRouter.go('/')
      }
    });

    return (
      <AccountsUIWrapper />
    );
  }

}
