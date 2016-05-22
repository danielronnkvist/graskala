import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import AdminRoutes from './adminRouter.js';
import { Posts } from '../imports/api/posts.js';

import Layout from '../imports/ui/Layout.jsx';
import App from '../imports/ui/App.jsx';
import About from '../imports/ui/About.jsx';
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
    let post = Posts.findOne({slug: params.slug});
    mount(Layout, {
      main: () => <Post key={post._id} post={post} />,
    });
  },
});

FlowRouter.route('/om', {
  name: 'Om',
  action() {
    mount(Layout, {
      main: () => <About/>,
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
