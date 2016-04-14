import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import { Posts } from '../imports/api/posts.js';

import AdminLayout from '../imports/ui/admin/AdminLayout.jsx';
import Login from '../imports/ui/admin/Login.jsx';

import PostForm from '../imports/ui/admin/posts/form.jsx';

function ensureSignIn() {
  console.log(Meteor.user())
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

adminRoutes.route('/posts/edit/:slug', {
  name: 'Admin.posts.new',
  action(params) {
    let post = Posts.find({slug:params.slug}).fetch()[0];
    mount(AdminLayout, {
      main: () => <PostForm key={post._id} post={post} />
    })
  }
})

export default adminRoutes;
