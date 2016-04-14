import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { Posts } from '../../../api/posts.js';

export default class PostForm extends Component {

  handleSubmit() {
    Posts.update(this.props.post._id, {
      $set: { title: this.title.lastHtml },
    })
  }

  render() {
    return (
      <div className="post form">
        <div>
          <ContentEditable
            html={this.props.post.title}
            ref={ node =>
              this.title = node
            }
            tagName="h1"
            disabled={false}
          />
        </div>
        <small>{this.props.post.createdAt.toDateString()}</small>
        <button
          className="save"
          onClick={this.handleSubmit.bind(this)}
        >
          Save!
        </button>
      </div>
    );
  }
}

PostForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  post: PropTypes.object.isRequired,
};
