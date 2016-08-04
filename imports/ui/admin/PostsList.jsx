import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from './../../../lib/collections.js';

export default class PostsList extends Component {

  getRow(post) {
    return (
      <tr key={post._id}>
        <td className="table-col">
          { post.title }
        </td>
        <td className="table-col">
          <a
            className="button"
            onClick={ () =>
              FlowRouter.go('/admin/posts/edit/'+post.slug)
            }>
            redigera
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="posts-list">
        { this.props.posts.map(this.getRow)}
      </table>
    );
  }

}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, PostsList);
