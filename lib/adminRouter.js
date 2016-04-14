import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import AdminLayout from '../imports/ui/admin/AdminLayout.jsx';
import Login from '../imports/ui/admin/Login.jsx';

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
});

adminRoutes.route('/', {
  name: 'Admin.login',
  action() {
    mount(AdminLayout, {
      main: () => <Login />
    });
  }
});

export default adminRoutes;
