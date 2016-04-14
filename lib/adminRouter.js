import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import AdminLayout from '../imports/ui/admin/AdminLayout.jsx';
import Login from '../imports/ui/admin/Login.jsx';

function ensureSignIn() {
  if(!Meteor.user()) FlowRouter.go('/admin/signin');
}

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [ensureSignIn],
});

FlowRouter.route('/admin/signin', {
  name: 'Admin.login',
  action() {
    mount(AdminLayout, {
      main: () => <Login />
    });
  }
});

export default adminRoutes;
