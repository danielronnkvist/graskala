import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../../api/posts.js';

export default class Panel extends Component {

  render() {
    return (
      <div>
        <h3>Admin</h3>

        <a
          onClick={ () =>
            FlowRouter.go('/admin/posts/new', this.props.post)
          }
        >
          Skapa nytt inlägg
        </a>

        <h4>Redigera inlägg</h4>
        <ul>
          { this.props.posts.map( post =>
            <li
              onClick={ () =>
                FlowRouter.go('/admin/posts/edit/'+post.slug, this.props.post)
              }
            >
              { post.title }
            </li>
          )}
        </ul>
      </div>
    );
  }

}

Panel.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Panel);
