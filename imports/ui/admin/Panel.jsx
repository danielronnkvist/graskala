import React, { Component } from 'react';

import { Posts } from './../../../lib/collections.js';
import Login from './Login';
import PostsList from './PostsList';

export default class Panel extends Component {

  render() {
    return (
      <div className="admin-panel container">
        <div className="row">
          <Login />

          <div className="options">
            <h3>Admin</h3>

            <a
              onClick={ () =>
                FlowRouter.go('/admin/about/edit')
              }
            >
              Redigera om-sidan
            </a>
            |
            <a
              onClick={ () =>
                FlowRouter.go('/admin/posts/new', this.props.post)
              }
            >
              Skapa nytt inlägg
            </a>
          </div>
        </div>

        <div className="row">
          <h4>Redigera inlägg</h4>
          <PostsList />
        </div>
      </div>
    );
  }

}

export default Panel;
