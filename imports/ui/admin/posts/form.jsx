import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { Posts } from '../../../api/posts.js';

export default class PostForm extends Component {

  handleSubmit() {
    Posts.update(this.props.post._id, {
      $set: {
        title: this.title.lastHtml ,
        slug: this.slug.value,
        text: this.text.lastHtml,
        createdAt: this.props.post.createdAt || new Date(),
      },
    }, {
      upsert: true,
    })
  }

  getDateString() {
    if(this.props.post.createdAt) {
      return this.props.post.createdAt.toDateString();
    }
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
        <small>{this.getDateString()}</small>
        <br/>
        <input
          type="text"
          defaultValue={this.props.post.slug}
          ref={ node =>
            this.slug = node
          }
        />
        <ContentEditable
          html={this.props.post.text}
          tagName="p"
          ref={ node =>
            this.text = node
          }
          />
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
