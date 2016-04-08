import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import Layout from '../imports/ui/Layout.jsx';
import App from '../imports/ui/App.jsx';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    mount(Layout, {
      main: () => <App/>,
    });
  },
});

FlowRouter.notFound = {
  action() {
    mount(Layout, {
      main: () =>
        <div className="container text-center">
          <h2><small>404.</small> Not Found</h2>
        </div>
    })
  }
}
