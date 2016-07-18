import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import { Posts } from './collections.js';

import AdminLayout from '../imports/ui/admin/AdminLayout.jsx';
import Login from '../imports/ui/admin/Login.jsx';
import Panel from '../imports/ui/admin/Panel.jsx';

import PostForm from '../imports/ui/admin/contents/post.jsx';

function ensureSignIn() {
  if(!Meteor.userId()) FlowRouter.go('/admin/signin');
}

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [ensureSignIn],
});

adminRoutes.route('/', {
  name: 'Admin.panel',
  action() {
    mount(AdminLayout, {
      main: () => <Panel />
    });
  }
});

adminRoutes.route('/signin', {
  name: 'Admin.login',
  action() {
    mount(AdminLayout, {
      main: () => <Login />
    });
  }
});

adminRoutes.route('/posts/edit/:slug', {
  name: 'Admin.posts.edit',
  action(params) {
    Meteor.call("getPost", params.slug, function(err, post) {
      if (err || !post) {
        console.log(response);
      } else {
        mount(AdminLayout, {
          main: () => <PostForm key={post._id} post={post} />
        })
      }
    });
g  }
})

adminRoutes.route('/posts/new', {
  name: 'Admin.posts.new',
  action(params) {
    let post = {
      title: "Titel",
      createdAt: null,
      slug: "fin länk här",
      text: "Lorem ipsum",
    };
    mount(AdminLayout, {
      main: () => <PostForm key={post._id} post={post} />
    })
  }
})

export default adminRoutes;
