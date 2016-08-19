import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from './../../lib/collections.js';
import Post from './Post.jsx';
import Pagination from './misc/Pagination.jsx';

// App component - represents the whole app
class App extends Component {

  getStateUsingPage() {
    let page = FlowRouter.current().queryParams.page;
    if(!page) page = 1;
    this.state = {
      posts: Posts.find({}, { sort: { createdAt: -1 }, limit: 5, skip: 5*(page-1) }).fetch(),
      page,
    };
  }

  componentWillMount() {
    this.getStateUsingPage();
    this.updateOnNewQueryParams = this.updateOnNewQueryParams.bind(this);
    FlowRouter.triggers.enter([this.updateOnNewQueryParams]);
  }

  updateOnNewQueryParams(routeState) {
    this.getStateUsingPage();
    this.forceUpdate();
  }

  renderPosts() {
    let posts = this.state.posts.length !== 0 ? this.state.posts : this.props.posts;
    return posts.map((post) => {
      return (
        <Post key={post._id} post={post} />
    )});
  }

  render() {
    return (
      <div className="container">
        {this.renderPosts()}
        <Pagination page={this.state.page} />
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  let page = FlowRouter.current().queryParams.page;
  if(!page) page = 1;
  return {
    posts: Posts.find({}, { sort: { createdAt: -1 }, limit: 5, skip: 5*(page-1) }).fetch(),
  };
}, App);
