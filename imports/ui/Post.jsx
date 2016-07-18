import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';

import { Posts } from './../../lib/collections.js';

export default class Post extends Component {

  render() {
    return (
      <div className="container">
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
          <img src={this.props.post.image} />
          <p dangerouslySetInnerHTML={{__html: this.props.post.text}}></p>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  post: PropTypes.object.isRequired,
};
