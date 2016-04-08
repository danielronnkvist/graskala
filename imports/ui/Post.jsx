import React, { Component, PropTypes } from 'react';

import { Posts } from '../api/posts.js';

export default class Post extends Component {

  render() {
    return (
      <div className="post">
        <h2>{this.props.post.title}</h2>
        <small>{this.props.post.createdAt.toDateString()}</small>
      </div>
    );
  }
}

Post.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  post: PropTypes.object.isRequired,
};
