import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import { Posts } from './collections.js';

import AdminLayout from '../imports/ui/admin/AdminLayout.jsx';
import Login from '../imports/ui/admin/Login.jsx';
import Panel from '../imports/ui/admin/Panel.jsx';

import PostForm from '../imports/ui/admin/contents/post.jsx';
import AboutForm from '../imports/ui/admin/contents/about.jsx';

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

function afterSignInPath() {
  if(Meteor.loggingIn() || Meteor.userId()) {
    FlowRouter.go('/admin');
  }
}

adminRoutes.route('/signin', {
  name: 'Admin.login',
  action() {
    afterSignInPath()
    mount(AdminLayout, {
      main: () => <Login />
    });
  }
});

/*
  POSTS
 */

adminRoutes.route('/posts/edit/:slug', {
  name: 'Admin.posts.edit',
  action(params) {
    Meteor.call("getPost", params.slug, function(err, post) {
      if (err || !post) {
        console.log(post);
      } else {
        mount(AdminLayout, {
          main: () => <PostForm key={post._id} post={post} />
        });
      }
    });
  }
});

adminRoutes.route('/posts/delete/:slug', {
  name: 'Admin.posts.delete',
  action(params) {
    Meteor.call("deletePost", params.slug, function(err, post) {
      if (err || !post) {
        console.log(err);
      } else {
        FlowRouter.go('/admin')
      }
    });
  }
});

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
    });
  }
});

/*
  ABOUT
 */

adminRoutes.route('/about/edit', {
  name: 'Admin.about.edit',
  action(params) {
    Meteor.call("getAboutData", function(err, data) {
      if (err) {
        console.log(data);
      } else {
        if(!data) {
          data = {
            title: "Hej",
            text: "About lorem ipsum",
          };
        }
        mount(AdminLayout, {
          main: () => <AboutForm data={data} />
        });
      }
    });
  }
});

export default adminRoutes;
