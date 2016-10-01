import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import AdminRoutes from './adminRouter.js';

import Layout from '../imports/ui/Layout.jsx';
import App from '../imports/ui/App.jsx';
import Page from '../imports/ui/Page.jsx';
import Post from '../imports/ui/Post.jsx';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    mount(Layout, {
      main: () => <App/>,
    });
  },
});

FlowRouter.route('/post/:slug', {
  name: 'Post.show',
  action(params) {
    Meteor.call("getPost", params.slug, function(err, post) {
      if (err || !post) {
        console.log(err, post);
      } else {
        mount(Layout, {
          main: () => <Post key={post.slug} post={post} />,
        });
      }
    });
  },
});

function displayPage(err, data) {
  if (err || !data) {
    console.log(err, data);
  } else {
    mount(Layout, {
      main: () => <Page data={data} />,
    });
  }
}

FlowRouter.route('/kontakt', {
  name: 'Kontakt',
  action() {
    Meteor.call("getContactData", displayPage);
  },
});

FlowRouter.route('/om', {
  name: 'Om',
  action() {
    Meteor.call("getAboutData", displayPage);
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
