import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';
import Post from './Post.jsx';

// App component - represents the whole app
class App extends Component {

  renderPosts() {
    return this.props.posts.map((post) => {
      post = {
        title: post.title,
        createdAt: post.createdAt,
        image: post.image,
        _id: post._id,
        slug: post.slug,
      };
      return (
        <Post key={post._id} post={post} />
    )});
  }

  render() {
    return (
      <div className="container">
        {this.renderPosts()}
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
