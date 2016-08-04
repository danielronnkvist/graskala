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
            className="edit"
            onClick={ () =>
              FlowRouter.go('/admin/posts/edit/'+post.slug)
            }>
            redigera
          </a>
        </td>
        <td className="table-col">
          <a
            className="delete"
            onClick={ () =>
              FlowRouter.go('/admin/posts/delete/'+post.slug)
            }>
            ta bort
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <table className="posts-list">
        <tbody>
          { this.props.posts.map(this.getRow)}
        </tbody>
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
