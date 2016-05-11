import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';

import { Posts } from '../api/posts.js';

export default class Post extends Component {

  render() {
    return (
      <div className="post">
        <div>
          <h1
            onClick={ () =>
              FlowRouter.go('/post/:slug', this.props.post)
            }>
            {this.props.post.title}
          </h1>
        </div>
        <small>{this.props.post.createdAt.toDateString()}</small>
        <p>{this.props.post.text}</p>
      </div>
    );
  }
}

Post.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  post: PropTypes.object.isRequired,
};
